// ── External Dependencies & Registrations
import { type D3DragEvent, drag } from 'd3-drag';
import { type D3ZoomEvent, zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, type Simulation, type SimulationLinkDatum, type SimulationNodeDatum } from 'd3-force';
import { select, type Selection } from 'd3-selection';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface NetworkDiagramNode {
    id: string;
    accessibleLabel?: string; // What screen readers call the node, in place of its label, such as 'Open Sales' for a node a click opens.
    badge?: NetworkDiagramBadgeId; // A small disc on the node's upper right, in the action colours, that shows what a click does. It is part of the node, so a click on it is a click on the node.
    discColor?: string; // The disc behind this node's icon, in place of the diagram's, to set one node apart, such as the top one. Any CSS colour. It dims a little under the pointer, and the selected colour still replaces it.
    color?: string; // The node's colour, in place of its level's: its ring when it has an icon, or else the whole node. Any CSS colour.
    icon?: string; // SVG markup drawn inside the node, on a plain disc ringed in its level's colour. Every icon and its disc are one size, whatever the level. It must declare 'xmlns', because it is shown as an image.
    isAction?: boolean; // Draws the node as something to do, not a thing: a pale disc with a coloured ring, unlike any level, that never shows as selected.
    isSelected?: boolean; // Draws the node as the selected one, when the caller keeps the selection ('selectsOnClick' is false).
    label?: string; // Shown beside the node. Without one, the id is shown inside the node, unless the node has an icon or a symbol, which is then all it shows.
    level?: number; // The node's depth in a hierarchy, from 0 at the top. Sets its size and colour. Without one, 1.
    symbol?: string; // Drawn inside the node. '+' is drawn as a plus centred exactly. Any other is drawn as text, a character or two.
    title?: string; // Shown as a tooltip, for a node whose symbol alone does not say what it is.
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
    actionNodeColors?: NetworkDiagramActionNodeColors; // Draws an action node in the colours of the page's own action buttons. Without them, a pale blue disc with a blue ring and symbol.
    chargeStrength?: number;
    compactWidth?: number; // A container narrower than this has every label below its node, whatever 'labelPlacementId' says, because labels beside the nodes take more room sideways.
    disablesNodeDrag?: boolean; // Stops the user dragging a node to a new place. A drag that starts on a node then pans the diagram, as one on the background does.
    disablesPointerZoom?: boolean; // Stops the wheel, a trackpad and a pinch zooming the diagram, so the wheel scrolls the page past it. Dragging still pans, and 'zoomBy' and 'fitView' still zoom.
    fitAlignmentId?: NetworkDiagramFitAlignmentId; // Without one, 'middle'.
    fitsView?: boolean;
    focusRingColor?: string; // The ring round the node that has keyboard focus. Any CSS colour. Without one, blue. // After an auto-layout or an update, zooms out and centres so that every node and label is in view.
    growsActiveNodes?: boolean; // Draws the selected node, and the one under the pointer, a little larger. Without one, true. False keeps every node its own size, for a caller that shows both states by colour.
    hoveredIconNodeColor?: string; // The disc behind the icon of the node under the pointer. Any CSS colour. Without one, the disc does not change.
    iconNodeColor?: string; // The disc behind a node's icon. Any CSS colour, such as the page's background. Without one, white.
    labelHaloColor?: string; // Draws each label on an outline of this colour, so a label that lies over a link can still be read. Any CSS colour, such as the page's background.
    labelPlacementId?: NetworkDiagramLabelPlacementId; // Without one, 'below'.
    linkColor?: string; // The colour of the lines between nodes. Any CSS colour. Without one, a mid grey.
    linkDistance?: number;
    linkWidth?: number; // The width of the lines between nodes. Without one, 2.
    maximumFitScale?: number; // How far a fitted diagram may be enlarged to fill its container. Without one, 1, so a small diagram is centred at full size.
    maximumLabelLength?: number; // Cuts a line of a label longer than this many characters short and ends it with '…'. The whole label is then the node's tooltip, unless the node has a 'title'.
    nodeBorderWidth?: number; // The width of the ring round every node. Without one, 2.
    onNodeClick?: (node: NetworkDiagramNode) => void;
    reservesLabelRoom?: boolean; // Lengthens the links round a node with many neighbours, so the neighbours and their labels all fit round it.
    selectedRingColor?: string; // Draws a ring round the selected node, a little apart from it, and nothing else: the node keeps its own colours. Any CSS colour. Without one, a selected node shows in its own ring or disc.
    selectedIconNodeColor?: string; // The disc behind the icon of the selected node, which then keeps its own ring. Any CSS colour. Without one, a selected node with an icon shows in its ring, as any other does.
    selectsOnClick?: boolean; // A click marks its node as selected, and a second click clears it. Without one, true. False leaves the selection to the caller, who marks nodes with 'isSelected'.
    transitionDuration?: number; // How long an update takes to move and fade, in milliseconds. Without one, 400. 0 changes at once.
    wrapsLabels?: boolean; // Breaks a long label of several words onto two lines, so it takes less room sideways.
}

// The colours of an action node. Any CSS colours.
export interface NetworkDiagramActionNodeColors {
    border: string;
    fill: string;
    fillHovered?: string; // Without one, the fill does not change under the pointer.
    symbol: string;
}

// The symbol a badge shows. 'arrowRight' is an arrow pointing right, as an outline icon set draws one.
export type NetworkDiagramBadgeId = 'arrowRight';

// Where a diagram sits when it is shorter than its container, after a fit or a zoom button: 'middle' centres it, and
// 'top' keeps it near the top, near the page's headings, with a gap above it of 5% of the container's height. Either
// way it is centred from side to side.
export type NetworkDiagramFitAlignmentId = 'middle' | 'top';

// 'below' centres every label under its node. 'outside' puts each label in the widest gap between its node's links, so
// the labels of a star fan outwards rather than running into one another.
export type NetworkDiagramLabelPlacementId = 'below' | 'outside';

export interface NetworkDiagramHandle {
    destroy: () => void;
    fitView: () => void; // Zooms and centres so that every node and label is in view, as a fitted diagram is first drawn.
    resize: () => void;
    svg: SVGSVGElement;
    triggerAutoLayout: () => void;
    zoomBy: (factor: number) => void; // Zooms in for a factor above 1, out for one below. The whole diagram stays in view while it fits, placed as a fitted one is; a larger one zooms about the middle of the container.
    update: (data: NetworkDiagramData) => void; // Changes the diagram to new data in place: nodes that stay move to their new places, new ones fade in and old ones fade out. Data with the same nodes, labels and links only restyles the nodes, which stay where they are.
}

type LaidOutNode = NetworkDiagramNode & SimulationNodeDatum;
type LaidOutLink = SimulationLinkDatum<LaidOutNode>;

// The box round a whole diagram, in the diagram's own units.
interface DiagramBounds {
    bottom: number;
    left: number;
    right: number;
    top: number;
}

interface Point {
    x: number;
    y: number;
}

// Where a label is drawn, measured from the middle of its node: the baseline of its first line, and which end of the
// line 'x' marks.
interface LabelPlacement {
    anchor: 'end' | 'middle' | 'start';
    x: number;
    y: number;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const DEFAULT_CHARGE_STRENGTH = -300;
const DEFAULT_LINK_DISTANCE = 100;
const DEFAULT_LINK_WIDTH = 2;
const DEFAULT_NODE_BORDER_WIDTH = 2;
const DEFAULT_TRANSITION_DURATION = 400;
const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;
const AUTO_LAYOUT_TICKS = 180;
const DEFAULT_LEVEL = 1; // A node with no level looks as every node did before levels were added.
const NODE_RADIUS_ACTIVE_GROWTH = 2;
const FOCUS_RING_CLASS_NAME = 'focus-ring';
const FOCUS_RING_COLOR = '#2563eb';
const OUTER_RING_GAP = 2; // The clear space between a node and a ring round it, and between two such rings.
const OUTER_RING_WIDTH = 2;
const SELECTED_RING_CLASS_NAME = 'selected-ring';
const NODE_LABEL_GAP = 14; // From the bottom of a node to the baseline of the label below it.
const FIT_MARGIN = 16; // The clear space kept between a fitted diagram and the edges of its container.
const TOP_ALIGNED_GAP_SHARE = 0.05; // The space above a diagram kept near the top, as a share of the container's height, so it grows with the pane but stays small.
const FIT_NODE_ALLOWANCE = (OUTER_RING_GAP + OUTER_RING_WIDTH) * 2; // Room round every node for the selected and focus rings, so a fitted diagram does not move when either is drawn.
const MINIMUM_SCALE = 0.25;
const MAXIMUM_SCALE = 4;

// ── Labels
const LABEL_FONT_SIZE = 12;
const LABEL_DESCENT = 4; // How far the tails of letters reach below a line of a label.
const LABEL_ELLIPSIS = '…';
const LABEL_LINE_HEIGHT = 14;
const LABEL_CHARACTER_WIDTH = 6.2; // An average, used to estimate a label's width, because text cannot be measured before it is drawn.
const LABEL_HALO_WIDTH = 4;
const LABEL_OUTSIDE_GAP = 8; // From the edge of a node to a label beside it.
const LABEL_SIDE_THRESHOLD = 0.35; // How far sideways a label's direction must lean before the label goes to the side of its node, not above or below.
const LABEL_WEDGE_ANGLE = Math.PI * 0.75; // A gap between two links narrower than this is a wedge a label could cross the sides of.
const LABEL_WEDGE_HALO_RATIO = 0.5; // The share of a haloed label's width that must clear the links of a wedge.
const LABEL_WRAP_LENGTH = 10; // A label this long or shorter stays on one line.
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

// An action node. Pale with a strong ring and symbol, as the app's own add buttons are, so it stands apart from the
// solid level colours.
const ACTION_STYLE = { fill: '#dbeafe', fillHovered: '#bfdbfe', radius: 22, stroke: '#2563eb', strokeHovered: '#1d4ed8', symbol: '#1d4ed8' };
const DISC_HOVER_FILTER = 'brightness(0.92)';
const ICON_CLASS_NAME = 'icon';
const ICON_NODE_COLOR = '#ffffff';
const ICON_NODE_RADIUS = 22; // One size at every level, so the same icon is the same size wherever it is. Wide enough to keep the icon's corners inside the disc.
const ICON_SIZE = 28;
const SYMBOL_CLASS_NAME = 'symbol';
const SYMBOL_FONT_SIZE = 20;
// A plus is drawn as the plus of a 24-unit outline icon set is at 20px: arms 7 units long and a line 1.25 units wide.
// It is then the size and weight of the plus on a button beside the diagram.
const SYMBOL_ICON_SIZE = 20;
const SYMBOL_PLUS_ARM_LENGTH = Math.round(((SYMBOL_ICON_SIZE * 7) / 24) * 100) / 100; // From the centre of a plus to the end of each arm.
const SYMBOL_STROKE_WIDTH = Math.round(((SYMBOL_ICON_SIZE * 1.25) / 24) * 100) / 100;

// ── Badges ─ A badge's arrow is drawn as the arrow of a 24-unit outline icon set is at 12px, with a line heavy enough to
// read at that size.
const BADGE_BORDER_WIDTH = 1.25;
const BADGE_CLASS_NAME = 'badge';
const BADGE_ICON_SIZE = 12;
const BADGE_RADIUS = 9;
const BADGE_STROKE_WIDTH = 1.5;
const BADGE_ARM_LENGTH = (BADGE_ICON_SIZE * 7) / 24; // From the centre of an arrow to its tip, and to the ends of its head.
const BADGE_PATHS: Record<NetworkDiagramBadgeId, string> = {
    arrowRight: `M${String(-BADGE_ARM_LENGTH)},0H${String(BADGE_ARM_LENGTH)}M0,${String(-BADGE_ARM_LENGTH)}L${String(BADGE_ARM_LENGTH)},0L0,${String(BADGE_ARM_LENGTH)}`
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
    const getLabelLines = (node: NetworkDiagramNode): string[] => constructLabelLines(node, options.wrapsLabels === true, options.maximumLabelLength);
    // Labels go below their nodes in a narrow container. Worked out each time, because the container can be resized.
    const getLabelPlacementId = (): NetworkDiagramLabelPlacementId => {
        const isCompact = options.compactWidth != null && (renderTo.clientWidth || DEFAULT_WIDTH) < options.compactWidth;
        return isCompact ? 'below' : (options.labelPlacementId ?? 'below');
    };
    let laidOutLabelPlacementId = getLabelPlacementId(); // The placement the nodes were last laid out for, because the links are longer for labels beside the nodes.
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
            forceCollide<LaidOutNode>((node) => getNodeStyle(node).radius + NODE_COLLISION_GAP)
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
    let focusedNodeId: string | null = null; // The node with keyboard focus. A node focused by a click is not shown as focused.
    let linkSelection: Selection<SVGLineElement, LaidOutLink, SVGGElement, unknown> = linkLayer.selectAll<SVGLineElement, LaidOutLink>('line');
    let nodeSelection: Selection<SVGGElement, LaidOutNode, SVGGElement, unknown> = nodeLayer.selectAll<SVGGElement, LaidOutNode>('g');

    // The radius of the ring a node's neighbours sit on, when room is kept for labels: long enough round for every
    // neighbour and its label, and wide enough for the node's own label to fit between the node and the ring, because
    // that label points out into a gap between the links. 0 for a node with too few neighbours to crowd one another.
    const constructRingRadius = (nodeId: string, nodesById: Map<string, LaidOutNode>): number => {
        const neighbourIds = neighbourIdsById.get(nodeId) ?? [];
        if (neighbourIds.length < RING_MINIMUM_NEIGHBOUR_COUNT) return 0;
        let arcLength = 0;
        let widestNeighbourRadius = 0;
        const isBelow = getLabelPlacementId() === 'below';
        for (const neighbourId of neighbourIds) {
            const neighbour = nodesById.get(neighbourId);
            if (!neighbour) continue;
            const lines = neighbour.label == null ? [] : getLabelLines(neighbour);
            const labelArc = estimateLabelWidth(lines) * LABEL_ARC_RATIO;
            // A label below its node points along the ring at the ring's sides, so a neighbour there needs room for its
            // node and its label one above the other, or the label would lie over the next neighbour.
            const stackedArc = isBelow && lines.length > 0 ? NODE_LABEL_GAP + (lines.length - 1) * LABEL_LINE_HEIGHT + LABEL_DESCENT : 0;
            arcLength += Math.max(getNodeStyle(neighbour).radius * 2 + stackedArc, labelArc) + NODE_ARC_GAP;
            widestNeighbourRadius = Math.max(widestNeighbourRadius, getNodeStyle(neighbour).radius);
        }

        const arcRadius = arcLength / (Math.PI * 2);
        const node = nodesById.get(nodeId);
        if (getLabelPlacementId() === 'below' || node?.label == null) return arcRadius; // A label below its node does not point out towards the ring.
        const ownLabelWidth = estimateLabelWidth(getLabelLines(node));
        return Math.max(arcRadius, getNodeStyle(node).radius + LABEL_OUTSIDE_GAP * 2 + ownLabelWidth + widestNeighbourRadius);
    };

    // A link is as long as asked for, or as long as the ring at either of its ends needs, whichever is longer.
    linkForce.distance((link) => {
        const linkDistance = options.linkDistance ?? DEFAULT_LINK_DISTANCE;
        if (options.reservesLabelRoom !== true) return linkDistance;
        const nodesById = new Map(nodes.map((node) => [node.id, node]));
        return Math.max(linkDistance, constructRingRadius(getNodeId(link.source), nodesById), constructRingRadius(getNodeId(link.target), nodesById));
    });

    // An action is something to do, so it never shows as the selected node. The selected node is the caller's, when
    // the caller keeps the selection, or else the last node clicked.
    const isSelectedOnClick = options.selectsOnClick !== false;
    const isShownSelected = (node: LaidOutNode): boolean => node.isAction !== true && (isSelectedOnClick ? node.id === selectedNodeId : node.isSelected === true);

    // A selected node shows in its ring, which takes the selected colour and widens, and a node without an icon fills
    // with that colour too. A selected node with an icon shows in its disc when the caller gives a colour for one,
    // and then keeps its own ring, so a thin ring stays thin.
    const nodeBorderWidth = options.nodeBorderWidth ?? DEFAULT_NODE_BORDER_WIDTH;
    // With a colour for a ring round the selected node, that ring is all that shows the selection.
    const isSelectedByOuterRing = (node: LaidOutNode): boolean => isShownSelected(node) && options.selectedRingColor != null;
    const isSelectedByDisc = (node: LaidOutNode): boolean => isShownSelected(node) && !isSelectedByOuterRing(node) && node.icon != null && options.selectedIconNodeColor != null;
    const isSelectedByRing = (node: LaidOutNode): boolean => isShownSelected(node) && !isSelectedByOuterRing(node) && !isSelectedByDisc(node);

    // A node's radius as drawn: a little larger for the selected node and the one under the pointer, unless the caller
    // keeps every node its own size.
    const constructDrawnRadius = (node: LaidOutNode): number => {
        const isActive = isShownSelected(node) || node.id === hoveredNodeId;
        return getNodeStyle(node).radius + (isActive && options.growsActiveNodes !== false ? NODE_RADIUS_ACTIVE_GROWTH : 0);
    };

    // A ring round a node, a little apart from it, for the nodes it applies to. Drawn after the node's own circle, which
    // stays the first circle in the node's group.
    const drawOuterRings = (className: string, color: string, isRinged: (node: LaidOutNode) => boolean, constructGap: (node: LaidOutNode) => number): void => {
        nodeSelection
            .selectAll<SVGCircleElement, LaidOutNode>(`circle.${className}`)
            .data((node) => (isRinged(node) ? [node] : []))
            .join('circle')
            .attr('class', className)
            .attr('fill', 'none')
            .attr('stroke-width', OUTER_RING_WIDTH)
            .attr('r', (node) => constructDrawnRadius(node) + constructGap(node) + OUTER_RING_WIDTH / 2)
            .style('stroke', color)
            .style('pointer-events', 'none');
    };

    // An action node in the caller's colours, or none of them to keep the diagram's own.
    const constructActionFill = (node: LaidOutNode): string | null => {
        const colors = options.actionNodeColors;
        if (colors == null) return null;
        return node.id === hoveredNodeId ? (colors.fillHovered ?? colors.fill) : colors.fill;
    };

    // The disc behind an icon: the caller's colour for the node under the pointer, then for the selected node, then
    // the node's own, or else the plain disc. A node with a disc of its own keeps it under the pointer, because its
    // icon is drawn to be seen on that colour, and dims a little there.
    const constructIconDiscColor = (node: LaidOutNode): string => {
        if (node.id === hoveredNodeId && options.hoveredIconNodeColor != null && node.discColor == null) return options.hoveredIconNodeColor;
        if (isSelectedByDisc(node) && options.selectedIconNodeColor != null) return options.selectedIconNodeColor;
        return node.discColor ?? options.iconNodeColor ?? ICON_NODE_COLOR;
    };

    // An icon keeps a plain disc, so the icon stays readable. A colour from the caller, such as a node's own colour or
    // the disc, is set as a style, so one given as a CSS variable follows the page's theme. The diagram's own colours
    // are set as attributes, which a style overrides.
    const updateNodeStyles = (): void => {
        nodeSelection
            .select<SVGCircleElement>('circle')
            .attr('fill', (node) => {
                if (node.icon != null) return null;
                if (isSelectedByRing(node)) return COLOR.nodeFillSelected;
                return node.id === hoveredNodeId ? getNodeStyle(node).fillHovered : getNodeStyle(node).fill;
            })
            .style('fill', (node) => {
                if (node.isAction === true) return constructActionFill(node);
                if (node.icon != null) return constructIconDiscColor(node);
                return isSelectedByRing(node) ? null : (node.color ?? null);
            })
            .attr('stroke', (node) => {
                if (isSelectedByRing(node)) return COLOR.nodeStrokeSelected;
                return node.id === hoveredNodeId ? getNodeStyle(node).strokeHovered : getNodeStyle(node).stroke;
            })
            .style('stroke', (node) => {
                if (node.isAction === true) return options.actionNodeColors?.border ?? null;
                return isSelectedByRing(node) ? null : (node.color ?? null);
            })
            .attr('stroke-width', (node) => (isSelectedByRing(node) ? nodeBorderWidth + 1 : nodeBorderWidth))
            .style('filter', (node) => (node.discColor != null && node.id === hoveredNodeId ? DISC_HOVER_FILTER : null))
            .attr('r', constructDrawnRadius);

        // The selected node's ring, and outside it the ring of the node with keyboard focus, so a node that is both
        // shows both. Screen readers are told which node is the selected one.
        const selectedRingGap = OUTER_RING_GAP;
        drawOuterRings(SELECTED_RING_CLASS_NAME, options.selectedRingColor ?? '', isSelectedByOuterRing, () => selectedRingGap);
        drawOuterRings(
            FOCUS_RING_CLASS_NAME,
            options.focusRingColor ?? FOCUS_RING_COLOR,
            (node) => node.id === focusedNodeId,
            (node) => (isSelectedByOuterRing(node) ? selectedRingGap + OUTER_RING_WIDTH + OUTER_RING_GAP : OUTER_RING_GAP)
        );
        nodeSelection.attr('aria-current', (node) => (isShownSelected(node) ? 'true' : null));

        // A badge sits on the node's edge at the upper right, so it moves out as the node grows. It is raised above the
        // rings, so a focus ring drawn later never covers it. It takes clicks, so a click on the part of it that lies
        // outside the node still reaches the node rather than the background, which would clear the selection.
        nodeSelection
            .selectAll<SVGGElement, LaidOutNode>(`g.${BADGE_CLASS_NAME}`)
            .data((node) => (node.badge == null ? [] : [node]))
            .join((enter) => {
                const badge = enter.append('g').attr('class', BADGE_CLASS_NAME);
                badge.append('circle');
                badge.append('path');
                return badge;
            })
            .attr('transform', (node) => {
                const distance = constructDrawnRadius(node) * Math.SQRT1_2;
                return `translate(${String(distance)},${String(-distance)})`;
            })
            .raise()
            .call((badge) => {
                badge
                    .select<SVGCircleElement>('circle')
                    .attr('r', BADGE_RADIUS)
                    .attr('fill', ACTION_STYLE.fill)
                    .style('fill', () => options.actionNodeColors?.fill ?? null)
                    .attr('stroke', ACTION_STYLE.stroke)
                    .style('stroke', () => options.actionNodeColors?.border ?? null)
                    .attr('stroke-width', BADGE_BORDER_WIDTH);
                badge
                    .select<SVGPathElement>('path')
                    .attr('d', (node) => (node.badge == null ? '' : BADGE_PATHS[node.badge]))
                    .attr('fill', 'none')
                    .attr('stroke', ACTION_STYLE.symbol)
                    .style('stroke', () => options.actionNodeColors?.symbol ?? null)
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-linejoin', 'round')
                    .attr('stroke-width', BADGE_STROKE_WIDTH);
            });
    };

    svgSelection.on('click', () => {
        selectedNodeId = null;
        updateNodeStyles();
    });

    // The filter keeps d3's own default, which ignores a right-click and a Ctrl-drag. A second finger is ignored rather
    // than the whole touch, so a one-finger drag still pans.
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
        .filter((event: MouseEvent | TouchEvent | WheelEvent) => {
            const isDefaultZoomEvent = (!event.ctrlKey || event.type === 'wheel') && (!('button' in event) || event.button === 0);
            const isPointerZoom = event.type === 'wheel' || ('touches' in event && event.touches.length > 1);
            return isDefaultZoomEvent && !(isPointerZoom && options.disablesPointerZoom === true);
        })
        .scaleExtent([MINIMUM_SCALE, MAXIMUM_SCALE])
        .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
            viewport.attr('transform', event.transform.toString());
        });
    svgSelection.call(zoomBehavior).on('dblclick.zoom', null);

    // Where a node's label goes, given where its neighbours now are.
    const constructNodeLabelPlacement = (node: LaidOutNode, nodesById: Map<string, LaidOutNode>): LabelPlacement => {
        const neighbours = (neighbourIdsById.get(node.id) ?? []).map((neighbourId) => nodesById.get(neighbourId)).filter((neighbour) => neighbour !== undefined);
        const ringAllowance = options.selectedRingColor == null ? 0 : OUTER_RING_GAP + OUTER_RING_WIDTH;
        return constructLabelPlacement(node, neighbours, getLabelPlacementId(), getLabelLines(node), options.labelHaloColor != null, ringAllowance);
    };

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
            const placement = constructNodeLabelPlacement(node, nodesById);
            const text = select(assertDefined(elements[index])).select<SVGTextElement>('text').attr('text-anchor', placement.anchor).attr('y', placement.y);
            text.selectAll<SVGTSpanElement, string>('tspan').attr('x', placement.x);
        });
    };

    // The box round every node with its label, in the diagram's own units. The room each label takes is worked out from
    // where it is placed, so a diagram with short labels, or labels below its nodes, is not made smaller than it needs
    // to be.
    const measureDiagramBounds = (): DiagramBounds | undefined => {
        if (nodes.length === 0) return undefined;
        const nodesById = new Map(nodes.map((node) => [node.id, node]));
        const bounds = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity };
        for (const node of nodes) {
            const [x, y] = [node.x ?? 0, node.y ?? 0];
            const badgeReach = node.badge == null ? 0 : (getNodeStyle(node).radius + NODE_RADIUS_ACTIVE_GROWTH) * Math.SQRT1_2 + BADGE_RADIUS + BADGE_BORDER_WIDTH / 2; // Out to the badge's far edge, on each axis.
            const radius = Math.max(getNodeStyle(node).radius + FIT_NODE_ALLOWANCE, badgeReach);
            const lines = node.label == null ? [] : getLabelLines(node); // An id is inside its node.
            const labelBox = lines.length === 0 ? undefined : constructLabelBox(constructNodeLabelPlacement(node, nodesById), lines);
            bounds.left = Math.min(bounds.left, x - radius, x + (labelBox?.left ?? 0));
            bounds.right = Math.max(bounds.right, x + radius, x + (labelBox?.right ?? 0));
            bounds.top = Math.min(bounds.top, y - radius, y + (labelBox?.top ?? 0));
            bounds.bottom = Math.max(bounds.bottom, y + radius, y + (labelBox?.bottom ?? 0));
        }
        return bounds;
    };

    // The diagram at a scale, moved so that as much of it as can be is in view. Along a side where it fits, it is placed
    // as a fitted diagram is: centred across, and centred or near the top down. Along a side where it does not fit, it
    // keeps the point at the middle of the container where it was, as a zoom does, but is moved back so no empty space
    // opens at one edge while the diagram runs past the other.
    const constructPlacedTransform = (bounds: DiagramBounds, scale: number, current = zoomTransform(svgNode)): ReturnType<typeof zoomIdentity.translate> => {
        const viewWidth = renderTo.clientWidth || DEFAULT_WIDTH;
        const viewHeight = renderTo.clientHeight || DEFAULT_HEIGHT;
        const placeAlongSide = (start: number, end: number, viewLength: number, currentOffset: number, isNearStart: boolean): number => {
            const length = (end - start) * scale;
            const spareLength = viewLength - length - FIT_MARGIN * 2;
            if (spareLength >= 0) {
                const startGap = isNearStart ? Math.min(Math.max(viewLength * TOP_ALIGNED_GAP_SHARE, FIT_MARGIN), FIT_MARGIN + spareLength) : FIT_MARGIN + spareLength / 2;
                return startGap - start * scale;
            }
            const zoomedOffset = viewLength / 2 - ((viewLength / 2 - currentOffset) * scale) / current.k;
            return Math.min(Math.max(zoomedOffset, viewLength - FIT_MARGIN - end * scale), FIT_MARGIN - start * scale);
        };
        const x = placeAlongSide(bounds.left, bounds.right, viewWidth, current.x, false);
        const y = placeAlongSide(bounds.top, bounds.bottom, viewHeight, current.y, options.fitAlignmentId === 'top');
        return zoomIdentity.translate(x, y).scale(scale);
    };

    // The view that shows the whole diagram. A small diagram is enlarged only as far as the caller allows.
    const constructFitTransform = (): ReturnType<typeof zoomIdentity.translate> | undefined => {
        const bounds = measureDiagramBounds();
        if (bounds == null) return undefined;
        const viewWidth = renderTo.clientWidth || DEFAULT_WIDTH;
        const viewHeight = renderTo.clientHeight || DEFAULT_HEIGHT;
        const widthScale = viewWidth / (bounds.right - bounds.left + FIT_MARGIN * 2);
        const heightScale = viewHeight / (bounds.bottom - bounds.top + FIT_MARGIN * 2);
        const scale = Math.max(MINIMUM_SCALE, Math.min(options.maximumFitScale ?? 1, widthScale, heightScale));
        // A diagram too large to fit even at the smallest scale is centred, so it runs past both edges evenly.
        const centred = zoomIdentity
            .translate(viewWidth / 2, viewHeight / 2)
            .scale(scale)
            .translate(-(bounds.left + bounds.right) / 2, -(bounds.top + bounds.bottom) / 2);
        return constructPlacedTransform(bounds, scale, centred);
    };

    const applyTransform = (transform: ReturnType<typeof zoomIdentity.translate>): void => {
        svgSelection.call((selection) => {
            zoomBehavior.transform(selection, transform);
        });
    };

    const runLayout = (): void => {
        laidOutLabelPlacementId = getLabelPlacementId();
        simulation.alpha(1);
        for (let step = 0; step < AUTO_LAYOUT_TICKS; step += 1) simulation.tick();
        simulation.stop();
    };

    const cancelAnimation = (): void => {
        if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
    };

    // What a click on a node does, and Enter or Space on the node with focus.
    const activateNode = (node: LaidOutNode): void => {
        if (isSelectedOnClick) selectedNodeId = selectedNodeId === node.id ? null : node.id;
        updateNodeStyles();
        options.onNodeClick?.(assertDefined(currentData.nodes.find((dataNode) => dataNode.id === node.id))); // The caller's own node, without the layout's positions.
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
        linkSelection = joinedLinks
            .enter()
            .append('line')
            .attr('stroke', COLOR.linkStroke)
            .style('stroke', () => options.linkColor ?? null) // A style, so a colour given as a CSS variable follows the page's theme.
            .attr('stroke-width', options.linkWidth ?? DEFAULT_LINK_WIDTH)
            .merge(joinedLinks);

        const joinedNodes = nodeSelection.data(nodes, (node) => node.id);
        const exitingNodes = joinedNodes.exit<LaidOutNode>().style('pointer-events', 'none').attr('tabindex', null); // A node on its way out takes no more clicks or key presses.
        // A node is a button: it takes keyboard focus, and Enter or Space does what a click does. Its own ring shows
        // focus, so the browser's outline, which would be a box round the node and its label, is switched off.
        const enteringNodes = joinedNodes.enter().append('g').attr('role', 'button').attr('tabindex', 0).style('cursor', 'pointer').style('outline', 'none');
        enteringNodes.append('title');
        enteringNodes.append('circle');
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
                activateNode(node);
            })
            .on('keydown', (event: KeyboardEvent, node) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault(); // Space would otherwise scroll the page.
                activateNode(node);
            })
            .on('focus', (event: FocusEvent, node) => {
                focusedNodeId = isFocusVisible(event.currentTarget) ? node.id : null;
                updateNodeStyles();
            })
            .on('blur', (_event, node) => {
                if (focusedNodeId === node.id) focusedNodeId = null;
                updateNodeStyles();
            });
        if (options.disablesNodeDrag !== true) {
            type DragEvent = D3DragEvent<SVGGElement, LaidOutNode, LaidOutNode>;
            enteringNodes.call(
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
        }
        nodeSelection = enteringNodes.merge(joinedNodes);

        // The text is set on nodes that stay too, because an update may give a node a new label. A label goes beside its
        // node in the page's text colour, which follows the light or dark theme. An id is short, so it stays inside the node.
        nodeSelection
            .select<SVGTextElement>('text')
            .attr('text-anchor', 'middle')
            .attr('y', (node) => (node.label == null ? 4 : getNodeStyle(node).radius + NODE_LABEL_GAP))
            .attr('font-size', (node) => (node.label == null ? null : LABEL_FONT_SIZE))
            .attr('fill', (node) => (node.label == null ? COLOR.nodeText : 'currentColor')) // Explicit, because iOS Safari can default to transparent.
            // The outline is painted first, under the letters, so it hides the links behind a label without thinning the
            // letters. Set as styles, so a colour given as a CSS variable follows the page's theme.
            .style('paint-order', (node) => (node.label == null || options.labelHaloColor == null ? null : 'stroke'))
            .style('stroke', (node) => (node.label == null ? null : (options.labelHaloColor ?? null)))
            .style('stroke-linejoin', (node) => (node.label == null || options.labelHaloColor == null ? null : 'round'))
            .style('stroke-width', (node) => (node.label == null || options.labelHaloColor == null ? null : `${String(LABEL_HALO_WIDTH)}px`))
            .selectAll<SVGTSpanElement, string>('tspan')
            .data(getLabelLines)
            .join('tspan')
            .attr('x', 0)
            .attr('dy', (_line, lineIndex) => (lineIndex === 0 ? 0 : LABEL_LINE_HEIGHT))
            .text((line) => line);
        // An icon is drawn as an image, which is its own document, so ids inside one icon cannot clash with another's
        // and any script in the markup never runs. Set on nodes that stay too, because an update may change the icon.
        nodeSelection
            .selectAll<SVGImageElement, LaidOutNode>(`image.${ICON_CLASS_NAME}`)
            .data((node) => (node.icon == null ? [] : [node]))
            .join('image')
            .attr('class', ICON_CLASS_NAME)
            .attr('href', (node) => `data:image/svg+xml,${encodeURIComponent(node.icon ?? '')}`)
            .attr('x', -ICON_SIZE / 2)
            .attr('y', -ICON_SIZE / 2)
            .attr('width', ICON_SIZE)
            .attr('height', ICON_SIZE)
            .style('pointer-events', 'none');
        // Set on nodes that stay too, because an update may change either. A symbol sits in the middle of its node, in the
        // action's own colour or else white, as an id is. A symbol the diagram knows is drawn as lines measured from
        // the node's centre, so it is centred exactly. Any other is drawn as text, which a font places only roughly.
        // A label that has been cut short is the node's tooltip, so the whole of it can still be read.
        nodeSelection.select<SVGTitleElement>('title').text((node) => node.title ?? (isLabelCut(node, options.maximumLabelLength) ? (node.label ?? '') : ''));
        nodeSelection.attr('aria-label', (node) => node.accessibleLabel ?? node.label ?? node.title ?? node.id); // A screen reader names the node as a sighted user reads it, unless the caller names it.
        nodeSelection
            .selectAll<SVGPathElement, LaidOutNode>(`path.${SYMBOL_CLASS_NAME}`)
            .data((node) => (constructSymbolPath(node) == null ? [] : [node])) // Only a node with such a symbol has an element for one.
            .join('path')
            .attr('class', SYMBOL_CLASS_NAME)
            .attr('d', (node) => constructSymbolPath(node) ?? '')
            .attr('fill', 'none')
            .attr('stroke', constructSymbolColor)
            .style('stroke', (node) => (node.isAction === true ? (options.actionNodeColors?.symbol ?? null) : null))
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', SYMBOL_STROKE_WIDTH)
            .style('pointer-events', 'none');
        nodeSelection
            .selectAll<SVGTextElement, LaidOutNode>(`text.${SYMBOL_CLASS_NAME}`)
            .data((node) => (node.symbol == null || constructSymbolPath(node) != null ? [] : [node]))
            .join('text')
            .attr('class', SYMBOL_CLASS_NAME)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', SYMBOL_FONT_SIZE)
            .attr('font-weight', 600)
            .attr('fill', constructSymbolColor)
            .style('pointer-events', 'none')
            .text((node) => node.symbol ?? '');
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
        fitView: () => {
            const fitTransform = constructFitTransform();
            if (fitTransform) applyTransform(fitTransform);
        },
        resize: () => {
            const newWidth = renderTo.clientWidth || DEFAULT_WIDTH;
            const newHeight = renderTo.clientHeight || DEFAULT_HEIGHT;
            svgSelection
                .attr('width', newWidth)
                .attr('height', newHeight)
                .attr('viewBox', `0 0 ${String(newWidth)} ${String(newHeight)}`);
            simulation.force('center', forceCenter(newWidth / 2, newHeight / 2));

            // A fitted diagram stays in the middle of its container at its new size. Left alone while a change is being
            // drawn, because the nodes are then between places. The change fits the diagram itself when it ends.
            if (animationFrameId !== undefined) return;
            // A container that has become narrow, or stopped being narrow, has its labels placed differently, which
            // needs links of another length.
            if (getLabelPlacementId() !== laidOutLabelPlacementId) {
                runLayout();
                renderGraph();
            }
            if (options.fitsView !== true) return;
            const fitTransform = constructFitTransform();
            if (fitTransform) applyTransform(fitTransform);
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
            // Data that differs only in how its nodes look, such as which one is selected, changes nothing about where
            // they are. The nodes are drawn again where they stand, and a change already being drawn carries on.
            if (constructStructureKey(newData) === constructStructureKey(currentData)) {
                applyData(newData);
                if (animationFrameId === undefined) renderGraph();
                return;
            }

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
                // Fitted again at the end, because the container may have been resized while the change was drawn.
                const endTransform = options.fitsView === true ? constructFitTransform() : undefined;
                if (endTransform) applyTransform(endTransform);
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
        },
        // A zoom button keeps as much of the diagram in view as it can, so zooming in on a small diagram grows it into the
        // free space rather than pushing it past an edge. A wheel or pinch still zooms about the pointer.
        zoomBy: (factor) => {
            const current = zoomTransform(svgNode);
            const scale = Math.min(Math.max(current.k * factor, MINIMUM_SCALE), MAXIMUM_SCALE);
            const bounds = measureDiagramBounds();
            if (bounds == null) return;
            applyTransform(constructPlacedTransform(bounds, scale, current));
        }
    };
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Labels

// A node's label as the lines it is drawn on, which is none for a node that shows only a symbol. A long label of several words breaks at the space nearest its middle, so
// its two lines are as even as they can be. A node with no label shows its id.
function constructLabelLines(node: NetworkDiagramNode, isWrapped: boolean, maximumLength: number | undefined): string[] {
    if (node.label == null && (node.symbol != null || node.icon != null)) return []; // The symbol or icon is all such a node shows.
    if (node.label == null) return [node.id];
    return wrapLabel(node.label, isWrapped).map((line) => cutLabelLine(line, maximumLength));
}

function wrapLabel(label: string, isWrapped: boolean): string[] {
    if (!isWrapped || label.length <= LABEL_WRAP_LENGTH) return [label];

    const middle = label.length / 2;
    let breakIndex = -1;
    for (let spaceIndex = label.indexOf(' '); spaceIndex !== -1; spaceIndex = label.indexOf(' ', spaceIndex + 1)) {
        if (breakIndex === -1 || Math.abs(spaceIndex - middle) < Math.abs(breakIndex - middle)) breakIndex = spaceIndex;
    }
    return breakIndex === -1 ? [label] : [label.slice(0, breakIndex), label.slice(breakIndex + 1)];
}

// A line longer than the most allowed keeps that many characters, the last of them an ellipsis.
function cutLabelLine(line: string, maximumLength: number | undefined): string {
    const isShortEnough = maximumLength == null || line.length <= maximumLength;
    return isShortEnough ? line : `${line.slice(0, Math.max(0, maximumLength - 1)).trimEnd()}${LABEL_ELLIPSIS}`;
}

function isLabelCut(node: NetworkDiagramNode, maximumLength: number | undefined): boolean {
    return node.label != null && constructLabelLines(node, true, maximumLength).join(' ') !== constructLabelLines(node, true, undefined).join(' ');
}

// The room a placed label takes, measured from the middle of its node.
function constructLabelBox(placement: LabelPlacement, lines: string[]): { bottom: number; left: number; right: number; top: number } {
    const width = estimateLabelWidth(lines);
    const left = placement.anchor === 'start' ? placement.x : placement.x - (placement.anchor === 'end' ? width : width / 2);
    return { bottom: placement.y + (lines.length - 1) * LABEL_LINE_HEIGHT + LABEL_DESCENT, left, right: left + width, top: placement.y - LABEL_FONT_SIZE };
}

function estimateLabelWidth(lines: string[]): number {
    return lines.length === 0 ? 0 : Math.max(...lines.map((line) => line.length)) * LABEL_CHARACTER_WIDTH;
}

// Where a label goes relative to the middle of its node. 'outside' points the label into the widest gap between the
// node's links, where it is least likely to cross one. For a node with one link that is the side facing away from its
// neighbour, so the labels of a star fan outwards. The label goes to the left or right when that direction leans
// sideways, otherwise above or below. A node with no links has no such direction, so its label goes below. A node
// whose widest gap is a narrow wedge between two links has its label centred further out along the middle of the
// wedge, where the wedge is wide enough to hold it.
function constructLabelPlacement(
    node: LaidOutNode,
    neighbours: LaidOutNode[],
    labelPlacementId: NetworkDiagramLabelPlacementId,
    lines: string[],
    hasHalo: boolean,
    ringAllowance: number
): LabelPlacement {
    const radius = getNodeStyle(node).radius + ringAllowance; // A label keeps clear of a ring that may be drawn round its node.
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
    const extraLinesHeight = (lines.length - 1) * LABEL_LINE_HEIGHT;

    // In a wedge, the label is as near the node as it can be without either link crossing it, but never further out
    // than its own width, because a wedge among many links never gets wide enough. A label with a halo hides a link
    // behind it, so only its middle has to clear the links, and it stays nearer its node.
    if (widestGap < LABEL_WEDGE_ANGLE) {
        const labelWidth = estimateLabelWidth(lines);
        const labelHeight = lines.length * LABEL_LINE_HEIGHT;
        const halfAlong = (Math.abs(directionX) * labelWidth + Math.abs(directionY) * labelHeight) / 2; // Half the label's extent along the wedge.
        const halfAcross = (Math.abs(directionX) * labelHeight + Math.abs(directionY) * labelWidth) / 2; // Half its extent across the wedge.
        const nearestDistance = radius + LABEL_OUTSIDE_GAP + halfAlong;
        const clearDistance = (halfAcross * (hasHalo ? LABEL_WEDGE_HALO_RATIO : 1)) / Math.tan(widestGap / 2) + halfAlong;
        const distance = Math.min(Math.max(nearestDistance, clearDistance), nearestDistance + labelWidth);
        return { anchor: 'middle', x: directionX * distance, y: directionY * distance + LABEL_FONT_SIZE / 3 - extraLinesHeight / 2 };
    }

    if (Math.abs(directionX) < LABEL_SIDE_THRESHOLD) return directionY > 0 ? below : { anchor: 'middle', x: 0, y: -(radius + LABEL_OUTSIDE_GAP) - extraLinesHeight };

    // Beside the node, with the label's lines centred on the height its direction points to. A label on a diagonal is
    // moved further out by the part of its height that would otherwise reach back over the node.
    const offset = radius + LABEL_OUTSIDE_GAP + (Math.abs(directionY) * lines.length * LABEL_LINE_HEIGHT) / 2;
    return { anchor: directionX > 0 ? 'start' : 'end', x: directionX * offset, y: directionY * offset + LABEL_FONT_SIZE / 3 - extraLinesHeight / 2 };
}

// ── Focus

// Whether an element's focus came from the keyboard. True where the browser cannot say, so focus is never hidden.
function isFocusVisible(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    try {
        return target.matches(':focus-visible');
    } catch {
        return true;
    }
}

// ── Symbols

// The lines of a symbol the diagram draws itself, measured from the node's centre. Undefined for a node with no symbol,
// or with one drawn as text.
function constructSymbolPath(node: NetworkDiagramNode): string | undefined {
    const arm = SYMBOL_PLUS_ARM_LENGTH;
    return node.symbol === '+' ? `M${String(-arm)},0H${String(arm)}M0,${String(-arm)}V${String(arm)}` : undefined;
}

function constructSymbolColor(node: NetworkDiagramNode): string {
    return node.isAction === true ? ACTION_STYLE.symbol : COLOR.nodeText;
}

// ── Data

// Everything about data that decides where its nodes go: the nodes, their labels, which take room, and the links.
function constructStructureKey(data: NetworkDiagramData): string {
    return JSON.stringify([data.nodes.map((node) => [node.id, node.label, node.level, node.isAction, node.icon != null]), data.links.map((link) => [link.source, link.target])]);
}

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

// How a node is drawn: as an action, or else by its level. A node with an icon is ringed in its level's colour, and
// is one size at every level.
function getNodeStyle(node: NetworkDiagramNode): { fill: string; fillHovered: string; radius: number; stroke: string; strokeHovered: string } {
    if (node.isAction === true) return ACTION_STYLE;
    const level = Math.max(0, Math.min(node.level ?? DEFAULT_LEVEL, LEVEL_STYLES.length - 1));
    const levelStyle = assertDefined(LEVEL_STYLES[level]);
    return node.icon == null ? levelStyle : { ...levelStyle, radius: ICON_NODE_RADIUS, stroke: levelStyle.fill, strokeHovered: levelStyle.stroke };
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
