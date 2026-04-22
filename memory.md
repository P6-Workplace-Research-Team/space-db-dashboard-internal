# Memory

## 2026-04-13

- 증상: `소셜공간` 탭에서 상단 KPI 일부와 하단 카드가 비어 보였고, 이어서 `지원공간` 탭 전체 지표가 렌더링되지 않았다.
- 원인: `renderE()` 내부에서 호출하는 `renderELoungeChart()` 함수가 주석 블록 안에 남아 있어 실제 런타임에서는 함수가 정의되지 않았다. 이 `ReferenceError` 때문에 소셜 탭 렌더링이 중단되고, 뒤에 실행되는 지원 탭 렌더링도 함께 멈췄다.
- 해결: `renderELoungeChart()`를 실제 함수로 복구해 `cE5` 카드에 metric block 형태로 라운지 유형별 평균 면적을 렌더링하도록 다시 구현했다. 동시에 `kE-lounge-area`, `kE-ltype` 상단 KPI도 `renderE()`에서 채우도록 복구했다.
- 추가 메모: 바로가기 패널은 `refresh()` 이후에 초기화되면 후반 탭 렌더 예외에 같이 막힐 수 있어, 카드 앵커와 TOC 생성은 초기 배치 직후 먼저 실행되도록 순서를 앞당겼다.
## 2026-04-15

- Symptom: On smaller monitors, some dashboard cards expanded underneath the quick-links panel, which hid part of the card body.
- Cause: The layout used a fixed TOC reservation on the right (`margin-right:272px`) together with rigid multi-column grids, so the content area could not contract safely when the viewport became narrow.
- Fix: Updated the card grids to use `minmax(0, 1fr)`, added responsive breakpoints that move the quick-links panel from a fixed right rail to a top sticky block below `1480px`, and reduced dense rows from multi-column layouts to fewer columns as the viewport shrinks.
- Verification: Checked headless Edge screenshots at `1366px` and `1280px` widths and confirmed that cards no longer overlap the quick-links panel.

- Symptom: A new "design guide" tab was needed so users could navigate office planning step by step instead of interpreting many separate analysis charts.
- Cause: Existing tabs are analysis-first and chart-heavy, which makes it harder to translate the DB into direct design decisions and sequencing.
- Fix: Added a new `G` tab skeleton with a hero/introduction area, top condition controls linked to existing filters, a step navigator with fold/unfold behavior, an all-steps toggle, and six step blocks covering zoning, work, executive, meeting, social, and support phases. The structure is intentionally metric-slot based so medians, quartile ranges, and dominant choices can be wired in next.
- Verification: Confirmed the original dashboard still renders in headless Edge after the tab/CSS/JS additions. Direct automated capture of the `G` tab itself was limited by local file automation constraints, so the new section was verified by source inspection plus runtime smoke-check of the unchanged main dashboard.

- Symptom: After adding real metrics to the design-guide tab, guide-only interactions could desync the quick-links panel, and changing the top guide filters risked overwriting the main sidebar filter state.
- Cause: The guide controls were reusing the global `F` filter object directly and rerendering only the guide section, so the TOC observer/listeners were not always rebuilt after guide-only state changes.
- Fix: Added a separate guide filter state (`GF`) that intersects with the sidebar filters without mutating them, updated guide toggles/step jumps to rerender the guide-aware TOC immediately, and replaced the placeholder cards with actual design-ready metrics for zoning, work, executive, meeting, social, and support steps.
- Verification: Passed `node --check` syntax validation on the extracted dashboard script after the guide-tab changes. Headless Edge validation for the dedicated `G` test page remained partially constrained by local test-file tab forcing, so browser verification was limited to smoke-checking the dashboard render path and manually inspecting the generated guide-tab source/output.

## 2026-04-16

- Symptom: The polished `G`-tab UI work had been completed in `spacedatabase_dashboard_test_G.html`, while the operational file `spacedatabase_dashboard.html` still had the older guide-tab presentation, so it was unclear which file should be treated as the real source of truth.
- Cause: The Claude collaboration happened in a separate test copy, and the design-guide implementation evolved independently in two files: the main dashboard kept the newer metric logic, while the test copy kept the more refined guide-tab UI.
- Fix: Kept `spacedatabase_dashboard.html` as the base, then selectively merged the `G`-tab presentation layer from the test file into it: chip-based guide filters, condensed hero/filter styling, warning banner host, arrow-style step navigator, and updated step-card styling. The metric calculations in the main file were preserved, and the guide filter summary helper was narrowed to `GF` so the top guide chips reflect only guide-tab state.
- Verification: Created a temporary `spacedatabase_dashboard_test_merge_G.html` from the main file, forced it to open on tab `G`, and captured a headless Edge screenshot to confirm the merged guide-tab UI renders from the operational codebase.

- Symptom: Even after the merge, the guide tab still behaved like a long analytical page: the common sidebar filter and right quick-links consumed screen space, the old long title/description remained, and the step content stacked vertically so users still had to scroll to consume the information.
- Cause: The original guide-tab structure inherited the same multi-pane chrome and long-form section pattern as the other analytical tabs, which conflicts with the new goal of using `G` as a compact office-planning index.
- Fix: Reframed `G` as the first/default tab, reduced the global header height, hid the common sidebar filter and quick-links whenever `G` is active, renamed the tab/title to `오피스 핵심 Index`, moved filter control to the top compact `도면 필터` box, and changed the step content to a single active-step layout with a horizontal step flow. `전체보기` still expands all steps, but the default mode now keeps one compressed step panel on screen. The `G` tab also now uses only its own top filter state (`GF`) instead of inheriting the hidden sidebar filter state.
- Verification: Captured a fresh headless Edge screenshot of the main `spacedatabase_dashboard.html` and confirmed the default landing view opens on `G`, hides the left/right side panels, and shows the compressed index layout in a single-screen presentation.

- Symptom: The refined Purple6 brand system was visible mainly in the `G` tab, while the rest of the dashboard still used the older lavender palette, pill-heavy radii, legacy fonts, and mixed chart accent colors, which made the product feel visually split.
- Cause: The Purple6 design tokens had been added as a `#sec-G`-scoped layer only, and the shared dashboard shell/card/navigation/chart styles still referenced the original `--p/#6B4FA0` token family and several hard-coded tab-specific colors.
- Fix: Remapped the global dashboard tokens to the Purple6 design-system palette, switched the dashboard-wide font stack to Pretendard, flattened shared component radii/shadows to the design-system card/button rules, refreshed header/sidebar/TOC/KPI/card/table styles, and aligned shared chart colors plus repeated hard-coded series palettes to the Purple6 brand accents.
- Verification: Captured a fresh headless Edge screenshot of the main dashboard landing on `G` and confirmed the updated global shell, card, and navigation styling render with the Purple6 brand system. Additional temporary tab-forcing smoke tests were used to check non-`G` render paths while validating the styling layer.

- Symptom: The core `오피스 핵심 Index` tab still exposed the global quick-links rail, even though the step flow directly under the filters already acts as the navigation for that tab.
- Cause: The shared `.toc-panel` lives outside `.page-shell`, so the existing guide-mode CSS never actually hid it, and the global chrome logic continued to keep the panel alive unless it was explicitly disabled.
- Fix: Added an explicit `body.guide-active` state for tab `G` and used it to hard-hide the global quick-links panel/mobile TOC button while the guide tab is active. The section chrome sync also now treats `G` as a no-TOC view instead of relying on inherited shared behavior.
- Verification: Re-ran a headless Edge screenshot on `spacedatabase_dashboard.html` and confirmed that `오피스 핵심 Index` renders with the filter area, step flow, and step cards only, with no right-side `바로가기` rail.

- Symptom: Even after removing the right-side quick-links, the core `오피스 핵심 Index` tab still felt visually unbalanced because the top hero/title and dedicated top filter block consumed a large share of the viewport, pushing the actual step metrics downward.
- Cause: The `G` tab kept its standalone guide header and top filter toolbar from the earlier one-screen index concept, instead of sharing the standard left filter rail used by the other dashboard tabs.
- Fix: Switched the core Index tab back to the shared left filter sidebar layout, made `G` read from the global filtered drawing set, removed the dedicated top guide filter/hero prominence from the visible layout, and kept the right quick-links hidden so the step metrics occupy the largest portion of the content area.
- Verification: Captured a fresh headless Edge screenshot and confirmed that the `오피스 핵심 Index` tab now shows the common left filter card, no right quick-links rail, and a much larger visible step-metric area.

## 2026-04-20

- Symptom: On phones and tablets, the dashboard still technically collapsed to fewer columns, but the fixed sidebar and quick-links structure remained cumbersome, dense cards and charts consumed too much vertical space, and non-guide tabs were not easy to operate on touch screens.
- Cause: The existing responsive layer mostly changed grid column counts. It did not provide mobile-specific navigation for the left filter rail and right TOC, and several chart/table/card settings were still tuned for desktop widths.
- Fix: Added a mobile-only sticky utility bar with dedicated filter/TOC toggles, converted the left filter rail and right quick-links into modal-style overlay panels below `900px`, tightened mobile card and chart sizing, improved badge/header wrapping, preserved table usability with horizontal scrolling, and adapted chart legends/tick density for tablet/mobile widths. The section chrome now also closes overlays on section switches, TOC jumps, resize transitions, and `Escape`.
- Verification: Captured headless Edge screenshots of the operational dashboard at `390x844` and `820x1180`, and confirmed that the guide landing view compresses cleanly while the updated responsive shell renders without sidebar overlap.

- Symptom: Even after the mobile-responsive pass, the first `G` landing screen still felt top-heavy because the compact filter box and step quick-tabs consumed too much vertical space before the first content card.
- Cause: The guide landing layout kept the design-filter count row, generous filter-panel padding, large filter chips, and a relatively tall step-tab strip, so the hero area remained visually dominant even after the broader responsive cleanup.
- Fix: Slimmed the `G` filter panel padding and chip sizing, removed the extra count row from the first-screen filter block, and tightened the step quick-tab paddings/labels so the first content card appears higher in the viewport.
- Verification: Re-captured the operational dashboard at `1366x768` and `1024x768` and confirmed the first visible content block now starts materially higher on the landing screen.

## 2026-04-22

- Symptom: After moving `G` back onto the shared left sidebar layout, the tab no longer showed the standard section title row that every other tab displays at the top of the content area.
- Cause: `sec-G` rendered directly into the guide shell while its legacy hero block stayed hidden, so there was no visible `.sec-hd` element to establish the same title hierarchy used by `개괄`, `업무공간 : 일반`, and the other tabs.
- Fix: Inserted the common `.sec-hd` header block directly under `#sec-G` with the title `오피스 핵심 Index` and a short subtitle, while keeping the hidden guide hero, shared left filter sidebar, and hidden right quick-links behavior unchanged.
- Verification: Re-ran a desktop screenshot check and confirmed that `G` now shows the same top header pattern as the other tabs without bringing back the oversized hero/filter chrome.

- Symptom: On the core Index first screen, there was still an awkward gap between the new section header and the step-flow strip, while the first metric cards felt too short and left a large-looking empty area beneath the actual values.
- Cause: The shared `.sec-hd` bottom margin plus the guide shell gap stacked too much whitespace above the flow row, and the single-step guide card/body paddings were still tuned for a denser compact state.
- Fix: Reduced the `sec-G` header-to-shell spacing, increased the vertical padding of the step-flow strip, and enlarged the first open step body's/card paddings so the index cards occupy more of the visible height.
- Verification: Captured a fresh desktop screenshot and confirmed the title-to-flow spacing reads tighter while the first index card row feels fuller and less bottom-heavy.

- Symptom: Even after the first density pass, the step-flow strip still felt visually thin compared with the available width, and the first index cards still left too much visible blank space below the metric content on large desktop screens.
- Cause: `#sec-G` had its own compact overrides for the flow strip and metric cards, with shallow button paddings and relatively short card internals compared with the expanded desktop canvas.
- Fix: Increased the `#sec-G` flow-strip bottom spacing and button padding, enlarged the first-step header/body vertical padding, and raised the metric-card minimum height plus inner padding so the visible card block occupies more vertical space.
- Verification: Captured another large desktop screenshot and confirmed the flow strip reads taller and the first metric row fills more of the viewport with less empty space below.

- Symptom: In the shared left filter card, users had to scan multiple category blocks to find the most frequently used controls, which added unnecessary search effort before filtering.
- Cause: High-traffic filters such as `가용면적구간`, `인원구간`, `산업군`, and `대기업 여부` were buried inside broader category groups with the same visual weight as every other field.
- Fix: Added a new highlighted `많이 찾는 필터` section at the top of the filter card, moved those four controls into it, removed their duplicates from the lower groups, and styled the section with a distinct purple-accented border/background treatment.
- Verification: Captured a desktop screenshot and confirmed the four priority filters now appear first and are visually easier to spot than the rest of the sidebar fields.
