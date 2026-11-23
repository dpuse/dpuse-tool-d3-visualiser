# DPUse D3 Visualiser Tool

Consider an **eCharts** visualiser along with existing **Highcharts** (comercial).

<!-- OPENING_START -->

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![CI](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml/badge.svg)](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml)
[![CodeQL](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/codeql.yml/badge.svg)](https://github.com/dpuse/dpuse-tool-d3-visualiser/security/code-scanning)
![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fdpuse%2Fdpuse-tool-d3-visualiser%2Fmain%2Fcode-health-reports%2Fvitest%2Fbadge.json)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dpuse_dpuse-tool-d3-visualiser&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dpuse_dpuse-tool-d3-visualiser)
[![DPUse version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.dpuse.app%2Fconfigs%2Fdpuse-tool-d3-visualiser&query=%24.data.version&prefix=v&label=DPUse&color=blue)](https://github.com/dpuse/dpuse-tool-d3-visualiser/releases/latest)
[![npm version](https://img.shields.io/npm/v/@dpuse/dpuse-tool-d3-visualiser?label=npm)](https://www.npmjs.com/package/@dpuse/dpuse-tool-d3-visualiser)

A TypeScript wrapper for D3, TanStack Charts, and Unovis that implements the Data Positioning chart-rendering interface, providing ERD (dagre), Sankey (d3-sankey), chord (Unovis), network (d3-force), tree (d3-hierarchy), and bar chart (TanStack Charts) renderers.

[Report a Vulnerability](https://github.com/dpuse/dpuse-tool-d3-visualiser/security/advisories/new) · [Open an Issue](https://github.com/dpuse/dpuse-tool-d3-visualiser/issues)

## About DPUse

DPUse (Data Positioning & Use) is a browser-based app that helps you prepare your data for use in two main steps: Sourcing and Contextualising. Once your data is contextualised, Presentations and Cookbooks give you two ways to put it to use.

**Sourcing** uses Connectors to link to applications, databases, file stores, and curated datasets. These Connections help you set up tabular Data Views from your sources.

**Contextualising** maps events from your Data Views to detailed Context Models. These models give the DPUse Engine the structure it needs to create clear transactions, facts, or observations.

**Presentations** use ready-made Presenters to show your contextualised data in a meaningful way as soon as it's ready.

**Cookbooks** of Recipes guide you in building Data Apps, and additional Presenters, with your contextualised data using your preferred tools.

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

_Requires [Node.js](https://nodejs.org/) 24 or later, [npm](https://www.npmjs.com/) 12 or later._

To work on the source instead, clone this repository.

```bash
git clone https://github.com/dpuse/dpuse-tool-d3-visualiser.git
cd dpuse-tool-d3-visualiser
npm install
```

_Working on the source also requires [TypeScript](https://www.typescriptlang.org/) 6.0.3 or a later 6.0 release. Later versions, including TypeScript 7, are not supported yet._

This repository is managed using the common set of actions provided by [@dpuse/dpuse-development](https://github.com/dpuse/dpuse-development). See the `scripts` block in [package.json](https://github.com/dpuse/dpuse-tool-d3-visualiser/blob/main/package.json) for details.

### Release Status

DPUse is a new product, and this package is a release candidate: complete and in use across DPUse, but not yet at its first stable release.

The last number of the version increases with every push to GitHub, whether or not that push is released, so the versions of consecutive releases can skip numbers, for example from 1.1.120 to 1.1.124. Until the first stable release, any release may include changes that need updates in the projects that use it, so depend on an exact version to avoid unexpected changes. Once stable, versions will follow [Semantic Versioning](https://semver.org): breaking changes in the first number, new features in the second and fixes in the last.

Every release is listed on the [Releases](https://github.com/dpuse/dpuse-tool-d3-visualiser/releases) page.

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

License data is updated each time `npm run document` is run, using [CycloneDX](https://github.com/CycloneDX/cyclonedx-node-npm). The following table lists every package whose code, styles or assets are included in this project's build, as recorded by the build itself. Modules loaded at run time are not included; each documents its own. These dependencies have been checked and confirmed to use Apache-2.0, BSD-3-Clause, ISC, or MIT, all of which allow commercial use. All are used as published. Where the build has to adjust a dependency so it can be bundled, the adjustment only affects how its files are located and loaded, never what the code does. Developers cloning this repository should independently verify development dependencies.

| Dependency                                                      | Version | License(s)   | Document                                                          |
| :-------------------------------------------------------------- | :-----: | :----------- | :---------------------------------------------------------------- |
| [@dagrejs/dagre](https://github.com/dagrejs/dagre)              |  3.1.3  | MIT          | [LICENSE](licenses/downloads/@dagrejs/dagre@3.1.3-LICENSE.txt)    |
| [@tanstack/charts](https://github.com/TanStack/charts)          |  1.5.0  | MIT          | [LICENSE](licenses/downloads/@tanstack/charts@1.5.0-LICENSE.txt)  |
| [@unovis/ts](https://github.com/f5/unovis)                      |  1.8.1  | Apache-2.0   | [LICENSE](licenses/downloads/@unovis/ts@1.8.1-LICENSE.txt)        |
| [d3-array](https://github.com/d3/d3-array)                      |  3.2.4  | ISC          | [LICENSE](licenses/downloads/d3-array@3.2.4-LICENSE.txt)          |
| [d3-chord](https://github.com/d3/d3-chord)                      |  3.0.2  | ISC          | [LICENSE](licenses/downloads/d3-chord@3.0.2-LICENSE.txt)          |
| [d3-color](https://github.com/d3/d3-color)                      |  3.1.0  | ISC          | [LICENSE](licenses/downloads/d3-color@3.1.0-LICENSE.txt)          |
| [d3-dispatch](https://github.com/d3/d3-dispatch)                |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-dispatch@3.0.1-LICENSE.txt)       |
| [d3-drag](https://github.com/d3/d3-drag)                        |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-drag@3.0.1-LICENSE.txt)           |
| [d3-ease](https://github.com/d3/d3-ease)                        |  3.0.1  | BSD-3-Clause | [LICENSE](licenses/downloads/d3-ease@3.0.1-LICENSE.txt)           |
| [d3-force](https://github.com/d3/d3-force)                      |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-force@3.0.1-LICENSE.txt)          |
| [d3-format](https://github.com/d3/d3-format)                    |  3.1.2  | ISC          | [LICENSE](licenses/downloads/d3-format@3.1.2-LICENSE.txt)         |
| [d3-hierarchy](https://github.com/d3/d3-hierarchy)              |  3.1.3  | ISC          | [LICENSE](licenses/downloads/d3-hierarchy@3.1.3-LICENSE.txt)      |
| [d3-interpolate](https://github.com/d3/d3-interpolate)          |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-interpolate@3.0.1-LICENSE.txt)    |
| [d3-path](https://github.com/d3/d3-path)                        |  3.1.1  | ISC          | [LICENSE](licenses/downloads/d3-path@3.1.1-LICENSE.txt)           |
| [d3-quadtree](https://github.com/d3/d3-quadtree)                |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-quadtree@3.0.1-LICENSE.txt)       |
| [d3-sankey](https://github.com/d3/d3-sankey)                    | 0.12.3  | BSD-3-Clause | [LICENSE](licenses/downloads/d3-sankey@0.12.3-LICENSE.txt)        |
| [d3-scale](https://github.com/d3/d3-scale)                      |  4.0.2  | ISC          | [LICENSE](licenses/downloads/d3-scale@4.0.2-LICENSE.txt)          |
| [d3-scale](https://github.com/d3/d3-scale)                      |  4.0.3  | ISC          | [LICENSE](licenses/downloads/d3-scale@4.0.3-LICENSE.txt)          |
| [d3-selection](https://github.com/d3/d3-selection)              |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-selection@3.0.1-LICENSE.txt)      |
| [d3-shape](https://github.com/d3/d3-shape)                      |  3.2.1  | ISC          | [LICENSE](licenses/downloads/d3-shape@3.2.1-LICENSE.txt)          |
| [d3-timer](https://github.com/d3/d3-timer)                      |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-timer@3.0.1-LICENSE.txt)          |
| [d3-transition](https://github.com/d3/d3-transition)            |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-transition@3.0.1-LICENSE.txt)     |
| [d3-zoom](https://github.com/d3/d3-zoom)                        |  3.0.1  | ISC          | [LICENSE](licenses/downloads/d3-zoom@3.0.1-LICENSE.txt)           |
| [internmap](https://github.com/mbostock/internmap)              |  2.0.3  | ISC          | [LICENSE](licenses/downloads/internmap@2.0.3-LICENSE.txt)         |
| [stylis](https://github.com/thysultan/stylis.js)                |  4.2.0  | MIT          | [LICENSE](licenses/downloads/stylis@4.2.0-LICENSE.txt)            |
| [throttle-debounce](https://github.com/niksy/throttle-debounce) |  5.0.2  | MIT          | [LICENSE](licenses/downloads/throttle-debounce@5.0.2-LICENSE.txt) |

### Dependency Tree

The dependency tree below shows how each package in the table above is reached — direct and transitive — along with its installed version, release date, and update status. A package that does not ship itself, such as one whose parts are bundled separately, is left out and what ships beneath it is shown in its place. Packages flagged ❗ have a newer version available; ⚠️ indicates a package that hasn't been updated in the last 6 months or longer. Neither flag necessarily indicates a problem: we let new releases stabilise before upgrading, and some packages are mature and stable (have limited or no dependencies), so they require no active development.

- **[@dagrejs/dagre](https://github.com/dagrejs/dagre)** 3.1.3 — this month: 2026-10-24
- **[@tanstack/charts](https://github.com/TanStack/charts)** 1.5.0 — this month: 2026-11-07
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 41 mths ago: 2023-05-30 ⚠️ → latest: 3.2.5 — this month: 2026-11-03 ❗
        - **[internmap](https://github.com/mbostock/internmap)** 2.0.3 — 62 mths ago: 2021-09-20 ⚠️
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-drag](https://github.com/d3/d3-drag)** 3.0.1 — this month: 2026-11-03
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.1 — this month: 2026-11-03
    - **[d3-transition](https://github.com/d3/d3-transition)** 3.0.1 — 65 mths ago: 2021-06-09 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-quadtree](https://github.com/d3/d3-quadtree)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-timer](https://github.com/d3/d3-timer)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-sankey](https://github.com/d3/d3-sankey)** 0.12.3 — 86 mths ago: 2019-09-02 ⚠️
    - **[d3-scale](https://github.com/d3/d3-scale)** 4.0.2 — 61 mths ago: 2021-09-24 ⚠️ → latest: 4.0.3 — this month: 2026-11-03 ❗
        - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 41 mths ago: 2023-05-30 ⚠️ → latest: 3.2.5 — this month: 2026-11-03 ❗
        - **[d3-format](https://github.com/d3/d3-format)** 3.1.2 — 10 mths ago: 2026-01-14 ⚠️ → latest: 3.1.3 — this month: 2026-11-03 ❗
        - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-shape](https://github.com/d3/d3-shape)** 3.2.1 — this month: 2026-11-03
- **[@unovis/ts](https://github.com/f5/unovis)** 1.8.1 — this month: 2026-11-10
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 41 mths ago: 2023-05-30 ⚠️ → latest: 3.2.5 — this month: 2026-11-03 ❗
    - **[d3-chord](https://github.com/d3/d3-chord)** 3.0.2 — this month: 2026-11-03
        - **[d3-path](https://github.com/d3/d3-path)** 3.1.1 — this month: 2026-11-03
    - **[d3-color](https://github.com/d3/d3-color)** 3.1.0 — 55 mths ago: 2022-03-28 ⚠️ → latest: 3.1.1 — this month: 2026-11-03 ❗
    - **[d3-drag](https://github.com/d3/d3-drag)** 3.0.1 — this month: 2026-11-03
    - **[d3-ease](https://github.com/d3/d3-ease)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-force](https://github.com/d3/d3-force)** 3.0.1 — this month: 2026-11-03
    - **[d3-hierarchy](https://github.com/d3/d3-hierarchy)** 3.1.3 — this month: 2026-11-03
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
        - **[d3-color](https://github.com/d3/d3-color)** 3.1.0 — 55 mths ago: 2022-03-28 ⚠️ → latest: 3.1.1 — this month: 2026-11-03 ❗
    - **[d3-path](https://github.com/d3/d3-path)** 3.1.1 — this month: 2026-11-03
    - **[d3-sankey](https://github.com/d3/d3-sankey)** 0.12.3 — 86 mths ago: 2019-09-02 ⚠️
    - **[d3-scale](https://github.com/d3/d3-scale)** 4.0.3 — this month: 2026-11-03
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.1 — this month: 2026-11-03
    - **[d3-shape](https://github.com/d3/d3-shape)** 3.2.1 — this month: 2026-11-03
    - **[d3-timer](https://github.com/d3/d3-timer)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-transition](https://github.com/d3/d3-transition)** 3.0.1 — 65 mths ago: 2021-06-09 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
        - **[d3-color](https://github.com/d3/d3-color)** 3.1.0 — 55 mths ago: 2022-03-28 ⚠️ → latest: 3.1.1 — this month: 2026-11-03 ❗
        - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
        - **[d3-ease](https://github.com/d3/d3-ease)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
        - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
        - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.1 — this month: 2026-11-03
        - **[d3-timer](https://github.com/d3/d3-timer)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-zoom](https://github.com/d3/d3-zoom)** 3.0.1 — this month: 2026-11-03
    - **[stylis](https://github.com/thysultan/stylis.js)** 4.2.0 — 42 mths ago: 2023-05-05 ⚠️ → latest: 4.4.0 — 7 mths ago: 2026-04-19 ⚠️ ❗
    - **[throttle-debounce](https://github.com/niksy/throttle-debounce)** 5.0.2 — 28 mths ago: 2024-06-24 ⚠️
- **[d3-drag](https://github.com/d3/d3-drag)** 3.0.1 — this month: 2026-11-03
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.1 — this month: 2026-11-03
- **[d3-force](https://github.com/d3/d3-force)** 3.0.1 — this month: 2026-11-03
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-quadtree](https://github.com/d3/d3-quadtree)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-timer](https://github.com/d3/d3-timer)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
- **[d3-hierarchy](https://github.com/d3/d3-hierarchy)** 3.1.3 — this month: 2026-11-03
- **[d3-sankey](https://github.com/d3/d3-sankey)** 0.12.3 — 86 mths ago: 2019-09-02 ⚠️
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 41 mths ago: 2023-05-30 ⚠️ → latest: 3.2.5 — this month: 2026-11-03 ❗
    - **[d3-shape](https://github.com/d3/d3-shape)** 3.2.1 — this month: 2026-11-03
- **[d3-scale](https://github.com/d3/d3-scale)** 4.0.3 — this month: 2026-11-03
    - **[d3-array](https://github.com/d3/d3-array)** 3.2.4 — 41 mths ago: 2023-05-30 ⚠️ → latest: 3.2.5 — this month: 2026-11-03 ❗
    - **[d3-format](https://github.com/d3/d3-format)** 3.1.2 — 10 mths ago: 2026-01-14 ⚠️ → latest: 3.1.3 — this month: 2026-11-03 ❗
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
- **[d3-selection](https://github.com/d3/d3-selection)** 3.0.1 — this month: 2026-11-03
- **[d3-shape](https://github.com/d3/d3-shape)** 3.2.1 — this month: 2026-11-03
    - **[d3-path](https://github.com/d3/d3-path)** 3.1.1 — this month: 2026-11-03
- **[d3-zoom](https://github.com/d3/d3-zoom)** 3.0.1 — this month: 2026-11-03
    - **[d3-dispatch](https://github.com/d3/d3-dispatch)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-drag](https://github.com/d3/d3-drag)** 3.0.1 — this month: 2026-11-03
    - **[d3-interpolate](https://github.com/d3/d3-interpolate)** 3.0.1 — 65 mths ago: 2021-06-05 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗
    - **[d3-selection](https://github.com/d3/d3-selection)** 3.0.1 — this month: 2026-11-03
    - **[d3-transition](https://github.com/d3/d3-transition)** 3.0.1 — 65 mths ago: 2021-06-09 ⚠️ → latest: 3.0.2 — this month: 2026-11-03 ❗

<!-- DEPENDENCY_LICENSES_END -->

<!-- BUNDLE_START -->

## Bundle Analysis

This report is updated with each release, from the bundle the release builds, using [Sonda](https://sonda.dev/), which analyses final source maps to reveal the actual effects of tree-shaking and minification rather than relying on pre-build estimates.

_Note: Sonda's Vite reports currently exclude CSS files, since Vite does not generate source maps for CSS._

| Chunk/Module/File                                                                | Composition                                                                                    |
| :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **All 14 files**                                                                 | 416.4&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;122.8&nbsp;kB                                              |
| **dist/tanStackCharts-DEINbmRi.js**                                              | 125.4&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;36.7&nbsp;kB&nbsp;·&nbsp;30.1%&nbsp;of&nbsp;the&nbsp;build |
| &nbsp;&nbsp;&nbsp;&nbsp;@tanstack/charts → dist/scene.js + 41 more               | `██████████████████░░`&nbsp;90.1%&nbsp;·&nbsp;113.0&nbsp;kB                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-scale → src/band.js + 2 more                          | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.7%&nbsp;·&nbsp;2.1&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;src → tanStackCharts.ts                                  | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.6%&nbsp;·&nbsp;717&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `██░░░░░░░░░░░░░░░░░░`&nbsp;7.7%&nbsp;·&nbsp;9.6&nbsp;kB                                       |
| **dist/erdDiagram-DmYSx8Dh.js**                                                  | 63.4&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;18.4&nbsp;kB&nbsp;·&nbsp;15.2%&nbsp;of&nbsp;the&nbsp;build  |
| &nbsp;&nbsp;&nbsp;&nbsp;@dagrejs/dagre → dist/dagre.esm.js                       | `██████████████████░░`&nbsp;88.3%&nbsp;·&nbsp;56.0&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;src → erdDiagram.ts                                      | `█░░░░░░░░░░░░░░░░░░░`&nbsp;5.4%&nbsp;·&nbsp;3.4&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `█░░░░░░░░░░░░░░░░░░░`&nbsp;6.3%&nbsp;·&nbsp;4.0&nbsp;kB                                       |
| **dist/chordDiagram-Cm91Tmgo.js**                                                | 56.8&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;17.7&nbsp;kB&nbsp;·&nbsp;13.6%&nbsp;of&nbsp;the&nbsp;build  |
| &nbsp;&nbsp;&nbsp;&nbsp;@unovis/ts → components/chord-diagram/index.js + 36 more | `██████████████░░░░░░`&nbsp;71.0%&nbsp;·&nbsp;40.3&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;stylis → src/Parser.js + 5 more                          | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.4%&nbsp;·&nbsp;4.8&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-chord → dist/d3-chord.mjs                             | `█░░░░░░░░░░░░░░░░░░░`&nbsp;4.2%&nbsp;·&nbsp;2.4&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;throttle-debounce → esm/index.js                         | `░░░░░░░░░░░░░░░░░░░░`&nbsp;1.2%&nbsp;·&nbsp;688&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;src → chordDiagram.ts                                    | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.8%&nbsp;·&nbsp;494&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/group.js + 1 more                         | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.8%&nbsp;·&nbsp;487&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `███░░░░░░░░░░░░░░░░░`&nbsp;13.5%&nbsp;·&nbsp;7.6&nbsp;kB                                      |
| **dist/networkDiagram-DS-O0c4v.js**                                              | 44.9&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;13.6&nbsp;kB&nbsp;·&nbsp;10.8%&nbsp;of&nbsp;the&nbsp;build  |
| &nbsp;&nbsp;&nbsp;&nbsp;src → networkDiagram.ts                                  | `█████░░░░░░░░░░░░░░░`&nbsp;26.7%&nbsp;·&nbsp;12.0&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-zoom → dist/d3-zoom.mjs                               | `█████░░░░░░░░░░░░░░░`&nbsp;23.9%&nbsp;·&nbsp;10.7&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-force → dist/d3-force.mjs                             | `███░░░░░░░░░░░░░░░░░`&nbsp;17.0%&nbsp;·&nbsp;7.6&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-quadtree → src/add.js + 13 more                       | `███░░░░░░░░░░░░░░░░░`&nbsp;13.8%&nbsp;·&nbsp;6.2&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-drag → dist/d3-drag.mjs                               | `██░░░░░░░░░░░░░░░░░░`&nbsp;9.6%&nbsp;·&nbsp;4.3&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/zoom.js                             | `░░░░░░░░░░░░░░░░░░░░`&nbsp;2.2%&nbsp;·&nbsp;1007&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `█░░░░░░░░░░░░░░░░░░░`&nbsp;6.9%&nbsp;·&nbsp;3.1&nbsp;kB                                       |
| **dist/d3-shape-gf8U18pS.js**                                                    | 36.9&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;7.9&nbsp;kB&nbsp;·&nbsp;8.9%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-shape → dist/d3-shape.mjs                             | `█████████████████░░░`&nbsp;86.2%&nbsp;·&nbsp;31.8&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-path → dist/d3-path.mjs                               | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.1%&nbsp;·&nbsp;3.0&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `█░░░░░░░░░░░░░░░░░░░`&nbsp;5.8%&nbsp;·&nbsp;2.1&nbsp;kB                                       |
| **dist/src-YHHReglY.js**                                                         | 21.1&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;6.1&nbsp;kB&nbsp;·&nbsp;5.1%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-transition → src/transition/schedule.js + 26 more     | `████████████░░░░░░░░`&nbsp;60.6%&nbsp;·&nbsp;12.8&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/transform/index.js + 2 more         | `██░░░░░░░░░░░░░░░░░░`&nbsp;10.2%&nbsp;·&nbsp;2.2&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-dispatch → src/dispatch.js                            | `██░░░░░░░░░░░░░░░░░░`&nbsp;8.5%&nbsp;·&nbsp;1.8&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-timer → src/timer.js + 1 more                         | `██░░░░░░░░░░░░░░░░░░`&nbsp;7.8%&nbsp;·&nbsp;1.7&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-ease → src/cubic.js                                   | `░░░░░░░░░░░░░░░░░░░░`&nbsp;0.4%&nbsp;·&nbsp;82&nbsp;B                                         |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `██░░░░░░░░░░░░░░░░░░`&nbsp;12.4%&nbsp;·&nbsp;2.6&nbsp;kB                                      |
| **dist/d3-scale-BYykLEPO.js**                                                    | 18.2&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;5.9&nbsp;kB&nbsp;·&nbsp;4.4%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-format → src/locale.js + 14 more                      | `███████░░░░░░░░░░░░░`&nbsp;32.9%&nbsp;·&nbsp;6.0&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-scale → dist/d3-scale.mjs                             | `██████░░░░░░░░░░░░░░`&nbsp;31.2%&nbsp;·&nbsp;5.7&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/ticks.js + 6 more                         | `███░░░░░░░░░░░░░░░░░`&nbsp;12.8%&nbsp;·&nbsp;2.3&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/value.js + 5 more                   | `█░░░░░░░░░░░░░░░░░░░`&nbsp;7.2%&nbsp;·&nbsp;1.3&nbsp;kB                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;internmap → src/index.js                                 | `█░░░░░░░░░░░░░░░░░░░`&nbsp;4.1%&nbsp;·&nbsp;768&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `██░░░░░░░░░░░░░░░░░░`&nbsp;11.8%&nbsp;·&nbsp;2.1&nbsp;kB                                      |
| **dist/d3-selection-CL8c_tE2.js**                                                | 15.7&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;4.5&nbsp;kB&nbsp;·&nbsp;3.8%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-selection → dist/d3-selection.mjs                     | `███████████████████░`&nbsp;96.0%&nbsp;·&nbsp;15.0&nbsp;kB                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `█░░░░░░░░░░░░░░░░░░░`&nbsp;4.0%&nbsp;·&nbsp;643&nbsp;B                                        |
| **dist/sankeyDiagram-Dbl1-v5p.js**                                               | 10.5&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;3.3&nbsp;kB&nbsp;·&nbsp;2.5%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-sankey → src/sankey.js + 3 more                       | `████████████░░░░░░░░`&nbsp;58.1%&nbsp;·&nbsp;6.1&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → sankeyDiagram.ts                                   | `██████░░░░░░░░░░░░░░`&nbsp;28.5%&nbsp;·&nbsp;3.0&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/min.js + 1 more                           | `█░░░░░░░░░░░░░░░░░░░`&nbsp;3.8%&nbsp;·&nbsp;406&nbsp;B                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `██░░░░░░░░░░░░░░░░░░`&nbsp;9.6%&nbsp;·&nbsp;1.0&nbsp;kB                                       |
| **dist/string-BzfQLSds.js**                                                      | 10.4&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;3.9&nbsp;kB&nbsp;·&nbsp;2.5%&nbsp;of&nbsp;the&nbsp;build    |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-color → src/color.js + 1 more                         | `████████████████░░░░`&nbsp;79.4%&nbsp;·&nbsp;8.3&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-interpolate → src/string.js + 4 more                  | `███░░░░░░░░░░░░░░░░░`&nbsp;14.4%&nbsp;·&nbsp;1.5&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `█░░░░░░░░░░░░░░░░░░░`&nbsp;6.2%&nbsp;·&nbsp;660&nbsp;B                                        |
| **dist/d3-hierarchy-Dtx4jD78.js**                                                | 8.2&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;2.8&nbsp;kB&nbsp;·&nbsp;2.0%&nbsp;of&nbsp;the&nbsp;build     |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-hierarchy → dist/d3-hierarchy.mjs                     | `███████████████████░`&nbsp;95.0%&nbsp;·&nbsp;7.8&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `█░░░░░░░░░░░░░░░░░░░`&nbsp;5.0%&nbsp;·&nbsp;420&nbsp;B                                        |
| **dist/treeDiagram-t0oFwi1c.js**                                                 | 2.2&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;1.0&nbsp;kB&nbsp;·&nbsp;0.5%&nbsp;of&nbsp;the&nbsp;build     |
| &nbsp;&nbsp;&nbsp;&nbsp;src → treeDiagram.ts                                     | `█████████████████░░░`&nbsp;87.2%&nbsp;·&nbsp;1.9&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `███░░░░░░░░░░░░░░░░░`&nbsp;12.8%&nbsp;·&nbsp;290&nbsp;B                                       |
| **dist/dpuse-tool-d3-visualiser.es.js**                                          | 1.6&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;438&nbsp;B&nbsp;·&nbsp;0.4%&nbsp;of&nbsp;the&nbsp;build      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → index.ts                                           | `██████████████████░░`&nbsp;88.0%&nbsp;·&nbsp;1.4&nbsp;kB                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `██░░░░░░░░░░░░░░░░░░`&nbsp;12.0%&nbsp;·&nbsp;194&nbsp;B                                       |
| **dist/palette-D5DTPmuA.js**                                                     | 1.2&nbsp;kB&nbsp;·&nbsp;gzip&nbsp;567&nbsp;B&nbsp;·&nbsp;0.3%&nbsp;of&nbsp;the&nbsp;build      |
| &nbsp;&nbsp;&nbsp;&nbsp;src → palette.ts                                         | `█████████████░░░░░░░`&nbsp;64.2%&nbsp;·&nbsp;774&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;d3-array → src/max.js                                    | `████░░░░░░░░░░░░░░░░`&nbsp;20.0%&nbsp;·&nbsp;241&nbsp;B                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;(bundler output, whitespace & JSON)                      | `███░░░░░░░░░░░░░░░░░`&nbsp;15.8%&nbsp;·&nbsp;190&nbsp;B                                       |

Bars show each row's share of its output file.

- n more = the row also holds n more files from the same package or folder, each no larger than the one named. A package can appear under several output files, each holding different files, never the same file twice.

(bundler output, whitespace & JSON) = bytes Sonda can't trace to a source file: whitespace (indentation and line breaks), code the bundler generates (region comments, the combined import/export lines, its small runtime helper and wrappers), and imported JSON such as `config.json`, which the bundler doesn't map. The JSON and the generated code are real bytes that ship; the whitespace mostly disappears once compressed.

<!-- BUNDLE_END -->

<!-- QUALITY_SECURITY_START -->

## Quality & Security

This section is updated each time `npm run document` is run. Settings come from the repository's workflow files and GitHub. Test coverage and the Fallow score are measured at the same time.

### Testing

| Check                | Status | What it does                                                                                                                                                                                      |
| :------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unit tests           | ✅ On  | [Vitest](https://vitest.dev) runs the unit tests. Part of the [CI workflow](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml) on every push and pull request to `main`. |
| Property-based tests | ❌ Off | [fast-check](https://fast-check.dev) runs many random inputs per test to find edge cases, alongside the unit tests.                                                                               |
| Test coverage        | ✅ On  | [Vitest's V8 coverage](https://vitest.dev/guide/coverage) measures the share of source lines the unit tests run.                                                                                  |

### Code Quality

| Check         | Status | What it does                                                                                                                                                                                                                                                                                                              |
| :------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Linting       | ✅ On  | [ESLint](https://eslint.org) checks the code for errors and style problems, and the [TypeScript](https://www.typescriptlang.org/) compiler type-checks the whole project. Part of the [CI workflow](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml) on every push and pull request to `main`. |
| Code analysis | ✅ On  | [SonarCloud](https://sonarcloud.io) checks every push for bugs, code smells and vulnerabilities.                                                                                                                                                                                                                          |

### Security Analysis

| Check           | Status | What it does                                                                                                                                                                                                      |
| :-------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Push protection | ✅ On  | [GitHub push protection](https://docs.github.com/en/code-security/secret-scanning/push-protection-for-repositories-and-organizations) blocks pushes that contain credentials.                                     |
| Static analysis | ✅ On  | [GitHub CodeQL](https://codeql.github.com) scans GitHub Actions and JavaScript/TypeScript for security vulnerabilities, using the extended security queries, on every push and pull request to `main` and weekly. |
| Secret scanning | ✅ On  | [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning) detects credentials, such as API keys and tokens, committed to the repository.                                                 |

### Dependencies

| Check               | Status | What it does                                                                                                                                                                                                                                                                                                                    |
| :------------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vulnerability audit | ✅ On  | [npm audit](https://docs.npmjs.com/cli/commands/npm-audit) fails when a shipped dependency has any known vulnerability, or a development dependency has a high or critical one. Part of the [CI workflow](https://github.com/dpuse/dpuse-tool-d3-visualiser/actions/workflows/ci.yml) on every push and pull request to `main`. |
| Supply chain risk   | ✅ On  | [Socket.dev](https://socket.dev) flags malicious packages, typosquatting and suspicious behaviour that may not yet have a CVE.                                                                                                                                                                                                  |
| Security alerts     | ✅ On  | [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) alerts when a dependency has a known vulnerability, using the GitHub Advisory Database.                                                                                                                                                                |
| Dependency updates  | ❌ Off | [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) can open pull requests for new and vulnerable dependency versions. Dependencies are updated by hand with `npm run check` instead.                                                                                                                      |

### OpenSSF 🚧

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/dpuse/dpuse-tool-d3-visualiser/badge)](https://scorecard.dev/viewer/?uri=github.com/dpuse/dpuse-tool-d3-visualiser)

This project is working towards the [OpenSSF Best Practices](https://www.bestpractices.dev) Passing badge, a self-certification covering security policy, vulnerability reporting, build processes, code quality, and more. Currently the [OpenSSF Scorecard](https://scorecard.dev) provides an independent automated assessment of the project's security practices and is an ongoing area of improvement.

### Reporting Vulnerabilities

Please do not open public GitHub issues for security vulnerabilities. Use [GitHub private vulnerability reporting](https://github.com/dpuse/dpuse-tool-d3-visualiser/security/advisories/new) instead. See [SECURITY.md](./SECURITY.md) for the full disclosure policy, contact details, and expected response times.

<!-- QUALITY_SECURITY_END -->

<!-- CONTRIBUTING_LICENSE_START -->

## Contributing

This repository is maintained solely by its owner and does not, at present, accept external contributions.

For security vulnerabilities, see [Reporting Vulnerabilities](#reporting-vulnerabilities). For bugs, inconsistencies, or other feedback, [open a GitHub issue](https://github.com/dpuse/dpuse-tool-d3-visualiser/issues) — feedback is read, but responses and fixes are at the maintainer's discretion.

## License

This project is licensed under the MIT License, permitting free use, modification, and distribution.

[MIT](./LICENSE) © 2026 Jonathan Terrell

<!-- CONTRIBUTING_LICENSE_END -->
