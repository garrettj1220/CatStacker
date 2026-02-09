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

const CAT_NAMES = ["Cat1.png", "Cat2.png", "Cat3.png", "Cat4.png", "Cat5.png"];
const CAT_COLORS = ["#f6b35e", "#e89a59", "#d8896a", "#c47c7c", "#b26a86"];
const INITIAL_RECORD = 0;
const CAT_WIDTH = 160;
const CAT_HEIGHT = 80;
const BASE_Y = canvas.height - 70;
const WOBBLE_THRESHOLD = 160;
const GRAVITY_BASE = 0.75;
const DROP_ACCEL = 3.8;
const FALL_DURATION = 100;
const PREVIEW_MARGIN = 210;
const PREVIEW_Y = 22;
const MISS_OFFSET_RATIO = 0.36;
const LEVEL_TRANSITION_DELAY = 1500;
const PREVIEW_ACCEL = 0.09;
const PREVIEW_HORIZONTAL_MARGIN = 140;
const DROP_VX_FRICTION = 0.96;
const PREVIEW_MOVEMENT_STEPS = 3;
const PHYSICS_SUBSTEPS = 3;
const PHYSICS_DT = 1 / PHYSICS_SUBSTEPS;
const FRICTION_PER_SUBSTEP = Math.pow(DROP_VX_FRICTION, PHYSICS_DT);

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
    previewSpeed: 7,
    previewDirectionChangeChance: 0.003,
    previewDirectionCooldown: 0,
    dropDrift: 0,
    previewJitter: 0.02
  },
  {
    name: "Dusky Bloom",
    gradient: ["#fff5e1", "#ffd6b3"],
    previewSpeed: 7.4,
    previewDirectionChangeChance: 0.012,
    previewDirectionCooldown: 150,
    dropDrift: 0.25,
    previewJitter: 0.05
  },
  {
    name: "Twilight Bloom",
    gradient: ["#f4edff", "#cbb7ff"],
    previewSpeed: 7.8,
    previewDirectionChangeChance: 0.024,
    previewDirectionCooldown: 110,
    dropDrift: 0.42,
    previewJitter: 0.08
  },
  {
    name: "Aurora Peak",
    gradient: ["#e7f8ff", "#a6efff"],
    previewSpeed: 8.3,
    previewDirectionChangeChance: 0.04,
    previewDirectionCooldown: 85,
    dropDrift: 0.6,
    previewJitter: 0.12
  },
  {
    name: "Midnight Bloom",
    gradient: ["#1d0f34", "#4a237d"],
    previewSpeed: 8.8,
    previewDirectionChangeChance: 0.06,
    previewDirectionCooldown: 60,
    dropDrift: 0.8,
    previewJitter: 0.16
  }
];
const LEVEL_THRESHOLDS = LEVELS.map((_, idx) => 10 + idx * 5);

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
  wobbleDangerFrames: 0,
  score: 0,
  record: INITIAL_RECORD,
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
  levelThreshold: LEVEL_THRESHOLDS[0],
  backgroundGradient: LEVELS[0].gradient,
  cameraZoom: 1,
  cameraTargetZoom: 1,
  cameraYOffset: 0,
  cameraTargetYOffset: 0,
  cloudOffset: 0,
  levelTransitioning: false
};

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
  beginLevel(0, true);
}

function startLevelTransition(nextLevel) {
  if (state.levelTransitioning) return;
  state.levelTransitioning = true;
  state.mode = "transition";
  const completedLevelNumber = state.currentLevel + 1;
  overlayLevel.textContent = completedLevelNumber;
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
  state.mode = "running";
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
  state.wobbleDangerFrames = 0;
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
  if (previous) {
    const absOffset = Math.abs(center - (previous.x + previous.width / 2));
    state.wobble = Math.min(WOBBLE_THRESHOLD * 1.2, state.wobble + absOffset * 0.8);
    if (absOffset > placed.width * 0.45) {
      triggerCollapse();
      return;
    }
  }
  state.activeCat = null;
  recalcStats();
  checkCollapse();
  state.previewName = pickRandomCat();
}

function recalcStats() {
  const stack = state.stack;
  if (!stack.length) {
    state.score = 0;
    state.levelScore = 0;
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
    state.score = state.levelScore;
    updateCameraTargets();
    updateUnlocks();
    return;
  }
  const averageOffset = state.offsetSum / Math.max(1, state.offsetCount);
  state.balanceOffset = averageOffset;
  state.wobbleTarget = Math.min(WOBBLE_THRESHOLD * 1.5, Math.abs(averageOffset) * 3);
  const height = stack.length;
  state.levelScore = Math.max(0, height - 1);
  state.score = state.levelScore;
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
  const wobbleRatio = state.wobble / WOBBLE_THRESHOLD;
  const top = state.stack[state.stack.length - 1];
  const below = state.stack[state.stack.length - 2];
  const topOffset = Math.abs(top.x + top.width / 2 - (below.x + below.width / 2));
  if (wobbleRatio > 1) {
    state.wobbleDangerFrames += 1;
  } else {
    state.wobbleDangerFrames = Math.max(0, state.wobbleDangerFrames - 2);
  }
  if (topOffset > top.width * 0.4) {
    triggerCollapse();
    return;
  }
  if (state.wobbleDangerFrames > 22 || !boundsCheck) {
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

function isWithinPlatform(x, width) {
  const bounds = getPlatformBounds();
  const allowance = width * 0.25;
  return x >= bounds.left - allowance && x + width <= bounds.right + allowance;
}

function clampToPlatform(x, width) {
  const bounds = getPlatformBounds();
  return clamp(x, bounds.left + 6, bounds.right - width - 6);
}

function update() {
  if (!assetsLoaded) return;
  state.cloudOffset = (state.cloudOffset + 0.25) % 400;
  const runSpeed = Math.min(6, 1 + Math.floor(state.stack.length * 0.05));
  for (let i = 0; i < runSpeed; i += 1) {
    if (state.mode === "running") {
      const driftSpeed = updatePreview();
      if (driftSpeed) {
        const stepDelta = driftSpeed / PREVIEW_MOVEMENT_STEPS;
        for (let step = 0; step < PREVIEW_MOVEMENT_STEPS; step += 1) {
          movePreviewStep(stepDelta);
        }
      }
      for (let sub = 0; sub < PHYSICS_SUBSTEPS; sub += 1) {
        updateActiveCat(PHYSICS_DT);
      }
    }
  }
  if (state.mode === "tumbling") {
    updateTumble();
  }
  state.wobble += (state.wobbleTarget - state.wobble) * 0.42;
  state.wobble = clamp(state.wobble, 0, WOBBLE_THRESHOLD * 1.4);
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
  if (state.currentLevel >= LEVELS.length - 1) return;
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
  lastTimestamp = timestamp;
  update();
  render();
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

startButton.addEventListener("click", () => {
  startGame();
});

playAgainBtn.addEventListener("click", () => {
  startGame();
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
}

loadAssets();
