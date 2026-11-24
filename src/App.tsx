import React, { useState } from 'react';

const HIERARCHICAL_CATEGORIES = [
  {
    name: '계절 상품',
    subcategories: ['매트류', '난로류']
  },
  {
    name: '의류',
    subcategories: ['남성 의류', '여성 의류']
  },
  {
    name: '패션 잡화',
    subcategories: []
  }
];

const AVAILABLE_COUPONS = [
  { id: 'none', name: '쿠폰 미적용', discount: 0 },
  { id: 'welcome', name: '웰컴 4,000원 할인 쿠폰', discount: 4000 },
  { id: 'winter', name: '겨울 시즌 10% 할인 쿠폰', discount: 0, percent: 0.1 },
  { id: 'vip', name: 'VIP 전용 5,000원 할인 쿠폰', discount: 5000 }
];

const BEST_PRODUCTS = [
  {
    id: 1,
    name: '여자 눈꽃 노르딕 니트 집업 카디건',
    price: '39,900원',
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1434389677669-e0884cac3105?auto=format&fit=crop&w=800&q=80',
    tag: 'BEST 1',
    desc: '겨울철 필수템, 도톰하고 포근한 카디건'
  },
  {
    id: 2,
    name: '여성 경량패딩 노카라 브이넥 퀼팅 누빔 자켓',
    price: '39,900원',
    discount: '33%',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    tag: 'HOT 2',
    desc: '가볍고 따뜻한 레이어드용 경량 패딩'
  },
  {
    id: 3,
    name: '여성 겨울 뽀글이 양털 쁘띠 목도리 덤블 퍼 고리 숏 머플러',
    price: '27,900원',
    discount: '7%',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    tag: 'MD PICK',
    desc: '목을 포근하게 감싸주는 데일리 숏 머플러'
  },
  {
    id: 4,
    name: '디큐브 레트로 미니 온풍기 저소음 탁상용 PTC 전기 히터',
    price: '64,900원',
    discount: '17%',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    tag: 'LIMITED',
    desc: '감성적인 디자인의 사무실/책상용 미니 온풍기'
  }
];

const EXTENDED_PRODUCTS = [
  { id: 101, name: '여자 눈꽃 노르딕 니트 집업 겨울 도툼한 카라 자카드 가디건 크리스마스', price: '39,900원', discount: '20%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1434389677669-e0884cac3105?auto=format&fit=crop&w=500&q=80', tag: '인기' },
  { id: 102, name: '여성 겨울 크롭 자켓 카라 빅버튼 포켓 숏 블루종 아우터', price: '35,900원', discount: '28%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80', tag: '신상' },
  { id: 103, name: '여성 경량패딩 노카라 브이넥 퀼팅 누빔 자켓 이너 점퍼', price: '39,900원', discount: '33%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=500&q=80', tag: 'MD추천' },
  { id: 104, name: '여자 겨울 벨티드 하프코트 하이넥 스트랩 숏코트', price: '64,900원', discount: '16%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=500&q=80', tag: '베스트' },
  { id: 105, name: '남자 기본 무지 반팔티 흰색 검정 여름 면 라운드 이너 남성 티셔츠', price: '14,900원', discount: '25%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80', tag: '기본템' },
  { id: 106, name: '남녀공용 빅사이즈 스트릿 루즈핏 반팔티 등판 프린팅 캐주얼', price: '19,900원', discount: '33%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80', tag: '캐주얼' },
  { id: 107, name: '남자 기모 후드 점퍼 똑딱이 스냅 버튼 오버핏 겨울 아우터 자켓', price: '35,900원', discount: '40%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=80', tag: '인기' },
  { id: 108, name: '남자 카라 반집업 니트 골지 하프집업 긴팔 빅사이즈 가을 겨울', price: '32,900원', discount: '34%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=500&q=80', tag: '추천' },
  { id: 109, name: '남녀공용 루즈핏 등프린팅 기모 후드티 커플 데일리 캐주얼', price: '29,900원', discount: '40%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80', tag: '커플템' },
  { id: 110, name: '남자 카라 버튼 니트 가을 겨울 긴팔 단추 스웨터 클린핏', price: '34,900원', discount: '12%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?auto=format&fit=crop&w=500&q=80', tag: '깔끔' },
  { id: 111, name: '남자 후드 조끼 겨울 기모 오버핏 레이어드 플리스 베스트 캐주얼', price: '38,900원', discount: '35%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80', tag: '레이어드' },
  { id: 112, name: '남자 겨울 방한 바지 기모 퀼팅 조거팬츠 방풍 밴딩 작업복', price: '25,900원', discount: '13%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=80', tag: '방한' },
  { id: 113, name: '남자 코듀로이 팬츠 겨울 기모 골덴 와이드 일자 밴딩 바지 트레이닝', price: '25,900원', discount: '13%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80', tag: '편안함' },
  { id: 114, name: '로카 ROKA 후리스 집업 겨울 기모 플리스 자켓 남자 여자 커플 뽀글', price: '39,900원', discount: '20%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=500&q=80', tag: '인기' },
  { id: 115, name: '여성 노카라 집업 자켓 스웨이드 숏 크롭 블루종 데일리 아우터', price: '39,800원', discount: '20%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1525450824786-227cbef70703?auto=format&fit=crop&w=500&q=80', tag: '신상' },
  { id: 116, name: '여성 투웨이 배색 크롭 후드집업 벌룬 소매 숏 트레이닝 자켓', price: '29,800원', discount: '40%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80', tag: '특가' },
  { id: 117, name: '여자 겨울 기모 야구점퍼 오버핏 배색 무지 바시티 자켓', price: '45,900원', discount: '23%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=500&q=80', tag: '스타일' },
  { id: 118, name: '남성 아메카지 배색 카라 워크자켓 빈티지 데님 초어 점퍼 블루종', price: '59,900원', discount: '33%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80', tag: '아메카지' },
  { id: 119, name: '남녀공용 겨울 크리스마스 체크 목도리 두툼한 빅사이즈 숄 머플러', price: '29,900원', discount: '40%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=500&q=80', tag: '선물추천' },
  { id: 120, name: '여성 겨울 뽀글이 양털 쁘띠 목도리 덤블 퍼 고리 숏 머플러', price: '27,900원', discount: '7%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80', tag: 'MD추천' },
  { id: 121, name: '여성 겨울 뽀글이 니트 바라클라바 후드 목도리 방한 넥워머 모자', price: '35,900원', discount: '10%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=500&q=80', tag: '방한템' },
  { id: 122, name: '여성 겨울 니트 바라클라바 후드 목도리 방한 넥워머 털모자', price: '34,900원', discount: '30%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?auto=format&fit=crop&w=500&q=80', tag: '인기' },
  { id: 123, name: '남녀공용 다이아 퀼팅 경량 다운 패딩 점퍼 커플 겨울 자켓', price: '45,900원', discount: '34%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=500&q=80', tag: '경량패딩' },
  { id: 124, name: '플라워 극세사 수면 잠옷 세트 겨울 여성 남성 커플 홈웨어 파자마', price: '39,900원', discount: '20%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1580910051064-3eb6cd22f0b7?auto=format&fit=crop&w=500&q=80', tag: '홈웨어' },
  { id: 125, name: '디큐브 레트로 미니 온풍기 저소음 탁상용 PTC 전기 히터 감성 오브제', price: '64,900원', discount: '17%', category: '난로류', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80', tag: '시즌특가' },
  { id: 126, name: '국산 카본 탄소 전기매트 온열 침대 전기요 겨울 물세탁 알러지케어', price: '99,000원', discount: '23%', category: '매트류', image: 'https://images.unsplash.com/photo-1634674745139-98c645b222b7?auto=format&fit=crop&w=500&q=80', tag: '국산' },
  { id: 127, name: '따뜻한 국산 전기요 열선 절전형 전기매트 소형대', price: '54,900원', discount: '21%', category: '매트류', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80', tag: '절전형' },
  { id: 128, name: '메드롤 극세사 방석 등받이 사무실 의자 전기방석 장판 온도조절', price: '69,000원', discount: '30%', category: '매트류', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80', tag: '2인용' },
  { id: 129, name: '스마트센서 PTC 온풍기 무소음 전기히터 욕실히터 전기난로', price: '79,000원', discount: '33%', category: '난로류', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=500&q=80', tag: '스마트' },
  { id: 130, name: '한솔라이프 국산 탄소 전기매트 전기료절감무자계 워셔블매트', price: '99,000원', discount: '28%', category: '매트류', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80', tag: '워셔블' },
  { id: 131, name: '겨울 침대 EMF인증 KC인증 국산 탄소매트 전기매트카본 온열매트', price: '99,000원', discount: '23%', category: '매트류', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=80', tag: '안전인증' },
  { id: 132, name: '크로스백 백팩 메신저백 슬링백 캐주얼 데일리 숄더백', price: '24,900원', discount: '37%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80', tag: '데일리' },
  { id: 133, name: '남자 코듀로이 팬츠 기모 트레이닝팬츠 밴딩바지 겨울', price: '25,900원', discount: '13%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80', tag: '인기' },
  { id: 134, name: '[95~110]미드브레이커 바람막이 아노락 우비티 점퍼 자켓', price: '29,900원', discount: '25%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80', tag: '아노락' },
  { id: 135, name: '[250~280]남성 캐주얼 하이탑 스니커즈 워커 패션 레더화 트렌', price: '29,900원', discount: '40%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', tag: '특가' },
  { id: 136, name: '[250~280]남성 캐주얼 패션 모던 스니커즈 데일리 출근룩 데이트룩', price: '29,900원', discount: '0%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80', tag: '모던' },
  { id: 137, name: '[250~280] 러닝화 남성 데일리 조깅 운동화', price: '25,900원', discount: '35%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', tag: '러닝화' },
  { id: 138, name: '[95~105]남성 스웨이드 점퍼자켓 밀리터리 스타일 아우터', price: '45,900원', discount: '8%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80', tag: '밀리터리' },
  { id: 139, name: '[95~105]빈티지 스타디움 스웨이드자켓 남성 오버핏 점퍼', price: '45,900원', discount: '23%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=500&q=80', tag: '빈티지' },
  { id: 140, name: '[95~105]남성 스웨이드자켓 가을 간절기 데일리 아우터', price: '49,900원', discount: '16%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80', tag: '간절기' },
  { id: 141, name: '크롭 스웨이드 자켓 빈티지 셔링 블루종 아우터 집업 여친 여성', price: '39,900원', discount: '20%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1525450824786-227cbef70703?auto=format&fit=crop&w=500&q=80', tag: '여친룩' },
  { id: 142, name: '크롭 스웨이드 자켓 여친 아우터 양면 여성 알파카배색 점퍼 겨울 점퍼', price: '49,900원', discount: '28%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=500&q=80', tag: '양면' },
  { id: 143, name: '[M~4XL]빅사이즈 오버핏 남여공용 가을 맨투맨 특양면 티셔츠 데일', price: '25,900원', discount: '35%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80', tag: '빅사이즈' },
  { id: 144, name: '[XL~4XL]양털밍크 집업 오버핏 남여공용 겨울 방한 후드 기모', price: '22,900원', discount: '30%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=80', tag: '양털밍크' },
  { id: 145, name: '[2XL~5XL]오버핏 기모 후드집업 아우터 무지 남녀공용 스몰 심플', price: '19,900원', discount: '33%', category: '남성 의류', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=500&q=80', tag: '가성비' },
  { id: 146, name: '목워머터틀넥목도리', price: '20,000원', discount: '19%', category: '패션 잡화', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=500&q=80', tag: '따뜻함' },
  { id: 147, name: '양털플리스뽀글이조끼', price: '29,900원', discount: '14%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1434389677669-e0884cac3105?auto=format&fit=crop&w=500&q=80', tag: '뽀글이' },
  { id: 148, name: '퍼스널니트가디건', price: '39,900원', discount: '7%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?auto=format&fit=crop&w=500&q=80', tag: '데일리' },
  { id: 149, name: '소프트벨 여성 A라인롱니트스커트', price: '39,900원', discount: '11%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80', tag: '롱스커트' },
  { id: 150, name: '여성 후드레더자켓 박시핏 페이크레더 항공점퍼', price: '45,900원', discount: '8%', category: '여성 의류', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80', tag: '레더자켓' }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [cartItems, setCartItems] = useState([
    { id: 101, name: '여자 눈꽃 노르딕 니트 집업 겨울 도툼한 카라 자카드 가디건 크리스마스', price: 39900, quantity: 1, image: 'https://images.unsplash.com/photo-1434389677669-e0884cac3105?auto=format&fit=crop&w=500&q=80' }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState('welcome');

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BEST_PRODUCTS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BEST_PRODUCTS.length) % BEST_PRODUCTS.length);

  const filteredProducts = activeCategory === '전체'
    ? EXTENDED_PRODUCTS
    : EXTENDED_PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (product: any) => {
    const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ''));
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: numericPrice, quantity: 1, image: product.image }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const rawTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = rawTotal > 0 && rawTotal < 50000 ? 3000 : 0;
  
  const selectedCoupon = AVAILABLE_COUPONS.find(c => c.id === selectedCouponId) || AVAILABLE_COUPONS[0];
  let discountAmount = 0;
  if (selectedCoupon.percent) {
    discountAmount = rawTotal * selectedCoupon.percent;
  } else {
    discountAmount = Math.min(selectedCoupon.discount, rawTotal);
  }

  const finalTotal = Math.max(0, rawTotal - discountAmount) + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-6 font-sans text-gray-900">
      <header className="w-full max-w-md bg-white border-b sticky top-0 z-50 px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-900 to-indigo-805 bg-clip-text text-transparent">
            우들몰
          </h1>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl p-1 shadow-2xs">
              <button aria-label="검색" className="p-2 text-gray-700 hover:text-purple-950 transition-colors font-bold text-sm">
                검색
              </button>
            </div>
            <button 
              aria-label="장바구니"
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gray-50 border border-gray-200 rounded-2xl p-2.5 text-gray-700 hover:text-purple-950 transition-colors flex items-center font-bold text-sm shadow-2xs"
            >
              장바구니
              {cartItems.length > 0 && (
                <span className="ml-1.5 bg-purple-950 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav aria-label="메인 네비게이션" className="flex items-center justify-between pt-2 border-t text-sm font-semibold text-gray-700 relative">
          <button 
            onClick={() => setActiveCategory('전체')}
            className={`pb-1 px-2 border-b-2 transition-all ${activeCategory === '전체' ? 'text-purple-950 font-bold border-purple-950' : 'border-transparent'}`}
          >
            홈
          </button>
          
          <div 
            className="relative py-1 group px-2"
            onMouseEnter={() => setIsCategoryHovered(true)}
            onMouseLeave={() => setIsCategoryHovered(false)}
          >
            <button className="flex items-center gap-1 hover:text-purple-950 transition-colors py-1 font-semibold">
              카테고리 ∨
            </button>

            {isCategoryHovered && (
              <div 
                aria-label="카테고리 메뉴"
                className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-100 rounded-2xl py-2 z-50 grid grid-cols-1 divide-y divide-gray-100 animate-in fade-in duration-100 left-[-50px]"
                style={{ paddingTop: '8px' }}
              >
                {HIERARCHICAL_CATEGORIES.map((category) => (
                  <div key={category.name} className="py-2.5 px-4 hover:bg-purple-50/60 transition-colors">
                    <button
                      onClick={() => {
                        if (category.subcategories.length === 0) {
                          setActiveCategory(category.name);
                          setIsCategoryHovered(false);
                        }
                      }}
                      className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5 w-full text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                      {category.name}
                    </button>
                    {category.subcategories.length > 0 && (
                      <div className="pl-4 flex flex-col gap-1 border-l border-gray-200 ml-1 mt-1">
                        {category.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setActiveCategory(sub);
                              setIsCategoryHovered(false);
                            }}
                            className="text-xs text-gray-600 hover:text-purple-900 hover:font-bold text-left py-1 transition-all"
                          >
                            • {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => alert("마이페이지로 이동합니다.")}
            className="pb-1 px-2 transition-colors hover:text-purple-950 font-semibold"
          >
            마이페이지
          </button>

          <button 
            onClick={() => setSelectedCouponId('welcome')}
            className={`pb-1 px-2 transition-colors font-bold ${selectedCouponId === 'welcome' ? 'text-purple-950 border-b-2 border-purple-950' : 'text-gray-700'}`}
          >
            쿠폰
          </button>
        </nav>
      </header>

      <main className="w-full max-w-md flex-1 bg-white">
        <section className="relative w-full bg-white overflow-hidden pt-4 pb-6 min-h-[500px] border-b">
          <div className="px-4 mb-2 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
              인기 급상승 상품
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {currentSlide + 1} / {BEST_PRODUCTS.length}
            </span>
          </div>

          <div className="relative px-4 overflow-hidden w-full max-w-md mx-auto">
            <div 
              className="flex transition-transform duration-500 ease-out w-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {BEST_PRODUCTS.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-1 box-border">
                  <div className="bg-gray-50 rounded-3xl p-5 shadow-xs border border-gray-100 relative">
                    <span className="absolute top-6 left-6 z-10 bg-purple-950 text-white text-[11px] px-3 py-1 rounded-full font-bold shadow-md">
                      {product.tag}
                    </span>
                    
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4 shadow-sm">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-base font-bold text-gray-900 line-clamp-1">{product.name}</h2>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.desc}</p>
                      
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-red-500 font-black text-xl">{product.discount}</span>
                        <span className="text-2xl font-black text-gray-900">{product.price}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-4">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full py-3 rounded-2xl border-2 border-purple-950 text-purple-950 font-bold text-sm hover:bg-purple-50 active:scale-95 transition-all shadow-xs"
                        >
                          담기
                        </button>
                        <button 
                          onClick={() => { addToCart(product); setIsCartOpen(true); }}
                          className="w-full py-3 rounded-2xl bg-purple-950 text-white font-bold text-sm hover:bg-purple-900 active:scale-95 transition-all shadow-md"
                        >
                          구매하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={prevSlide}
              aria-label="이전 상품"
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-800 hover:bg-white transition-all z-20 font-bold border border-gray-200"
            >
              ◀
            </button>
            <button 
              onClick={nextSlide}
              aria-label="다음 상품"
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-800 hover:bg-white transition-all z-20 font-bold border border-gray-200"
            >
              ▶
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {BEST_PRODUCTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`상품 ${index + 1}로 이동`}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-purple-950' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white px-5 py-3 rounded-2xl shadow-lg relative overflow-hidden flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/30 border border-purple-400/30 text-purple-200 p-2 rounded-xl font-bold">
                쿠폰
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black uppercase">이벤트</span>
                  <p className="text-sm font-black tracking-tight">전 고객 4,000원 할인 쿠폰</p>
                </div>
                <p className="text-purple-200 text-[11px] mt-0.5">회원가입 즉시 사용 가능</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedCouponId('welcome')}
              className="bg-white text-purple-950 text-xs px-4 py-2 rounded-xl font-black shadow-md hover:bg-purple-50 active:scale-95 transition-all whitespace-nowrap ml-2"
            >
              받기
            </button>
          </div>
        </section>

        <div className="sticky top-[120px] bg-white/95 backdrop-blur-md z-40 px-4 py-3 border-y border-gray-100 flex gap-2 overflow-x-auto scrollbar-none shadow-xs">
          {['전체', '매트류', '난로류', '남성 의류', '여성 의류', '패션 잡화'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === category
                  ? 'bg-purple-950 text-white shadow-xs scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-gray-900">전체상품</h3>
              <p className="text-[11px] text-gray-500">우들몰 베스트 인기 아이템 모음</p>
            </div>
            <span className="text-xs font-bold text-purple-950 bg-purple-50 px-2.5 py-1 rounded-full">
              총 {filteredProducts.length}개
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col">
                <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden m-2 mb-2">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-1.5 left-1.5 bg-purple-950/90 text-white text-[9px] px-2 py-0.5 rounded-md font-bold shadow-2xs">
                    {product.tag}
                  </span>
                </div>
                <div className="px-3 pb-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-2 leading-snug">{product.name}</h4>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-red-500 font-extrabold text-[11px]">{product.discount}</span>
                      <span className="font-extrabold text-gray-950 text-xs">{product.price}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="text-[11px] bg-gray-100 hover:bg-purple-950 hover:text-white text-gray-700 font-bold px-2.5 py-1.5 rounded-lg transition-colors shadow-2xs"
                    >
                      담기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-base font-black text-gray-900 flex items-center gap-1.5">
                장바구니
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors font-bold"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-gray-400 space-y-2">
                  <p className="text-sm font-bold">장바구니가 비어있습니다.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-white shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-black text-purple-950 mt-0.5">{(item.price * item.quantity).toLocaleString()}원</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shrink-0">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors ml-auto text-xs font-bold"
                          title="삭제"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t bg-white space-y-4 shadow-lg shrink-0">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>쿠폰 적용</span>
                    <span className="text-[10px] text-purple-900 font-normal">적용 시 금액 자동 변경</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCouponId}
                      onChange={(e) => setSelectedCouponId(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-950 appearance-none"
                    >
                      {AVAILABLE_COUPONS.map(coupon => (
                        <option key={coupon.id} value={coupon.id}>
                          {coupon.name} {coupon.discount > 0 ? `(-${coupon.discount.toLocaleString()}원)` : coupon.percent ? `(-${(rawTotal * coupon.percent).toLocaleString()}원)` : ''}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs font-bold">∨</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs pt-1">
                  <div className="flex justify-between text-gray-600">
                    <span>상품 금액</span>
                    <span className="font-semibold text-gray-900">{rawTotal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>할인 금액</span>
                    <span className="font-bold">-{discountAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-gray-600 border-b pb-1">
                    <span>배송비</span>
                    <span className="font-semibold text-gray-900">{shippingFee.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-gray-950 pt-1">
                    <span>결제 예정 금액</span>
                    <span className="text-base text-purple-950">{finalTotal.toLocaleString()}원</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`${finalTotal.toLocaleString()}원이 결제되었습니다.`)}
                  className="w-full py-3.5 rounded-2xl bg-purple-950 text-white font-black text-sm shadow-lg hover:bg-purple-900 active:scale-95 transition-all"
                >
                  {finalTotal.toLocaleString()}원 결제하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
