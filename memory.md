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
