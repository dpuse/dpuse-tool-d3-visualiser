// ── External Dependencies & Registrations
import { type D3DragEvent, drag } from 'd3-drag';
import { type D3ZoomEvent, zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, type Simulation, type SimulationLinkDatum, type SimulationNodeDatum } from 'd3-force';
import { select, type Selection } from 'd3-selection';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface NetworkDiagramNode {
    id: string;
    label?: string; // Shown beside the node. Without one, the id is shown inside the node.
    level?: number; // The node's depth in a hierarchy, from 0 at the top. Sets its size and colour. Without one, 1.
}

export interface NetworkDiagramLink {
    source: string;
    target: string;
}

export interface NetworkDiagramData {
    links: NetworkDiagramLink[];
    nodes: NetworkDiagramNode[];
}

export interface NetworkDiagramOptions {
    chargeStrength?: number;
    fitsView?: boolean; // After an auto-layout or an update, zooms out and centres so that every node and label is in view.
    labelHaloColor?: string; // Draws each label on an outline of this colour, so a label that lies over a link can still be read. Any CSS colour, such as the page's background.
    labelPlacementId?: NetworkDiagramLabelPlacementId; // Without one, 'below'.
    linkDistance?: number;
    onNodeClick?: (node: NetworkDiagramNode) => void;
    reservesLabelRoom?: boolean; // Lengthens the links round a node with many neighbours, so the neighbours and their labels all fit round it.
    transitionDuration?: number; // How long an update takes to move and fade, in milliseconds. Without one, 400. 0 changes at once.
    wrapsLabels?: boolean; // Breaks a long label of several words onto two lines, so it takes less room sideways.
}

// 'below' centres every label under its node. 'outside' puts each label in the widest gap between its node's links, so
// the labels of a star fan outwards rather than running into one another.
export type NetworkDiagramLabelPlacementId = 'below' | 'outside';

export interface NetworkDiagramHandle {
    destroy: () => void;
    resize: () => void;
    svg: SVGSVGElement;
    triggerAutoLayout: () => void;
    update: (data: NetworkDiagramData) => void; // Changes the diagram to new data in place: nodes that stay move to their new places, new ones fade in and old ones fade out.
}

type LaidOutNode = NetworkDiagramNode & SimulationNodeDatum;
type LaidOutLink = SimulationLinkDatum<LaidOutNode>;

interface Point {
    x: number;
    y: number;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const DEFAULT_CHARGE_STRENGTH = -300;
const DEFAULT_LINK_DISTANCE = 100;
const DEFAULT_TRANSITION_DURATION = 400;
const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;
const AUTO_LAYOUT_TICKS = 180;
const DEFAULT_LEVEL = 1; // A node with no level looks as every node did before levels were added.
const NODE_RADIUS_ACTIVE_GROWTH = 2;
const NODE_LABEL_GAP = 14; // From the bottom of a node to the baseline of the label below it.
const FIT_PADDING = 70; // Room around the outermost nodes for the labels below them.
const FIT_PADDING_OUTSIDE = 130; // More room when labels sit beside the nodes, because a label then reaches a whole label's width past its node.
const MINIMUM_SCALE = 0.25;
const MAXIMUM_SCALE = 4;

// ── Labels
const LABEL_FONT_SIZE = 12;
const LABEL_LINE_HEIGHT = 14;
const LABEL_CHARACTER_WIDTH = 6.2; // An average, used to estimate a label's width, because text cannot be measured before it is drawn.
const LABEL_HALO_WIDTH = 4;
const LABEL_OUTSIDE_GAP = 8; // From the edge of a node to a label beside it.
const LABEL_SIDE_THRESHOLD = 0.35; // How far sideways a label's direction must lean before the label goes to the side of its node, not above or below.
const LABEL_WRAP_LENGTH = 14; // A label this long or shorter stays on one line.
const LABEL_ARC_RATIO = 0.6; // The share of a label's width counted as room round a ring, because only the labels above and below a node lie along the ring.
const NODE_ARC_GAP = 16; // The clear space kept between two neighbours round a ring.
const NODE_COLLISION_GAP = 10;
const RING_MINIMUM_NEIGHBOUR_COUNT = 3; // Fewer neighbours than this fit round a node at any link length.
const NEW_NODE_OFFSET = 12; // How far from its neighbour a new node starts, so the layout can tell new nodes apart.

const COLOR = {
    linkStroke: '#9ca3af',
    nodeFillSelected: '#f59e0b',
    nodeStrokeSelected: '#b45309',
    nodeText: '#ffffff'
};

// One entry for each level, from the top of the hierarchy down. A deeper level uses the last entry.
const LEVEL_STYLES = [
    { fill: '#475569', fillHovered: '#64748b', radius: 26, stroke: '#1e293b', strokeHovered: '#334155' },
    { fill: '#2563eb', fillHovered: '#3b82f6', radius: 20, stroke: '#1e40af', strokeHovered: '#1d4ed8' },
    { fill: '#0d9488', fillHovered: '#14b8a6', radius: 14, stroke: '#115e59', strokeHovered: '#0f766e' },
    { fill: '#7c3aed', fillHovered: '#8b5cf6', radius: 10, stroke: '#5b21b6', strokeHovered: '#6d28d9' },
    { fill: '#db2777', fillHovered: '#ec4899', radius: 8, stroke: '#9d174d', strokeHovered: '#be185d' }
] as const;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export function renderNetworkDiagram(data: NetworkDiagramData, renderTo: HTMLElement, options: NetworkDiagramOptions = {}): NetworkDiagramHandle {
    const labelPlacementId = options.labelPlacementId ?? 'below';
    const transitionDuration = options.transitionDuration ?? DEFAULT_TRANSITION_DURATION;
    const width = renderTo.clientWidth || DEFAULT_WIDTH;
    const height = renderTo.clientHeight || DEFAULT_HEIGHT;

    const linkForce = forceLink<LaidOutNode, LaidOutLink>().id((node) => node.id);
    const simulation: Simulation<LaidOutNode, LaidOutLink> = forceSimulation<LaidOutNode, LaidOutLink>()
        .force('link', linkForce)
        .force('charge', forceManyBody().strength(options.chargeStrength ?? DEFAULT_CHARGE_STRENGTH))
        .force('center', forceCenter(width / 2, height / 2));
    // Keeps two nodes from sitting on top of each other. Room for their labels comes from the length of the links.
    if (options.reservesLabelRoom === true)
        simulation.force(
            'collide',
            forceCollide<LaidOutNode>((node) => getLevelStyle(node).radius + NODE_COLLISION_GAP)
        );
    simulation.stop(); // The simulation only ever runs a set number of steps on request, never by itself.

    const svgSelection = select(renderTo)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${String(width)} ${String(height)}`)
        .style('touch-action', 'none');
    const viewport = svgSelection.append('g');
    const linkLayer = viewport.append('g'); // Below the nodes, so a link never covers a node or its label.
    const nodeLayer = viewport.append('g');

    const svgNode = svgSelection.node();
    if (svgNode == null) throw new Error('Failed to create network diagram SVG element.');

    // What is drawn now. Replaced whole by each update, so the elements that are fading out keep the old values.
    let currentData = data;
    let nodes: LaidOutNode[] = [];
    let links: LaidOutLink[] = [];
    let neighbourIdsById = new Map<string, string[]>();
    let animationFrameId: number | undefined;
    let selectedNodeId: string | null = null;
    let hoveredNodeId: string | null = null;
    let linkSelection: Selection<SVGLineElement, LaidOutLink, SVGGElement, unknown> = linkLayer.selectAll<SVGLineElement, LaidOutLink>('line');
    let nodeSelection: Selection<SVGGElement, LaidOutNode, SVGGElement, unknown> = nodeLayer.selectAll<SVGGElement, LaidOutNode>('g');

    // The radius of the ring a node's neighbours sit on, when room is kept for labels: long enough round for every
    // neighbour and its label. 0 for a node with too few neighbours to crowd one another.
    const constructRingRadius = (nodeId: string, nodesById: Map<string, LaidOutNode>): number => {
        const neighbourIds = neighbourIdsById.get(nodeId) ?? [];
        if (neighbourIds.length < RING_MINIMUM_NEIGHBOUR_COUNT) return 0;
        let arcLength = 0;
        for (const neighbourId of neighbourIds) {
            const neighbour = nodesById.get(neighbourId);
            if (!neighbour) continue;
            const labelArc = neighbour.label == null ? 0 : estimateLabelWidth(constructLabelLines(neighbour, options.wrapsLabels === true)) * LABEL_ARC_RATIO;
            arcLength += Math.max(getLevelStyle(neighbour).radius * 2, labelArc) + NODE_ARC_GAP;
        }
        return arcLength / (Math.PI * 2);
    };

    // A link is as long as asked for, or as long as the ring at either of its ends needs, whichever is longer.
    linkForce.distance((link) => {
        const linkDistance = options.linkDistance ?? DEFAULT_LINK_DISTANCE;
        if (options.reservesLabelRoom !== true) return linkDistance;
        const nodesById = new Map(nodes.map((node) => [node.id, node]));
        return Math.max(linkDistance, constructRingRadius(getNodeId(link.source), nodesById), constructRingRadius(getNodeId(link.target), nodesById));
    });

    const updateNodeStyles = (): void => {
        nodeSelection
            .select<SVGCircleElement>('circle')
            .attr('fill', (node) => {
                if (node.id === selectedNodeId) return COLOR.nodeFillSelected;
                return node.id === hoveredNodeId ? getLevelStyle(node).fillHovered : getLevelStyle(node).fill;
            })
            .attr('stroke', (node) => {
                if (node.id === selectedNodeId) return COLOR.nodeStrokeSelected;
                return node.id === hoveredNodeId ? getLevelStyle(node).strokeHovered : getLevelStyle(node).stroke;
            })
            .attr('stroke-width', (node) => (node.id === selectedNodeId ? 3 : 2))
            .attr('r', (node) => getLevelStyle(node).radius + (node.id === selectedNodeId || node.id === hoveredNodeId ? NODE_RADIUS_ACTIVE_GROWTH : 0));
    };

    svgSelection.on('click', () => {
        selectedNodeId = null;
        updateNodeStyles();
    });

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
        .scaleExtent([MINIMUM_SCALE, MAXIMUM_SCALE])
        .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
            viewport.attr('transform', event.transform.toString());
        });
    svgSelection.call(zoomBehavior).on('dblclick.zoom', null);

    // Moves every link, node and label to where its node now is. A label's place depends on where its node's
    // neighbours are, so the labels are placed again each time.
    const renderGraph = (): void => {
        linkSelection
            .attr('x1', (link) => getNodePosition(link.source, 'x'))
            .attr('y1', (link) => getNodePosition(link.source, 'y'))
            .attr('x2', (link) => getNodePosition(link.target, 'x'))
            .attr('y2', (link) => getNodePosition(link.target, 'y'));
        nodeSelection.attr('transform', (node) => `translate(${String(node.x ?? 0)},${String(node.y ?? 0)})`);

        const nodesById = new Map(nodes.map((node) => [node.id, node]));
        nodeSelection.each((node, index, elements) => {
            if (node.label == null) return; // An id stays in the middle of its node, where it was drawn.
            const neighbours = (neighbourIdsById.get(node.id) ?? []).map((neighbourId) => nodesById.get(neighbourId)).filter((neighbour) => neighbour !== undefined);
            const lineCount = constructLabelLines(node, options.wrapsLabels === true).length;
            const placement = constructLabelPlacement(node, neighbours, labelPlacementId, lineCount);
            const text = select(assertDefined(elements[index])).select<SVGTextElement>('text').attr('text-anchor', placement.anchor).attr('y', placement.y);
            text.selectAll<SVGTSpanElement, string>('tspan').attr('x', placement.x);
        });
    };

    // The view that shows every node with its label. Never zooms in past full size, so a small graph is centred rather
    // than enlarged.
    const constructFitTransform = (): ReturnType<typeof zoomIdentity.translate> | undefined => {
        if (nodes.length === 0) return undefined;
        const xPositions = nodes.map((node) => node.x ?? 0);
        const yPositions = nodes.map((node) => node.y ?? 0);
        const [left, right, top, bottom] = [Math.min(...xPositions), Math.max(...xPositions), Math.min(...yPositions), Math.max(...yPositions)];
        const viewWidth = renderTo.clientWidth || DEFAULT_WIDTH;
        const viewHeight = renderTo.clientHeight || DEFAULT_HEIGHT;
        const padding = labelPlacementId === 'outside' ? FIT_PADDING_OUTSIDE : FIT_PADDING;
        const scale = Math.max(MINIMUM_SCALE, Math.min(1, viewWidth / (right - left + padding * 2), viewHeight / (bottom - top + padding * 2)));
        return zoomIdentity
            .translate(viewWidth / 2, viewHeight / 2)
            .scale(scale)
            .translate(-(left + right) / 2, -(top + bottom) / 2);
    };

    const applyTransform = (transform: ReturnType<typeof zoomIdentity.translate>): void => {
        svgSelection.call((selection) => {
            zoomBehavior.transform(selection, transform);
        });
    };

    const runLayout = (): void => {
        simulation.alpha(1);
        for (let step = 0; step < AUTO_LAYOUT_TICKS; step += 1) simulation.tick();
        simulation.stop();
    };

    const cancelAnimation = (): void => {
        if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
    };

    // Replaces what is drawn with new data. Nodes are matched by id, so one that stays keeps its element and its place.
    // A new node starts beside a neighbour that is already placed, so it grows out of the node it belongs to. With no
    // nodes placed yet, every node starts on one circle, so the graph is readable before any layout runs.
    const applyData = (newData: NetworkDiagramData): { enteringNodes: typeof nodeSelection; exitingLinks: typeof linkSelection; exitingNodes: typeof nodeSelection } => {
        const previousNodesById = new Map(nodes.map((node) => [node.id, node]));
        currentData = newData;
        neighbourIdsById = constructNeighbourIds(newData);
        nodes = newData.nodes.map((node) => ({ ...node }));
        links = newData.links.map((link) => ({ ...link }));

        const startRadius = Math.min(width, height) * 0.22;
        for (const [index, node] of nodes.entries()) {
            const previousNode = previousNodesById.get(node.id);
            const placedNeighbourId = (neighbourIdsById.get(node.id) ?? []).find((neighbourId) => previousNodesById.has(neighbourId));
            const placedNeighbour = placedNeighbourId == null ? undefined : previousNodesById.get(placedNeighbourId);
            const angle = (index / nodes.length) * Math.PI * 2;
            if (previousNode) {
                node.x = previousNode.x;
                node.y = previousNode.y;
            } else if (placedNeighbour) {
                node.x = (placedNeighbour.x ?? 0) + Math.cos(angle) * NEW_NODE_OFFSET;
                node.y = (placedNeighbour.y ?? 0) + Math.sin(angle) * NEW_NODE_OFFSET;
            } else {
                node.x = width / 2 + Math.cos(angle) * startRadius;
                node.y = height / 2 + Math.sin(angle) * startRadius;
            }
        }
        simulation.nodes(nodes);
        linkForce.links(links);

        const joinedLinks = linkSelection.data(links, constructLinkKey);
        const exitingLinks = joinedLinks.exit<LaidOutLink>();
        linkSelection = joinedLinks.enter().append('line').attr('stroke', COLOR.linkStroke).attr('stroke-width', 2).merge(joinedLinks);

        const joinedNodes = nodeSelection.data(nodes, (node) => node.id);
        const exitingNodes = joinedNodes.exit<LaidOutNode>().style('pointer-events', 'none'); // A node on its way out takes no more clicks.
        type DragEvent = D3DragEvent<SVGGElement, LaidOutNode, LaidOutNode>;
        const enteringNodes = joinedNodes.enter().append('g').style('cursor', 'pointer');
        enteringNodes.append('circle').attr('stroke-width', 2);
        enteringNodes.append('text');
        enteringNodes
            .on('mouseenter', (_event, node) => {
                hoveredNodeId = node.id;
                updateNodeStyles();
            })
            .on('mouseleave', (_event, node) => {
                if (hoveredNodeId === node.id) hoveredNodeId = null;
                updateNodeStyles();
            })
            .on('click', (event: MouseEvent, node) => {
                event.stopPropagation();
                selectedNodeId = selectedNodeId === node.id ? null : node.id;
                updateNodeStyles();
                options.onNodeClick?.(assertDefined(currentData.nodes.find((dataNode) => dataNode.id === node.id))); // The caller's own node, without the layout's positions.
            })
            .call(
                drag<SVGGElement, LaidOutNode>()
                    .on('start', (event: DragEvent, node) => {
                        (event.sourceEvent as MouseEvent | TouchEvent | undefined)?.stopPropagation();
                        node.fx = node.x;
                        node.fy = node.y;
                    })
                    .on('drag', (event: DragEvent, node) => {
                        node.x = event.x;
                        node.y = event.y;
                        node.fx = event.x;
                        node.fy = event.y;
                        renderGraph();
                    })
                    .on('end', (_event: DragEvent, node) => {
                        node.fx = null;
                        node.fy = null;
                    })
            );
        nodeSelection = enteringNodes.merge(joinedNodes);

        // The text is set on nodes that stay too, because an update may give a node a new label. A label goes beside its
        // node in the page's text colour, which follows the light or dark theme. An id is short, so it stays inside the node.
        nodeSelection
            .select<SVGTextElement>('text')
            .attr('text-anchor', 'middle')
            .attr('y', (node) => (node.label == null ? 4 : getLevelStyle(node).radius + NODE_LABEL_GAP))
            .attr('font-size', (node) => (node.label == null ? null : LABEL_FONT_SIZE))
            .attr('fill', (node) => (node.label == null ? COLOR.nodeText : 'currentColor')) // Explicit, because iOS Safari can default to transparent.
            // The outline is painted first, under the letters, so it hides the links behind a label without thinning the
            // letters. Set as styles, so a colour given as a CSS variable follows the page's theme.
            .style('paint-order', (node) => (node.label == null || options.labelHaloColor == null ? null : 'stroke'))
            .style('stroke', (node) => (node.label == null ? null : (options.labelHaloColor ?? null)))
            .style('stroke-linejoin', (node) => (node.label == null || options.labelHaloColor == null ? null : 'round'))
            .style('stroke-width', (node) => (node.label == null || options.labelHaloColor == null ? null : `${String(LABEL_HALO_WIDTH)}px`))
            .selectAll<SVGTSpanElement, string>('tspan')
            .data((node) => constructLabelLines(node, options.wrapsLabels === true))
            .join('tspan')
            .attr('x', 0)
            .attr('dy', (_line, lineIndex) => (lineIndex === 0 ? 0 : LABEL_LINE_HEIGHT))
            .text((line) => line);
        updateNodeStyles();
        return { enteringNodes, exitingLinks, exitingNodes };
    };

    applyData(data);
    renderGraph();

    return {
        destroy: () => {
            cancelAnimation();
            simulation.stop();
            svgSelection.remove();
        },
        resize: () => {
            const newWidth = renderTo.clientWidth || DEFAULT_WIDTH;
            const newHeight = renderTo.clientHeight || DEFAULT_HEIGHT;
            svgSelection
                .attr('width', newWidth)
                .attr('height', newHeight)
                .attr('viewBox', `0 0 ${String(newWidth)} ${String(newHeight)}`);
            simulation.force('center', forceCenter(newWidth / 2, newHeight / 2));
        },
        svg: svgNode,
        triggerAutoLayout: () => {
            cancelAnimation();
            runLayout();
            renderGraph();
            const fitTransform = options.fitsView === true ? constructFitTransform() : undefined;
            if (fitTransform) applyTransform(fitTransform);
        },
        update: (newData) => {
            cancelAnimation();
            const { enteringNodes, exitingLinks, exitingNodes } = applyData(newData);
            const startPositions = new Map(nodes.map((node) => [node.id, { x: node.x ?? 0, y: node.y ?? 0 }]));
            runLayout();
            const targetPositions = new Map(nodes.map((node) => [node.id, { x: node.x ?? 0, y: node.y ?? 0 }]));
            const startTransform = zoomTransform(svgNode);
            const targetTransform = (options.fitsView === true ? constructFitTransform() : undefined) ?? startTransform;

            // Draws one moment of the change: nodes part of the way to their new places, new ones part faded in and
            // old ones part faded out. The old ones are removed at the end.
            const renderProgress = (progress: number): void => {
                for (const node of nodes) {
                    const position = interpolatePoint(assertDefined(startPositions.get(node.id)), assertDefined(targetPositions.get(node.id)), progress);
                    node.x = position.x;
                    node.y = position.y;
                }
                renderGraph();
                enteringNodes.style('opacity', progress);
                exitingNodes.style('opacity', 1 - progress);
                exitingLinks.style('opacity', 1 - progress);
                applyTransform(
                    zoomIdentity
                        .translate(interpolate(startTransform.x, targetTransform.x, progress), interpolate(startTransform.y, targetTransform.y, progress))
                        .scale(interpolate(startTransform.k, targetTransform.k, progress))
                );
                if (progress < 1) return;
                enteringNodes.style('opacity', null);
                exitingNodes.remove();
                exitingLinks.remove();
            };

            if (transitionDuration <= 0) {
                renderProgress(1);
                return;
            }
            renderProgress(0);
            const startTime = performance.now();
            const renderFrame = (time: number): void => {
                const elapsedRatio = Math.min(1, (time - startTime) / transitionDuration);
                renderProgress(easeInOut(elapsedRatio));
                animationFrameId = elapsedRatio < 1 ? requestAnimationFrame(renderFrame) : undefined;
            };
            animationFrameId = requestAnimationFrame(renderFrame);
        }
    };
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Labels

// A node's label as the lines it is drawn on. A long label of several words breaks at the space nearest its middle, so
// its two lines are as even as they can be. A node with no label shows its id.
function constructLabelLines(node: NetworkDiagramNode, isWrapped: boolean): string[] {
    const label = node.label ?? node.id;
    if (!isWrapped || node.label == null || label.length <= LABEL_WRAP_LENGTH) return [label];

    const middle = label.length / 2;
    let breakIndex = -1;
    for (let spaceIndex = label.indexOf(' '); spaceIndex !== -1; spaceIndex = label.indexOf(' ', spaceIndex + 1)) {
        if (breakIndex === -1 || Math.abs(spaceIndex - middle) < Math.abs(breakIndex - middle)) breakIndex = spaceIndex;
    }
    return breakIndex === -1 ? [label] : [label.slice(0, breakIndex), label.slice(breakIndex + 1)];
}

function estimateLabelWidth(lines: string[]): number {
    return Math.max(...lines.map((line) => line.length)) * LABEL_CHARACTER_WIDTH;
}

// Where a label goes relative to the middle of its node. 'outside' points the label into the widest gap between the
// node's links, where it is least likely to cross one. For a node with one link that is the side facing away from its
// neighbour, so the labels of a star fan outwards. The label goes to the left or right when that direction leans
// sideways, otherwise above or below. A node with no links has no such direction, so its label goes below.
function constructLabelPlacement(
    node: LaidOutNode,
    neighbours: LaidOutNode[],
    labelPlacementId: NetworkDiagramLabelPlacementId,
    lineCount: number
): { anchor: 'end' | 'middle' | 'start'; x: number; y: number } {
    const { radius } = getLevelStyle(node);
    const below = { anchor: 'middle' as const, x: 0, y: radius + NODE_LABEL_GAP };
    if (labelPlacementId === 'below' || neighbours.length === 0) return below;

    // The angles of the links round the node, in order. Each gap runs from one link to the next, and the last gap runs
    // from the last link round to the first.
    const linkAngles = neighbours.map((neighbour) => Math.atan2((neighbour.y ?? 0) - (node.y ?? 0), (neighbour.x ?? 0) - (node.x ?? 0))).toSorted((left, right) => left - right);
    let widestGap = 0;
    let labelAngle = 0;
    for (const [index, linkAngle] of linkAngles.entries()) {
        const nextLinkAngle = index === linkAngles.length - 1 ? assertDefined(linkAngles[0]) + Math.PI * 2 : assertDefined(linkAngles[index + 1]);
        if (nextLinkAngle - linkAngle <= widestGap) continue;
        widestGap = nextLinkAngle - linkAngle;
        labelAngle = linkAngle + widestGap / 2;
    }

    const directionX = Math.cos(labelAngle);
    const directionY = Math.sin(labelAngle);
    const extraLinesHeight = (lineCount - 1) * LABEL_LINE_HEIGHT;
    if (Math.abs(directionX) < LABEL_SIDE_THRESHOLD) return directionY > 0 ? below : { anchor: 'middle', x: 0, y: -(radius + LABEL_OUTSIDE_GAP) - extraLinesHeight };

    // Beside the node, with the label's lines centred on the height its direction points to. A label on a diagonal is
    // moved further out by the part of its height that would otherwise reach back over the node.
    const offset = radius + LABEL_OUTSIDE_GAP + (Math.abs(directionY) * lineCount * LABEL_LINE_HEIGHT) / 2;
    return { anchor: directionX > 0 ? 'start' : 'end', x: directionX * offset, y: directionY * offset + LABEL_FONT_SIZE / 3 - extraLinesHeight / 2 };
}

// ── Data

function constructNeighbourIds(data: NetworkDiagramData): Map<string, string[]> {
    const neighbourIdsById = new Map<string, string[]>();
    for (const link of data.links) {
        neighbourIdsById.set(link.source, [...(neighbourIdsById.get(link.source) ?? []), link.target]);
        neighbourIdsById.set(link.target, [...(neighbourIdsById.get(link.target) ?? []), link.source]);
    }
    return neighbourIdsById;
}

// The layout replaces each link's ids with the nodes themselves, so a link that is already drawn names its ends
// differently from one in new data.
function constructLinkKey(link: LaidOutLink): string {
    return `${getNodeId(link.source)}>${getNodeId(link.target)}`;
}

function getNodeId(value: LaidOutNode | string | number): string {
    return typeof value === 'object' ? value.id : String(value);
}

function getNodePosition(value: LaidOutNode | string | number, axis: 'x' | 'y'): number {
    return typeof value === 'object' ? (value[axis] ?? 0) : 0;
}

function getLevelStyle(node: NetworkDiagramNode): (typeof LEVEL_STYLES)[number] {
    const level = Math.max(0, Math.min(node.level ?? DEFAULT_LEVEL, LEVEL_STYLES.length - 1));
    return assertDefined(LEVEL_STYLES[level]);
}

// ── Animation

function interpolate(from: number, to: number, progress: number): number {
    return from + (to - from) * progress;
}

function interpolatePoint(from: Point, to: Point, progress: number): Point {
    return { x: interpolate(from.x, to.x, progress), y: interpolate(from.y, to.y, progress) };
}

// Starts and ends gently, so nodes do not jerk into motion or stop dead.
function easeInOut(ratio: number): number {
    return ratio < 0.5 ? 4 * ratio ** 3 : 1 - (-2 * ratio + 2) ** 3 / 2;
}

function assertDefined<T>(value: T | undefined): T {
    if (value === undefined) throw new Error('Expected a value in the network diagram.');
    return value;
}
