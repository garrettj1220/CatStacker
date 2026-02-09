const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("game-over");
const playAgainBtn = document.getElementById("play-again");
const scoreValue = document.getElementById("score-value");
const heightValue = document.getElementById("height-value");
const wobbleBar = document.getElementById("wobble-bar");
const recordValue = document.getElementById("record-value");
const finalHeight = document.getElementById("final-height");
const finalScore = document.getElementById("final-score");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const unlockList = document.getElementById("unlock-list");
const unlockFill = document.getElementById("unlock-fill");
const heartRow = document.getElementById("heart-row");
const levelValue = document.getElementById("level-value");
const finalLevel = document.getElementById("final-level");
const levelOverlay = document.getElementById("level-overlay");
const overlayLevel = document.getElementById("overlay-level");
const victoryScreen = document.getElementById("victory-screen");
const victoryGallery = document.getElementById("victory-gallery");
const victoryPlayAgain = document.getElementById("victory-play-again");
const enemyIntro = document.getElementById("enemy-intro");
const enemyIntroImage = document.getElementById("enemy-intro-image");
const enemyIntroTitle = document.getElementById("enemy-intro-title");
const enemyIntroText = document.getElementById("enemy-intro-text");
const enemyIntroButton = document.getElementById("enemy-intro-button");
const topScoreValue = document.getElementById("top-score-value");
const PERSONAL_BEST_KEY = "catstacker-personal-best";
const seenEnemyIntroLevels = new Set();

const CAT_NAMES = [
  "Cat1.png",
  "Cat2.png",
  "Cat3.png",
  "Cat4.png",
  "cat5.png",
  "Cat6.png",
  "Cat 7.png",
  "Cat8.png"
];
const CAT_COLORS = ["#f6b35e", "#e89a59", "#d8896a", "#c47c7c", "#b26a86", "#a85b9b", "#9141b8", "#6f36b3"];
const INITIAL_RECORD = 0;
const CAT_WIDTH = 160;
const CAT_HEIGHT = 80;
const BASE_Y = canvas.height - 70;
const WOBBLE_THRESHOLD = 160;
const GRAVITY_BASE = 0.75;
const DROP_ACCEL = 3.6;
const FALL_DURATION = 100;
const PREVIEW_MARGIN = 210;
const PREVIEW_Y = 22;
const MISS_OFFSET_RATIO = 0.36;
const LEVEL_TRANSITION_DELAY = 1500;
const PREVIEW_ACCEL = 0.09;
const PREVIEW_HORIZONTAL_MARGIN = 140;
const DROP_VX_FRICTION = 0.96;
const PREVIEW_MOVEMENT_STEPS = 4;
const PHYSICS_SUBSTEPS = 4;
const PHYSICS_DT = 1 / PHYSICS_SUBSTEPS;
const FRICTION_PER_SUBSTEP = Math.pow(DROP_VX_FRICTION, PHYSICS_DT);
const GAME_FRAME_DELTA_MS = 16.666;
const MIN_FRAME_DELTA_MS = 8;
const MAX_FRAME_DELTA_MS = 44;
const MIN_DELTA_RATIO = 0.5;
const MAX_DELTA_RATIO = 2;
const BASE_COLLAPSE_THRESHOLD = CAT_WIDTH * 0.46;
const MIN_COLLAPSE_THRESHOLD = CAT_WIDTH * 0.28;
const MAX_COLLAPSE_SHRINK = BASE_COLLAPSE_THRESHOLD - MIN_COLLAPSE_THRESHOLD;
const IMBALANCE_SHRINK_MULTIPLIER = 0.35;
const FLYING_SPAWN_RATES = { 3: 4500, 4: 3600, 5: 3200 };
const BOMB_BASE_INTERVAL = 9000;
const BOMB_INCREMENT_LEVELS = { 7: 7500, 8: 6200 };
const BOMB_HANG_MIN = 1000;
const BOMB_HANG_MAX = 3000;
const BOMB_FALL_SPEED = 0.085;
const BOMB_ROTATION_SPEED = 0.0024;
const BOMB_PENALTY_THRESHOLD = 22;
const SHAKE_DURATION = 420;
const SHAKE_STRENGTH = 6;

const CAMERA_EASE = 0.12;
const ZOOM_MIN = 0.84;
const CAT_METADATA = {
  "Cat1.png": { cropTop: 12, cropBottom: 10, renderOffset: 6 },
  "Cat2.png": { cropTop: 14, cropBottom: 12, renderOffset: 8 }
};
const DEFAULT_CAT_METADATA = { cropTop: 10, cropBottom: 8, renderOffset: 7 };
const LEVELS = [
  {
    name: "Loaf Dawn",
    gradient: ["#fff1f3", "#fde6f1"],
    previewSpeed: 8.4,
    previewDirectionChangeChance: 0.003,
    previewDirectionCooldown: 0,
    dropDrift: 0,
    previewJitter: 0.02,
    dropRandomness: { amplitude: 0, interval: 0, variance: 0, inertia: 0 }
  },
  {
    name: "Dusky Bloom",
    gradient: ["#fff5e1", "#ffd6b3"],
    previewSpeed: 9.7,
    previewDirectionChangeChance: 0.012,
    previewDirectionCooldown: 140,
    dropDrift: 0.26,
    previewJitter: 0.05,
    dropRandomness: { amplitude: 0.18, interval: 68, variance: 36, inertia: 0.24 }
  },
  {
    name: "Twilight Bloom",
    gradient: ["#f4edff", "#cbb7ff"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.024,
    previewDirectionCooldown: 110,
    dropDrift: 0.42,
    previewJitter: 0.08,
    dropRandomness: { amplitude: 0.33, interval: 62, variance: 32, inertia: 0.28 }
  },
  {
    name: "Aurora Sweep",
    gradient: ["#e7f8ff", "#a6efff"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.56,
    previewJitter: 0.12,
    dropRandomness: { amplitude: 0.46, interval: 54, variance: 28, inertia: 0.32 }
  },
  {
    name: "Midnight Bloom",
    gradient: ["#1d0f34", "#4a237d"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.058,
    previewDirectionCooldown: 68,
    dropDrift: 0.78,
    previewJitter: 0.16,
    dropRandomness: { amplitude: 0.64, interval: 48, variance: 24, inertia: 0.36 }
  },
  {
    name: "Neon Crest",
    gradient: ["#0f102f", "#201e61"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.066,
    previewDirectionCooldown: 54,
    dropDrift: 0.92,
    previewJitter: 0.2,
    dropRandomness: { amplitude: 0.78, interval: 44, variance: 20, inertia: 0.38 }
  },
  {
    name: "Pulse Summit",
    gradient: ["#1b1f46", "#2c3b8f"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.078,
    previewDirectionCooldown: 48,
    dropDrift: 1.08,
    previewJitter: 0.24,
    dropRandomness: { amplitude: 0.95, interval: 40, variance: 18, inertia: 0.4 }
  },
  {
    name: "Starlit Finale",
    gradient: ["#15011f", "#440062"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.09,
    previewDirectionCooldown: 40,
    dropDrift: 1.22,
    previewJitter: 0.28,
    dropRandomness: { amplitude: 1.1, interval: 36, variance: 16, inertia: 0.42 }
  }
];
const LEVEL_THRESHOLDS = LEVELS.map((_, idx) => 10 + idx * 5);
const ENEMY_INTRO_STAGES = {
  2: {
    title: "Flying Cats",
    description: "Hey, here's how this enemy works: flying loafs swoop in from the sides or above and sway as they approach. Click them before they reach the tower or they spike the wobble meter.",
    image: "Art/Enemies/FlyingCat1.png"
  },
  5: {
    title: "Cat Bombs",
    description: "Hey, here's how this enemy works: a bomb cat swings at the top and then drops. Click it while it is falling to make it pop; if it hits the ground it explodes, costs a heart, and shrinks your wobble threshold for a handful of drops.",
    image: "Art/Enemies/CatBomb1.png"
  }
};

function getLevelConfig(levelIndex = state.currentLevel) {
  const safeIndex = Math.max(0, Math.min(LEVELS.length - 1, levelIndex));
  return LEVELS[safeIndex];
}

const platform = {
  width: 520,
  height: 26,
  lipHeight: 10
};

const state = {
  mode: "start",
  previewX: canvas.width / 2,
  previewDirection: 1,
  previewName: null,
  activeCat: null,
  stack: [],
  stackHeight: 0,
  wobble: 0,
  wobbleTarget: 0,
  score: 0,
  record: INITIAL_RECORD,
  topScore: 0,
  collapseTimer: 0,
  unlockedCats: [CAT_NAMES[0]],
  lastUnlockedIndex: 0,
  ladderAnimating: false,
  hearts: 5,
  centerOfGravity: canvas.width / 2,
  balanceOffset: 0,
  offsetSum: 0,
  offsetCount: 0,
  previewSpeedCurrent: LEVELS[0].previewSpeed,
  levelBasePreviewSpeed: LEVELS[0].previewSpeed,
  previewDirectionCooldown: 0,
  currentLevel: 0,
  levelScore: 0,
  sessionScore: 0,
  levelThreshold: LEVEL_THRESHOLDS[0],
  backgroundGradient: LEVELS[0].gradient,
  cameraZoom: 1,
  cameraTargetZoom: 1,
  cameraYOffset: 0,
  cameraTargetYOffset: 0,
  cloudOffset: 0,
  levelTransitioning: false,
  imbalanceTrend: 0,
  dynamicThresholdLeft: BASE_COLLAPSE_THRESHOLD,
  dynamicThresholdRight: BASE_COLLAPSE_THRESHOLD,
  enemies: [],
  flyingSpawnAccumulator: 0,
  bombSpawnAccumulator: 0,
  collapseDebuffDrops: 0,
  collapseDebuffValue: 0,
  screenShakeTimer: 0,
  screenShakeStrength: 0,
  screenShakeX: 0,
  screenShakeY: 0
};

state.topScore = loadPersonalBest();
updateTopScoreDisplay();

function loadPersonalBest() {
  try {
    const raw = window.localStorage.getItem(PERSONAL_BEST_KEY);
    const parsed = parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  } catch (error) {
    // ignore
  }
  return 0;
}

function savePersonalBest(value) {
  try {
    window.localStorage.setItem(PERSONAL_BEST_KEY, String(value));
  } catch (error) {
    // ignore
  }
}

function updateTopScoreDisplay() {
  if (topScoreValue) {
    topScoreValue.textContent = (state.topScore || 0).toString();
  }
}

function maybeUpdateTopScore() {
  if (state.score > state.topScore) {
    state.topScore = state.score;
    savePersonalBest(state.topScore);
    updateTopScoreDisplay();
  }
}

function resetEnemyIntroHistory() {
  seenEnemyIntroLevels.clear();
}

const assetCache = new Map();
const catDefs = new Map();
const enemyAssetCache = new Map();
let assetsLoaded = false;
let lastTimestamp = 0;

async function loadAssets() {
  const promises = CAT_NAMES.map((name) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = `Art/Cats/${name}`;
      img.onload = () => {
        assetCache.set(name, img);
        const metadata = deriveCatMetadata(name, img);
        catDefs.set(name, metadata);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load ${name}`);
        resolve();
      };
    })
  );
  const enemyPromises = ["FlyingCat1.png", "CatBomb1.png"].map((name) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = `Art/Enemies/${name}`;
      img.onload = () => {
        enemyAssetCache.set(name, img);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load enemy ${name}`);
        resolve();
      };
    })
  );
  await Promise.all(promises);
  await Promise.all(enemyPromises);
  assetsLoaded = true;
  renderUnlockList();
  requestAnimationFrame(loop);
}

function getCatMetadata(name) {
  return catDefs.get(name) || deriveFallbackCatMetadata(name);
}

function deriveFallbackCatMetadata(name) {
  return CAT_METADATA[name] || DEFAULT_CAT_METADATA;
}

function deriveCatMetadata(name, image) {
  const fallback = deriveFallbackCatMetadata(name);
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const { data, width, height } = context.getImageData(0, 0, image.width, image.height);
  let top = null;
  let bottom = null;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 10) {
        top = y;
        break;
      }
    }
    if (top !== null) break;
  }
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 10) {
        bottom = y;
        break;
      }
    }
    if (bottom !== null) break;
  }
  const cropTop = top === null ? fallback.cropTop : top;
  const cropBottom = bottom === null ? fallback.cropBottom : height - 1 - bottom;
  const visibleHeight = Math.max(1, height - cropTop - cropBottom);
  const scale = CAT_WIDTH / width;
  const renderHeight = Math.max(44, visibleHeight * scale);
  return {
    cropTop,
    cropBottom,
    renderOffset: fallback.renderOffset,
    srcHeight: visibleHeight,
    renderHeight
  };
}

function startGame() {
  overlay.classList.add("hidden");
  startScreen.classList.add("hidden");
  victoryScreen && victoryScreen.classList.add("hidden");
  enemyIntro && enemyIntro.classList.add("hidden");
  state.sessionScore = 0;
  state.score = 0;
  resetEnemyIntroHistory();
  beginLevel(0, true);
}

function startLevelTransition(nextLevel) {
  if (state.levelTransitioning) return;
  state.levelTransitioning = true;
  state.mode = "transition";
  const upcomingLevelNumber = Math.min(LEVELS.length, state.currentLevel + 2);
  overlayLevel.textContent = upcomingLevelNumber;
  levelOverlay.classList.remove("hidden");
  requestAnimationFrame(() => levelOverlay.classList.add("visible"));
  window.setTimeout(() => {
    levelOverlay.classList.remove("visible");
    window.setTimeout(() => {
      levelOverlay.classList.add("hidden");
      beginLevel(nextLevel);
    }, 360);
  }, LEVEL_TRANSITION_DELAY);
}

function beginLevel(levelIndex, skipOverlay = false) {
  const safeIndex = clamp(levelIndex, 0, LEVELS.length - 1);
  state.currentLevel = safeIndex;
  state.levelThreshold =
    LEVEL_THRESHOLDS[safeIndex] !== undefined
      ? LEVEL_THRESHOLDS[safeIndex]
      : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const levelConfig = getLevelConfig(safeIndex);
  state.backgroundGradient = levelConfig.gradient;
  state.levelBasePreviewSpeed = levelConfig.previewSpeed ?? PREVIEW_SPEED;
  state.previewSpeedCurrent = state.levelBasePreviewSpeed;
  state.previewDirectionCooldown = 0;
  state.previewDirection = 1;
  state.previewX = canvas.width / 2;
  state.levelTransitioning = false;
  state.activeCat = null;
  state.cameraZoom = 1;
  state.cameraTargetZoom = 1;
  state.cameraYOffset = 0;
  state.cameraTargetYOffset = 0;
  state.hearts = 5;
  renderHearts();
  placeInitialCat(getLevelCatName(safeIndex));
  state.previewName = getLevelCatName(safeIndex);
  state.unlockedCats = [getLevelCatName(safeIndex)];
  state.lastUnlockedIndex = safeIndex;
  levelValue.textContent = safeIndex + 1;
  if (!skipOverlay) {
    levelOverlay.classList.add("hidden");
    levelOverlay.classList.remove("visible");
  }
  if (safeIndex > 0) {
    triggerLadderAdvance();
  }
  recalcStats();
  state.imbalanceTrend = 0;
  updateDynamicThreshold();
  state.enemies = [];
  state.flyingSpawnAccumulator = 0;
  state.bombSpawnAccumulator = 0;
  state.collapseDebuffDrops = 0;
  state.collapseDebuffValue = 0;
  state.screenShakeTimer = 0;
  state.screenShakeStrength = 0;
  state.screenShakeX = 0;
  state.screenShakeY = 0;
  const introShown = showEnemyIntroIfNeeded(safeIndex);
  state.mode = introShown ? "intro" : "running";
}

function spawnPreviewCat() {
  if (!assetsLoaded) return;
  if (!state.previewName) {
    state.previewName = getLevelCatName(state.currentLevel);
  }
}

function pickRandomCat() {
  const name = getLevelCatName(state.currentLevel);
  return assetCache.has(name) ? name : CAT_NAMES[0];
}

function getLevelCatName(levelIndex) {
  const clamped = clamp(levelIndex, 0, CAT_NAMES.length - 1);
  return CAT_NAMES[clamped];
}

function placeInitialCat(name = CAT_NAMES[0]) {
  const metadata = getCatMetadata(name);
  const image = assetCache.get(name);
  if (!image) return;
  const x = clampToPlatform(canvas.width / 2 - CAT_WIDTH / 2, CAT_WIDTH);
  const cat = {
    name,
    image,
    x,
    y: BASE_Y - (metadata.renderHeight || CAT_HEIGHT),
    vx: 0,
    vy: 0,
    width: CAT_WIDTH,
    height: metadata.renderHeight || CAT_HEIGHT,
    layerHeight: metadata.renderHeight || CAT_HEIGHT,
    cropTop: metadata.cropTop,
    cropBottom: metadata.cropBottom,
    renderOffset: metadata.renderOffset,
    srcHeight: image ? metadata.srcHeight || image.height : CAT_HEIGHT
  };
  state.stack = [cat];
  state.stackHeight = cat.height;
  state.centerOfGravity = canvas.width / 2;
  state.balanceOffset = 0;
  state.offsetSum = 0;
  state.offsetCount = 1;
  state.score = 0;
  state.levelScore = 0;
  state.wobble = 0;
  state.wobbleTarget = 0;
}

function attemptDrop() {
  if (state.mode !== "running" || state.activeCat || !assetsLoaded) return;
  const name = state.previewName || getLevelCatName(state.currentLevel);
  const metadata = getCatMetadata(name);
  const image = assetCache.get(name);
  const spawnY = screenToWorldY(PREVIEW_Y + (metadata.renderOffset || 0) * state.cameraZoom);
  const levelConfig = getLevelConfig();
  const horizontalDrift = (Math.random() * 2 - 1) * (levelConfig.dropDrift || 0);
  const cat = {
    name,
    image,
    x: clampToPlatform(state.previewX - CAT_WIDTH / 2, CAT_WIDTH),
    y: spawnY,
    vx: horizontalDrift,
    vy: 0,
    width: CAT_WIDTH,
    height: metadata.renderHeight || CAT_HEIGHT,
    layerHeight: metadata.renderHeight || CAT_HEIGHT,
    cropTop: metadata.cropTop,
    cropBottom: metadata.cropBottom,
    renderOffset: metadata.renderOffset,
    srcHeight: image ? metadata.srcHeight || image.height : CAT_HEIGHT
  };
  const randomness = levelConfig.dropRandomness || {};
  cat.random = {
    amplitude: randomness.amplitude || 0,
    interval: randomness.interval || 0,
    variance: randomness.variance || 0,
    inertia: randomness.inertia || 0.28,
    timer:
      randomness.interval > 0
        ? randomness.interval + Math.random() * (randomness.variance || 0)
        : 0,
    target: horizontalDrift
  };
  state.activeCat = cat;
  state.previewName = null;
}

function updatePreview() {
  if (state.activeCat || state.mode !== "running") return 0;
  const desiredBoost = Math.min(3.2, Math.max(0, (state.stack.length - 1) * 0.06));
  const desiredSpeed = state.levelBasePreviewSpeed + desiredBoost;
  state.previewSpeedCurrent += (desiredSpeed - state.previewSpeedCurrent) * PREVIEW_ACCEL;
  const levelConfig = getLevelConfig();
  if (levelConfig.previewDirectionChangeChance && state.previewDirectionCooldown <= 0) {
    if (Math.random() < levelConfig.previewDirectionChangeChance) {
      state.previewDirection *= -1;
      state.previewDirectionCooldown = levelConfig.previewDirectionCooldown || 0;
    }
  }
  state.previewDirectionCooldown = Math.max(0, state.previewDirectionCooldown - 1);
  return state.previewSpeedCurrent / Math.max(0.55, state.cameraZoom);
}

function movePreviewStep(delta) {
  const bounds = getPreviewBounds();
  const levelConfig = getLevelConfig();
  state.previewX += state.previewDirection * delta;
  if (levelConfig.previewJitter) {
    state.previewX += (Math.random() * 2 - 1) * levelConfig.previewJitter * delta;
  }
  if (state.previewX <= bounds.left || state.previewX >= bounds.right) {
    state.previewDirection *= -1;
    state.previewX = Math.min(Math.max(state.previewX, bounds.left), bounds.right);
  }
}

function updateActiveCat(dt = 1) {
  const cat = state.activeCat;
  if (!cat) return;
  if (cat.missed) {
    cat.vy += GRAVITY_BASE * 0.8 * dt;
    cat.y += cat.vy * dt;
    cat.x += (cat.vx || 0) * dt;
    cat.vx = (cat.vx || 0) * FRICTION_PER_SUBSTEP;
    if (cat.y > canvas.height + 240) {
      state.activeCat = null;
      state.previewName = getLevelCatName(state.currentLevel);
    }
    return;
  }
  const accel = DROP_ACCEL * dt;
  cat.vy += accel;
  cat.y += cat.vy * dt;
  cat.x += (cat.vx || 0) * dt;
  cat.vx = (cat.vx || 0) * FRICTION_PER_SUBSTEP;
  if (!cat.missed && cat.random && cat.random.amplitude > 0) {
    const timerDecay = dt / PHYSICS_DT;
    cat.random.timer -= timerDecay;
    if (cat.random.timer <= 0) {
      const baseInterval = cat.random.interval || 40;
      cat.random.timer = baseInterval + Math.random() * (cat.random.variance || baseInterval * 0.35);
      cat.random.target = (Math.random() * 2 - 1) * cat.random.amplitude;
    }
    const inertia = Math.max(0.02, Math.min(0.6, cat.random.inertia || 0.28));
    cat.vx += (cat.random.target - cat.vx) * inertia * dt;
  }
  cat.x = clampToPlatform(cat.x, cat.width);
  const targetTop = BASE_Y - (state.stackHeight + cat.height);
  if (cat.y >= targetTop) {
    cat.y = targetTop;
    cat.vy = 0;
    if (isMissedDrop(cat)) {
      bounceMissedCat(cat);
      return;
    }
    finalizeCat(cat);
  }
}

function finalizeCat(cat) {
  const previous = state.stack[state.stack.length - 1];
  const placed = { ...cat };
  placed.y = BASE_Y - (state.stackHeight + placed.height);
  placed.x = clampToPlatform(placed.x, placed.width);
  state.stack.push(placed);
  state.stackHeight += placed.height;
  const center = placed.x + placed.width / 2;
  if (!state.centerOfGravity) {
    state.centerOfGravity = center;
  }
  const offset = center - state.centerOfGravity;
  state.offsetSum += offset;
  state.offsetCount += 1;
  state.imbalanceTrend += (offset - state.imbalanceTrend) * 0.18;
  updateDynamicThreshold();
  if (previous) {
    const absOffset = Math.abs(center - (previous.x + previous.width / 2));
    state.wobble = Math.min(WOBBLE_THRESHOLD * 1.2, state.wobble + absOffset * 0.8);
    if (absOffset > placed.width * 0.45) {
      triggerCollapse();
      return;
    }
  }
  state.activeCat = null;
  state.sessionScore += 1;
  recalcStats();
  checkCollapse();
  state.previewName = pickRandomCat();
  consumeCollapseDebuffDrop();
}

function recalcStats() {
  const stack = state.stack;
  if (!stack.length) {
    state.levelScore = 0;
    state.score = state.sessionScore;
    state.wobble = 0;
    state.wobbleTarget = 0;
    updateCameraTargets();
    updateUnlocks();
    return;
  }
  if (stack.length < 2) {
    state.wobble = 0;
    state.wobbleTarget = 0;
    state.levelScore = Math.max(0, stack.length - 1);
    state.score = state.sessionScore;
    updateCameraTargets();
    updateUnlocks();
    return;
  }
  const averageOffset = state.offsetSum / Math.max(1, state.offsetCount);
  state.balanceOffset = averageOffset;
  const topOffset = getTopCenterOffset();
  const threshold = getThresholdForOffset(topOffset);
  const dangerRatio = threshold > 0 ? Math.min(1, Math.abs(topOffset) / threshold) : 1;
  state.wobbleTarget = dangerRatio * WOBBLE_THRESHOLD;
  const height = stack.length;
  state.levelScore = Math.max(0, height - 1);
  state.score = state.sessionScore;
  updateCameraTargets();
  updateUnlocks();
  checkLevelProgress();
}

function updateCameraTargets() {
  const towerHeight = state.stackHeight || 0;
  if (towerHeight <= 0) {
    state.cameraTargetZoom = 1;
    state.cameraTargetYOffset = 0;
    return;
  }
  const zoomOut =
    towerHeight < 160 ? 0 : Math.min(0.14, towerHeight / 1100 * 0.14);
  const targetZoom = 1 - zoomOut;
  state.cameraTargetZoom = clamp(targetZoom, ZOOM_MIN, 1);

  const followStart = 380;
  if (towerHeight < followStart) {
    state.cameraTargetYOffset = 0;
    return;
  }
  const topGap = Math.max(240, canvas.height * 0.34);
  const towerTop = BASE_Y - towerHeight;
  const targetTopScreenY = PREVIEW_Y + topGap;
  const zoom = state.cameraTargetZoom;
  state.cameraTargetYOffset =
    (targetTopScreenY - BASE_Y) / zoom - towerTop + BASE_Y;
}

function updateCamera() {
  state.cameraZoom += (state.cameraTargetZoom - state.cameraZoom) * CAMERA_EASE;
  state.cameraYOffset += (state.cameraTargetYOffset - state.cameraYOffset) * CAMERA_EASE;
}

function checkCollapse() {
  if (state.stack.length < 2) return;
  const boundsCheck = state.stack.every((cat) => isWithinPlatform(cat.x, cat.width));
  const topOffset = getTopCenterOffset();
  const threshold = getThresholdForOffset(topOffset);
  if (Math.abs(topOffset) >= threshold && threshold > 0) {
    triggerCollapse();
    return;
  }
  if (!boundsCheck) {
    triggerCollapse();
  }
}

function triggerCollapse() {
  if (state.mode !== "running") return;
  state.mode = "tumbling";
  state.collapseTimer = FALL_DURATION;
  state.activeCat = null;
  state.stack.forEach((cat, index) => {
    cat.vy = Math.random() * 1.2 + 0.5;
    cat.vx = (Math.random() - 0.5) * 1.5 + (index % 2 ? -0.9 : 0.9);
  });
}

function updateTumble() {
  if (state.mode !== "tumbling") return;
  state.collapseTimer -= 1;
  state.stack.forEach((cat) => {
    cat.vy += GRAVITY_BASE * 0.6;
    cat.y += cat.vy;
    cat.x += cat.vx;
  });
  if (state.collapseTimer <= 0) {
    endRun();
  }
}

function endRun() {
  state.mode = "gameover";
  state.record = Math.max(state.record, state.score);
  recordValue.textContent = state.record;
  maybeUpdateTopScore();
  finalHeight.textContent = state.stack.length;
  finalScore.textContent = state.score;
  finalLevel.textContent = state.currentLevel + 1;
  overlay.classList.remove("hidden");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getPlatformBounds() {
  const left = canvas.width / 2 - platform.width / 2;
  return { left, right: left + platform.width };
}

function getPreviewBounds() {
  return {
    left: PREVIEW_HORIZONTAL_MARGIN,
    right: canvas.width - PREVIEW_HORIZONTAL_MARGIN
  };
}

function getTopCenterOffset() {
  if (!state.stack.length) return 0;
  const platformCenter = canvas.width / 2;
  const top = state.stack[state.stack.length - 1];
  return top.x + top.width / 2 - platformCenter;
}

function getThresholdForOffset(offset) {
  return offset >= 0 ? state.dynamicThresholdRight : state.dynamicThresholdLeft;
}

function updateDynamicThreshold() {
  const shrink = Math.min(MAX_COLLAPSE_SHRINK, Math.abs(state.imbalanceTrend) * IMBALANCE_SHRINK_MULTIPLIER);
  const shrinked = Math.max(MIN_COLLAPSE_THRESHOLD, BASE_COLLAPSE_THRESHOLD - shrink);
  const penalty = state.collapseDebuffDrops > 0 ? state.collapseDebuffValue : 0;
  const effectiveThreshold = Math.max(MIN_COLLAPSE_THRESHOLD, shrinked - penalty);
  if (state.imbalanceTrend > 0) {
    state.dynamicThresholdRight = effectiveThreshold;
    state.dynamicThresholdLeft = BASE_COLLAPSE_THRESHOLD;
  } else if (state.imbalanceTrend < 0) {
    state.dynamicThresholdLeft = effectiveThreshold;
    state.dynamicThresholdRight = BASE_COLLAPSE_THRESHOLD;
  } else {
    state.dynamicThresholdLeft = BASE_COLLAPSE_THRESHOLD;
    state.dynamicThresholdRight = BASE_COLLAPSE_THRESHOLD;
  }
}

function isWithinPlatform(x, width) {
  const bounds = getPlatformBounds();
  const allowance = width * 0.25;
  return x >= bounds.left - allowance && x + width <= bounds.right + allowance;
}

function clampToPlatform(x, width) {
  const bounds = getPlatformBounds();
  return clamp(x, bounds.left + 6, bounds.right - width - 6);
}

function update(deltaRatio = 1, deltaMs = GAME_FRAME_DELTA_MS) {
  if (!assetsLoaded) return;
  if (state.mode === "running") {
    updateEnemies(deltaMs);
  }
  state.cloudOffset = (state.cloudOffset + 0.25) % 400;
  const runSpeed = Math.min(6, 1 + Math.floor(state.stack.length * 0.05));
  for (let i = 0; i < runSpeed; i += 1) {
    if (state.mode === "running") {
      const driftSpeed = updatePreview();
      if (driftSpeed) {
        const stepDelta = driftSpeed / PREVIEW_MOVEMENT_STEPS;
        for (let step = 0; step < PREVIEW_MOVEMENT_STEPS; step += 1) {
          movePreviewStep(stepDelta * deltaRatio);
        }
      }
      for (let sub = 0; sub < PHYSICS_SUBSTEPS; sub += 1) {
        updateActiveCat(PHYSICS_DT * deltaRatio);
      }
    }
  }
  if (state.mode === "tumbling") {
    updateTumble();
  }
  state.wobble += (state.wobbleTarget - state.wobble) * 0.42;
  state.wobble = clamp(state.wobble, 0, WOBBLE_THRESHOLD * 1.4);
  state.imbalanceTrend *= 0.96;
  updateDynamicThreshold();
  if (state.screenShakeTimer > 0) {
    state.screenShakeTimer -= 1;
    state.screenShakeX = (Math.random() * 2 - 1) * state.screenShakeStrength;
    state.screenShakeY = (Math.random() * 2 - 1) * state.screenShakeStrength;
  } else {
    state.screenShakeX = 0;
    state.screenShakeY = 0;
  }
  updateCamera();
}

function drawBackground() {
  const colors = state.backgroundGradient || LEVELS[0].gradient;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.55, colors[1] || colors[0]);
  gradient.addColorStop(1, colors[1] || colors[0]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCloud(120 + state.cloudOffset, 120, 1.2, "rgba(255,255,255,0.6)");
  drawCloud(420 - state.cloudOffset * 0.5, 160, 0.9, "rgba(255,255,255,0.55)");
  drawCloud(720 + state.cloudOffset * 0.25, 110, 0.8, "rgba(255,255,255,0.5)");
}

function drawCloud(x, y, scale, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 42 * scale, 20 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 30 * scale, y + 4 * scale, 32 * scale, 16 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x - 30 * scale, y + 6 * scale, 28 * scale, 14 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPlatform() {
  const bounds = getPlatformBounds();
  const x = bounds.left;
  const y = BASE_Y + 4;
  ctx.save();
  ctx.fillStyle = "#2b1d3d";
  roundedRect(x - 10, y + 12, platform.width + 20, platform.height + 10, 14);
  ctx.fill();
  const wood = ctx.createLinearGradient(0, y, 0, y + platform.height);
  wood.addColorStop(0, "#ffcc8e");
  wood.addColorStop(0.6, "#f7a963");
  wood.addColorStop(1, "#e07b54");
  ctx.fillStyle = wood;
  roundedRect(x, y, platform.width, platform.height, 14);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  roundedRect(x + 16, y + 8, platform.width - 32, platform.height - 18, 10);
  ctx.fill();
  ctx.fillStyle = "#1b1424";
  ctx.globalAlpha = 0.15;
  ctx.fillRect(x + 20, y + 6, platform.width - 40, 2);
  ctx.fillRect(x + 20, y + 14, platform.width - 40, 2);
  ctx.globalAlpha = 1;
  ctx.restore();
}

function roundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawStack() {
  state.stack.forEach((cat) => drawCat(cat));
  if (state.activeCat) {
    drawCat(state.activeCat);
  }
}

function drawEnemies() {
  state.enemies.forEach((enemy) => drawEnemy(enemy));
}

function drawEnemy(enemy) {
  if (!enemy) return;
  if (enemy.type === "flying") {
    drawFlyingEnemy(enemy);
  } else {
    drawBombEnemy(enemy);
  }
}

function drawFlyingEnemy(enemy) {
  const sprite = enemyAssetCache.get(enemy.sprite);
  if (!sprite) return;
  const size = 96;
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
  ctx.restore();
}

function drawBombEnemy(enemy) {
  const sprite = enemyAssetCache.get(enemy.sprite);
  if (!sprite) return;
  const size = 84;
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  if (enemy.state === "hanging") {
    ctx.strokeStyle = "rgba(15, 15, 25, 0.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -size / 2 - 4);
    ctx.lineTo(0, -size / 2 - 40);
    ctx.stroke();
  }
  ctx.rotate(enemy.rotation);
  const scale = enemy.scale || 1;
  ctx.scale(scale, scale);
  ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
  ctx.restore();
}

function drawCat(cat) {
  if (!cat || !cat.image) return;
  const srcTop = cat.cropTop || 0;
  const srcHeight = cat.srcHeight || cat.height;
  ctx.save();
  ctx.translate(cat.x + cat.width / 2, cat.y + cat.height / 2 + (cat.renderOffset || 0));
  ctx.drawImage(
    cat.image,
    0,
    srcTop,
    cat.image.width,
    srcHeight,
    -cat.width / 2,
    -cat.height / 2,
    cat.width,
    cat.height
  );
  ctx.restore();
}

function drawPreview() {
  if (state.mode !== "running" || state.activeCat) return;
  const previewCat = buildPreviewCat(state.previewName);
  if (!previewCat) return;
  ctx.save();
  ctx.globalAlpha = 0.86;
  const zoom = state.cameraZoom;
  const screenX = worldToScreenX(previewCat.x + previewCat.width / 2);
  const width = previewCat.width * zoom;
  const height = previewCat.height * zoom;
  const srcTop = previewCat.cropTop || 0;
  const srcHeight = previewCat.srcHeight || previewCat.height;
  ctx.drawImage(
    previewCat.image,
    0,
    srcTop,
    previewCat.image.width,
    srcHeight,
    screenX - width / 2,
    PREVIEW_Y + (previewCat.renderOffset || 0) * zoom,
    width,
    height
  );
  ctx.restore();
}

function buildPreviewCat(name) {
  const image = assetCache.get(name);
  if (!image) return null;
  const metadata = getCatMetadata(name);
  const height = metadata.renderHeight || CAT_HEIGHT;
  return {
    name,
    image,
    x: state.previewX - CAT_WIDTH / 2,
    y: PREVIEW_Y,
    vx: 0,
    vy: 0,
    width: CAT_WIDTH,
    height,
    layerHeight: height,
    cropTop: metadata.cropTop,
    cropBottom: metadata.cropBottom,
    renderOffset: metadata.renderOffset,
    srcHeight: image.height - (metadata.cropTop || 0) - (metadata.cropBottom || 0)
  };
}

function applyCameraTransform() {
  const zoom = state.cameraZoom;
  ctx.translate(state.screenShakeX || 0, state.screenShakeY || 0);
  ctx.translate(canvas.width / 2, BASE_Y);
  ctx.scale(zoom, zoom);
  ctx.translate(-canvas.width / 2, -BASE_Y + state.cameraYOffset);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  ctx.save();
  applyCameraTransform();
  drawPlatform();
  drawStack();
  drawEnemies();
  ctx.restore();
  drawPreview();
  updateHUD();
}

function updateHUD() {
  levelValue.textContent = state.currentLevel + 1;
  scoreValue.textContent = state.score;
  heightValue.textContent = state.stack.length;
  const wobbleProgress = Math.min(1, state.wobble / WOBBLE_THRESHOLD);
  const remaining = Math.max(0, 1 - wobbleProgress);
  wobbleBar.style.width = `${remaining * 100}%`;
  const danger = remaining < 0.2;
  wobbleBar.classList.toggle("low", danger);
  wobbleBar.style.background = danger
    ? "linear-gradient(90deg, #ef4444, #f97316)"
    : "linear-gradient(90deg, #22c55e, #14b8a6)";
  if (remaining <= 0 && state.mode === "running") {
    triggerCollapse();
  }
}

function updateUnlocks() {
  const levelIndex = clamp(state.currentLevel, 0, CAT_NAMES.length - 1);
  state.lastUnlockedIndex = levelIndex;
  state.unlockedCats = [CAT_NAMES[levelIndex]];
  renderUnlockList();
  updateUnlockFill();
}

function checkLevelProgress() {
  if (state.levelTransitioning || state.mode !== "running") return;
  if (state.currentLevel >= LEVELS.length - 1) {
    checkVictory();
    return;
  }
  if (state.levelScore >= state.levelThreshold) {
    startLevelTransition(state.currentLevel + 1);
  }
}

function renderUnlockList() {
  if (!unlockList) return;
  unlockList.innerHTML = "";
  const unlockedIndex = state.lastUnlockedIndex;
  const nextIndex = Math.min(CAT_NAMES.length - 1, unlockedIndex + 1);
  const bottomName = CAT_NAMES[unlockedIndex];
  const topName = CAT_NAMES[nextIndex];

  const bottomItem = document.createElement("li");
  bottomItem.className = "ladder-card bottom unlocked";
  bottomItem.style.setProperty("--cat-accent", CAT_COLORS[unlockedIndex] || "#f6b35e");
  const bottomImg = document.createElement("img");
  bottomImg.alt = bottomName.replace(".png", "");
  bottomImg.src = `Art/Cats/${bottomName}`;
  bottomItem.appendChild(bottomImg);

  const topItem = document.createElement("li");
  topItem.className = "ladder-card top locked";
  topItem.style.setProperty("--cat-accent", CAT_COLORS[nextIndex] || "#f6b35e");
  const topImg = document.createElement("img");
  topImg.alt = topName.replace(".png", "");
  topImg.src = `Art/Cats/${topName}`;
  topItem.appendChild(topImg);

  bottomItem.style.bottom = "16px";
  bottomItem.style.top = "auto";
  topItem.style.top = "16px";
  topItem.style.bottom = "auto";
  unlockList.appendChild(bottomItem);
  unlockList.appendChild(topItem);
  updateUnlockFill();
}

function updateUnlockFill() {
  if (!unlockFill) return;
  const progress =
    state.levelThreshold > 0
      ? clamp(state.levelScore / state.levelThreshold, 0, 1)
      : 0;
  const fill = progress * 100;
  unlockFill.style.height = `${fill}%`;
  const color = CAT_COLORS[state.lastUnlockedIndex] || "#f6b35e";
  unlockFill.style.background = `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.75) 100%)`;
}

function getLevelNumber() {
  return state.currentLevel + 1;
}

function getFlyingSpawnInterval() {
  const level = getLevelNumber();
  if (level < 3) return Infinity;
  if (level >= 5) return FLYING_SPAWN_RATES[5];
  return FLYING_SPAWN_RATES[level] || FLYING_SPAWN_RATES[5];
}

function getBombSpawnInterval() {
  const level = getLevelNumber();
  if (level < 6) return Infinity;
  return BOMB_INCREMENT_LEVELS[level] || BOMB_BASE_INTERVAL;
}

function updateEnemies(deltaMs) {
  if (!state.enemies) {
    state.enemies = [];
  }
  if (state.mode === "running") {
    if (state.currentLevel >= 2) {
      state.flyingSpawnAccumulator += deltaMs;
      const interval = getFlyingSpawnInterval();
      if (state.flyingSpawnAccumulator >= interval) {
        spawnFlyingCat();
        state.flyingSpawnAccumulator = 0;
      }
    }
    if (state.currentLevel >= 5) {
      state.bombSpawnAccumulator += deltaMs;
      const interval = getBombSpawnInterval();
      if (state.bombSpawnAccumulator >= interval) {
        spawnBombCat();
        state.bombSpawnAccumulator = 0;
      }
    }
  }
  for (let i = state.enemies.length - 1; i >= 0; i -= 1) {
    const enemy = state.enemies[i];
    if (enemy.type === "flying") {
      updateFlyingEnemy(enemy, delta);
    } else {
      updateBombEnemy(enemy, delta);
    }
    if (enemy.remove) {
      state.enemies.splice(i, 1);
    }
  }
}

function spawnFlyingCat() {
  const sideChoices = ["left", "right", "top"];
  const side = sideChoices[Math.floor(Math.random() * sideChoices.length)];
  let x;
  let y;
  if (side === "left") {
    x = -70;
    y = Math.random() * (BASE_Y - 120) + 60;
  } else if (side === "right") {
    x = canvas.width + 70;
    y = Math.random() * (BASE_Y - 120) + 60;
  } else {
    x = Math.random() * canvas.width;
    y = -70;
  }
  const targetX = canvas.width / 2;
  const targetY = BASE_Y - Math.max(80, state.stackHeight);
  const dx = targetX - x;
  const dy = targetY - y;
  const distance = Math.hypot(dx, dy) || 1;
  const dirX = dx / distance;
  const dirY = dy / distance;
  const level = Math.max(3, getLevelNumber());
  const levelOffset = Math.max(0, level - 3);
  const speed = 0.017 + levelOffset * 0.0012;
  const swayAmplitude = 6 + Math.min(5, levelOffset);
  const swayFrequency = 0.0004 + levelOffset * 0.00015;
  state.enemies.push({
    type: "flying",
    sprite: "FlyingCat1.png",
    x,
    y,
    dirX,
    dirY,
    targetX,
    targetY,
    speed,
    swayAmplitude,
    swayFrequency,
    swayPhase: Math.random() * Math.PI * 2,
    perpX: -dirY,
    perpY: dirX,
    radius: 36,
    remove: false
  });
}

function updateFlyingEnemy(enemy, delta) {
  enemy.swayPhase += enemy.swayFrequency * delta;
  const swayFactor = Math.sin(enemy.swayPhase) * enemy.swayAmplitude * 0.02;
  enemy.x += enemy.dirX * enemy.speed * delta + enemy.perpX * swayFactor;
  enemy.y += enemy.dirY * enemy.speed * delta + enemy.perpY * swayFactor;
  const distanceToTarget = Math.hypot(enemy.x - enemy.targetX, enemy.y - enemy.targetY);
  if (distanceToTarget < 28) {
    state.wobble = Math.min(WOBBLE_THRESHOLD * 1.4, state.wobble + 32);
    enemy.remove = true;
  }
  if (
    enemy.x < -120 ||
    enemy.x > canvas.width + 120 ||
    enemy.y > canvas.height + 120
  ) {
    enemy.remove = true;
  }
}

function spawnBombCat() {
  const bounds = getPlatformBounds();
  const leftZone = Math.random() < 0.5;
  const x = leftZone
    ? Math.random() * (bounds.left - 60)
    : bounds.right + Math.random() * 60;
  const y = Math.random() * 80 + 30;
  const hangTime = BOMB_HANG_MIN + Math.random() * (BOMB_HANG_MAX - BOMB_HANG_MIN);
  state.enemies.push({
    type: "bomb",
    sprite: "CatBomb1.png",
    x,
    y,
    state: "hanging",
    hangTime,
    rotation: 0,
    falling: false,
    scale: 1,
    shrinking: false,
    shrinkRate: 0.0012,
    remove: false,
    radius: 34
  });
}

function updateBombEnemy(enemy, delta) {
  if (enemy.remove) return;
  if (enemy.shrinking) {
    enemy.scale = Math.max(0, enemy.scale - enemy.shrinkRate * delta);
    if (enemy.scale <= 0.05) {
      enemy.remove = true;
    }
    return;
  }
  if (enemy.state === "hanging") {
    enemy.hangTime -= delta;
    if (enemy.hangTime <= 0) {
      enemy.state = "falling";
      enemy.falling = true;
    }
    return;
  }
  if (enemy.falling) {
    enemy.y += BOMB_FALL_SPEED * delta;
    enemy.rotation += BOMB_ROTATION_SPEED * delta;
    if (enemy.y > canvas.height + 40) {
      triggerBombExplosion();
      enemy.remove = true;
    }
  }
}

function triggerBombExplosion() {
  if (state.hearts > 0) {
    state.hearts = Math.max(0, state.hearts - 1);
    renderHearts();
  }
  state.wobble = Math.max(0, state.wobble - 15);
  state.collapseDebuffDrops = 5;
  state.collapseDebuffValue = BOMB_PENALTY_THRESHOLD;
  state.screenShakeTimer = SHAKE_DURATION;
  state.screenShakeStrength = SHAKE_STRENGTH;
}

function checkVictory() {
  const isFinalLevel = state.currentLevel >= LEVELS.length - 1;
  if (isFinalLevel && state.levelScore >= state.levelThreshold) {
    state.mode = "victory";
    state.record = Math.max(state.record, state.score);
    recordValue.textContent = state.record;
    maybeUpdateTopScore();
    showVictoryScreen();
    return true;
  }
  return false;
}

function showVictoryScreen() {
  overlay.classList.add("hidden");
  if (!victoryScreen) return;
  if (victoryGallery) {
    victoryGallery.innerHTML = "";
    CAT_NAMES.forEach((name, index) => {
      const card = document.createElement("div");
      card.className = "victory-card";
      card.style.setProperty("--cat-accent", CAT_COLORS[index] || "#f6b35e");
      const image = document.createElement("img");
      image.src = `Art/Cats/${name}`;
      image.alt = name.replace(/\.png$/i, "");
      card.appendChild(image);
      victoryGallery.appendChild(card);
    });
  }
  victoryScreen.classList.remove("hidden");
}

function showEnemyIntroIfNeeded(levelIndex) {
  const info = ENEMY_INTRO_STAGES[levelIndex];
  if (!info || !enemyIntro) return false;
  if (seenEnemyIntroLevels.has(levelIndex)) {
    return false;
  }
  seenEnemyIntroLevels.add(levelIndex);
  enemyIntroTitle.textContent = info.title;
  enemyIntroText.textContent = info.description;
  enemyIntroImage.src = info.image;
  enemyIntroImage.alt = info.title;
  enemyIntro.classList.remove("hidden");
  return true;
}

function triggerLadderAdvance() {
  if (!unlockList) return;
  if (state.ladderAnimating) return;
  state.ladderAnimating = true;
  unlockList.classList.add("advance");
  window.setTimeout(() => {
    unlockList.classList.remove("advance");
    state.ladderAnimating = false;
    renderUnlockList();
  }, 520);
}

function renderHearts() {
  if (!heartRow) return;
  heartRow.innerHTML = "";
  for (let i = 0; i < 5; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-icon";
    const fill = i < state.hearts ? "#ef4444" : "#9ca3af";
    heart.innerHTML = `<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="${fill}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/></svg>`;
    heartRow.appendChild(heart);
  }
}

function loop(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }
  const rawDelta = timestamp - lastTimestamp;
  const clampedDelta = clamp(rawDelta, MIN_FRAME_DELTA_MS, MAX_FRAME_DELTA_MS);
  const deltaRatio = clamp(clampedDelta / GAME_FRAME_DELTA_MS, MIN_DELTA_RATIO, MAX_DELTA_RATIO);
  lastTimestamp = timestamp;
  try {
    update(deltaRatio, clampedDelta);
  } catch (error) {
    console.error("update loop error", error);
  }
  try {
    render();
  } catch (error) {
    console.error("render loop error", error);
  }
  requestAnimationFrame(loop);
}

function worldToScreenX(worldX) {
  return canvas.width / 2 + state.cameraZoom * (worldX - canvas.width / 2);
}

function screenToWorldY(screenY) {
  const zoom = state.cameraZoom || 1;
  return (screenY - BASE_Y) / zoom + BASE_Y - state.cameraYOffset;
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    attemptDrop();
  }
  if (event.key === "f") {
    toggleFullscreen();
  }
});

canvas.addEventListener("pointerdown", (event) => {
  handleCanvasClick(event);
});

if (enemyIntroButton) {
  enemyIntroButton.addEventListener("click", () => {
    enemyIntro && enemyIntro.classList.add("hidden");
    state.mode = "running";
  });
}

function handleCanvasClick(event) {
  if (state.mode !== "running") return;
  event.preventDefault();
  const worldX = screenToWorldX(event.offsetX);
  const worldY = screenToWorldY(event.offsetY);
  if (tryHandleEnemyClick(worldX, worldY)) {
    return;
  }
}

function tryHandleEnemyClick(x, y) {
  for (let i = state.enemies.length - 1; i >= 0; i -= 1) {
    const enemy = state.enemies[i];
    const dx = x - enemy.x;
    const dy = y - enemy.y;
    const distance = Math.hypot(dx, dy);
    const radius = enemy.radius || 36;
    if (distance > radius) {
      continue;
    }
    if (enemy.type === "flying") {
      state.enemies.splice(i, 1);
      state.wobble = Math.max(0, state.wobble - 10);
      return true;
    }
    if (enemy.type === "bomb" && enemy.falling && !enemy.shrinking) {
      enemy.shrinking = true;
      enemy.shrinkRate = 0.04;
      return true;
    }
  }
  return false;
}

function screenToWorldX(screenX) {
  const zoom = state.cameraZoom || 1;
  return (screenX - canvas.width / 2) / zoom + canvas.width / 2;
}

startButton.addEventListener("click", () => {
  startGame();
});

playAgainBtn.addEventListener("click", () => {
  startGame();
});

if (victoryPlayAgain) {
  victoryPlayAgain.addEventListener("click", () => {
    startGame();
  });
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen && canvas.requestFullscreen();
  }
}

window.resetGame = startGame;

window.advanceTime = (ms) => {
  const steps = Math.max(1, Math.round(ms / 16.666));
  for (let i = 0; i < steps; i++) {
    update();
  }
  render();
};

window.render_game_to_text = () => {
  return JSON.stringify({
    mode: state.mode,
    score: state.score,
    record: state.record,
    wobble: Math.round(state.wobble),
    stackedCats: state.stack.length,
    activeCat: state.activeCat
      ? { name: state.activeCat.name, x: Math.round(state.activeCat.x), y: Math.round(state.activeCat.y) }
      : null
  });
};

function isMissedDrop(cat) {
  if (!state.stack.length) return false;
  const previous = state.stack[state.stack.length - 1];
  const offset = Math.abs(cat.x + cat.width / 2 - (previous.x + previous.width / 2));
  return offset > cat.width * MISS_OFFSET_RATIO;
}

function bounceMissedCat(cat) {
  cat.missed = true;
  cat.vy = -4.6;
  const direction = cat.x + cat.width / 2 < canvas.width / 2 ? -1 : 1;
  cat.vx = direction * 6.2;
  state.hearts = Math.max(0, state.hearts - 1);
  renderHearts();
  if (state.hearts <= 0) {
    triggerCollapse();
  }
  consumeCollapseDebuffDrop();
}

function consumeCollapseDebuffDrop() {
  if (state.collapseDebuffDrops > 0) {
    state.collapseDebuffDrops -= 1;
    if (state.collapseDebuffDrops <= 0) {
      state.collapseDebuffValue = 0;
      state.collapseDebuffDrops = 0;
    }
  }
}

loadAssets();
