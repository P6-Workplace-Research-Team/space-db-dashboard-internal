import { Outlet, Link, useLocation } from 'react-router';
import { Badge } from './ui/badge';

export default function DashboardLayout() {
  const location = useLocation();

  const tabs = [
    { path: '/', label: '개괄', isActive: location.pathname === '/' },
    { path: '/office-guide', label: '오피스는 어떻게 만들어야 하나요?', isActive: location.pathname === '/office-guide' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f7f7' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm" style={{ borderBottom: '1px solid #e8e8e8' }}>
        <div className="px-10 py-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#7800f5' }}>
                <span className="text-white font-semibold text-base">P6</span>
              </div>
              <div>
                <h1 className="text-2xl font-normal text-black" style={{ letterSpacing: '-0.01em' }}>공간DB 대시보드</h1>
                <p className="text-sm mt-0.5" style={{ color: '#515151' }}>퍼플식스 스튜디오 오피스 공간 설계 인사이트 플랫폼</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs" style={{ borderColor: '#e8e8e8', color: '#515151' }}>
                총 540개 프로젝트
              </Badge>
              <Badge variant="outline" className="text-xs" style={{ borderColor: '#e8e8e8', color: '#515151' }}>
                2026년 4월 기준
              </Badge>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-5 py-2.5 text-sm font-medium transition-all ${
                  tab.isActive
                    ? 'text-white'
                    : 'text-black hover:text-white'
                }`}
                style={{
                  backgroundColor: tab.isActive ? '#7800f5' : 'transparent',
                  letterSpacing: '0.04em'
                }}
                onMouseEnter={(e) => {
                  if (!tab.isActive) {
                    e.currentTarget.style.backgroundColor = '#7800f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!tab.isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <Outlet />
    </div>
  );
}