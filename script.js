// Vibe Finder: логика опроса, тем, музыки и итогового игрового экрана.

const screens = {
  home: document.getElementById('home-screen'),
  survey: document.getElementById('survey-screen'),
  vibe: document.getElementById('vibe-screen'),
};

const startButton = document.getElementById('start-btn');
const returnButton = document.getElementById('return-btn');
const progressLabel = document.getElementById('progress-label');
const progressFill = document.getElementById('progress-fill');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const quoteText = document.getElementById('quote-text');
const themeName = document.getElementById('theme-name');
const themeDescription = document.getElementById('theme-description');
const quoteCard = document.getElementById('quote-card');
const particlesWrap = document.getElementById('particles');
const gamePanel = document.getElementById('game-panel');
const playerTitle = document.getElementById('player-track-title');
const playerAuthor = document.getElementById('player-track-author');
const playerPlayBtn = document.getElementById('player-play');
const playerStopBtn = document.getElementById('player-stop');
const playerRewindBtn = document.getElementById('player-rewind');
const playerForwardBtn = document.getElementById('player-forward');
const playerCurrentTime = document.getElementById('player-current-time');
const playerTotalTime = document.getElementById('player-total-time');
const playerSeek = document.getElementById('player-seek');
const playerVolume = document.getElementById('player-volume');
const playerCollapseBtn = document.getElementById('player-collapse');
const playerCard = document.getElementById('vibe-audio-player');

const questions = [
  {
    text: 'Какое у тебя настроение прямо сейчас?',
    options: [
      { label: 'Спокойно', value: { cosmos: 2, solar: 0, neon: 1, forest: 2 } },
      { label: 'Тревожно', value: { cosmos: 0, solar: 1, neon: 2, forest: 0 } },
      { label: 'Энергично', value: { cosmos: 0, solar: 3, neon: 1, forest: 0 } },
      { label: 'Хочу отдохнуть', value: { cosmos: 3, solar: 1, neon: 0, forest: 3 } },
    ],
  },
  {
    text: 'Какая энергия ближе к тебе?',
    options: [
      { label: 'Лёгкая и мягкая', value: { cosmos: 3, solar: 0, neon: 1, forest: 3 } },
      { label: 'Жаркая и активная', value: { cosmos: 0, solar: 3, neon: 1, forest: 0 } },
      { label: 'Ночные импульсы', value: { cosmos: 0, solar: 1, neon: 3, forest: 0 } },
      { label: 'Нам нужен ресет', value: { cosmos: 2, solar: 1, neon: 0, forest: 2 } },
    ],
  },
  {
    text: 'Что хочется сделать прямо сейчас?',
    options: [
      { label: 'Побыть в тишине', value: { cosmos: 3, solar: 0, neon: 0, forest: 3 } },
      { label: 'Создать волну', value: { cosmos: 1, solar: 2, neon: 2, forest: 0 } },
      { label: 'Погрузиться в ритм', value: { cosmos: 0, solar: 1, neon: 3, forest: 0 } },
      { label: 'Сделать паузу и восстановиться', value: { cosmos: 2, solar: 1, neon: 0, forest: 3 } },
    ],
  },
  {
    text: 'Какой тип общения тебя сейчас тянет?',
    options: [
      { label: 'Тихий и уютный', value: { cosmos: 3, solar: 0, neon: 1, forest: 3 } },
      { label: 'Весёлый и живой', value: { cosmos: 1, solar: 3, neon: 1, forest: 0 } },
      { label: 'Креативный и яркий', value: { cosmos: 0, solar: 2, neon: 3, forest: 0 } },
      { label: 'В одиночестве', value: { cosmos: 2, solar: 0, neon: 1, forest: 2 } },
    ],
  },
  {
    text: 'Что лучше всего подходит под твой ритм?',
    options: [
      { label: 'Медленные мысли', value: { cosmos: 3, solar: 0, neon: 0, forest: 3 } },
      { label: 'Движение и свет', value: { cosmos: 0, solar: 3, neon: 1, forest: 0 } },
      { label: 'Неоновая энергия', value: { cosmos: 0, solar: 1, neon: 3, forest: 0 } },
      { label: 'Тихий reset', value: { cosmos: 2, solar: 0, neon: 0, forest: 3 } },
    ],
  },
];

const vibeThemes = {
  cosmos: {
    title: 'Спокойный космос',
    description: 'Плавное тёмно-фиолетовое пространство, мягкие звёзды и медитативная глубина. Здесь можно замедлиться и собраться с мыслями.',
    quotes: [
      'Тишина — это тоже движение. Просто очень красивое.',
      'Звёзды не спешат — и это делает их ближе.',
      'Каждая пауза — это маленький космос для себя.',
      'Внутри тебя уже есть пространство, в котором можно дышать.',
    ],
    palette: 'theme-cosmos',
    track: { title: 'Cosmos Drift', author: 'Aural Tide', file: 'audio/cosmos.mp3' },
  },
  solar: {
    title: 'Солнечный заряд',
    description: 'Тёплые жёлтые лучи, бодрящее сияние и очень приятная энергия. Это вайб для подъёма, мотивации и лёгкого драйва.',
    quotes: [
      'День начинается не с скорости, а с света.',
      'Энергия — это не шум, а тепло внутри.',
      'Когда внутри солнце, даже мелочи начинают играть.',
      'Двигайся к своему ритму — он тоже сияет.',
    ],
    palette: 'theme-solar',
    track: { title: 'Sunset Pulse', author: 'Golden Echo', file: 'audio/sunny.mp3' },
  },
  neon: {
    title: 'Ночной неон',
    description: 'Городские огни, чёрный фон и тикание ритма. Здесь можно включить характер и почувствовать ночную магию.',
    quotes: [
      'Ночь — это не затемнение, а свет в другом ключе.',
      'Ритм делает пространство живым, даже если вокруг тишина.',
      'Неон не кричит — он просто горит на своём волнении.',
      'Город дышит в ритме тех, кто умеет слышать его.',
    ],
    palette: 'theme-neon',
    track: { title: 'Neon Circuit', author: 'Night Bloom', file: 'audio/neon.mp3' },
  },
  forest: {
    title: 'Лесной отдых',
    description: 'Тёплый зелёный воздух, мягкий свет и спокойные ритмы природы. Здесь можно переключиться на уют, тишину и восстановление.',
    quotes: [
      'Под шумом листьев мысли становятся мягче.',
      'Тихий свет — это тоже бережность.',
      'Там, где есть воздух и листья, есть пространство для дыхания.',
      'Сделай паузу — лес уже умеет ей помогать.',
    ],
    palette: 'theme-forest',
    track: { title: 'Forest Hush', author: 'Amber Moss', file: 'audio/cosmos.mp3' },
  },
};

const state = {
  currentQuestion: 0,
  scores: { cosmos: 0, solar: 0, neon: 0, forest: 0 },
  activeVibe: null,
  quoteIndex: 0,
  quoteTimer: null,
  audioEnabled: true,
  realAudio: null,
  currentTrack: null,
  cleanupFns: [],
  audioContext: null,
};

function registerCleanup(fn) {
  state.cleanupFns.push(fn);
}

function clearGame() {
  state.cleanupFns.forEach((fn) => fn());
  state.cleanupFns = [];
  if (gamePanel) {
    gamePanel.innerHTML = '';
  }
}

function initParticles() {
  particlesWrap.innerHTML = '';
  for (let index = 0; index < 48; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
    particle.style.setProperty('--speed', `${Math.random() * 12 + 12}s`);
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particlesWrap.appendChild(particle);
  }
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle('active', key === name);
  });
}

function updateProgress() {
  const percent = ((state.currentQuestion + 1) / questions.length) * 100;
  progressLabel.textContent = `Вопрос ${state.currentQuestion + 1} из ${questions.length}`;
  progressFill.style.width = `${percent}%`;
}

function renderQuestion() {
  const current = questions[state.currentQuestion];
  questionText.textContent = current.text;
  answersContainer.innerHTML = '';

  current.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.type = 'button';
    button.textContent = option.label;
    button.addEventListener('click', () => {
      document.querySelectorAll('.option-btn').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      setTimeout(() => {
        applyAnswer(option.value);
      }, 180);
    });
    answersContainer.appendChild(button);
  });

  updateProgress();
}

function applyAnswer(scoreMap) {
  Object.entries(scoreMap).forEach(([key, value]) => {
    state.scores[key] += value;
  });

  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    renderQuestion();
    return;
  }

  determineVibe();
}

function determineVibe() {
  const chosen = Object.entries(state.scores).sort((a, b) => b[1] - a[1])[0][0];
  state.activeVibe = chosen;
  renderVibe(chosen);
  showScreen('vibe');
}

function renderVibe(vibeKey) {
  const config = vibeThemes[vibeKey];
  if (!config) return;

  document.body.classList.remove('theme-cosmos', 'theme-solar', 'theme-neon', 'theme-forest');
  document.body.classList.add(config.palette);

  if (state.quoteTimer) {
    clearInterval(state.quoteTimer);
  }

  themeName.textContent = config.title;
  themeDescription.textContent = config.description;
  quoteText.textContent = config.quotes[0];
  state.quoteIndex = 0;
  state.quoteTimer = window.setInterval(updateQuote, 4500);

  setPlayerCollapsedState(false);
  playerCard.style.display = 'block';
  clearGame();
  configureAudioTrack(vibeKey);
  renderGame(vibeKey);
  updateQuote();
}

function updateQuote() {
  const config = vibeThemes[state.activeVibe];
  if (!config) return;
  const nextQuote = config.quotes[state.quoteIndex % config.quotes.length];
  quoteText.textContent = nextQuote;
  state.quoteIndex += 1;
}

quoteCard.addEventListener('click', updateQuote);
quoteCard.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    updateQuote();
  }
});

function resetSurvey() {
  state.currentQuestion = 0;
  state.scores = { cosmos: 0, solar: 0, neon: 0, forest: 0 };
  state.activeVibe = null;
  renderQuestion();
  showScreen('survey');
}

startButton.addEventListener('click', () => {
  resetSurvey();
});

returnButton.addEventListener('click', () => {
  stopThemeMusic();
  setPlayerCollapsedState(false);
  playerCard.style.display = 'block';
  if (state.quoteTimer) {
    clearInterval(state.quoteTimer);
    state.quoteTimer = null;
  }
  clearGame();
  state.currentQuestion = 0;
  state.scores = { cosmos: 0, solar: 0, neon: 0, forest: 0 };
  state.activeVibe = null;
  showScreen('home');
});

function formatTime(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const minutes = Math.floor(safeValue / 60);
  const seconds = Math.floor(safeValue % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function configureAudioTrack(vibeKey) {
  if (!state.realAudio) {
    state.realAudio = new Audio();
    state.realAudio.preload = 'metadata';
    state.realAudio.volume = Number(playerVolume.value || 0.75);
    state.realAudio.addEventListener('loadedmetadata', () => {
      playerTotalTime.textContent = formatTime(state.realAudio.duration || 0);
      playerSeek.value = '0';
    });
    state.realAudio.addEventListener('timeupdate', () => {
      if (!state.realAudio.duration) return;
      const ratio = (state.realAudio.currentTime / state.realAudio.duration) * 100;
      playerSeek.value = Number.isNaN(ratio) ? '0' : String(ratio);
      playerCurrentTime.textContent = formatTime(state.realAudio.currentTime);
    });
      state.realAudio.addEventListener('play', () => {
      state.audioEnabled = true;
    });
    state.realAudio.addEventListener('pause', () => {
      state.audioEnabled = false;
    });
    state.realAudio.addEventListener('ended', () => {
      state.audioEnabled = false;
      playerPlayBtn.textContent = 'Play';
    });
  }

  const track = vibeThemes[vibeKey]?.track || vibeThemes.cosmos.track;
  state.currentTrack = vibeKey;
  playerTitle.textContent = track.title;
  playerAuthor.textContent = track.author;
  state.realAudio.src = track.file;
  state.realAudio.load();
  playerCurrentTime.textContent = '0:00';
  playerTotalTime.textContent = '0:00';
  playerSeek.value = '0';
  playerPlayBtn.textContent = 'Play';
  state.realAudio.pause();
}

function ensureAudioContext() {
  if (!('AudioContext' in window || 'webkitAudioContext' in window)) {
    return null;
  }

  if (!state.audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioCtor();
  }

  return state.audioContext;
}

function resumeAudioContext() {
  const context = ensureAudioContext();
  if (!context) return Promise.resolve();
  if (context.state === 'suspended') {
    return context.resume();
  }
  return Promise.resolve();
}

function playGameSfx(kind) {
  const isMusicPlaying = Boolean(state.realAudio) && !state.realAudio.paused && state.audioEnabled;
  if (!isMusicPlaying) return;

  const context = ensureAudioContext();
  if (!context) return;

  resumeAudioContext().catch(() => {});

  const now = context.currentTime;
  const master = context.createGain();
  master.gain.value = 0.06;
  master.connect(context.destination);

  if (kind === 'cosmos') {
    ['392', '523.25', '659.25'].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.setValueAtTime(Number(frequency), now + index * 0.08);
      gain.gain.setValueAtTime(0.0001, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.05, now + index * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.52);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now + index * 0.08);
      oscillator.stop(now + index * 0.08 + 0.54);
    });
    return;
  }

  if (kind === 'solar') {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(260, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now);
    oscillator.stop(now + 0.28);
    return;
  }

  if (kind === 'neon') {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(660, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.016);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }
}

function playCurrentTrack() {
  if (!state.realAudio || !state.currentTrack) return;
  if (!state.realAudio.src) return;
  state.audioEnabled = true;
  resumeAudioContext().catch(() => {});
  state.realAudio.play()
    .then(() => {
      state.audioEnabled = true;
      playerPlayBtn.textContent = 'Pause';
    })
    .catch(() => {
      state.audioEnabled = false;
      playerPlayBtn.textContent = 'Play';
    });
}

function pauseCurrentTrack() {
  if (!state.realAudio) return;
  state.realAudio.pause();
  state.audioEnabled = false;
  playerPlayBtn.textContent = 'Play';
}

function stopCurrentTrack() {
  if (!state.realAudio) return;
  state.realAudio.pause();
  state.realAudio.currentTime = 0;
  state.audioEnabled = false;
  playerCurrentTime.textContent = '0:00';
  playerSeek.value = '0';
  playerPlayBtn.textContent = 'Play';
}

function stopThemeMusic() {
  if (state.realAudio) {
    stopCurrentTrack();
  }
  if (state.audioContext && state.audioContext.state === 'running') {
    state.audioContext.suspend().catch(() => {});
  }
}

playerPlayBtn.addEventListener('click', () => {
  if (!state.realAudio || !state.currentTrack) return;
  if (state.realAudio.paused) {
    playCurrentTrack();
  } else {
    pauseCurrentTrack();
  }
});

playerStopBtn.addEventListener('click', () => {
  stopCurrentTrack();
});

playerRewindBtn.addEventListener('click', () => {
  if (!state.realAudio) return;
  state.realAudio.currentTime = Math.max(0, state.realAudio.currentTime - 10);
});

playerForwardBtn.addEventListener('click', () => {
  if (!state.realAudio) return;
  state.realAudio.currentTime = Math.min(state.realAudio.duration || 0, state.realAudio.currentTime + 10);
});

playerSeek.addEventListener('input', (event) => {
  if (!state.realAudio || !state.realAudio.duration) return;
  const value = Number(event.target.value);
  state.realAudio.currentTime = (value / 100) * state.realAudio.duration;
});

playerVolume.addEventListener('input', (event) => {
  const value = Number(event.target.value);
  if (state.realAudio) {
    state.realAudio.volume = value;
  }
});

function setPlayerCollapsedState(collapsed) {
  playerCard.classList.toggle('is-collapsed', collapsed);
  const isExpanded = !collapsed;
  playerCollapseBtn.setAttribute('aria-label', isExpanded ? 'Свернуть плеер' : 'Открыть плеер');
  playerCollapseBtn.title = isExpanded ? 'Свернуть плеер' : 'Открыть плеер';
  playerCollapseBtn.textContent = isExpanded ? '⌃' : '♫';
}

playerCollapseBtn.addEventListener('click', () => {
  const collapsed = !playerCard.classList.contains('is-collapsed');
  setPlayerCollapsedState(collapsed);
});

function renderGame(vibeKey) {
  const shell = document.createElement('div');
  shell.className = 'game-shell';

  const header = document.createElement('div');
  header.className = 'game-header';

  const title = document.createElement('div');
  title.className = 'game-title';

  const score = document.createElement('div');
  score.className = 'game-score';
  score.textContent = 'Сбор: 0';

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'game-reset-btn';
  resetBtn.textContent = 'Начать заново';
  resetBtn.addEventListener('click', () => {
    clearGame();
    renderGame(vibeKey);
  });

  const zone = document.createElement('div');
  zone.className = 'game-zone';

  header.appendChild(title);
  header.appendChild(score);
  header.appendChild(resetBtn);
  shell.appendChild(header);

  const status = document.createElement('div');
  status.className = 'game-status';
  shell.appendChild(status);

  let currentScore = 0;
  const updateCounter = () => {
    score.textContent = `Сбор: ${currentScore}`;
  };

  if (vibeKey === 'cosmos') {
    title.textContent = 'Создай созвездие';
    status.textContent = 'Соедини подходящие звёзды';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const points = [
      { x: 22, y: 30 },
      { x: 36, y: 58 },
      { x: 48, y: 24 },
      { x: 61, y: 52 },
      { x: 74, y: 30 },
      { x: 83, y: 64 },
    ];
    const validPairs = new Set(['0-2', '0-1', '1-3', '2-4', '3-5', '2-3']);
    const connectedPairs = new Set();
    let selectedStar = null;

    points.forEach((point, index) => {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'cosmos-star';
      star.style.left = `${point.x}%`;
      star.style.top = `${point.y}%`;
      star.textContent = '✦';
      star.dataset.id = String(index);
      star.addEventListener('click', () => {
        if (selectedStar === null) {
          selectedStar = star;
          star.classList.add('selected');
          return;
        }

        if (selectedStar === star) {
          selectedStar.classList.remove('selected');
          selectedStar = null;
          return;
        }

        const currentId = Number(selectedStar.dataset.id);
        const nextId = Number(star.dataset.id);
        const pair = [currentId, nextId].sort((a, b) => a - b).join('-');

        if (validPairs.has(pair) && !connectedPairs.has(pair)) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', String(points[currentId].x));
          line.setAttribute('y1', String(points[currentId].y));
          line.setAttribute('x2', String(points[nextId].x));
          line.setAttribute('y2', String(points[nextId].y));
          line.setAttribute('stroke', 'rgba(135, 197, 255, 0.9)');
          line.setAttribute('stroke-width', '1.4');
          line.setAttribute('stroke-linecap', 'round');
          svg.appendChild(line);

          connectedPairs.add(pair);
          selectedStar.classList.add('connected');
          star.classList.add('connected');
          currentScore += 1;
          updateCounter();
          playGameSfx('cosmos');
          status.textContent = currentScore >= 4 ? 'Созвездие собрано' : 'Соедини ещё несколько звёзд';
          selectedStar.classList.remove('selected');
          selectedStar = null;
        } else {
          selectedStar.classList.remove('selected');
          selectedStar = star;
          star.classList.add('selected');
        }
      });
      zone.appendChild(star);
    });

    zone.appendChild(svg);
  }

  if (vibeKey === 'solar') {
    title.textContent = 'Собери солнечный поток';
    status.textContent = 'Кликай по сияющим частицам';

    const core = document.createElement('div');
    core.className = 'solar-core';
    core.textContent = '✦';
    zone.appendChild(core);

    const spawnParticle = () => {
      const particle = document.createElement('button');
      particle.type = 'button';
      particle.className = 'solar-particle';
      particle.style.left = `${Math.random() * 78 + 12}%`;
      particle.style.top = `${Math.random() * 72 + 12}%`;
      particle.addEventListener('click', () => {
        const burst = document.createElement('span');
        burst.className = 'solar-burst';
        burst.style.left = `${particle.offsetLeft}px`;
        burst.style.top = `${particle.offsetTop}px`;
        zone.appendChild(burst);
        setTimeout(() => burst.remove(), 500);
        particle.remove();
        currentScore += 1;
        updateCounter();
        playGameSfx('solar');
        status.textContent = currentScore >= 7 ? 'Поток стал ярче' : 'Собирай лучи и свет';
      });
      zone.appendChild(particle);
      registerCleanup(() => particle.remove());
    };

    const timer = window.setInterval(spawnParticle, 800);
    registerCleanup(() => window.clearInterval(timer));
  }

  if (vibeKey === 'neon') {
    title.textContent = 'Неоновый ритм';
    status.textContent = 'Лови вспышки в момент касания';

    const target = document.createElement('div');
    target.className = 'neon-target';
    zone.appendChild(target);

    const spawnPulse = () => {
      const pulse = document.createElement('button');
      pulse.type = 'button';
      pulse.className = 'neon-pulse';
      pulse.style.left = '10%';
      pulse.style.top = `${45 + Math.random() * 18}%`;
      pulse.addEventListener('click', () => {
        const burst = document.createElement('span');
        burst.className = 'neon-wave-burst';
        burst.style.left = `${pulse.offsetLeft + 16}px`;
        burst.style.top = `${pulse.offsetTop + 16}px`;
        zone.appendChild(burst);
        setTimeout(() => burst.remove(), 700);
        pulse.remove();
        currentScore += 1;
        updateCounter();
        playGameSfx('neon');
        status.textContent = currentScore >= 6 ? 'Ритм стал ярче' : 'Поддерживай волну';
      });
      zone.appendChild(pulse);
      registerCleanup(() => pulse.remove());
      setTimeout(() => {
        if (pulse.isConnected) {
          pulse.remove();
        }
      }, 2200);
    };

    const pulseTimer = window.setInterval(spawnPulse, 1500);
    registerCleanup(() => window.clearInterval(pulseTimer));
  }

  if (vibeKey === 'forest') {
    title.textContent = 'Лесной отдых';
    status.textContent = 'Погрузись в мягкий свет';

    const glow = document.createElement('div');
    glow.className = 'forest-glow';
    zone.appendChild(glow);

    const leaves = [];
    for (let index = 0; index < 10; index += 1) {
      const leaf = document.createElement('button');
      leaf.type = 'button';
      leaf.className = 'forest-leaf';
      leaf.style.left = `${Math.random() * 80 + 8}%`;
      leaf.style.top = `${Math.random() * 70 + 12}%`;
      leaf.addEventListener('click', () => {
        currentScore += 1;
        updateCounter();
        status.textContent = currentScore >= 5 ? 'Воздух стал спокойнее' : 'Погружайся в тишину';
        leaf.classList.add('active');
        setTimeout(() => leaf.classList.remove('active'), 500);
      });
      zone.appendChild(leaf);
      leaves.push(leaf);
    }

    registerCleanup(() => {
      leaves.forEach((leafItem) => leafItem.remove());
    });
  }

  shell.appendChild(zone);
  gamePanel.appendChild(shell);
}

initParticles();
renderQuestion();
showScreen('home');
setPlayerCollapsedState(false);
playerVolume.value = '0.75';
state.audioEnabled = true;
