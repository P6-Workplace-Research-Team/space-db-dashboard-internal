import { useState } from 'react';
import { ChevronDown, ChevronRight, Info, Filter as FilterIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { TooltipProvider } from './ui/tooltip';

type StepId = 'zoning' | 'workspace' | 'executive' | 'meeting' | 'social' | 'support';

export default function OfficeGuide() {
  const [currentStep, setCurrentStep] = useState<StepId>('zoning');
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // 필터 상태
  const [areaFilter, setAreaFilter] = useState('all');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  const steps = [
    { 
      id: 'zoning' as StepId, 
      title: 'Step 1. 전체 조닝', 
      subtitle: '오피스 한 층에는 어떤 공간 프로그램을, 어떻게 배치해야하나요?',
      icon: '🏢'
    },
    { 
      id: 'workspace' as StepId, 
      title: 'Step 2. 업무 공간', 
      subtitle: '불편하지 않은 업무 공간은 어떻게 만드나요?',
      icon: '💼'
    },
    { 
      id: 'executive' as StepId, 
      title: 'Step 3. 임원 공간', 
      subtitle: '임원실은 어떤 규모로, 어떤 분위기로 만들어야 하나요?',
      icon: '👔'
    },
    { 
      id: 'meeting' as StepId, 
      title: 'Step 4. 회의 공간', 
      subtitle: '회의실은 몇 개, 어느 정도 규모로 만들어야 하나요?',
      icon: '🤝'
    },
    { 
      id: 'social' as StepId, 
      title: 'Step 5. 소셜 공간', 
      subtitle: '소셜 공간은 얼마나 할애해야 하고, 어떤 프로그램을 넣어야 할까요?',
      icon: '☕'
    },
    { 
      id: 'support' as StepId, 
      title: 'Step 6. 지원 공간', 
      subtitle: '폰부스, OA 공간은 몇 개, 어느 정도 규모로 만들어야 하나요?',
      icon: '📞'
    }
  ];

  const navigateToStep = (stepId: StepId) => {
    setCurrentStep(stepId);
    setTimeout(() => {
      const element = document.getElementById(`step-${stepId}`);
      if (element) {
        const offset = 180;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const isStepActive = (stepId: StepId) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    return showAllSteps || stepIndex <= currentIndex;
  };

  const isStepExpanded = (stepId: StepId) => {
    return showAllSteps || stepId === currentStep;
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-[calc(100vh-145px)]">
        {/* Left Sidebar - Filters */}
        <aside className="w-80 bg-white border-r border-slate-200 sticky top-[145px] h-[calc(100vh-145px)] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FilterIcon className="w-5 h-5 text-slate-600" />
              <h2 className="font-semibold text-slate-900">보고자 하는 도면의 조건</h2>
            </div>

            <div className="space-y-6">
              {/* 기본 필터 */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">가용 면적</label>
                  <Select value={areaFilter} onValueChange={setAreaFilter}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="면적 구간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="500-1000">500~1,000m²</SelectItem>
                      <SelectItem value="1000-2000">1,000~2,000m²</SelectItem>
                      <SelectItem value="2000-3000">2,000~3,000m²</SelectItem>
                      <SelectItem value="3000+">3,000m² 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">인원 구간</label>
                  <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="인원 구간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="50-100">50~100명</SelectItem>
                      <SelectItem value="100-200">100~200명</SelectItem>
                      <SelectItem value="200-300">200~300명</SelectItem>
                      <SelectItem value="300+">300명 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">산업군</label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="산업군 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="it">IT/정보통신</SelectItem>
                      <SelectItem value="finance">금융</SelectItem>
                      <SelectItem value="manufacturing">제조</SelectItem>
                      <SelectItem value="service">서비스</SelectItem>
                      <SelectItem value="distribution">유통</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 기타 변수 (고급 필터) */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">기타 변수</label>
                  <Switch
                    checked={showAdvancedFilters}
                    onCheckedChange={setShowAdvancedFilters}
                  />
                </div>

                {showAdvancedFilters && (
                  <div className="space-y-4 mt-4">
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
                          <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

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

                    <div>
                      <label className="text-xs text-slate-600 mb-1.5 block">층 형태</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체</SelectItem>
                          <SelectItem value="single">단층</SelectItem>
                          <SelectItem value="multi">복층</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full" variant="outline" size="sm">
                필터 초기화
              </Button>

              {/* 필터링 결과 요약 */}
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-xs font-medium text-purple-900 mb-1">필터링 결과</div>
                <div className="text-2xl font-bold text-purple-900">87개</div>
                <div className="text-xs text-purple-700 mt-1">전체 540개 도면 중</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">오피스는 어떻게 만들어야 하나요?</h1>
            <p className="text-slate-600">
              오피스 공간DB를 활용하여 설계를 진행하는 과정에서 단계별로 필요한 구체적인 숫자와 가이드를 제공합니다.
            </p>
          </div>

          {/* 안내 카드 */}
          <Card className="mb-8 border-purple-200 bg-purple-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">사용 가이드</CardTitle>
                  <CardDescription className="mt-1.5">
                    좌측에서 원하는 조건을 선택하고, 아래 단계를 따라가며 설계에 필요한 정보를 확인하세요. 
                    각 스텝을 클릭하면 해당 단계로 이동하며, "전체보기" 토글을 켜면 모든 스텝을 한 번에 볼 수 있습니다.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 전체 스텝 네비게이션 */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>설계 단계</CardTitle>
                  <CardDescription>6단계로 구성된 오피스 설계 가이드</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Label htmlFor="show-all" className="text-sm text-slate-600 cursor-pointer">전체보기</Label>
                  <Switch
                    id="show-all"
                    checked={showAllSteps}
                    onCheckedChange={setShowAllSteps}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => navigateToStep(step.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      currentStep === step.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <div className="text-sm font-semibold text-slate-900 mb-1">{step.title}</div>
                    <div className="text-xs text-slate-600 line-clamp-2">{step.subtitle}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 1: 조닝 */}
          <Collapsible open={isStepExpanded('zoning')} onOpenChange={() => navigateToStep('zoning')}>
            <section id="step-zoning" className="mb-8">
              <CollapsibleTrigger className="w-full">
                <Card className={`cursor-pointer transition-all ${currentStep === 'zoning' ? 'border-purple-300 shadow-md' : 'border-slate-200'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{steps[0].icon}</div>
                        <div className="text-left">
                          <CardTitle className="text-lg">{steps[0].title}</CardTitle>
                          <CardDescription>{steps[0].subtitle}</CardDescription>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isStepExpanded('zoning') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  {/* 한 층의 적정 면적 범위 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">한 층의 적정 면적 범위</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-purple-900">1,200m²</span>
                        <span className="text-lg text-slate-600">~</span>
                        <span className="text-4xl font-bold text-purple-900">2,400m²</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">1사분위 ~ 3사분위</Badge>
                        <span className="text-xs text-slate-600">중앙값: 1,800m²</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 한 층의 적정 인원 수 범위 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">한 층의 적정 인원 수 범위</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-purple-900">150명</span>
                        <span className="text-lg text-slate-600">~</span>
                        <span className="text-4xl font-bold text-purple-900">300명</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">1사분위 ~ 3사분위</Badge>
                        <span className="text-xs text-slate-600">중앙값: 225명</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 적정 인당 면적 범위 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">적정 인당 면적 범위</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-purple-900">7.2m²</span>
                        <span className="text-lg text-slate-600">~</span>
                        <span className="text-4xl font-bold text-purple-900">9.8m²</span>
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-900">
                          <strong>해석:</strong> 인당 7~10m²는 쾌적한 업무 환경을 위한 권장 범위입니다. 
                          이보다 낮으면 밀집도가 높아 불편할 수 있습니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 오피스 한 층 내 공간 프로그램 면적 배분 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">오피스 한 층 내 공간 프로그램 면적 배분</CardTitle>
                      <CardDescription>전체 가용 면적 대비 각 공간 프로그램의 평균 비율</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: '업무', percent: 58, color: 'bg-indigo-500' },
                          { name: '회의', percent: 15, color: 'bg-blue-500' },
                          { name: '소셜', percent: 12, color: 'bg-pink-500' },
                          { name: '임원', percent: 5, color: 'bg-purple-500' },
                          { name: '지원', percent: 6, color: 'bg-amber-500' },
                          { name: '통로 및 여유 공간', percent: 4, color: 'bg-slate-400' }
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-medium text-slate-700">{item.name}</span>
                              <span className="text-sm font-bold text-slate-900">{item.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                              <div
                                className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                                style={{ width: `${item.percent}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs text-purple-900">
                          <strong>활용 가이드:</strong> 업무 공간이 전체의 50~65%를 차지하는 것이 일반적입니다. 
                          최근 트렌드는 소셜 공간 비중이 증가하는 추세입니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 다음 단계 버튼 */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => navigateToStep('workspace')}
                      className="gap-2"
                    >
                      다음 단계: 업무 공간
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>

          {/* Step 2: 업무 공간 */}
          <Collapsible open={isStepExpanded('workspace')} onOpenChange={() => navigateToStep('workspace')}>
            <section id="step-workspace" className="mb-8">
              <CollapsibleTrigger className="w-full">
                <Card className={`cursor-pointer transition-all ${currentStep === 'workspace' ? 'border-purple-300 shadow-md' : 'border-slate-200'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{steps[1].icon}</div>
                        <div className="text-left">
                          <CardTitle className="text-lg">{steps[1].title}</CardTitle>
                          <CardDescription>{steps[1].subtitle}</CardDescription>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isStepExpanded('workspace') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  {/* 업무 공간 비율 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">전체 층 내 가용 면적의 업무 공간 평균 비율</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">58%</div>
                      <p className="text-sm text-slate-600">전체 가용 면적 대비</p>
                    </CardContent>
                  </Card>

                  {/* 권장 통로 너비 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">권장 주통로 / 부통로 너비</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">주통로</div>
                          <div className="text-2xl font-bold text-slate-900">1,800~2,000mm</div>
                          <div className="text-xs text-slate-500 mt-1">최소값: 1,700mm</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">부통로</div>
                          <div className="text-2xl font-bold text-slate-900">1,200~1,500mm</div>
                          <div className="text-xs text-slate-500 mt-1">최소값: 1,100mm</div>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-900">
                          <strong>참고:</strong> 통로 너비는 안전과 동선의 효율성에 직접적인 영향을 줍니다. 
                          법적 기준을 준수하며 여유있게 계획하는 것이 좋습니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 데스크 형태 및 너비 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">가장 많이 쓰는 데스크 형태 및 데스크 너비</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="text-xs text-indigo-700 mb-1">데스크 형태</div>
                          <div className="text-2xl font-bold text-indigo-900">직선형</div>
                          <Badge variant="secondary" className="mt-2 text-xs">사용률 78%</Badge>
                        </div>
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="text-xs text-indigo-700 mb-1">데스크 너비</div>
                          <div className="text-2xl font-bold text-indigo-900">1,400mm</div>
                          <Badge variant="secondary" className="mt-2 text-xs">사용률 52%</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-900">
                          <strong>활용 가이드:</strong> 1,400mm는 듀얼 모니터 사용에 적합한 너비입니다. 
                          IT 업종에서 선호되며, 협업이 많은 환경에서 권장됩니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 권장 등간격 너비 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">권장 등간격 너비</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-purple-900 mb-2">2,000mm</div>
                      <p className="text-sm text-slate-600 mb-3">3열 배치 시 권장</p>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-700">
                          <strong>참고:</strong> 4열 이상 배치 또는 데스크 중앙에 회의 테이블을 배치하는 경우 2,200mm를 권장합니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 권장 열 배치 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">권장 열 배치</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">3열</div>
                      <p className="text-sm text-slate-600">가장 효율적인 데스크 배치</p>
                    </CardContent>
                  </Card>

                  {/* 다음 단계 버튼 */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => navigateToStep('executive')}
                      className="gap-2"
                    >
                      다음 단계: 임원 공간
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>

          {/* Step 3: 임원 공간 */}
          <Collapsible open={isStepExpanded('executive')} onOpenChange={() => navigateToStep('executive')}>
            <section id="step-executive" className="mb-8">
              <CollapsibleTrigger className="w-full">
                <Card className={`cursor-pointer transition-all ${currentStep === 'executive' ? 'border-purple-300 shadow-md' : 'border-slate-200'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{steps[2].icon}</div>
                        <div className="text-left">
                          <CardTitle className="text-lg">{steps[2].title}</CardTitle>
                          <CardDescription>{steps[2].subtitle}</CardDescription>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isStepExpanded('executive') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  {/* 임원 공간 비율 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">전체 층 내 가용 면적의 임원 공간 평균 비율</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">5%</div>
                      <p className="text-sm text-slate-600">전체 가용 면적 대비</p>
                    </CardContent>
                  </Card>

                  {/* 가장 많이 쓰는 가구 구성 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">가장 많이 쓰는 가구 구성</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-3">
                        <div className="text-2xl font-bold text-purple-900 mb-1">책상 + 소파 + 회의테이블 (실)</div>
                        <Badge variant="secondary" className="text-xs">사용률 42%</Badge>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">평균 면적</div>
                      <div className="text-4xl font-bold text-purple-900">32m²</div>
                    </CardContent>
                  </Card>

                  {/* 오픈 임원석 사용도 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">오픈 임원석 사용도</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-3 mb-2">
                        <div className="text-4xl font-bold text-purple-900">보통</div>
                        <div className="text-xl text-slate-600">(48%)</div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">오픈 임원석을 1개 이상 포함한 도면 비율</p>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-700">
                          <strong>기준:</strong> 30% 이하: 낮음 / 30~60%: 보통 / 61% 이상: 높음
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 임원 공간 개소 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">임원 공간 평균 개소</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">3.2개</div>
                      <p className="text-sm text-slate-600">한 층당 평균</p>
                    </CardContent>
                  </Card>

                  {/* 다음 단계 버튼 */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => navigateToStep('meeting')}
                      className="gap-2"
                    >
                      다음 단계: 회의 공간
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>

          {/* Step 4: 회의 공간 */}
          <Collapsible open={isStepExpanded('meeting')} onOpenChange={() => navigateToStep('meeting')}>
            <section id="step-meeting" className="mb-8">
              <CollapsibleTrigger className="w-full">
                <Card className={`cursor-pointer transition-all ${currentStep === 'meeting' ? 'border-purple-300 shadow-md' : 'border-slate-200'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{steps[3].icon}</div>
                        <div className="text-left">
                          <CardTitle className="text-lg">{steps[3].title}</CardTitle>
                          <CardDescription>{steps[3].subtitle}</CardDescription>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isStepExpanded('meeting') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  {/* 회의 공간 비율 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">전체 층 내 가용 면적의 회의 공간 평균 비율</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">15%</div>
                      <p className="text-sm text-slate-600">전체 가용 면적 대비</p>
                    </CardContent>
                  </Card>

                  {/* 회의실 전체 개소 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">회의실 전체 평균 개소</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">12개</div>
                      <p className="text-sm text-slate-600">한 층당 평균</p>
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-900">
                          <strong>참고:</strong> 전체 인원의 15~20%가 동시에 회의할 수 있도록 계획하는 것이 일반적입니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 인원별 회의실 구성 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">인원 규모별 회의실 구성</CardTitle>
                      <CardDescription>평균 개소 및 면적</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { size: '4인 이하', count: 5.2, area: 12 },
                          { size: '5-8인', count: 4.1, area: 24 },
                          { size: '9-16인', count: 2.3, area: 42 },
                          { size: '17인 이상', count: 0.8, area: 68 }
                        ].map((item, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-900">{item.size} 회의실</span>
                              <Badge variant="outline" className="text-xs">평균</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs text-slate-600 mb-1">개소</div>
                                <div className="text-2xl font-bold text-purple-900">{item.count}개</div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-600 mb-1">면적</div>
                                <div className="text-2xl font-bold text-purple-900">{item.area}m²</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs text-purple-900">
                          <strong>활용 가이드:</strong> 소규모 회의실(4인 이하)의 비중이 높은 것이 최근 트렌드입니다. 
                          유연한 협업 환경 조성에 유리합니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 다음 단계 버튼 */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => navigateToStep('social')}
                      className="gap-2"
                    >
                      다음 단계: 소셜 공간
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>

          {/* Step 5: 소셜 공간 */}
          <Collapsible open={isStepExpanded('social')} onOpenChange={() => navigateToStep('social')}>
            <section id="step-social" className="mb-8">
              <CollapsibleTrigger className="w-full">
                <Card className={`cursor-pointer transition-all ${currentStep === 'social' ? 'border-purple-300 shadow-md' : 'border-slate-200'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{steps[4].icon}</div>
                        <div className="text-left">
                          <CardTitle className="text-lg">{steps[4].title}</CardTitle>
                          <CardDescription>{steps[4].subtitle}</CardDescription>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isStepExpanded('social') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  {/* 소셜 공간 비율 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">전체 층 내 가용 면적의 소셜 공간 평균 비율</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">12%</div>
                      <p className="text-sm text-slate-600">전체 가용 면적 대비</p>
                    </CardContent>
                  </Card>

                  {/* 라운지 조성 비율 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">라운지 조성 비율</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-3 mb-2">
                        <div className="text-4xl font-bold text-purple-900">높음</div>
                        <div className="text-xl text-slate-600">(72%)</div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">라운지를 포함한 도면 비율</p>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-xs text-green-900">
                          <strong>트렌드:</strong> 최근 오피스에서 라운지 공간에 대한 관심이 크게 증가했습니다. 
                          직원 복지와 소통 활성화에 효과적입니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 라운지 유형 및 면적 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">가장 많이 쓰는 라운지 유형 및 면적</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-pink-50 rounded-lg border border-pink-200 mb-3">
                        <div className="text-xl font-bold text-pink-900 mb-1">복합형 라운지</div>
                        <Badge variant="secondary" className="text-xs">사용률 58%</Badge>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">평균 면적</div>
                      <div className="text-4xl font-bold text-purple-900">45m²</div>
                    </CardContent>
                  </Card>

                  {/* 라운지 평균 개소 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">라운지 평균 개소</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">2.3개</div>
                      <p className="text-sm text-slate-600">한 층당 평균 (라운지 보유 도면 기준)</p>
                    </CardContent>
                  </Card>

                  {/* 탕비 공간 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">탕비 공간 평균 개소 및 면적</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">평균 개소</div>
                          <div className="text-3xl font-bold text-purple-900">3.5개</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">평균 면적</div>
                          <div className="text-3xl font-bold text-purple-900">8m²</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">탕비 공간 보유 도면 기준</p>
                    </CardContent>
                  </Card>

                  {/* 다음 단계 버튼 */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => navigateToStep('support')}
                      className="gap-2"
                    >
                      다음 단계: 지원 공간
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>

          {/* Step 6: 지원 공간 */}
          <Collapsible open={isStepExpanded('support')} onOpenChange={() => navigateToStep('support')}>
            <section id="step-support" className="mb-8">
              <CollapsibleTrigger className="w-full">
                <Card className={`cursor-pointer transition-all ${currentStep === 'support' ? 'border-purple-300 shadow-md' : 'border-slate-200'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{steps[5].icon}</div>
                        <div className="text-left">
                          <CardTitle className="text-lg">{steps[5].title}</CardTitle>
                          <CardDescription>{steps[5].subtitle}</CardDescription>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isStepExpanded('support') ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  {/* 지원 공간 비율 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">전체 층 내 가용 면적의 지원 공간 평균 비율</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">6%</div>
                      <p className="text-sm text-slate-600">전체 가용 면적 대비</p>
                    </CardContent>
                  </Card>

                  {/* 1인 단위 공간 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">1인 단위 공간의 평균 개소 및 면적</CardTitle>
                      <CardDescription>폰부스 + 선택업무공간_실</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">평균 개소</div>
                          <div className="text-3xl font-bold text-purple-900">6.8개</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">평균 면적</div>
                          <div className="text-3xl font-bold text-purple-900">3.2m²</div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-900">
                          <strong>활용 가이드:</strong> 1인 단위 공간은 집중 업무나 통화를 위한 필수 시설입니다. 
                          인원 30~50명당 1개 정도 배치를 권장합니다.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 선택업무공간 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">선택업무공간_실 평균 개소</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-purple-900 mb-2">4.2개</div>
                      <p className="text-sm text-slate-600">한 층당 평균 (선택업무공간 보유 도면 기준)</p>
                    </CardContent>
                  </Card>

                  {/* OA 공간 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">OA 평균 개소 및 면적</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">평균 개소</div>
                          <div className="text-3xl font-bold text-purple-900">2.1개</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">평균 면적</div>
                          <div className="text-3xl font-bold text-purple-900">12m²</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">OA 공간 보유 도면 기준</p>
                    </CardContent>
                  </Card>

                  {/* 완료 메시지 */}
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                          <span className="text-2xl">✅</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-900 mb-1">모든 단계를 완료했습니다!</h4>
                          <p className="text-sm text-green-800">
                            이제 수집한 정보를 바탕으로 오피스 설계를 진행할 수 있습니다. 
                            궁금한 부분이 있다면 언제든지 이전 단계로 돌아가 확인하세요.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>
        </main>
      </div>
    </TooltipProvider>
  );
}
