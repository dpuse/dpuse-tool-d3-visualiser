# DPUse D3 Visualiser Tool

Consider an **eCharts** visualiser along with existing **Highcharts** (comercial).

<!-- OPENING_START -->

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![DPUse version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.dpuse.app%2Fconfigs%2Fdpuse-tool-d3-visualiser&query=%24.data.version&prefix=v&label=DPUse&color=blue)](https://github.com/dpuse/dpuse-tool-d3-visualiser/releases/latest)
[![npm version](https://img.shields.io/npm/v/@dpuse/dpuse-tool-d3-visualiser?label=npm)](https://www.npmjs.com/package/@dpuse/dpuse-tool-d3-visualiser)
[![CI](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml/badge.svg)](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml)

A TypeScript wrapper for D3, TanStack Charts, and Unovis that implements the Data Positioning chart-rendering interface, providing ERD (dagre), Sankey (d3-sankey), chord (Unovis), network (d3-force), tree (d3-hierarchy), and bar chart (TanStack Charts) renderers.

[Report a Vulnerability](https://github.com/dpuse/dpuse-tool-d3-visualiser/security/advisories/new) · [Open an Issue](https://github.com/dpuse/dpuse-tool-d3-visualiser/issues)

## About DPUse

[DPUse](https://www.dpuse.app) (Data Positioning & Use) is an in-browser application that positions your data for use through three core activities: sourcing, contextualising, and publishing.

**Sourcing** uses a library of [Connectors](https://www.dpuse.app/connectors) to establish [Connections](https://www.dpuse.app) to applications, databases, file stores, and curated datasets; these connections are subsequently used to configure structured [Data Views](https://www.dpuse.app) from the underlying sources.

**Contextualising** extracts chronological events from those [Data Views](https://www.dpuse.app) and maps them into comprehensive [Context Models](https://www.dpuse.app). This gives the DPUse Engine the structural framework needed to generate deterministic transactions, facts, or observations.

**Publishing** uses a library of [Presenters](https://www.dpuse.app) to render standard [Presentations](https://www.dpuse.app) immediately using the contextualised data; additionally, [Cookbooks](https://www.dpuse.app) of [Recipes](https://www.dpuse.app) let you build Data Apps using your preferred tools.

In addition, DPUse provides [Tools](https://www.dpuse.app) used by the application, and you can use them to construct connectors and presenters.

## Introduction

...

<!-- OPENING_END -->

## Design Notes

- All D3 submodules (`d3-sankey`, `d3-selection`, and their transitive `d3-array`/`d3-shape` dependencies) are bundled
  directly into this tool's build, the same way `@dpuse/-visualiser` bundles Highcharts. There is exactly
  one copy of each module per page load regardless of how many times this tool is dynamically imported, since the
  browser's module registry caches `import()` calls by resolved URL.
- Rendering happens on the main thread because it writes directly into a real `HTMLElement` - the DPUse Engine's
  connector/context processing runs inside a dedicated Web Worker, but presentation-rendering tools (this one and
  Highcharts) are loaded the same way `dpuse-presenter-default` is, directly by the host app.
- Node identity is carried by a direct text label on every node, not by colour alone, so the categorical palette is
  free to cycle past its 8 fixed slots for diagrams with more nodes than that.

A TypeScript wrapper for D3 that implements the Data Positioning chart-rendering interface, starting with a Sankey
diagram renderer built on `d3-sankey` and `d3-selection`.

<!-- USAGE_START -->

## Usage

This [package](https://www.npmjs.com/package/@dpuse/dpuse-tool-d3-visualiser) is available on [npm](https://www.npmjs.com/). Install it with:

```bash
npm install @dpuse/dpuse-tool-d3-visualiser
```

To work on the source instead, clone this repository.

```bash
git clone https://github.com/dpuse/dpuse-tool-d3-visualiser.git
cd dpuse-tool-d3-visualiser
npm install
```

_Requires [Node.js](https://nodejs.org/) 24 or later, [npm](https://www.npmjs.com/) 12 or later, and [TypeScript](https://www.typescriptlang.org/) 6.0.3 or later._

This repository is managed using the common set of actions provided by [@dpuse/dpuse-development](https://github.com/dpuse/dpuse-development). See the `scripts` block in [package.json](https://github.com/dpuse/dpuse-tool-d3-visualiser/blob/main/package.json) for details.

<!-- USAGE_END -->

There's no need to install this tool manually. Once released, it's uploaded to the Data Positioning Engine cloud and
becomes instantly available to all new instances of the browser app. A notification about the new version is also
sent to all existing browser apps.

Basic usage example with no error handling.

```typescript
import type { D3Tool as D3ToolType, SankeyDiagramData } from '@dpuse/dpuse-tool-d3-visualiser';

async function loadD3Tool(version: string): Promise<D3ToolType> {
    if (d3Tool) return d3Tool;

    const URL = `https://engine-eu.dpuse.app/tools/d3_v${version}/dpuse-tool-d3.es.js`;
    const D3Tool = (await import(/* @vite-ignore */ URL)).D3Tool as new () => D3ToolType;
    return new D3Tool();
}

const d3Tool = await loadD3Tool('n.n.nnn');

const data: SankeyDiagramData = {
    nodes: [
        { id: 'sourcing', name: 'Sourcing' },
        { id: 'contextualising', name: 'Contextualising' },
        { id: 'publishing', name: 'Publishing' }
    ],
    links: [
        { source: 'sourcing', target: 'contextualising', value: 8 },
        { source: 'contextualising', target: 'publishing', value: 5 }
    ]
};

const view = d3Tool.renderSankeyDiagram(data, renderTo);
// Call view.resize() after the container's size changes to redraw the layout.
```

<!-- DEPENDENCY_LICENSES_START -->

## Dependency Licenses

License data is updated each time `npm run document` is run, using [license-checker](https://github.com/RSeidelsohn/license-checker-rseidelsohn). The following table lists every package whose code, styles or assets are included in this project's build, as recorded by the build itself. Modules loaded at run time are not included; each documents its own. These dependencies have been checked and confirmed to use Apache-2.0, BSD-3-Clause, ISC, or MIT, all of which allow commercial use. All are used unmodified, so any licence conditions that apply only to modified versions are not triggered. Developers cloning this repository should independently verify development dependencies.

| Dependency                                                            | Version | License(s)   | Document                                                                |
| :-------------------------------------------------------------------- | :-----: | :----------- | :---------------------------------------------------------------------- |
| [@dagrejs/dagre](https://github.com/dagrejs/dagre)                    |  3.1.3  | MIT          | [LICENSE](licenses/downloads/@dagrejs/dagre@3.1.3-LICENSE.txt)          |
| [@emotion/cache](https://github.com/emotion-js/emotion.git#main)      | 11.14.0 | MIT          | [LICENSE](licenses/downloads/@emotion/cache@11.14.0-LICENSE.txt)        |
| [@emotion/css](https://github.com/emotion-js/emotion.git#main)        | 11.13.5 | MIT          | [LICENSE](licenses/downloads/@emotion/css@11.13.5-LICENSE.txt)          |
| [@emotion/hash](https://github.com/emotion-js/emotion.git#main)       |  0.9.2  | MIT          | [LICENSE](licenses/downloads/@emotion/hash@0.9.2-LICENSE.txt)           |
| [@emotion/memoize](https://github.com/emotion-js/emotion.git#main)    |  0.9.0  | MIT          | [LICENSE](licenses/downloads/@emotion/memoize@0.9.0-LICENSE.txt)        |
| [@emotion/serialize](https://github.com/emotion-js/emotion.git#main)  |  1.3.3  | MIT          | [LICENSE](licenses/downloads/@emotion/serialize@1.3.3-LICENSE.txt)      |
| [@emotion/sheet](https://github.com/emotion-js/emotion.git#main)      |  1.4.0  | MIT          | [LICENSE](licenses/downloads/@emotion/sheet@1.4.0-LICENSE.txt)          |
| [@emotion/unitless](https://github.com/emotion-js/emotion.git#main)   | 0.10.0  | MIT          | [LICENSE](licenses/downloads/@emotion/unitless@0.10.0-LICENSE.txt)      |
| [@emotion/utils](https://github.com/emotion-js/emotion.git#main)      |  1.4.2  | MIT          | [LICENSE](licenses/downloads/@emotion/utils@1.4.2-LICENSE.txt)          |
| [@juggle/resize-observer](https://github.com/juggle/resize-observer)  |  3.4.0  | Apache-2.0   | [LICENSE](licenses/downloads/@juggle/resize-observer@3.4.0-LICENSE.txt) |
| [@tanstack/charts](https://github.com/TanStack/charts)                |  1.1.0  | MIT          | [LICENSE](licenses/downloads/@tanstack/charts@1.1.0-LICENSE.txt)        |
| [@unovis/ts](https://github.com/f5/unovis)                            |  1.7.1  | Apache-2.0   | [LICENSE](licenses/downloads/@unovis/ts@1.7.1-LICENSE.txt)              |
| [d3-array](https://github.com/d3/d3-array)                            |  3.2.4  | ISC          | [LICENSE](licenses/downloads/d3-array@3.2.4-LICENSE.txt)                |
| [d3-chord](https://github.com/d3/d3-chord)                            |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-chord@3.0.1-LICENSE.txt)                |
| [d3-color](https://github.com/d3/d3-color)                            |  3.1.0  | ISC          | [LICENSE](licenses/downloads/d3-color@3.1.0-LICENSE.txt)                |
| [d3-dispatch](https://github.com/d3/d3-dispatch)                      |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-dispatch@3.0.1-LICENSE.txt)             |
| [d3-drag](https://github.com/d3/d3-drag)                              |  3.0.0  | ISC          | [LICENSE](licenses/downloads/d3-drag@3.0.0-LICENSE.txt)                 |
| [d3-ease](https://github.com/d3/d3-ease)                              |  3.0.1  | BSD-3-Clause | [LICENSE](licenses/downloads/d3-ease@3.0.1-LICENSE.txt)                 |
| [d3-force](https://github.com/d3/d3-force)                            |  3.0.0  | ISC          | [LICENSE](licenses/downloads/d3-force@3.0.0-LICENSE.txt)                |
| [d3-format](https://github.com/d3/d3-format)                          |  3.1.2  | ISC          | [LICENSE](licenses/downloads/d3-format@3.1.2-LICENSE.txt)               |
| [d3-hierarchy](https://github.com/d3/d3-hierarchy)                    |  3.1.2  | ISC          | [LICENSE](licenses/downloads/d3-hierarchy@3.1.2-LICENSE.txt)            |
| [d3-interpolate](https://github.com/d3/d3-interpolate)                |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-interpolate@3.0.1-LICENSE.txt)          |
| [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path) |  2.3.0  | BSD-3-Clause | [LICENSE](licenses/downloads/d3-interpolate-path@2.3.0-LICENSE.txt)     |
| [d3-path](https://github.com/d3/d3-path)                              |  3.1.0  | ISC          | [LICENSE](licenses/downloads/d3-path@3.1.0-LICENSE.txt)                 |
| [d3-quadtree](https://github.com/d3/d3-quadtree)                      |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-quadtree@3.0.1-LICENSE.txt)             |
| [d3-sankey](https://github.com/d3/d3-sankey)                          | 0.12.3  | BSD-3-Clause | [LICENSE](licenses/downloads/d3-sankey@0.12.3-LICENSE.txt)              |
| [d3-scale](https://github.com/d3/d3-scale)                            |  4.0.2  | ISC          | [LICENSE](licenses/downloads/d3-scale@4.0.2-LICENSE.txt)                |
| [d3-selection](https://github.com/d3/d3-selection)                    |  3.0.0  | ISC          | [LICENSE](licenses/downloads/d3-selection@3.0.0-LICENSE.txt)            |
| [d3-shape](https://github.com/d3/d3-shape)                            |  3.2.0  | ISC          | [LICENSE](licenses/downloads/d3-shape@3.2.0-LICENSE.txt)                |
| [d3-timer](https://github.com/d3/d3-timer)                            |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-timer@3.0.1-LICENSE.txt)                |
| [d3-transition](https://github.com/d3/d3-transition)                  |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-transition@3.0.1-LICENSE.txt)           |
| [d3-zoom](https://github.com/d3/d3-zoom)                              |  3.0.0  | ISC          | [LICENSE](licenses/downloads/d3-zoom@3.0.0-LICENSE.txt)                 |
| [internmap](https://github.com/mbostock/internmap)                    |  2.0.3  | ISC          | [LICENSE](licenses/downloads/internmap@2.0.3-LICENSE.txt)               |
| [stylis](https://github.com/thysultan/stylis.js)                      |  4.2.0  | MIT          | [LICENSE](licenses/downloads/stylis@4.2.0-LICENSE.txt)                  |
| [throttle-debounce](https://github.com/niksy/throttle-debounce)       |  5.0.2  | MIT          | [LICENSE](licenses/downloads/throttle-debounce@5.0.2-LICENSE.txt)       |

### Dependency Tree

The dependency tree below shows how each package in the table above is reached — direct and transitive — along with its installed version, release date, and update status. A package that does not ship itself, such as one whose parts are bundled separately, is left out and what ships beneath it is shown in its place. Packages flagged ❗ have a newer version available; ⚠️ indicates a package that hasn't been updated in the last 6 months or longer. Neither flag necessarily indicates a problem: we let new releases stabilise before upgrading, and some packages are mature and stable (have limited or no dependencies), so they require no active development.

- **[@dagrejs/dagre](https://github.com/dagrejs/dagre)** 3.1.3 — this month: 2026-10-24
- **[@tanstack/charts](https://github.com/TanStack/charts)** 1.1.0 — this month: 2026-10-09
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 40 mths ago: 2023-05-30 ⚠️
        - **[internmap](https://github.com/mbostock/internmap)** 2.0.3 — 61 mths ago: 2021-09-20 ⚠️
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-drag](https://github.com/d3/d3-drag)** 3.0.0 — 64 mths ago: 2021-06-09 ⚠️
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.0 — 64 mths ago: 2021-06-07 ⚠️
    - **[d3-transition](https://github.com/d3/d3-transition)** 3.0.1 — 64 mths ago: 2021-06-09 ⚠️
    - **[d3-force](https://github.com/d3/d3-force)** 3.0.0 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-hierarchy](https://github.com/d3/d3-hierarchy)** 3.1.2 — 54 mths ago: 2022-04-02 ⚠️
    - **[d3-sankey](https://github.com/d3/d3-sankey)** 0.12.3 — 85 mths ago: 2019-09-02 ⚠️
    - **[d3-scale](https://github.com/d3/d3-scale)** 4.0.2 — 61 mths ago: 2021-09-24 ⚠️
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.0 — 64 mths ago: 2021-06-07 ⚠️
    - **[d3-shape](https://github.com/d3/d3-shape)** 3.2.0 — 46 mths ago: 2022-12-20 ⚠️
    - **[d3-zoom](https://github.com/d3/d3-zoom)** 3.0.0 — 64 mths ago: 2021-06-10 ⚠️
- **[@unovis/ts](https://github.com/f5/unovis)** 1.7.1 — this month: 2026-09-29
    - **[@emotion/css](https://github.com/emotion-js/emotion.git#main)** 11.13.5 — 23 mths ago: 2024-11-20 ⚠️
        - **[@emotion/hash](https://github.com/emotion-js/emotion.git#main)** 0.9.2 — 27 mths ago: 2024-07-19 ⚠️
        - **[@emotion/memoize](https://github.com/emotion-js/emotion.git#main)** 0.9.0 — 27 mths ago: 2024-07-19 ⚠️
        - **[@emotion/serialize](https://github.com/emotion-js/emotion.git#main)** 1.3.3 — 23 mths ago: 2024-11-20 ⚠️
        - **[stylis](https://github.com/thysultan/stylis.js)** 4.2.0 — 41 mths ago: 2023-05-05 ⚠️ → latest: 4.4.0 — 6 mths ago: 2026-04-19 ❗
        - **[@emotion/cache](https://github.com/emotion-js/emotion.git#main)** 11.14.0 — 22 mths ago: 2024-12-09 ⚠️
            - **[@emotion/memoize](https://github.com/emotion-js/emotion.git#main)** 0.9.0 — 27 mths ago: 2024-07-19 ⚠️
            - **[@emotion/sheet](https://github.com/emotion-js/emotion.git#main)** 1.4.0 — 27 mths ago: 2024-07-20 ⚠️
            - **[@emotion/utils](https://github.com/emotion-js/emotion.git#main)** 1.4.2 — 23 mths ago: 2024-11-20 ⚠️
            - **[stylis](https://github.com/thysultan/stylis.js)** 4.2.0 — 41 mths ago: 2023-05-05 ⚠️ → latest: 4.4.0 — 6 mths ago: 2026-04-19 ❗
        - **[@emotion/serialize](https://github.com/emotion-js/emotion.git#main)** 1.3.3 — 23 mths ago: 2024-11-20 ⚠️
            - **[@emotion/hash](https://github.com/emotion-js/emotion.git#main)** 0.9.2 — 27 mths ago: 2024-07-19 ⚠️
            - **[@emotion/memoize](https://github.com/emotion-js/emotion.git#main)** 0.9.0 — 27 mths ago: 2024-07-19 ⚠️
            - **[@emotion/unitless](https://github.com/emotion-js/emotion.git#main)** 0.10.0 — 26 mths ago: 2024-08-21 ⚠️
            - **[@emotion/utils](https://github.com/emotion-js/emotion.git#main)** 1.4.2 — 23 mths ago: 2024-11-20 ⚠️
        - **[@emotion/sheet](https://github.com/emotion-js/emotion.git#main)** 1.4.0 — 27 mths ago: 2024-07-20 ⚠️
        - **[@emotion/utils](https://github.com/emotion-js/emotion.git#main)** 1.4.2 — 23 mths ago: 2024-11-20 ⚠️
    - **[@juggle/resize-observer](https://github.com/juggle/resize-observer)** 3.4.0 — 50 mths ago: 2022-08-18 ⚠️
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 40 mths ago: 2023-05-30 ⚠️
    - **[d3-chord](https://github.com/d3/d3-chord)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
        - **[d3-path](https://github.com/d3/d3-path)** 3.1.0 — 46 mths ago: 2022-12-19 ⚠️
    - **[d3-color](https://github.com/d3/d3-color)** 3.1.0 — 55 mths ago: 2022-03-28 ⚠️
    - **[d3-drag](https://github.com/d3/d3-drag)** 3.0.0 — 64 mths ago: 2021-06-09 ⚠️
    - **[d3-ease](https://github.com/d3/d3-ease)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-force](https://github.com/d3/d3-force)** 3.0.0 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-hierarchy](https://github.com/d3/d3-hierarchy)** 3.1.2 — 54 mths ago: 2022-04-02 ⚠️
    - **[d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path)** 2.3.0 — 49 mths ago: 2022-08-31 ⚠️
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
        - **[d3-color](https://github.com/d3/d3-color)** 3.1.0 — 55 mths ago: 2022-03-28 ⚠️
    - **[d3-path](https://github.com/d3/d3-path)** 3.1.0 — 46 mths ago: 2022-12-19 ⚠️
    - **[d3-sankey](https://github.com/d3/d3-sankey)** 0.12.3 — 85 mths ago: 2019-09-02 ⚠️
    - **[d3-scale](https://github.com/d3/d3-scale)** 4.0.2 — 61 mths ago: 2021-09-24 ⚠️
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.0 — 64 mths ago: 2021-06-07 ⚠️
    - **[d3-shape](https://github.com/d3/d3-shape)** 3.2.0 — 46 mths ago: 2022-12-20 ⚠️
    - **[d3-timer](https://github.com/d3/d3-timer)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-transition](https://github.com/d3/d3-transition)** 3.0.1 — 64 mths ago: 2021-06-09 ⚠️
        - **[d3-color](https://github.com/d3/d3-color)** 3.1.0 — 55 mths ago: 2022-03-28 ⚠️
        - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
        - **[d3-ease](https://github.com/d3/d3-ease)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
        - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
        - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.0 — 64 mths ago: 2021-06-07 ⚠️
        - **[d3-timer](https://github.com/d3/d3-timer)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-zoom](https://github.com/d3/d3-zoom)** 3.0.0 — 64 mths ago: 2021-06-10 ⚠️
    - **[d3-format](https://github.com/d3/d3-format)** 3.1.2 — 9 mths ago: 2026-01-14 ⚠️
    - **[d3-quadtree](https://github.com/d3/d3-quadtree)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[throttle-debounce](https://github.com/niksy/throttle-debounce)** 5.0.2 — 28 mths ago: 2024-06-24 ⚠️
- **[d3-drag](https://github.com/d3/d3-drag)** 3.0.0 — 64 mths ago: 2021-06-09 ⚠️
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.0 — 64 mths ago: 2021-06-07 ⚠️
- **[d3-force](https://github.com/d3/d3-force)** 3.0.0 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-quadtree](https://github.com/d3/d3-quadtree)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-timer](https://github.com/d3/d3-timer)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
- **[d3-hierarchy](https://github.com/d3/d3-hierarchy)** 3.1.2 — 54 mths ago: 2022-04-02 ⚠️
- **[d3-sankey](https://github.com/d3/d3-sankey)** 0.12.3 — 85 mths ago: 2019-09-02 ⚠️
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 40 mths ago: 2023-05-30 ⚠️
    - **[d3-shape](https://github.com/d3/d3-shape)** 3.2.0 — 46 mths ago: 2022-12-20 ⚠️
- **[d3-scale](https://github.com/d3/d3-scale)** 4.0.2 — 61 mths ago: 2021-09-24 ⚠️
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 40 mths ago: 2023-05-30 ⚠️
    - **[d3-format](https://github.com/d3/d3-format)** 3.1.2 — 9 mths ago: 2026-01-14 ⚠️
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
- **[d3-selection](https://github.com/d3/d3-selection)** 3.0.0 — 64 mths ago: 2021-06-07 ⚠️
- **[d3-shape](https://github.com/d3/d3-shape)** 3.2.0 — 46 mths ago: 2022-12-20 ⚠️
    - **[d3-path](https://github.com/d3/d3-path)** 3.1.0 — 46 mths ago: 2022-12-19 ⚠️
- **[d3-zoom](https://github.com/d3/d3-zoom)** 3.0.0 — 64 mths ago: 2021-06-10 ⚠️
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-drag](https://github.com/d3/d3-drag)** 3.0.0 — 64 mths ago: 2021-06-09 ⚠️
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 64 mths ago: 2021-06-05 ⚠️
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.0 — 64 mths ago: 2021-06-07 ⚠️
    - **[d3-transition](https://github.com/d3/d3-transition)** 3.0.1 — 64 mths ago: 2021-06-09 ⚠️

<!-- DEPENDENCY_LICENSES_END -->

<!-- BUNDLE_START -->

## Bundle Analysis

This report is updated with each release, from the bundle the release builds, using [Sonda](https://sonda.dev/), which analyses final source maps to reveal the actual effects of tree-shaking and minification rather than relying on pre-build estimates.

_Note: Sonda's Vite reports currently exclude CSS files, since Vite does not generate source maps for CSS._

| Chunk/Module/File                                                                                                                                              | Composition                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **dist/tanStackCharts-5HHGfe6p.js**                                                                                                                            | 127.2&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;37.3&nbsp;kB&nbsp;·&nbsp;29.3%&nbsp;of&nbsp;the&nbsp;build |
| &nbsp;&nbsp;&nbsp;&nbsp;@tanstack/charts → dist/scene.js + 41 more                                                                                             | `██████████████████░░`&nbsp;88.5%&nbsp;·&nbsp;112.6&nbsp;kB                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-shape → src/stack.js + 8 more                                                                                                       | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.9%&nbsp;·&nbsp;2.5&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-scale → src/band.js                                                                                                                 | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.0%&nbsp;·&nbsp;1.3&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;src → tanStackCharts.ts                                                                                                                | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.6%&nbsp;·&nbsp;717&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/range.js                                                                                                                | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.2%&nbsp;·&nbsp;223&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;7.8%&nbsp;·&nbsp;9.9&nbsp;kB                                       |
| **dist/chordDiagram-Dbu2uT_s.js**                                                                                                                              | 116.2&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;32.3&nbsp;kB&nbsp;·&nbsp;26.8%&nbsp;of&nbsp;the&nbsp;build |
| &nbsp;&nbsp;&nbsp;&nbsp;@unovis/ts → components/chord-diagram/index.js + 34 more                                                                               | `██████░░░░░░░░░░░░░░`&nbsp;31.1%&nbsp;·&nbsp;36.2&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-shape → src/arc.js + 25 more                                                                                                        | `█████░░░░░░░░░░░░░░░`&nbsp;23.4%&nbsp;·&nbsp;27.2&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;@juggle/resize-observer → <abbr title="lib/algorithms/calculateBoxSize.js">…s/calculateBoxSize.js</abbr> + 22 more                     | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.2%&nbsp;·&nbsp;9.5&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate-path → <abbr title="build/d3-interpolate-path.mjs">…d/d3-interpolate-path.mjs</abbr>                                    | `█░░░░░░░░░░░░░░░░░░░`&nbsp;6.2%&nbsp;·&nbsp;7.2&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/cache → <abbr title="dist/emotion-cache.browser.esm.js">…t/emotion-cache.browser.esm.js</abbr>                                | `█░░░░░░░░░░░░░░░░░░░`&nbsp;4.5%&nbsp;·&nbsp;5.3&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;stylis → src/Parser.js + 5 more                                                                                                        | `█░░░░░░░░░░░░░░░░░░░`&nbsp;4.5%&nbsp;·&nbsp;5.2&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-chord → src/ribbon.js + 3 more                                                                                                      | `░░░░░░░░░░░░░░░░░░░░`&nbsp;2.1%&nbsp;·&nbsp;2.4&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/serialize → <abbr title="dist/emotion-serialize.esm.js">…t/emotion-serialize.esm.js</abbr>                                    | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.9%&nbsp;·&nbsp;2.3&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/css → <abbr title="create-instance/dist/emotion-css-create-instance.esm.js">…otion-css-create-instance.esm.js</abbr> + 1 more | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.3%&nbsp;·&nbsp;1.5&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/sheet → dist/emotion-sheet.esm.js                                                                                             | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.2%&nbsp;·&nbsp;1.4&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-hierarchy → src/partition.js + 2 more                                                                                               | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.9%&nbsp;·&nbsp;1018&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/unitless → dist/emotion-unitless.esm.js                                                                                       | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.6%&nbsp;·&nbsp;767&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/hash → dist/emotion-hash.esm.js                                                                                               | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.6%&nbsp;·&nbsp;720&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;throttle-debounce → esm/index.js                                                                                                       | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.6%&nbsp;·&nbsp;688&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-scale → src/pow.js                                                                                                                  | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.5%&nbsp;·&nbsp;552&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;src → chordDiagram.ts                                                                                                                  | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.4%&nbsp;·&nbsp;494&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/group.js + 1 more                                                                                                       | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.4%&nbsp;·&nbsp;487&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/utils → <abbr title="dist/emotion-utils.browser.esm.js">…t/emotion-utils.browser.esm.js</abbr>                                | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.4%&nbsp;·&nbsp;481&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;@emotion/memoize → dist/emotion-memoize.esm.js                                                                                         | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.1%&nbsp;·&nbsp;119&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;11.0%&nbsp;·&nbsp;12.8&nbsp;kB                                     |
| **dist/erdDiagram-DKsqCN08.js**                                                                                                                                | 63.4&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;18.4&nbsp;kB&nbsp;·&nbsp;14.6%&nbsp;of&nbsp;the&nbsp;build  |
| &nbsp;&nbsp;&nbsp;&nbsp;@dagrejs/dagre → dist/dagre.esm.js                                                                                                     | `██████████████████░░`&nbsp;88.4%&nbsp;·&nbsp;56.0&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;src → erdDiagram.ts                                                                                                                    | `█░░░░░░░░░░░░░░░░░░░`&nbsp;5.4%&nbsp;·&nbsp;3.4&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `█░░░░░░░░░░░░░░░░░░░`&nbsp;6.3%&nbsp;·&nbsp;4.0&nbsp;kB                                       |
| **dist/networkDiagram-BiCPMNf8.js**                                                                                                                            | 35.1&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;10.4&nbsp;kB&nbsp;·&nbsp;8.1%&nbsp;of&nbsp;the&nbsp;build   |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-zoom → src/zoom.js + 4 more                                                                                                         | `██████░░░░░░░░░░░░░░`&nbsp;30.6%&nbsp;·&nbsp;10.7&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-force → src/simulation.js + 6 more                                                                                                  | `████░░░░░░░░░░░░░░░░`&nbsp;17.8%&nbsp;·&nbsp;6.2&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-quadtree → src/add.js + 13 more                                                                                                     | `████░░░░░░░░░░░░░░░░`&nbsp;17.7%&nbsp;·&nbsp;6.2&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-drag → src/drag.js + 4 more                                                                                                         | `██░░░░░░░░░░░░░░░░░░`&nbsp;12.2%&nbsp;·&nbsp;4.3&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → networkDiagram.ts                                                                                                                | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.5%&nbsp;·&nbsp;3.0&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/zoom.js                                                                                                           | `█░░░░░░░░░░░░░░░░░░░`&nbsp;2.8%&nbsp;·&nbsp;1004&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-selection → src/pointer.js + 1 more                                                                                                 | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.4%&nbsp;·&nbsp;514&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;9.1%&nbsp;·&nbsp;3.2&nbsp;kB                                       |
| **dist/src-DAMkWOaT.js**                                                                                                                                       | 21.1&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;6.1&nbsp;kB&nbsp;·&nbsp;4.9%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-transition → src/transition/schedule.js + 26 more                                                                                   | `████████████░░░░░░░░`&nbsp;60.7%&nbsp;·&nbsp;12.8&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/transform/index.js + 2 more                                                                                       | `██░░░░░░░░░░░░░░░░░░`&nbsp;10.2%&nbsp;·&nbsp;2.2&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-dispatch → src/dispatch.js                                                                                                          | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.5%&nbsp;·&nbsp;1.8&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-timer → src/timer.js + 1 more                                                                                                       | `██░░░░░░░░░░░░░░░░░░`&nbsp;7.8%&nbsp;·&nbsp;1.7&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-ease → src/cubic.js                                                                                                                 | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.4%&nbsp;·&nbsp;82&nbsp;B                                         |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;12.4%&nbsp;·&nbsp;2.6&nbsp;kB                                      |
| **dist/select-SZKizDc7.js**                                                                                                                                    | 17.0&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;4.4&nbsp;kB&nbsp;·&nbsp;3.9%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-selection → src/selection/data.js + 45 more                                                                                         | `█████████████████░░░`&nbsp;83.7%&nbsp;·&nbsp;14.2&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `███░░░░░░░░░░░░░░░░░`&nbsp;16.3%&nbsp;·&nbsp;2.8&nbsp;kB                                      |
| **dist/linear-CNetDix0.js**                                                                                                                                    | 16.3&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;5.4&nbsp;kB&nbsp;·&nbsp;3.8%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-format → src/locale.js + 14 more                                                                                                    | `███████░░░░░░░░░░░░░`&nbsp;36.8%&nbsp;·&nbsp;6.0&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-scale → src/continuous.js + 6 more                                                                                                  | `█████░░░░░░░░░░░░░░░`&nbsp;23.5%&nbsp;·&nbsp;3.8&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/ticks.js + 5 more                                                                                                       | `███░░░░░░░░░░░░░░░░░`&nbsp;13.0%&nbsp;·&nbsp;2.1&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/value.js + 5 more                                                                                                 | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.1%&nbsp;·&nbsp;1.3&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;internmap → src/index.js                                                                                                               | `█░░░░░░░░░░░░░░░░░░░`&nbsp;4.6%&nbsp;·&nbsp;768&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `███░░░░░░░░░░░░░░░░░`&nbsp;14.0%&nbsp;·&nbsp;2.3&nbsp;kB                                      |
| **dist/sankeyDiagram-DcI-D1uh.js**                                                                                                                             | 10.5&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;3.3&nbsp;kB&nbsp;·&nbsp;2.4%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-sankey → src/sankey.js + 3 more                                                                                                     | `████████████░░░░░░░░`&nbsp;58.1%&nbsp;·&nbsp;6.1&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → sankeyDiagram.ts                                                                                                                 | `██████░░░░░░░░░░░░░░`&nbsp;28.5%&nbsp;·&nbsp;3.0&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/min.js + 1 more                                                                                                         | `█░░░░░░░░░░░░░░░░░░░`&nbsp;3.8%&nbsp;·&nbsp;406&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;9.6%&nbsp;·&nbsp;1.0&nbsp;kB                                       |
| **dist/string-BzfQLSds.js**                                                                                                                                    | 10.4&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;3.9&nbsp;kB&nbsp;·&nbsp;2.4%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-color → src/color.js + 1 more                                                                                                       | `████████████████░░░░`&nbsp;79.4%&nbsp;·&nbsp;8.3&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/string.js + 4 more                                                                                                | `███░░░░░░░░░░░░░░░░░`&nbsp;14.4%&nbsp;·&nbsp;1.5&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `█░░░░░░░░░░░░░░░░░░░`&nbsp;6.2%&nbsp;·&nbsp;660&nbsp;B                                        |
| **dist/treeDiagram-fmrYqvXl.js**                                                                                                                               | 4.8&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;2.0&nbsp;kB&nbsp;·&nbsp;1.1%&nbsp;of&nbsp;the&nbsp;build     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-hierarchy → src/tree.js                                                                                                             | `██████████░░░░░░░░░░`&nbsp;51.9%&nbsp;·&nbsp;2.5&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → treeDiagram.ts                                                                                                                   | `████████░░░░░░░░░░░░`&nbsp;39.7%&nbsp;·&nbsp;1.9&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.4%&nbsp;·&nbsp;415&nbsp;B                                        |
| **dist/hierarchy-DU9LihDu.js**                                                                                                                                 | 3.7&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;1.2&nbsp;kB&nbsp;·&nbsp;0.8%&nbsp;of&nbsp;the&nbsp;build     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-hierarchy → src/hierarchy/index.js + 13 more                                                                                        | `███████████████░░░░░`&nbsp;76.7%&nbsp;·&nbsp;2.8&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `█████░░░░░░░░░░░░░░░`&nbsp;23.3%&nbsp;·&nbsp;879&nbsp;B                                       |
| **dist/point-\_U9MxSuk.js**                                                                                                                                    | 3.1&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;1.2&nbsp;kB&nbsp;·&nbsp;0.7%&nbsp;of&nbsp;the&nbsp;build     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-path → src/path.js                                                                                                                  | `████████████████░░░░`&nbsp;81.5%&nbsp;·&nbsp;2.5&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-shape → src/path.js + 1 more                                                                                                        | `██░░░░░░░░░░░░░░░░░░`&nbsp;9.5%&nbsp;·&nbsp;301&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.9%&nbsp;·&nbsp;281&nbsp;B                                        |
| **dist/link-CAkrxHYd.js**                                                                                                                                      | 1.9&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;738&nbsp;B&nbsp;·&nbsp;0.4%&nbsp;of&nbsp;the&nbsp;build      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-shape → src/link.js + 1 more                                                                                                        | `█████████████████░░░`&nbsp;85.8%&nbsp;·&nbsp;1.6&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `███░░░░░░░░░░░░░░░░░`&nbsp;14.2%&nbsp;·&nbsp;277&nbsp;B                                       |
| **dist/dpuse-tool-d3-visualiser.es.js**                                                                                                                        | 1.6&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;432&nbsp;B&nbsp;·&nbsp;0.4%&nbsp;of&nbsp;the&nbsp;build      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → index.ts                                                                                                                         | `██████████████████░░`&nbsp;88.0%&nbsp;·&nbsp;1.4&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `██░░░░░░░░░░░░░░░░░░`&nbsp;12.0%&nbsp;·&nbsp;191&nbsp;B                                       |
| **dist/palette-D5DTPmuA.js**                                                                                                                                   | 1.2&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;567&nbsp;B&nbsp;·&nbsp;0.3%&nbsp;of&nbsp;the&nbsp;build      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → palette.ts                                                                                                                       | `█████████████░░░░░░░`&nbsp;64.2%&nbsp;·&nbsp;774&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/max.js                                                                                                                  | `████░░░░░░░░░░░░░░░░`&nbsp;20.0%&nbsp;·&nbsp;241&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `███░░░░░░░░░░░░░░░░░`&nbsp;15.8%&nbsp;·&nbsp;190&nbsp;B                                       |
| **dist/array-CpxKKsZm.js**                                                                                                                                     | 285&nbsp;B&nbsp;·&nbsp;gzip&nbsp;196&nbsp;B&nbsp;·&nbsp;0.1%&nbsp;of&nbsp;the&nbsp;build       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-shape → src/array.js + 1 more                                                                                                       | `████████████░░░░░░░░`&nbsp;58.2%&nbsp;·&nbsp;166&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                                                                                                    | `████████░░░░░░░░░░░░`&nbsp;41.8%&nbsp;·&nbsp;119&nbsp;B                                       |

Bars show each row's share of its output file.

- n more = the row also holds n more files from the same package or folder, each no larger than the one named. A package can appear under several output files, each holding different files, never the same file twice.

(bundler output, whitespace & JSON) = bytes Sonda can't trace to a source file: whitespace (indentation and line breaks), code the bundler generates (region comments, the combined import/export lines, its small runtime helper and wrappers), and imported JSON such as `config.json`, which the bundler doesn't map. The JSON and the generated code are real bytes that ship; the whitespace mostly disappears once compressed.

<!-- BUNDLE_END -->

<!-- QUALITY_SECURITY_START -->

## Quality & Security

This section is updated each time `npm run document` is run. Settings come from the repository's workflow files and GitHub. Test coverage and the Fallow score are measured at the same time.

### Testing

| Check                | Status | What it does                                                                                                                                                                                                                                                                                                       |
| :------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit tests           | ✅ On  | [Vitest](https://vitest.dev) runs the unit tests. Part of the [CI workflow](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml) on every push and pull request to `main`.                                                                                                                  |
| Property-based tests | ❌ Off | [fast-check](https://fast-check.dev) runs many random inputs per test to find edge cases, alongside the unit tests.                                                                                                                                                                                                |
| Test coverage        | ✅ On  | ![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fdpuse%2Fdpuse-tool-d3-visualiser%2Fmain%2Fcode-health-reports%2Fvitest%2Fbadge.json) [Vitest's V8 coverage](https://vitest.dev/guide/coverage) measures the share of source lines the unit tests run. The target is 80%. |

### Code Quality

| Check         | Status | What it does                                                                                                                                                                                                                                                                                                     |
| :------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code analysis | ✅ On  | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dpuse_dpuse-tool-d3-visualiser&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dpuse_dpuse-tool-d3-visualiser) [SonarCloud](https://sonarcloud.io) checks every push for bugs, code smells and vulnerabilities. |
| Linting       | ✅ On  | [ESLint](https://eslint.org) checks the code for errors and style problems. Part of the [CI workflow](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml) on every push and pull request to `main`.                                                                                      |

### Security Analysis

| Check           | Status | What it does                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Push protection | ✅ On  | [GitHub push protection](https://docs.github.com/en/code-security/secret-scanning/push-protection-for-repositories-and-organizations) blocks pushes that contain credentials.                                                                                                                                                                                                              |
| Static analysis | ✅ On  | [![CodeQL](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/codeql.yml/badge.svg)](https://github.com/dpuse/dpuse-tool-d3-visualiser/security/code-scanning) [CodeQL](https://codeql.github.com) scans GitHub Actions and JavaScript/TypeScript for security vulnerabilities, using the extended security queries, on every push and pull request to `main` and weekly. |
| Secret scanning | ✅ On  | [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning) detects credentials, such as API keys and tokens, committed to the repository.                                                                                                                                                                                                                          |

### Dependencies

| Check               | Status | What it does                                                                                                                                                                                                                                                                                                                    |
| :------------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vulnerability audit | ✅ On  | [npm audit](https://docs.npmjs.com/cli/commands/npm-audit) fails when a shipped dependency has any known vulnerability, or a development dependency has a high or critical one. Part of the [CI workflow](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml) on every push and pull request to `main`. |
| Supply chain risk   | ✅ On  | [Socket](https://socket.dev) flags malicious packages, typosquatting and suspicious behaviour that may not yet have a CVE.                                                                                                                                                                                                      |
| Security alerts     | ✅ On  | [Dependabot](https://docs.github.com/en/code-security/dependabot) alerts when a dependency has a known vulnerability, using the GitHub Advisory Database.                                                                                                                                                                       |
| Security updates    | ❌ Off | [Dependabot](https://docs.github.com/en/code-security/dependabot) opens pull requests that update vulnerable dependencies. These are handled manually.                                                                                                                                                                          |
| Version updates     | ❌ Off | [Dependabot](https://docs.github.com/en/code-security/dependabot) opens pull requests for new dependency versions. These are handled manually.                                                                                                                                                                                  |

### OpenSSF 🚧

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/dpuse/dpuse-tool-d3-visualiser/badge)](https://scorecard.dev/viewer/?uri=github.com/dpuse/dpuse-tool-d3-visualiser)

This project is working towards the [OpenSSF Best Practices](https://www.bestpractices.dev) Passing badge, a self-certification covering security policy, vulnerability reporting, build processes, code quality, and more. Currently the [OpenSSF Scorecard](https://scorecard.dev) provides an independent automated assessment of the project's security practices and is an ongoing area of improvement.

### Reporting Vulnerabilities

Please do not open public GitHub issues for security vulnerabilities. Use [GitHub private vulnerability reporting](https://github.com/dpuse/dpuse-tool-d3-visualiser/security/advisories/new) instead. See [SECURITY.md](./SECURITY.md) for the full disclosure policy, contact details, and expected response times.

<!-- QUALITY_SECURITY_END -->

<!-- CONTRIBUTING_LICENSE_START -->

## Contributing

This repository is maintained solely by its owner and does not, at present, accept external contributions into the canonical repo. Its source is published openly under the MIT License — every DPUse project is fully open source except DPUse Engine, which remains closed and proprietary.

For security vulnerabilities, see [Reporting Vulnerabilities](#reporting-vulnerabilities). For bugs, inconsistencies, or other feedback, [open a GitHub issue](https://github.com/dpuse/dpuse-tool-d3-visualiser/issues) — feedback is read, but responses and fixes are at the maintainer's discretion.

## License

This project is licensed under the MIT License, permitting free use, modification, and distribution.

[MIT](./LICENSE) © 2026 Jonathan Terrell

<!-- CONTRIBUTING_LICENSE_END -->
