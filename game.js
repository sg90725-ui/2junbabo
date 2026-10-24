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

// 상점 아이템 데이터 정의 (기능 아이템 + 꾸미기 아이템)
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
      id: 'slow_stamina',
      name: '슬로우 타이머 물약',
      icon: '🐢',
      price: 10,
      desc: '1분간 계단 오를 때 제한시간(게이지)이 절반 속도로 천천히 감소합니다.'
    },
    {
      id: 'math_hint',
      name: '수학문제 힌트보기',
      icon: '💡',
      price: 5,
      desc: '수학문제 핵심 풀이 힌트를 보여주고 오답 보기 2개를 제거해 줍니다.'
    },
    {
      id: 'extra_life',
      name: '추가생명 아이템',
      icon: '❤️',
      price: 30,
      desc: '계단에서 떨어지거나 시간이 다 되어도 0계단으로 가지 않고 그 자리에서 즉시 부활합니다.'
    },
    {
      id: 'double_coin',
      name: '황금 코인 자석 (추천)',
      icon: '🧲',
      price: 15,
      desc: '1분간 10계단마다 받는 코인이 2배(2코인)로 증가합니다!'
    },
    {
      id: 'iq_booster',
      name: '천재의 두뇌 비타민 (추천)',
      icon: '🧪',
      price: 25,
      desc: '다음 수학문제를 맞힐 때 IQ가 10 대신 +20 상승합니다!'
    }
  ],
  cosmetic: [
    {
      id: 'shoe_wind',
      slot: 'shoe',
      name: '바람신발',
      icon: '🌪️',
      price: 50,
      desc: '계단을 올라갈 때마다 발에서 시원한 에메랄드 바람 소용돌이 효과가 납니다.'
    },
    {
      id: 'shoe_fire',
      slot: 'shoe',
      name: '불신발',
      icon: '🔥',
      price: 50,
      desc: '계단을 올라갈 때마다 발에서 타오르는 불꽃 화염 효과가 납니다.'
    },
    {
      id: 'shoe_lightning',
      slot: 'shoe',
      name: '번개신발',
      icon: '⚡',
      price: 50,
      desc: '계단을 올라갈 때마다 발에서 짜릿한 황금 번개 스파크 효과가 납니다.'
    },
    {
      id: 'shoe_rainbow',
      slot: 'shoe',
      name: '무지개신발',
      icon: '🌈',
      price: 100,
      desc: '발에서 영롱한 무지개 효과가 나며, 지나온 계단마다 무지개 자국이 남았다가 자연스럽게 사라집니다.'
    },
    {
      id: 'wing_gold',
      slot: 'accessory',
      name: '천재의 황금 날개 (추천)',
      icon: '🪽',
      price: 80,
      desc: '등 뒤에 황금빛 날개가 달려 계단을 오를 때마다 날갯짓과 황금 깃털이 흩날립니다.'
    },
    {
      id: 'aura_crown',
      slot: 'accessory',
      name: '초신성 네온 왕관 (추천)',
      icon: '👑',
      price: 120,
      desc: '머리 위에 둥둥 떠 있는 빛나는 왕관과 반짝이는 별빛 아우라가 함께합니다.'
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

  // Lv.7 천재 황금 아우라 또는 초신성 왕관 아우라
  if ((stageIdx >= 6 || equipped.accessory === 'aura_crown') && !isFailing) {
    const auraRadius = 42 + Math.sin(tick * 0.2) * 5;
    const grad = ctx.createRadialGradient(0, -40, 10, 0, -40, auraRadius);
    grad.addColorStop(0, equipped.accessory === 'aura_crown' ? 'rgba(56, 189, 248, 0.5)' : 'rgba(253, 224, 71, 0.55)');
    grad.addColorStop(1, 'rgba(253, 224, 71, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, -40, auraRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // 꾸미기 아이템: 천재의 황금 날개 (등 뒤)
  if (equipped.accessory === 'wing_gold' && !isFailing) {
    const flap = isClimbing ? Math.sin(climbProgress * Math.PI * 2) * 0.35 : Math.sin(tick * 0.18) * 0.18;
    ctx.save();
    ctx.translate(-10, -36);
    ctx.rotate(flap);
    ctx.fillStyle = '#fde047';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-28, -22, -34, -4);
    ctx.quadraticCurveTo(-24, 4, -28, 10);
    ctx.quadraticCurveTo(-14, 10, 0, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
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

  // 신발 색상 (꾸미기 신발 장착 시 특별 디자인 적용!)
  let shoeColor = '#111827';
  let shoeGlow = null;
  if (equipped.shoe === 'shoe_wind') {
    shoeColor = '#06b6d4';
    shoeGlow = '#67e8f9';
  } else if (equipped.shoe === 'shoe_fire') {
    shoeColor = '#ef4444';
    shoeGlow = '#fde047';
  } else if (equipped.shoe === 'shoe_lightning') {
    shoeColor = '#facc15';
    shoeGlow = '#fef08a';
  } else if (equipped.shoe === 'shoe_rainbow') {
    const hue = (tick * 8) % 360;
    shoeColor = `hsl(${hue}, 90%, 55%)`;
    shoeGlow = '#ffffff';
  } else if (stageIdx === 0 || isFailing) {
    shoeColor = '#d97706';
  } else if (stageIdx <= 2) {
    shoeColor = '#ef4444';
  }

  if (shoeGlow && !isFailing) {
    ctx.shadowColor = shoeGlow;
    ctx.shadowBlur = 8;
  }
  ctx.fillStyle = shoeColor;
  ctx.fillRect(leg1X - 1, leg1Y + 9, 10, 5);
  ctx.fillRect(leg2X - 1, leg2Y + 9, 10, 5);
  ctx.shadowBlur = 0;

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

  // 앞팔 역동적 스윙
  ctx.fillStyle = stageIdx === 0 || isFailing ? '#78350f' : stageIdx >= 5 ? '#1e293b' : '#fde68a';
  ctx.save();
  ctx.translate(4, -38);
  ctx.rotate((armSwing * Math.PI) / 180 * 3.5);
  ctx.fillRect(-3, 0, 6, 15);
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

  // 꾸미기 아이템: 초신성 네온 왕관
  if (equipped.accessory === 'aura_crown' && !isFailing) {
    const crownFloat = Math.sin(tick * 0.16) * 3;
    ctx.save();
    ctx.translate(0, (stageIdx >= 6 ? -102 : -84) + crownFloat);
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-14, -11);
    ctx.lineTo(-6, -5);
    ctx.lineTo(0, -14);
    ctx.lineTo(6, -5);
    ctx.lineTo(14, -11);
    ctx.lineTo(12, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
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

    const savedInterval = Number(localStorage.getItem('2jun_quiz_interval_v2') || 20);
    this.quizInterval = Math.min(999, Math.max(1, savedInterval || 20));

    // 영구 보존 데이터 로드 (코인 + 인벤토리 + 꾸미기 아이템)
    this.loadPersistentData();

    // 캐릭터 모션 및 고속 질주/방향전환 특수효과 상태
    this.playerFacing = 1; // 1: 오른쪽, -1: 왼쪽
    this.prevStairPos = { x: 0, y: 0 };
    this.climbAnimProgress = 0; // 0 ~ 1 보간
    this.stepFootParity = 0;
    this.lastStepTime = 0;
    this.speedCombo = 0;
    this.screenShake = 0;
    this.tick = 0;

    // 파티클, 무지개 자국, 충격파, 플로팅 텍스트, 잔상 배열
    this.particles = [];
    this.rainbowTrails = [];
    this.shockwaves = [];
    this.floatingTexts = [];
    this.afterimages = [];

    // 인게임 버프 타이머 (초)
    this.slowBuffTimeLeft = 0;
    this.magnetBuffTimeLeft = 0;
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

    // 현재 상점 탭
    this.currentShopTab = 'func';

    // 배경 구름
    this.clouds = Array.from({ length: 8 }, (_, i) => ({
      x: (i - 4) * 180,
      y: -i * 160 - 100,
      scale: 0.7 + (i % 3) * 0.25
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

  loadPersistentData() {
    this.coins = Number(localStorage.getItem('2jun_coins') || 0);
    let savedInv = null;
    try {
      savedInv = JSON.parse(localStorage.getItem('2jun_inventory_v1') || 'null');
    } catch (_) {
      savedInv = null;
    }

    this.inventory = savedInv?.counts || {
      time_ext: 0,
      slow_stamina: 0,
      math_hint: 0,
      extra_life: 0,
      double_coin: 0,
      iq_booster: 0
    };
    this.unlockedCosmetics = savedInv?.unlocked || {};
    this.equipped = savedInv?.equipped || {
      shoe: null,
      accessory: null
    };
  }

  savePersistentData() {
    localStorage.setItem('2jun_coins', String(this.coins));
    localStorage.setItem(
      '2jun_inventory_v1',
      JSON.stringify({
        counts: this.inventory,
        unlocked: this.unlockedCosmetics,
        equipped: this.equipped
      })
    );
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
    this.elEvoBanner = document.getElementById('evolution-banner');
    this.elEvoTitle = document.getElementById('evo-title-text');
    this.elEvoDetail = document.getElementById('evo-detail');
    this.elCustomIntervalInput = document.getElementById('custom-interval-input');
    this.elOptionsPreviewText = document.getElementById('options-preview-text');

    if (this.elBestCount) this.elBestCount.textContent = this.bestStair;
    this.syncIntervalLabels();
    this.updateHUD();

    // 시작 및 재시작 버튼
    document.getElementById('btn-start-game')?.addEventListener('click', () => {
      sfx.init();
      this.startGame();
    });

    document.getElementById('btn-retry-game')?.addEventListener('click', () => {
      this.startGame();
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
    document.getElementById('btn-use-slow')?.addEventListener('click', () => this.useSlowStaminaItem());
    document.getElementById('btn-use-magnet')?.addEventListener('click', () => this.useDoubleCoinItem());

    // 퀴즈 내 기능 아이템 버튼 (시간 +30초 / 힌트 보기)
    document.getElementById('btn-quiz-add-time')?.addEventListener('click', () => this.useQuizAddTimeItem());
    document.getElementById('btn-quiz-show-hint')?.addEventListener('click', () => this.useQuizHintItem());

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
      this.handleAction('TURN');
    });

    btnClimb?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.handleAction('CLIMB');
    });

    // 키보드 조작
    window.addEventListener('keydown', (e) => {
      if (this.state === 'QUIZ') {
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

        row.innerHTML = `
          <div class="shop-item-icon">${item.icon}</div>
          <div class="shop-item-info">
            <div class="shop-item-title">
              <span>${item.name}</span>
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
      if (this.coins >= 15) {
        this.coins -= 15;
      } else {
        this.showBanner('🧲 황금 자석 부족!', '상점에서 구매하거나 15코인이 필요합니다.', 2000);
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

  updateQuizItemButtons() {
    const timeCount = this.inventory.time_ext || 0;
    const hintCount = this.inventory.math_hint || 0;
    document.getElementById('quiz-time-item-count').textContent =
      timeCount > 0 ? `(보유: ${timeCount})` : `(즉시구매 🪙10)`;
    document.getElementById('quiz-hint-item-count').textContent =
      hintCount > 0 ? `(보유: ${hintCount})` : `(즉시구매 🪙5)`;
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
    this.elFailModal.classList.remove('active');
    this.elShopModal.classList.remove('active');
    this.elOptionsModal.classList.remove('active');
    this.elEvoBanner.classList.add('hidden');

    this.currentStair = 0;
    this.iq = 0;
    this.stamina = 100;
    this.fallYOffset = 0;
    this.fallVelocity = 0;
    this.speedCombo = 0;
    this.particles = [];
    this.rainbowTrails = [];
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
    if (this.currentStair > this.bestStair) {
      this.bestStair = this.currentStair;
      localStorage.setItem('2jun_best_stair', String(this.bestStair));
      this.elBestCount.textContent = this.bestStair;
    }

    this.elCoinCount.textContent = this.coins;
    const failCoinsEl = document.getElementById('fail-coins-kept');
    if (failCoinsEl) failCoinsEl.textContent = this.coins;
    this.elCharBadge.textContent = stage.badge;
    this.elAvatarEmoji.textContent = stage.emoji;
    this.elStatusName.textContent = `${stage.name} (IQ ${this.iq})`;
    this.elStatusDesc.textContent = stage.desc;

    // 보유 생명 및 퀵 슬롯 수량 업데이트
    const lives = this.inventory.extra_life || 0;
    this.elLifeBadge.textContent = `❤️ x${lives}`;
    document.getElementById('quick-slow-count').textContent = this.inventory.slow_stamina || 0;
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
    if (this.magnetBuffTimeLeft > 0) {
      const tag = document.createElement('span');
      tag.className = 'buff-tag';
      tag.textContent = `🧲 2배코인 ${Math.ceil(this.magnetBuffTimeLeft)}s`;
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

  // 신발 꾸미기 효과 및 방향 전환 특수효과 파티클 스폰
  spawnStepEffects(stairX, stairY, isTurn, isFast) {
    const worldX = stairX * 54;
    const worldY = -stairY * 34;

    // 1) 무지개신발: 지나온 계단에 무지개 자국 남기기 (오래된 것부터 서서히 사라짐)
    if (this.equipped.shoe === 'shoe_rainbow') {
      this.rainbowTrails.push({
        x: worldX,
        y: worldY,
        alpha: 0.95,
        hue: (this.currentStair * 28) % 360
      });
    }

    // 2) 장착한 신발별 발밑 파티클 생성
    const shoe = this.equipped.shoe;
    if (shoe === 'shoe_wind') {
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: worldX + randInt(-18, 18),
          y: worldY + randInt(-6, 4),
          vx: -this.playerFacing * (2 + Math.random() * 4),
          vy: -0.5 - Math.random() * 2,
          size: 4 + Math.random() * 5,
          color: i % 2 === 0 ? '#22d3ee' : '#a5f3fc',
          alpha: 1,
          decay: 0.045,
          type: 'wind'
        });
      }
    } else if (shoe === 'shoe_fire') {
      for (let i = 0; i < 10; i++) {
        this.particles.push({
          x: worldX + randInt(-16, 16),
          y: worldY + randInt(-4, 4),
          vx: (Math.random() - 0.5) * 3,
          vy: -1.5 - Math.random() * 3.5,
          size: 5 + Math.random() * 6,
          color: ['#ef4444', '#f97316', '#fde047'][i % 3],
          alpha: 1,
          decay: 0.04,
          type: 'fire'
        });
      }
    } else if (shoe === 'shoe_lightning') {
      for (let i = 0; i < 7; i++) {
        this.particles.push({
          x: worldX + randInt(-15, 15),
          y: worldY + randInt(-10, 5),
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          size: 3 + Math.random() * 4,
          color: i % 2 === 0 ? '#facc15' : '#38bdf8',
          alpha: 1,
          decay: 0.06,
          type: 'spark'
        });
      }
    } else if (shoe === 'shoe_rainbow') {
      for (let i = 0; i < 10; i++) {
        this.particles.push({
          x: worldX + randInt(-18, 18),
          y: worldY + randInt(-6, 4),
          vx: (Math.random() - 0.5) * 4,
          vy: -1 - Math.random() * 3,
          size: 4 + Math.random() * 5,
          color: `hsl(${randInt(0, 360)}, 95%, 60%)`,
          alpha: 1,
          decay: 0.035,
          type: 'star'
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

    // 3) 황금 날개 장착 시 황금 깃털 파티클
    if (this.equipped.accessory === 'wing_gold') {
      for (let i = 0; i < 3; i++) {
        this.particles.push({
          x: worldX - this.playerFacing * 14 + randInt(-8, 8),
          y: worldY - 35 + randInt(-8, 8),
          vx: -this.playerFacing * (1 + Math.random() * 2),
          vy: 0.5 + Math.random() * 1.2,
          size: 4,
          color: '#fde047',
          alpha: 1,
          decay: 0.03,
          type: 'feather'
        });
      }
    }

    // 4) 빠른 속도 유지 중 방향 전환(TURN) 시 익사이팅 특수효과 폭발!
    if (isTurn) {
      const ringColor = isFast ? '#fde047' : '#fb7185';
      this.shockwaves.push({
        x: worldX,
        y: worldY - 12,
        radius: 8,
        maxRadius: isFast ? 72 : 46,
        color: ringColor,
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

      // 10계단마다 1코인 지급 (황금 자석 버프 시 2코인!)
      if (this.currentStair > 0 && this.currentStair % 10 === 0) {
        const earned = this.magnetBuffTimeLeft > 0 ? 2 : 1;
        this.coins += earned;
        this.savePersistentData();
        sfx.coin();
        this.floatingTexts.push({
          x: nextStairObj.x * 54,
          y: -nextStairObj.y * 34 - 95,
          text: `+${earned} 🪙 COIN!`,
          color: '#fef08a',
          alpha: 1,
          vy: -1.5
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

    const quiz = generateMathProblemByIQ(this.iq);
    this.activeQuiz = quiz;
    this.quizTimeRemaining = quiz.timeLimit;
    this.quizTotalLimit = quiz.timeLimit;
    this.quizHintUsed = false;
    this.lastSecTick = Math.ceil(quiz.timeLimit);

    const stageIdx = this.getStageIndex();
    const curStage = STAGES[stageIdx] || STAGES[0];
    const iqGain = (this.inventory && this.inventory.iq_booster > 0) || this.iqBoosterActive ? 20 : 10;

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
    if (questionSub) questionSub.textContent = `${quiz.subHint} (제한시간 ${quiz.timeLimit}초 / 틀려도 떨어지지 않아요!)`;

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
        btn.className = 'choice-btn';
        btn.dataset.val = choiceVal;
        btn.textContent = `${idx + 1}번) ${choiceVal}`;
        btn.addEventListener('click', () => this.checkQuizAnswer(choiceVal));
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

    if (this.elQuizModal) {
      this.elQuizModal.style.display = 'none';
      this.elQuizModal.classList.remove('active');
    }
    sfx.setBGMMode('PLAY');

    if (Number(userValue) === this.activeQuiz.answer) {
      // 정답! IQ +10 (또는 비타민 보유 시 +20) 상승!
      const prevGrade = getGradeForIQ(this.iq);
      const prevStageIdx = this.getStageIndex(this.iq);

      let iqDelta = 10;
      if ((this.inventory.iq_booster || 0) > 0) {
        this.inventory.iq_booster--;
        this.iqBoosterActive = (this.inventory.iq_booster || 0) > 0;
        iqDelta = 20;
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
    this.currentStair = 0;
    this.iq = 0;
    this.state = 'FAIL';
    sfx.stopBGM();
    sfx.baboFail();
    this.updateHUD();

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
      this.rainbowTrails[i].alpha -= dt * 0.32;
      if (this.rainbowTrails[i].alpha <= 0) {
        this.rainbowTrails.splice(i, 1);
      }
    }

    // 파티클 업데이트
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // 방향전환 충격파 링 업데이트
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.25;
      sw.alpha -= 0.065;
      if (sw.alpha <= 0) {
        this.shockwaves.splice(i, 1);
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
      // 버프 타이머 감소
      let buffChanged = false;
      if (this.slowBuffTimeLeft > 0) {
        this.slowBuffTimeLeft = Math.max(0, this.slowBuffTimeLeft - dt);
        buffChanged = true;
      }
      if (this.magnetBuffTimeLeft > 0) {
        this.magnetBuffTimeLeft = Math.max(0, this.magnetBuffTimeLeft - dt);
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
      this.quizTimeRemaining -= dt;

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

  drawBackground(w, h) {
    const stageIdx = this.getStageIndex();
    const skyPalettes = [
      ['#38bdf8', '#bae6fd'],
      ['#60a5fa', '#dbeafe'],
      ['#34d399', '#a7f3d0'],
      ['#fb923c', '#fde68a'],
      ['#818cf8', '#c7d2fe'],
      ['#1e1b4b', '#312e81'],
      ['#090d16', '#1e293b']
    ];
    const [topColor, botColor] = skyPalettes[stageIdx] || skyPalettes[0];
    const grad = this.ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, topColor);
    grad.addColorStop(1, botColor);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, w, h);

    // 구름
    this.ctx.save();
    this.ctx.fillStyle = stageIdx >= 5 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.65)';
    this.clouds.forEach((c) => {
      const screenX = ((c.x - this.camX * 0.25 + this.tick * 0.2) % (w + 240) + (w + 240)) % (w + 240) - 120;
      const screenY = ((c.y - this.camY * 0.25) % (h + 200) + (h + 200)) % (h + 200) - 100;
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, 26 * c.scale, 0, Math.PI * 2);
      this.ctx.arc(screenX + 22 * c.scale, screenY - 6 * c.scale, 20 * c.scale, 0, Math.PI * 2);
      this.ctx.arc(screenX - 20 * c.scale, screenY + 2 * c.scale, 18 * c.scale, 0, Math.PI * 2);
      this.ctx.fill();
    });
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

      this.ctx.fillStyle = isQuizMilestone ? '#f59e0b' : isCoinStep ? '#38bdf8' : '#f8fafc';
      this.ctx.strokeStyle = isQuizMilestone ? '#78350f' : '#334155';
      this.ctx.lineWidth = 2.5;

      this.ctx.beginPath();
      this.ctx.roundRect(sx - 28, sy, 56, 15, 5);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = isQuizMilestone ? '#b45309' : '#94a3b8';
      this.ctx.fillRect(sx - 24, sy + 15, 48, 5);

      if (isQuizMilestone) {
        const gradeNum = getGradeForIQ(this.iq);
        this.ctx.fillStyle = '#dc2626';
        this.ctx.font = 'bold 12px "Jua", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`📝 초${gradeNum} 수학시험 (${i}계단)`, sx, sy - 10);
      } else if (isCoinStep) {
        this.ctx.fillStyle = '#0f172a';
        this.ctx.font = 'bold 10px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`🪙 ${i}`, sx, sy + 11);
      }
    }

    // 무지개신발 지나온 무지개 자국 렌더링 (오래된 자국부터 자연스럽게 투명해지며 사라짐)
    this.rainbowTrails.forEach((rt) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, rt.alpha);
      const rGrad = this.ctx.createLinearGradient(rt.x - 28, rt.y, rt.x + 28, rt.y);
      rGrad.addColorStop(0, '#ef4444');
      rGrad.addColorStop(0.2, '#f59e0b');
      rGrad.addColorStop(0.4, '#eab308');
      rGrad.addColorStop(0.6, '#22c55e');
      rGrad.addColorStop(0.8, '#3b82f6');
      rGrad.addColorStop(1, '#a855f7');
      this.ctx.fillStyle = rGrad;
      this.ctx.shadowColor = `hsl(${rt.hue}, 95%, 60%)`;
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.roundRect(rt.x - 27, rt.y - 2, 54, 8, 4);
      this.ctx.fill();
      this.ctx.restore();
    });

    // 방향전환 쇼크웨이브 링 렌더링
    this.shockwaves.forEach((sw) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, sw.alpha);
      this.ctx.strokeStyle = sw.color;
      this.ctx.lineWidth = 3.5;
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

    // 파티클 렌더링 (바람, 불, 번개, 무지개)
    this.particles.forEach((p) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      if (p.type === 'spark') {
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
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
