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
const finalRunPoints = document.getElementById("final-run-points");
const finalBonusPoints = document.getElementById("final-bonus-points");
const finalTotalPoints = document.getElementById("final-total-points");
const pauseMenu = document.getElementById("pause-menu");
const pauseResumeBtn = document.getElementById("pause-resume");
const pauseMenuHome = document.getElementById("pause-menu-home");
const pauseButton = document.getElementById("pause-button");
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
const victoryRunPoints = document.getElementById("victory-run-points");
const victoryBonusPoints = document.getElementById("victory-bonus-points");
const victoryTotalPoints = document.getElementById("victory-total-points");
const topScoreValue = document.getElementById("top-score-value");
const shopButton = document.getElementById("shop-button");
const shopPanel = document.getElementById("shop-panel");
const shopCloseButton = document.getElementById("shop-close");
const shopPointsValue = document.getElementById("shop-points-value");
const shopPanelPoints = document.getElementById("shop-panel-points");
const shopCategories = document.getElementById("shop-categories");
const shopGrid = document.getElementById("shop-grid");
const shopPopup = document.getElementById("shop-popup");
const shopPopupImage = document.getElementById("shop-popup-image");
const shopPopupText = document.getElementById("shop-popup-text");
const shopPopupClose = document.querySelector(".shop-popup-close");
const authStatusLine = document.getElementById("auth-status-line");
const leaderboardList = document.getElementById("leaderboard-list");
const audioToggleButton = document.getElementById("audio-toggle");
const audioToggleIcon = document.getElementById("audio-toggle-icon");
const windIndicator = document.getElementById("wind-indicator");
const windArrowEl = document.getElementById("wind-arrow");
const windSpeedEl = document.getElementById("wind-speed");
const dropTimerEl = document.getElementById("drop-timer");
const BEST_SURVIVAL_KEY = "catstacker-best-survival";
const BEST_CHECKPOINT_KEY = "catstacker-best-checkpoint";
const SHOP_POINTS_KEY = "catstacker-shop-points";
const SHOP_PURCHASES_KEY = "catstacker-shop-purchases";
const SHOP_BORDER_PURCHASES_KEY = "catstacker-shop-border-purchases";
const SHOP_BUFFS_KEY = "catstacker-shop-buffs";
const EQUIPPED_PLATFORM_KEY = "catstacker-equipped-platform";
const EQUIPPED_BORDER_KEY = "catstacker-equipped-border";
const AUDIO_MUTED_KEY = "catstacker-audio-muted";
const slipperyWarning = document.getElementById("slippery-warning");
const victoryModeLabel = document.getElementById("victory-mode");
const gameOverTitle = document.getElementById("game-over-title");
const gameOverText = document.getElementById("game-over-text");
const gameOverPlayAgain = document.getElementById("game-over-play-again");
const gameOverMainMenu = document.getElementById("game-over-main-menu");
const bonusBurst = document.getElementById("bonus-burst");
const buffTray = document.getElementById("buff-tray");
const PERSONAL_BEST_KEY = "catstacker-personal-best";
const SHARED_API_BASE = (window.STUDIOJPG_API_BASE || "https://api.studiojpg.co").replace(/\/$/, "");
const AUTH_ME_ENDPOINT = `${SHARED_API_BASE}/api/auth/me`;
const CATSTACKER_PROFILE_ENDPOINT = `${SHARED_API_BASE}/api/catstacker/profile`;
const CATSTACKER_RUNS_ENDPOINT = `${SHARED_API_BASE}/api/catstacker/survival-runs`;
const CATSTACKER_LEADERBOARD_ENDPOINT = `${SHARED_API_BASE}/api/catstacker/leaderboard`;

const CAT_NAMES = [
  "Cat1.png",
  "Cat2.png",
  "Cat3.png",
  "Cat4.png",
  "cat5.png",
  "Cat6.png",
  "Cat 7.png",
  "Cat8.png",
  "Cat9.png",
  "Cat10.png",
  "Cat11.png",
  "Cat12.png",
  "Cat13.png"
];
const CAT_COLORS = [
  "#f6b35e",
  "#e89a59",
  "#d8896a",
  "#c47c7c",
  "#b26a86",
  "#a85b9b",
  "#9141b8",
  "#6f36b3",
  "#48b9a6",
  "#59a6ff",
  "#80c774",
  "#f2c14e",
  "#ff6f91"
];
const SHOP_ITEMS = [
  { key: "terracotta", title: "Terracotta Platform", cost: 250, img: "Art/Platforms/terracottaplatform.png" },
  { key: "tea", title: "Tea Platform", cost: 1000, img: "Art/Platforms/teaplatform.png" },
  { key: "castle", title: "Castle Platform", cost: 2000, img: "Art/Platforms/castleplatform.png" },
  { key: "coffee", title: "Coffee Platform", cost: 2000, img: "Art/Platforms/coffeeplatform.png" },
  { key: "blondegirl", title: "Blonde Girl Platform", cost: 2500, img: "Art/Platforms/blondegirlplatform.png" },
  { key: "chicken", title: "Chicken Platform", cost: 3000, img: "Art/Platforms/chickenplatform.png" },
  { key: "human", title: "Human Platform", cost: 3000, img: "Art/Platforms/humanplatform.png" }
];
const BORDER_ITEMS = [
  { key: "terracottaFrame", title: "Terracotta Frame", cost: 150, img: "Art/Borders/TerracottaFrame.png" },
  { key: "ostrichFrame", title: "Ostrich Frame", cost: 150, img: "Art/Borders/OstrichFrame.png" },
  { key: "pillBottleFrame", title: "Pill Bottle Frame", cost: 250, img: "Art/Borders/PillBottleFrame.png" },
  { key: "loafCatFrame", title: "Loaf Cat Frame", cost: 250, img: "Art/Borders/LoafCatFrame.png" },
  { key: "catHouseFrame", title: "Cat House Frame", cost: 500, img: "Art/Borders/CatHouseFrame.png" },
  { key: "duckFrame", title: "Duck Frame", cost: 500, img: "Art/Borders/DuckFrame.png" },
  { key: "lipsFrame", title: "Lips Frame", cost: 750, img: "Art/Borders/LipsFrame.png" },
  { key: "blondeGirlFrame", title: "Blonde Girl Frame", cost: 2000, img: "Art/Borders/BlondeGirlFrame.png" }
];
const BUFF_ITEMS = [
  {
    key: "nineLives",
    title: "9 Lives",
    cost: 2500,
    img: "Art/Items/9Lives.png",
    description: "Set hearts to 9 for this level. One wobble-collapse rescue.",
    durationMs: null
  },
  {
    key: "catMagnet",
    title: "Cat Magnet",
    cost: 2000,
    img: "Art/Items/CatMagnet.png",
    description: "6s tower magnet aura. Drops snap to center alignment.",
    durationMs: 6000
  },
  {
    key: "catLife",
    title: "Cat Life",
    cost: 250,
    img: "Art/Items/CatLife.png",
    description: "Restore 1 heart, or add +1 if already full this level.",
    durationMs: 0
  },
  {
    key: "fifthSense",
    title: "5th Sense",
    cost: 500,
    img: "Art/Items/5thSense.png",
    description: "10s pulse showing the ideal drop zone.",
    durationMs: 10000
  },
  {
    key: "fogLens",
    title: "Fog Lens",
    cost: 200,
    img: "Art/Items/FogLens.png",
    description: "20s fog suppression for clearer visibility.",
    durationMs: 20000
  },
  {
    key: "stickyPaws",
    title: "Sticky Paws",
    cost: 250,
    img: "Art/Items/StickyPaws.png",
    description: "20s slippery-landing penalty disabled.",
    durationMs: 20000
  },
  {
    key: "steadyPaw",
    title: "Steady Paw",
    cost: 300,
    img: "Art/Items/SteadyPaw.png",
    description: "10s random early direction flips disabled.",
    durationMs: 10000
  },
  {
    key: "catString",
    title: "Cat String",
    cost: 200,
    img: "Art/Items/CatString.png",
    description: "10s temporary tower center guide line.",
    durationMs: 10000
  }
];
const BUFF_MAX_OWNED = 99;
const SHOP_CATEGORIES = ["platforms", "borders", "buffs"];
const AUDIO_ICON_ON = "Art/Icons/volume-on.svg";
const AUDIO_ICON_OFF = "Art/Icons/volume-off.svg";
const AUDIO_PATHS = {
  ambience: "Art/Audio/ambience.wav",
  rain: "Art/Audio/rain.wav",
  click: "Art/Audio/click.wav",
  drop: "Art/Audio/drop.wav",
  unlock: "Art/Audio/unlock.wav",
  lightning: "Art/Audio/lightning.wav"
};
const DEFAULT_PLATFORM_KEY = "default";
const DEFAULT_BORDER_KEY = "none";
const INITIAL_RECORD = 0;
const CAT_WIDTH = 160;
const CAT_HEIGHT = 80;
const MAX_HEARTS = 5;
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
const LIGHTNING_SHOCK_STRENGTH = 2.8;
const LIGHTNING_FLASH_DECAY = 0.0042;
const RAIN_DROPS = 160;
const RAIN_SPAWN_RATE = 0.008;
const WIND_UI_KPH_SCALE = 1;
const CHECKPOINT_FINAL_LEVEL = 13;
const CHECKPOINT_FINAL_INDEX = CHECKPOINT_FINAL_LEVEL - 1;

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
    previewDirectionChangeChance: 0,
    previewDirectionCooldown: 0,
    dropDrift: 0,
    previewJitter: 0.02,
    dropRandomness: { amplitude: 0, interval: 0, variance: 0, inertia: 0 }
  },
  {
    name: "Dusky Bloom",
    gradient: ["#fff5e1", "#ffd6b3"],
    previewSpeed: 9.7,
    previewDirectionChangeChance: 0.006,
    previewDirectionCooldown: 150,
    dropDrift: 0.26,
    previewJitter: 0.05,
    dropRandomness: { amplitude: 0.18, interval: 68, variance: 36, inertia: 0.24 }
  },
  {
    name: "Nightfall Rain",
    gradient: ["#030513", "#0f122f"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.02,
    previewDirectionCooldown: 120,
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
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.78,
    previewJitter: 0.16,
    dropRandomness: { amplitude: 0.64, interval: 48, variance: 24, inertia: 0.36 }
  },
  {
    name: "Sunset Haze",
    gradient: ["#ffbb77", "#ff6c40"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.92,
    previewJitter: 0.2,
    dropRandomness: { amplitude: 0.78, interval: 44, variance: 20, inertia: 0.38 }
  },
  {
    name: "Electric Tangle",
    gradient: ["#050215", "#1c1b3a"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 1.08,
    previewJitter: 0.24,
    dropRandomness: { amplitude: 0.95, interval: 40, variance: 18, inertia: 0.4 }
  },
  {
    name: "Eclipse Apex",
    gradient: ["#04020f", "#1a1236"],
    previewSpeed: 10.3,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 1.22,
    previewJitter: 0.28,
    dropRandomness: { amplitude: 1.1, interval: 36, variance: 16, inertia: 0.42 }
  },
  {
    name: "Clearwind Day",
    gradient: ["#c8f1ff", "#fff3c8"],
    previewSpeed: 10.5,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.7,
    previewJitter: 0.06,
    dropRandomness: { amplitude: 0.4, interval: 44, variance: 22, inertia: 0.34 }
  },
  {
    name: "Swaying Fields",
    gradient: ["#b8ffd6", "#ffe9b3"],
    previewSpeed: 10.7,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.82,
    previewJitter: 0.08,
    dropRandomness: { amplitude: 0.5, interval: 42, variance: 20, inertia: 0.34 }
  },
  {
    name: "Haze Sprint",
    gradient: ["#b6d7ff", "#f6d0ff"],
    previewSpeed: 10.9,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.95,
    previewJitter: 0.12,
    dropRandomness: { amplitude: 0.62, interval: 40, variance: 18, inertia: 0.36 }
  },
  {
    name: "Stormwork",
    gradient: ["#101032", "#2b1a4a"],
    previewSpeed: 11.1,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 1.1,
    previewJitter: 0.14,
    dropRandomness: { amplitude: 0.8, interval: 38, variance: 16, inertia: 0.38 }
  },
  {
    name: "Countdown Crown",
    gradient: ["#ffe6d0", "#ffd0e6"],
    previewSpeed: 11.0,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.9,
    previewJitter: 0.1,
    dropRandomness: { amplitude: 0.6, interval: 40, variance: 18, inertia: 0.36 }
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
  },
  9: {
    rain: false,
    lightning: null,
    slipThreshold: DEFAULT_MISS_OFFSET_RATIO,
    fog: null,
    skull: false,
    wind: { maxKph: 16, changeMs: [2600, 4200], push: 0.002 }
  },
  10: {
    rain: false,
    lightning: null,
    slipThreshold: DEFAULT_MISS_OFFSET_RATIO,
    fog: null,
    skull: false,
    wind: { maxKph: 22, changeMs: [2000, 3400], push: 0.0022 },
    sway: { strength: 0.22 }
  },
  11: {
    rain: false,
    lightning: null,
    slipThreshold: DEFAULT_MISS_OFFSET_RATIO,
    fog: { intervalRange: [15000, 22000], peakOpacity: 0.7, baseOpacity: 0.2, denseDuration: 2200 },
    skull: false,
    wind: { maxKph: 24, changeMs: [1800, 3200], push: 0.0024 },
    sway: { strength: 0.26 },
    fastPreview: { chance: 0.22, durationMs: 1600, speedMultiplier: 1.65 }
  },
  12: {
    rain: true,
    lightning: { minInterval: 3600, maxInterval: 5200, bolts: 4 },
    slipThreshold: 0.24,
    fog: null,
    skull: true,
    wind: { maxKph: 26, changeMs: [1600, 3000], push: 0.0026 },
    sway: { strength: 0.3 },
    fastPreview: { chance: 0.26, durationMs: 1600, speedMultiplier: 1.8 }
  },
  13: {
    rain: false,
    lightning: null,
    slipThreshold: DEFAULT_MISS_OFFSET_RATIO,
    fog: null,
    skull: false,
    wind: null,
    sway: null,
    fastPreview: null,
    dropTimer: { seconds: 3 }
  }
};
const SKULL_ICON_PATH = "Art/Icons/skull.svg";
const SKULL_WARNING_TEXT = "Cats may be slippery";

function getLevelConfig(levelIndex = state.currentLevel) {
  if (levelIndex < 0) return LEVELS[0];
  if (levelIndex < LEVELS.length) return LEVELS[levelIndex];
  return getEndlessLevelConfig(levelIndex);
}

function getLevelNumber() {
  return state.currentLevel + 1;
}

const endlessLevelConfigs = new Map();
const endlessLevelEffects = new Map();

function getEndlessLevelConfig(levelIndex) {
  const existing = endlessLevelConfigs.get(levelIndex);
  if (existing) return existing;
  // Gentle escalation; keep within the feel of late-game.
  const t = Math.max(0, levelIndex - (LEVELS.length - 1));
  const speed = 11.0 + Math.min(1.4, t * 0.06);
  const config = {
    name: `Survival ${levelIndex + 1}`,
    gradient: pickEndlessGradient(levelIndex),
    previewSpeed: speed,
    previewDirectionChangeChance: 0.038,
    previewDirectionCooldown: 90,
    dropDrift: 0.9 + Math.min(0.8, t * 0.03),
    previewJitter: 0.14,
    dropRandomness: { amplitude: 0.9, interval: 36, variance: 16, inertia: 0.4 }
  };
  endlessLevelConfigs.set(levelIndex, config);
  return config;
}

function pickEndlessGradient(levelIndex) {
  const palettes = [
    ["#0b0b2a", "#2c1a55"],
    ["#ffe3c7", "#ffd0e6"],
    ["#c8f1ff", "#fff3c8"],
    ["#101032", "#2b1a4a"],
    ["#b6d7ff", "#f6d0ff"]
  ];
  return palettes[levelIndex % palettes.length];
}

function getLevelEffect(levelNumber) {
  if (levelNumber <= 13) return LEVEL_EFFECTS[levelNumber] || {};
  if (state.gameMode !== "survival") return {};
  return getEndlessLevelEffect(levelNumber);
}

function getEndlessLevelEffect(levelNumber) {
  const existing = endlessLevelEffects.get(levelNumber);
  if (existing) return existing;
  const effect = makeRandomEndlessEffect(levelNumber);
  endlessLevelEffects.set(levelNumber, effect);
  return effect;
}

function makeRandomEndlessEffect(levelNumber) {
  // Level 14+ Survival: random combinations of all mutators.
  const roll = (p) => Math.random() < p;
  const effect = {};

  if (roll(0.55)) {
    effect.rain = true;
  }
  if (roll(0.48)) {
    effect.fog = { intervalRange: [12000, 19000], peakOpacity: 0.82, baseOpacity: 0.22, denseDuration: 2400 };
  }
  if (roll(0.52)) {
    effect.lightning = { minInterval: 3200, maxInterval: 5200, bolts: 4 };
  }
  if (roll(0.5)) {
    effect.slipThreshold = 0.24;
    effect.skull = true;
  } else {
    effect.slipThreshold = DEFAULT_MISS_OFFSET_RATIO;
    effect.skull = false;
  }
  if (roll(0.62)) {
    effect.wind = { maxKph: 28, changeMs: [1400, 2800], push: 0.0028 };
  }
  if (effect.wind && roll(0.7)) {
    effect.sway = { strength: 0.32 };
  }
  if (roll(0.45)) {
    effect.fastPreview = { chance: 0.28, durationMs: 1600, speedMultiplier: 1.85 };
  }
  if (roll(0.4)) {
    effect.dropTimer = { seconds: 3 };
  }

  // If we rolled lightning, lean stormy.
  if (effect.lightning && effect.rain) {
    effect.rain = true;
  }

  return effect;
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
  hearts: MAX_HEARTS,
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
  levelStartRunPoints: 0,
  levelStartBonusPoints: 0,
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
  skullWarningVisible: false,
  wind: 0,
  windTarget: 0,
  windTimer: 0,
  windChangeInterval: 0,
  sway: 0,
  swayVelocity: 0,
  swayBase: 0,
  dropTimerActive: false,
  dropTimerRemaining: 0,
  activeShopCategory: "platforms",
  runPoints: 0,
  bonusPoints: 0,
  cleanStreak: 0,
  perfectChain: 0,
  stableWobbleStreak: 0,
  activeBuffs: {},
  maxHeartsThisLevel: MAX_HEARTS,
  nineLivesSaveAvailable: false,
  supportCatsVisual: 0,
  supportCatsVisualTimer: 0,
  pointsAwardedThisRun: false
};

let bestSurvivalScore = 0;
let bestCheckpointScore = 0;
let shopPoints = 0;
const purchasedPlatforms = new Set();
const purchasedBorders = new Set();
const buffInventory = Object.fromEntries(BUFF_ITEMS.map((item) => [item.key, 0]));
const buffBuyQuantities = Object.fromEntries(BUFF_ITEMS.map((item) => [item.key, 1]));
let equippedPlatformKey = DEFAULT_PLATFORM_KEY;
let equippedBorderKey = DEFAULT_BORDER_KEY;
state.topScore = 0;
let authUser = null;
let isAuthReady = false;
let profileSyncTimer = null;
let profileSyncInFlight = false;
let hasLoadedRemoteProfile = false;
let legacyProfileSnapshot = null;
updateTopScoreDisplay();
updateShopPointsDisplay();
updateMenuPlatformPreview();
renderBuffTray();

function apiUrlWithParams(base, params) {
  const url = new URL(base);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function apiFetchJSON(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Request failed (${response.status})`);
  }
  if (response.status === 204) return null;
  return response.json();
}

function setAuthStatus(text = "", warning = false) {
  if (!authStatusLine) return;
  if (!text) {
    authStatusLine.classList.add("hidden");
    authStatusLine.classList.remove("is-warning");
    authStatusLine.textContent = "";
    return;
  }
  authStatusLine.textContent = text;
  authStatusLine.classList.remove("hidden");
  authStatusLine.classList.toggle("is-warning", !!warning);
}

function replaceSet(target, values) {
  target.clear();
  (values || []).forEach((value) => target.add(String(value)));
}

function buildCurrentProfilePayload() {
  return {
    best_survival_score: Math.max(0, Number(bestSurvivalScore) || 0),
    best_checkpoint_score: Math.max(0, Number(bestCheckpointScore) || 0),
    top_score: Math.max(0, Number(state.topScore) || 0),
    shop_points: Math.max(0, Number(shopPoints) || 0),
    purchased_platforms: [...purchasedPlatforms],
    purchased_borders: [...purchasedBorders],
    buff_inventory: { ...buffInventory },
    equipped_platform_key: equippedPlatformKey || DEFAULT_PLATFORM_KEY,
    equipped_border_key: equippedBorderKey || DEFAULT_BORDER_KEY
  };
}

function applyRemoteProfile(profile = {}) {
  bestSurvivalScore = Math.max(0, Number(profile.best_survival_score) || 0);
  bestCheckpointScore = Math.max(0, Number(profile.best_checkpoint_score) || 0);
  state.topScore = Math.max(0, Number(profile.top_score) || 0);
  shopPoints = Math.max(0, Number(profile.shop_points) || 0);
  replaceSet(purchasedPlatforms, profile.purchased_platforms);
  replaceSet(purchasedBorders, profile.purchased_borders);
  BUFF_ITEMS.forEach((item) => {
    const raw = profile.buff_inventory && profile.buff_inventory[item.key];
    buffInventory[item.key] = Number.isFinite(Number(raw))
      ? clamp(Math.floor(Number(raw)), 0, BUFF_MAX_OWNED)
      : 0;
  });
  equippedPlatformKey = canEquipPlatform(profile.equipped_platform_key)
    ? profile.equipped_platform_key || DEFAULT_PLATFORM_KEY
    : DEFAULT_PLATFORM_KEY;
  equippedBorderKey = canEquipBorder(profile.equipped_border_key)
    ? profile.equipped_border_key || DEFAULT_BORDER_KEY
    : DEFAULT_BORDER_KEY;
  updateTopScoreDisplay();
  updateShopPointsDisplay();
  updateMenuPlatformPreview();
  updateMenuBestScores();
  renderBuffTray();
  renderHearts();
}

async function loadLeaderboard(limit = 10) {
  if (!leaderboardList) return;
  try {
    const payload = await apiFetchJSON(apiUrlWithParams(CATSTACKER_LEADERBOARD_ENDPOINT, { limit }));
    const rows = Array.isArray(payload?.rows) ? payload.rows : [];
    leaderboardList.innerHTML = "";
    if (!rows.length) {
      const li = document.createElement("li");
      li.className = "leaderboard-empty";
      li.textContent = "No runs yet.";
      leaderboardList.appendChild(li);
      return;
    }
    rows.forEach((row) => {
      const li = document.createElement("li");
      li.className = "leaderboard-row";
      const name = row.username_snapshot || "Player";
      const score = Number(row.score) || 0;
      const level = Number(row.level) || 1;
      const cats = Number(row.cats_stacked_total) || 0;
      li.textContent = `${name} - ${score} pts - L${level} - ${cats} cats`;
      leaderboardList.appendChild(li);
    });
  } catch (error) {
    leaderboardList.innerHTML = "";
    const li = document.createElement("li");
    li.className = "leaderboard-empty";
    li.textContent = "Leaderboard unavailable.";
    leaderboardList.appendChild(li);
  }
}

function scheduleProfileSync() {
  if (!isAuthReady || !authUser || !hasLoadedRemoteProfile) return;
  if (profileSyncTimer) clearTimeout(profileSyncTimer);
  profileSyncTimer = window.setTimeout(() => {
    syncProfileNow().catch(() => {});
  }, 350);
}

async function syncProfileNow() {
  if (!isAuthReady || !authUser || profileSyncInFlight) return;
  profileSyncInFlight = true;
  try {
    await apiFetchJSON(CATSTACKER_PROFILE_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify({
        profile: buildCurrentProfilePayload(),
        username_snapshot: authUser.username || null
      })
    });
  } finally {
    profileSyncInFlight = false;
  }
}

async function submitSurvivalRunIfEligible(score, level, catsStackedTotal) {
  if (!isAuthReady || !authUser) return;
  if (state.gameMode !== "survival") return;
  if (!Number.isFinite(score) || score <= 0) return;
  try {
    await apiFetchJSON(CATSTACKER_RUNS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        score: Math.max(0, Math.floor(score)),
        level: Math.max(1, Math.floor(level)),
        cats_stacked_total: Math.max(0, Math.floor(catsStackedTotal))
      })
    });
    await loadLeaderboard(10);
  } catch (error) {
    // Non-fatal: gameplay should not break if run submission fails.
  }
}

async function initializeAuthenticatedProfile() {
  const payload = await apiFetchJSON(CATSTACKER_PROFILE_ENDPOINT);
  const profile = payload?.profile || {};
  const exists = !!payload?.exists;
  if (!exists && legacyProfileSnapshot?.has_data) {
    applyRemoteProfile(legacyProfileSnapshot.profile);
    await syncProfileNow();
  } else {
    applyRemoteProfile(profile);
  }
  hasLoadedRemoteProfile = true;
}

async function bootstrapAuthAndGame() {
  legacyProfileSnapshot = readLegacyProfileFromLocalStorage();
  setAuthStatus("Checking account sync...");
  try {
    const me = await apiFetchJSON(AUTH_ME_ENDPOINT);
    authUser = me?.user || me;
    if (!authUser?.user_id && !authUser?.id) {
      throw new Error("Invalid user payload from auth service.");
    }
    isAuthReady = true;
    await initializeAuthenticatedProfile();
    setAuthStatus("");
    await loadLeaderboard(10);
  } catch (error) {
    isAuthReady = false;
    authUser = null;
    hasLoadedRemoteProfile = false;
    setAuthStatus("You are not logged in right now. Progress sync is unavailable.", true);
    loadLeaderboard(10);
  }
  await loadAssets();
}
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
  if (key === BEST_SURVIVAL_KEY) {
    bestSurvivalScore = Math.max(0, Number(value) || 0);
  } else if (key === BEST_CHECKPOINT_KEY) {
    bestCheckpointScore = Math.max(0, Number(value) || 0);
  }
  scheduleProfileSync();
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
  scheduleProfileSync();
}

function loadBuffInventory() {
  const defaults = Object.fromEntries(BUFF_ITEMS.map((item) => [item.key, 0]));
  try {
    const raw = window.localStorage.getItem(SHOP_BUFFS_KEY);
    const parsed = JSON.parse(raw || "{}");
    if (!parsed || typeof parsed !== "object") {
      return { ...defaults };
    }
    BUFF_ITEMS.forEach((item) => {
      const value = Number(parsed[item.key]);
      defaults[item.key] = Number.isFinite(value)
        ? clamp(Math.floor(value), 0, BUFF_MAX_OWNED)
        : 0;
    });
    return defaults;
  } catch (error) {
    return { ...defaults };
  }
}

function saveBuffInventory() {
  scheduleProfileSync();
}

function loadEquippedPlatform() {
  try {
    const raw = window.localStorage.getItem(EQUIPPED_PLATFORM_KEY);
    if (!raw) return DEFAULT_PLATFORM_KEY;
    return String(raw);
  } catch (error) {
    // ignore
  }
  return DEFAULT_PLATFORM_KEY;
}

function saveEquippedPlatform() {
  scheduleProfileSync();
}

function loadEquippedBorder() {
  try {
    const raw = window.localStorage.getItem(EQUIPPED_BORDER_KEY);
    if (!raw) return DEFAULT_BORDER_KEY;
    return String(raw);
  } catch (error) {
    // ignore
  }
  return DEFAULT_BORDER_KEY;
}

function saveEquippedBorder() {
  scheduleProfileSync();
}
function updateShopPointsDisplay() {
  if (shopPointsValue) {
    shopPointsValue.textContent = shopPoints.toString();
  }
  if (shopPanelPoints) {
    shopPanelPoints.textContent = shopPoints.toString();
  }
}

function canEquipPlatform(key) {
  if (!key || key === DEFAULT_PLATFORM_KEY) return true;
  return purchasedPlatforms.has(key);
}

function getEquippedPlatformItem() {
  if (!equippedPlatformKey || equippedPlatformKey === DEFAULT_PLATFORM_KEY) return null;
  return SHOP_ITEMS.find((item) => item.key === equippedPlatformKey) || null;
}

function canEquipBorder(key) {
  if (!key || key === DEFAULT_BORDER_KEY) return true;
  return purchasedBorders.has(key);
}

function getEquippedBorderItem() {
  if (!equippedBorderKey || equippedBorderKey === DEFAULT_BORDER_KEY) return null;
  return BORDER_ITEMS.find((item) => item.key === equippedBorderKey) || null;
}

function updateMenuPlatformPreview() {
  const el = document.getElementById("menu-platform-preview");
  const labelEl = document.getElementById("menu-platform-label");
  if (!el) return;
  const item = getEquippedPlatformItem();
  if (item?.img) {
    el.style.background = "rgba(255,255,255,0.08)";
    el.style.backgroundImage = `url("${item.img}")`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    if (labelEl) labelEl.textContent = item.title;
  } else {
    el.style.backgroundImage = "";
    el.style.background =
      "linear-gradient(180deg, rgba(255, 205, 145, 0.95), rgba(232, 125, 84, 0.95))";
    el.style.backgroundSize = "";
    el.style.backgroundRepeat = "";
    el.style.backgroundPosition = "";
    if (labelEl) labelEl.textContent = "Default Platform";
  }
}

function equipPlatform(key) {
  const desired = key || DEFAULT_PLATFORM_KEY;
  if (!canEquipPlatform(desired)) return;
  equippedPlatformKey = desired;
  saveEquippedPlatform();
  updateMenuPlatformPreview();
}

function equipBorder(key) {
  const desired = key || DEFAULT_BORDER_KEY;
  if (!canEquipBorder(desired)) return;
  equippedBorderKey = desired;
  saveEquippedBorder();
}
function loadPurchasedPlatforms() {
  try {
    const raw = window.localStorage.getItem(SHOP_PURCHASES_KEY);
    const parsed = JSON.parse(raw || "[]");
    if (Array.isArray(parsed)) {
      return new Set(parsed);
    }
  } catch (error) {
    // ignore
  }
  return new Set();
}
function savePurchasedPlatforms() {
  scheduleProfileSync();
}

function loadPurchasedBorders() {
  try {
    const raw = window.localStorage.getItem(SHOP_BORDER_PURCHASES_KEY);
    const parsed = JSON.parse(raw || "[]");
    if (Array.isArray(parsed)) {
      return new Set(parsed);
    }
  } catch (error) {
    // ignore
  }
  return new Set();
}

function savePurchasedBorders() {
  scheduleProfileSync();
}

function loadAudioMuted() {
  try {
    return window.localStorage.getItem(AUDIO_MUTED_KEY) === "1";
  } catch (error) {
    // ignore
  }
  return false;
}

function saveAudioMuted() {
  try {
    window.localStorage.setItem(AUDIO_MUTED_KEY, audioMuted ? "1" : "0");
  } catch (error) {
    // ignore
  }
}

function readLegacyProfileFromLocalStorage() {
  const profile = {
    best_survival_score: loadBestScore(BEST_SURVIVAL_KEY),
    best_checkpoint_score: loadBestScore(BEST_CHECKPOINT_KEY),
    top_score: loadPersonalBest(),
    shop_points: loadShopPoints(),
    purchased_platforms: [...loadPurchasedPlatforms()],
    purchased_borders: [...loadPurchasedBorders()],
    buff_inventory: loadBuffInventory(),
    equipped_platform_key: loadEquippedPlatform(),
    equipped_border_key: loadEquippedBorder()
  };
  const hasData =
    profile.best_survival_score > 0 ||
    profile.best_checkpoint_score > 0 ||
    profile.top_score > 0 ||
    profile.shop_points > 0 ||
    profile.purchased_platforms.length > 0 ||
    profile.purchased_borders.length > 0 ||
    Object.values(profile.buff_inventory).some((v) => Number(v) > 0) ||
    profile.equipped_platform_key !== DEFAULT_PLATFORM_KEY ||
    profile.equipped_border_key !== DEFAULT_BORDER_KEY;
  return { has_data: hasData, profile };
}

let audioMuted = loadAudioMuted();
updateAudioToggleUI();

function updateAudioToggleUI() {
  if (!audioToggleButton || !audioToggleIcon) return;
  audioToggleButton.classList.toggle("is-muted", audioMuted);
  audioToggleButton.setAttribute("aria-pressed", audioMuted ? "true" : "false");
  audioToggleIcon.src = audioMuted ? AUDIO_ICON_OFF : AUDIO_ICON_ON;
}

const audioManager = (() => {
  let unlocked = false;
  const SFX_MASTER_VOLUME = 0.25;

  function playOneShot(path, volume) {
    if (!unlocked || audioMuted) return;
    const clip = new Audio(path);
    clip.volume = volume * SFX_MASTER_VOLUME;
    clip.play().catch(() => {});
  }

  function unlockAudio() {
    if (unlocked) return;
    unlocked = true;
  }

  function setMuted(muted) {
    audioMuted = muted;
    saveAudioMuted();
    updateAudioToggleUI();
  }

  function onLevelChange() {}

  return {
    unlockAudio,
    setMuted,
    onLevelChange,
    click() {
      playOneShot(AUDIO_PATHS.click, 0.2);
    },
    drop() {
      playOneShot(AUDIO_PATHS.drop, 0.22);
    },
    unlock() {
      playOneShot(AUDIO_PATHS.unlock, 0.28);
    },
    lightning() {
      playOneShot(AUDIO_PATHS.lightning, 0.3);
    }
  };
})();

function closeShopPopup() {
  if (shopPopup) {
    shopPopup.classList.add("hidden");
  }
}

function openShopPopup(item) {
  if (!shopPopup || !shopPopupImage || !shopPopupText) return;
  shopPopupImage.src = item.img;
  const isBuff = BUFF_ITEMS.some((buff) => buff.key === item.key);
  const isPlatform = SHOP_ITEMS.some((platform) => platform.key === item.key);
  const isBorder = BORDER_ITEMS.some((border) => border.key === item.key);
  shopPopupText.textContent = isBuff ? `${item.title} added` : `${item.title} unlocked`;
  shopPopup.classList.remove("hidden");
  audioManager.unlockAudio();
  audioManager.unlock();

  if (isPlatform) {
    // Convenience: newly purchased platforms become the equipped platform immediately.
    equipPlatform(item.key);
  } else if (isBorder) {
    equipBorder(item.key);
  }
  renderShopGrid();
  renderBuffTray();
}

function getBuffItem(key) {
  return BUFF_ITEMS.find((item) => item.key === key) || null;
}

function getBuffCount(key) {
  return clamp(Math.floor(buffInventory[key] || 0), 0, BUFF_MAX_OWNED);
}

function setBuffCount(key, value) {
  buffInventory[key] = clamp(Math.floor(value), 0, BUFF_MAX_OWNED);
}

function setActiveShopCategory(category) {
  const nextCategory = SHOP_CATEGORIES.includes(category) ? category : "platforms";
  state.activeShopCategory = nextCategory;
  if (shopCategories) {
    const buttons = shopCategories.querySelectorAll(".shop-category");
    buttons.forEach((button) => {
      const active = button.dataset.category === nextCategory;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }
  renderShopGrid();
}

function renderPlatformCards() {
  const defaultCard = document.createElement("div");
  defaultCard.className = "shop-card is-purchased";

  const defaultPreview = document.createElement("div");
  defaultPreview.className = "shop-card-default-preview";

  const defaultOverlay = document.createElement("div");
  defaultOverlay.className = "shop-card-overlay";
  const defaultCheck = document.createElement("div");
  defaultCheck.className = "shop-card-check";
  defaultCheck.textContent = "✓";
  defaultOverlay.appendChild(defaultCheck);

  const defaultName = document.createElement("div");
  defaultName.className = "shop-card-name";
  defaultName.textContent = "Default Platform";

  const defaultButton = document.createElement("button");
  defaultButton.type = "button";
  const defaultEquipped = equippedPlatformKey === DEFAULT_PLATFORM_KEY;
  if (defaultEquipped) {
    defaultCard.classList.add("is-equipped");
    defaultCheck.textContent = "Equipped";
    defaultButton.disabled = true;
    defaultButton.textContent = "Equipped";
  } else {
    defaultButton.textContent = "Equip";
    defaultButton.addEventListener("click", () => {
      equipPlatform(DEFAULT_PLATFORM_KEY);
      renderShopGrid();
    });
  }

  defaultCard.appendChild(defaultPreview);
  defaultCard.appendChild(defaultOverlay);
  defaultCard.appendChild(defaultName);
  defaultCard.appendChild(defaultButton);
  shopGrid.appendChild(defaultCard);

  SHOP_ITEMS.forEach((item) => {
    const card = document.createElement("div");
    card.className = "shop-card";

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;

    const overlayEl = document.createElement("div");
    overlayEl.className = "shop-card-overlay";
    const check = document.createElement("div");
    check.className = "shop-card-check";
    check.textContent = "✓";
    overlayEl.appendChild(check);

    const name = document.createElement("div");
    name.className = "shop-card-name";
    name.textContent = item.title;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.shopItem = item.key;

    const isPurchased = purchasedPlatforms.has(item.key);
    const isEquipped = equippedPlatformKey === item.key;
    if (isPurchased) {
      card.classList.add("is-purchased");
      if (isEquipped) {
        card.classList.add("is-equipped");
        check.textContent = "Equipped";
      }
      button.disabled = true;
      button.textContent = "Purchased";
      card.addEventListener("dblclick", () => {
        equipPlatform(item.key);
        renderShopGrid();
      });
    } else {
      const canAfford = shopPoints >= item.cost;
      button.disabled = !canAfford;
      button.textContent = canAfford ? `Buy ${item.cost}` : `Need ${item.cost}`;
      button.addEventListener("click", () => {
        if (purchasedPlatforms.has(item.key)) return;
        if (shopPoints < item.cost) return;
        shopPoints -= item.cost;
        purchasedPlatforms.add(item.key);
        saveShopPoints();
        savePurchasedPlatforms();
        updateShopPointsDisplay();
        renderShopGrid();
        openShopPopup(item);
      });
    }

    card.appendChild(img);
    card.appendChild(overlayEl);
    card.appendChild(name);
    card.appendChild(button);
    shopGrid.appendChild(card);
  });
}

function renderBorderCards() {
  const noneCard = document.createElement("div");
  noneCard.className = "shop-card is-purchased";

  const nonePreview = document.createElement("div");
  nonePreview.className = "shop-card-none-preview";
  nonePreview.textContent = "No Frame";

  const noneOverlay = document.createElement("div");
  noneOverlay.className = "shop-card-overlay";
  const noneCheck = document.createElement("div");
  noneCheck.className = "shop-card-check";
  noneCheck.textContent = "✓";
  noneOverlay.appendChild(noneCheck);

  const noneName = document.createElement("div");
  noneName.className = "shop-card-name";
  noneName.textContent = "No Frame";

  const noneButton = document.createElement("button");
  noneButton.type = "button";
  const noneEquipped = equippedBorderKey === DEFAULT_BORDER_KEY;
  if (noneEquipped) {
    noneCard.classList.add("is-equipped");
    noneCheck.textContent = "Equipped";
    noneButton.disabled = true;
    noneButton.textContent = "Equipped";
  } else {
    noneButton.textContent = "Equip";
    noneButton.addEventListener("click", () => {
      equipBorder(DEFAULT_BORDER_KEY);
      renderShopGrid();
    });
  }

  noneCard.appendChild(nonePreview);
  noneCard.appendChild(noneOverlay);
  noneCard.appendChild(noneName);
  noneCard.appendChild(noneButton);
  shopGrid.appendChild(noneCard);

  BORDER_ITEMS.forEach((item) => {
    const card = document.createElement("div");
    card.className = "shop-card";

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;

    const overlayEl = document.createElement("div");
    overlayEl.className = "shop-card-overlay";
    const check = document.createElement("div");
    check.className = "shop-card-check";
    check.textContent = "✓";
    overlayEl.appendChild(check);

    const name = document.createElement("div");
    name.className = "shop-card-name";
    name.textContent = item.title;

    const button = document.createElement("button");
    button.type = "button";

    const isPurchased = purchasedBorders.has(item.key);
    const isEquipped = equippedBorderKey === item.key;
    if (isPurchased) {
      card.classList.add("is-purchased");
      if (isEquipped) {
        card.classList.add("is-equipped");
        check.textContent = "Equipped";
        button.disabled = true;
        button.textContent = "Equipped";
      } else {
        button.textContent = "Equip";
        button.addEventListener("click", () => {
          equipBorder(item.key);
          renderShopGrid();
        });
      }
    } else {
      const canAfford = shopPoints >= item.cost;
      button.disabled = !canAfford;
      button.textContent = canAfford ? `Buy ${item.cost}` : `Need ${item.cost}`;
      button.addEventListener("click", () => {
        if (purchasedBorders.has(item.key)) return;
        if (shopPoints < item.cost) return;
        shopPoints -= item.cost;
        purchasedBorders.add(item.key);
        saveShopPoints();
        savePurchasedBorders();
        updateShopPointsDisplay();
        renderShopGrid();
        openShopPopup(item);
      });
    }

    card.appendChild(img);
    card.appendChild(overlayEl);
    card.appendChild(name);
    card.appendChild(button);
    shopGrid.appendChild(card);
  });
}

function renderBuffCards() {
  BUFF_ITEMS.forEach((item) => {
    const card = document.createElement("div");
    card.className = "shop-card buff-card";

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;

    const name = document.createElement("div");
    name.className = "shop-card-name";
    name.textContent = item.title;

    const description = document.createElement("p");
    description.className = "shop-card-description";
    description.textContent = item.description;

    const controls = document.createElement("div");
    controls.className = "buff-qty-controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "buff-qty-btn";
    minus.textContent = "−";

    const qtyValue = document.createElement("span");
    qtyValue.className = "buff-qty-value";

    const plus = document.createElement("button");
    plus.type = "button";
    plus.className = "buff-qty-btn";
    plus.textContent = "+";

    controls.appendChild(minus);
    controls.appendChild(qtyValue);
    controls.appendChild(plus);

    const ownedBadge = document.createElement("div");
    ownedBadge.className = "buff-owned";

    const buyButton = document.createElement("button");
    buyButton.type = "button";

    const owned = getBuffCount(item.key);
    const remainingCap = Math.max(0, BUFF_MAX_OWNED - owned);
    const maxAffordable = Math.floor(shopPoints / item.cost);
    const maxBuy = Math.min(remainingCap, maxAffordable);
    const currentQty = clamp(buffBuyQuantities[item.key] || 1, 1, Math.max(1, remainingCap));
    buffBuyQuantities[item.key] = currentQty;
    qtyValue.textContent = String(currentQty);
    ownedBadge.textContent = `Owned: ${owned}`;

    const atMax = owned >= BUFF_MAX_OWNED;
    minus.disabled = currentQty <= 1 || atMax;
    plus.disabled = currentQty >= Math.max(1, remainingCap) || atMax;
    minus.addEventListener("click", () => {
      buffBuyQuantities[item.key] = Math.max(1, (buffBuyQuantities[item.key] || 1) - 1);
      renderShopGrid();
    });
    plus.addEventListener("click", () => {
      buffBuyQuantities[item.key] = Math.min(Math.max(1, remainingCap), (buffBuyQuantities[item.key] || 1) + 1);
      renderShopGrid();
    });

    if (atMax) {
      buyButton.disabled = true;
      buyButton.textContent = "Max Owned";
    } else {
      const qty = buffBuyQuantities[item.key] || 1;
      const totalCost = qty * item.cost;
      const canAfford = maxBuy >= qty && totalCost <= shopPoints;
      buyButton.disabled = !canAfford;
      buyButton.textContent = canAfford ? `Buy ${qty} (${totalCost})` : `Need ${totalCost}`;
      buyButton.addEventListener("click", () => {
        const quantity = clamp(Math.floor(buffBuyQuantities[item.key] || 1), 1, BUFF_MAX_OWNED);
        const currentOwned = getBuffCount(item.key);
        const cap = Math.max(0, BUFF_MAX_OWNED - currentOwned);
        if (cap <= 0) return;
        const buyQty = Math.min(quantity, cap);
        const cost = buyQty * item.cost;
        if (shopPoints < cost) return;
        shopPoints -= cost;
        setBuffCount(item.key, currentOwned + buyQty);
        saveShopPoints();
        saveBuffInventory();
        updateShopPointsDisplay();
        renderShopGrid();
        renderBuffTray();
        openShopPopup(item);
      });
    }

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(controls);
    card.appendChild(ownedBadge);
    card.appendChild(buyButton);
    shopGrid.appendChild(card);
  });
}

function renderShopGrid() {
  if (!shopGrid) return;
  shopGrid.innerHTML = "";
  if (state.activeShopCategory === "borders") {
    if (!BORDER_ITEMS.length) {
      const empty = document.createElement("div");
      empty.className = "shop-grid-empty";
      empty.textContent = "No new border items in the shop right now. Come back later.";
      shopGrid.appendChild(empty);
      return;
    }
    renderBorderCards();
    return;
  }
  if (state.activeShopCategory === "buffs") {
    if (!BUFF_ITEMS.length) {
      const empty = document.createElement("div");
      empty.className = "shop-grid-empty";
      empty.textContent = "No new buff items in the shop right now. Come back later.";
      shopGrid.appendChild(empty);
      return;
    }
    renderBuffCards();
    return;
  }
  if (!SHOP_ITEMS.length) {
    const empty = document.createElement("div");
    empty.className = "shop-grid-empty";
    empty.textContent = "No new items in the shop right now. Come back later.";
    shopGrid.appendChild(empty);
    return;
  }
  renderPlatformCards();
}

function isBuffActive(key) {
  return !!state.activeBuffs[key];
}

function activateTimedBuff(key, durationMs) {
  state.activeBuffs[key] = {
    startedAt: performance.now(),
    expiresAt: performance.now() + Math.max(0, durationMs || 0)
  };
}

function clearActiveBuffs() {
  state.activeBuffs = {};
  state.nineLivesSaveAvailable = false;
  state.maxHeartsThisLevel = MAX_HEARTS;
  state.supportCatsVisual = 0;
  state.supportCatsVisualTimer = 0;
}

function renderBuffTray() {
  if (!buffTray) return;
  buffTray.innerHTML = "";
  BUFF_ITEMS.forEach((item) => {
    const count = getBuffCount(item.key);
    if (count <= 0) return;
    const entry = document.createElement("button");
    entry.type = "button";
    entry.className = "buff-chip";
    entry.dataset.buff = item.key;

    const iconWrap = document.createElement("span");
    iconWrap.className = "buff-chip-icon-wrap";

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;
    img.className = "buff-chip-icon";

    const countBadge = document.createElement("span");
    countBadge.className = "buff-chip-count";
    countBadge.textContent = String(count);

    const name = document.createElement("span");
    name.className = "buff-chip-name";
    name.textContent = item.title;

    iconWrap.appendChild(img);
    iconWrap.appendChild(countBadge);
    entry.appendChild(iconWrap);
    entry.appendChild(name);
    entry.classList.toggle("is-active", isBuffActive(item.key));
    entry.addEventListener("click", () => useBuff(item.key));
    buffTray.appendChild(entry);
  });
}

function consumeBuff(key) {
  const count = getBuffCount(key);
  if (count <= 0) return false;
  setBuffCount(key, count - 1);
  saveBuffInventory();
  return true;
}

function useBuff(key) {
  if (state.mode !== "running" || state.paused) return;
  const item = getBuffItem(key);
  if (!item) return;
  if (key !== "catLife" && isBuffActive(key)) return;
  if (!consumeBuff(key)) return;

  audioManager.unlockAudio();
  audioManager.click();
  const now = performance.now();

  if (key === "catLife") {
    const maxHearts = Math.max(MAX_HEARTS, state.maxHeartsThisLevel);
    if (state.hearts >= maxHearts) {
      state.maxHeartsThisLevel = maxHearts + 1;
    }
    state.hearts = Math.min(state.maxHeartsThisLevel, state.hearts + 1);
    triggerBonusBurst("+1 Life");
  } else if (key === "nineLives") {
    state.maxHeartsThisLevel = Math.max(state.maxHeartsThisLevel, 9);
    state.hearts = Math.max(state.hearts, 9);
    state.nineLivesSaveAvailable = true;
    state.activeBuffs[key] = { startedAt: now, expiresAt: Infinity };
    triggerBonusBurst("9 Lives Ready");
  } else if (item.durationMs && item.durationMs > 0) {
    activateTimedBuff(key, item.durationMs);
    triggerBonusBurst(`${item.title} Active`);
  }

  renderHearts();
  renderBuffTray();
}

function updateActiveBuffs(now = performance.now()) {
  let changed = false;
  Object.entries(state.activeBuffs).forEach(([key, data]) => {
    if (!data || !Number.isFinite(data.expiresAt)) return;
    if (now >= data.expiresAt) {
      delete state.activeBuffs[key];
      changed = true;
    }
  });
  if (changed) {
    renderBuffTray();
  }
}

function getFogOpacityModifier() {
  return isBuffActive("fogLens") ? 0.03 : 1;
}

function getSlipThreshold() {
  if (isBuffActive("stickyPaws")) {
    return DEFAULT_MISS_OFFSET_RATIO;
  }
  return state.missOffsetRatio || DEFAULT_MISS_OFFSET_RATIO;
}

function shouldDisableRandomDirectionChanges() {
  return isBuffActive("steadyPaw");
}

function pointsPerCat() {
  // Level 1 => 1 point per cat, Level 2 => 2, etc.
  return Math.max(1, getLevelNumber());
}

function getModePointFactor() {
  // Checkpoint awards half as many accumulated points as Survival.
  return state.gameMode === "checkpoint" ? 0.5 : 1;
}

function awardRunPoints(basePoints) {
  const scaled = Math.max(0, Math.round(basePoints * getModePointFactor()));
  if (scaled <= 0) return 0;
  state.runPoints += scaled;
  return scaled;
}

function awardBonusPoints(basePoints, label = "Bonus") {
  const scaled = Math.max(0, Math.round(basePoints * getModePointFactor()));
  if (scaled <= 0) return 0;
  state.bonusPoints += scaled;
  triggerBonusBurst(`+${scaled} ${label}`);
  return scaled;
}

function addShopPoints(amount) {
  const points = Math.max(0, Math.floor(amount));
  if (points <= 0) return;
  shopPoints += points;
  saveShopPoints();
  updateShopPointsDisplay();
}

function triggerBonusBurst(text) {
  if (!bonusBurst) return;
  bonusBurst.textContent = text;
  bonusBurst.classList.remove("hidden", "animate");
  // Restart animation each trigger.
  void bonusBurst.offsetWidth;
  bonusBurst.classList.add("animate");
  setTimeout(() => {
    bonusBurst.classList.add("hidden");
  }, 740);
  audioManager.unlock();
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
  document.body.classList.remove("shop-open");
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
  state.levelStartRunPoints = 0;
  state.levelStartBonusPoints = 0;
  state.runPoints = 0;
  state.bonusPoints = 0;
  state.cleanStreak = 0;
  state.perfectChain = 0;
  state.stableWobbleStreak = 0;
  clearActiveBuffs();
  state.pointsAwardedThisRun = false;
  renderBuffTray();
  updateMenuBestScores();
  updateTopScoreDisplay();
  loadLeaderboard(10);
  audioManager.onLevelChange(null);
  document.body.classList.remove("game-running");
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
  state.levelStartRunPoints = 0;
  state.levelStartBonusPoints = 0;
  state.runPoints = 0;
  state.bonusPoints = 0;
  state.cleanStreak = 0;
  state.perfectChain = 0;
  state.stableWobbleStreak = 0;
  state.pointsAwardedThisRun = false;
  updateTopScoreDisplay();
  hideMainMenu();
  document.body.classList.add("game-running");
  state.paused = false;
  audioManager.unlockAudio();
  startGame();
}
function showShopPanel() {
  hideMainMenu();
  closeShopPopup();
  if (shopPanel) {
    shopPanel.classList.remove("hidden");
  }
  document.body.classList.add("shop-open");
  document.body.classList.remove("game-running");
  updateShopPointsDisplay();
  setActiveShopCategory(state.activeShopCategory || "platforms");
  audioManager.unlockAudio();
}
function closeShopPanel() {
  closeShopPopup();
  hideShopPanelOnly();
  const menu = resolveMainMenu();
  if (menu) {
    menu.classList.remove("hidden");
    updateMenuBestScores();
    updateTopScoreDisplay();
    updateShopPointsDisplay();
  }
  document.body.classList.remove("game-running");
}
function restartCheckpointLevel() {
  overlay && overlay.classList.add("hidden");
  state.sessionScore = state.levelStartScore;
  state.score = state.levelStartScore;
  state.runPoints = state.levelStartRunPoints;
  state.bonusPoints = state.levelStartBonusPoints;
  state.cleanStreak = 0;
  state.perfectChain = 0;
  state.stableWobbleStreak = 0;
  state.pointsAwardedThisRun = false;
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
  state.topScore = Math.max(0, Number(value) || 0);
  scheduleProfileSync();
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
const platformDefs = new Map();
const borderDefs = new Map();
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
  SHOP_ITEMS.forEach((item) => {
    promises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.src = item.img;
        img.onload = () => {
          platformDefs.set(item.key, img);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load platform ${item.key}`);
          resolve();
        };
      })
    );
  });
  BORDER_ITEMS.forEach((item) => {
    promises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.src = item.img;
        img.onload = () => {
          borderDefs.set(item.key, img);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load border ${item.key}`);
          resolve();
        };
      })
    );
  });
  BUFF_ITEMS.forEach((item) => {
    promises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.src = item.img;
        img.onload = resolve;
        img.onerror = resolve;
      })
    );
  });
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
  const upcomingLevelNumber = Math.max(1, Math.floor(nextLevel) + 1);
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
  const desiredIndex = Math.max(0, Math.floor(levelIndex));
  const safeIndex =
    state.gameMode === "checkpoint"
      ? clamp(desiredIndex, 0, LEVELS.length - 1)
      : desiredIndex;
  state.currentLevel = safeIndex;
  state.levelStartScore = state.sessionScore;
  state.levelStartRunPoints = state.runPoints;
  state.levelStartBonusPoints = state.bonusPoints;
  state.levelThreshold = 10 + safeIndex * 5;
  const levelConfig = getLevelConfig(safeIndex);
  const levelNumber = safeIndex + 1;
  const levelEffect = getLevelEffect(levelNumber);
  audioManager.onLevelChange(levelEffect);
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
  clearActiveBuffs();
  state.hearts = MAX_HEARTS;
  renderHearts();
  renderBuffTray();
  const unlockIndex = clamp(safeIndex, 0, CAT_NAMES.length - 1);
  const levelCatName =
    state.gameMode === "survival" && safeIndex >= CAT_NAMES.length
      ? pickRandomCat()
      : getLevelCatName(safeIndex);
  placeInitialCat(levelCatName);
  state.previewName =
    state.gameMode === "survival" && safeIndex >= CAT_NAMES.length
      ? pickRandomCat()
      : getLevelCatName(safeIndex);
  state.unlockedCats = [getLevelCatName(unlockIndex)];
  state.lastUnlockedIndex = unlockIndex;
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
  state.wind = 0;
  state.windTarget = 0;
  state.windTimer = 0;
  state.windChangeInterval = 0;
  state.sway = 0;
  state.swayVelocity = 0;
  state.dropTimerActive = false;
  state.dropTimerRemaining = 0;
  state.fastPreviewRemaining = 0;
  state.fastPreviewCooldown = 0;
  state.previewSpeedMultiplier = 1;
  state.cleanStreak = 0;
  state.perfectChain = 0;
  state.stableWobbleStreak = 0;
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
  if (state.gameMode === "survival" && state.currentLevel >= 13) {
    const idx = Math.floor(Math.random() * CAT_NAMES.length);
    const name = CAT_NAMES[idx];
    return assetCache.has(name) ? name : CAT_NAMES[0];
  }
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

function attemptDrop(forced = false) {
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
    forcedDrop: !!forced,
    magnetized: isBuffActive("catMagnet"),
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
  const multiplier = state.previewSpeedMultiplier || 1;
  const desiredSpeed = (state.levelBasePreviewSpeed + desiredBoost) * multiplier;
  state.previewSpeedCurrent += (desiredSpeed - state.previewSpeedCurrent) * PREVIEW_ACCEL;
  const levelConfig = getLevelConfig();
  if (!shouldDisableRandomDirectionChanges() && levelConfig.previewDirectionChangeChance && state.previewDirectionCooldown <= 0) {
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
      state.previewName = pickRandomCat();
    }
    return;
  }
  const accel = DROP_ACCEL * dt;
  cat.vy += accel;
  cat.y += cat.vy * dt;
  cat.x += (cat.vx || 0) * dt;
  cat.vx = (cat.vx || 0) * FRICTION_PER_SUBSTEP;
  if (cat.magnetized) {
    const topCat = state.stack[state.stack.length - 1];
    const targetCenter = topCat ? topCat.x + topCat.width / 2 + (state.sway || 0) : canvas.width / 2;
    const targetX = clampToPlatform(targetCenter - cat.width / 2, cat.width);
    cat.vx += (targetX - cat.x) * 0.08 * dt;
  }
  // Wind applies only while a cat is falling.
  const effect = state.currentEffect;
  if (effect?.wind) {
    const push = effect.wind.push || 0;
    cat.vx += state.wind * push * dt;
  }
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
    if (cat.magnetized) {
      const topCat = state.stack[state.stack.length - 1];
      const targetCenter = topCat ? topCat.x + topCat.width / 2 + (state.sway || 0) : canvas.width / 2;
      cat.x = clampToPlatform(targetCenter - cat.width / 2, cat.width);
    }
    if (cat.forcedDrop) {
      // Timed-out drops always bounce out and cost a life, even if aligned.
      bounceMissedCat(cat);
      return;
    }
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
    // Bonus hooks: streaks and precise placements affect points only, not score.
    const cleanThreshold = placed.width * 0.22;
    const perfectThreshold = placed.width * 0.07;
    if (absOffset <= cleanThreshold) {
      state.cleanStreak += 1;
      if (state.cleanStreak > 0 && state.cleanStreak % 5 === 0) {
        awardBonusPoints(3, "Streak");
      }
    } else {
      state.cleanStreak = 0;
    }
    if (absOffset <= perfectThreshold) {
      state.perfectChain += 1;
      if (state.perfectChain % 2 === 0) {
        awardBonusPoints(1, "Perfect");
      }
      // Subtle wobble relief reward for a very clean drop.
      state.wobble = Math.max(0, state.wobble - 8);
    } else {
      state.perfectChain = 0;
    }
    if (absOffset > placed.width * 0.45) {
      triggerCollapse("tilt");
      return;
    }
  }
  // Staying above 75% wobble for 10 placements grants one extra life,
  // but only while the player is currently below max hearts.
  if (state.hearts < state.maxHeartsThisLevel) {
    const wobbleRemaining = Math.max(0, 1 - state.wobble / WOBBLE_THRESHOLD);
    if (wobbleRemaining >= 0.75) {
      state.stableWobbleStreak += 1;
      if (state.stableWobbleStreak >= 10) {
        state.hearts = Math.min(state.maxHeartsThisLevel, state.hearts + 1);
        renderHearts();
        state.stableWobbleStreak = 0;
        triggerBonusBurst("+1 Life");
      }
    } else {
      state.stableWobbleStreak = 0;
    }
  } else {
    state.stableWobbleStreak = 0;
  }

  state.activeCat = null;
  state.sessionScore += pointsPerCat();
  awardRunPoints(pointsPerCat());
  audioManager.drop();
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
    triggerCollapse("tilt");
    return;
  }
  if (!boundsCheck) {
    triggerCollapse("bounds");
  }
}

function tryNineLivesRescue(reason) {
  if (reason !== "wobble") return false;
  if (!state.nineLivesSaveAvailable || !isBuffActive("nineLives")) return false;
  state.nineLivesSaveAvailable = false;
  state.supportCatsVisual = 9;
  state.supportCatsVisualTimer = 2600;
  state.wobble = 0;
  state.wobbleTarget = 0;
  state.imbalanceTrend = 0;
  state.dynamicThresholdLeft = BASE_COLLAPSE_THRESHOLD;
  state.dynamicThresholdRight = BASE_COLLAPSE_THRESHOLD;
  state.hearts = Math.max(1, state.hearts);
  state.activeCat = null;
  triggerBonusBurst("9 Lives Rescue");
  renderHearts();
  return true;
}

function triggerCollapse(reason = "collapse") {
  if (state.mode !== "running") return;
  if (tryNineLivesRescue(reason)) return;
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
  clearActiveBuffs();
  renderBuffTray();
  state.record = Math.max(state.record, state.score);
  maybeUpdateTopScore();
  finalHeight.textContent = state.stack.length;
  finalScore.textContent = state.score;
  finalLevel.textContent = state.currentLevel + 1;
  recordModeBest(state.score);
  submitSurvivalRunIfEligible(state.score, state.currentLevel + 1, state.stack.length);
  showGameOverPanel();
  state.paused = false;
  overlay.classList.remove("hidden");
  runPointsPayoutAnimation("gameover");
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
  return top.x + top.width / 2 - platformCenter + (state.sway || 0);
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
  updateActiveBuffs();
  const levelEffect = getLevelEffect(getLevelNumber());
  state.currentEffect = levelEffect;
  updateFog(deltaMs, levelEffect);
  if (state.mode === "running") {
    updateRain(deltaMs, levelEffect);
    updateLightning(deltaMs, levelEffect);
    updateWind(deltaMs, levelEffect);
    updateSway(deltaMs, levelEffect);
    updateFastPreview(deltaMs, levelEffect);
    updateDropTimer(deltaMs, levelEffect);
  }
  state.cloudOffset = (state.cloudOffset + 0.25) % 400;
  // Keep simulation pacing tied to frame delta, not stack height.
  // This prevents sudden horizontal speed spikes late in a level.
  const simulationSteps = Math.max(1, Math.ceil(deltaRatio));
  const stepRatio = deltaRatio / simulationSteps;
  for (let i = 0; i < simulationSteps; i += 1) {
    if (state.mode === "running") {
      const driftSpeed = updatePreview();
      if (driftSpeed) {
        const stepDelta = driftSpeed / PREVIEW_MOVEMENT_STEPS;
        for (let step = 0; step < PREVIEW_MOVEMENT_STEPS; step += 1) {
          movePreviewStep(stepDelta * stepRatio);
        }
      }
      for (let sub = 0; sub < PHYSICS_SUBSTEPS; sub += 1) {
        updateActiveCat(PHYSICS_DT * stepRatio);
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
  if (state.supportCatsVisualTimer > 0) {
    state.supportCatsVisualTimer = Math.max(0, state.supportCatsVisualTimer - deltaMs);
    if (state.supportCatsVisualTimer <= 0) {
      state.supportCatsVisual = 0;
    }
  }
  updateCamera();
}

function drawBackground() {
  const colors = state.backgroundGradient || LEVELS[0].gradient;
  const effect = state.currentEffect || getLevelEffect(getLevelNumber()) || {};
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.55, colors[1] || colors[0]);
  gradient.addColorStop(1, colors[1] || colors[0]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBackgroundAccents(effect, colors);
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

function drawBackgroundAccents(effect, colors) {
  // Keep this subtle. It's background storytelling, not gameplay UI.
  const top = colors?.[0] || "#ffffff";
  const isNight = /^#0/i.test(top) || /^#03/i.test(top) || /^#04/i.test(top) || /^#05/i.test(top) || !!effect?.lightning;

  if (isNight) {
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    for (let i = 0; i < 36; i += 1) {
      const x = (i * 73 + 40) % canvas.width;
      const y = (i * 29 + 18) % 220;
      const r = (i % 3) + 0.8;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (effect?.wind) {
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 2;
    const dir = state.wind >= 0 ? 1 : -1;
    for (let i = 0; i < 12; i += 1) {
      const baseY = 120 + i * 34;
      const phase = (state.cloudOffset * 0.6 + i * 60) % (canvas.width + 200);
      const x = dir > 0 ? phase - 140 : canvas.width - phase + 140;
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.quadraticCurveTo(x + dir * 36, baseY - 10, x + dir * 80, baseY + 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (effect?.rain || effect?.lightning) {
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = "rgba(10,12,20,0.55)";
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.25, 80, 180, 70, 0, 0, Math.PI * 2);
    ctx.ellipse(canvas.width * 0.6, 70, 240, 90, 0, 0, Math.PI * 2);
    ctx.ellipse(canvas.width * 0.85, 90, 180, 70, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
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
  audioManager.lightning();
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
      ctx.globalAlpha = alpha * 0.45;
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
    ctx.globalAlpha = Math.min(0.22, state.lightningFlash * 0.2);
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

function updateWind(deltaMs, effect) {
  const hasWind = !!effect?.wind;
  if (!hasWind) {
    state.wind = 0;
    state.windTarget = 0;
    state.windTimer = 0;
    state.windChangeInterval = 0;
    if (windIndicator) windIndicator.classList.add("hidden");
    return;
  }

  if (windIndicator) windIndicator.classList.remove("hidden");

  const maxKph = Math.max(1, effect.wind.maxKph || 10);
  state.windTimer -= deltaMs;
  if (state.windTimer <= 0) {
    const [minMs, maxMs] = effect.wind.changeMs || [2200, 4200];
    state.windChangeInterval = randomBetween(minMs, maxMs);
    state.windTimer = state.windChangeInterval;
    const raw = randomBetween(-maxKph, maxKph);
    const floor = maxKph * 0.18;
    state.windTarget = Math.abs(raw) < floor ? Math.sign(raw || 1) * floor : raw;
  }

  const alpha = clamp(deltaMs / 900, 0, 1);
  state.wind += (state.windTarget - state.wind) * alpha;

  const kph = Math.round(Math.abs(state.wind) * WIND_UI_KPH_SCALE);
  const dir = state.wind >= 0 ? "→" : "←";
  if (windArrowEl) windArrowEl.textContent = dir;
  if (windSpeedEl) windSpeedEl.textContent = `${kph} kph`;
}

function updateSway(deltaMs, effect) {
  const strength = effect?.sway?.strength || 0;
  if (!strength) {
    state.swayVelocity *= 0.9;
    state.sway += (0 - state.sway) * clamp(deltaMs / 600, 0, 1);
    if (Math.abs(state.sway) < 0.05) state.sway = 0;
    return;
  }

  const maxKph = Math.max(1, effect?.wind?.maxKph || 20);
  const normalized = clamp(state.wind / maxKph, -1, 1);
  const amplitude = CAT_WIDTH * 0.38 * strength;
  const target = normalized * amplitude;

  const accel = (target - state.sway) * 0.0035 * deltaMs;
  state.swayVelocity += accel;
  state.swayVelocity *= 0.92;
  state.sway += state.swayVelocity;
  state.sway = clamp(state.sway, -amplitude, amplitude);
}

function updateFastPreview(deltaMs, effect) {
  const config = effect?.fastPreview;
  if (!config) {
    state.fastPreviewRemaining = 0;
    state.fastPreviewCooldown = 0;
    state.previewSpeedMultiplier = 1;
    return;
  }

  state.fastPreviewCooldown = Math.max(0, (state.fastPreviewCooldown || 0) - deltaMs);
  state.fastPreviewRemaining = Math.max(0, (state.fastPreviewRemaining || 0) - deltaMs);

  if (state.fastPreviewRemaining > 0) {
    state.previewSpeedMultiplier = config.speedMultiplier || 1.6;
    return;
  }

  state.previewSpeedMultiplier = 1;
  if (state.fastPreviewCooldown > 0) return;

  const chancePerSecond = Math.max(0, config.chance || 0);
  if (Math.random() < chancePerSecond * (deltaMs / 1000)) {
    state.fastPreviewRemaining = Math.max(200, config.durationMs || 1200);
    state.fastPreviewCooldown = randomBetween(2600, 5200);
  }
}

function updateDropTimer(deltaMs, effect) {
  const config = effect?.dropTimer;
  if (!config) {
    state.dropTimerActive = false;
    state.dropTimerRemaining = 0;
    if (dropTimerEl) dropTimerEl.classList.add("hidden");
    return;
  }

  if (state.activeCat) {
    if (dropTimerEl) dropTimerEl.classList.add("hidden");
    state.dropTimerActive = false;
    return;
  }

  if (!state.dropTimerActive) {
    state.dropTimerActive = true;
    state.dropTimerRemaining = Math.max(1, (config.seconds || 3) * 1000);
  }

  state.dropTimerRemaining -= deltaMs;
  const secondsLeft = Math.max(0, Math.ceil(state.dropTimerRemaining / 1000));
  if (dropTimerEl) {
    dropTimerEl.textContent = String(secondsLeft);
    dropTimerEl.classList.toggle("hidden", secondsLeft <= 0);
  }

  if (state.dropTimerRemaining <= 0) {
    state.dropTimerActive = false;
    state.dropTimerRemaining = 0;
    attemptDrop(true);
  }
}

function handleFogCatDrop() {
  const effect = state.currentEffect || getLevelEffect(getLevelNumber()) || {};
  if (!effect.fog || !state.fogDense) return;
  if (state.fogHoldDrops > 0) {
    state.fogHoldDrops = Math.max(0, state.fogHoldDrops - 1);
  }
  if (state.fogHoldDrops <= 0 && state.fogDenseTimer <= 0) {
    endFogBurst(effect);
  }
}

function handleCanvasPrimaryAction(event) {
  if (event && typeof event.button === "number" && event.button !== 0) return;
  if (state.mode === "start" || state.paused) return;
  audioManager.unlockAudio();
  if (state.mode === "running") {
    event && event.preventDefault();
    attemptDrop();
    return;
  }
  if (state.mode === "gameover") {
    event && event.preventDefault();
    if (state.gameMode === "checkpoint") restartCheckpointLevel();
    else startNewRun("survival");
    return;
  }
  if (state.mode === "victory") {
    event && event.preventDefault();
    startNewRun(state.gameMode);
  }
}

function drawFog() {
  const opacity = state.fogOpacity * getFogOpacityModifier();
  if (opacity <= 0) return;
  ctx.save();
  const fogColor = state.showSun ? "rgba(255, 217, 178, " : "rgba(255, 255, 255, ";
  ctx.fillStyle = `${fogColor}${Math.min(0.7, opacity)})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawPlatform() {
  const bounds = getPlatformBounds();
  const x = bounds.left;
  const y = BASE_Y + 4;
  const equipped = equippedPlatformKey;
  const platformImg =
    equipped && equipped !== DEFAULT_PLATFORM_KEY ? platformDefs.get(equipped) : null;
  const renderHeight = platformImg ? 54 : platform.height;
  ctx.save();

  if (platformImg) {
    // Clip so platform skins don't spill outside the rounded shape.
    ctx.save();
    roundedRect(x, y, platform.width, renderHeight, 14);
    ctx.clip();

    const imgW = platformImg.width || 1;
    const imgH = platformImg.height || 1;
    const targetW = platform.width;
    const targetH = renderHeight;
    const scale = Math.max(targetW / imgW, targetH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = x + (targetW - drawW) / 2;
    const drawY = y + (targetH - drawH) / 2;
    ctx.drawImage(platformImg, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Subtle sheen.
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    roundedRect(x + 12, y + 8, platform.width - 24, Math.max(10, renderHeight - 24), 10);
    ctx.fill();
  } else {
    // Default platform keeps the chunkier stylized base shadow.
    ctx.fillStyle = "#2b1d3d";
    roundedRect(x - 10, y + 12, platform.width + 20, renderHeight + 10, 14);
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
  }
  ctx.restore();
}

function drawBorderFrame() {
  const borderItem = getEquippedBorderItem();
  if (!borderItem) return;
  const frame = borderDefs.get(borderItem.key);
  if (!frame) return;
  // Draw only edge bands from the border texture, never the center panel.
  const band = clamp(Math.round(Math.min(canvas.width, canvas.height) * 0.075), 34, 56);
  const fw = Math.max(1, frame.width);
  const fh = Math.max(1, frame.height);
  const sourceBandX = clamp(Math.round((band / canvas.width) * fw), 1, Math.floor(fw / 2));
  const sourceBandY = clamp(Math.round((band / canvas.height) * fh), 1, Math.floor(fh / 2));
  const centerSourceWidth = Math.max(1, fw - sourceBandX * 2);
  const centerSourceHeight = Math.max(1, fh - sourceBandY * 2);
  const centerDestWidth = Math.max(1, canvas.width - band * 2);
  const centerDestHeight = Math.max(1, canvas.height - band * 2);

  // Top and bottom bands
  ctx.drawImage(frame, 0, 0, fw, sourceBandY, 0, 0, canvas.width, band);
  ctx.drawImage(
    frame,
    0,
    fh - sourceBandY,
    fw,
    sourceBandY,
    0,
    canvas.height - band,
    canvas.width,
    band
  );

  // Left and right bands (without corners to avoid over-thick corners)
  ctx.drawImage(frame, 0, sourceBandY, sourceBandX, centerSourceHeight, 0, band, band, centerDestHeight);
  ctx.drawImage(
    frame,
    fw - sourceBandX,
    sourceBandY,
    sourceBandX,
    centerSourceHeight,
    canvas.width - band,
    band,
    band,
    centerDestHeight
  );
}

function appendRoundedRectPath(x, y, width, height, radius) {
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

function roundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  appendRoundedRectPath(x, y, width, height, radius);
}

function drawStack() {
  drawSupportCatsVisual();
  state.stack.forEach((cat) => drawCat(cat));
  if (state.activeCat) {
    drawCat(state.activeCat);
  }
}

function drawSupportCatsVisual() {
  if (state.supportCatsVisual <= 0 || !state.stack.length) return;
  const template = state.stack[0];
  if (!template?.image) return;
  const count = Math.min(9, state.supportCatsVisual);
  const yBase = BASE_Y - template.height;
  ctx.save();
  ctx.globalAlpha = 0.36;
  for (let i = 0; i < count; i += 1) {
    const wobble = (i % 2 === 0 ? -1 : 1) * 6;
    const x = clampToPlatform(canvas.width / 2 - template.width / 2 + wobble, template.width);
    const y = yBase - i * (template.height * 0.18);
    ctx.drawImage(
      template.image,
      0,
      template.cropTop || 0,
      template.image.width,
      template.srcHeight || template.image.height,
      x,
      y,
      template.width,
      template.height
    );
  }
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
  drawBuffGuides();
  drawLightning();
  drawFog();
  drawBorderFrame();
  updateHUD();
}

function drawBuffGuides() {
  if (state.mode !== "running") return;
  const topCat = state.stack[state.stack.length - 1];
  if (!topCat) return;
  const windPush = state.currentEffect?.wind?.push || 0;
  const windCompensation = state.currentEffect?.wind ? state.wind * windPush * 900 : 0;
  const targetCenter = topCat.x + topCat.width / 2 + (state.sway || 0) + windCompensation;
  const towerCenterX = worldToScreenX(targetCenter);
  const towerTopY = worldToScreenY(BASE_Y - state.stackHeight);

  if (isBuffActive("catMagnet")) {
    ctx.save();
    ctx.strokeStyle = "rgba(110, 204, 255, 0.7)";
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.arc(towerCenterX, towerTopY + 18, 64, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (isBuffActive("catString")) {
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 7]);
    ctx.beginPath();
    ctx.moveTo(towerCenterX, 0);
    ctx.lineTo(towerCenterX, canvas.height);
    ctx.stroke();
    ctx.restore();
  }

  if (isBuffActive("fifthSense")) {
    const pulse = 12 + ((performance.now() / 110) % 1) * 12;
    ctx.save();
    ctx.strokeStyle = "rgba(122, 255, 171, 0.85)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(towerCenterX, towerTopY + 14, pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(towerCenterX, towerTopY + 14, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(122, 255, 171, 0.9)";
    ctx.fill();
    ctx.restore();
  }
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
    triggerCollapse("wobble");
  }
  updateSlipperyWarning();
}

function updateSlipperyWarning() {
  if (!slipperyWarning) return;
  slipperyWarning.classList.toggle("hidden", !state.skullWarningVisible || isBuffActive("stickyPaws"));
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
  if (state.gameMode === "checkpoint" && state.currentLevel >= CHECKPOINT_FINAL_INDEX) {
    if (state.levelScore >= state.levelThreshold) {
      checkVictory();
    }
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
  const isFinalCheckpoint =
    state.gameMode === "checkpoint" && state.currentLevel >= CHECKPOINT_FINAL_INDEX;
  if (isFinalCheckpoint && state.levelScore >= state.levelThreshold) {
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
  clearActiveBuffs();
  renderBuffTray();
  recordModeBest(state.score);
  if (!victoryScreen) return;
  const modeLabel =
    state.gameMode === "checkpoint"
      ? "Checkpoint Run"
      : "Survival";
  if (victoryModeLabel) {
    victoryModeLabel.textContent =
      state.gameMode === "checkpoint"
        ? "Checkpoint Run complete. Go play Survival for more!"
        : `You beat CatStacker in ${modeLabel}.`;
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
  runPointsPayoutAnimation("victory");
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

function runPointsPayoutAnimation(screenType) {
  const runPoints = Math.max(0, Math.floor(state.runPoints || 0));
  const bonusPoints = Math.max(0, Math.floor(state.bonusPoints || 0));
  const totalAdd = runPoints + bonusPoints;

  const runEl = screenType === "victory" ? victoryRunPoints : finalRunPoints;
  const bonusEl = screenType === "victory" ? victoryBonusPoints : finalBonusPoints;
  const totalEl = screenType === "victory" ? victoryTotalPoints : finalTotalPoints;

  if (runEl) runEl.textContent = String(runPoints);
  if (bonusEl) bonusEl.textContent = String(bonusPoints);
  if (totalEl) totalEl.textContent = "0";

  if (state.pointsAwardedThisRun) {
    if (totalEl) totalEl.textContent = String(totalAdd);
    return;
  }

  if (bonusPoints > 0) {
    triggerBonusBurst(`+${bonusPoints} Bonus`);
  }

  const startPoints = shopPoints;
  const durationMs = 1100;
  const startTime = performance.now();

  const tick = (now) => {
    const t = Math.min(1, (now - startTime) / durationMs);
    const eased = 1 - Math.pow(1 - t, 3);
    const addedNow = Math.floor(totalAdd * eased);

    if (totalEl) totalEl.textContent = String(addedNow);
    shopPoints = startPoints + addedNow;
    updateShopPointsDisplay();

    if (t < 1) {
      requestAnimationFrame(tick);
      return;
    }

    shopPoints = startPoints + totalAdd;
    saveShopPoints();
    updateShopPointsDisplay();
    state.pointsAwardedThisRun = true;
  };

  requestAnimationFrame(tick);
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
  const totalHearts = Math.max(MAX_HEARTS, state.maxHeartsThisLevel || MAX_HEARTS);
  for (let i = 0; i < totalHearts; i += 1) {
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

function worldToScreenY(worldY) {
  return BASE_Y + state.cameraZoom * (worldY - BASE_Y + state.cameraYOffset);
}

function screenToWorldY(screenY) {
  const zoom = state.cameraZoom || 1;
  return (screenY - BASE_Y) / zoom + BASE_Y - state.cameraYOffset;
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (state.mode === "gameover") {
      if (state.gameMode === "checkpoint") restartCheckpointLevel();
      else startNewRun("survival");
      return;
    }
    if (state.mode === "victory") {
      startNewRun(state.gameMode);
      return;
    }
    attemptDrop();
  }
  // Escape is reserved for fullscreen exit in browsers.
  if (event.code === "KeyP") {
    event.preventDefault();
    if (state.paused) closePauseMenu();
    else openPauseMenu();
  }
  if (event.key === "f") {
    toggleFullscreen();
  }
});

canvas &&
  canvas.addEventListener("pointerdown", (event) => {
    handleCanvasPrimaryAction(event);
  });

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
    audioManager.unlockAudio();
    audioManager.click();
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
    audioManager.unlockAudio();
    audioManager.click();
    showShopPanel();
  });
audioToggleButton &&
  audioToggleButton.addEventListener("click", (event) => {
    event.preventDefault();
    audioManager.unlockAudio();
    audioManager.click();
    audioManager.setMuted(!audioMuted);
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
shopCategories &&
  shopCategories.addEventListener("click", (event) => {
    const button = event.target.closest(".shop-category");
    if (!button) return;
    const category = button.dataset.category;
    if (!category) return;
    audioManager.unlockAudio();
    audioManager.click();
    setActiveShopCategory(category);
  });
shopPopupClose &&
  shopPopupClose.addEventListener("click", () => {
    closeShopPopup();
  });
shopPopup &&
  shopPopup.addEventListener("click", (event) => {
    if (event.target === shopPopup) {
      closeShopPopup();
    }
  });
pauseResumeBtn &&
  pauseResumeBtn.addEventListener("click", () => {
    closePauseMenu();
  });
pauseButton &&
  pauseButton.addEventListener("click", (event) => {
    event.preventDefault();
    audioManager.unlockAudio();
    audioManager.click();
    if (state.paused) closePauseMenu();
    else openPauseMenu();
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
  const thresholdRatio = getSlipThreshold();
  return offset > cat.width * thresholdRatio;
}

function bounceMissedCat(cat) {
  cat.missed = true;
  cat.vy = -4.6;
  const direction = cat.x + cat.width / 2 < canvas.width / 2 ? -1 : 1;
  cat.vx = direction * 6.2;
  state.cleanStreak = 0;
  state.perfectChain = 0;
  state.stableWobbleStreak = 0;
  state.hearts = Math.max(0, state.hearts - 1);
  renderHearts();
  if (state.hearts <= 0) {
    triggerCollapse("lives");
  }
}

bootstrapAuthAndGame();
