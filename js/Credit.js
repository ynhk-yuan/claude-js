// 크레딧노트 홈 - 반복되는 카드 목록을 데이터로부터 그립니다.

// 메뉴 토글
const menuToggle = document.getElementById('menu-toggle');
const menuPopup = document.getElementById('menu-popup');

if (menuToggle && menuPopup) {
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    menuToggle.classList.toggle('active');
    menuPopup.classList.toggle('active');
  });

  // 메뉴 아이템 클릭 시 팝업 닫기
  menuPopup.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      menuToggle.classList.remove('active');
      menuPopup.classList.remove('active');
    });
  });

  // 외부 클릭 시 팝업 닫기
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !menuPopup.contains(e.target)) {
      menuToggle.classList.remove('active');
      menuPopup.classList.remove('active');
    }
  });
}

// 스코어 탭 메뉴
const scoreData = {
  loan: { score: 750, label: '대출 신용점수' },
  card: { score: 820, label: '카드 신용점수' },
  delinquent: { score: 680, label: '연체 신용점수' },
};

const scoreTabs = document.querySelectorAll('.score-tab');
const scoreValue = document.getElementById('score-value');
const scoreInfo = document.getElementById('score-info');

scoreTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const type = tab.dataset.type;
    const data = scoreData[type];

    // 활성 탭 업데이트
    scoreTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 스코어 값 업데이트
    scoreValue.textContent = data.score;
    scoreInfo.textContent = data.label;
  });
});

const hue = (h) => `oklch(0.62 0.13 ${h})`;

const guards = [
  { tag: '신용을 보호해주세요!', label: '내 신용조회차단', status: '해제 중' },
  { tag: '명의를 보호해주세요!', label: '내 명의도용차단', status: '해제 중' },
];

const services = [
  { name: '점수 올리기', color: hue(165) },
  { name: '연체방지', color: hue(200) },
  { name: '신용조회차단', color: hue(250) },
  { name: '명의도용차단', color: hue(250) },
  { name: '대출가능진단', color: hue(290), badge: 'N' },
  { name: '카드발급진단', color: hue(220) },
  { name: '보험혜택진단', color: hue(20) },
  { name: '이름어때', color: hue(165), badge: 'HOT' },
];

const benefits = [
  { kicker: '개인/커플/사업자/집주인', title: '내 신용을 제출할때\n신용보고서', bg: '#eff1f4', fg: '#1c1f1e' },
  { kicker: '#이름분석 #이름랭킹 #이름추천', title: '나와 똑같은 이름\n전국에 몇명?', bg: '#eff1f4', fg: '#1c1f1e' },
  { kicker: '신용점수 예측하기', title: '대출 신규로 받으면\n내 신용점수는?', bg: 'oklch(0.45 0.15 290)', fg: '#fff' },
  { kicker: '무료신용조회', title: '나의 신용점수\n무료로 조회해보세요', bg: '#eff1f4', fg: '#1c1f1e' },
  { kicker: '제휴 저축은행 신용대출', title: '내 대출한도가\n도착했습니다!', bg: 'oklch(0.96 0.02 30)', fg: '#1c1f1e' },
  { kicker: '맞춤채무 조정', title: '해결되지 않는 연체\n회생파산 무료 진단', bg: 'oklch(0.97 0.03 85)', fg: '#1c1f1e' },
];

const tiles = [
  { kicker: '맞춤형 카드상품', title: '내 신용에 맞는\n퍼스널카드 찾기!', bg: 'oklch(0.95 0.03 350)' },
  { kicker: '부동산 담보대출', title: '지금 가능한\n최대 한도는?', bg: 'oklch(0.95 0.03 195)' },
  { kicker: '맞춤 채무조정 솔루션', title: '채무나 연체\n있으신가요?', bg: 'oklch(0.95 0.03 250)' },
  { kicker: '맞춤형 대출상품', title: '내 신용점수로\n대출진단 받기', bg: 'oklch(0.95 0.03 290)' },
];

// 요소 생성 도우미: el('div', { className: 'x' }, child1, 'text', ...)
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  const { style, ...rest } = props;
  Object.assign(node, rest);
  if (style) Object.assign(node.style, style);
  node.append(...children);
  return node;
}

// 보호 카드: 오른쪽 배너 묶음(.stack) 앞에 넣습니다.
const guardSection = document.getElementById('guards');
const guardStack = guardSection.querySelector('.stack');
for (const g of guards) {
  guardSection.insertBefore(
    el('div', { className: 'card guard' },
      el('span', { className: 'tag', textContent: g.tag }),
      el('div', { className: 'label', textContent: g.label }),
      el('div', { className: 'status', textContent: `${g.status} ›` }),
      el('div', { className: 'spacer' }),
      el('div', { className: 'placeholder', textContent: 'icon' }),
    ),
    guardStack,
  );
}

// 서비스 아이콘
const serviceSection = document.getElementById('services');
for (const s of services) {
  const icon = el('span', { className: 'service-icon' },
    el('span', { className: 'glyph', style: { background: s.color } }),
  );
  if (s.badge) icon.append(el('span', { className: 'badge', textContent: s.badge }));
  serviceSection.append(el('a', { href: '#', className: 'service' }, icon, s.name));
}

// 혜택 정보
const benefitSection = document.getElementById('benefits');
for (const b of benefits) {
  benefitSection.append(
    el('a', { href: '#', className: 'card benefit', style: { background: b.bg, color: b.fg } },
      el('span', { className: 'kicker', textContent: b.kicker }),
      el('span', { className: 'title', textContent: b.title }),
      el('span', { className: 'spacer' }),
      el('span', { className: 'thumb' }),
    ),
  );
}

// 세상에 이런 혜택이
const tileSection = document.getElementById('tiles');
for (const t of tiles) {
  tileSection.append(
    el('a', { href: '#', className: 'card tile', style: { background: t.bg } },
      el('span', { className: 'circle' }),
      el('span', { className: 'kicker', textContent: t.kicker }),
      el('span', { className: 'title', textContent: t.title }),
    ),
  );
}

// 프로모 갤러리 슬라이드
const promoGallery = document.getElementById('promo');
if (promoGallery) {
  const gallerySlides = promoGallery.querySelectorAll('.gallery-slide');
  const galleryThumbs = promoGallery.querySelectorAll('.thumb');
  let currentSlide = 0;

  function showSlide(index) {
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    galleryThumbs.forEach(thumb => thumb.classList.remove('active'));

    gallerySlides[index].classList.add('active');
    galleryThumbs[index].classList.add('active');
    currentSlide = index;
  }

  galleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      showSlide(parseInt(thumb.dataset.index));
    });
  });
}

// 검색 모달
const searchIcon = document.querySelector('.search-icon');
const searchModal = document.getElementById('search-modal');
const searchClose = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');
const searchModalOverlay = document.querySelector('.search-modal-overlay');
const searchTags = document.querySelectorAll('.search-tag');

if (searchIcon && searchModal) {
  searchIcon.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
  });

  searchClose.addEventListener('click', () => {
    searchModal.classList.remove('active');
  });

  searchModalOverlay.addEventListener('click', () => {
    searchModal.classList.remove('active');
  });

  // 검색 태그 클릭
  searchTags.forEach(tag => {
    tag.addEventListener('click', () => {
      searchInput.value = tag.textContent;
      searchInput.focus();
    });
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      searchModal.classList.remove('active');
    }
  });
}
