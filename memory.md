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

## 2026-04-20

- Symptom: On phones and tablets, the dashboard still technically collapsed to fewer columns, but the fixed sidebar and quick-links structure remained cumbersome, dense cards and charts consumed too much vertical space, and non-guide tabs were not easy to operate on touch screens.
- Cause: The existing responsive layer mostly changed grid column counts. It did not provide mobile-specific navigation for the left filter rail and right TOC, and several chart/table/card settings were still tuned for desktop widths.
- Fix: Added a mobile-only sticky utility bar with dedicated filter/TOC toggles, converted the left filter rail and right quick-links into modal-style overlay panels below `900px`, tightened mobile card and chart sizing, improved badge/header wrapping, preserved table usability with horizontal scrolling, and adapted chart legends/tick density for tablet/mobile widths. The section chrome now also closes overlays on section switches, TOC jumps, resize transitions, and `Escape`.
- Verification: Captured headless Edge screenshots of the operational dashboard at `390x844` and `820x1180`, and confirmed that the guide landing view compresses cleanly while the updated responsive shell renders without sidebar overlap.
