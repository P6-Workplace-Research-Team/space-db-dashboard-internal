import { useState } from 'react';
import { Info, TrendingUp, TrendingDown, Minus, ChevronDown, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function Overview() {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview', 'workspace-general']);

  // Mock 데이터
  const keyMetrics = [
    {
      title: '인당 평균 면적',
      value: '8.2m²',
      change: '+12%',
      trend: 'up',
      comparison: '업계 평균보다 0.5m² 높음',
      description: '선택한 조건의 오피스들은 일반적인 오피스보다 여유로운 공간을 제공하고 있습니다.'
    },
    {
      title: '회의실 평균 개소',
      value: '12개',
      change: '±0%',
      trend: 'stable',
      comparison: '인원 대비 적정 수준',
      description: '100명당 약 4개의 회의실이 배치되어 있으며, 이는 권장 비율과 일치합니다.'
    },
    {
      title: '라운지 계획 비율',
      value: '78%',
      change: '+24%',
      trend: 'up',
      comparison: '최근 3년간 증가 추세',
      description: '최근 오피스 설계에서 직원 복지공간에 대한 관심이 크게 증가했습니다.'
    }
  ];

  const similarProjects = [
    { name: 'IT기업 A사 본사', match: 92, year: 2025, employees: 280 },
    { name: '금융사 B 신사옥', match: 88, year: 2024, employees: 320 },
    { name: '제조사 C 서울오피스', match: 85, year: 2025, employees: 250 }
  ];

  const workspaceTypeData = [
    { name: '일반 업무', value: 62, color: '#6366f1' },
    { name: '회의', value: 15, color: '#8b5cf6' },
    { name: '소셜', value: 12, color: '#ec4899' },
    { name: '지원', value: 8, color: '#f59e0b' },
    { name: '임원', value: 3, color: '#10b981' }
  ];

  const yearlyTrendData = [
    { year: '2020', 회의실: 10, 라운지: 45, 폰부스: 25 },
    { year: '2021', 회의실: 11, 라운지: 58, 폰부스: 35 },
    { year: '2022', 회의실: 12, 라운지: 65, 폰부스: 48 },
    { year: '2023', 회의실: 12, 라운지: 72, 폰부스: 62 },
    { year: '2024', 회의실: 13, 라운지: 75, 폰부스: 68 },
    { year: '2025', 회의실: 12, 라운지: 78, 폰부스: 71 }
  ];

  const deskTypeData = [
    { name: '1200mm', value: 45 },
    { name: '1400mm', value: 35 },
    { name: '1600mm', value: 15 },
    { name: '기타', value: 5 }
  ];

  const sections = [
    { id: 'overview', title: '핵심 인사이트', icon: '📊' },
    { id: 'workspace-general', title: '업무공간: 일반', icon: '💼' },
    { id: 'workspace-exec', title: '업무공간: 임원', icon: '👔' },
    { id: 'meeting', title: '회의공간', icon: '🤝' },
    { id: 'social', title: '소셜공간', icon: '☕' },
    { id: 'support', title: '지원공간', icon: '📞' }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <aside className="w-72 bg-white border-r border-slate-200 sticky top-[145px] h-[calc(100vh-145px)] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-slate-600" />
              <h2 className="font-semibold text-slate-900">필터</h2>
            </div>

            <div className="space-y-6">
              {/* 도면 관련 필터 */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">도면 정보</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-600 mb-1.5 block">연도</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 mb-1.5 block">가용면적 구간</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="small">1,000m² 이하</SelectItem>
                        <SelectItem value="medium">1,000~3,000m²</SelectItem>
                        <SelectItem value="large">3,000m² 이상</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 mb-1.5 block">인원 구간</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="small">100명 이하</SelectItem>
                        <SelectItem value="medium">100~300명</SelectItem>
                        <SelectItem value="large">300명 이상</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 위치 관련 필터 */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">위치</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-600 mb-1.5 block">권역</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="gangnam">강남권</SelectItem>
                        <SelectItem value="gangbuk">강북권</SelectItem>
                        <SelectItem value="gyeonggi">경기권</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 기업 관련 필터 */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">기업 정보</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-600 mb-1.5 block">산업군</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="it">IT/정보통신</SelectItem>
                        <SelectItem value="finance">금융</SelectItem>
                        <SelectItem value="manufacturing">제조</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline" size="sm">
                필터 초기화
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {/* 온보딩 가이드 */}
          <Card className="mb-8 border-indigo-200 bg-indigo-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">프로젝트 시작 가이드</CardTitle>
                  <CardDescription className="mt-1.5">
                    좌측 필터로 조건을 설정하면, 유사한 프로젝트의 데이터를 기반으로 핵심 지표를 확인할 수 있습니다.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Section 1: 핵심 인사이트 */}
          <section id="overview" className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">📊 핵심 인사이트</h2>
                <p className="text-sm text-slate-600 mt-1">선택한 조건의 가장 중요한 지표 3가지</p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="border-slate-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        {metric.title}
                      </CardTitle>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-slate-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">{metric.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-slate-900">{metric.value}</span>
                      <span className={`text-sm font-medium flex items-center gap-1 ${
                        metric.trend === 'up' ? 'text-green-600' :
                        metric.trend === 'down' ? 'text-red-600' :
                        'text-slate-500'
                      }`}>
                        {metric.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                        {metric.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                        {metric.trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{metric.comparison}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 공간 구성 비율 */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>전체 공간 구성 비율</CardTitle>
                    <CardDescription>선택한 조건의 평균 공간 배분</CardDescription>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">도면별 공간 프로그램 비율의 평균입니다. 업무 공간이 60% 이상을 차지하는 것이 일반적입니다.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={workspaceTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                      >
                        {workspaceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col justify-center space-y-3">
                    {workspaceTypeData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-slate-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 연도별 트렌드 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>주요 공간 트렌드 (2020-2025)</CardTitle>
                    <CardDescription>최근 6년간 공간 계획 비율 변화</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    전년 대비
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="회의실" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="회의실 평균 개소" />
                    <Line type="monotone" dataKey="라운지" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} name="라운지 계획률 (%)" />
                    <Line type="monotone" dataKey="폰부스" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="폰부스 조성률 (%)" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-900">인사이트:</strong> 2020년 이후 소셜 공간(라운지)과 지원 공간(폰부스) 계획 비율이 지속적으로 증가하고 있습니다.
                    이는 직원 웰빙과 집중 업무 환경에 대한 관심이 높아진 것을 반영합니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: 업무공간 - 일반 */}
          <Collapsible
            open={expandedSections.includes('workspace-general')}
            onOpenChange={() => toggleSection('workspace-general')}
          >
            <section id="workspace-general" className="mb-12">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between mb-6 group cursor-pointer">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 text-left">💼 업무공간: 일반</h2>
                    <p className="text-sm text-slate-600 mt-1 text-left">데스크 형태, 너비, 인당 면적 등</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.includes('workspace-general') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="space-y-6">
                  {/* 주요 지표 */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">업무 공간 비중</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-slate-900 mb-1">62%</div>
                        <p className="text-xs text-slate-600">전체 면적 대비</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">평균 인당 면적</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-slate-900 mb-1">8.2m²</div>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          권장 범위 내 (7~10m²)
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 데스크 너비 분포 */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>데스크 너비 분포</CardTitle>
                          <CardDescription>가장 많이 사용되는 데스크 규격</CardDescription>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-slate-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">1200mm는 집중 업무용, 1400mm 이상은 협업이 많은 직군에 적합합니다.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={deskTypeData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                          <YAxis stroke="#64748b" fontSize={12} />
                          <RechartsTooltip />
                          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-900">
                          <strong>제안:</strong> 선택한 조건에서는 1200mm가 가장 많이 사용됩니다. IT 업종의 경우 듀얼 모니터 사용을 고려해 1400mm 이상을 권장합니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>

          {/* 추가 섹션들 (축약) */}
          <Collapsible
            open={expandedSections.includes('meeting')}
            onOpenChange={() => toggleSection('meeting')}
          >
            <section id="meeting" className="mb-12">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between mb-6 group cursor-pointer">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 text-left">🤝 회의공간</h2>
                    <p className="text-sm text-slate-600 mt-1 text-left">회의실 개소, 규모, 가구 스타일</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.includes('meeting') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">회의실 평균 개소</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900 mb-1">12개</div>
                    <p className="text-xs text-slate-600">인원 100명당 약 4개 배치</p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-900">
                        <strong>참고:</strong> 회의실은 전체 인원의 15~20%가 동시 사용 가능하도록 계획하는 것이 일반적입니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </section>
          </Collapsible>
        </main>

        {/* Right Sidebar - Quick Insights & Navigation */}
        <aside className="w-80 bg-white border-l border-slate-200 sticky top-[145px] h-[calc(100vh-145px)] overflow-y-auto">
          <div className="p-6">
            {/* Quick Navigation */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">빠른 이동</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Similar Projects */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">비슷한 프로젝트</h3>
              <div className="space-y-3">
                {similarProjects.map((project, index) => (
                  <Card key={index} className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-900">{project.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {project.match}%
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-slate-600">준공: {project.year}년</p>
                        <p className="text-xs text-slate-600">인원: {project.employees}명</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Insights Summary */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">주요 발견 사항</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-green-900">
                      라운지 계획 비율이 평균 대비 15% 높음
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-900">
                      소규모 회의실(4인 이하) 비중 증가 추세
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </TooltipProvider>
  );
}
