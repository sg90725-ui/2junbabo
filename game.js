// 무한의 수학 계단: 바보 신이준 천재 만들기 (game.js)

const STAGES = [
  {
    level: 1,
    minIQ: 0,
    badge: 'Lv.1 동네 바보 신이준',
    name: '신이준',
    desc: '거지옷 입고 콧물 흘리는 빙구 (초1 과정)',
    emoji: '🤪',
    speech: '"헤헤... 침 흘리는 게 제일 쉬웠어요... 이 문제 풀면 IQ가 오르나요?"',
    evoMsg: '시작은 미약한 동네 바보지만 계단을 올라보자!'
  },
  {
    level: 2,
    minIQ: 60,
    badge: 'Lv.2 초1 탈출 어리바리 이준',
    name: '신이준',
    desc: '콧물은 닦고 러닝셔츠 입은 이준 (초2 과정)',
    emoji: '😮',
    speech: '"우와! 초2로 진급했어요! 이제 구구단과 두 자리 덧셈도 할 수 있어요!"',
    evoMsg: '초2 진급! 누더기 거지옷을 벗고 콧물을 닦았습니다!'
  },
  {
    level: 3,
    minIQ: 110,
    badge: 'Lv.3 초2 마스터 꾸러기 이준',
    name: '신이준',
    desc: '노란 모자와 단정한 줄무늬 티셔츠 (초3 과정)',
    emoji: '👦',
    speech: '"구구단을 마스터하니까 눈빛이 똘망똘망해졌어요! 초3 문제도 덤벼라!"',
    evoMsg: '초3 진급! 빙구 표정이 사라지고 깔끔한 초등학생이 되었습니다!'
  },
  {
    level: 4,
    minIQ: 160,
    badge: 'Lv.4 초3 학급 반장 이준',
    name: '신이준',
    desc: '단정한 조끼 교복과 반장 완장 (초4 과정)',
    emoji: '🫡',
    speech: '"차렷, 경례! 나눗셈까지 마스터한 반장 신이준입니다!"',
    evoMsg: '초4 진급! 멋진 니트 조끼를 입은 모범생 반장이 되었습니다!'
  },
  {
    level: 5,
    minIQ: 210,
    badge: 'Lv.5 초4 댄디 우등생 이준',
    name: '신이준',
    desc: '지적인 뿔테안경과 댄디 가디건 & 넥타이 (초5 과정)',
    emoji: '🤓',
    speech: '"흠, 각도와 큰 수의 연산쯤이야 가볍게 암산이 가능하군요."',
    evoMsg: '초5 진급! 뿔테안경과 가디건으로 지적인 매력이 폭발합니다!'
  },
  {
    level: 6,
    minIQ: 260,
    badge: 'Lv.6 초5 수학 영재 이준',
    name: '신이준',
    desc: '고급 수트 자켓과 포마드 헤어 (초6 과정)',
    emoji: '😎',
    speech: '"최소공배수와 혼합계산의 아름다움이 보이기 시작했습니다."',
    evoMsg: '초6 진급! 고급 자켓과 포마드 헤어를 한 영재 소년으로 변신!'
  },
  {
    level: 7,
    minIQ: 310,
    badge: 'Lv.MAX 천재 젠틀맨 신이준',
    name: '갓이준',
    desc: '황금 모노클·턱시도 정장의 세기의 천재',
    emoji: '🎩',
    speech: '"비와 비율까지 완벽하군. 나 신이준, 이제 우주의 수학 원리를 깨달았다."',
    evoMsg: '초6 수학 마스터! 완벽한 턱시도와 황금 모노클을 쓴 젠틀맨 천재 등극!!'
  }
];

// 상점 아이템 데이터 정의 (기능 아이템 + 신발/날개/오라 + 펫/무기/계단스킨)
const SHOP_SLOT_LABELS = {
  shoe: '👟 신발',
  wing: '🪽 날개',
  accessory: '👑 머리/오라',
  hand: '⚔️ 손 무기',
  pet: '🐉 동행 펫',
  stair: '🪜 계단 스킨'
};

const SHOP_ITEMS = {
  func: [
    {
      id: 'time_ext',
      name: '수학문제 시간 늘리기',
      icon: '⏱️',
      price: 5,
      desc: '수학문제를 풀 때 제한시간을 즉시 +30초 추가합니다.'
    },
    {
      id: 'math_hint',
      name: '수학문제 힌트보기',
      icon: '💡',
      price: 5,
      desc: '수학문제 핵심 풀이 힌트를 보여주고 오답 보기 2개를 제거해 줍니다.'
    },
    {
      id: 'slow_stamina',
      name: '슬로우 타이머 물약',
      icon: '🐢',
      price: 10,
      desc: '1분간 계단 오를 때 제한시간(게이지)이 절반 속도로 천천히 감소합니다.'
    },
    {
      id: 'double_coin',
      name: '황금 코인 자석 (추천)',
      icon: '🧲',
      price: 10,
      desc: '1분간 10계단마다 받는 코인이 2배(2코인)로 증가합니다!'
    },
    {
      id: 'direction_guide',
      name: '천재의 방향 나침반 (NEW)',
      icon: '🧭',
      price: 12,
      desc: '1분간 다음 계단에 [오르기]를 눌러야 할지 [방향전환]을 눌러야 할지 네온 가이드를 표시합니다!'
    },
    {
      id: 'rocket_boost',
      name: '초고속 로켓 부스터 (NEW)',
      icon: '🚀',
      price: 15,
      desc: '사용 즉시 방향 실수 걱정 없이 50계단을 초고속 로켓 점프로 단숨에 자동 돌파합니다!'
    },
    {
      id: 'fever_jackpot',
      name: '다이아 코인 잭팟 물약 (NEW)',
      icon: '💎',
      price: 15,
      desc: '구매 시 다음 등반 1분간 10계단마다 +3코인을 추가 획득하고, 수학 정답 시 +5코인을 보너스로 받습니다!'
    },
    {
      id: 'iq_booster',
      name: '천재의 두뇌 비타민 (추천)',
      icon: '🧪',
      price: 25,
      desc: '다음 수학문제를 맞힐 때 IQ가 10 대신 +20 상승합니다!'
    },
    {
      id: 'extra_life',
      name: '추가생명 아이템',
      icon: '❤️',
      price: 30,
      desc: '계단에서 떨어지거나 시간이 다 되어도 0계단으로 가지 않고 그 자리에서 즉시 부활합니다.'
    },
    {
      id: 'quiz_pass',
      name: '수학문제 만점 프리패스권 (NEW)',
      icon: '🎫',
      price: 35,
      desc: '어려운 수학 문제가 나왔을 때 누르면 계산 없이 즉시 정답 처리되어 IQ가 상승합니다!'
    },
    {
      id: 'einstein_capsule',
      name: '아인슈타인 각성 캡슐 (NEW)',
      icon: '🧠',
      price: 45,
      desc: '다음 수학문제를 맞힐 때 IQ가 한 번에 +30 폭발적으로 상승합니다! (초고속 진급용)'
    }
  ],
  cosmetic: [
    {
      id: 'shoe_wind',
      slot: 'shoe',
      name: '바람신발',
      icon: '🌪️',
      price: 50,
      desc: '날개 달린 에메랄드 신발! 계단을 오를 때마다 거대한 폭풍 회오리 기둥과 칼바람 충격파가 폭발합니다.'
    },
    {
      id: 'shoe_fire',
      slot: 'shoe',
      name: '불신발',
      icon: '🔥',
      price: 50,
      desc: '타오르는 마그마 신발! 계단을 밟을 때마다 치솟는 화염 불기둥과 불꽃 폭발 이펙트가 터져 나옵니다.'
    },
    {
      id: 'shoe_lightning',
      slot: 'shoe',
      name: '번개신발',
      icon: '⚡',
      price: 50,
      desc: '뇌신 볼트 신발! 계단을 오를 때마다 하늘에서 내리꽂히는 천둥 낙뢰와 전격 스파크가 작렬합니다.'
    },
    {
      id: 'shoe_ice',
      slot: 'shoe',
      name: '절대영도 얼음신발 (NEW)',
      icon: '❄️',
      price: 60,
      desc: '크리스탈 아이스 부츠! 계단을 밟을 때마다 빙하 얼음 기둥과 눈꽃 블리자드 결정이 화려하게 피어납니다.'
    },
    {
      id: 'shoe_galaxy',
      slot: 'shoe',
      name: '은하수 우주신발 (NEW)',
      icon: '🌌',
      price: 85,
      desc: '네뷸라 코스믹 스니커즈! 계단을 오를 때마다 보랏빛 은하 성운 소용돌이와 유성우가 쏟아집니다.'
    },
    {
      id: 'shoe_rainbow',
      slot: 'shoe',
      name: '무지개신발',
      icon: '🌈',
      price: 100,
      desc: '프리즘 스타 신발! 계단마다 찬란한 네온 무지개 아치와 별빛 분수가 솟구치며 영롱한 무지개 계단이 남습니다.'
    },
    {
      id: 'shoe_cyber',
      slot: 'shoe',
      name: '사이버 제트 부스터 (NEW)',
      icon: '🤖',
      price: 115,
      desc: '미래형 플라즈마 제트 부츠! 발밑에서 푸른 추진 화염과 사이버 홀로그램 레이저 링이 분사됩니다.'
    },
    {
      id: 'wing_gold',
      slot: 'wing',
      name: '천재의 황금 날개 (추천)',
      icon: '🪽',
      price: 80,
      desc: '등 뒤에 거대한 황금빛 천사 날개가 달려 계단을 오를 때마다 찬란한 황금 깃털과 빛무리 파동이 퍼집니다.'
    },
    {
      id: 'wing_demon',
      slot: 'wing',
      name: '심연의 드래곤 윙 (NEW)',
      icon: '🦇',
      price: 85,
      desc: '카리스마 넘치는 흑염 드래곤 날개! 계단을 오를 때마다 붉은 암흑 화염과 드래곤 오라가 뿜어져 나옵니다.'
    },
    {
      id: 'wing_cyber',
      slot: 'wing',
      name: '사이버 네온 메카 윙 (NEW)',
      icon: '🦋',
      price: 95,
      desc: '등 뒤에 펼쳐지는 미래형 홀로그램 에너지 날개! 계단을 오를 때마다 사이버 네온 입자와 레이저 파동이 퍼집니다.'
    },
    {
      id: 'wing_fairy',
      slot: 'wing',
      name: '프리즘 요정 나비 날개 (NEW)',
      icon: '🌸',
      price: 110,
      desc: '영롱하게 빛나는 크리스탈 요정 날개! 계단을 오를 때마다 핑크빛 벚꽃잎과 요정 별가루가 흩날립니다.'
    },
    {
      id: 'aura_visor',
      slot: 'accessory',
      name: '사이버 천재 스카우터 (NEW)',
      icon: '🥽',
      price: 65,
      desc: '눈 위에 장착하는 미래형 홀로그램 스카우터 고글! 실시간 디지털 타겟팅 링과 네온 레이저가 빛납니다.'
    },
    {
      id: 'aura_crown',
      slot: 'accessory',
      name: '초신성 네온 왕관 (추천)',
      icon: '👑',
      price: 120,
      desc: '보석이 박힌 초신성 왕관과 회전하는 별빛 궤도! 계단을 오를 때마다 초신성 빛기둥과 마법진 폭발이 펼쳐집니다.'
    },
    {
      id: 'aura_math_god',
      slot: 'accessory',
      name: '수학신의 황금 후광 (NEW)',
      icon: '🔮',
      price: 150,
      desc: '등 뒤와 머리 위에서 회전하는 고대 수학 공식(π, ∑, ∞, √) 황금 마법진! 매 스텝마다 신성한 황금 공식이 폭발합니다.'
    }
  ],
  special: [
    {
      id: 'hand_lollipop',
      slot: 'hand',
      name: '자이언트 무지개 막대사탕 (NEW)',
      icon: '🍭',
      price: 45,
      desc: '손에 거대하고 달콤한 회오리 무지개 막대사탕을 들고 신나게 계단을 오릅니다! 달콤한 사탕 별빛이 톡톡 튑니다.'
    },
    {
      id: 'hand_wand',
      slot: 'hand',
      name: '피타고라스 별빛 마법봉 (NEW)',
      icon: '🪄',
      price: 65,
      desc: '황금 별이 박힌 마법 지팡이를 흔들며 계단을 오를 때마다 오색찬란한 마법 별가루를 흩뿌립니다.'
    },
    {
      id: 'hand_sword',
      slot: 'hand',
      name: '엑스칼리버 계산기 광선검 (NEW)',
      icon: '⚔️',
      price: 80,
      desc: '푸른 플라즈마가 빛나는 전설의 공학계산기 광선검! 계단을 오를 때마다 날렵한 네온 검기 슬래시가 베어 나갑니다.'
    },
    {
      id: 'pet_owl',
      slot: 'pet',
      name: '천재 박사 부엉이 펫 (NEW)',
      icon: '🦉',
      price: 60,
      desc: '학사모를 쓴 귀여운 황금 부엉이가 이준이 옆을 졸졸 날아다니며 지혜의 황금 반짝이를 뿌려줍니다!'
    },
    {
      id: 'pet_ufo',
      slot: 'pet',
      name: '외계인 미니 UFO 펫 (NEW)',
      icon: '🛸',
      price: 85,
      desc: '초과학 민트빛 소형 UFO가 캐릭터 옆을 비행하며 무중력 트랙터 빔과 플라즈마 에너지 링을 쏩니다!'
    },
    {
      id: 'pet_dragon',
      slot: 'pet',
      name: '아기 골드 드래곤 펫 (추천)',
      icon: '🐉',
      price: 110,
      desc: '전설의 아기 황금용이 함께 날아오르며 계단을 밟을 때마다 귀여운 황금 브레스 불꽃을 뿜어줍니다!'
    },
    {
      id: 'stair_candy',
      slot: 'stair',
      name: '달콤 마카롱 캔디 계단 (NEW)',
      icon: '🍬',
      price: 55,
      desc: '모든 일반 계단이 알록달록한 딸기 마카롱과 민트 초코 캔디 계단으로 달콤하게 변신합니다!'
    },
    {
      id: 'stair_gold',
      slot: 'stair',
      name: '24K 순금 골드바 계단 (NEW)',
      icon: '🥇',
      price: 75,
      desc: '모든 일반 계단이 번쩍이는 24K 순금 골드바와 다이아몬드 장식 계단으로 럭셔리하게 변신합니다!'
    },
    {
      id: 'stair_neon',
      slot: 'stair',
      name: '사이버펑크 네온 계단 (NEW)',
      icon: '🎛️',
      price: 95,
      desc: '모든 일반 계단이 미래도시의 형광 사이버 네온사인과 홀로그램 그리드 보드로 화려하게 변신합니다!'
    }
  ]
};

// 사운드 & 무한의 계단 스타일 8비트 칩튠(Chiptune) BGM + 리얼 발소리 합성기
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.bgmPlaying = false;
    this.bgmMode = 'PLAY'; // 'PLAY' | 'QUIZ'
    this.bgmTimer = null;
    this.bgmStep = 0;
    this.noiseBuffer = null;
    this.footParity = 0;

    // 음계 주파수 (Hz)
    const N = {
      _: 0,
      C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
      C6: 1046.50, D6: 1174.66, E6: 1318.51
    };

    // 무한의 계단 스타일 경쾌한 8비트 리드 멜로디
    this.leadNotes = [
      N.C5, N._,  N.E5, N.G5, N.C6, N._,  N.G5, N.E5,
      N.A5, N._,  N.C6, N.A5, N.G5, N.E5, N.C5, N._,
      N.F5, N.A5, N.C6, N._,  N.E5, N.G5, N.C6, N._,
      N.D5, N.F5, N.A5, N.B5, N.C6, N._,  N.G5, N._
    ];

    // 통통 튀는 옥타브 베이스라인
    this.bassNotes = [
      N.C3, N.C4, N.C3, N.C4, N.C3, N.C4, N.C3, N.C4,
      N.A3, N.A4, N.A3, N.A4, N.E3, N.E4, N.G3, N.G4,
      N.F3, N.F4, N.F3, N.F4, N.C3, N.C4, N.E3, N.E4,
      N.D3, N.D4, N.G3, N.G4, N.C3, N.G3, N.C4, N._
    ];

    // 수학 시험 8비트 멜로디
    this.quizLeadNotes = [
      N.E5, N._,  N.B4, N.C5, N.D5, N._,  N.C5, N.B4,
      N.A4, N._,  N.A4, N.C5, N.E5, N._,  N.D5, N.C5
    ];
    this.quizBassNotes = [
      N.E3, N.E4, N.E3, N.E4, N.B3, N.B4, N.B3, N.B4,
      N.A3, N.A4, N.A3, N.A4, N.E3, N.B3, N.E4, N._
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        const bufferSize = this.ctx.sampleRate * 0.15;
        this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startBGM(mode = 'PLAY') {
    this.bgmMode = mode;
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;
    this.bgmStep = 0;
    this.bgmTimer = setInterval(() => this.tickBGM(), 105);
  }

  setBGMMode(mode) {
    this.bgmMode = mode;
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  play8BitDrum(isSnare = false) {
    if (!this.enabled || !this.ctx || !this.noiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = isSnare ? 'bandpass' : 'highpass';
    filter.frequency.setValueAtTime(isSnare ? 1200 : 5000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const dur = isSnare ? 0.06 : 0.022;
    gain.gain.setValueAtTime(isSnare ? 0.045 : 0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    src.start();
    src.stop(this.ctx.currentTime + dur);
  }

  tickBGM() {
    if (!this.enabled || !this.bgmPlaying) return;
    this.init();
    if (!this.ctx) return;

    if (this.bgmMode === 'QUIZ') {
      const idx = this.bgmStep % this.quizLeadNotes.length;
      const lead = this.quizLeadNotes[idx];
      const bass = this.quizBassNotes[idx];
      if (lead > 0) this.playTone(lead, 'square', 0.08, 0.038);
      if (bass > 0) this.playTone(bass, 'triangle', 0.085, 0.048);
      if (idx % 2 === 1) this.play8BitDrum(idx % 4 === 3);
    } else {
      const idx = this.bgmStep % this.leadNotes.length;
      const lead = this.leadNotes[idx];
      const bass = this.bassNotes[idx];
      if (lead > 0) this.playTone(lead, 'square', 0.08, 0.042);
      if (bass > 0) this.playTone(bass, 'triangle', 0.085, 0.055);
      if (idx % 4 === 2) {
        this.play8BitDrum(true);
      } else if (idx % 2 === 1) {
        this.play8BitDrum(false);
      }
    }
    this.bgmStep++;
  }

  playTone(freq, type, duration, vol = 0.15, slideFreq = null) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    if (slideFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideFreq, this.ctx.currentTime + duration);
    }

    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // 실제 계단을 밟는 듯한 경쾌하고 리얼한 발소리(Footstep) 합성
  step() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    this.footParity = 1 - this.footParity;
    const now = this.ctx.currentTime;

    // 1) 신발 밑창이 계단을 치는 묵직한 저음 어택 (Thud)
    const osc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    osc.type = 'triangle';
    const startFreq = this.footParity ? 145 : 130;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.055);

    thudGain.gain.setValueAtTime(0.28, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);

    // 2) 운동화/구두 마찰 노이즈 (Crisp Sole Scuff/Tap)
    if (this.noiseBuffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(this.footParity ? 1150 : 980, now);
      filter.Q.setValueAtTime(1.8, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      src.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      src.start(now);
      src.stop(now + 0.048);
    }
  }

  // 방향전환 시 발소리 + 날렵한 피벗 스우시(Pivot Swoosh) 효과음
  turn() {
    this.step();
    if (!this.enabled || !this.ctx || !this.noiseBuffer) return;

    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.075);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    src.start(now);
    src.stop(now + 0.082);
  }

  coin() {
    this.playTone(987.77, 'square', 0.07, 0.12);
    setTimeout(() => this.playTone(1318.51, 'square', 0.16, 0.14), 60);
  }

  buy() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 'triangle', 0.11, 0.16), idx * 55);
    });
  }

  quizPop() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 'square', 0.12, 0.14), idx * 65);
    });
  }

  evolve() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 'square', 0.16, 0.15), idx * 75);
    });
  }

  wrongContinue() {
    this.playTone(300, 'sawtooth', 0.14, 0.14, 220);
    setTimeout(() => this.playTone(240, 'sawtooth', 0.2, 0.14, 180), 130);
  }

  baboFail() {
    const notes = [392, 370, 349, 330, 261.6];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playTone(n, 'sawtooth', idx === 4 ? 0.55 : 0.16, 0.16, idx === 4 ? 130 : n * 0.96);
      }, idx * 160);
    });
  }

  tick() {
    this.playTone(880, 'square', 0.04, 0.07);
  }
}

const sfx = new SoundFX();

// IQ에 따른 초등학교 학년 계산 (IQ 50까지는 초1, 100까지는 초2, 150까지는 초3, 200까지는 초4, 250까지는 초5, 260 이상은 초6)
function getGradeForIQ(iq) {
  if (iq <= 50) return 1;
  if (iq <= 100) return 2;
  if (iq <= 150) return 3;
  if (iq <= 200) return 4;
  if (iq <= 250) return 5;
  return 6;
}

// IQ에 따른 신이준 외모 진화 단계 인덱스 (0 ~ 6)
function getStageIndexForIQ(iq) {
  if (iq <= 50) return 0;   // Lv.1 동네 바보 (IQ 0~50)
  if (iq <= 100) return 1;  // Lv.2 초1 탈출 (IQ 60~100)
  if (iq <= 150) return 2;  // Lv.3 초2 마스터 (IQ 110~150)
  if (iq <= 200) return 3;  // Lv.4 초3 학급 반장 (IQ 160~200)
  if (iq <= 250) return 4;  // Lv.5 초4 댄디 우등생 (IQ 210~250)
  if (iq <= 300) return 5;  // Lv.6 초5 수학 영재 (IQ 260~300)
  return 6;                 // Lv.MAX 천재 젠틀맨 (IQ 310+)
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// IQ 기반 초1 ~ 초6 수학 문제 생성기 (어려운 학년일수록 제한시간을 넉넉히 부여!)
function generateMathProblemByIQ(iq) {
  const grade = getGradeForIQ(iq);
  let question = '';
  let subHint = '';
  let detailedHint = '';
  let answer = 0;
  let timeLimit = 15;

  if (grade === 1) {
    // 초1 (IQ 0~50): 제한시간 15초
    timeLimit = 15;
    const type = randInt(1, 3);
    if (type === 1) {
      const a = randInt(3, 9);
      const b = randInt(4, 9);
      answer = a + b;
      question = `${a} + ${b} = ?`;
      subHint = '초1 기초 덧셈! 손가락을 써도 좋아요!';
      detailedHint = `💡 힌트: ${a}에서 시작해 ${b}만큼 더 세어보세요! (예: ${a} + ${b} = ${answer} 근처의 수)`;
    } else if (type === 2) {
      const a = randInt(11, 18);
      const b = randInt(3, 9);
      answer = a - b;
      question = `${a} - ${b} = ?`;
      subHint = '초1 기초 뺄셈! 침착하게 빼보세요!';
      detailedHint = `💡 힌트: ${b}에 얼마를 더하면 ${a}가 될지 거꾸로 생각해 보세요!`;
    } else {
      const a = randInt(4, 9);
      const b = randInt(3, 8);
      answer = a + b;
      question = `신이준이 사탕 ${a}개를 가지고 있었는데 엄마가 ${b}개를 더 주셨습니다. 모두 몇 개일까요?`;
      subHint = '초1 문장제 덧셈 문제입니다.';
      detailedHint = `💡 힌트: 원래 있던 ${a}개와 더 받은 ${b}개를 더하는 식(${a} + ${b})을 계산해 보세요!`;
    }
  } else if (grade === 2) {
    // 초2 (IQ 60~100): 제한시간 22초
    timeLimit = 22;
    const type = randInt(1, 3);
    if (type === 1) {
      const a = randInt(18, 59);
      const b = randInt(15, 39);
      answer = a + b;
      question = `${a} + ${b} = ?`;
      subHint = '초2 두 자리 수 덧셈 (받아올림 주의!)';
      detailedHint = `💡 힌트: 일의 자리끼리 더하면 ${(a % 10) + (b % 10)}이므로 끝자리가 ${(a + b) % 10}인 보기를 찾아보세요!`;
    } else if (type === 2) {
      const a = randInt(42, 95);
      const b = randInt(16, 38);
      answer = a - b;
      question = `${a} - ${b} = ?`;
      subHint = '초2 두 자리 수 뺄셈 (받아내림 주의!)';
      detailedHint = `💡 힌트: 정답의 끝자리(일의 자리) 숫자는 ${(a - b) % 10}입니다!`;
    } else {
      const a = randInt(3, 9);
      const b = randInt(4, 9);
      answer = a * b;
      question = `${a} × ${b} = ?`;
      subHint = '초2 곱셈구구(구구단) 문제!';
      detailedHint = `💡 힌트: ${a}단 구구단! ${a} × ${b - 1} = ${a * (b - 1)}에 ${a}를 더한 값입니다!`;
    }
  } else if (grade === 3) {
    // 초3 (IQ 110~150): 제한시간 30초
    timeLimit = 30;
    const type = randInt(1, 3);
    if (type === 1) {
      const a = randInt(12, 34);
      const b = randInt(3, 8);
      answer = a * b;
      question = `${a} × ${b} = ?`;
      subHint = '초3 두 자리 수 곱하기 한 자리 수!';
      detailedHint = `💡 힌트: (${Math.floor(a / 10) * 10} × ${b} = ${Math.floor(a / 10) * 10 * b})에 (${a % 10} × ${b} = ${(a % 10) * b})를 더해 보세요!`;
    } else if (type === 2) {
      const b = randInt(4, 9);
      const q = randInt(6, 12);
      const a = b * q;
      answer = q;
      question = `${a} ÷ ${b} = ?`;
      subHint = '초3 나눗셈 문제! 구구단을 거꾸로 생각해 보세요.';
      detailedHint = `💡 힌트: ${b}에 어떤 수를 곱해야 ${a}가 되는지 찾으면 됩니다!`;
    } else {
      const a = randInt(120, 450);
      const b = randInt(110, 380);
      answer = a + b;
      question = `${a} + ${b} = ?`;
      subHint = '초3 세 자리 수의 덧셈!';
      detailedHint = `💡 힌트: 백의 자리부터 어림하면 약 ${Math.floor(a / 100) * 100 + Math.floor(b / 100) * 100} 이상이고, 끝자리는 ${(a + b) % 10}입니다!`;
    }
  } else if (grade === 4) {
    // 초4 (IQ 160~200): 제한시간 40초
    timeLimit = 40;
    const type = randInt(1, 3);
    if (type === 1) {
      const a = randInt(11, 25);
      const b = randInt(11, 18);
      answer = a * b;
      question = `${a} × ${b} = ?`;
      subHint = '초4 (두 자리 수) × (두 자리 수) 곱셈!';
      detailedHint = `💡 힌트: ${a} × 10 = ${a * 10}이고, 여기에 ${a} × ${b - 10} = ${a * (b - 10)}을 더하면 됩니다!`;
    } else if (type === 2) {
      const b = randInt(11, 19);
      const q = randInt(5, 13);
      const a = b * q;
      answer = q;
      question = `${a} ÷ ${b} = ?`;
      subHint = '초4 두 자리 수의 나눗셈!';
      detailedHint = `💡 힌트: ${b} × 10 = ${b * 10}과 비교해 보고, 끝자리가 ${(a % 10)}이 나오는 몫을 찾아보세요!`;
    } else {
      const ang1 = randInt(40, 85);
      const ang2 = randInt(35, 65);
      answer = 180 - ang1 - ang2;
      question = `삼각형의 세 각 중 두 각이 ${ang1}°, ${ang2}°일 때 나머지 한 각은 몇 도(°)?`;
      subHint = '초4 도형: 삼각형 세 각의 크기의 합은 180°입니다!';
      detailedHint = `💡 힌트: 두 각의 합이 ${ang1 + ang2}°이므로, 180° - ${ang1 + ang2}°를 계산하세요!`;
    }
  } else if (grade === 5) {
    // 초5 (IQ 210~250): 제한시간 50초
    timeLimit = 50;
    const type = randInt(1, 3);
    if (type === 1) {
      const a = randInt(20, 45);
      const b = randInt(3, 8);
      const c = randInt(4, 7);
      const d = randInt(5, 19);
      answer = a + b * c - d;
      question = `${a} + ${b} × ${c} - ${d} = ?`;
      subHint = '초5 혼합계산: 곱셈을 먼저 계산해야 합니다!';
      detailedHint = `💡 힌트: 먼저 ${b} × ${c} = ${b * c}를 계산한 뒤, ${a} + ${b * c} - ${d}를 순서대로 계산하세요!`;
    } else if (type === 2) {
      const pairs = [
        { x: 6, y: 8, lcm: 24, gcd: 2 },
        { x: 8, y: 12, lcm: 24, gcd: 4 },
        { x: 12, y: 18, lcm: 36, gcd: 6 },
        { x: 9, y: 15, lcm: 45, gcd: 3 },
        { x: 14, y: 21, lcm: 42, gcd: 7 },
        { x: 16, y: 24, lcm: 48, gcd: 8 },
        { x: 10, y: 15, lcm: 30, gcd: 5 }
      ];
      const pick = pairs[randInt(0, pairs.length - 1)];
      if (Math.random() < 0.5) {
        answer = pick.lcm;
        question = `${pick.x}과(와) ${pick.y}의 최소공배수는 얼마일까요?`;
        subHint = '초5 약수와 배수: 공통인 배수 중 가장 작은 수!';
        detailedHint = `💡 힌트: 큰 수인 ${pick.y}의 배수(${pick.y}, ${pick.y * 2}, ${pick.y * 3}...) 중 ${pick.x}로 나누어떨어지는 가장 작은 수를 찾으세요!`;
      } else {
        answer = pick.gcd;
        question = `${pick.x}과(와) ${pick.y}의 최대공약수는 얼마일까요?`;
        subHint = '초5 약수와 배수: 공통인 약수 중 가장 큰 수!';
        detailedHint = `💡 힌트: ${pick.x}과 ${pick.y}을 동시에 나누어떨어지게 하는 가장 큰 수입니다!`;
      }
    } else {
      const base = randInt(6, 16) * 2;
      const height = randInt(5, 14);
      answer = (base * height) / 2;
      question = `밑변이 ${base}cm, 높이가 ${height}cm인 삼각형의 넓이는 몇 cm²일까요?`;
      subHint = '초5 다각형의 넓이: (밑변 × 높이) ÷ 2';
      detailedHint = `💡 힌트: 밑변의 절반(${base / 2})에 높이(${height})를 곱하면(${base / 2} × ${height}) 바로 넓이가 나옵니다!`;
    }
  } else {
    // 초6 (IQ 260+): 제한시간 60초 (고난도 응용이므로 충분한 시간 부여!)
    timeLimit = 60;
    const type = randInt(1, 3);
    if (type === 1) {
      const a = randInt(2, 7);
      const b = randInt(3, 9);
      const mult = randInt(3, 8);
      answer = b * mult;
      question = `비례식 ${a} : ${b} = ${a * mult} : □ 에서 □ 안에 들어갈 알맞은 수는?`;
      subHint = '초6 비례식: 외항의 곱과 내항의 곱은 같습니다!';
      detailedHint = `💡 힌트: 전항이 ${a}에서 ${a * mult}으로 ${mult}배 커졌으므로, 후항 ${b}에도 똑같이 ${mult}을 곱해보세요!`;
    } else if (type === 2) {
      const price = randInt(2, 9) * 1000;
      const discountPct = [10, 20, 25, 30, 50][randInt(0, 4)];
      answer = price * (1 - discountPct / 100);
      question = `정가가 ${price}원인 수학책을 ${discountPct}% 할인하여 살 때 내야 하는 금액은 몇 원?`;
      subHint = '초6 백분율 활용 문제입니다!';
      detailedHint = `💡 힌트: 할인 금액은 ${price * (discountPct / 100)}원입니다. 정가 ${price}원에서 할인 금액을 빼보세요!`;
    } else {
      const r1 = randInt(2, 5);
      const r2 = randInt(3, 6);
      const unit = randInt(4, 9);
      const total = (r1 + r2) * unit;
      answer = r1 * unit;
      question = `사탕 ${total}개를 신이준과 친구가 ${r1} : ${r2}의 비로 나누어 가질 때, 신이준이 가지는 사탕은 몇 개?`;
      subHint = `초6 비례배분: 전체 × (${r1} / ${r1 + r2})`;
      detailedHint = `💡 힌트: 전체 비의 합은 ${r1} + ${r2} = ${r1 + r2}입니다. 1묶음당 ${total} ÷ ${r1 + r2} = ${unit}개이므로 ${unit} × ${r1}을 계산하세요!`;
    }
  }

  // 보기 4개 생성
  const choicesSet = new Set([answer]);
  const offsets = [-10, -5, -3, -2, -1, 1, 2, 3, 5, 10, 12, -12];
  let safety = 0;
  while (choicesSet.size < 4 && safety < 50) {
    safety++;
    const delta = offsets[randInt(0, offsets.length - 1)] * (answer >= 500 ? 100 : 1);
    const candidate = answer + delta;
    if (candidate > 0 && candidate !== answer) {
      choicesSet.add(candidate);
    }
  }
  while (choicesSet.size < 4) {
    choicesSet.add(answer + choicesSet.size * 2);
  }

  const choices = Array.from(choicesSet).sort(() => Math.random() - 0.5);

  return {
    grade,
    question,
    subHint,
    detailedHint,
    answer,
    choices,
    timeLimit
  };
}

// 4각 초신성 별빛 도형 그리기 헬퍼
function drawStar4(ctx, cx, cy, outerR, innerR, color, glowColor = null, rot = 0) {
  ctx.save();
  ctx.translate(cx, cy);
  if (rot) ctx.rotate(rot);
  if (glowColor) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const ang = (i * Math.PI) / 4;
    if (i === 0) ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);
    else ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// 5각 별 도형 그리기 헬퍼
function drawStar5(ctx, cx, cy, outerR, innerR, color, glowColor = null, rot = 0) {
  ctx.save();
  ctx.translate(cx, cy);
  if (rot) ctx.rotate(rot);
  if (glowColor) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 10;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    if (i === 0) ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);
    else ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// 화려한 꾸미기 신발 & 발밑 원소 아우라 렌더러
function drawCosmeticShoe(ctx, legX, legY, shoeType, stageIdx, isFailing, tick, isClimbing, legIndex) {
  const sx = legX - 2;
  const sy = legY + 8;

  if (!shoeType || isFailing) {
    let baseColor = '#111827';
    if (stageIdx === 0 || isFailing) baseColor = '#d97706';
    else if (stageIdx <= 2) baseColor = '#ef4444';
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    ctx.roundRect(sx, sy + 1, 11, 5.5, 2.5);
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(sx, sy + 5, 11, 1.8);
    return;
  }

  ctx.save();

  if (shoeType === 'shoe_wind') {
    // 1) 에메랄드 폭풍 회전 오라 링
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.85)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    const spin = (tick * 0.25 + legIndex) % (Math.PI * 2);
    ctx.ellipse(sx + 6, sy + 5, 13, 4.5, 0, spin, spin + Math.PI * 1.35);
    ctx.stroke();

    // 2) 신발 본체 (에메랄드/시안 하이탑 스니커즈)
    const grad = ctx.createLinearGradient(sx, sy, sx + 13, sy + 7);
    grad.addColorStop(0, '#06b6d4');
    grad.addColorStop(0.5, '#22d3ee');
    grad.addColorStop(1, '#10b981');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(sx - 1, sy, 13, 6.5, 3);
    ctx.fill();

    // 발광 밑창
    ctx.fillStyle = '#ecfeff';
    ctx.fillRect(sx - 1, sy + 5, 13, 2);

    // 3) 헤르메스 바람 날개 (발목 뒤에서 퍼덕이는 하얀/민트 날개)
    const wingFlap = Math.sin(tick * 0.35 + legIndex * 1.5) * 0.35 + (isClimbing ? 0.25 : 0);
    ctx.save();
    ctx.translate(sx + 1, sy + 2);
    ctx.rotate(wingFlap);
    ctx.fillStyle = '#ecfeff';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-11, -8, -13, -2);
    ctx.quadraticCurveTo(-8, 1, -10, 4);
    ctx.quadraticCurveTo(-4, 4, 0, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  } else if (shoeType === 'shoe_fire') {
    // 1) 타오르는 마그마 불꽃 아우라 (발 주변에서 일렁이는 화염)
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 16;
    for (let f = 0; f < 3; f++) {
      const flameH = 8 + Math.sin(tick * 0.4 + f * 2 + legIndex) * 4 + (isClimbing ? 5 : 0);
      const fx = sx + 1 + f * 4.5;
      ctx.fillStyle = f === 1 ? '#fde047' : '#ef4444';
      ctx.beginPath();
      ctx.moveTo(fx - 3.5, sy + 5);
      ctx.quadraticCurveTo(fx - 2, sy + 2 - flameH * 0.6, fx, sy - flameH);
      ctx.quadraticCurveTo(fx + 2, sy + 2 - flameH * 0.6, fx + 3.5, sy + 5);
      ctx.closePath();
      ctx.fill();
    }

    // 2) 신발 본체 (크림슨-골드 마그마 부츠)
    const grad = ctx.createLinearGradient(sx, sy, sx + 13, sy + 7);
    grad.addColorStop(0, '#dc2626');
    grad.addColorStop(0.6, '#f97316');
    grad.addColorStop(1, '#fde047');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(sx - 1, sy, 13, 6.5, 3);
    ctx.fill();

    // 불꽃 라인 & 황금 밑창
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(sx - 1, sy + 5, 13, 2);
  } else if (shoeType === 'shoe_lightning') {
    // 1) 뇌신 볼트 스니커즈 본체
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    const grad = ctx.createLinearGradient(sx, sy, sx + 13, sy + 7);
    grad.addColorStop(0, '#facc15');
    grad.addColorStop(0.5, '#fef08a');
    grad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(sx - 1, sy, 13, 6.5, 3);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx - 1, sy + 5, 13, 2);

    // 2) 발 주변에서 실시간으로 튀는 지그재그 전격 스파크 아크!
    ctx.strokeStyle = tick % 2 === 0 ? '#fef08a' : '#38bdf8';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    const jx = sx + 5;
    const jy = sy + 3;
    ctx.moveTo(jx - 9, jy - 2 + (tick % 3));
    ctx.lineTo(jx - 3, jy - 8 - (tick % 4));
    ctx.lineTo(jx + 2, jy - 3);
    ctx.lineTo(jx + 10, jy - 10 + ((tick + legIndex) % 5));
    ctx.stroke();
  } else if (shoeType === 'shoe_rainbow') {
    // 1) 프리즘 무지개 빛무리 링
    const hue = (tick * 10 + legIndex * 60) % 360;
    ctx.shadowColor = `hsl(${hue}, 95%, 60%)`;
    ctx.shadowBlur = 16;

    const rGrad = ctx.createLinearGradient(sx - 2, sy, sx + 14, sy);
    rGrad.addColorStop(0, `hsl(${hue}, 95%, 60%)`);
    rGrad.addColorStop(0.5, `hsl(${(hue + 120) % 360}, 95%, 60%)`);
    rGrad.addColorStop(1, `hsl(${(hue + 240) % 360}, 95%, 60%)`);

    ctx.strokeStyle = rGrad;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(sx + 5.5, sy + 6, 13, 4, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 2) 프리즘 스니커즈 본체
    ctx.fillStyle = rGrad;
    ctx.beginPath();
    ctx.roundRect(sx - 1, sy, 13, 6.5, 3);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx - 1, sy + 5, 13, 2);

    // 3) 발 옆에 반짝이는 미니 프리즘 스타
    drawStar4(ctx, sx - 3, sy + 1, 4.5, 1.5, '#ffffff', `hsl(${hue}, 95%, 65%)`, tick * 0.15);
  } else if (shoeType === 'shoe_ice') {
    // 1) 절대영도 얼음 결정 오라
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(sx + 5.5, sy + 5.5, 13, 4, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 2) 크리스탈 아이스 부츠 본체
    const grad = ctx.createLinearGradient(sx, sy, sx + 13, sy + 7);
    grad.addColorStop(0, '#e0f2fe');
    grad.addColorStop(0.5, '#38bdf8');
    grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(sx - 1, sy, 13, 6.5, 3);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx - 1, sy + 5, 13, 2);
    drawStar4(ctx, sx - 2, sy + 2, 4.5, 1.2, '#ffffff', '#38bdf8', tick * 0.12 + legIndex);
  } else if (shoeType === 'shoe_galaxy') {
    // 1) 은하수 성운 오라 링
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 16;
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(sx + 5.5, sy + 5.5, 13.5, 4.2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 2) 코스믹 네뷸라 부츠 본체
    const grad = ctx.createLinearGradient(sx, sy, sx + 13, sy + 7);
    grad.addColorStop(0, '#311042');
    grad.addColorStop(0.5, '#7e22ce');
    grad.addColorStop(1, '#ec4899');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(sx - 1, sy, 13, 6.5, 3);
    ctx.fill();

    ctx.fillStyle = '#fde047';
    ctx.fillRect(sx - 1, sy + 5, 13, 1.8);
    drawStar5(ctx, sx + 12, sy + 1, 4, 1.5, '#fde047', '#c084fc', -tick * 0.15);
  } else if (shoeType === 'shoe_cyber') {
    // 1) 사이버 제트 추진 플라즈마 분사구 화염
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 16;
    const jetLen = 6 + Math.sin(tick * 0.5 + legIndex) * 3 + (isClimbing ? 5 : 0);
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.moveTo(sx + 1, sy + 6);
    ctx.lineTo(sx + 5.5, sy + 6 + jetLen);
    ctx.lineTo(sx + 10, sy + 6);
    ctx.closePath();
    ctx.fill();

    // 2) 메카닉 제트 부츠 본체
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(sx - 1, sy - 1, 13, 7, 2.5);
    ctx.fill();
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(sx + 1, sy + 2, 9, 2);
  }

  ctx.restore();
}

// 초신성 네온 왕관 & 헤일로 렌더러 (머리 위)
function drawSupernovaCrown(ctx, baseY, tick, isClimbing) {
  const crownFloat = Math.sin(tick * 0.16) * 3.5 - (isClimbing ? 3 : 0);
  const pulse = 1 + Math.sin(tick * 0.22) * 0.08 + (isClimbing ? 0.12 : 0);

  ctx.save();
  ctx.translate(0, baseY + crownFloat);
  ctx.scale(pulse, pulse);

  // 1) 왕관 뒤 초신성 네온 헤일로 (이중 광륜)
  const haloGrad = ctx.createRadialGradient(0, -8, 2, 0, -8, 28);
  haloGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
  haloGrad.addColorStop(0.45, 'rgba(56, 189, 248, 0.55)');
  haloGrad.addColorStop(0.8, 'rgba(244, 114, 182, 0.3)');
  haloGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(0, -8, 28, 0, Math.PI * 2);
  ctx.fill();

  // 회전하는 네온 마법 링
  ctx.save();
  ctx.translate(0, -7);
  ctx.strokeStyle = 'rgba(103, 232, 249, 0.85)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.ellipse(0, 0, 22, 6, Math.sin(tick * 0.08) * 0.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 2) 왕관 본체 (5봉우리 로열 골드 & 네온 시안 테두리)
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 16;

  const crownGrad = ctx.createLinearGradient(-16, -20, 16, 2);
  crownGrad.addColorStop(0, '#fef08a');
  crownGrad.addColorStop(0.45, '#facc15');
  crownGrad.addColorStop(1, '#ea580c');

  ctx.fillStyle = crownGrad;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.8;

  ctx.beginPath();
  ctx.moveTo(-15, 2);
  ctx.lineTo(-18, -13);
  ctx.lineTo(-10, -6);
  ctx.lineTo(-6, -17);
  ctx.lineTo(0, -8);
  ctx.lineTo(0, -21);
  ctx.lineTo(0, -8);
  ctx.closePath();

  // 깔끔한 5봉우리 대칭 패스
  ctx.beginPath();
  ctx.moveTo(-15, 2);
  ctx.lineTo(-18, -13);
  ctx.lineTo(-11, -6);
  ctx.lineTo(-7, -17);
  ctx.lineTo(-2.5, -8);
  ctx.lineTo(0, -22);
  ctx.lineTo(2.5, -8);
  ctx.lineTo(7, -17);
  ctx.lineTo(11, -6);
  ctx.lineTo(18, -13);
  ctx.lineTo(15, 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 왕관 하단 네온 밴드
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(-14.5, -2, 29, 3.5);

  // 3) 왕관 봉우리 끝 네온 진주 오브 5개
  const tips = [
    { x: -18, y: -13, c: '#67e8f9' },
    { x: -7, y: -17, c: '#f472b6' },
    { x: 0, y: -22, c: '#ffffff' },
    { x: 7, y: -17, c: '#f472b6' },
    { x: 18, y: -13, c: '#67e8f9' }
  ];
  tips.forEach((t) => {
    ctx.fillStyle = t.c;
    ctx.beginPath();
    ctx.arc(t.x, t.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4) 왕관 중앙 다이아몬드 보석 & 좌우 사파이어/루비 보석
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.moveTo(0, -11);
  ctx.lineTo(3.2, -6.5);
  ctx.lineTo(0, -2);
  ctx.lineTo(-3.2, -6.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(-8.5, -5.5, 2, 0, Math.PI * 2);
  ctx.arc(8.5, -5.5, 2, 0, Math.PI * 2);
  ctx.fill();

  // 5) 중앙 정점 초신성 십자 스타 플레어
  const starSize = 6.5 + Math.sin(tick * 0.3) * 2 + (isClimbing ? 3 : 0);
  drawStar4(ctx, 0, -22, starSize, starSize * 0.3, '#ffffff', '#67e8f9', tick * 0.08);

  ctx.restore();
}

// 신이준 캐릭터 렌더러 (방향 전환, 역동적인 계단 오르기 팔다리 모션, 꾸미기 신발/날개/왕관 포함)
function drawShinYiJun(ctx, x, y, stageIdx, facing, climbProgress, footParity, tick, isFailing = false, equipped = {}, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);

  // 왼쪽(-1)으로 올라갈 때는 왼쪽을 바라보고, 오른쪽(1)으로 올라갈 때는 오른쪽을 바라봄!
  if (facing < 0) {
    ctx.scale(-1, 1);
  }

  // 계단 오르기 중일 때 역동적인 포물선 도약 & 상체 앞으로 기울이기(Lean) 모션
  const isClimbing = climbProgress > 0.01;
  const jumpArc = isClimbing ? -Math.sin(climbProgress * Math.PI) * 15 : Math.sin(tick * 0.14) * 2;
  const leanAngle = isClimbing ? 0.16 * Math.sin(climbProgress * Math.PI) : 0;

  // 바닥 그림자
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(0, 4, isClimbing ? 17 : 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(0, jumpArc);
  ctx.rotate(leanAngle);

  // Lv.7 천재 황금 아우라 또는 초신성 네온 왕관의 초화려 멀티 레이어 아우라!
  if ((stageIdx >= 6 || equipped.accessory === 'aura_crown') && !isFailing) {
    const isCrown = equipped.accessory === 'aura_crown';
    const auraRadius = (isCrown ? 54 : 42) + Math.sin(tick * 0.2) * 6 + (isClimbing ? 10 : 0);
    const grad = ctx.createRadialGradient(0, -42, 6, 0, -42, auraRadius);
    if (isCrown) {
      grad.addColorStop(0, 'rgba(254, 240, 138, 0.65)');
      grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.5)');
      grad.addColorStop(0.75, 'rgba(244, 114, 182, 0.35)');
      grad.addColorStop(1, 'rgba(168, 85, 247, 0)');
    } else {
      grad.addColorStop(0, 'rgba(253, 224, 71, 0.55)');
      grad.addColorStop(1, 'rgba(253, 224, 71, 0)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, -42, auraRadius, 0, Math.PI * 2);
    ctx.fill();

    // 초신성 왕관 장착 시: 등 뒤에서 회전하는 초신성 광선 & 궤도 별빛
    if (isCrown) {
      ctx.save();
      ctx.translate(0, -44);
      ctx.rotate(tick * 0.04);
      ctx.strokeStyle = 'rgba(103, 232, 249, 0.45)';
      ctx.lineWidth = 2;
      for (let r = 0; r < 4; r++) {
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(-auraRadius * 0.85, 0);
        ctx.lineTo(auraRadius * 0.85, 0);
        ctx.stroke();
      }
      ctx.restore();

      // 캐릭터 주변을 공전하는 초신성 네온 스타 3개 (뒤쪽 궤도)
      for (let s = 0; s < 3; s++) {
        const orbitAng = tick * 0.09 + (s * Math.PI * 2) / 3;
        if (Math.sin(orbitAng) < 0) {
          const ox = Math.cos(orbitAng) * 34;
          const oy = -44 + Math.sin(orbitAng) * 14;
          const starColors = ['#38bdf8', '#fde047', '#f472b6'];
          drawStar4(ctx, ox, oy, 6, 2, '#ffffff', starColors[s], tick * 0.1);
        }
      }
    }
  }

  // 수학신의 황금 후광 (aura_math_god): 등 뒤에서 회전하는 고대 수학 공식 황금 마법진!
  if (equipped.accessory === 'aura_math_god' && !isFailing) {
    ctx.save();
    ctx.translate(0, -45);
    const haloR = 46 + Math.sin(tick * 0.15) * 4;
    const hGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, haloR + 10);
    hGrad.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
    hGrad.addColorStop(0.6, 'rgba(234, 179, 8, 0.3)');
    hGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');
    ctx.fillStyle = hGrad;
    ctx.beginPath();
    ctx.arc(0, 0, haloR + 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(tick * 0.03);
    ctx.strokeStyle = '#fde047';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 38, 0, Math.PI * 2);
    ctx.stroke();

    // 육각 별 마법진
    for (let t = 0; t < 2; t++) {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (t * Math.PI) / 3 + (i * Math.PI * 2) / 3;
        const px = Math.cos(a) * 36;
        const py = Math.sin(a) * 36;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 회전하는 수학 기호 (π, ∑, ∞, √)
    const symbols = ['π', '∑', '∞', '√'];
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < 4; i++) {
      const sa = (i * Math.PI) / 2;
      ctx.fillText(symbols[i], Math.cos(sa) * 44, Math.sin(sa) * 44);
    }
    ctx.restore();
  }

  // 꾸미기 아이템: 날개 슬롯 (천재의 황금 날개 / 심연의 드래곤 윙 / 사이버 네온 메카 윙 / 프리즘 요정 나비 날개)
  const wingType = equipped.wing || (equipped.accessory === 'wing_gold' ? 'wing_gold' : null);
  if (wingType && !isFailing) {
    const flap = isClimbing ? Math.sin(climbProgress * Math.PI * 2) * 0.42 : Math.sin(tick * 0.18) * 0.2;
    ctx.save();
    ctx.translate(-10, -36);
    ctx.rotate(flap);

    if (wingType === 'wing_gold') {
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#fde047';
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-32, -26, -38, -5);
      ctx.quadraticCurveTo(-26, 4, -31, 11);
      ctx.quadraticCurveTo(-16, 11, 0, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (wingType === 'wing_demon') {
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-22, -26);
      ctx.lineTo(-42, -14);
      ctx.quadraticCurveTo(-30, -2, -34, 8);
      ctx.quadraticCurveTo(-20, 4, -18, 14);
      ctx.quadraticCurveTo(-8, 6, 0, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (wingType === 'wing_cyber') {
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 16;
      const cGrad = ctx.createLinearGradient(0, -20, -40, 10);
      cGrad.addColorStop(0, '#22d3ee');
      cGrad.addColorStop(1, '#ec4899');
      ctx.fillStyle = cGrad;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      for (let b = 0; b < 3; b++) {
        ctx.save();
        ctx.rotate(-b * 0.22);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-36 + b * 5, -18 + b * 6);
        ctx.lineTo(-30 + b * 5, -9 + b * 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    } else if (wingType === 'wing_fairy') {
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 15;
      const fGrad = ctx.createLinearGradient(0, -24, -36, 16);
      fGrad.addColorStop(0, 'rgba(244, 114, 182, 0.9)');
      fGrad.addColorStop(0.5, 'rgba(167, 243, 208, 0.9)');
      fGrad.addColorStop(1, 'rgba(192, 132, 252, 0.9)');
      ctx.fillStyle = fGrad;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-28, -32, -44, -6, -12, 2);
      ctx.bezierCurveTo(-36, 8, -24, 26, 0, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  // 다리 교차 스윙 (계단 오를 때 왼발/오른발 번갈아 무릎을 높이 들어 딛는 모션!)
  const strideDir = footParity % 2 === 0 ? 1 : -1;
  const strideAmt = isClimbing ? Math.sin(climbProgress * Math.PI) * 11 * strideDir : Math.sin(tick * 0.2) * 2;
  const frontKneeLift = isClimbing ? -Math.sin(climbProgress * Math.PI) * 7 : 0;

  // 뒷다리 & 앞다리 좌표
  const leg1X = -9 + strideAmt * 0.6;
  const leg1Y = -14 + (strideAmt > 0 ? frontKneeLift : 0);
  const leg2X = 3 - strideAmt * 0.6;
  const leg2Y = -14 + (strideAmt < 0 ? frontKneeLift : 0);

  // 바지/다리
  if (stageIdx === 0 || isFailing) {
    ctx.fillStyle = '#fde68a';
  } else if (stageIdx <= 2) {
    ctx.fillStyle = '#1e293b';
  } else {
    ctx.fillStyle = stageIdx >= 5 ? '#0f172a' : '#334155';
  }
  ctx.fillRect(leg1X, leg1Y, 7, 11);
  ctx.fillRect(leg2X, leg2Y, 7, 11);

  // 화려한 꾸미기 신발 렌더링 (날개/화염/번개/무지개 오라 포함!)
  drawCosmeticShoe(ctx, leg1X, leg1Y, equipped.shoe, stageIdx, isFailing, tick, isClimbing, 0);
  drawCosmeticShoe(ctx, leg2X, leg2Y, equipped.shoe, stageIdx, isFailing, tick, isClimbing, 1);

  // 뒷팔 스윙
  const armSwing = isClimbing ? Math.sin(climbProgress * Math.PI) * 12 * strideDir : Math.sin(tick * 0.16) * 3;
  ctx.fillStyle = stageIdx === 0 || isFailing ? '#fde68a' : '#e2e8f0';
  ctx.save();
  ctx.translate(-4, -38);
  ctx.rotate((-armSwing * Math.PI) / 180 * 3);
  ctx.fillRect(-3, 0, 6, 15);
  ctx.restore();

  // 몸통 (의상 진화)
  if (stageIdx === 0 || isFailing) {
    // Lv.1 누더기 거지옷
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.roundRect(-16, -44, 32, 31, 6);
    ctx.fill();
    ctx.fillStyle = '#a16207';
    ctx.fillRect(-11, -38, 9, 9);
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-11, -38, 9, 9);
    ctx.fillStyle = '#57534e';
    ctx.fillRect(3, -27, 8, 8);
  } else if (stageIdx === 1) {
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.roundRect(-15, -44, 30, 24, 6);
    ctx.fill();
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(-15, -22, 30, 9);
  } else if (stageIdx === 2) {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(-15, -44, 30, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-15, -36, 30, 5);
    ctx.fillRect(-15, -26, 30, 5);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-11, -43, 4, 26);
    ctx.fillRect(7, -43, 4, 26);
  } else if (stageIdx === 3) {
    ctx.fillStyle = '#1e3a8a';
    ctx.beginPath();
    ctx.roundRect(-15, -44, 30, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-7, -44);
    ctx.lineTo(7, -44);
    ctx.lineTo(0, -33);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-2, -40, 4, 10);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(10, -36, 6, 7);
  } else if (stageIdx === 4) {
    ctx.fillStyle = '#d6d3d1';
    ctx.beginPath();
    ctx.roundRect(-16, -44, 32, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-5, -44, 10, 28);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-2, -42, 4, 16);
  } else if (stageIdx === 5) {
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(-16, -45, 32, 31, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-6, -45);
    ctx.lineTo(6, -45);
    ctx.lineTo(0, -28);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(-2, -42, 4, 14);
  } else {
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.roundRect(-17, -45, 34, 32, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-8, -45);
    ctx.lineTo(8, -45);
    ctx.lineTo(0, -26);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.moveTo(-7, -42);
    ctx.lineTo(7, -36);
    ctx.lineTo(7, -42);
    ctx.lineTo(-7, -36);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#facc15';
    ctx.fillRect(6, -33, 6, 4);
  }

  // 앞팔 역동적 스윙 & 손 무기(hand 슬롯) 렌더링
  ctx.fillStyle = stageIdx === 0 || isFailing ? '#78350f' : stageIdx >= 5 ? '#1e293b' : '#fde68a';
  ctx.save();
  ctx.translate(4, -38);
  ctx.rotate((armSwing * Math.PI) / 180 * 3.5);
  ctx.fillRect(-3, 0, 6, 15);

  if (equipped.hand && !isFailing) {
    ctx.save();
    ctx.translate(2, 13);
    ctx.rotate(-0.45);
    if (equipped.hand === 'hand_lollipop') {
      // 막대사탕 스틱
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-1.5, -18, 3, 20);
      // 무지개 스월 사탕 헤드
      const lGrad = ctx.createRadialGradient(0, -24, 1, 0, -24, 9);
      lGrad.addColorStop(0, '#fef08a');
      lGrad.addColorStop(0.5, '#f43f5e');
      lGrad.addColorStop(1, '#38bdf8');
      ctx.fillStyle = lGrad;
      ctx.beginPath();
      ctx.arc(0, -24, 8.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (equipped.hand === 'hand_wand') {
      // 마법봉 손잡이
      ctx.fillStyle = '#f472b6';
      ctx.fillRect(-2, -22, 4, 22);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-3, -6, 6, 3);
      // 꼭대기 황금 스타
      drawStar5(ctx, 0, -25, 8.5, 3.8, '#fde047', '#f472b6', tick * 0.1);
    } else if (equipped.hand === 'hand_sword') {
      // 엑스칼리버 계산기 광선검
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-3, -6);
      ctx.lineTo(-2, -34);
      ctx.lineTo(0, -40);
      ctx.lineTo(2, -34);
      ctx.lineTo(3, -6);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-1, -35, 2, 28);
      // 황금 크로스 가드
      ctx.fillStyle = '#facc15';
      ctx.fillRect(-7, -7, 14, 3.5);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-2, -3.5, 4, 6);
    }
    ctx.restore();
  }
  ctx.restore();

  // 얼굴 (머리)
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.arc(0, -60, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 볼터치
  ctx.fillStyle = stageIdx === 0 || isFailing ? 'rgba(244, 63, 94, 0.45)' : 'rgba(251, 113, 133, 0.3)';
  ctx.beginPath();
  ctx.arc(-9, -56, 4, 0, Math.PI * 2);
  ctx.arc(11, -56, 4, 0, Math.PI * 2);
  ctx.fill();

  // 눈 & 표정
  if (stageIdx === 0 || isFailing) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-5, -63, 4.5, 0, Math.PI * 2);
    ctx.arc(7, -63, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-3.5, -64.5, 2, 0, Math.PI * 2);
    ctx.arc(5.5, -61.5, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.arc(2, -52, 6, 0, Math.PI);
    ctx.fill();

    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    ctx.arc(3, -49, 3.8, 0, Math.PI);
    ctx.fill();

    const snotSize = 4.5 + Math.sin(tick * 0.12) * 2.2;
    ctx.fillStyle = 'rgba(125, 211, 252, 0.85)';
    ctx.beginPath();
    ctx.arc(5, -56, snotSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1;
    ctx.stroke();

    const fly1X = Math.cos(tick * 0.15) * 22;
    const fly1Y = -86 + Math.sin(tick * 0.3) * 5;
    const fly2X = Math.sin(tick * 0.12) * 20;
    const fly2Y = -92 + Math.cos(tick * 0.24) * 4;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(fly1X, fly1Y, 2, 0, Math.PI * 2);
    ctx.arc(fly2X, fly2Y, 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (stageIdx <= 2) {
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-5, -62, 2.5, 0, Math.PI * 2);
    ctx.arc(7, -62, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-6, -63, 1, 0, Math.PI * 2);
    ctx.arc(6, -63, 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(1, -55, 5, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-5, -62, 2.4, 0, Math.PI * 2);
    ctx.arc(7, -62, 2.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-9, -67);
    ctx.lineTo(-2, -66);
    ctx.moveTo(4, -66);
    ctx.lineTo(11, -67);
    ctx.stroke();

    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(1, -55, 4.5, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    if (stageIdx === 4 || stageIdx === 5) {
      ctx.strokeStyle = stageIdx === 4 ? '#1e293b' : '#fbbf24';
      ctx.lineWidth = 2;
      ctx.strokeRect(-10, -66, 9, 7);
      ctx.strokeRect(2, -66, 9, 7);
      ctx.beginPath();
      ctx.moveTo(-1, -63);
      ctx.lineTo(2, -63);
      ctx.stroke();
    }

    if (stageIdx >= 6) {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(7, -62, 5.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(12, -60);
      ctx.quadraticCurveTo(15, -50, 10, -42);
      ctx.stroke();
    }
  }

  // 머리카락 & 모자
  if (stageIdx === 0 || isFailing) {
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.moveTo(-18, -66);
    ctx.lineTo(-22, -78);
    ctx.lineTo(-10, -74);
    ctx.lineTo(-4, -84);
    ctx.lineTo(4, -75);
    ctx.lineTo(14, -83);
    ctx.lineTo(18, -70);
    ctx.lineTo(22, -65);
    ctx.quadraticCurveTo(0, -74, -18, -66);
    ctx.fill();
  } else if (stageIdx === 2) {
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, -67, 17, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-4, -70, 26, 4);
  } else if (stageIdx >= 6) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-21, -74, 42, 5);
    ctx.fillRect(-14, -96, 28, 22);
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(-14, -78, 28, 4);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, -65, 18, Math.PI * 0.95, Math.PI * 0.05);
    ctx.fill();
  }

  // 꾸미기 아이템: 사이버 천재 스카우터 (aura_visor)
  if (equipped.accessory === 'aura_visor' && !isFailing) {
    ctx.save();
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(6, 182, 212, 0.78)';
    ctx.strokeStyle = '#ecfeff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-12, -67, 26, 8.5, 3);
    ctx.fill();
    ctx.stroke();

    // 스카우터 타겟 십자선
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(7, -62.5, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 꾸미기 아이템: 초신성 네온 왕관 (화려한 보석 왕관 + 전면 공전 별빛!)
  if (equipped.accessory === 'aura_crown' && !isFailing) {
    drawSupernovaCrown(ctx, stageIdx >= 6 ? -100 : -82, tick, isClimbing);

    // 캐릭터 앞쪽을 지나는 초신성 공전 네온 스타
    for (let s = 0; s < 3; s++) {
      const orbitAng = tick * 0.09 + (s * Math.PI * 2) / 3;
      if (Math.sin(orbitAng) >= 0) {
        const ox = Math.cos(orbitAng) * 34;
        const oy = -44 + Math.sin(orbitAng) * 14;
        const starColors = ['#38bdf8', '#fde047', '#f472b6'];
        drawStar4(ctx, ox, oy, 7, 2.2, '#ffffff', starColors[s], -tick * 0.12);
      }
    }
  }

  // 꾸미기 아이템: 동행 펫 (pet_owl / pet_ufo / pet_dragon)
  if (equipped.pet && !isFailing) {
    const petBob = Math.sin(tick * 0.18) * 5;
    const petX = -32;
    const petY = -74 + petBob;
    ctx.save();
    ctx.translate(petX, petY);

    if (equipped.pet === 'pet_owl') {
      // 천재 박사 황금 부엉이
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(0, 0, 9, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath();
      ctx.ellipse(1, 2, 6, 6.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // 부엉이 눈 & 안경
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-2.5, -2, 3, 0, Math.PI * 2);
      ctx.arc(3.5, -2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-2, -2, 1.4, 0, Math.PI * 2);
      ctx.arc(4, -2, 1.4, 0, Math.PI * 2);
      ctx.fill();
      // 미니 학사모
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(9, -9);
      ctx.lineTo(0, -6);
      ctx.lineTo(-9, -9);
      ctx.closePath();
      ctx.fill();
    } else if (equipped.pet === 'pet_ufo') {
      // 외계인 미니 UFO
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 14;
      // 하단 트랙터 빔
      ctx.fillStyle = 'rgba(52, 211, 153, 0.32)';
      ctx.beginPath();
      ctx.moveTo(-6, 3);
      ctx.lineTo(-12, 20);
      ctx.lineTo(12, 20);
      ctx.lineTo(6, 3);
      ctx.closePath();
      ctx.fill();
      // 유리 돔
      ctx.fillStyle = '#67e8f9';
      ctx.beginPath();
      ctx.arc(0, -2, 7, Math.PI, 0);
      ctx.fill();
      // 비행접시 본체
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.ellipse(0, 1, 13, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fde047';
      for (let l = -1; l <= 1; l++) {
        ctx.beginPath();
        ctx.arc(l * 6, 1, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (equipped.pet === 'pet_dragon') {
      // 아기 골드 드래곤
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 12;
      // 미니 날개
      const dFlap = Math.sin(tick * 0.35) * 5;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-2, -2);
      ctx.lineTo(-14, -10 + dFlap);
      ctx.lineTo(-9, 2);
      ctx.closePath();
      ctx.fill();
      // 몸통 & 머리
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
      ctx.fill();
      // 뿔
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-3, -7);
      ctx.lineTo(-6, -14);
      ctx.lineTo(0, -8);
      ctx.fill();
      // 눈
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(3, -2, 1.8, 0, Math.PI * 2);
      ctx.fill();
      // 미니 브레스 불꽃
      if (isClimbing || tick % 20 < 10) {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(12, 1, 3.5 + (tick % 3), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  ctx.restore();
}

// 메인 게임 클래스
class InfiniteMathStairsGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.introCanvas = document.getElementById('intro-char-canvas');
    this.introCtx = this.introCanvas.getContext('2d');

    this.failCanvas = document.getElementById('fail-char-canvas');
    this.failCtx = this.failCanvas.getContext('2d');

    // 게임 상태
    this.state = 'START'; // START, PLAYING, PAUSED, SHOP, QUIZ, FALLING, FAIL
    this.prevStateBeforeModal = 'START';
    this.stairs = [];
    this.currentStair = 0;
    this.iq = 0; // 문제 1개 맞힐 때마다 +10 상승!
    this.bestStair = Number(localStorage.getItem('2jun_best_stair') || 0);
    this.bestIQ = Number(localStorage.getItem('2jun_best_iq') || 0);
    this.nickname = this.normalizeNickname(localStorage.getItem('2jun_nickname') || '');
    this.rankingsMap = {};
    this.onlineServerMap = {};
    this.lastPostedKey = '';
    this.hasUnsyncedBest = false;
    this.lastPostTime = 0;
    this.activeFetchPromise = null;
    this.activeFetchStartTime = 0;
    this.activeFetchController = null;
    this.legacyRankingFetched = false;
    this.firebaseDbUrl = 'https://junbabo-fcc55-default-rtdb.firebaseio.com';
    this.rankingEndpoint = 'https://ntfy.sh/2junbabo_math_stairs_rank_2026_v2';
    this.legacyRankingEndpoint = 'https://ntfy.sh/2junbabo_math_stairs_rank_2026_v1';

    this.hasUnsyncedItems = false;
    this.lastLocalItemMutationTime = 0;
    this.localDataUpdatedAt = 0;
    this.activeItemSyncPromise = null;

    const savedInterval = Number(localStorage.getItem('2jun_quiz_interval_v2') || 20);
    this.quizInterval = Math.min(999, Math.max(1, savedInterval || 20));

    // 영구 보존 데이터 로드 (코인 + 인벤토리 + 꾸미기 아이템 + 랭킹)
    this.loadPersistentData();
    this.loadLocalRankings();

    // 캐릭터 모션 및 고속 질주/방향전환 특수효과 상태
    this.playerFacing = 1; // 1: 오른쪽, -1: 왼쪽
    this.prevStairPos = { x: 0, y: 0 };
    this.climbAnimProgress = 0; // 0 ~ 1 보간
    this.stepFootParity = 0;
    this.lastStepTime = 0;
    this.speedCombo = 0;
    this.screenShake = 0;
    this.tick = 0;

    // 파티클, 무지개 자국, 계단 원소/초신성 이펙트, 충격파, 플로팅 텍스트, 잔상 배열
    this.particles = [];
    this.rainbowTrails = [];
    this.stairEffects = [];
    this.shockwaves = [];
    this.floatingTexts = [];
    this.afterimages = [];

    // 인게임 버프 타이머 (초) 및 로켓 점프 상태
    this.slowBuffTimeLeft = 0;
    this.magnetBuffTimeLeft = 0;
    this.compassBuffTimeLeft = 0;
    this.jackpotBuffTimeLeft = 0;
    this.rocketStepsLeft = 0;
    this.rocketStepTimer = 0;
    this.iqBoosterActive = false;
    this.lastFrameTime = performance.now();

    // 카메라 좌표
    this.camX = 0;
    this.camY = 0;
    this.fallYOffset = 0;
    this.fallVelocity = 0;

    // 무한의 계단 스태미나(타이머)
    this.stamina = 100;
    this.maxStamina = 100;

    // 수학 퀴즈 상태
    this.activeQuiz = null;
    this.quizTimeRemaining = 0;
    this.quizTotalLimit = 15;
    this.quizHintUsed = false;
    this.lastSecTick = 0;
    this.quizUnlockTime = 0;

    // 현재 상점 탭
    this.currentShopTab = 'func';

    // 배경 구름 및 시간대별 풍경 오브젝트 (별, 열기구, 새떼, 스카이라인 빌딩)
    this.clouds = Array.from({ length: 8 }, (_, i) => ({
      x: (i - 4) * 180,
      y: -i * 160 - 100,
      scale: 0.7 + (i % 3) * 0.25
    }));

    this.bgStars = Array.from({ length: 38 }, (_, i) => ({
      rx: ((i * 73) % 100) / 100,
      ry: ((i * 41) % 68) / 100,
      size: 1.2 + (i % 3) * 0.9,
      phase: i * 0.7
    }));

    this.bgBalloons = [
      { x: 90, y: 180, color1: '#ef4444', color2: '#fde047', scale: 0.95, speed: 0.18 },
      { x: 310, y: 290, color1: '#38bdf8', color2: '#f472b6', scale: 0.75, speed: 0.13 },
      { x: 460, y: 130, color1: '#a855f7', color2: '#34d399', scale: 0.85, speed: 0.22 }
    ];

    this.bgBirds = Array.from({ length: 5 }, (_, i) => ({
      offsetX: i * 26,
      offsetY: (i % 2) * 12,
      flapPhase: i * 0.8
    }));

    this.cityBuildings = Array.from({ length: 14 }, (_, i) => ({
      w: 36 + (i * 17) % 28,
      h: 65 + (i * 37) % 95,
      hasSpire: i % 4 === 0,
      windows: (i % 3) + 2
    }));

    this.resetStairs();
    try {
      this.initDOM();
    } catch (err) {
      console.error('DOM init warning:', err);
    }
    this.resize();
    window.addEventListener('resize', () => this.resize());
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => this.resize());
    }
    requestAnimationFrame((ts) => this.loop(ts));
  }

  getUserStorageKey(nick = null) {
    const cleanNick = this.normalizeNickname(nick || this.nickname);
    if (!cleanNick) return null;
    const fbKey = this.toFirebaseKey(cleanNick);
    return fbKey ? `2jun_user_${fbKey}_data_v3` : null;
  }

  getLegacyUserStorageKey(nick = null) {
    const cleanNick = this.normalizeNickname(nick || this.nickname);
    if (!cleanNick) return null;
    const fbKey = this.toFirebaseKey(cleanNick);
    return fbKey ? `2jun_user_${fbKey}_data_v2` : null;
  }

  // 기존 로컬스토리지(v1, v2, 2jun_coins 등)에 남아있는 모든 항목을 유실 없이 병합하여 로드
  loadPersistentData(targetNick = null) {
    const cleanNick = this.normalizeNickname(targetNick || this.nickname);
    const userKeyV3 = this.getUserStorageKey(cleanNick);
    const userKeyV2 = this.getLegacyUserStorageKey(cleanNick);
    const isCurrentNick = !targetNick || cleanNick === this.nickname;

    let invV3 = null;
    let invV2 = null;
    let invV1 = null;

    if (userKeyV3) {
      try {
        invV3 = JSON.parse(localStorage.getItem(userKeyV3) || 'null');
      } catch (_) {}
    }
    if (userKeyV2) {
      try {
        invV2 = JSON.parse(localStorage.getItem(userKeyV2) || 'null');
      } catch (_) {}
    }
    if (isCurrentNick) {
      try {
        invV1 = JSON.parse(localStorage.getItem('2jun_inventory_v1') || 'null');
      } catch (_) {}
    }

    const sources = [invV3, invV2, invV1].filter((s) => s && typeof s === 'object');
    const primary = invV3 || invV2 || (isCurrentNick ? invV1 : null);

    // 1) 최고 기록 (stair, iq) 복원
    if (isCurrentNick) {
      const localBestStair = Math.max(
        0,
        Math.floor(Number(localStorage.getItem('2jun_best_stair') || 0)),
        ...sources.map((s) => Math.max(0, Math.floor(Number(s.stair) || 0)))
      );
      const localBestIQ = Math.max(
        0,
        Math.floor(Number(localStorage.getItem('2jun_best_iq') || 0)),
        ...sources.map((s) => Math.max(0, Math.floor(Number(s.iq) || 0)))
      );
      this.bestStair = Math.max(this.bestStair || 0, localBestStair);
      this.bestIQ = Math.max(this.bestIQ || 0, localBestIQ);
    }

    // 2) 코인 복원 (최초 마이그레이션 전이면 모든 로컬 스토리지 소스의 최대값을 보존하여 초기화 방지)
    const migrationKey = cleanNick ? `2jun_fb_node_migrated_v3_${this.toFirebaseKey(cleanNick)}` : null;
    const alreadyMigratedV3 = migrationKey ? localStorage.getItem(migrationKey) === '1' : false;

    const rawCoinStorage = isCurrentNick
      ? Math.max(0, Math.floor(Number(localStorage.getItem('2jun_coins') || 0)))
      : 0;

    if (!alreadyMigratedV3) {
      this.coins = Math.max(
        rawCoinStorage,
        ...sources.map((s) => Math.max(0, Math.floor(Number(s.coins) || 0)))
      );
    } else if (primary && primary.coins !== undefined) {
      this.coins = Math.max(0, Math.floor(Number(primary.coins) || 0));
    } else {
      this.coins = rawCoinStorage;
    }

    // 3) 기능성 소비 아이템 수량 복원
    const defaultKeys = [
      'time_ext',
      'slow_stamina',
      'math_hint',
      'extra_life',
      'double_coin',
      'iq_booster',
      'direction_guide',
      'rocket_boost',
      'fever_jackpot',
      'quiz_pass',
      'einstein_capsule'
    ];
    const nextInventory = {};
    defaultKeys.forEach((k) => {
      if (!alreadyMigratedV3) {
        nextInventory[k] = Math.max(
          0,
          ...sources.map((s) => Math.max(0, Math.floor(Number(s.counts?.[k]) || 0)))
        );
      } else {
        nextInventory[k] = Math.max(0, Math.floor(Number(primary?.counts?.[k]) || 0));
      }
    });
    sources.forEach((s) => {
      Object.keys(s.counts || {}).forEach((k) => {
        if (nextInventory[k] === undefined) {
          nextInventory[k] = Math.max(0, Math.floor(Number(s.counts[k]) || 0));
        }
      });
    });
    this.inventory = nextInventory;

    // 4) 영구 해금 코스메틱 아이템 복원 (모든 로컬 소스의 합집합으로 유실 방지)
    const mergedUnlocked = {};
    sources.forEach((s) => {
      Object.keys(s.unlocked || {}).forEach((k) => {
        if (s.unlocked[k]) mergedUnlocked[k] = true;
      });
    });
    this.unlockedCosmetics = mergedUnlocked;

    // 5) 장착 상태 복원
    const slots = ['shoe', 'wing', 'accessory', 'hand', 'pet', 'stair'];
    const nextEquipped = {};
    slots.forEach((slot) => {
      let val = primary?.equipped?.[slot] || null;
      if (!val && !alreadyMigratedV3) {
        for (const s of sources) {
          if (s.equipped?.[slot]) {
            val = s.equipped[slot];
            break;
          }
        }
      }
      nextEquipped[slot] = val;
    });
    if (nextEquipped.accessory === 'wing_gold') {
      nextEquipped.wing = 'wing_gold';
      nextEquipped.accessory = null;
    }
    this.equipped = nextEquipped;

    // 현재 장착 중인 모든 아이템은 해금(보유) 목록에도 반드시 포함되도록 보장
    Object.values(this.equipped).forEach((itemId) => {
      if (itemId) {
        this.unlockedCosmetics[itemId] = true;
      }
    });

    // 6) 시험 출현 간격 복원
    const savedQuizInterval = Number(
      primary?.quizInterval || localStorage.getItem('2jun_quiz_interval_v2') || this.quizInterval || 20
    );
    this.quizInterval = Math.min(999, Math.max(1, Math.floor(savedQuizInterval || 20)));

    this.iqBoosterActive = (this.inventory.iq_booster || 0) > 0;
    this.localDataUpdatedAt = Math.max(
      0,
      ...sources.map((s) => Number(s.updatedAt) || 0)
    );
  }

  saveLocalCacheOnly(targetNick = null) {
    try {
      const cleanNick = this.normalizeNickname(targetNick || this.nickname);
      const payload = {
        nick: cleanNick || '',
        stair: Math.max(0, Math.floor(Number(this.bestStair) || 0)),
        iq: Math.max(0, Math.floor(Number(this.bestIQ) || 0)),
        coins: Math.max(0, Math.floor(Number(this.coins) || 0)),
        counts: this.inventory,
        unlocked: this.unlockedCosmetics,
        equipped: this.equipped,
        quizInterval: this.quizInterval,
        updatedAt: this.localDataUpdatedAt || Date.now()
      };
      localStorage.setItem('2jun_coins', String(this.coins));
      localStorage.setItem('2jun_quiz_interval_v2', String(this.quizInterval));
      localStorage.setItem('2jun_best_stair', String(this.bestStair));
      localStorage.setItem('2jun_best_iq', String(this.bestIQ));
      if (cleanNick) {
        localStorage.setItem('2jun_nickname', cleanNick);
      }
      localStorage.setItem('2jun_inventory_v1', JSON.stringify(payload));
      const userKeyV3 = this.getUserStorageKey(cleanNick);
      if (userKeyV3) {
        localStorage.setItem(userKeyV3, JSON.stringify(payload));
      }
      const userKeyV2 = this.getLegacyUserStorageKey(cleanNick);
      if (userKeyV2) {
        localStorage.setItem(userKeyV2, JSON.stringify(payload));
      }
    } catch (_) {}
  }

  savePersistentData() {
    // 장착 중인 아이템은 해금 목록에도 자동 반영
    Object.values(this.equipped || {}).forEach((itemId) => {
      if (itemId) {
        this.unlockedCosmetics[itemId] = true;
      }
    });
    const now = Date.now();
    this.lastLocalItemMutationTime = now;
    this.localDataUpdatedAt = now;
    this.hasUnsyncedItems = true;
    this.saveLocalCacheOnly();
    // 모든 로컬스토리지 항목(랭킹 점수 + 코인 + 인벤토리 + 해금/장착 아이템 + 시험간격)을 닉네임 하위 노드에 즉시 저장
    this.pushPersistentDataToFirebase(false);
  }

  hasLocalPersistentAssets() {
    if ((Number(this.coins) || 0) > 0) return true;
    if ((Number(this.bestStair) || 0) > 0) return true;
    if ((Number(this.bestIQ) || 0) > 0) return true;
    if (Object.values(this.inventory || {}).some((v) => (Number(v) || 0) > 0)) return true;
    if (Object.keys(this.unlockedCosmetics || {}).some((k) => Boolean(this.unlockedCosmetics[k]))) return true;
    if (Object.values(this.equipped || {}).some((v) => Boolean(v))) return true;
    return false;
  }

  // /rankings/{닉네임} 바로 아래에 들어갈 통합 사용자 데이터 페이로드 생성
  buildUserNodePayload(overrideNick = null) {
    const cleanNick = this.normalizeNickname(overrideNick || this.nickname);
    const unlocked = {};
    Object.keys(this.unlockedCosmetics || {}).forEach((k) => {
      if (this.unlockedCosmetics[k]) unlocked[k] = true;
    });
    Object.values(this.equipped || {}).forEach((itemId) => {
      if (itemId) unlocked[itemId] = true;
    });

    const defaultKeys = [
      'time_ext',
      'slow_stamina',
      'math_hint',
      'extra_life',
      'double_coin',
      'iq_booster',
      'direction_guide',
      'rocket_boost',
      'fever_jackpot',
      'quiz_pass',
      'einstein_capsule'
    ];
    const counts = {};
    defaultKeys.forEach((k) => {
      counts[k] = Math.max(0, Math.floor(Number(this.inventory?.[k]) || 0));
    });
    Object.keys(this.inventory || {}).forEach((k) => {
      counts[k] = Math.max(0, Math.floor(Number(this.inventory[k]) || 0));
    });

    const equipped = {
      shoe: this.equipped?.shoe || null,
      wing: this.equipped?.wing || null,
      accessory: this.equipped?.accessory || null,
      hand: this.equipped?.hand || null,
      pet: this.equipped?.pet || null,
      stair: this.equipped?.stair || null
    };
    if (equipped.accessory === 'wing_gold') {
      equipped.wing = 'wing_gold';
      equipped.accessory = null;
    }

    const serverRec = cleanNick ? this.onlineServerMap?.[cleanNick] : null;
    const localRec = cleanNick ? this.rankingsMap?.[cleanNick] : null;
    const bestStair = Math.max(
      0,
      Math.floor(Number(this.bestStair) || 0),
      Math.floor(Number(serverRec?.stair) || 0),
      Math.floor(Number(localRec?.stair) || 0)
    );
    const bestIQ = Math.max(
      0,
      Math.floor(Number(this.bestIQ) || 0),
      Math.floor(Number(serverRec?.iq) || 0),
      Math.floor(Number(localRec?.iq) || 0)
    );

    return {
      nick: cleanNick || '',
      stair: bestStair,
      iq: bestIQ,
      coins: Math.max(0, Math.floor(Number(this.coins) || 0)),
      counts,
      unlocked,
      equipped,
      quizInterval: Math.min(999, Math.max(1, Math.floor(Number(this.quizInterval) || 20))),
      updatedAt: this.localDataUpdatedAt || Date.now(),
      playerData: null
    };
  }

  // 원격 노드에서 아이템/코인/장착 데이터를 추출 (플랫 구조 및 구버전 중첩 playerData 모두 호환)
  extractRemotePlayerFields(rawNode) {
    if (!rawNode || typeof rawNode !== 'object') return null;
    const nested = rawNode.playerData && typeof rawNode.playerData === 'object' ? rawNode.playerData : null;
    const hasFlatFields =
      rawNode.coins !== undefined ||
      rawNode.counts !== undefined ||
      rawNode.unlocked !== undefined ||
      rawNode.equipped !== undefined ||
      rawNode.quizInterval !== undefined;

    if (!hasFlatFields && !nested) return null;

    const coins = Math.max(
      Math.max(0, Math.floor(Number(rawNode.coins) || 0)),
      Math.max(0, Math.floor(Number(nested?.coins) || 0))
    );

    const counts = {};
    const c1 = rawNode.counts && typeof rawNode.counts === 'object' ? rawNode.counts : {};
    const c2 = nested?.counts && typeof nested.counts === 'object' ? nested.counts : {};
    Object.keys({ ...c2, ...c1 }).forEach((k) => {
      counts[k] = Math.max(
        Math.max(0, Math.floor(Number(c1[k]) || 0)),
        Math.max(0, Math.floor(Number(c2[k]) || 0))
      );
    });

    const u1 = rawNode.unlocked && typeof rawNode.unlocked === 'object' ? rawNode.unlocked : {};
    const u2 = nested?.unlocked && typeof nested.unlocked === 'object' ? nested.unlocked : {};
    const unlocked = { ...u2, ...u1 };

    const e1 = rawNode.equipped && typeof rawNode.equipped === 'object' ? rawNode.equipped : {};
    const e2 = nested?.equipped && typeof nested.equipped === 'object' ? nested.equipped : {};
    const equipped = {
      shoe: e1.shoe ?? e2.shoe ?? null,
      wing: e1.wing ?? e2.wing ?? null,
      accessory: e1.accessory ?? e2.accessory ?? null,
      hand: e1.hand ?? e2.hand ?? null,
      pet: e1.pet ?? e2.pet ?? null,
      stair: e1.stair ?? e2.stair ?? null
    };

    const quizInterval = rawNode.quizInterval || nested?.quizInterval || null;
    const updatedAt = Math.max(Number(rawNode.updatedAt) || 0, Number(nested?.updatedAt) || 0);

    return {
      coins,
      counts,
      unlocked,
      equipped,
      quizInterval,
      updatedAt
    };
  }

  applyRemotePersistentData(remoteData, mergeLocalForFirstMigration = false) {
    if (!remoteData || typeof remoteData !== 'object') return false;

    const remoteCoins = Math.max(0, Math.floor(Number(remoteData.coins) || 0));
    const remoteCounts = remoteData.counts && typeof remoteData.counts === 'object' ? remoteData.counts : {};
    const remoteUnlocked = remoteData.unlocked && typeof remoteData.unlocked === 'object' ? remoteData.unlocked : {};
    const remoteEquipped = remoteData.equipped && typeof remoteData.equipped === 'object' ? remoteData.equipped : {};

    if (mergeLocalForFirstMigration) {
      // 최초 마이그레이션 또는 구조 전환 시: 현재 사용자의 로컬 보유 코인·아이템·장착 정보를 100% 보존하며 원격 데이터와 최대값/합집합 병합!
      this.coins = Math.max(remoteCoins, Math.max(0, Math.floor(Number(this.coins) || 0)));

      const defaultKeys = [
        'time_ext',
        'slow_stamina',
        'math_hint',
        'extra_life',
        'double_coin',
        'iq_booster',
        'direction_guide',
        'rocket_boost',
        'fever_jackpot',
        'quiz_pass',
        'einstein_capsule'
      ];
      const mergedCounts = {};
      defaultKeys.forEach((k) => {
        mergedCounts[k] = Math.max(
          Math.max(0, Math.floor(Number(remoteCounts[k]) || 0)),
          Math.max(0, Math.floor(Number(this.inventory?.[k]) || 0))
        );
      });
      Object.keys({ ...(this.inventory || {}), ...remoteCounts }).forEach((k) => {
        mergedCounts[k] = Math.max(
          Math.max(0, Math.floor(Number(remoteCounts[k]) || 0)),
          Math.max(0, Math.floor(Number(this.inventory?.[k]) || 0))
        );
      });
      this.inventory = mergedCounts;

      const mergedUnlocked = { ...remoteUnlocked, ...(this.unlockedCosmetics || {}) };
      const slots = ['shoe', 'wing', 'accessory', 'hand', 'pet', 'stair'];
      const mergedEquipped = {};
      slots.forEach((slot) => {
        mergedEquipped[slot] = this.equipped?.[slot] || remoteEquipped[slot] || null;
        if (mergedEquipped[slot]) {
          mergedUnlocked[mergedEquipped[slot]] = true;
        }
      });
      if (mergedEquipped.accessory === 'wing_gold') {
        mergedEquipped.wing = 'wing_gold';
        mergedEquipped.accessory = null;
      }
      this.equipped = mergedEquipped;
      this.unlockedCosmetics = mergedUnlocked;
    } else {
      // 일반 동기화: Firebase DB의 최신 코인·인벤토리·장착 상태를 반영하되 영구 해금 코스메틱은 합집합 유지
      this.coins = remoteCoins;

      const defaultKeys = [
        'time_ext',
        'slow_stamina',
        'math_hint',
        'extra_life',
        'double_coin',
        'iq_booster',
        'direction_guide',
        'rocket_boost',
        'fever_jackpot',
        'quiz_pass',
        'einstein_capsule'
      ];
      const nextCounts = {};
      defaultKeys.forEach((k) => {
        nextCounts[k] = Math.max(0, Math.floor(Number(remoteCounts[k]) || 0));
      });
      Object.keys(remoteCounts).forEach((k) => {
        nextCounts[k] = Math.max(0, Math.floor(Number(remoteCounts[k]) || 0));
      });
      this.inventory = nextCounts;

      const nextUnlocked = { ...(this.unlockedCosmetics || {}), ...remoteUnlocked };
      const nextEquipped = {
        shoe: remoteEquipped.shoe || null,
        wing: remoteEquipped.wing || null,
        accessory: remoteEquipped.accessory || null,
        hand: remoteEquipped.hand || null,
        pet: remoteEquipped.pet || null,
        stair: remoteEquipped.stair || null
      };
      if (nextEquipped.accessory === 'wing_gold') {
        nextEquipped.wing = 'wing_gold';
        nextEquipped.accessory = null;
      }
      Object.values(nextEquipped).forEach((itemId) => {
        if (itemId) nextUnlocked[itemId] = true;
      });
      this.equipped = nextEquipped;
      this.unlockedCosmetics = nextUnlocked;

      if (remoteData.quizInterval) {
        this.quizInterval = Math.min(999, Math.max(1, Math.floor(Number(remoteData.quizInterval) || 20)));
        this.syncIntervalLabels();
      }
    }

    this.iqBoosterActive = (this.inventory.iq_booster || 0) > 0;
    this.localDataUpdatedAt = Number(remoteData.updatedAt) || Date.now();
    this.saveLocalCacheOnly();

    if (this.elStairCount) {
      this.updateHUD();
    }
    if (this.elShopModal?.classList.contains('active')) {
      this.renderShopItems();
    }
    if (this.state === 'QUIZ') {
      this.updateQuizItemButtons();
    }
    return true;
  }

  async pushPersistentDataToFirebase(isMigration = false) {
    if (!this.firebaseDbUrl || !this.nickname) return false;
    const cleanNick = this.normalizeNickname(this.nickname);
    const fbKey = this.toFirebaseKey(cleanNick);
    if (!cleanNick || !fbKey) return false;

    const payload = this.buildUserNodePayload(cleanNick);
    const bodyStr = JSON.stringify(payload);

    // 각 사용자의 닉네임 노드 바로 아래(/rankings/{fbKey}.json)에 모든 로컬스토리지 항목을 통합 PATCH 저장
    const userNodeUrl = `${this.firebaseDbUrl}/rankings/${encodeURIComponent(fbKey)}.json`;
    let ok = false;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      try {
        controller.abort();
      } catch (_) {}
    }, 4500);

    try {
      const res = await fetch(userNodeUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        cache: 'no-store',
        keepalive: true,
        signal: controller.signal,
        body: bodyStr
      });
      clearTimeout(timer);
      if (res && res.ok) {
        ok = true;
      }
    } catch (_) {
      clearTimeout(timer);
    }

    if (ok) {
      if (this.localDataUpdatedAt <= payload.updatedAt) {
        this.hasUnsyncedItems = false;
      }
      try {
        localStorage.setItem(`2jun_fb_node_migrated_v3_${fbKey}`, '1');
      } catch (_) {}
    }
    return ok;
  }

  async fetchRemotePersistentDataFromFirebase(targetNick = null) {
    if (!this.firebaseDbUrl) return { reachable: false, data: null, scoreData: null, needsFlatten: false };
    const cleanNick = this.normalizeNickname(targetNick || this.nickname);
    const fbKey = this.toFirebaseKey(cleanNick);
    if (!cleanNick || !fbKey) return { reachable: false, data: null, scoreData: null, needsFlatten: false };

    const cacheBuster = Date.now();
    // 1) 사용자 전용 노드(/rankings/{fbKey}.json)를 조회
    const userRes = await this.fetchJsonWithTimeout(
      `${this.firebaseDbUrl}/rankings/${encodeURIComponent(fbKey)}.json?_t=${cacheBuster}`,
      4000
    );

    const reachable = Boolean(userRes.ok);
    let playerData = null;
    let scoreData = null;
    let needsFlatten = false;

    if (userRes.ok && userRes.data && typeof userRes.data === 'object') {
      const d = userRes.data;
      if (d.stair !== undefined || d.iq !== undefined) {
        scoreData = {
          stair: Math.max(0, Math.floor(Number(d.stair) || 0)),
          iq: Math.max(0, Math.floor(Number(d.iq) || 0)),
          updatedAt: Number(d.updatedAt) || Date.now()
        };
      }
      playerData = this.extractRemotePlayerFields(d);
      // 아직 DB 노드에 coins/counts/unlocked/equipped가 직접 없거나 구버전 playerData 하위 객체가 남아있다면 구조 갱신 필요 표시
      if (
        d.playerData !== undefined ||
        d.coins === undefined ||
        d.counts === undefined ||
        d.unlocked === undefined ||
        d.equipped === undefined
      ) {
        needsFlatten = true;
      }
    } else if (userRes.ok && !userRes.data) {
      needsFlatten = true;
    }

    return { reachable, data: playerData, scoreData, needsFlatten };
  }

  async syncPersistentDataWithFirebase(forcedNick = null) {
    if (this.activeItemSyncPromise) {
      return this.activeItemSyncPromise;
    }

    const runSync = async () => {
      const syncStartTime = Date.now();
      const currentNick = this.normalizeNickname(forcedNick || this.nickname);
      if (!currentNick) return;
      const fbKey = this.toFirebaseKey(currentNick);
      if (!fbKey) return;

      const migrationKey = `2jun_fb_node_migrated_v3_${fbKey}`;
      const alreadyMigrated = localStorage.getItem(migrationKey) === '1';
      const hasLocalAssets = this.hasLocalPersistentAssets();

      const {
        reachable,
        data: remoteData,
        scoreData,
        needsFlatten
      } = await this.fetchRemotePersistentDataFromFirebase(currentNick);

      if (scoreData && currentNick === this.nickname) {
        if (scoreData.stair > this.bestStair || (scoreData.stair === this.bestStair && scoreData.iq > this.bestIQ)) {
          this.bestStair = scoreData.stair;
          this.bestIQ = scoreData.iq;
          localStorage.setItem('2jun_best_stair', String(this.bestStair));
          localStorage.setItem('2jun_best_iq', String(this.bestIQ));
          if (this.elBestCount) this.elBestCount.textContent = this.bestStair;
        }
      }

      // 1) 최초 접속 시(또는 변경된 플랫 DB 구조로 아직 업로드되지 않은 경우):
      // 로컬스토리지의 코인·아이템·장착 정보와 DB 데이터를 병합(데이터 유실 0%)한 뒤 새 DB 구조(/rankings/{닉네임})로 즉시 업로드!
      if (!alreadyMigrated || needsFlatten) {
        if (remoteData) {
          this.applyRemotePersistentData(remoteData, true);
        }
        if (reachable && (hasLocalAssets || remoteData || needsFlatten)) {
          this.localDataUpdatedAt = Date.now();
          this.saveLocalCacheOnly(currentNick);
          await this.pushPersistentDataToFirebase(true);
        }
        return;
      }

      // 2) 로컬에 미전송 변경사항이 있는 경우
      if (this.hasUnsyncedItems || this.lastLocalItemMutationTime >= syncStartTime) {
        if (remoteData && remoteData.unlocked) {
          this.unlockedCosmetics = { ...remoteData.unlocked, ...(this.unlockedCosmetics || {}) };
        }
        await this.pushPersistentDataToFirebase(false);
        return;
      }

      // 3) DB 최신 데이터를 로컬에 반영
      if (remoteData) {
        this.applyRemotePersistentData(remoteData, false);
      } else if (reachable && hasLocalAssets) {
        await this.pushPersistentDataToFirebase(false);
      }
    };

    const p = runSync();
    this.activeItemSyncPromise = p;
    try {
      await p;
    } finally {
      if (this.activeItemSyncPromise === p) {
        this.activeItemSyncPromise = null;
      }
    }
  }

  initDOM() {
    this.elStairCount = document.getElementById('stair-count');
    this.elBestCount = document.getElementById('best-count');
    this.elCoinCount = document.getElementById('coin-count');
    this.elCharBadge = document.getElementById('char-title-badge');
    this.elStaminaBar = document.getElementById('stamina-bar-inner');
    this.elNextQuizGrade = document.getElementById('next-quiz-grade');
    this.elQuizProgressFill = document.getElementById('quiz-progress-fill');
    this.elStairsToQuiz = document.getElementById('stairs-to-quiz');

    this.elAvatarEmoji = document.getElementById('avatar-emoji');
    this.elStatusName = document.getElementById('status-name');
    this.elStatusDesc = document.getElementById('status-desc');
    this.elLifeBadge = document.getElementById('life-badge');
    this.elActiveBuffs = document.getElementById('active-buffs');

    this.elStartModal = document.getElementById('start-modal');
    this.elOptionsModal = document.getElementById('options-modal');
    this.elShopModal = document.getElementById('shop-modal');
    this.elQuizModal = document.getElementById('quiz-modal');
    this.elFailModal = document.getElementById('fail-modal');
    this.elRankingModal = document.getElementById('ranking-modal');
    this.elNicknameModal = document.getElementById('nickname-modal');
    this.elNicknameInput = document.getElementById('nickname-input');
    this.elNicknameError = document.getElementById('nickname-error');
    this.elEvoBanner = document.getElementById('evolution-banner');
    this.elEvoTitle = document.getElementById('evo-title-text');
    this.elEvoDetail = document.getElementById('evo-detail');
    this.elCustomIntervalInput = document.getElementById('custom-interval-input');
    this.elOptionsPreviewText = document.getElementById('options-preview-text');

    if (this.elBestCount) this.elBestCount.textContent = this.bestStair;
    this.syncIntervalLabels();
    this.updateHUD();
    this.renderRankingBoards();

    // 처음 접속 시 저장된 닉네임이 없으면 닉네임 입력 모달 자동 표시
    if (!this.nickname) {
      this.openNicknameModal(true);
    } else {
      this.loadPersistentData(this.nickname);
      this.updateRankingEntry(this.nickname, this.bestStair, this.bestIQ, false);
      this.syncPersistentDataWithFirebase(this.nickname);
    }
    this.fetchOnlineRankings();

    // 시작 및 재시작 버튼
    document.getElementById('btn-start-game')?.addEventListener('click', () => {
      if (!this.nickname) {
        this.openNicknameModal(true);
        return;
      }
      sfx.init();
      this.startGame();
    });

    document.getElementById('btn-retry-game')?.addEventListener('click', () => {
      if (!this.nickname) {
        this.openNicknameModal(true);
        return;
      }
      this.startGame();
    });

    // 닉네임 등록 및 변경 이벤트
    document.getElementById('btn-save-nickname')?.addEventListener('click', () => this.saveNicknameModal());
    document.getElementById('btn-cancel-nickname')?.addEventListener('click', () => this.closeNicknameModal());
    document.getElementById('btn-change-nick-start')?.addEventListener('click', () => this.openNicknameModal(false));
    document.getElementById('btn-change-nick-modal')?.addEventListener('click', () => this.openNicknameModal(false));

    this.elNicknameInput?.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        this.saveNicknameModal();
      }
    });

    // 랭킹 모달 열기/닫기/새로고침 이벤트 (시작 화면 & 다시시작 팝업)
    document.getElementById('btn-open-ranking-start')?.addEventListener('click', () => this.openRankingModal());
    document.getElementById('btn-open-ranking-fail')?.addEventListener('click', () => this.openRankingModal());
    document.getElementById('btn-close-ranking')?.addEventListener('click', () => this.closeRankingModal());
    document.getElementById('btn-refresh-ranking')?.addEventListener('click', () => this.fetchOnlineRankings(true));
    document.getElementById('btn-refresh-ranking-start')?.addEventListener('click', () => this.fetchOnlineRankings(true));
    document.getElementById('ranking-sync-badge')?.addEventListener('click', () => this.fetchOnlineRankings(true));

    // 탭 전환/종료 시 아직 서버에 전송되지 않은 최고 기록 및 아이템·코인 정보가 있으면 즉시 전송
    const flushUnsyncedData = () => {
      if (this.nickname && this.hasUnsyncedBest && this.rankingsMap[this.nickname]) {
        this.postScoreOnline(this.rankingsMap[this.nickname], true);
      }
      if (this.hasUnsyncedItems) {
        this.pushPersistentDataToFirebase(false);
      }
    };
    window.addEventListener('pagehide', flushUnsyncedData);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flushUnsyncedData();
      } else if (document.visibilityState === 'visible') {
        this.syncPersistentDataWithFirebase();
      }
    });
    window.addEventListener('focus', () => {
      this.syncPersistentDataWithFirebase();
    });

    // 옵션 모달 열기/닫기/저장
    const openOpts = () => this.openOptionsModal();
    document.getElementById('options-toggle')?.addEventListener('click', openOpts);
    document.getElementById('btn-open-options-start')?.addEventListener('click', openOpts);
    document.getElementById('btn-open-options-fail')?.addEventListener('click', openOpts);

    document.getElementById('btn-close-options')?.addEventListener('click', () => this.closeOptionsModal());
    document.getElementById('btn-save-options')?.addEventListener('click', () => this.saveOptionsModal());

    // 상점 모달 열기/닫기/탭 전환
    const openShop = () => this.openShopModal(false);
    document.getElementById('shop-toggle')?.addEventListener('click', openShop);
    document.getElementById('btn-open-shop-start')?.addEventListener('click', openShop);
    document.getElementById('btn-open-shop-fail')?.addEventListener('click', openShop);
    document.getElementById('btn-close-shop')?.addEventListener('click', () => this.closeShopModal());

    document.querySelectorAll('.shop-tab').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        document.querySelectorAll('.shop-tab').forEach((b) => b.classList.remove('active'));
        tabBtn.classList.add('active');
        this.currentShopTab = tabBtn.dataset.tab;
        this.renderShopItems();
      });
    });

    // 인게임 퀵 아이템 버튼
    document.getElementById('btn-use-rocket')?.addEventListener('click', () => this.useRocketBoostItem());
    document.getElementById('btn-use-slow')?.addEventListener('click', () => this.useSlowStaminaItem());
    document.getElementById('btn-use-compass')?.addEventListener('click', () => this.useCompassItem());
    document.getElementById('btn-use-magnet')?.addEventListener('click', () => this.useDoubleCoinItem());

    // 퀴즈 내 기능 아이템 버튼 (시간 +30초 / 힌트 보기 / 즉시 정답 패스)
    document.getElementById('btn-quiz-add-time')?.addEventListener('click', () => this.useQuizAddTimeItem());
    document.getElementById('btn-quiz-show-hint')?.addEventListener('click', () => this.useQuizHintItem());
    document.getElementById('btn-quiz-pass')?.addEventListener('click', () => this.useQuizPassItem());

    // 프리셋 버튼 클릭 및 직접 입력 동기화
    const presetBtns = document.querySelectorAll('#interval-presets .preset-btn');
    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = Number(btn.dataset.val);
        if (this.elCustomIntervalInput) this.elCustomIntervalInput.value = val;
        this.updateOptionsPreview(val);
      });
    });

    this.elCustomIntervalInput?.addEventListener('input', () => {
      const val = Math.min(999, Math.max(1, Number(this.elCustomIntervalInput.value) || 1));
      this.updateOptionsPreview(val);
    });

    // 사운드 토글
    const soundBtn = document.getElementById('sound-toggle');
    soundBtn?.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      soundBtn.textContent = sfx.enabled ? '🔊' : '🔇';
    });

    // 조작 버튼 (방향전환 / 오르기)
    const btnTurn = document.getElementById('btn-turn');
    const btnClimb = document.getElementById('btn-climb');

    btnTurn?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.state !== 'PLAYING') return;
      this.handleAction('TURN');
    });

    btnClimb?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.state !== 'PLAYING') return;
      this.handleAction('CLIMB');
    });

    // 퀴즈 모달 배경이나 문제버튼 외 영역(특히 기존 방향전환/오르기 버튼이 있던 하단 영역)을 눌렀을 때 절대 오작동하지 않도록 차단!
    this.elQuizModal?.addEventListener('pointerdown', (e) => {
      const targetBtn = e.target.closest('.choice-btn, .quiz-item-btn');
      if (!targetBtn) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
    this.elQuizModal?.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.choice-btn, .quiz-item-btn');
      if (!targetBtn) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    // 키보드 조작
    window.addEventListener('keydown', (e) => {
      // 입력창 포커스 중이거나 닉네임/랭킹/상점/옵션 모달이 열려 있을 때는 스페이스/엔터 단축키 무시
      if (
        document.activeElement?.tagName === 'INPUT' ||
        this.elNicknameModal?.classList.contains('active') ||
        this.elRankingModal?.classList.contains('active') ||
        this.elShopModal?.classList.contains('active') ||
        this.elOptionsModal?.classList.contains('active')
      ) {
        return;
      }

      if (this.state === 'QUIZ') {
        // 계단 등반 키(Space, Enter, J, F, 화살표 등) 연타 시 포커스된 버튼이 눌리는 현상 완전 차단!
        e.preventDefault();
        e.stopPropagation();
        if (performance.now() < this.quizUnlockTime) return;
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = Number(e.key) - 1;
          if (this.activeQuiz && this.activeQuiz.choices[idx] !== undefined) {
            this.checkQuizAnswer(this.activeQuiz.choices[idx]);
          }
        }
        return;
      }

      if (this.state === 'START' && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        this.startGame();
        return;
      }

      if (this.state === 'FAIL' && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        this.startGame();
        return;
      }

      if (this.state !== 'PLAYING') return;

      if (e.code === 'KeyJ' || e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        e.preventDefault();
        btnClimb.classList.add('pressed');
        setTimeout(() => btnClimb.classList.remove('pressed'), 90);
        this.handleAction('CLIMB');
      } else if (e.code === 'KeyF' || e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'ArrowLeft') {
        e.preventDefault();
        btnTurn.classList.add('pressed');
        setTimeout(() => btnTurn.classList.remove('pressed'), 90);
        this.handleAction('TURN');
      }
    });
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  showBanner(title, detail, duration = 3000) {
    this.elEvoTitle.textContent = title;
    this.elEvoDetail.textContent = detail;
    this.elEvoBanner.classList.remove('hidden');
    if (this.bannerTimeout) clearTimeout(this.bannerTimeout);
    this.bannerTimeout = setTimeout(() => {
      this.elEvoBanner.classList.add('hidden');
    }, duration);
  }

  // 옵션 모달
  openOptionsModal() {
    if (this.state === 'QUIZ' || this.state === 'FALLING') return;
    if (this.state !== 'PAUSED' && this.state !== 'SHOP') {
      this.prevStateBeforeModal = this.state;
      this.state = 'PAUSED';
    }
    this.elCustomIntervalInput.value = this.quizInterval;
    this.updateOptionsPreview(this.quizInterval);
    this.elOptionsModal.classList.add('active');
  }

  closeOptionsModal() {
    this.elOptionsModal.classList.remove('active');
    if (this.state === 'PAUSED') {
      this.state = this.prevStateBeforeModal;
    }
  }

  saveOptionsModal() {
    const rawVal = Number(this.elCustomIntervalInput.value);
    const newInterval = Math.min(999, Math.max(1, Math.floor(rawVal || 20)));
    this.quizInterval = newInterval;
    localStorage.setItem('2jun_quiz_interval_v2', String(this.quizInterval));
    this.savePersistentData();
    this.syncIntervalLabels();
    this.updateHUD();
    this.closeOptionsModal();
  }

  updateOptionsPreview(val) {
    const cleanVal = Math.min(999, Math.max(1, Math.floor(Number(val) || 20)));
    const presetBtns = document.querySelectorAll('#interval-presets .preset-btn');
    presetBtns.forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.val) === cleanVal);
    });
    this.elOptionsPreviewText.textContent =
      `${cleanVal}계단마다 시험 출현! 1문제 정답 시 IQ +10 (IQ ~50: 초1 / ~100: 초2 / ~150: 초3 / ~200: 초4 / ~250: 초5 / 260+: 초6)`;
  }

  syncIntervalLabels() {
    document.querySelectorAll('.quiz-interval-label').forEach((el) => {
      el.textContent = `${this.quizInterval}계단`;
    });
  }

  // ==================== 닉네임 & 실시간 랭킹 시스템 (Firebase Realtime DB 연동) ====================
  normalizeNickname(raw) {
    return String(raw || '')
      .normalize('NFC')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim()
      .slice(0, 12);
  }

  toFirebaseKey(nick) {
    const clean = this.normalizeNickname(nick);
    if (!clean) return '';
    // Firebase Realtime DB 키 금지 문자(. $ # [ ] / 및 제어문자)를 안전하게 치환
    return clean.replace(/[.$#[\]/\x00-\x1F\x7F]/g, '_');
  }

  loadLocalRankings() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem('2jun_rankings_v1') || 'null');
    } catch (_) {
      saved = null;
    }
    this.rankingsMap = {};
    if (saved && typeof saved === 'object') {
      Object.values(saved).forEach((item) => {
        if (!item || typeof item.nick !== 'string') return;
        const cNick = this.normalizeNickname(item.nick);
        if (!cNick) return;
        const prev = this.rankingsMap[cNick];
        const s = Math.max(prev?.stair || 0, Math.floor(Number(item.stair) || 0));
        const q = Math.max(prev?.iq || 0, Math.floor(Number(item.iq) || 0));
        this.rankingsMap[cNick] = {
          nick: cNick,
          stair: s,
          iq: q,
          updatedAt: Number(item.updatedAt) || Date.now()
        };
      });
    }

    if (this.nickname) {
      const existing = this.rankingsMap[this.nickname];
      if (existing) {
        this.bestStair = Math.max(this.bestStair, Number(existing.stair) || 0);
        this.bestIQ = Math.max(this.bestIQ, Number(existing.iq) || 0);
        localStorage.setItem('2jun_best_stair', String(this.bestStair));
        localStorage.setItem('2jun_best_iq', String(this.bestIQ));
      }
      this.rankingsMap[this.nickname] = {
        nick: this.nickname,
        stair: this.bestStair,
        iq: this.bestIQ,
        updatedAt: existing?.updatedAt || Date.now()
      };
      this.saveLocalRankings();
    }
  }

  saveLocalRankings() {
    try {
      localStorage.setItem('2jun_rankings_v1', JSON.stringify(this.rankingsMap));
    } catch (_) {}
  }

  openNicknameModal(isInitial = false) {
    if (!this.elNicknameModal) return;
    if (this.elNicknameInput) {
      this.elNicknameInput.value = this.nickname || '';
    }
    if (this.elNicknameError) {
      this.elNicknameError.classList.add('hidden');
    }
    const cancelBtn = document.getElementById('btn-cancel-nickname');
    if (cancelBtn) {
      if (isInitial && !this.nickname) {
        cancelBtn.classList.add('hidden');
      } else {
        cancelBtn.classList.remove('hidden');
      }
    }
    this.elNicknameModal.classList.add('active');
    setTimeout(() => {
      this.elNicknameInput?.focus();
    }, 80);
  }

  closeNicknameModal() {
    if (!this.nickname) return;
    this.elNicknameModal?.classList.remove('active');
  }

  saveNicknameModal() {
    const cleanNick = this.normalizeNickname(this.elNicknameInput?.value || '');
    if (!cleanNick) {
      if (this.elNicknameError) {
        this.elNicknameError.textContent = '닉네임을 1글자 이상 입력해주세요!';
        this.elNicknameError.classList.remove('hidden');
      }
      this.elNicknameInput?.focus();
      return;
    }

    const wasFirstRegistration = !this.nickname;
    const isSameNick = this.nickname === cleanNick;
    const prevNick = this.nickname;

    if (prevNick && !isSameNick) {
      // 이전 사용자의 현재 로컬 상태를 이전 사용자 전용 캐시에 안전하게 보관
      this.saveLocalCacheOnly(prevNick);
    }

    this.nickname = cleanNick;
    localStorage.setItem('2jun_nickname', this.nickname);

    const existingRecord = this.rankingsMap[this.nickname];
    if (existingRecord) {
      // 이미 등록된 닉네임이면 해당 닉네임의 최고 스코어 복원
      this.bestStair = wasFirstRegistration
        ? Math.max(this.bestStair, Number(existingRecord.stair) || 0)
        : Number(existingRecord.stair) || 0;
      this.bestIQ = wasFirstRegistration
        ? Math.max(this.bestIQ, Number(existingRecord.iq) || 0)
        : Number(existingRecord.iq) || 0;
    } else if (!wasFirstRegistration && !isSameNick) {
      // 다른 사람의 새 닉네임으로 변경한 경우 0계단부터 측정
      this.bestStair = 0;
      this.bestIQ = 0;
    }

    localStorage.setItem('2jun_best_stair', String(this.bestStair));
    localStorage.setItem('2jun_best_iq', String(this.bestIQ));
    if (this.elBestCount) this.elBestCount.textContent = this.bestStair;

    if (!wasFirstRegistration && !isSameNick) {
      // 다른 사용자로 전환한 경우: 해당 사용자의 로컬 캐시를 로드 (없으면 0/빈 인벤토리로 시작)
      this.loadPersistentData(this.nickname);
    }

    this.hasUnsyncedBest = true;
    this.updateRankingEntry(this.nickname, this.bestStair, this.bestIQ, true);
    this.elNicknameModal?.classList.remove('active');
    this.updateHUD();
    this.syncPersistentDataWithFirebase(this.nickname);
    this.fetchOnlineRankings(false);
  }

  updateRankingEntry(nick, stair, iq, pushOnline = false) {
    const cleanNick = this.normalizeNickname(nick);
    if (!cleanNick) return;

    const prev = this.rankingsMap[cleanNick];
    const nextStair = Math.max(prev?.stair || 0, Math.floor(Number(stair) || 0));
    const nextIQ = Math.max(prev?.iq || 0, Math.floor(Number(iq) || 0));
    const isImproved =
      !prev ||
      nextStair > (prev.stair || 0) ||
      (nextStair === (prev.stair || 0) && nextIQ > (prev.iq || 0));

    this.rankingsMap[cleanNick] = {
      nick: cleanNick,
      stair: nextStair,
      iq: nextIQ,
      updatedAt: isImproved ? Date.now() : prev?.updatedAt || Date.now()
    };

    if (cleanNick === this.nickname) {
      this.bestStair = nextStair;
      this.bestIQ = nextIQ;
      localStorage.setItem('2jun_best_stair', String(this.bestStair));
      localStorage.setItem('2jun_best_iq', String(this.bestIQ));
      if (this.elBestCount) this.elBestCount.textContent = this.bestStair;
      if (isImproved) {
        this.hasUnsyncedBest = true;
      }
    }

    this.saveLocalRankings();
    this.renderRankingBoards();

    if (pushOnline) {
      this.postScoreOnline(this.rankingsMap[cleanNick], true);
    }
  }

  async postScoreOnline(entry, force = false) {
    if (!entry || !entry.nick) return false;
    const cleanNick = this.normalizeNickname(entry.nick);
    const fbKey = this.toFirebaseKey(cleanNick);
    if (!cleanNick || !fbKey) return false;

    const serverPrev = this.onlineServerMap[cleanNick];
    const stair = Math.max(
      serverPrev?.stair || 0,
      Math.max(0, Math.floor(Number(entry.stair) || 0))
    );
    const iq = Math.max(
      serverPrev?.iq || 0,
      Math.max(0, Math.floor(Number(entry.iq) || 0))
    );
    if (stair <= 0 && !force) return false;

    const postKey = `${cleanNick}:${stair}:${iq}`;
    if (!force && this.lastPostedKey === postKey) return true;

    const nowTs = entry.updatedAt || Date.now();
    const recordSummary = {
      nick: cleanNick,
      stair,
      iq,
      updatedAt: nowTs
    };

    // 현재 플레이 중인 본인 닉네임인 경우, 랭킹 점수뿐만 아니라 로컬스토리지의 모든 항목(coins, counts, unlocked, equipped, quizInterval)을 해당 닉네임 하위에 함께 PATCH 저장
    let firebaseBodyObj = recordSummary;
    if (cleanNick === this.nickname) {
      this.bestStair = Math.max(this.bestStair || 0, stair);
      this.bestIQ = Math.max(this.bestIQ || 0, iq);
      firebaseBodyObj = {
        ...this.buildUserNodePayload(cleanNick),
        nick: cleanNick,
        stair,
        iq,
        updatedAt: nowTs
      };
    }

    if (this.firebaseDbUrl) {
      const controller = new AbortController();
      const timer = setTimeout(() => {
        try {
          controller.abort();
        } catch (_) {}
      }, 4500);
      try {
        const fbUrl = `${this.firebaseDbUrl}/rankings/${encodeURIComponent(fbKey)}.json`;
        const res = await fetch(fbUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          cache: 'no-store',
          keepalive: true,
          signal: controller.signal,
          body: JSON.stringify(firebaseBodyObj)
        });
        clearTimeout(timer);
        if (res && res.ok) {
          this.lastPostedKey = postKey;
          this.hasUnsyncedBest = false;
          this.lastPostTime = Date.now();
          this.onlineServerMap[cleanNick] = recordSummary;
          this.rankingsMap[cleanNick] = recordSummary;
          return true;
        }
      } catch (_) {
        clearTimeout(timer);
      }
    }

    return false;
  }

  mergeIncomingRankRecord(rawNick, rawStair, rawIQ, rawTs, targetServerMap = null) {
    const rNick = this.normalizeNickname(rawNick);
    if (!rNick) return;
    const rStair = Math.max(0, Math.floor(Number(rawStair) || 0));
    const rIQ = Math.max(0, Math.floor(Number(rawIQ) || 0));
    const rTs = Number(rawTs) || Date.now();

    if (targetServerMap) {
      const prevOnline = targetServerMap[rNick];
      if (
        !prevOnline ||
        rStair > (prevOnline.stair || 0) ||
        (rStair === (prevOnline.stair || 0) && rIQ > (prevOnline.iq || 0))
      ) {
        targetServerMap[rNick] = {
          nick: rNick,
          stair: Math.max(prevOnline?.stair || 0, rStair),
          iq: Math.max(prevOnline?.iq || 0, rIQ),
          updatedAt: rTs
        };
      }
    }

    const prevServer = this.onlineServerMap[rNick];
    if (
      !prevServer ||
      rStair > (prevServer.stair || 0) ||
      (rStair === (prevServer.stair || 0) && rIQ > (prevServer.iq || 0))
    ) {
      this.onlineServerMap[rNick] = {
        nick: rNick,
        stair: Math.max(prevServer?.stair || 0, rStair),
        iq: Math.max(prevServer?.iq || 0, rIQ),
        updatedAt: rTs
      };
    }

    const prev = this.rankingsMap[rNick];
    if (
      !prev ||
      rStair > (prev.stair || 0) ||
      (rStair === (prev.stair || 0) && rIQ > (prev.iq || 0))
    ) {
      this.rankingsMap[rNick] = {
        nick: rNick,
        stair: Math.max(prev?.stair || 0, rStair),
        iq: Math.max(prev?.iq || 0, rIQ),
        updatedAt: rTs
      };
    }
  }

  parseNdjsonRankingText(text, targetServerMap = null) {
    if (!text) return 0;
    let parsedCount = 0;
    const lines = text.split('\n');
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        const evt = JSON.parse(trimmed);
        if (evt && evt.event === 'message' && evt.message) {
          const data = JSON.parse(evt.message);
          if (!data || typeof data !== 'object') return;
          const msgTs = Number(data.ts) || (evt.time ? evt.time * 1000 : Date.now());

          if (typeof data.nick === 'string' && data.nick.trim()) {
            this.mergeIncomingRankRecord(data.nick, data.stair, data.iq, msgTs, targetServerMap);
            parsedCount++;
          }

          if (Array.isArray(data.top)) {
            data.top.forEach((item) => {
              if (Array.isArray(item) && item.length >= 2) {
                this.mergeIncomingRankRecord(item[0], item[1], item[2] || 0, msgTs, targetServerMap);
                parsedCount++;
              } else if (item && typeof item === 'object') {
                this.mergeIncomingRankRecord(
                  item.n || item.nick,
                  item.s ?? item.stair,
                  item.q ?? item.iq,
                  item.u || msgTs,
                  targetServerMap
                );
                parsedCount++;
              }
            });
          }
        }
      } catch (_) {}
    });
    return parsedCount;
  }

  async fetchJsonWithTimeout(url, timeoutMs = 4500) {
    const controller = new AbortController();
    this.activeFetchController = controller;
    const timer = setTimeout(() => {
      try {
        controller.abort();
      } catch (_) {}
    }, timeoutMs);
    try {
      const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!res) return { ok: false, status: 0, data: null };
      if (!res.ok) return { ok: false, status: res.status, data: null };
      const data = await res.json();
      return { ok: true, status: res.status, data };
    } catch (_) {
      clearTimeout(timer);
      try {
        controller.abort();
      } catch (_) {}
      return { ok: false, status: 0, data: null };
    }
  }

  // 스트림이 닫히지 않거나 네트워크 지연 시에도 '갱신중'에서 절대 멈추지 않도록 타임아웃 + 유휴(idle) 청크 리더 적용
  async fetchNdjsonWithTimeout(url, totalTimeoutMs = 3500, idleTimeoutMs = 550) {
    const controller = new AbortController();
    this.activeFetchController = controller;
    let totalTimer = null;
    let idleTimer = null;

    const clearTimers = () => {
      if (totalTimer) clearTimeout(totalTimer);
      if (idleTimer) clearTimeout(idleTimer);
    };

    try {
      const fetchPromise = fetch(url, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal
      });

      const timeoutPromise = new Promise((_, reject) => {
        totalTimer = setTimeout(() => {
          try {
            controller.abort();
          } catch (_) {}
          reject(new Error('FETCH_TIMEOUT'));
        }, totalTimeoutMs);
      });

      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (!res || !res.ok) {
        clearTimers();
        return { ok: false, status: res ? res.status : 0, text: '' };
      }

      if (res.body && typeof res.body.getReader === 'function') {
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let text = '';

        while (true) {
          const readResult = await Promise.race([
            reader.read(),
            new Promise((resolve) => {
              if (idleTimer) clearTimeout(idleTimer);
              const waitMs = text.length > 0 ? idleTimeoutMs : totalTimeoutMs;
              idleTimer = setTimeout(
                () => resolve({ done: true, value: undefined, idleTimedOut: true }),
                waitMs
              );
            })
          ]);

          if (readResult.idleTimedOut) {
            try {
              reader.cancel();
            } catch (_) {}
            break;
          }

          if (readResult.value) {
            text += decoder.decode(readResult.value, { stream: true });
          }

          if (readResult.done) {
            text += decoder.decode();
            break;
          }
        }

        clearTimers();
        return { ok: true, status: res.status, text };
      }

      const text = await Promise.race([
        res.text(),
        new Promise((_, reject) => {
          idleTimer = setTimeout(() => reject(new Error('TEXT_TIMEOUT')), totalTimeoutMs);
        })
      ]);
      clearTimers();
      return { ok: true, status: res.status, text };
    } catch (_) {
      clearTimers();
      try {
        controller.abort();
      } catch (_) {}
      return { ok: false, status: 0, text: '' };
    }
  }

  async fetchOnlineRankings(showFeedback = false) {
    const syncBadge = document.getElementById('ranking-sync-badge');
    const refreshBtn = document.getElementById('btn-refresh-ranking');
    const refreshStartBtn = document.getElementById('btn-refresh-ranking-start');

    const setRefreshingUI = () => {
      if (showFeedback) {
        if (refreshBtn) {
          refreshBtn.textContent = '⏳ 갱신중...';
          refreshBtn.disabled = true;
        }
        if (refreshStartBtn) {
          refreshStartBtn.textContent = '⏳ 갱신중';
          refreshStartBtn.disabled = true;
        }
      }
      if (syncBadge) {
        syncBadge.textContent = '동기화중';
        syncBadge.classList.add('syncing');
        syncBadge.classList.remove('offline');
      }
    };

    const resetRefreshButtonsUI = (wasManual, succeeded) => {
      if (wasManual) {
        const doneLabelModal = succeeded ? '✅ 갱신완료' : '🔄 새로고침';
        const doneLabelStart = succeeded ? '✅ 완료' : '🔄 갱신';
        if (refreshBtn) {
          refreshBtn.textContent = doneLabelModal;
          refreshBtn.disabled = false;
        }
        if (refreshStartBtn) {
          refreshStartBtn.textContent = doneLabelStart;
          refreshStartBtn.disabled = false;
        }
        if (succeeded) {
          if (this.refreshBtnResetTimer) clearTimeout(this.refreshBtnResetTimer);
          this.refreshBtnResetTimer = setTimeout(() => {
            if (refreshBtn) refreshBtn.textContent = '🔄 새로고침';
            if (refreshStartBtn) refreshStartBtn.textContent = '🔄 갱신';
          }, 850);
        }
      } else {
        if (refreshBtn) {
          refreshBtn.textContent = '🔄 새로고침';
          refreshBtn.disabled = false;
        }
        if (refreshStartBtn) {
          refreshStartBtn.textContent = '🔄 갱신';
          refreshStartBtn.disabled = false;
        }
      }
    };

    if (this.activeFetchPromise) {
      if (showFeedback) {
        setRefreshingUI();
        if (Date.now() - this.activeFetchStartTime > 2000 && this.activeFetchController) {
          try {
            this.activeFetchController.abort();
          } catch (_) {}
          this.activeFetchPromise = null;
        } else {
          try {
            await this.activeFetchPromise;
          } finally {
            resetRefreshButtonsUI(true, true);
          }
          return;
        }
      } else {
        return this.activeFetchPromise;
      }
    }

    setRefreshingUI();
    this.activeFetchStartTime = Date.now();

    const runFetch = async () => {
      let anySuccess = false;
      let fbPermissionDenied = false;

      try {
        const cacheBuster = Date.now();
        // 1) Firebase Realtime Database에서 전체 랭킹 조회 (단일 진실 공급원)
        const fbRes = await this.fetchJsonWithTimeout(
          `${this.firebaseDbUrl}/rankings.json?_t=${cacheBuster}`,
          4500
        );

        if (fbRes.status === 401 || fbRes.status === 403) {
          fbPermissionDenied = true;
          console.warn(
            '[랭킹] Firebase Realtime Database가 잠금 모드(권한 거부)입니다. Firebase 콘솔 > 규칙(Rules)에서 rankings 읽기/쓰기를 허용해주세요.'
          );
        }

        if (fbRes.ok) {
          anySuccess = true;
          const firebaseMap = {};
          const rawData = fbRes.data;
          if (rawData && typeof rawData === 'object') {
            Object.entries(rawData).forEach(([key, item]) => {
              if (!item || typeof item !== 'object') return;
              if (key.startsWith('__') || item.isPlayerData) return;
              const cNick = this.normalizeNickname(item.nick || key);
              if (!cNick || cNick.startsWith('__')) return;
              const s = Math.max(0, Math.floor(Number(item.stair) || 0));
              const q = Math.max(0, Math.floor(Number(item.iq) || 0));
              const ts = Number(item.updatedAt) || Date.now();
              const prev = firebaseMap[cNick];
              if (!prev || s > prev.stair || (s === prev.stair && q > prev.iq)) {
                firebaseMap[cNick] = {
                  nick: cNick,
                  stair: Math.max(prev?.stair || 0, s),
                  iq: Math.max(prev?.iq || 0, q),
                  updatedAt: ts
                };
              }

              // 현재 활성 사용자의 닉네임 노드에 저장된 아이템/코인 데이터 동기화 반영
              if (this.nickname && cNick === this.nickname) {
                const remoteFields = this.extractRemotePlayerFields(item);
                if (remoteFields) {
                  const migKey = `2jun_fb_node_migrated_v3_${this.toFirebaseKey(cNick)}`;
                  const isMigrated = localStorage.getItem(migKey) === '1';
                  if (!isMigrated) {
                    this.applyRemotePersistentData(remoteFields, true);
                  } else if (Number(remoteFields.updatedAt || 0) > this.localDataUpdatedAt && !this.hasUnsyncedItems) {
                    this.applyRemotePersistentData(remoteFields, false);
                  }
                }
              }
            });
          }

          // 아이템·코인·장착 정보도 함께 Firebase DB와 동기화
          await this.syncPersistentDataWithFirebase();

          // 2) 최초 1회(또는 Firebase DB가 비어있을 때) 기존 로컬/ntfy 기록을 Firebase로 자동 이관하여 기존 도전자 기록 완벽 보존
          const alreadyMigrated = localStorage.getItem('2jun_fb_migrated_v1') === '1';
          if (!alreadyMigrated || Object.keys(firebaseMap).length === 0) {
            if (Object.keys(firebaseMap).length < 2 && !this.legacyRankingFetched) {
              this.legacyRankingFetched = true;
              const [resV2, resV1] = await Promise.all([
                this.fetchNdjsonWithTimeout(
                  `${this.rankingEndpoint}/json?poll=1&since=all&_t=${cacheBuster}`,
                  2800,
                  450
                ),
                this.fetchNdjsonWithTimeout(
                  `${this.legacyRankingEndpoint}/json?poll=1&since=all&_t=${cacheBuster}`,
                  2800,
                  450
                )
              ]);
              if (resV2.ok) this.parseNdjsonRankingText(resV2.text, null);
              if (resV1.ok) this.parseNdjsonRankingText(resV1.text, null);
            }

            const patchPayload = {};
            Object.values(this.rankingsMap).forEach((localItem) => {
              if (!localItem || !localItem.nick) return;
              const cNick = this.normalizeNickname(localItem.nick);
              const fbKey = this.toFirebaseKey(cNick);
              if (!cNick || !fbKey) return;
              const lStair = Math.max(0, Math.floor(Number(localItem.stair) || 0));
              const lIQ = Math.max(0, Math.floor(Number(localItem.iq) || 0));
              if (lStair <= 0 && cNick !== this.nickname) return;

              const fbExisting = firebaseMap[cNick];
              if (
                !fbExisting ||
                lStair > fbExisting.stair ||
                (lStair === fbExisting.stair && lIQ > fbExisting.iq)
              ) {
                const mergedRec = {
                  nick: cNick,
                  stair: Math.max(fbExisting?.stair || 0, lStair),
                  iq: Math.max(fbExisting?.iq || 0, lIQ),
                  updatedAt: localItem.updatedAt || Date.now()
                };
                patchPayload[fbKey] = mergedRec;
                firebaseMap[cNick] = mergedRec;
              }
            });

            if (Object.keys(patchPayload).length > 0) {
              try {
                const patchRes = await fetch(`${this.firebaseDbUrl}/rankings.json`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                  cache: 'no-store',
                  body: JSON.stringify(patchPayload)
                });
                if (patchRes && patchRes.ok) {
                  localStorage.setItem('2jun_fb_migrated_v1', '1');
                }
              } catch (_) {}
            } else {
              localStorage.setItem('2jun_fb_migrated_v1', '1');
            }
          }

          // 3) 내 로컬 최고 기록과 Firebase 서버 기록 양방향 동기화
          if (this.nickname) {
            const myFbRec = firebaseMap[this.nickname];
            if (
              myFbRec &&
              (myFbRec.stair > this.bestStair ||
                (myFbRec.stair === this.bestStair && myFbRec.iq > this.bestIQ))
            ) {
              this.bestStair = Math.max(this.bestStair, myFbRec.stair);
              this.bestIQ = Math.max(this.bestIQ, myFbRec.iq);
              localStorage.setItem('2jun_best_stair', String(this.bestStair));
              localStorage.setItem('2jun_best_iq', String(this.bestIQ));
              if (this.elBestCount) this.elBestCount.textContent = this.bestStair;
            }

            const isMyLocalHigherOrMissing =
              !myFbRec ||
              this.bestStair > (myFbRec.stair || 0) ||
              (this.bestStair === (myFbRec.stair || 0) && this.bestIQ > (myFbRec.iq || 0));

            if (
              this.hasUnsyncedBest ||
              (isMyLocalHigherOrMissing && (this.bestStair > 0 || showFeedback))
            ) {
              const myEntry = {
                nick: this.nickname,
                stair: this.bestStair,
                iq: this.bestIQ,
                updatedAt: Date.now()
              };
              const posted = await this.postScoreOnline(myEntry, true);
              if (posted) {
                firebaseMap[this.nickname] = myEntry;
              }
            }
          }

          // 4) 모든 사용자가 100% 동일한 랭킹을 보도록 Firebase 데이터를 기준으로 rankingsMap 교체
          this.onlineServerMap = { ...firebaseMap };
          this.rankingsMap = { ...firebaseMap };
          if (this.nickname && !this.rankingsMap[this.nickname]) {
            this.rankingsMap[this.nickname] = {
              nick: this.nickname,
              stair: this.bestStair,
              iq: this.bestIQ,
              updatedAt: Date.now()
            };
          }
        }

        this.saveLocalRankings();
        this.renderRankingBoards();

        if (syncBadge) {
          syncBadge.classList.remove('syncing');
          if (anySuccess) {
            syncBadge.textContent = '실시간 연동됨';
            syncBadge.classList.remove('offline');
          } else if (fbPermissionDenied) {
            syncBadge.textContent = 'DB 잠금해제 필요';
            syncBadge.classList.add('offline');
          } else {
            syncBadge.textContent = '로컬 저장됨';
            syncBadge.classList.add('offline');
          }
        }
      } catch (_) {
        if (syncBadge) {
          syncBadge.textContent = '로컬 저장됨';
          syncBadge.classList.remove('syncing');
          syncBadge.classList.add('offline');
        }
      } finally {
        this.saveLocalRankings();
        this.renderRankingBoards();
        resetRefreshButtonsUI(showFeedback, anySuccess);
      }
    };

    const p = runFetch();
    this.activeFetchPromise = p;
    try {
      await p;
    } finally {
      if (this.activeFetchPromise === p) {
        this.activeFetchPromise = null;
      }
    }
  }

  getSortedRankings() {
    const list = Object.values(this.rankingsMap).filter(
      (item) => item && typeof item.nick === 'string' && item.nick.trim().length > 0
    );
    list.sort((a, b) => {
      if ((b.stair || 0) !== (a.stair || 0)) return (b.stair || 0) - (a.stair || 0);
      if ((b.iq || 0) !== (a.iq || 0)) return (b.iq || 0) - (a.iq || 0);
      return (a.updatedAt || 0) - (b.updatedAt || 0);
    });
    return list;
  }

  renderRankingBoards() {
    const sorted = this.getSortedRankings();
    const myIndex = this.nickname ? sorted.findIndex((r) => r.nick === this.nickname) : -1;
    const myRank = myIndex >= 0 ? myIndex + 1 : null;

    // 1) 시작 화면 닉네임 및 내 기록 요약
    const startNickEl = document.getElementById('start-current-nick');
    if (startNickEl) {
      startNickEl.textContent = this.nickname || '미등록';
    }

    const startSummaryEl = document.getElementById('start-my-rank-summary');
    if (startSummaryEl) {
      if (this.nickname) {
        const rankStr = myRank ? `현재 <strong>${myRank}위</strong> / 총 ${sorted.length}명` : '순위 집계중';
        startSummaryEl.innerHTML = `
          <span>🏅 <strong>${this.escapeHTML(this.nickname)}</strong>님 최고: <strong>${this.bestStair}계단</strong> (IQ ${this.bestIQ})</span>
          <span>${rankStr}</span>
        `;
      } else {
        startSummaryEl.innerHTML = `<span>닉네임을 입력하면 내 최고 스코어와 순위가 기록됩니다!</span>`;
      }
    }

    // 2) 시작 화면 내장 랭킹 리스트 렌더링
    const startListEl = document.getElementById('start-ranking-list');
    if (startListEl) {
      this.populateRankingListDOM(startListEl, sorted, 30);
    }

    // 3) 전체 랭킹 모달 내 기록 배너 & 전체 리스트 렌더링
    const modalMyRankBox = document.getElementById('modal-my-rank-box');
    if (modalMyRankBox) {
      if (this.nickname) {
        const rankText = myRank ? `🏆 전체 ${myRank}위 (총 ${sorted.length}명)` : '순위 집계중';
        modalMyRankBox.innerHTML = `
          <div>👤 <strong>${this.escapeHTML(this.nickname)}</strong>님의 최고 기록</div>
          <div><strong>${this.bestStair}계단</strong> (최고 IQ ${this.bestIQ}) · <strong>${rankText}</strong></div>
        `;
      } else {
        modalMyRankBox.innerHTML = `<div>닉네임을 먼저 등록해주세요!</div>`;
      }
    }

    const modalListEl = document.getElementById('modal-ranking-list');
    if (modalListEl) {
      this.populateRankingListDOM(modalListEl, sorted, 100);
    }

    // 4) 추락(다시시작) 팝업 내 최고 기록 & 순위 표시 업데이트
    const failBestEl = document.getElementById('fail-best-stair');
    if (failBestEl) failBestEl.textContent = this.bestStair;
    const failRankEl = document.getElementById('fail-my-rank');
    if (failRankEl) {
      failRankEl.textContent = myRank ? `현재 랭킹 ${myRank}위 / ${sorted.length}명` : '랭킹 등록 완료';
    }
  }

  populateRankingListDOM(container, sortedList, limit = 50) {
    container.innerHTML = '';
    if (!sortedList || sortedList.length === 0) {
      container.innerHTML = `<div class="ranking-empty">아직 등록된 랭킹 기록이 없습니다.<br/>첫 번째 1위 주인공이 되어보세요!</div>`;
      return;
    }

    const slice = sortedList.slice(0, limit);
    slice.forEach((item, idx) => {
      const rank = idx + 1;
      const isMe = this.nickname && item.nick === this.nickname;
      const stageIdx = getStageIndexForIQ(item.iq || 0);
      const stage = STAGES[stageIdx] || STAGES[0];
      const gradeNum = getGradeForIQ(item.iq || 0);

      let medal = `${rank}위`;
      if (rank === 1) medal = '🥇 1위';
      else if (rank === 2) medal = '🥈 2위';
      else if (rank === 3) medal = '🥉 3위';

      const row = document.createElement('div');
      row.className = `ranking-row${rank <= 3 ? ` rank-top-${rank}` : ''}${isMe ? ' is-me' : ''}`;
      row.innerHTML = `
        <div class="rank-left">
          <span class="rank-num">${medal}</span>
          <span class="rank-nick">${this.escapeHTML(item.nick)}</span>
          ${isMe ? '<span class="me-tag">나</span>' : ''}
          <span class="rank-stage-pill">${stage.emoji} 초${gradeNum}</span>
        </div>
        <div class="rank-right">
          <span class="rank-stair-score">${item.stair || 0}계단</span>
          <span class="rank-iq-sub">IQ ${item.iq || 0}</span>
        </div>
      `;
      container.appendChild(row);
    });
  }

  escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  openRankingModal() {
    if (!this.elRankingModal) return;
    this.renderRankingBoards();
    this.elRankingModal.classList.add('active');
    this.fetchOnlineRankings(true);
  }

  closeRankingModal() {
    this.elRankingModal?.classList.remove('active');
  }

  // 아이템 상점 모달 (학년 승급 시 자동 오픈 또는 버튼 클릭 오픈)
  openShopModal(isGradeUpPromotion = false, newGrade = null) {
    if (this.state === 'QUIZ' || this.state === 'FALLING') return;
    if (this.state !== 'SHOP' && this.state !== 'PAUSED') {
      this.prevStateBeforeModal = this.state;
      this.state = 'SHOP';
    }
    const ribbon = document.getElementById('shop-ribbon-text');
    const title = document.getElementById('shop-title-text');
    if (isGradeUpPromotion && newGrade) {
      ribbon.textContent = `🎉 축하합니다! 초등학교 ${newGrade}학년 진급 기념!`;
      title.textContent = `초${newGrade} 진급 축하 아이템 상점`;
    } else {
      ribbon.textContent = '🏪 천재 만물 아이템 상점';
      title.textContent = '아이템 상점';
    }
    this.renderShopItems();
    this.elShopModal.classList.add('active');
    this.syncPersistentDataWithFirebase();
  }

  closeShopModal() {
    this.elShopModal.classList.remove('active');
    if (this.state === 'SHOP') {
      this.state = this.prevStateBeforeModal;
    }
    this.updateHUD();
  }

  renderShopItems() {
    document.getElementById('shop-coin-amount').textContent = this.coins;
    const container = document.getElementById('shop-items-container');
    container.innerHTML = '';

    const items = SHOP_ITEMS[this.currentShopTab] || [];
    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'shop-item-row';

      if (this.currentShopTab === 'func') {
        const ownedCount = this.inventory[item.id] || 0;
        row.innerHTML = `
          <div class="shop-item-icon">${item.icon}</div>
          <div class="shop-item-info">
            <div class="shop-item-title">
              <span>${item.name}</span>
              <span class="shop-owned-badge">보유: ${ownedCount}개</span>
            </div>
            <div class="shop-item-desc">${item.desc}</div>
          </div>
          <button type="button" class="shop-buy-btn">🪙 ${item.price} 구매</button>
        `;
        row.querySelector('.shop-buy-btn').addEventListener('click', () => {
          this.buyFunctionalItem(item);
        });
      } else {
        const isUnlocked = Boolean(this.unlockedCosmetics[item.id]);
        const isEquipped = this.equipped[item.slot] === item.id;
        if (isEquipped) row.classList.add('equipped');

        let btnClass = 'shop-buy-btn';
        let btnText = `🪙 ${item.price} 구매`;
        if (isUnlocked) {
          btnClass = isEquipped ? 'shop-buy-btn equipped-btn' : 'shop-buy-btn equip-btn';
          btnText = isEquipped ? '✓ 장착중 (해제)' : '장착하기';
        }

        const slotLabel = SHOP_SLOT_LABELS[item.slot] || '꾸미기';
        row.innerHTML = `
          <div class="shop-item-icon">${item.icon}</div>
          <div class="shop-item-info">
            <div class="shop-item-title">
              <span>${item.name}</span>
              <span class="shop-slot-tag">${slotLabel}</span>
              <span class="shop-owned-badge">${isUnlocked ? '영구보유' : '미보유'}</span>
            </div>
            <div class="shop-item-desc">${item.desc}</div>
          </div>
          <button type="button" class="${btnClass}">${btnText}</button>
        `;
        row.querySelector('button').addEventListener('click', () => {
          this.handleCosmeticItemAction(item);
        });
      }

      container.appendChild(row);
    });
  }

  buyFunctionalItem(item) {
    if (this.coins < item.price) {
      alert(`코인이 부족합니다! (보유: ${this.coins}코인 / 필요: ${item.price}코인)\n계단을 10계단 오를 때마다 1코인을 받을 수 있어요!`);
      return;
    }
    this.coins -= item.price;
    this.inventory[item.id] = (this.inventory[item.id] || 0) + 1;
    if (item.id === 'iq_booster') {
      this.iqBoosterActive = true;
    }
    this.savePersistentData();
    sfx.buy();
    this.renderShopItems();
    this.updateHUD();
  }

  handleCosmeticItemAction(item) {
    if (!this.unlockedCosmetics[item.id]) {
      if (this.coins < item.price) {
        alert(`코인이 부족합니다! (보유: ${this.coins}코인 / 필요: ${item.price}코인)`);
        return;
      }
      this.coins -= item.price;
      this.unlockedCosmetics[item.id] = true;
      this.equipped[item.slot] = item.id;
      this.savePersistentData();
      sfx.buy();
      this.renderShopItems();
      this.updateHUD();
    } else {
      // 이미 해금된 꾸미기 아이템 장착 / 해제 토글
      if (this.equipped[item.slot] === item.id) {
        this.equipped[item.slot] = null;
      } else {
        this.equipped[item.slot] = item.id;
      }
      this.savePersistentData();
      sfx.step();
      this.renderShopItems();
      this.updateHUD();
    }
  }

  // 인게임 기능 아이템 사용
  useRocketBoostItem() {
    if (this.state !== 'PLAYING' || this.rocketStepsLeft > 0) return;
    if ((this.inventory.rocket_boost || 0) <= 0) {
      if (this.coins >= 15) {
        this.coins -= 15;
      } else {
        this.showBanner('🚀 로켓 부스터 부족!', '상점에서 구매하거나 15코인이 필요합니다.', 2000);
        return;
      }
    } else {
      this.inventory.rocket_boost--;
    }
    this.rocketStepsLeft = 50;
    this.rocketStepTimer = 0;
    this.savePersistentData();
    sfx.evolve();
    this.showBanner('🚀 초고속 로켓 부스터 발동!', '50계단을 자동으로 초고속 돌파합니다!', 2200);
    this.updateHUD();
  }

  useCompassItem() {
    if (this.state !== 'PLAYING') return;
    if ((this.inventory.direction_guide || 0) <= 0) {
      if (this.coins >= 12) {
        this.coins -= 12;
      } else {
        this.showBanner('🧭 방향 나침반 부족!', '상점에서 구매하거나 12코인이 필요합니다.', 2000);
        return;
      }
    } else {
      this.inventory.direction_guide--;
    }
    this.compassBuffTimeLeft = 60;
    this.savePersistentData();
    sfx.buy();
    this.showBanner('🧭 천재의 방향 나침반 발동!', '1분간 다음 계단에 눌러야 할 버튼을 안내합니다!', 2200);
    this.updateHUD();
  }

  useSlowStaminaItem() {
    if (this.state !== 'PLAYING') return;
    if ((this.inventory.slow_stamina || 0) <= 0) {
      if (this.coins >= 10) {
        this.coins -= 10;
      } else {
        this.showBanner('🐢 슬로우 물약 부족!', '상점에서 구매하거나 10코인이 필요합니다.', 2000);
        return;
      }
    } else {
      this.inventory.slow_stamina--;
    }
    this.slowBuffTimeLeft = 60; // 1분(60초) 적용
    this.savePersistentData();
    sfx.buy();
    this.showBanner('🐢 슬로우 타이머 발동!', '1분간 계단 제한시간이 천천히 감소합니다!', 2200);
    this.updateHUD();
  }

  useDoubleCoinItem() {
    if (this.state !== 'PLAYING') return;
    if ((this.inventory.double_coin || 0) <= 0) {
      if (this.coins >= 10) {
        this.coins -= 10;
      } else {
        this.showBanner('🧲 황금 자석 부족!', '상점에서 구매하거나 10코인이 필요합니다.', 2000);
        return;
      }
    } else {
      this.inventory.double_coin--;
    }
    this.magnetBuffTimeLeft = 60; // 1분(60초) 적용
    this.savePersistentData();
    sfx.buy();
    this.showBanner('🧲 2배 코인 부스터 발동!', '1분간 10계단마다 2코인을 획득합니다!', 2200);
    this.updateHUD();
  }

  useQuizAddTimeItem() {
    if (this.state !== 'QUIZ' || !this.activeQuiz) return;
    if ((this.inventory.time_ext || 0) > 0) {
      this.inventory.time_ext--;
    } else if (this.coins >= 10) {
      this.coins -= 10;
    } else {
      alert('수학문제 시간 늘리기 아이템이 없고 코인(10코인)도 부족합니다!');
      return;
    }
    this.quizTimeRemaining += 30;
    this.quizTotalLimit = Math.max(this.quizTotalLimit, this.quizTimeRemaining);
    this.savePersistentData();
    sfx.buy();
    this.updateQuizItemButtons();
    this.updateHUD();
  }

  useQuizHintItem() {
    if (this.state !== 'QUIZ' || !this.activeQuiz || this.quizHintUsed) return;
    if ((this.inventory.math_hint || 0) > 0) {
      this.inventory.math_hint--;
    } else if (this.coins >= 5) {
      this.coins -= 5;
    } else {
      alert('수학문제 힌트 아이템이 없고 코인(5코인)도 부족합니다!');
      return;
    }
    this.quizHintUsed = true;
    this.savePersistentData();
    sfx.buy();

    // 힌트 박스 표시 및 오답 보기 2개 제거!
    const hintBox = document.getElementById('quiz-hint-box');
    hintBox.textContent = this.activeQuiz.detailedHint;
    hintBox.classList.remove('hidden');

    const choiceBtns = Array.from(document.querySelectorAll('#quiz-choices .choice-btn'));
    let removed = 0;
    choiceBtns.forEach((btn) => {
      const val = Number(btn.dataset.val);
      if (val !== this.activeQuiz.answer && removed < 2) {
        btn.classList.add('eliminated');
        removed++;
      }
    });

    this.updateQuizItemButtons();
    this.updateHUD();
  }

  useQuizPassItem() {
    if (this.state !== 'QUIZ' || !this.activeQuiz) return;
    if ((this.inventory.quiz_pass || 0) > 0) {
      this.inventory.quiz_pass--;
    } else if (this.coins >= 35) {
      this.coins -= 35;
    } else {
      alert('수학문제 프리패스권이 없고 코인(35코인)도 부족합니다!');
      return;
    }
    this.savePersistentData();
    sfx.buy();
    this.quizUnlockTime = 0;
    this.checkQuizAnswer(this.activeQuiz.answer);
  }

  updateQuizItemButtons() {
    const timeCount = this.inventory.time_ext || 0;
    const hintCount = this.inventory.math_hint || 0;
    const passCount = this.inventory.quiz_pass || 0;
    document.getElementById('quiz-time-item-count').textContent =
      timeCount > 0 ? `(보유: ${timeCount})` : `(즉시구매 🪙10)`;
    document.getElementById('quiz-hint-item-count').textContent =
      hintCount > 0 ? `(보유: ${hintCount})` : `(즉시구매 🪙5)`;
    const passEl = document.getElementById('quiz-pass-item-count');
    if (passEl) {
      passEl.textContent = passCount > 0 ? `(보유: ${passCount})` : `(즉시구매 🪙35)`;
    }
  }

  getStageIndex(iq = this.iq) {
    return getStageIndexForIQ(iq);
  }

  // 학년 및 계단 높이에 따른 계단 난이도 (저학년은 직진 위주, 고학년일수록 방향전환 빈도 증가)
  getNextStairDifficulty(stairIndex) {
    if (stairIndex <= 30) {
      // 극초반 (1~30계단): 방향전환 거의 없이 긴 직진 (최소 8계단 직진, 턴 확률 8%)
      return { minStraight: 8, maxStraight: 15, turnChance: 0.08 };
    } else if (stairIndex <= 60) {
      // 초1 구간 (31~60계단): 편안한 긴 직진 (최소 6계단 직진, 턴 확률 13%)
      return { minStraight: 6, maxStraight: 13, turnChance: 0.13 };
    } else if (stairIndex <= 120) {
      // 초2 구간 (61~120계단): 적당한 리듬감 (최소 5계단 직진, 턴 확률 20%)
      return { minStraight: 5, maxStraight: 11, turnChance: 0.20 };
    } else if (stairIndex <= 180) {
      // 초3 구간 (121~180계단): (최소 4계단 직진, 턴 확률 26%)
      return { minStraight: 4, maxStraight: 9, turnChance: 0.26 };
    } else if (stairIndex <= 240) {
      // 초4 구간 (181~240계단): (최소 3계단 직진, 턴 확률 32%)
      return { minStraight: 3, maxStraight: 8, turnChance: 0.32 };
    } else if (stairIndex <= 300) {
      // 초5 구간 (241~300계단): (최소 2계단 직진, 턴 확률 38%)
      return { minStraight: 2, maxStraight: 7, turnChance: 0.38 };
    } else {
      // 초6 / 천재 구간 (301계단 이상): 화려한 지그재그 도전 (최소 1계단, 턴 확률 44%)
      return { minStraight: 1, maxStraight: 6, turnChance: 0.44 };
    }
  }

  generateNextStair() {
    const last = this.stairs[this.stairs.length - 1];
    const nextY = last.y + 1;
    const { minStraight, maxStraight, turnChance } = this.getNextStairDifficulty(nextY);

    let nextDir = last.dir;
    this.currentStraightRun = (this.currentStraightRun || 0) + 1;

    // 화면 밖으로 계단이 너무 치우치지 않도록(중심 기준 5칸 이상) 중앙으로 방향 유도
    const isTooFarRight = last.x >= 5 && last.dir === 1;
    const isTooFarLeft = last.x <= -5 && last.dir === -1;

    if (isTooFarRight || isTooFarLeft) {
      if (this.currentStraightRun >= minStraight) {
        nextDir = -last.dir;
        this.currentStraightRun = 1;
      }
    } else if (this.currentStraightRun >= maxStraight) {
      nextDir = -last.dir;
      this.currentStraightRun = 1;
    } else if (this.currentStraightRun >= minStraight && Math.random() < turnChance) {
      nextDir = -last.dir;
      this.currentStraightRun = 1;
    }

    return {
      x: last.x + nextDir,
      y: nextY,
      dir: nextDir
    };
  }

  resetStairs() {
    this.stairs = [{ x: 0, y: 0, dir: 1 }];
    this.currentStraightRun = 0;
    for (let i = 1; i <= 150; i++) {
      this.stairs.push(this.generateNextStair());
    }
    // 첫 번째 계단 방향을 바라보도록 설정
    this.playerFacing = this.stairs[1].dir;
    this.prevStairPos = { x: 0, y: 0 };
    this.climbAnimProgress = 0;
  }

  ensureStairsAhead() {
    while (this.stairs.length <= this.currentStair + 80) {
      this.stairs.push(this.generateNextStair());
    }
  }

  startGame() {
    this.elStartModal.classList.remove('active');
    this.elQuizModal.classList.remove('active');
    this.elQuizModal.style.display = 'none';
    document.getElementById('controls')?.classList.remove('quiz-disabled');
    this.elFailModal.classList.remove('active');
    this.elShopModal.classList.remove('active');
    this.elOptionsModal.classList.remove('active');
    this.elRankingModal?.classList.remove('active');
    this.elNicknameModal?.classList.remove('active');
    this.elEvoBanner.classList.add('hidden');

    this.currentStair = 0;
    this.iq = 0;
    this.stamina = 100;
    this.fallYOffset = 0;
    this.fallVelocity = 0;
    this.speedCombo = 0;
    this.rocketStepsLeft = 0;
    this.rocketStepTimer = 0;
    this.particles = [];
    this.rainbowTrails = [];
    this.stairEffects = [];
    this.shockwaves = [];
    this.floatingTexts = [];
    this.afterimages = [];

    this.resetStairs();
    this.camX = 0;
    this.camY = 0;
    this.state = 'PLAYING';
    sfx.startBGM('PLAY');
    this.updateHUD();
  }

  updateHUD() {
    const stageIdx = this.getStageIndex();
    const stage = STAGES[stageIdx];
    const currentGrade = getGradeForIQ(this.iq);

    this.elStairCount.textContent = this.currentStair;
    let recordUpdated = false;
    if (this.currentStair > this.bestStair) {
      this.bestStair = this.currentStair;
      localStorage.setItem('2jun_best_stair', String(this.bestStair));
      this.elBestCount.textContent = this.bestStair;
      recordUpdated = true;
    }
    if (this.iq > this.bestIQ) {
      this.bestIQ = this.iq;
      localStorage.setItem('2jun_best_iq', String(this.bestIQ));
      recordUpdated = true;
    }
    if (recordUpdated && this.nickname) {
      this.updateRankingEntry(this.nickname, this.bestStair, this.bestIQ, false);
    }

    this.elCoinCount.textContent = this.coins;
    const failCoinsEl = document.getElementById('fail-coins-kept');
    if (failCoinsEl) failCoinsEl.textContent = this.coins;
    this.elCharBadge.textContent = stage.badge;
    this.elAvatarEmoji.textContent = stage.emoji;
    const nickPrefix = this.nickname ? `[${this.nickname}] ` : '';
    this.elStatusName.textContent = `${nickPrefix}${stage.name} (IQ ${this.iq})`;
    this.elStatusDesc.textContent = stage.desc;

    // 보유 생명 및 퀵 슬롯 수량 업데이트
    const lives = this.inventory.extra_life || 0;
    this.elLifeBadge.textContent = `❤️ x${lives}`;
    const rocketCountEl = document.getElementById('quick-rocket-count');
    if (rocketCountEl) rocketCountEl.textContent = this.inventory.rocket_boost || 0;
    document.getElementById('quick-slow-count').textContent = this.inventory.slow_stamina || 0;
    const compassCountEl = document.getElementById('quick-compass-count');
    if (compassCountEl) compassCountEl.textContent = this.inventory.direction_guide || 0;
    document.getElementById('quick-magnet-count').textContent = this.inventory.double_coin || 0;
    document.getElementById('quick-life-count').textContent = lives;

    // 버프 표시
    this.elActiveBuffs.innerHTML = '';
    if (this.slowBuffTimeLeft > 0) {
      const tag = document.createElement('span');
      tag.className = 'buff-tag';
      tag.textContent = `🐢 슬로우 ${Math.ceil(this.slowBuffTimeLeft)}s`;
      this.elActiveBuffs.appendChild(tag);
    }
    if (this.compassBuffTimeLeft > 0) {
      const tag = document.createElement('span');
      tag.className = 'buff-tag';
      tag.textContent = `🧭 나침반 ${Math.ceil(this.compassBuffTimeLeft)}s`;
      this.elActiveBuffs.appendChild(tag);
    }
    if (this.magnetBuffTimeLeft > 0) {
      const tag = document.createElement('span');
      tag.className = 'buff-tag';
      tag.textContent = `🧲 2배코인 ${Math.ceil(this.magnetBuffTimeLeft)}s`;
      this.elActiveBuffs.appendChild(tag);
    }
    if (this.jackpotBuffTimeLeft > 0) {
      const tag = document.createElement('span');
      tag.className = 'buff-tag';
      tag.textContent = `💎 잭팟 ${Math.ceil(this.jackpotBuffTimeLeft)}s`;
      this.elActiveBuffs.appendChild(tag);
    }
    if ((this.inventory.einstein_capsule || 0) > 0) {
      const tag = document.createElement('span');
      tag.className = 'buff-tag';
      tag.textContent = `🧠 IQ +30 대기중`;
      this.elActiveBuffs.appendChild(tag);
    }
    if ((this.inventory.iq_booster || 0) > 0 || this.iqBoosterActive) {
      const tag = document.createElement('span');
      tag.className = 'buff-tag';
      tag.textContent = `🧪 IQ +20 대기중`;
      this.elActiveBuffs.appendChild(tag);
    }

    // 다음 수학 시험까지 남은 계단 & 현재 IQ 기반 학년 표시
    const interval = this.quizInterval;
    const progressInInterval = ((this.currentStair % interval) / interval) * 100;
    const remainingStairs = interval - (this.currentStair % interval);
    this.elNextQuizGrade.textContent = `초${currentGrade} (IQ ${this.iq})`;
    this.elQuizProgressFill.style.width = `${progressInInterval}%`;
    this.elStairsToQuiz.textContent = `${remainingStairs}계단 남음`;
  }

  // 신발 & 초신성 왕관 꾸미기 효과 및 방향 전환 특수효과 파티클 스폰 (계단 오를 때마다 화려하게 폭발!)
  spawnStepEffects(stairX, stairY, isTurn, isFast) {
    const worldX = stairX * 54;
    const worldY = -stairY * 34;

    // 1) 무지개신발: 지나온 계단에 화려한 네온 프리즘 무지개 다리 & 아치 남기기
    if (this.equipped.shoe === 'shoe_rainbow') {
      this.rainbowTrails.push({
        x: worldX,
        y: worldY,
        alpha: 1.0,
        hue: (this.currentStair * 32) % 360,
        createdTick: this.tick
      });
    }

    // 2) 장착한 신발별 계단 임팩트 기둥/회오리/낙뢰 + 충격파 + 고밀도 원소 파티클 폭발!
    const shoe = this.equipped.shoe;
    if (shoe === 'shoe_wind') {
      // 계단 위 에메랄드 폭풍 회오리(Tornado Vortex) 생성
      this.stairEffects.push({
        type: 'wind_vortex',
        x: worldX,
        y: worldY,
        alpha: 1.0,
        progress: 0,
        decay: 0.032
      });

      // 매 스텝 이중 바람 소용돌이 충격파
      this.shockwaves.push({
        x: worldX,
        y: worldY,
        radius: 6,
        maxRadius: 56,
        color: '#22d3ee',
        glow: '#67e8f9',
        lineWidth: 4,
        alpha: 0.95
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY - 14,
        radius: 4,
        maxRadius: 42,
        color: '#34d399',
        glow: '#a7f3d0',
        lineWidth: 2.5,
        alpha: 0.85
      });

      // 초승달 칼바람(wind_blade) & 소용돌이 바람 궤적(wind_swirl) 20개 스폰
      for (let i = 0; i < 20; i++) {
        const isBlade = i < 10;
        const ang = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
        this.particles.push({
          x: worldX + randInt(-24, 24),
          y: worldY + randInt(-12, 4),
          vx: isBlade ? Math.cos(ang) * (2.5 + Math.random() * 3.5) : -this.playerFacing * (2 + Math.random() * 4.5),
          vy: -1.8 - Math.random() * 4.2,
          size: isBlade ? 8 + Math.random() * 6 : 5 + Math.random() * 5,
          color: ['#22d3ee', '#67e8f9', '#34d399', '#ecfeff'][i % 4],
          glow: '#22d3ee',
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.35,
          alpha: 1,
          decay: 0.032,
          type: isBlade ? 'wind_blade' : 'wind_swirl'
        });
      }
    } else if (shoe === 'shoe_fire') {
      // 계단 위 치솟는 화염 불기둥(Fire Pillar) & 마그마 분출 생성
      this.stairEffects.push({
        type: 'fire_pillar',
        x: worldX,
        y: worldY,
        alpha: 1.0,
        progress: 0,
        decay: 0.03
      });

      // 매 스텝 화염 폭발 충격파
      this.shockwaves.push({
        x: worldX,
        y: worldY,
        radius: 8,
        maxRadius: 60,
        color: '#f97316',
        glow: '#ef4444',
        lineWidth: 4.5,
        alpha: 1.0
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY - 8,
        radius: 4,
        maxRadius: 40,
        color: '#fef08a',
        glow: '#facc15',
        lineWidth: 3,
        alpha: 0.9
      });

      // 일렁이는 화염 혀(flame) & 마그마 불티 24개 스폰
      for (let i = 0; i < 24; i++) {
        const isFlame = i < 16;
        this.particles.push({
          x: worldX + randInt(-26, 26),
          y: worldY + randInt(-6, 4),
          vx: (Math.random() - 0.5) * 4.2,
          vy: -2.2 - Math.random() * 5.2,
          size: isFlame ? 8 + Math.random() * 8 : 3.5 + Math.random() * 4,
          color: ['#ef4444', '#f97316', '#fde047', '#fef08a'][i % 4],
          glow: '#f97316',
          rot: (Math.random() - 0.5) * 0.5,
          vRot: (Math.random() - 0.5) * 0.1,
          alpha: 1,
          decay: isFlame ? 0.032 : 0.026,
          type: isFlame ? 'flame' : 'spark'
        });
      }
    } else if (shoe === 'shoe_lightning') {
      // 계단 위 하늘에서 내리꽂히는 천둥 낙뢰(Thunderbolt Strike) 생성!
      const boltSegments = [];
      let bx = worldX + randInt(-14, 14);
      let by = worldY - 125;
      const steps = 7;
      for (let s = 1; s <= steps; s++) {
        const nx = s === steps ? worldX : worldX + randInt(-24, 24);
        const ny = worldY - 125 + (125 * s) / steps;
        boltSegments.push({ x1: bx, y1: by, x2: nx, y2: ny });
        bx = nx;
        by = ny;
      }
      this.stairEffects.push({
        type: 'lightning_strike',
        x: worldX,
        y: worldY,
        segments: boltSegments,
        alpha: 1.0,
        progress: 0,
        decay: 0.042
      });

      // 매 스텝 전격 플라즈마 충격파
      this.shockwaves.push({
        x: worldX,
        y: worldY,
        radius: 8,
        maxRadius: 64,
        color: '#facc15',
        glow: '#fef08a',
        lineWidth: 4,
        alpha: 1.0
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY - 6,
        radius: 5,
        maxRadius: 46,
        color: '#38bdf8',
        glow: '#67e8f9',
        lineWidth: 3,
        alpha: 0.9
      });

      // 지그재그 번개 줄기(lightning_bolt) & 고전압 스파크 22개 스폰
      for (let i = 0; i < 22; i++) {
        const ang = (Math.PI * 2 * i) / 22 + (Math.random() - 0.5) * 0.3;
        const spd = 2.5 + Math.random() * 6.5;
        this.particles.push({
          x: worldX + randInt(-20, 20),
          y: worldY + randInt(-18, 4),
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 1.5,
          size: 7 + Math.random() * 7,
          color: ['#fef08a', '#facc15', '#38bdf8', '#ffffff'][i % 4],
          glow: i % 2 === 0 ? '#facc15' : '#38bdf8',
          rot: ang,
          vRot: (Math.random() - 0.5) * 0.4,
          alpha: 1,
          decay: 0.042,
          type: i < 14 ? 'lightning_bolt' : 'spark'
        });
      }
    } else if (shoe === 'shoe_rainbow') {
      const baseHue = (this.currentStair * 32) % 360;
      // 계단 위 프리즘 무지개 분수 & 아치 효과
      this.stairEffects.push({
        type: 'rainbow_burst',
        x: worldX,
        y: worldY,
        hue: baseHue,
        alpha: 1.0,
        progress: 0,
        decay: 0.03
      });

      // 이중 프리즘 무지개 충격파
      this.shockwaves.push({
        x: worldX,
        y: worldY,
        radius: 8,
        maxRadius: 64,
        color: `hsl(${baseHue}, 95%, 60%)`,
        glow: `hsl(${(baseHue + 60) % 360}, 95%, 65%)`,
        lineWidth: 4.5,
        alpha: 1.0
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY - 10,
        radius: 4,
        maxRadius: 46,
        color: `hsl(${(baseHue + 180) % 360}, 95%, 65%)`,
        glow: '#ffffff',
        lineWidth: 3,
        alpha: 0.9
      });

      // 오색찬란한 4각/5각 별빛(star4, star5) 분수 24개 폭발!
      for (let i = 0; i < 24; i++) {
        const pHue = (baseHue + i * 18) % 360;
        const c = `hsl(${pHue}, 95%, 62%)`;
        this.particles.push({
          x: worldX + randInt(-26, 26),
          y: worldY + randInt(-10, 4),
          vx: (Math.random() - 0.5) * 6.2,
          vy: -1.8 - Math.random() * 5.2,
          size: 6 + Math.random() * 6,
          color: c,
          glow: c,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.22,
          alpha: 1,
          decay: 0.028,
          type: i % 2 === 0 ? 'star4' : 'star5'
        });
      }
    } else if (shoe === 'shoe_ice') {
      this.stairEffects.push({
        type: 'ice_pillar',
        x: worldX,
        y: worldY,
        alpha: 1.0,
        progress: 0,
        decay: 0.032
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY,
        radius: 8,
        maxRadius: 60,
        color: '#38bdf8',
        glow: '#bae6fd',
        lineWidth: 4,
        alpha: 0.95
      });
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: worldX + randInt(-24, 24),
          y: worldY + randInt(-12, 4),
          vx: (Math.random() - 0.5) * 4.8,
          vy: -1.6 - Math.random() * 4.5,
          size: 5.5 + Math.random() * 5.5,
          color: ['#e0f2fe', '#7dd3fc', '#38bdf8', '#ffffff'][i % 4],
          glow: '#38bdf8',
          rot: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2,
          alpha: 1,
          decay: 0.03,
          type: 'star4'
        });
      }
    } else if (shoe === 'shoe_galaxy') {
      this.stairEffects.push({
        type: 'galaxy_vortex',
        x: worldX,
        y: worldY,
        alpha: 1.0,
        progress: 0,
        decay: 0.03
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY,
        radius: 8,
        maxRadius: 64,
        color: '#c084fc',
        glow: '#e879f9',
        lineWidth: 4,
        alpha: 0.95
      });
      for (let i = 0; i < 22; i++) {
        const ang = (Math.PI * 2 * i) / 22;
        const spd = 2 + Math.random() * 4.5;
        this.particles.push({
          x: worldX + randInt(-20, 20),
          y: worldY + randInt(-10, 4),
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 1.5,
          size: 6 + Math.random() * 5,
          color: ['#c084fc', '#f472b6', '#818cf8', '#fde047'][i % 4],
          glow: '#a855f7',
          rot: Math.random() * Math.PI,
          vRot: 0.18,
          alpha: 1,
          decay: 0.028,
          type: i % 2 === 0 ? 'star5' : 'star4'
        });
      }
    } else if (shoe === 'shoe_cyber') {
      this.stairEffects.push({
        type: 'cyber_jet',
        x: worldX,
        y: worldY,
        alpha: 1.0,
        progress: 0,
        decay: 0.035
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY,
        radius: 6,
        maxRadius: 62,
        color: '#22d3ee',
        glow: '#f43f5e',
        lineWidth: 4,
        alpha: 0.95
      });
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: worldX + randInt(-22, 22),
          y: worldY + randInt(-8, 4),
          vx: (Math.random() - 0.5) * 5,
          vy: -2 - Math.random() * 5,
          size: 5 + Math.random() * 5,
          color: ['#22d3ee', '#f43f5e', '#a5f3fc', '#fde047'][i % 4],
          glow: '#22d3ee',
          rot: Math.random() * Math.PI,
          vRot: 0.25,
          alpha: 1,
          decay: 0.035,
          type: i % 2 === 0 ? 'crown_gem' : 'spark'
        });
      }
    } else {
      // 기본 발구름 먼지
      for (let i = 0; i < 4; i++) {
        this.particles.push({
          x: worldX + randInt(-12, 12),
          y: worldY,
          vx: -this.playerFacing * (1 + Math.random() * 2),
          vy: -0.5 - Math.random(),
          size: 3 + Math.random() * 3,
          color: 'rgba(255, 255, 255, 0.75)',
          alpha: 0.8,
          decay: 0.05,
          type: 'dust'
        });
      }
    }

    // 3) 초신성 네온 왕관(aura_crown) 장착 시: 계단 오를 때마다 초신성 빛기둥 + 마법진 + 별빛/보석 대폭발!
    if (this.equipped.accessory === 'aura_crown') {
      // 계단 위 초신성 빛기둥(Supernova Pillar) & 로열 스타 마법진 생성
      this.stairEffects.push({
        type: 'crown_supernova',
        x: worldX,
        y: worldY,
        alpha: 1.0,
        progress: 0,
        decay: 0.03
      });

      // 발밑 & 머리 위 왕관에서 동시에 퍼져나가는 초신성 네온 충격파!
      this.shockwaves.push({
        x: worldX,
        y: worldY - 4,
        radius: 10,
        maxRadius: 68,
        color: '#38bdf8',
        glow: '#67e8f9',
        lineWidth: 4,
        alpha: 0.95
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY - 88,
        radius: 6,
        maxRadius: 52,
        color: '#fde047',
        glow: '#f472b6',
        lineWidth: 3.5,
        alpha: 0.95
      });

      // 초신성 4각 별빛(star4) & 로열 다이아몬드 보석(crown_gem) 22개 방사형 폭발!
      const crownPalette = ['#38bdf8', '#fde047', '#f472b6', '#c084fc', '#67e8f9', '#ffffff'];
      for (let i = 0; i < 22; i++) {
        const fromCrown = i < 12;
        const originY = fromCrown ? worldY - 84 : worldY - 18;
        const ang = (Math.PI * 2 * i) / (fromCrown ? 12 : 10) + Math.random() * 0.25;
        const spd = (fromCrown ? 2.2 : 3.0) + Math.random() * 4.2;
        const col = crownPalette[i % crownPalette.length];
        this.particles.push({
          x: worldX + randInt(-14, 14),
          y: originY + randInt(-8, 8),
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 1.2,
          size: i % 3 === 0 ? 5.5 + Math.random() * 4 : 7 + Math.random() * 6,
          color: col,
          glow: col,
          rot: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2,
          alpha: 1,
          decay: 0.028,
          type: i % 3 === 0 ? 'crown_gem' : 'star4'
        });
      }
    }

    // 4) 날개(wing 슬롯) 및 수학신 후광, 손 무기, 동행 펫 스텝 이펙트
    const activeWing = this.equipped.wing || (this.equipped.accessory === 'wing_gold' ? 'wing_gold' : null);
    if (activeWing) {
      const wingCols = {
        wing_gold: ['#fde047', '#fef08a'],
        wing_demon: ['#ef4444', '#7f1d1d'],
        wing_cyber: ['#22d3ee', '#ec4899'],
        wing_fairy: ['#f472b6', '#a7f3d0']
      }[activeWing] || ['#fde047', '#fef08a'];

      this.shockwaves.push({
        x: worldX,
        y: worldY - 32,
        radius: 6,
        maxRadius: 48,
        color: wingCols[0],
        glow: wingCols[1],
        lineWidth: 3,
        alpha: 0.85
      });
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: worldX - this.playerFacing * 14 + randInt(-16, 16),
          y: worldY - 36 + randInt(-14, 10),
          vx: -this.playerFacing * (1.2 + Math.random() * 3) + (Math.random() - 0.5) * 2,
          vy: -1.0 + Math.random() * 2.5,
          size: 6 + Math.random() * 4,
          color: wingCols[i % 2],
          glow: wingCols[0],
          rot: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.14,
          alpha: 1,
          decay: 0.028,
          type: activeWing === 'wing_cyber' ? 'crown_gem' : 'feather'
        });
      }
    }

    if (this.equipped.accessory === 'aura_math_god') {
      this.stairEffects.push({
        type: 'math_god_circle',
        x: worldX,
        y: worldY,
        alpha: 1.0,
        progress: 0,
        decay: 0.028
      });
      this.shockwaves.push({
        x: worldX,
        y: worldY - 40,
        radius: 10,
        maxRadius: 68,
        color: '#fde047',
        glow: '#f59e0b',
        lineWidth: 4,
        alpha: 0.95
      });
    }

    if (this.equipped.hand === 'hand_sword') {
      this.stairEffects.push({
        type: 'sword_slash',
        x: worldX + this.playerFacing * 18,
        y: worldY - 36,
        facing: this.playerFacing,
        alpha: 1.0,
        progress: 0,
        decay: 0.06
      });
    } else if (this.equipped.hand === 'hand_wand' || this.equipped.hand === 'hand_lollipop') {
      for (let i = 0; i < 6; i++) {
        this.particles.push({
          x: worldX + this.playerFacing * 14 + randInt(-10, 10),
          y: worldY - 40 + randInt(-10, 10),
          vx: (Math.random() - 0.5) * 3,
          vy: -1.5 - Math.random() * 2.5,
          size: 5 + Math.random() * 3,
          color: ['#fde047', '#f472b6', '#38bdf8'][i % 3],
          glow: '#fde047',
          rot: Math.random() * Math.PI,
          vRot: 0.15,
          alpha: 1,
          decay: 0.04,
          type: 'star5'
        });
      }
    }

    // 5) 빠른 속도 유지 중 방향 전환(TURN) 시 익사이팅 특수효과 폭발!
    if (isTurn) {
      const ringColor = isFast ? '#fde047' : '#fb7185';
      this.shockwaves.push({
        x: worldX,
        y: worldY - 12,
        radius: 8,
        maxRadius: isFast ? 76 : 48,
        color: ringColor,
        glow: ringColor,
        lineWidth: 4,
        alpha: 1
      });

      const burstCount = isFast ? 16 : 8;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount;
        const spd = (isFast ? 4.5 : 2.5) + Math.random() * 3;
        this.particles.push({
          x: worldX,
          y: worldY - 14,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          size: isFast ? 5 : 3.5,
          color: ['#fde047', '#fb7185', '#38bdf8', '#a855f7'][i % 4],
          glow: '#fde047',
          alpha: 1,
          decay: 0.045,
          type: 'spark'
        });
      }

      if (isFast) {
        this.screenShake = Math.min(8, 3 + Math.floor(this.speedCombo / 4));
        const callouts = ['⚡ DRIFT TURN!', '🔥 SUPER TURN!', '✨ SPEED TURN!', `🚀 COMBO x${this.speedCombo}!`];
        this.floatingTexts.push({
          x: worldX,
          y: worldY - 82,
          text: callouts[this.speedCombo % callouts.length],
          color: '#fde047',
          alpha: 1,
          vy: -1.8
        });
      }
    }
  }

  handleAction(actionType) {
    if (this.state !== 'PLAYING') return;

    const nextStairObj = this.stairs[this.currentStair + 1];
    const curStairObj = this.stairs[this.currentStair];
    const expectedDir = nextStairObj.x - curStairObj.x;

    // 방향전환 버튼을 누르면 바라보는 방향을 반대로 전환, 오르기를 누르면 현재 바라보는 방향 유지
    if (actionType === 'TURN') {
      this.playerFacing = -this.playerFacing;
    }

    if (this.playerFacing === expectedDir) {
      // 계단 방향과 캐릭터가 바라보는 방향이 정확히 일치!
      this.prevStairPos = { x: curStairObj.x, y: curStairObj.y };
      this.currentStair++;
      this.playerFacing = expectedDir; // 왼쪽(-1)으로 오를 땐 왼쪽, 오른쪽(1)으로 오를 땐 오른쪽 응시!
      this.climbAnimProgress = 1.0;
      this.stepFootParity++;

      // 연속 등반 속도 측정 (320ms 이내에 연속 입력 시 고속 질주 콤보!)
      const now = performance.now();
      const dtStep = now - this.lastStepTime;
      this.lastStepTime = now;
      const isFast = dtStep < 320;
      if (isFast) {
        this.speedCombo++;
        // 고속 질주 잔상 추가
        this.afterimages.push({
          x: curStairObj.x * 54,
          y: -curStairObj.y * 34,
          stageIdx: this.getStageIndex(),
          facing: this.playerFacing,
          footParity: this.stepFootParity,
          alpha: 0.45
        });
      } else {
        this.speedCombo = 1;
      }

      // 리얼한 발소리 재생
      if (actionType === 'TURN') {
        sfx.turn();
      } else {
        sfx.step();
      }

      // 발밑 & 방향전환 특수효과 스폰
      this.spawnStepEffects(nextStairObj.x, nextStairObj.y, actionType === 'TURN', isFast);

      // 10계단마다 1코인 지급 (황금 자석 버프 시 2코인, 다이아 잭팟 버프 시 +3코인 보너스!)
      if (this.currentStair > 0 && this.currentStair % 10 === 0) {
        const baseCoin = this.magnetBuffTimeLeft > 0 ? 2 : 1;
        const jackpotBonus = this.jackpotBuffTimeLeft > 0 ? 3 : 0;
        const earned = baseCoin + jackpotBonus;
        this.coins += earned;
        this.savePersistentData();
        sfx.coin();
        this.floatingTexts.push({
          x: nextStairObj.x * 54,
          y: -nextStairObj.y * 34 - 95,
          text: `+${earned} 🪙 COIN!${jackpotBonus > 0 ? ' (💎잭팟!)' : ''}`,
          color: jackpotBonus > 0 ? '#67e8f9' : '#fef08a',
          alpha: 1,
          vy: -1.5
        });
      }

      // 50계단마다 시간대(아침 -> 한낮 -> 오후 -> 저녁 노을 -> 밤 -> 새벽 -> 아침) 변화 알림 플로팅 텍스트!
      if (this.currentStair > 0 && this.currentStair % 50 === 0) {
        const phaseIdx = Math.floor(this.currentStair / 50) % 6;
        const phaseLabels = [
          '🌅 상쾌한 아침이 밝았습니다!',
          '☀️ 눈부신 한낮의 열기구 하늘!',
          '🌤️ 따스한 오후의 천공 풍차섬!',
          '🌇 붉은 노을이 지는 저녁!',
          '🌃 별과 풍등이 빛나는 밤하늘!',
          '🌌 오로라가 일렁이는 새벽녘!'
        ];
        this.floatingTexts.push({
          x: nextStairObj.x * 54,
          y: -nextStairObj.y * 34 - 120,
          text: phaseLabels[phaseIdx],
          color: '#38bdf8',
          alpha: 1,
          vy: -1.3
        });
      }

      // 스태미나 회복
      this.stamina = Math.min(this.maxStamina, this.stamina + 14);
      this.ensureStairsAhead();
      this.updateHUD();

      // 설정된 계단(quizInterval)마다 IQ 기반 수학 문제 출현!
      if (this.currentStair > 0 && this.currentStair % this.quizInterval === 0) {
        this.triggerMathQuiz();
      }
    } else {
      // 잘못된 방향으로 점프 -> 추가생명 아이템 보유 여부 확인!
      this.handleMistakeOrTimeout('헛발질! 계단 반대쪽으로 점프해서 추락했습니다!');
    }
  }

  // 계단에서 떨어지거나 스태미나가 다 되었을 때 추가생명 아이템 체크
  handleMistakeOrTimeout(reasonText) {
    if ((this.inventory.extra_life || 0) > 0) {
      // 추가생명 아이템 소모하여 즉시 그 자리에서 부활!
      this.inventory.extra_life--;
      this.savePersistentData();
      this.stamina = 100;
      // 다음 계단 방향으로 자동 정렬해 주어 안전하게 이어할 수 있도록 배려
      const curStairObj = this.stairs[this.currentStair];
      const nextStairObj = this.stairs[this.currentStair + 1];
      if (curStairObj && nextStairObj) {
        this.playerFacing = nextStairObj.x - curStairObj.x;
      }
      sfx.evolve();
      this.showBanner(
        '❤️ 추가생명 아이템 발동! 부활 성공!',
        `계단에서 떨어졌지만 추가생명으로 ${this.currentStair}계단에서 살아났습니다! (남은 생명: ${this.inventory.extra_life}개)`,
        3200
      );
      this.updateHUD();
      return;
    }
    this.triggerFall(reasonText);
  }

  triggerMathQuiz() {
    this.state = 'QUIZ';
    sfx.setBGMMode('QUIZ');
    sfx.quizPop();

    // 퀴즈 도달 시점에 새 최고 기록이 있고 마지막 전송 후 15초 이상 지났다면 백그라운드 중간 저장
    if (
      this.nickname &&
      this.hasUnsyncedBest &&
      this.rankingsMap[this.nickname] &&
      Date.now() - this.lastPostTime > 15000
    ) {
      this.postScoreOnline(this.rankingsMap[this.nickname], false);
    }

    // 기존에 포커스된 버튼이 있으면 해제하여 Space/Enter 연타로 버튼이 눌리는 것을 방지
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }

    // 계단 빠르게 오르다 문제창이 떴을 때 관성 연타로 오답 처리되는 현상 방지를 위해 0.65초 안전 잠금 적용!
    this.quizUnlockTime = performance.now() + 650;

    // 퀴즈 중에는 하단 방향전환/오르기 버튼 영역 터치 비활성화
    const controlsEl = document.getElementById('controls');
    if (controlsEl) controlsEl.classList.add('quiz-disabled');

    const quiz = generateMathProblemByIQ(this.iq);
    this.activeQuiz = quiz;
    this.quizTimeRemaining = quiz.timeLimit;
    this.quizTotalLimit = quiz.timeLimit;
    this.quizHintUsed = false;
    this.lastSecTick = Math.ceil(quiz.timeLimit);

    const stageIdx = this.getStageIndex();
    const curStage = STAGES[stageIdx] || STAGES[0];
    const iqGain =
      this.inventory && this.inventory.einstein_capsule > 0
        ? 30
        : (this.inventory && this.inventory.iq_booster > 0) || this.iqBoosterActive
        ? 20
        : 10;

    const gradeBadge = document.getElementById('quiz-grade-badge');
    if (gradeBadge) gradeBadge.textContent = `초등학교 ${quiz.grade}학년 난이도 (현재 IQ ${this.iq})`;
    const stairBadge = document.getElementById('quiz-stair-badge');
    if (stairBadge) stairBadge.textContent = `정답 시 IQ +${iqGain}!`;
    const charFace = document.getElementById('quiz-char-face');
    if (charFace) charFace.textContent = curStage.emoji;
    const speechBubble = document.getElementById('quiz-speech-bubble');
    if (speechBubble) speechBubble.textContent = curStage.speech;
    const questionText = document.getElementById('quiz-question-text');
    if (questionText) questionText.textContent = quiz.question;
    const questionSub = document.getElementById('quiz-question-sub');
    if (questionSub) questionSub.textContent = `${quiz.subHint} (제한시간 ${quiz.timeLimit}초 / 보기 버튼만 선택됩니다!)`;

    const hintBox = document.getElementById('quiz-hint-box');
    if (hintBox) {
      hintBox.classList.add('hidden');
      hintBox.textContent = '';
    }

    this.updateQuizItemButtons();

    const choicesBox = document.getElementById('quiz-choices');
    if (choicesBox) {
      choicesBox.innerHTML = '';
      quiz.choices.forEach((choiceVal, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-btn quiz-safety-locked';
        btn.dataset.val = choiceVal;
        btn.dataset.armed = '0';
        btn.textContent = `${idx + 1}번) ${choiceVal}`;

        // 오직 잠금이 해제된 뒤 이 보기 버튼 위에서 직접 pointerdown이 시작되고 클릭된 경우에만 정답 판정 실행!
        btn.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
          if (this.state !== 'QUIZ' || performance.now() < this.quizUnlockTime) {
            btn.dataset.armed = '0';
            return;
          }
          btn.dataset.armed = '1';
        });

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (this.state !== 'QUIZ' || performance.now() < this.quizUnlockTime) return;
          if (btn.dataset.armed !== '1') return;
          btn.dataset.armed = '0';
          this.checkQuizAnswer(choiceVal);
        });

        choicesBox.appendChild(btn);
      });
    }

    if (this.elQuizModal) {
      this.elQuizModal.style.display = 'flex';
      this.elQuizModal.classList.add('active');
    }
  }

  checkQuizAnswer(userValue) {
    if (this.state !== 'QUIZ' || !this.activeQuiz) return;
    if (performance.now() < this.quizUnlockTime) return;

    const controlsEl = document.getElementById('controls');
    if (controlsEl) controlsEl.classList.remove('quiz-disabled');

    if (this.elQuizModal) {
      this.elQuizModal.style.display = 'none';
      this.elQuizModal.classList.remove('active');
    }
    sfx.setBGMMode('PLAY');

    if (Number(userValue) === this.activeQuiz.answer) {
      // 정답! IQ +10 (또는 비타민 +20 / 아인슈타인 캡슐 +30) 상승!
      const prevGrade = getGradeForIQ(this.iq);
      const prevStageIdx = this.getStageIndex(this.iq);

      let iqDelta = 10;
      if ((this.inventory.einstein_capsule || 0) > 0) {
        this.inventory.einstein_capsule--;
        iqDelta = 30;
        this.savePersistentData();
      } else if ((this.inventory.iq_booster || 0) > 0) {
        this.inventory.iq_booster--;
        this.iqBoosterActive = (this.inventory.iq_booster || 0) > 0;
        iqDelta = 20;
        this.savePersistentData();
      }

      if (this.jackpotBuffTimeLeft > 0) {
        this.coins += 5;
        this.savePersistentData();
      }

      this.iq += iqDelta;
      const newGrade = getGradeForIQ(this.iq);
      const newStageIdx = this.getStageIndex(this.iq);

      sfx.evolve();
      this.stamina = 100;
      this.state = 'PLAYING';
      this.updateHUD();

      const newStage = STAGES[newStageIdx];
      if (newStageIdx > prevStageIdx || newGrade > prevGrade) {
        // 학년이 올라갔을 때 진화 배너와 함께 아이템 상점 자동 오픈!
        this.showBanner(
          `🎉 정답! IQ ${this.iq} 달성 & 초${newGrade} 진급!`,
          `${newStage.evoMsg} (진급 기념 상점이 열립니다!)`,
          4000
        );
        this.openShopModal(true, newGrade);
      } else {
        this.showBanner(
          `✨ 정답! IQ +${iqDelta} 상승! (현재 IQ: ${this.iq})`,
          `초${newGrade} 과정 순항 중! 다음 학년 진급까지 IQ ${Math.max(0, newGrade * 50 + 10 - this.iq)} 남았습니다!`,
          3000
        );
      }
    } else {
      // 오답! 떨어지지 않고 IQ만 오르지 않은 채 다음 계단을 계속 올라감!
      sfx.wrongContinue();
      this.stamina = 100;
      this.state = 'PLAYING';
      this.updateHUD();
      this.showBanner(
        `💦 아깝다! 오답입니다 (정답: ${this.activeQuiz.answer})`,
        `IQ는 오르지 않았지만(현재 IQ ${this.iq}) 추락하지 않고 계속 계단을 오릅니다!`,
        3400
      );
    }
  }

  triggerFall(reasonText) {
    this.state = 'FALLING';
    this.fallYOffset = 0;
    this.fallVelocity = -6;
    sfx.stopBGM();
    sfx.baboFail();

    setTimeout(() => {
      if (this.state === 'FALLING') {
        this.triggerBaboReset(reasonText, '');
      }
    }, 850);
  }

  triggerBaboReset(reasonText, solutionText = '') {
    const reachedStair = this.currentStair;
    const reachedIQ = this.iq;

    // 추락 시 현재 닉네임의 최고 스코어 저장 및 실시간 랭킹 서버 반영
    if (this.nickname) {
      this.hasUnsyncedBest = true;
      this.updateRankingEntry(
        this.nickname,
        Math.max(this.bestStair, reachedStair),
        Math.max(this.bestIQ, reachedIQ),
        false
      );
      this.fetchOnlineRankings(false);
    }

    this.currentStair = 0;
    this.iq = 0;
    this.state = 'FAIL';
    sfx.stopBGM();
    sfx.baboFail();
    this.updateHUD();
    this.renderRankingBoards();

    document.getElementById('fail-reason-text').textContent = reasonText;
    document.getElementById('fail-reached-stair').textContent = reachedStair;
    document.getElementById('fail-reached-iq').textContent = reachedIQ;
    document.getElementById('fail-coins-kept').textContent = this.coins;

    const solBox = document.getElementById('fail-solution-box');
    if (solutionText) {
      solBox.textContent = solutionText;
      solBox.classList.remove('hidden');
    } else {
      solBox.classList.add('hidden');
    }

    this.elFailModal.classList.add('active');
  }

  update(now) {
    const dt = Math.min(0.1, (now - this.lastFrameTime) / 1000);
    this.lastFrameTime = now;
    this.tick++;

    // 계단 도약 보간 감소
    if (this.climbAnimProgress > 0) {
      this.climbAnimProgress = Math.max(0, this.climbAnimProgress - dt * 8.5);
    }

    // 화면 흔들림 감쇠
    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - dt * 28);
    }

    // 무지개 신발 잔상 자국 자연스럽게 소멸
    for (let i = this.rainbowTrails.length - 1; i >= 0; i--) {
      this.rainbowTrails[i].alpha -= dt * 0.25;
      if (this.rainbowTrails[i].alpha <= 0) {
        this.rainbowTrails.splice(i, 1);
      }
    }

    // 계단 위 원소/초신성 기둥 & 회오리 & 낙뢰 이펙트 업데이트
    for (let i = this.stairEffects.length - 1; i >= 0; i--) {
      const se = this.stairEffects[i];
      se.progress += dt * 2.4;
      se.alpha -= se.decay;
      if (se.alpha <= 0) {
        this.stairEffects.splice(i, 1);
      }
    }

    // 파티클 업데이트 (위치 + 회전)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.vRot) p.rot = (p.rot || 0) + p.vRot;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // 충격파 링 업데이트
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.24;
      sw.alpha -= 0.055;
      if (sw.alpha <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }

    // 플레이 중 장착 아이템 상시 앰비언트(Ambient) 오라 파티클 생성
    if (this.state === 'PLAYING' && this.tick % 3 === 0) {
      const curS = this.stairs[this.currentStair] || { x: 0, y: 0 };
      const wx = curS.x * 54;
      const wy = -curS.y * 34;

      if (this.equipped.accessory === 'aura_crown') {
        const cols = ['#38bdf8', '#fde047', '#f472b6', '#67e8f9'];
        const col = cols[this.tick % cols.length];
        this.particles.push({
          x: wx + randInt(-26, 26),
          y: wy - randInt(20, 96),
          vx: (Math.random() - 0.5) * 1.2,
          vy: -0.8 - Math.random() * 1.5,
          size: 4.5 + Math.random() * 3.5,
          color: col,
          glow: col,
          rot: Math.random() * Math.PI,
          vRot: 0.1,
          alpha: 0.9,
          decay: 0.04,
          type: 'star4'
        });
      }

      if (this.equipped.shoe === 'shoe_fire') {
        this.particles.push({
          x: wx + randInt(-14, 14),
          y: wy + randInt(-4, 2),
          vx: (Math.random() - 0.5) * 1.2,
          vy: -1.5 - Math.random() * 2,
          size: 5 + Math.random() * 4,
          color: this.tick % 2 === 0 ? '#f97316' : '#fde047',
          glow: '#ef4444',
          alpha: 0.85,
          decay: 0.05,
          type: 'flame'
        });
      } else if (this.equipped.shoe === 'shoe_lightning') {
        this.particles.push({
          x: wx + randInt(-16, 16),
          y: wy + randInt(-14, 2),
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: 5 + Math.random() * 4,
          color: this.tick % 2 === 0 ? '#fef08a' : '#38bdf8',
          glow: '#facc15',
          rot: Math.random() * Math.PI * 2,
          alpha: 0.9,
          decay: 0.07,
          type: 'lightning_bolt'
        });
      } else if (this.equipped.shoe === 'shoe_wind') {
        this.particles.push({
          x: wx + randInt(-16, 16),
          y: wy + randInt(-8, 2),
          vx: -this.playerFacing * (1.5 + Math.random() * 2),
          vy: -0.8 - Math.random() * 1.5,
          size: 5 + Math.random() * 4,
          color: '#67e8f9',
          glow: '#22d3ee',
          rot: Math.random() * Math.PI,
          vRot: 0.2,
          alpha: 0.85,
          decay: 0.05,
          type: 'wind_blade'
        });
      } else if (this.equipped.shoe === 'shoe_rainbow') {
        const c = `hsl(${(this.tick * 12) % 360}, 95%, 62%)`;
        this.particles.push({
          x: wx + randInt(-18, 18),
          y: wy + randInt(-10, 2),
          vx: (Math.random() - 0.5) * 1.8,
          vy: -1 - Math.random() * 2,
          size: 5 + Math.random() * 3,
          color: c,
          glow: c,
          rot: Math.random() * Math.PI,
          vRot: 0.15,
          alpha: 0.9,
          decay: 0.045,
          type: 'star4'
        });
      }
    }

    // 플로팅 텍스트 업데이트
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= 0.024;
      if (ft.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // 고속 질주 잔상 업데이트
    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      this.afterimages[i].alpha -= 0.05;
      if (this.afterimages[i].alpha <= 0) {
        this.afterimages.splice(i, 1);
      }
    }

    if (this.state === 'PLAYING') {
      // 다이아 잭팟 물약 보유 시 등반 중 자동 발동 (1분간 지속)
      if (this.jackpotBuffTimeLeft <= 0 && (this.inventory.fever_jackpot || 0) > 0) {
        this.inventory.fever_jackpot--;
        this.jackpotBuffTimeLeft = 60;
        this.savePersistentData();
        this.updateHUD();
      }

      // 초고속 로켓 부스터 작동 중일 때 자동 등반 처리
      if (this.rocketStepsLeft > 0) {
        this.rocketStepTimer -= dt;
        if (this.rocketStepTimer <= 0) {
          this.rocketStepTimer = 0.055;
          this.rocketStepsLeft--;
          const nextS = this.stairs[this.currentStair + 1];
          const curS = this.stairs[this.currentStair];
          if (nextS && curS) {
            const expectedDir = nextS.x - curS.x;
            const act = this.playerFacing === expectedDir ? 'CLIMB' : 'TURN';
            this.handleAction(act);
          } else {
            this.rocketStepsLeft = 0;
          }
        }
      }

      // 버프 타이머 감소
      let buffChanged = false;
      if (this.slowBuffTimeLeft > 0) {
        this.slowBuffTimeLeft = Math.max(0, this.slowBuffTimeLeft - dt);
        buffChanged = true;
      }
      if (this.compassBuffTimeLeft > 0) {
        this.compassBuffTimeLeft = Math.max(0, this.compassBuffTimeLeft - dt);
        buffChanged = true;
      }
      if (this.magnetBuffTimeLeft > 0) {
        this.magnetBuffTimeLeft = Math.max(0, this.magnetBuffTimeLeft - dt);
        buffChanged = true;
      }
      if (this.jackpotBuffTimeLeft > 0) {
        this.jackpotBuffTimeLeft = Math.max(0, this.jackpotBuffTimeLeft - dt);
        buffChanged = true;
      }
      if (buffChanged && this.tick % 15 === 0) {
        this.updateHUD();
      }

      // 1계단 이상 올라갔을 때부터 무한의 계단 스태미나 감소 (슬로우 물약 적용 시 절반 속도!)
      if (this.currentStair > 0) {
        const speedMultiplier = 1 + Math.min(1.5, this.currentStair / 450);
        const slowFactor = this.slowBuffTimeLeft > 0 ? 0.45 : 1.0;
        this.stamina -= 0.22 * speedMultiplier * slowFactor;
        if (this.stamina <= 0) {
          this.stamina = 0;
          this.handleMistakeOrTimeout('시간 초과! 계단 위에서 망설이다가 굴러떨어졌습니다!');
        }
      }
      this.elStaminaBar.style.width = `${Math.max(0, this.stamina)}%`;
    } else if (this.state === 'QUIZ' && this.activeQuiz) {
      // 0.65초 연타 방지 보호 시간이 지나면 보기 버튼 잠금 표시 해제 및 타이머 작동 시작!
      if (now >= this.quizUnlockTime) {
        document.querySelectorAll('#quiz-choices .choice-btn.quiz-safety-locked').forEach((btn) => {
          btn.classList.remove('quiz-safety-locked');
        });
        this.quizTimeRemaining -= dt;
      }

      const ceilSec = Math.ceil(this.quizTimeRemaining);
      if (ceilSec <= 5 && ceilSec > 0 && ceilSec !== this.lastSecTick) {
        this.lastSecTick = ceilSec;
        sfx.tick();
      }

      const ratio = Math.max(0, (this.quizTimeRemaining / this.quizTotalLimit) * 100);
      document.getElementById('quiz-timer-bar').style.width = `${ratio}%`;
      document.getElementById('quiz-time-left').textContent = Math.max(0, this.quizTimeRemaining).toFixed(1);

      if (this.quizTimeRemaining <= 0) {
        // 시간 초과 시에도 0계단으로 떨어지지 않고 IQ만 동결된 채 계속 등반!
        const controlsEl = document.getElementById('controls');
        if (controlsEl) controlsEl.classList.remove('quiz-disabled');
        if (this.elQuizModal) {
          this.elQuizModal.style.display = 'none';
          this.elQuizModal.classList.remove('active');
        }
        sfx.setBGMMode('PLAY');
        sfx.wrongContinue();
        this.stamina = 100;
        this.state = 'PLAYING';
        this.updateHUD();
        this.showBanner(
          `⏰ 제한시간 초과! (정답: ${this.activeQuiz.answer})`,
          `IQ는 오르지 않았지만(현재 IQ ${this.iq}) 추락하지 않고 다음 계단을 계속 오릅니다!`,
          3400
        );
      }
    } else if (this.state === 'FALLING') {
      this.fallVelocity += 0.95;
      this.fallYOffset += this.fallVelocity;
    }

    // 카메라 부드러운 추적
    const cur = this.stairs[this.currentStair] || { x: 0, y: 0 };
    const targetCamX = cur.x * 54;
    const targetCamY = -cur.y * 34;
    this.camX += (targetCamX - this.camX) * 0.24;
    this.camY += (targetCamY - this.camY) * 0.24;
  }

  // 두 HEX 색상을 비율 t(0~1)로 부드럽게 보간하는 헬퍼
  lerpHex(hex1, hex2, t) {
    const c1 = parseInt(hex1.slice(1), 16);
    const c2 = parseInt(hex2.slice(1), 16);
    const r = Math.round(((c1 >> 16) & 255) * (1 - t) + ((c2 >> 16) & 255) * t);
    const g = Math.round(((c1 >> 8) & 255) * (1 - t) + ((c2 >> 8) & 255) * t);
    const b = Math.round((c1 & 255) * (1 - t) + (c2 & 255) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // 50계단마다 순환하며 점점 변하는 시간대(아침 -> 한낮 -> 오후 -> 저녁 노을 -> 밤 -> 새벽 -> 아침) 및 다채로운 풍경 렌더링
  drawBackground(w, h) {
    const timePhases = [
      {
        // 0: 아침 (0~49계단, 300~349계단...)
        name: '🌅 상쾌한 아침',
        skyTop: '#2563eb',
        skyMid: '#60a5fa',
        skyBot: '#fef08a',
        cloudColor: 'rgba(255, 255, 255, 0.85)',
        mtnFar: '#64748b',
        mtnNear: '#334155',
        cityColor: '#1e293b',
        sunAlpha: 1,
        sunYRatio: 0.36,
        sunColor: '#fde047',
        moonAlpha: 0,
        starAlpha: 0,
        auroraAlpha: 0,
        windowLit: 0
      },
      {
        // 1: 한낮 (50~99계단, 350~399계단...)
        name: '☀️ 눈부신 한낮',
        skyTop: '#0284c7',
        skyMid: '#38bdf8',
        skyBot: '#e0f2fe',
        cloudColor: 'rgba(255, 255, 255, 0.9)',
        mtnFar: '#38bdf8',
        mtnNear: '#0284c7',
        cityColor: '#0f172a',
        sunAlpha: 1,
        sunYRatio: 0.19,
        sunColor: '#fef08a',
        moonAlpha: 0,
        starAlpha: 0,
        auroraAlpha: 0,
        windowLit: 0
      },
      {
        // 2: 오후 (100~149계단, 400~449계단...)
        name: '🌤️ 따스한 오후',
        skyTop: '#1d4ed8',
        skyMid: '#60a5fa',
        skyBot: '#fde68a',
        cloudColor: 'rgba(254, 249, 195, 0.82)',
        mtnFar: '#475569',
        mtnNear: '#334155',
        cityColor: '#1e293b',
        sunAlpha: 1,
        sunYRatio: 0.28,
        sunColor: '#facc15',
        moonAlpha: 0,
        starAlpha: 0.08,
        auroraAlpha: 0,
        windowLit: 0.15
      },
      {
        // 3: 저녁 노을 (150~199계단, 450~499계단...)
        name: '🌇 노을 지는 저녁',
        skyTop: '#311042',
        skyMid: '#e11d48',
        skyBot: '#fb923c',
        cloudColor: 'rgba(253, 164, 175, 0.65)',
        mtnFar: '#4c1d95',
        mtnNear: '#31102f',
        cityColor: '#18091c',
        sunAlpha: 0.95,
        sunYRatio: 0.48,
        sunColor: '#f97316',
        moonAlpha: 0.25,
        starAlpha: 0.45,
        auroraAlpha: 0,
        windowLit: 0.75
      },
      {
        // 4: 밤 (200~249계단, 500~549계단...)
        name: '🌃 별이 쏟아지는 밤',
        skyTop: '#050811',
        skyMid: '#0f172a',
        skyBot: '#1e1b4b',
        cloudColor: 'rgba(148, 163, 184, 0.22)',
        mtnFar: '#1e1b4b',
        mtnNear: '#0f172a',
        cityColor: '#090d16',
        sunAlpha: 0,
        sunYRatio: 0.65,
        sunColor: '#ef4444',
        moonAlpha: 1,
        starAlpha: 1,
        auroraAlpha: 0.25,
        windowLit: 1
      },
      {
        // 5: 새벽녘 (250~299계단, 550~599계단...)
        name: '🌌 신비로운 새벽녘',
        skyTop: '#1e1b4b',
        skyMid: '#6b21a8',
        skyBot: '#f472b6',
        cloudColor: 'rgba(244, 114, 182, 0.45)',
        mtnFar: '#3b0764',
        mtnNear: '#1e1b4b',
        cityColor: '#0f172a',
        sunAlpha: 0.35,
        sunYRatio: 0.52,
        sunColor: '#fb7185',
        moonAlpha: 0.65,
        starAlpha: 0.7,
        auroraAlpha: 0.9,
        windowLit: 0.55
      }
    ];

    const totalPhases = timePhases.length;
    const rawPhase = (this.currentStair / 50) % totalPhases;
    const phaseIdx = Math.floor(rawPhase);
    const nextIdx = (phaseIdx + 1) % totalPhases;
    // 계단을 오를 때마다 다음 시간대로 조금씩 부드럽게 그라데이션 전이!
    const blend = rawPhase - phaseIdx;

    const curP = timePhases[phaseIdx];
    const nxtP = timePhases[nextIdx];

    const skyTop = this.lerpHex(curP.skyTop, nxtP.skyTop, blend);
    const skyMid = this.lerpHex(curP.skyMid, nxtP.skyMid, blend);
    const skyBot = this.lerpHex(curP.skyBot, nxtP.skyBot, blend);
    const mtnFarCol = this.lerpHex(curP.mtnFar, nxtP.mtnFar, blend);
    const mtnNearCol = this.lerpHex(curP.mtnNear, nxtP.mtnNear, blend);
    const cityCol = this.lerpHex(curP.cityColor, nxtP.cityColor, blend);

    const sunAlpha = curP.sunAlpha * (1 - blend) + nxtP.sunAlpha * blend;
    const sunYRatio = curP.sunYRatio * (1 - blend) + nxtP.sunYRatio * blend;
    const sunCol = this.lerpHex(curP.sunColor, nxtP.sunColor, blend);
    const moonAlpha = curP.moonAlpha * (1 - blend) + nxtP.moonAlpha * blend;
    const starAlpha = curP.starAlpha * (1 - blend) + nxtP.starAlpha * blend;
    const auroraAlpha = curP.auroraAlpha * (1 - blend) + nxtP.auroraAlpha * blend;
    const windowLit = curP.windowLit * (1 - blend) + nxtP.windowLit * blend;

    // 1) 3단 하늘 그라데이션
    const grad = this.ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, skyTop);
    grad.addColorStop(0.55, skyMid);
    grad.addColorStop(1, skyBot);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, w, h);

    // 2) 밤 & 새벽 반짝이는 별자리 + 별똥별(유성)
    if (starAlpha > 0.02) {
      this.ctx.save();
      this.bgStars.forEach((st) => {
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(this.tick * 0.06 + st.phase));
        this.ctx.globalAlpha = starAlpha * twinkle;
        this.ctx.fillStyle = '#ffffff';
        const sx = st.rx * w;
        const sy = st.ry * h;
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, st.size, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // 주기적으로 밤하늘을 가르는 별똥별(Shooting Star)
      const meteorCycle = (this.tick % 180) / 45;
      if (meteorCycle < 1.0) {
        const mx = w * 0.85 - meteorCycle * w * 0.55;
        const my = h * 0.1 + meteorCycle * h * 0.25;
        this.ctx.globalAlpha = starAlpha * (1 - meteorCycle);
        const mGrad = this.ctx.createLinearGradient(mx, my, mx + 55, my - 28);
        mGrad.addColorStop(0, '#ffffff');
        mGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        this.ctx.strokeStyle = mGrad;
        this.ctx.lineWidth = 2.5;
        this.ctx.beginPath();
        this.ctx.moveTo(mx, my);
        this.ctx.lineTo(mx + 55, my - 28);
        this.ctx.stroke();
      }
      this.ctx.restore();
    }

    // 3) 새벽녘 신비로운 오로라(Aurora Borealis) 물결
    if (auroraAlpha > 0.02) {
      this.ctx.save();
      this.ctx.globalAlpha = auroraAlpha * 0.45;
      for (let band = 0; band < 2; band++) {
        const aGrad = this.ctx.createLinearGradient(0, h * 0.08, w, h * 0.32);
        aGrad.addColorStop(0, 'rgba(52, 211, 153, 0)');
        aGrad.addColorStop(0.3, band === 0 ? 'rgba(52, 211, 153, 0.7)' : 'rgba(56, 189, 248, 0.65)');
        aGrad.addColorStop(0.7, 'rgba(192, 132, 252, 0.65)');
        aGrad.addColorStop(1, 'rgba(244, 114, 182, 0)');
        this.ctx.fillStyle = aGrad;
        this.ctx.beginPath();
        const baseY = h * (0.14 + band * 0.08);
        this.ctx.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 30) {
          const wave = Math.sin(x * 0.015 + this.tick * 0.04 + band * 2) * 18;
          this.ctx.lineTo(x, baseY + wave);
        }
        this.ctx.lineTo(w, baseY + 55);
        this.ctx.lineTo(0, baseY + 55);
        this.ctx.closePath();
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // 4) 태양 (아침 일출 -> 한낮 정오 -> 오후 -> 저녁 붉은 석양)
    if (sunAlpha > 0.02) {
      this.ctx.save();
      this.ctx.globalAlpha = sunAlpha;
      const sunX = w * (0.22 + ((phaseIdx + blend) % 4) * 0.16);
      const sunY = h * sunYRatio;
      const sunR = phaseIdx === 3 ? 44 : 32;

      const sHalo = this.ctx.createRadialGradient(sunX, sunY, sunR * 0.3, sunX, sunY, sunR * 2.4);
      sHalo.addColorStop(0, '#ffffff');
      sHalo.addColorStop(0.35, sunCol);
      sHalo.addColorStop(1, 'rgba(251, 146, 60, 0)');
      this.ctx.fillStyle = sHalo;
      this.ctx.beginPath();
      this.ctx.arc(sunX, sunY, sunR * 2.4, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = '#fef9c3';
      this.ctx.beginPath();
      this.ctx.arc(sunX, sunY, sunR * 0.75, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 5) 초승달 (저녁 -> 밤 -> 새벽)
    if (moonAlpha > 0.02) {
      this.ctx.save();
      this.ctx.globalAlpha = moonAlpha;
      const moonX = w * 0.78;
      const moonY = h * 0.2;
      this.ctx.shadowColor = '#fef08a';
      this.ctx.shadowBlur = 22;
      this.ctx.fillStyle = '#fef9c3';
      this.ctx.beginPath();
      this.ctx.arc(moonX, moonY, 26, 0, Math.PI * 2);
      this.ctx.fill();

      // 초승달 그림자 컷아웃
      this.ctx.shadowBlur = 0;
      this.ctx.fillStyle = skyTop;
      this.ctx.beginPath();
      this.ctx.arc(moonX - 10, moonY - 6, 23, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 6) 하늘 위 풍경 오브젝트: 열기구(아침/한낮/오후), 천공 풍차섬(오후/저녁), 새떼(낮), 풍등(저녁/밤/새벽)
    // 6-A) 둥둥 떠다니는 알록달록 열기구 (아침 ~ 오후 구간에 선명하게 등장)
    if (sunAlpha > 0.25) {
      this.ctx.save();
      this.ctx.globalAlpha = Math.min(0.9, sunAlpha);
      this.bgBalloons.forEach((b, idx) => {
        const bx = ((b.x - this.camX * 0.12 + this.tick * b.speed) % (w + 160) + (w + 160)) % (w + 160) - 80;
        const by = ((b.y - this.camY * 0.15 + Math.sin(this.tick * 0.04 + idx) * 8) % (h * 0.65) + h * 0.65) % (h * 0.65) + 60;
        const r = 18 * b.scale;

        // 열기구 바구니 줄 & 바구니
        this.ctx.strokeStyle = '#78350f';
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();
        this.ctx.moveTo(bx - 5, by + r * 0.8);
        this.ctx.lineTo(bx - 3, by + r * 1.35);
        this.ctx.moveTo(bx + 5, by + r * 0.8);
        this.ctx.lineTo(bx + 3, by + r * 1.35);
        this.ctx.stroke();

        this.ctx.fillStyle = '#92400e';
        this.ctx.fillRect(bx - 5, by + r * 1.35, 10, 7);

        // 열기구 풍선 본체
        this.ctx.fillStyle = b.color1;
        this.ctx.beginPath();
        this.ctx.arc(bx, by, r, 0, Math.PI * 2);
        this.ctx.fill();

        // 열기구 세로 줄무늬
        this.ctx.fillStyle = b.color2;
        this.ctx.beginPath();
        this.ctx.ellipse(bx, by, r * 0.48, r, 0, 0, Math.PI * 2);
        this.ctx.fill();
      });
      this.ctx.restore();
    }

    // 6-B) 하늘을 날아가는 새떼 (아침 / 오후 / 저녁 노을)
    if (phaseIdx === 0 || phaseIdx === 2 || phaseIdx === 3) {
      this.ctx.save();
      this.ctx.strokeStyle = phaseIdx === 3 ? '#1e1b4b' : '#334155';
      this.ctx.lineWidth = 2;
      const flockBaseX = ((this.tick * 0.9 - this.camX * 0.15) % (w + 220) + (w + 220)) % (w + 220) - 110;
      const flockBaseY = h * 0.26 + Math.sin(this.tick * 0.02) * 20;
      this.bgBirds.forEach((bd) => {
        const bx = flockBaseX - bd.offsetX;
        const by = flockBaseY + bd.offsetY;
        const wingY = Math.sin(this.tick * 0.22 + bd.flapPhase) * 5;
        this.ctx.beginPath();
        this.ctx.moveTo(bx - 7, by - wingY);
        this.ctx.quadraticCurveTo(bx - 3, by - 4, bx, by);
        this.ctx.quadraticCurveTo(bx + 3, by - 4, bx + 7, by - wingY);
        this.ctx.stroke();
      });
      this.ctx.restore();
    }

    // 6-C) 밤과 새벽 하늘로 떠오르는 소원 풍등(Sky Lanterns)
    if (moonAlpha > 0.2) {
      this.ctx.save();
      this.ctx.globalAlpha = Math.min(0.95, moonAlpha);
      for (let i = 0; i < 6; i++) {
        const lx = ((i * 95 + 40 - this.camX * 0.15 + Math.sin(this.tick * 0.03 + i) * 14) % (w + 80) + (w + 80)) % (w + 80) - 40;
        const ly = ((i * 120 - this.tick * 0.45 - this.camY * 0.18) % (h * 0.75) + h * 0.75) % (h * 0.75) + 40;
        this.ctx.shadowColor = '#f97316';
        this.ctx.shadowBlur = 14;
        this.ctx.fillStyle = '#fb923c';
        this.ctx.beginPath();
        this.ctx.roundRect(lx - 6, ly - 8, 12, 15, 4);
        this.ctx.fill();
        this.ctx.fillStyle = '#fef08a';
        this.ctx.beginPath();
        this.ctx.arc(lx, ly + 2, 3.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // 7) 구름 (시간대에 따라 색상이 자연스럽게 물듦)
    this.ctx.save();
    this.ctx.fillStyle = curP.cloudColor;
    this.clouds.forEach((c) => {
      const screenX = ((c.x - this.camX * 0.22 + this.tick * 0.22) % (w + 240) + (w + 240)) % (w + 240) - 120;
      const screenY = ((c.y - this.camY * 0.22) % (h + 200) + (h + 200)) % (h + 200) - 100;
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, 26 * c.scale, 0, Math.PI * 2);
      this.ctx.arc(screenX + 22 * c.scale, screenY - 6 * c.scale, 20 * c.scale, 0, Math.PI * 2);
      this.ctx.arc(screenX - 20 * c.scale, screenY + 2 * c.scale, 18 * c.scale, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.restore();

    // 8) 하단 패럴랙스 원경 산맥 & 도시 스카이라인 / 대관람차 풍경 (하늘만 보이지 않도록 풍부한 지상/원경 레이어 구성!)
    const horizonShift = Math.min(140, Math.max(-40, this.camY * 0.04));
    const baseHorizonY = h - 90 + (horizonShift % 50);

    // 8-A) 먼 산맥 실루엣
    this.ctx.save();
    this.ctx.fillStyle = mtnFarCol;
    this.ctx.globalAlpha = 0.55;
    this.ctx.beginPath();
    this.ctx.moveTo(0, h);
    for (let x = -60; x <= w + 60; x += 60) {
      const worldOffset = x + ((this.camX * 0.06) % 120);
      const peakH = 85 + Math.sin(worldOffset * 0.018) * 38 + Math.cos(worldOffset * 0.035) * 22;
      this.ctx.lineTo(x, baseHorizonY - peakH);
    }
    this.ctx.lineTo(w, h);
    this.ctx.closePath();
    this.ctx.fill();

    // 8-B) 가까운 능선 실루엣
    this.ctx.fillStyle = mtnNearCol;
    this.ctx.globalAlpha = 0.72;
    this.ctx.beginPath();
    this.ctx.moveTo(0, h);
    for (let x = -50; x <= w + 50; x += 50) {
      const worldOffset = x + ((this.camX * 0.12) % 100);
      const peakH = 45 + Math.cos(worldOffset * 0.025) * 26;
      this.ctx.lineTo(x, baseHorizonY - peakH + 18);
    }
    this.ctx.lineTo(w, h);
    this.ctx.closePath();
    this.ctx.fill();

    // 8-C) 회전하는 랜드마크 대관람차(Ferris Wheel) & 도시 빌딩 숲 실루엣
    this.ctx.globalAlpha = 0.85;
    const wheelX = ((w * 0.76 - this.camX * 0.14) % (w + 180) + (w + 180)) % (w + 180) - 90;
    const wheelY = baseHorizonY - 58;
    const wheelR = 36;

    // 관람차 지지대
    this.ctx.strokeStyle = cityCol;
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(wheelX - 18, baseHorizonY + 20);
    this.ctx.lineTo(wheelX, wheelY);
    this.ctx.lineTo(wheelX + 18, baseHorizonY + 20);
    this.ctx.stroke();

    // 관람차 원형 림 & 회전 스포크
    this.ctx.strokeStyle = windowLit > 0.3 ? '#38bdf8' : cityCol;
    this.ctx.lineWidth = 2.2;
    this.ctx.beginPath();
    this.ctx.arc(wheelX, wheelY, wheelR, 0, Math.PI * 2);
    this.ctx.stroke();

    for (let s = 0; s < 8; s++) {
      const ang = this.tick * 0.012 + (s * Math.PI) / 4;
      const gx = wheelX + Math.cos(ang) * wheelR;
      const gy = wheelY + Math.sin(ang) * wheelR;
      this.ctx.strokeStyle = cityCol;
      this.ctx.lineWidth = 1.2;
      this.ctx.beginPath();
      this.ctx.moveTo(wheelX, wheelY);
      this.ctx.lineTo(gx, gy);
      this.ctx.stroke();

      // 관람차 곤돌라 (저녁/밤에는 네온 불빛 점등!)
      this.ctx.fillStyle = windowLit > 0.3 ? (s % 2 === 0 ? '#fde047' : '#f472b6') : cityCol;
      this.ctx.beginPath();
      this.ctx.arc(gx, gy, 3.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 스카이라인 빌딩과 저녁/밤에 켜지는 창문 불빛
    let bxCursor = -((this.camX * 0.16) % 520) - 60;
    while (bxCursor < w + 60) {
      this.cityBuildings.forEach((b, bIdx) => {
        const bx = bxCursor;
        const by = baseHorizonY - b.h + 28;
        if (bx + b.w > -20 && bx < w + 20) {
          this.ctx.fillStyle = cityCol;
          this.ctx.fillRect(bx, by, b.w, b.h + 100);

          if (b.hasSpire) {
            this.ctx.beginPath();
            this.ctx.moveTo(bx + b.w * 0.2, by);
            this.ctx.lineTo(bx + b.w * 0.5, by - 18);
            this.ctx.lineTo(bx + b.w * 0.8, by);
            this.ctx.closePath();
            this.ctx.fill();
          }

          // 저녁 노을 ~ 밤 ~ 새벽에 켜지는 빌딩 창문 야경!
          if (windowLit > 0.08) {
            this.ctx.fillStyle = `rgba(254, 240, 138, ${windowLit * 0.85})`;
            for (let wy = by + 8; wy < baseHorizonY + 8; wy += 12) {
              for (let wx = bx + 6; wx < bx + b.w - 8; wx += 9) {
                if ((wx + wy + bIdx) % 3 !== 0) {
                  this.ctx.fillRect(wx, wy, 4, 6);
                }
              }
            }
          }
        }
        bxCursor += b.w - 2;
      });
    }
    this.ctx.restore();

    // 9) 우측 상단(HUD 아래) 현재 시간대 배지 표시 (50계단마다 전환)
    this.ctx.save();
    const badgeText = `${curP.name} (${Math.floor(this.currentStair / 50) * 50}~${Math.floor(this.currentStair / 50) * 50 + 49}계단)`;
    this.ctx.font = 'bold 11px "Noto Sans KR", sans-serif';
    const textW = this.ctx.measureText(badgeText).width;
    const bx = w - textW - 26;
    const by = 106;
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.roundRect(bx, by, textW + 14, 24, 12);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.fillStyle = '#fef08a';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(badgeText, bx + 7, by + 12);
    this.ctx.restore();

    // 고속 질주(speedCombo >= 4) 시 화면 좌우 익사이팅 스피드 라인 효과!
    if (this.speedCombo >= 4 && this.state === 'PLAYING') {
      this.ctx.save();
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      this.ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const lx = i % 2 === 0 ? randInt(10, 60) : w - randInt(10, 60);
        const ly = ((this.tick * 28 + i * 140) % h);
        this.ctx.beginPath();
        this.ctx.moveTo(lx, ly);
        this.ctx.lineTo(lx, ly + 55);
        this.ctx.stroke();
      }
      this.ctx.restore();
    }
  }

  draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.drawBackground(w, h);

    const shakeX = this.screenShake > 0 ? (Math.random() - 0.5) * this.screenShake * 2 : 0;
    const shakeY = this.screenShake > 0 ? (Math.random() - 0.5) * this.screenShake * 2 : 0;

    const centerX = w / 2 + shakeX;
    const centerY = h * 0.64 + shakeY;

    this.ctx.save();
    this.ctx.translate(centerX - this.camX, centerY - this.camY);

    // 0계단 바닥 플랫폼
    this.ctx.fillStyle = '#475569';
    this.ctx.fillRect(-160, 12, 320, 26);
    this.ctx.fillStyle = '#22c55e';
    this.ctx.fillRect(-160, 6, 320, 8);

    // 계단 그리기
    const startIdx = Math.max(0, this.currentStair - 14);
    const endIdx = Math.min(this.stairs.length - 1, this.currentStair + 26);

    for (let i = startIdx; i <= endIdx; i++) {
      const s = this.stairs[i];
      const sx = s.x * 54;
      const sy = -s.y * 34;

      const isQuizMilestone = i > 0 && i % this.quizInterval === 0;
      const isCoinStep = i > 0 && i % 10 === 0;
      const stairSkin = this.equipped.stair;

      if (isQuizMilestone) {
        this.ctx.fillStyle = '#f59e0b';
        this.ctx.strokeStyle = '#78350f';
      } else if (stairSkin === 'stair_gold') {
        const gGrad = this.ctx.createLinearGradient(sx - 28, sy, sx + 28, sy + 15);
        gGrad.addColorStop(0, '#fef08a');
        gGrad.addColorStop(0.5, '#facc15');
        gGrad.addColorStop(1, '#ca8a04');
        this.ctx.fillStyle = gGrad;
        this.ctx.strokeStyle = '#854d0e';
      } else if (stairSkin === 'stair_candy') {
        this.ctx.fillStyle = i % 2 === 0 ? '#f472b6' : '#34d399';
        this.ctx.strokeStyle = '#ffffff';
      } else if (stairSkin === 'stair_neon') {
        this.ctx.fillStyle = '#0f172a';
        this.ctx.strokeStyle = i % 2 === 0 ? '#22d3ee' : '#ec4899';
      } else {
        this.ctx.fillStyle = isCoinStep ? '#38bdf8' : '#f8fafc';
        this.ctx.strokeStyle = '#334155';
      }
      this.ctx.lineWidth = 2.5;

      this.ctx.beginPath();
      this.ctx.roundRect(sx - 28, sy, 56, 15, 5);
      this.ctx.fill();
      this.ctx.stroke();

      if (!isQuizMilestone && stairSkin === 'stair_candy') {
        this.ctx.fillStyle = '#fef9c3';
        this.ctx.fillRect(sx - 26, sy + 6, 52, 3);
      } else if (!isQuizMilestone && stairSkin === 'stair_neon') {
        this.ctx.fillStyle = i % 2 === 0 ? '#22d3ee' : '#ec4899';
        this.ctx.fillRect(sx - 20, sy + 6, 40, 2);
      }

      this.ctx.fillStyle = isQuizMilestone
        ? '#b45309'
        : stairSkin === 'stair_gold'
        ? '#a16207'
        : stairSkin === 'stair_candy'
        ? '#db2777'
        : stairSkin === 'stair_neon'
        ? '#1e1b4b'
        : '#94a3b8';
      this.ctx.fillRect(sx - 24, sy + 15, 48, 5);

      if (isQuizMilestone) {
        const gradeNum = getGradeForIQ(this.iq);
        this.ctx.fillStyle = '#dc2626';
        this.ctx.font = 'bold 12px "Jua", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`📝 초${gradeNum} 수학시험 (${i}계단)`, sx, sy - 10);
      } else if (isCoinStep) {
        this.ctx.fillStyle = stairSkin === 'stair_neon' ? '#fef08a' : '#0f172a';
        this.ctx.font = 'bold 10px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`🪙 ${i}`, sx, sy + 11);
      }

      // 방향 나침반 버프 활성 시 다음 계단 위에 직관적인 행동 가이드 표시!
      if (this.compassBuffTimeLeft > 0 && i === this.currentStair + 1 && this.state === 'PLAYING') {
        const curS = this.stairs[this.currentStair];
        if (curS) {
          const expectedDir = s.x - curS.x;
          const needTurn = this.playerFacing !== expectedDir;
          this.ctx.save();
          this.ctx.fillStyle = needTurn ? 'rgba(225, 29, 72, 0.92)' : 'rgba(2, 132, 199, 0.92)';
          this.ctx.strokeStyle = '#ffffff';
          this.ctx.lineWidth = 2;
          this.ctx.beginPath();
          this.ctx.roundRect(sx - 34, sy - 30, 68, 20, 10);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.fillStyle = '#ffffff';
          this.ctx.font = 'bold 11px "Jua", sans-serif';
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          this.ctx.fillText(needTurn ? '🔄 방향전환!' : '👟 오르기!', sx, sy - 20);
          this.ctx.restore();
        }
      }
    }

    // 무지개신발 지나온 무지개 자국 렌더링 (네온 프리즘 계단 코팅 & 무지개 아치)
    this.rainbowTrails.forEach((rt) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, rt.alpha);
      const rGrad = this.ctx.createLinearGradient(rt.x - 28, rt.y, rt.x + 28, rt.y);
      rGrad.addColorStop(0, '#ef4444');
      rGrad.addColorStop(0.18, '#f97316');
      rGrad.addColorStop(0.36, '#fde047');
      rGrad.addColorStop(0.54, '#22c55e');
      rGrad.addColorStop(0.72, '#38bdf8');
      rGrad.addColorStop(0.88, '#6366f1');
      rGrad.addColorStop(1, '#d946ef');

      this.ctx.fillStyle = rGrad;
      this.ctx.shadowColor = `hsl(${rt.hue}, 95%, 62%)`;
      this.ctx.shadowBlur = 16;
      this.ctx.beginPath();
      this.ctx.roundRect(rt.x - 28, rt.y - 3, 56, 12, 5);
      this.ctx.fill();

      // 계단 위 영롱한 반투명 무지개 아치 홀로그램
      this.ctx.strokeStyle = rGrad;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(rt.x, rt.y, 24, Math.PI, 0);
      this.ctx.stroke();
      this.ctx.restore();
    });

    // 계단 위 원소/초신성 기둥 & 회오리 & 낙뢰 이펙트 렌더링
    this.stairEffects.forEach((se) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, se.alpha);

      if (se.type === 'wind_vortex') {
        // 에메랄드 폭풍 토네이도 기둥 (계단에서 위로 소용돌이치며 솟구치는 4단 바람 링)
        this.ctx.shadowColor = '#22d3ee';
        this.ctx.shadowBlur = 16;
        for (let ring = 0; ring < 4; ring++) {
          const ry = se.y - ring * 13 - se.progress * 14;
          const rw = 16 + ring * 5 + Math.sin(this.tick * 0.3 + ring) * 3;
          this.ctx.strokeStyle = ring % 2 === 0 ? '#22d3ee' : '#6ee7b7';
          this.ctx.lineWidth = 3 - ring * 0.35;
          this.ctx.beginPath();
          const startAng = this.tick * 0.28 + ring * 1.2;
          this.ctx.ellipse(se.x, ry, rw, 5.5, 0, startAng, startAng + Math.PI * 1.45);
          this.ctx.stroke();
        }
      } else if (se.type === 'fire_pillar') {
        // 치솟는 마그마 화염 불기둥 (계단 전체를 감싸며 솟구치는 3중 불길)
        const pillarH = 55 + Math.sin(se.progress * 4) * 18;
        const fGrad = this.ctx.createLinearGradient(se.x, se.y + 4, se.x, se.y - pillarH);
        fGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
        fGrad.addColorStop(0.4, 'rgba(249, 115, 22, 0.85)');
        fGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.55)');
        fGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

        this.ctx.fillStyle = fGrad;
        this.ctx.shadowColor = '#f97316';
        this.ctx.shadowBlur = 20;
        this.ctx.beginPath();
        this.ctx.moveTo(se.x - 24, se.y + 4);
        this.ctx.quadraticCurveTo(se.x - 28, se.y - pillarH * 0.5, se.x - 10, se.y - pillarH);
        this.ctx.lineTo(se.x, se.y - pillarH * 1.15);
        this.ctx.lineTo(se.x + 10, se.y - pillarH);
        this.ctx.quadraticCurveTo(se.x + 28, se.y - pillarH * 0.5, se.x + 24, se.y + 4);
        this.ctx.closePath();
        this.ctx.fill();
      } else if (se.type === 'lightning_strike') {
        // 하늘에서 계단으로 내리꽂히는 거대한 지그재그 천둥 낙뢰!
        this.ctx.shadowColor = '#facc15';
        this.ctx.shadowBlur = 22;

        // 외곽 네온 블루/골드 전격 광선
        this.ctx.strokeStyle = '#38bdf8';
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        se.segments.forEach((seg, idx) => {
          if (idx === 0) this.ctx.moveTo(seg.x1, seg.y1);
          this.ctx.lineTo(seg.x2 + (Math.random() - 0.5) * 4, seg.y2);
        });
        this.ctx.stroke();

        // 코어 화이트-옐로우 고전압 번개
        this.ctx.strokeStyle = '#fef08a';
        this.ctx.lineWidth = 2.6;
        this.ctx.stroke();

        // 낙뢰 타격 지점 섬광 구
        const flashGrad = this.ctx.createRadialGradient(se.x, se.y, 2, se.x, se.y, 26);
        flashGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        flashGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.7)');
        flashGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        this.ctx.fillStyle = flashGrad;
        this.ctx.beginPath();
        this.ctx.arc(se.x, se.y, 26, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (se.type === 'rainbow_burst') {
        // 프리즘 스타라이트 광선 기둥
        const pGrad = this.ctx.createLinearGradient(se.x, se.y + 4, se.x, se.y - 75);
        pGrad.addColorStop(0, `hsla(${se.hue}, 95%, 65%, 0.8)`);
        pGrad.addColorStop(0.5, `hsla(${(se.hue + 120) % 360}, 95%, 65%, 0.45)`);
        pGrad.addColorStop(1, `hsla(${(se.hue + 240) % 360}, 95%, 65%, 0)`);
        this.ctx.fillStyle = pGrad;
        this.ctx.beginPath();
        this.ctx.fillRect(se.x - 24, se.y - 75, 48, 79);
      } else if (se.type === 'crown_supernova') {
        // 초신성 네온 왕관: 천상의 초신성 빛기둥(Supernova Beam) & 회전하는 8각 마법진!
        const beamGrad = this.ctx.createLinearGradient(se.x, se.y + 6, se.x, se.y - 115);
        beamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
        beamGrad.addColorStop(0.4, 'rgba(244, 114, 182, 0.55)');
        beamGrad.addColorStop(0.75, 'rgba(253, 224, 71, 0.35)');
        beamGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');

        this.ctx.fillStyle = beamGrad;
        this.ctx.shadowColor = '#38bdf8';
        this.ctx.shadowBlur = 20;
        this.ctx.fillRect(se.x - 22, se.y - 115, 44, 120);

        // 중심 코어 화이트-골드 레이저 빔
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        this.ctx.fillRect(se.x - 6, se.y - 115, 12, 120);

        // 계단 바닥의 초신성 8각 별빛 마법진
        drawStar4(this.ctx, se.x, se.y + 2, 26 + se.progress * 10, 8, '#fde047', '#38bdf8', se.progress * 1.5);
      } else if (se.type === 'ice_pillar') {
        const hIce = 48 + se.progress * 12;
        this.ctx.fillStyle = 'rgba(186, 230, 253, 0.8)';
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(se.x - 18, se.y + 4);
        this.ctx.lineTo(se.x - 8, se.y - hIce * 0.8);
        this.ctx.lineTo(se.x, se.y - hIce);
        this.ctx.lineTo(se.x + 8, se.y - hIce * 0.8);
        this.ctx.lineTo(se.x + 18, se.y + 4);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
      } else if (se.type === 'galaxy_vortex') {
        this.ctx.strokeStyle = '#c084fc';
        this.ctx.shadowColor = '#a855f7';
        this.ctx.shadowBlur = 16;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.ellipse(se.x, se.y - 6, 24 + se.progress * 12, 8, 0, 0, Math.PI * 2);
        this.ctx.stroke();
      } else if (se.type === 'cyber_jet') {
        this.ctx.strokeStyle = '#22d3ee';
        this.ctx.lineWidth = 2.5;
        for (let r = 0; r < 3; r++) {
          this.ctx.strokeRect(se.x - 20 - r * 4, se.y - r * 12 - se.progress * 10, 40 + r * 8, 6);
        }
      } else if (se.type === 'math_god_circle') {
        this.ctx.strokeStyle = '#fde047';
        this.ctx.shadowColor = '#f59e0b';
        this.ctx.shadowBlur = 14;
        this.ctx.lineWidth = 2.5;
        this.ctx.beginPath();
        this.ctx.ellipse(se.x, se.y + 2, 28 + se.progress * 14, 9, 0, 0, Math.PI * 2);
        this.ctx.stroke();
      } else if (se.type === 'sword_slash') {
        this.ctx.strokeStyle = '#38bdf8';
        this.ctx.shadowColor = '#67e8f9';
        this.ctx.shadowBlur = 14;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(se.x, se.y, 26, -0.8, 0.8);
        this.ctx.stroke();
      }

      this.ctx.restore();
    });

    // 스텝 & 방향전환 쇼크웨이브 링 렌더링 (네온 발광 포함)
    this.shockwaves.forEach((sw) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, sw.alpha);
      this.ctx.strokeStyle = sw.color;
      this.ctx.lineWidth = sw.lineWidth || 3.5;
      if (sw.glow) {
        this.ctx.shadowColor = sw.glow;
        this.ctx.shadowBlur = 14;
      }
      this.ctx.beginPath();
      this.ctx.ellipse(sw.x, sw.y, sw.radius, sw.radius * 0.45, 0, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    });

    // 고속 질주 잔상(Afterimage) 렌더링
    this.afterimages.forEach((ai) => {
      drawShinYiJun(
        this.ctx,
        ai.x,
        ai.y,
        ai.stageIdx,
        ai.facing,
        0.5,
        ai.footParity,
        this.tick,
        false,
        this.equipped,
        ai.alpha
      );
    });

    // 플레이어 신이준 위치 보간 (이전 계단 -> 현재 계단 도약 모션)
    const curStairObj = this.stairs[this.currentStair] || { x: 0, y: 0 };
    const t = 1 - this.climbAnimProgress;
    const interpX = this.prevStairPos.x + (curStairObj.x - this.prevStairPos.x) * t;
    const interpY = this.prevStairPos.y + (curStairObj.y - this.prevStairPos.y) * t;

    const px = interpX * 54 + (this.state === 'FALLING' ? this.playerFacing * 44 : 0);
    const py = -interpY * 34 + this.fallYOffset;
    const stageIdx = this.getStageIndex();

    drawShinYiJun(
      this.ctx,
      px,
      py,
      stageIdx,
      this.playerFacing,
      this.climbAnimProgress,
      this.stepFootParity,
      this.tick,
      this.state === 'FALLING',
      this.equipped,
      1
    );

    // 고품격 커스텀 파티클 렌더링 (초신성 별빛, 보석, 칼바람, 화염, 번개, 황금깃털)
    this.particles.forEach((p) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      if (p.glow) {
        this.ctx.shadowColor = p.glow;
        this.ctx.shadowBlur = 12;
      }
      this.ctx.fillStyle = p.color;
      this.ctx.strokeStyle = p.color;

      if (p.type === 'star4') {
        drawStar4(this.ctx, p.x, p.y, p.size, p.size * 0.32, p.color, p.glow, p.rot || 0);
      } else if (p.type === 'star5') {
        drawStar5(this.ctx, p.x, p.y, p.size, p.size * 0.42, p.color, p.glow, p.rot || 0);
      } else if (p.type === 'crown_gem') {
        this.ctx.translate(p.x, p.y);
        if (p.rot) this.ctx.rotate(p.rot);
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size);
        this.ctx.lineTo(p.size * 0.65, 0);
        this.ctx.lineTo(0, p.size);
        this.ctx.lineTo(-p.size * 0.65, 0);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      } else if (p.type === 'wind_blade') {
        this.ctx.translate(p.x, p.y);
        if (p.rot) this.ctx.rotate(p.rot);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, -Math.PI * 0.45, Math.PI * 0.45, false);
        this.ctx.arc(-p.size * 0.35, 0, p.size * 0.85, Math.PI * 0.4, -Math.PI * 0.4, true);
        this.ctx.closePath();
        this.ctx.fill();
      } else if (p.type === 'wind_swirl') {
        this.ctx.lineWidth = 2.4;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, p.rot || 0, (p.rot || 0) + Math.PI * 1.25);
        this.ctx.stroke();
      } else if (p.type === 'flame') {
        this.ctx.translate(p.x, p.y);
        if (p.rot) this.ctx.rotate(p.rot);
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size * 1.3);
        this.ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.2, p.size * 0.55, p.size * 0.6);
        this.ctx.arc(0, p.size * 0.55, p.size * 0.55, 0, Math.PI, false);
        this.ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.2, 0, -p.size * 1.3);
        this.ctx.closePath();
        this.ctx.fill();
        // 화염 내부 코어
        this.ctx.fillStyle = '#fef08a';
        this.ctx.beginPath();
        this.ctx.arc(0, p.size * 0.35, p.size * 0.28, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'lightning_bolt') {
        this.ctx.translate(p.x, p.y);
        if (p.rot) this.ctx.rotate(p.rot);
        this.ctx.lineWidth = 2.4;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(-p.size, -p.size * 0.6);
        this.ctx.lineTo(-p.size * 0.2, 0);
        this.ctx.lineTo(p.size * 0.2, -p.size * 0.4);
        this.ctx.lineTo(p.size, p.size * 0.6);
        this.ctx.stroke();
      } else if (p.type === 'feather') {
        this.ctx.translate(p.x, p.y);
        if (p.rot) this.ctx.rotate(p.rot);
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size, p.size * 0.4, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#ca8a04';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-p.size, 0);
        this.ctx.lineTo(p.size, 0);
        this.ctx.stroke();
      } else if (p.type === 'spark') {
        this.ctx.lineWidth = 2.4;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x - p.vx * 2.2, p.y - p.vy * 2.2);
        this.ctx.stroke();
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    });

    // 플로팅 텍스트 렌더링 (코인 획득 / 방향전환 드리프트 콤보)
    this.floatingTexts.forEach((ft) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, ft.alpha);
      this.ctx.font = 'bold 15px "Jua", sans-serif';
      this.ctx.fillStyle = ft.color;
      this.ctx.strokeStyle = '#0f172a';
      this.ctx.lineWidth = 3;
      this.ctx.textAlign = 'center';
      this.ctx.strokeText(ft.text, ft.x, ft.y);
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    });

    this.ctx.restore();

    // 모달 프리뷰 캔버스 애니메이션
    if (this.elStartModal.classList.contains('active')) {
      this.introCtx.clearRect(0, 0, this.introCanvas.width, this.introCanvas.height);
      drawShinYiJun(this.introCtx, 55, 132, 0, 1, 0, 0, this.tick, false, this.equipped, 1);
      this.introCtx.fillStyle = '#b45309';
      this.introCtx.font = 'bold 16px "Jua", sans-serif';
      this.introCtx.textAlign = 'center';
      this.introCtx.fillText('➡', 110, 90);
      drawShinYiJun(this.introCtx, 165, 132, 6, -1, 0, 0, this.tick, false, this.equipped, 1);
    }

    if (this.elFailModal.classList.contains('active')) {
      this.failCtx.clearRect(0, 0, this.failCanvas.width, this.failCanvas.height);
      drawShinYiJun(this.failCtx, 100, 132, 0, 1, 0, 0, this.tick, true, {}, 1);
    }
  }

  loop(now) {
    this.update(now);
    this.draw();
    requestAnimationFrame((ts) => this.loop(ts));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new InfiniteMathStairsGame();
});
