const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("game-over");
let mainMenu = document.getElementById("main-menu");
const bestSurvivalScoreEl = document.getElementById("best-survival-score");
const bestCheckpointScoreEl = document.getElementById("best-checkpoint-score");
const scoreValue = document.getElementById("score-value");
const heightValue = document.getElementById("height-value");
const wobbleBar = document.getElementById("wobble-bar");
const finalHeight = document.getElementById("final-height");
const finalScore = document.getElementById("final-score");
const pauseMenu = document.getElementById("pause-menu");
const pauseResumeBtn = document.getElementById("pause-resume");
const pauseMenuHome = document.getElementById("pause-menu-home");
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
const victoryMainMenu = document.getElementById("victory-main-menu");
const topScoreValue = document.getElementById("top-score-value");
const shopButton = document.getElementById("shop-button");
const shopPanel = document.getElementById("shop-panel");
const shopCloseButton = document.getElementById("shop-close");
const shopPointsValue = document.getElementById("shop-points-value");
const shopPanelPoints = document.getElementById("shop-panel-points");
const BEST_SURVIVAL_KEY = "catstacker-best-survival";
const BEST_CHECKPOINT_KEY = "catstacker-best-checkpoint";
const SHOP_POINTS_KEY = "catstacker-shop-points";
const slipperyWarning = document.getElementById("slippery-warning");
const victoryModeLabel = document.getElementById("victory-mode");
const gameOverTitle = document.getElementById("game-over-title");
const gameOverText = document.getElementById("game-over-text");
const gameOverPlayAgain = document.getElementById("game-over-play-again");
const gameOverMainMenu = document.getElementById("game-over-main-menu");
const PERSONAL_BEST_KEY = "catstacker-personal-best";

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
const DEFAULT_MISS_OFFSET_RATIO = 0.36;
const LIGHTNING_DEBUFF_MS = 2000;
const LIGHTNING_SHAKE_DURATION = 280;
const LIGHTNING_SHOCK_STRENGTH = 5;
const LIGHTNING_FLASH_DECAY = 0.0025;
const RAIN_DROPS = 160;
const RAIN_SPAWN_RATE = 0.008;

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
    name: "Nightfall Rain",
    gradient: ["#030513", "#0f122f"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.024,
    previewDirectionCooldown: 110,
    dropDrift: 0.42,
    previewJitter: 0.08,
    dropRandomness: { amplitude: 0.33, interval: 62, variance: 32, inertia: 0.28 }
  },
  {
    name: "Velvet Storm",
    gradient: ["#040420", "#12142f"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.56,
    previewJitter: 0.12,
    dropRandomness: { amplitude: 0.46, interval: 54, variance: 28, inertia: 0.32 }
  },
  {
    name: "Shadow Drizzle",
    gradient: ["#030415", "#17143a"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.058,
    previewDirectionCooldown: 68,
    dropDrift: 0.78,
    previewJitter: 0.16,
    dropRandomness: { amplitude: 0.64, interval: 48, variance: 24, inertia: 0.36 }
  },
  {
    name: "Sunset Haze",
    gradient: ["#ffbb77", "#ff6c40"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.066,
    previewDirectionCooldown: 54,
    dropDrift: 0.92,
    previewJitter: 0.2,
    dropRandomness: { amplitude: 0.78, interval: 44, variance: 20, inertia: 0.38 }
  },
  {
    name: "Electric Tangle",
    gradient: ["#050215", "#1c1b3a"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.078,
    previewDirectionCooldown: 48,
    dropDrift: 1.08,
    previewJitter: 0.24,
    dropRandomness: { amplitude: 0.95, interval: 40, variance: 18, inertia: 0.4 }
  },
  {
    name: "Eclipse Apex",
    gradient: ["#04020f", "#1a1236"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.09,
    previewDirectionCooldown: 40,
    dropDrift: 1.22,
    previewJitter: 0.28,
    dropRandomness: { amplitude: 1.1, interval: 36, variance: 16, inertia: 0.42 }
  }
];
const LEVEL_THRESHOLDS = LEVELS.map((_, idx) => 10 + idx * 5);
const LEVEL_EFFECTS = {
  3: {
    rain: true,
    lightning: { minInterval: 8500, maxInterval: 10500, bolts: 3 },
    slick: false,
    fog: null,
    skull: false
  },
  4: {
    rain: true,
    lightning: { minInterval: 7000, maxInterval: 9000, bolts: 3 },
    slipThreshold: 0.32,
    fog: null,
    skull: true
  },
  5: {
    rain: true,
    lightning: { minInterval: 5200, maxInterval: 7200, bolts: 4 },
    slipThreshold: 0.28,
    fog: null,
    skull: true
  },
  6: {
    rain: false,
    lightning: null,
    slipThreshold: DEFAULT_MISS_OFFSET_RATIO,
    fog: { intervalRange: [12000, 18000], peakOpacity: 0.95, baseOpacity: 0.2, denseDrops: 2, denseDuration: 2200 },
    skull: false,
    sunset: true
  },
  7: {
    rain: true,
    lightning: { minInterval: 3800, maxInterval: 5200, bolts: 4 },
    slipThreshold: 0.24,
    fog: { intervalRange: [15000, 21000], peakOpacity: 0.78, baseOpacity: 0.28, denseDuration: 2400 },
    skull: true
  },
  8: {
    rain: true,
    lightning: { minInterval: 3200, maxInterval: 4600, bolts: 5 },
    slipThreshold: 0.22,
    fog: { intervalRange: [13000, 19000], peakOpacity: 0.82, baseOpacity: 0.3, denseDuration: 2600 },
    skull: true
  }
};
const SKULL_ICON_PATH = "CodexOutput/icons/CatStacker/material-symbols-skull.svg";
const SKULL_WARNING_TEXT = "Cats may be slippery";

function getLevelConfig(levelIndex = state.currentLevel) {
  const safeIndex = Math.max(0, Math.min(LEVELS.length - 1, levelIndex));
  return LEVELS[safeIndex];
}

function getLevelNumber() {
  return state.currentLevel + 1;
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
  gameMode: "survival",
  paused: false,
  levelStartScore: 0,
  missOffsetRatio: DEFAULT_MISS_OFFSET_RATIO,
  lightningTimer: 0,
  nextLightning: Infinity,
  lightningFlash: 0,
  lightningFlashes: [],
  lightningShakeTimer: 0,
  lightningDebuffTimer: 0,
  cameraShakeX: 0,
  cameraShakeY: 0,
  rainDrops: [],
  rainSpawnAccumulator: 0,
  fogOpacity: 0,
  fogTargetOpacity: 0,
  fogBaseOpacity: 0,
  fogPeakOpacity: 0,
  fogNextTrigger: Infinity,
  fogHoldDrops: 0,
  fogDenseTimer: 0,
  fogDense: false,
  fogDenseDuration: 0,
  fogDenseDropsRequired: 0,
  showSun: false,
  skullWarningVisible: false
};

let bestSurvivalScore = loadBestScore(BEST_SURVIVAL_KEY);
let bestCheckpointScore = loadBestScore(BEST_CHECKPOINT_KEY);
let shopPoints = loadShopPoints();
state.topScore = loadPersonalBest();
updateTopScoreDisplay();
updateShopPointsDisplay();
function loadBestScore(key) {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  } catch (error) {
    // ignore
  }
  return 0;
}
function saveBestScore(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
  } catch (error) {
    // ignore
  }
}
function loadShopPoints() {
  try {
    const raw = window.localStorage.getItem(SHOP_POINTS_KEY);
    const parsed = parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  } catch (error) {
    // ignore
  }
  return 0;
}
function saveShopPoints() {
  try {
    window.localStorage.setItem(SHOP_POINTS_KEY, String(shopPoints));
  } catch (error) {
    // ignore
  }
}
function updateShopPointsDisplay() {
  if (shopPointsValue) {
    shopPointsValue.textContent = shopPoints.toString();
  }
  if (shopPanelPoints) {
    shopPanelPoints.textContent = shopPoints.toString();
  }
}
function addShopPoints(amount) {
  const points = Math.max(0, Math.floor(amount));
  if (points <= 0) return;
  shopPoints += points;
  saveShopPoints();
  updateShopPointsDisplay();
}
function updateMenuBestScores() {
  if (bestSurvivalScoreEl) {
    bestSurvivalScoreEl.textContent = bestSurvivalScore.toString();
  }
  if (bestCheckpointScoreEl) {
    bestCheckpointScoreEl.textContent = bestCheckpointScore.toString();
  }
}
function recordModeBest(score) {
  if (state.gameMode === "checkpoint") {
    if (score > bestCheckpointScore) {
      bestCheckpointScore = score;
      saveBestScore(BEST_CHECKPOINT_KEY, score);
    }
  } else {
    if (score > bestSurvivalScore) {
      bestSurvivalScore = score;
      saveBestScore(BEST_SURVIVAL_KEY, score);
    }
  }
  updateMenuBestScores();
  updateTopScoreDisplay();
}
function resolveMainMenu() {
  if (!mainMenu) {
    mainMenu = document.getElementById("main-menu");
  }
  return mainMenu;
}

function hideShopPanelOnly() {
  if (shopPanel) {
    shopPanel.classList.add("hidden");
  }
}

function showMainMenu() {
  hideShopPanelOnly();
  const menu = resolveMainMenu();
  menu && menu.classList.remove("hidden");
  overlay && overlay.classList.add("hidden");
  victoryScreen && victoryScreen.classList.add("hidden");
  pauseMenu && pauseMenu.classList.add("hidden");
  state.mode = "start";
  state.paused = false;
  state.sessionScore = 0;
  state.score = 0;
  state.levelStartScore = 0;
  updateMenuBestScores();
  updateTopScoreDisplay();
}
function hideMainMenu() {
  const menu = resolveMainMenu();
  menu && menu.classList.add("hidden");
}
function startNewRun(mode) {
  state.gameMode = mode;
  state.sessionScore = 0;
  state.score = 0;
  state.levelStartScore = 0;
  updateTopScoreDisplay();
  hideMainMenu();
  state.paused = false;
  startGame();
}
function showShopPanel() {
  hideMainMenu();
  if (shopPanel) {
    shopPanel.classList.remove("hidden");
  }
}
function closeShopPanel() {
  hideShopPanelOnly();
  const menu = resolveMainMenu();
  if (menu) {
    menu.classList.remove("hidden");
    updateMenuBestScores();
    updateTopScoreDisplay();
    updateShopPointsDisplay();
  }
}
function restartCheckpointLevel() {
  overlay && overlay.classList.add("hidden");
  state.sessionScore = state.levelStartScore;
  state.score = state.levelStartScore;
  beginLevel(state.currentLevel, true);
}
function openPauseMenu() {
  if (state.mode !== "running") return;
  pauseMenu && pauseMenu.classList.remove("hidden");
  state.paused = true;
}
function closePauseMenu() {
  pauseMenu && pauseMenu.classList.add("hidden");
  state.paused = false;
}

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
  if (!topScoreValue) return;
  const best =
    state.gameMode === "checkpoint" ? bestCheckpointScore : bestSurvivalScore;
  topScoreValue.textContent = best.toString();
}

function maybeUpdateTopScore() {
  if (state.score > state.topScore) {
    state.topScore = state.score;
    savePersonalBest(state.topScore);
    updateTopScoreDisplay();
  }
}

const assetCache = new Map();
const catDefs = new Map();
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
  await Promise.all(promises);
  assetsLoaded = true;
  renderUnlockList();
  showMainMenu();
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
  victoryScreen && victoryScreen.classList.add("hidden");
  pauseMenu && pauseMenu.classList.add("hidden");
  state.score = state.sessionScore;
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
  state.levelStartScore = state.sessionScore;
  state.levelThreshold =
    LEVEL_THRESHOLDS[safeIndex] !== undefined
      ? LEVEL_THRESHOLDS[safeIndex]
      : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const levelConfig = getLevelConfig(safeIndex);
  const levelNumber = safeIndex + 1;
  const levelEffect = LEVEL_EFFECTS[levelNumber] || {};
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
  state.missOffsetRatio = levelEffect.slipThreshold ?? DEFAULT_MISS_OFFSET_RATIO;
  state.skullWarningVisible = !!levelEffect.skull;
  state.showSun = !!levelEffect.sunset;
  if (!levelEffect.rain) {
    state.rainDrops = [];
  }
  state.rainSpawnAccumulator = 0;
  state.lightningTimer = 0;
  state.lightningFlash = 0;
  state.lightningFlashes = [];
  state.lightningShakeTimer = 0;
  state.lightningDebuffTimer = 0;
  state.cameraShakeX = 0;
  state.cameraShakeY = 0;
  if (levelEffect.lightning) {
    state.nextLightning = randomBetween(levelEffect.lightning.minInterval, levelEffect.lightning.maxInterval);
  } else {
    state.nextLightning = Infinity;
  }
  if (levelEffect.fog) {
    const [minFog, maxFog] = levelEffect.fog.intervalRange;
    state.fogBaseOpacity = levelEffect.fog.baseOpacity ?? 0;
    state.fogPeakOpacity = levelEffect.fog.peakOpacity ?? 0;
    state.fogOpacity = state.fogBaseOpacity;
    state.fogTargetOpacity = state.fogBaseOpacity;
    state.fogNextTrigger = randomBetween(minFog, maxFog);
    state.fogHoldDrops = 0;
    state.fogDenseTimer = 0;
    state.fogDense = false;
    state.fogDenseDuration = levelEffect.fog.denseDuration ?? 2000;
    state.fogDenseDropsRequired = levelEffect.fog.denseDrops ?? 0;
  } else {
    state.fogBaseOpacity = 0;
    state.fogPeakOpacity = 0;
    state.fogOpacity = 0;
    state.fogTargetOpacity = 0;
    state.fogNextTrigger = Infinity;
    state.fogHoldDrops = 0;
    state.fogDenseTimer = 0;
    state.fogDense = false;
    state.fogDenseDuration = 0;
    state.fogDenseDropsRequired = 0;
  }
  state.mode = "running";
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
  if (state.mode !== "running" || state.activeCat || !assetsLoaded || state.paused) return;
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
  handleFogCatDrop();
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
  maybeUpdateTopScore();
  finalHeight.textContent = state.stack.length;
  finalScore.textContent = state.score;
  finalLevel.textContent = state.currentLevel + 1;
  recordModeBest(state.score);
  if (state.gameMode === "survival") {
    addShopPoints(state.score);
  }
  showGameOverPanel();
  state.paused = false;
  overlay.classList.remove("hidden");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
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
  const penalty = state.lightningDebuffTimer > 0 ? BASE_COLLAPSE_THRESHOLD * 0.28 : 0;
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
  if (state.paused) return;
  const levelEffect = LEVEL_EFFECTS[getLevelNumber()] || {};
  updateFog(deltaMs, levelEffect);
  if (state.mode === "running") {
    updateRain(deltaMs, levelEffect);
    updateLightning(deltaMs, levelEffect);
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
  if (state.showSun) {
    ctx.save();
    const sunY = canvas.height * 0.78;
    ctx.fillStyle = "rgba(255, 215, 135, 0.85)";
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, sunY, 68, 68, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

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

function updateRain(deltaMs, effect) {
  if (!effect?.rain) {
    state.rainDrops = [];
    state.rainSpawnAccumulator = 0;
    return;
  }
  state.rainSpawnAccumulator += deltaMs * RAIN_SPAWN_RATE;
  let spawnCount = Math.floor(state.rainSpawnAccumulator);
  state.rainSpawnAccumulator -= spawnCount;
  while (spawnCount > 0 && state.rainDrops.length < RAIN_DROPS) {
    state.rainDrops.push({
      x: Math.random() * canvas.width,
      y: -10,
      length: 12 + Math.random() * 18,
      speed: 0.28 + Math.random() * 0.2,
      drift: (Math.random() * 2 - 1) * 0.04,
      opacity: 0.2 + Math.random() * 0.4
    });
    spawnCount -= 1;
  }
  state.rainDrops = state.rainDrops
    .map((drop) => ({
      ...drop,
      y: drop.y + drop.speed * deltaMs,
      x: drop.x + drop.drift * deltaMs
    }))
    .filter((drop) => drop.y < canvas.height + drop.length);
}

function drawRain() {
  if (!state.rainDrops.length) return;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  state.rainDrops.forEach((drop) => {
    ctx.globalAlpha = drop.opacity;
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x + drop.drift * 12, drop.y + drop.length);
    ctx.stroke();
  });
  ctx.restore();
}

function updateLightning(deltaMs, effect) {
  if (!effect?.lightning) {
    state.lightningTimer = 0;
    return;
  }
  state.lightningTimer += deltaMs;
  if (state.lightningTimer >= state.nextLightning) {
    triggerLightningStrike(effect.lightning);
    state.lightningTimer = 0;
    state.nextLightning = randomBetween(effect.lightning.minInterval, effect.lightning.maxInterval);
  }
  if (state.lightningFlash > 0) {
    state.lightningFlash = Math.max(0, state.lightningFlash - deltaMs * LIGHTNING_FLASH_DECAY);
  }
  state.lightningFlashes = state.lightningFlashes.filter((flash) => {
    flash.progress += deltaMs;
    return flash.progress <= flash.duration;
  });
  if (state.lightningShakeTimer > 0) {
    state.lightningShakeTimer = Math.max(0, state.lightningShakeTimer - deltaMs);
    state.cameraShakeX = (Math.random() * 2 - 1) * LIGHTNING_SHOCK_STRENGTH;
    state.cameraShakeY = (Math.random() * 2 - 1) * LIGHTNING_SHOCK_STRENGTH;
  } else {
    state.cameraShakeX = 0;
    state.cameraShakeY = 0;
  }
  if (state.lightningDebuffTimer > 0) {
    state.lightningDebuffTimer = Math.max(0, state.lightningDebuffTimer - deltaMs);
  }
}

function triggerLightningStrike(lightning) {
  state.lightningFlash = 1;
  state.lightningFlashes = [];
  const bolts = lightning.bolts || 3;
  for (let i = 0; i < bolts; i += 1) {
    state.lightningFlashes.push({
      x: Math.random() * canvas.width,
      progress: 0,
      duration: 180 + Math.random() * 160,
      width: 2 + Math.random() * 3
    });
  }
  state.lightningShakeTimer = LIGHTNING_SHAKE_DURATION;
  state.lightningDebuffTimer = LIGHTNING_DEBUFF_MS;
  state.wobble = Math.max(0, state.wobble - 18);
}

function drawLightning() {
  if (state.lightningFlashes.length) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    state.lightningFlashes.forEach((flash) => {
      const alpha = Math.max(0, 1 - flash.progress / flash.duration);
      ctx.globalAlpha = alpha * 0.7;
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath();
      ctx.moveTo(flash.x, -20);
      ctx.lineTo(flash.x + (Math.random() * 2 - 1) * flash.width * 6, canvas.height + 20);
      ctx.stroke();
    });
    ctx.restore();
  }
  if (state.lightningFlash > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(0.45, state.lightningFlash * 0.35);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
}

function updateFog(deltaMs, effect) {
  if (!effect?.fog) {
    state.fogOpacity += (state.fogTargetOpacity - state.fogOpacity) * 0.08;
    return;
  }
  if (!state.fogDense) {
    state.fogNextTrigger -= deltaMs;
    if (state.fogNextTrigger <= 0) {
      state.fogDense = true;
      state.fogTargetOpacity = state.fogPeakOpacity;
      state.fogHoldDrops = state.fogDenseDropsRequired;
      state.fogDenseTimer = state.fogDenseDuration;
    }
  } else if (state.fogDense) {
    if (state.fogHoldDrops <= 0) {
      state.fogDenseTimer -= deltaMs;
      if (state.fogDenseTimer <= 0) {
        endFogBurst(effect);
      }
    }
  }
  state.fogOpacity += (state.fogTargetOpacity - state.fogOpacity) * 0.08;
}

function endFogBurst(effect) {
  state.fogDense = false;
  state.fogTargetOpacity = state.fogBaseOpacity;
  if (effect?.fog?.intervalRange) {
    const [minFog, maxFog] = effect.fog.intervalRange;
    state.fogNextTrigger = randomBetween(minFog, maxFog);
  } else {
    state.fogNextTrigger = Infinity;
  }
  state.fogDenseTimer = 0;
  state.fogHoldDrops = 0;
}

function handleFogCatDrop() {
  const effect = LEVEL_EFFECTS[getLevelNumber()] || {};
  if (!effect.fog || !state.fogDense) return;
  if (state.fogHoldDrops > 0) {
    state.fogHoldDrops = Math.max(0, state.fogHoldDrops - 1);
  }
  if (state.fogHoldDrops <= 0 && state.fogDenseTimer <= 0) {
    endFogBurst(effect);
  }
}

function drawFog() {
  if (state.fogOpacity <= 0) return;
  ctx.save();
  const fogColor = state.showSun ? "rgba(255, 217, 178, " : "rgba(255, 255, 255, ";
  ctx.fillStyle = `${fogColor}${Math.min(0.7, state.fogOpacity)})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  ctx.translate(state.cameraShakeX || 0, state.cameraShakeY || 0);
  ctx.translate(canvas.width / 2, BASE_Y);
  ctx.scale(zoom, zoom);
  ctx.translate(-canvas.width / 2, -BASE_Y + state.cameraYOffset);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawRain();
  ctx.save();
  applyCameraTransform();
  drawPlatform();
  drawStack();
  ctx.restore();
  drawPreview();
  drawLightning();
  drawFog();
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
  updateSlipperyWarning();
}

function updateSlipperyWarning() {
  if (!slipperyWarning) return;
  slipperyWarning.classList.toggle("hidden", !state.skullWarningVisible);
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

function checkVictory() {
  const isFinalLevel = state.currentLevel >= LEVELS.length - 1;
  if (isFinalLevel && state.levelScore >= state.levelThreshold) {
    state.mode = "victory";
    state.record = Math.max(state.record, state.score);
    maybeUpdateTopScore();
    showVictoryScreen();
    return true;
  }
  return false;
}

function showVictoryScreen() {
  overlay.classList.add("hidden");
  recordModeBest(state.score);
  if (state.gameMode === "survival") {
    addShopPoints(state.score);
  }
  if (!victoryScreen) return;
  const modeLabel =
    state.gameMode === "checkpoint"
      ? "Checkpoint Run"
      : "Survival";
  if (victoryModeLabel) {
    victoryModeLabel.textContent = `You beat CatStacker in ${modeLabel}.`;
  }
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

function showGameOverPanel() {
  const isCheckpoint = state.gameMode === "checkpoint";
  if (gameOverTitle) {
    gameOverTitle.textContent = isCheckpoint ? "Level Failed" : "Game Over";
  }
  if (gameOverText) {
    gameOverText.textContent = `Your score: ${state.score}`;
  }
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
  if (event.code === "Escape") {
    if (state.paused) {
      closePauseMenu();
    } else {
      openPauseMenu();
    }
  }
  if (event.key === "f") {
    toggleFullscreen();
  }
});

canvas.addEventListener("pointerdown", (event) => {
  handleCanvasClick(event);
});

function handleCanvasClick(event) {
  if (state.mode !== "running" || state.paused) return;
  event.preventDefault();
  attemptDrop();
}

function screenToWorldX(screenX) {
  const zoom = state.cameraZoom || 1;
  return (screenX - canvas.width / 2) / zoom + canvas.width / 2;
}

let mainMenuHandlersBound = false;

function setupMainMenuModeHandlers() {
  const menu = resolveMainMenu();
  if (!menu || mainMenuHandlersBound) return;
  menu.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-mode]");
    if (!button) return;
    const mode = button.dataset.mode;
    if (!mode) return;
    event.preventDefault();
    startNewRun(mode);
  });
  mainMenuHandlersBound = true;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupMainMenuModeHandlers);
} else {
  setupMainMenuModeHandlers();
}
shopButton &&
  shopButton.addEventListener("click", (event) => {
    event.preventDefault();
    showShopPanel();
  });
shopCloseButton &&
  shopCloseButton.addEventListener("click", () => {
    closeShopPanel();
  });
shopPanel &&
  shopPanel.addEventListener("click", (event) => {
    if (event.target === shopPanel) {
      closeShopPanel();
    }
  });
pauseResumeBtn &&
  pauseResumeBtn.addEventListener("click", () => {
    closePauseMenu();
  });
pauseMenuHome &&
  pauseMenuHome.addEventListener("click", () => {
    closePauseMenu();
    showMainMenu();
  });
gameOverPlayAgain &&
  gameOverPlayAgain.addEventListener("click", () => {
    if (state.gameMode === "checkpoint") {
      restartCheckpointLevel();
    } else {
      startNewRun("survival");
    }
  });
gameOverMainMenu &&
  gameOverMainMenu.addEventListener("click", () => {
    overlay && overlay.classList.add("hidden");
    showMainMenu();
  });
victoryPlayAgain &&
  victoryPlayAgain.addEventListener("click", () => {
    startNewRun(state.gameMode);
  });
victoryMainMenu &&
  victoryMainMenu.addEventListener("click", () => {
    victoryScreen && victoryScreen.classList.add("hidden");
    showMainMenu();
  });

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
  const thresholdRatio = state.missOffsetRatio || DEFAULT_MISS_OFFSET_RATIO;
  return offset > cat.width * thresholdRatio;
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
}

loadAssets();
