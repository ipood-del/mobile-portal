/* =================================================================
 * 모바일 업무 포털  ·  자이C&A
 *
 * ★ URL 교체  : APP_DATA 배열 → url 값 변경
 * ★ 아이콘 교체: iconType:"image" + iconSrc:"./icons/파일명.png"
 * ★ 항목 추가  : APP_DATA에 객체 추가 → 카드 자동 생성
 * ================================================================= */


/* =================================================================
 * [1] 앱 목록 데이터  ←  url 값을 실제 SharePoint 주소로 교체
 * ================================================================= */
var APP_DATA = [
  {
    id: 1,
    title:    '안전보건 Platform',
    desc:     'Safety & Health',
    url:      'https://gsenc.sharepoint.com/sites/xicnasafety/',          // ← URL 교체
    iconType: 'svg',
    iconSrc:  null,
    icon:     'safe',
    accent:   '#059669',
    iconBg:   'linear-gradient(145deg, #D1FAE5, #6EE7B7)',
    iconClr:  '#065F46',
  },
  {
    id: 2,
    title:    '공무 Platform',
    desc:     'Project Control',
    url:      'https://gsenc.sharepoint.com/sites/projectcontrol/?poolIdx=1',  // ← URL 교체
    iconType: 'svg',
    iconSrc:  null,
    icon:     'project',
    accent:   '#2563EB',
    iconBg:   'linear-gradient(145deg, #DBEAFE, #93C5FD)',
    iconClr:  '#1E40AF',
  },
  {
    id: 3,
    title:    'BIM Portal',
    desc:     'Smart Construction Platform',
    url:      'https://gsenc.sharepoint.com/sites/SmartCon/',             // ← URL 교체
    iconType: 'svg',
    iconSrc:  null,
    icon:     'bim',
    accent:   '#7C3AED',
    iconBg:   'linear-gradient(145deg, #EDE9FE, #C4B5FD)',
    iconClr:  '#5B21B6',
  },
  {
    id: 4,
    title:    'DX Portal',
    desc:     'Digital Transformation Platform',
    url:      'https://gsenc.sharepoint.com/sites/xicnadx',               // ← URL 교체
    iconType: 'svg',
    iconSrc:  null,
    icon:     'dx',
    accent:   '#D97706',
    iconBg:   'linear-gradient(145deg, #FEF3C7, #FCD34D)',
    iconClr:  '#92400E',
  },
];


/* =================================================================
 * [2] SVG 아이콘  ( {{C}} → iconClr 로 자동 치환 )
 * ================================================================= */
var ICONS = {

  /* 안전보건 — 방패 + 체크마크 */
  safe: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<path d="M24 4L7 11.5V24C7 34.6 14.8 43.6 24 47C33.2 43.6 41 34.6 41 24V11.5L24 4Z" fill="{{C}}" opacity="0.22"/>'
    + '<path d="M24 8L11 14.5V24C11 32.4 16.8 40 24 43C31.2 40 37 32.4 37 24V14.5L24 8Z" fill="{{C}}" opacity="0.10"/>'
    + '<path d="M24 4L7 11.5V24C7 34.6 14.8 43.6 24 47C33.2 43.6 41 34.6 41 24V11.5L24 4Z" stroke="{{C}}" stroke-width="2.6" stroke-linejoin="round" fill="none"/>'
    + '<path d="M14 24.5L21 31.5L34.5 18" stroke="{{C}}" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>'
    + '</svg>',

  /* 공무 — 도시 스카이라인 */
  project: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<rect x="5" y="20" width="18" height="24" rx="1.5" fill="{{C}}" opacity="0.18"/>'
    + '<rect x="5" y="20" width="18" height="24" rx="1.5" stroke="{{C}}" stroke-width="2.2"/>'
    + '<rect x="25" y="12" width="18" height="32" rx="1.5" fill="{{C}}" opacity="0.14"/>'
    + '<rect x="25" y="12" width="18" height="32" rx="1.5" stroke="{{C}}" stroke-width="2.2"/>'
    + '<rect x="9"  y="25" width="4.5" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="16" y="25" width="4.5" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="9"  y="33" width="4.5" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="16" y="33" width="4.5" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="29" y="17" width="4" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="36" y="17" width="4" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="29" y="25" width="4" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="36" y="25" width="4" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="29" y="33" width="4" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<rect x="36" y="33" width="4" height="4" rx=".8" fill="{{C}}" opacity="0.7"/>'
    + '<path d="M2 44H46" stroke="{{C}}" stroke-width="2.8" stroke-linecap="round"/>'
    + '</svg>',

  /* BIM Portal — 아이소메트릭 3D 큐브 */
  bim: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<polygon points="24,4 42,14 24,24 6,14" fill="{{C}}" opacity="0.30"/>'
    + '<polygon points="24,4 42,14 24,24 6,14" stroke="{{C}}" stroke-width="2" stroke-linejoin="round" fill="none"/>'
    + '<polygon points="42,14 42,32 24,42 24,24" fill="{{C}}" opacity="0.45"/>'
    + '<polygon points="42,14 42,32 24,42 24,24" stroke="{{C}}" stroke-width="2" stroke-linejoin="round" fill="none"/>'
    + '<polygon points="6,14 24,24 24,42 6,32" fill="{{C}}" opacity="0.18"/>'
    + '<polygon points="6,14 24,24 24,42 6,32" stroke="{{C}}" stroke-width="2" stroke-linejoin="round" fill="none"/>'
    + '<line x1="24" y1="24" x2="24" y2="42" stroke="{{C}}" stroke-width="2.2" stroke-linecap="round"/>'
    + '<line x1="15" y1="19" x2="33" y2="9" stroke="{{C}}" stroke-width="1" stroke-linecap="round" opacity="0.45"/>'
    + '<line x1="33" y1="19" x2="33" y2="37" stroke="{{C}}" stroke-width="1" stroke-linecap="round" opacity="0.45"/>'
    + '</svg>',

  /* DX Portal — 번개 볼트 */
  dx: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<circle cx="24" cy="24" r="19" fill="{{C}}" opacity="0.12"/>'
    + '<circle cx="24" cy="24" r="19" stroke="{{C}}" stroke-width="1.8" opacity="0.35" stroke-dasharray="3 3"/>'
    + '<path d="M29 6L13 27H23.5L20 42L35 21H24.5L29 6Z" fill="{{C}}" opacity="0.30"/>'
    + '<path d="M29 6L13 27H23.5L20 42L35 21H24.5L29 6Z" stroke="{{C}}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
    + '</svg>',
};


/* =================================================================
 * [3] URL 이동 방식 (외부 브라우저 / 앱으로 전환)
 * ================================================================= */
function openUrl(url) {
  if (!url || url.trim() === '' || url === '#') {
    console.warn('[Portal] URL이 설정되지 않았습니다:', url);
    return;
  }
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (err) {
    console.error('[Portal] 페이지 이동 실패:', err);
    window.location.href = url;
  }
}

/* SharePoint 앱 다운로드 — iOS: App Store / Android: Play Store */
function openSharePointDownload() {
  var ua = navigator.userAgent || '';
  var isIOS     = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  var isAndroid = /Android/.test(ua);
  var url;
  if (isIOS) {
    url = 'https://apps.apple.com/app/microsoft-sharepoint/id1091505266';
  } else if (isAndroid) {
    url = 'https://play.google.com/store/apps/details?id=com.microsoft.sharepoint';
  } else {
    url = 'https://www.microsoft.com/ko-kr/microsoft-365/sharepoint/collaboration';
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}


/* =================================================================
 * [4] 카드 HTML 빌더  (data-url 속성 — CSP 호환)
 * ================================================================= */
function buildCard(item) {
  var iconHtml = (item.iconType === 'image' && item.iconSrc)
    ? '<img src="' + item.iconSrc + '" alt="' + item.title + ' 아이콘" loading="lazy">'
    : (ICONS[item.icon] || '').replace(/\{\{C\}\}/g, item.iconClr);

  return '<div class="card"'
    + ' data-url="' + item.url + '"'
    + ' style="--accent:' + item.accent + ';"'
    + ' role="listitem"'
    + ' tabindex="0"'
    + ' aria-label="' + item.title + ' – ' + item.desc + ' 바로가기">'
    + '<div class="icon-box" style="background:' + item.iconBg + ';">'
    + iconHtml
    + '</div>'
    + '<div class="card-title">' + item.title + '</div>'
    + '<div class="card-desc">' + item.desc + '</div>'
    + '</div>';
}


/* =================================================================
 * [5] 초기화
 * ================================================================= */
function init() {
  /* SharePoint 다운로드 버튼 */
  var spBtn = document.getElementById('spDownloadBtn');
  if (spBtn) spBtn.addEventListener('click', openSharePointDownload);

  /* 카드 렌더링 */
  var grid = document.getElementById('grid');
  if (!grid) return;
  grid.innerHTML = APP_DATA.map(buildCard).join('');

  /* 이벤트 위임: 클릭 */
  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card[data-url]');
    if (card) openUrl(card.dataset.url);
  });

  /* 이벤트 위임: 키보드 */
  grid.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.card[data-url]');
    if (card) { e.preventDefault(); openUrl(card.dataset.url); }
  });
}

document.addEventListener('DOMContentLoaded', init);
