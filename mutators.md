# CatStacker Mutators (Reference)

This file lists all gameplay mutators used for level design and Survival randomization.

## Weather / Visibility

- `rain`
  - Visual-only rain overlay.

- `fog`
  - Periodic fog bursts that can reach high opacity.
  - In some levels, fog stays dense until N cats are dropped.

- `lightning`
  - Background lightning flashes + window shake.
  - Applies a temporary instability debuff (reduced tip threshold / wobble tolerance).

## Precision / Control

- `slipThreshold` (slippery cats)
  - Tightens landing tolerance: cats must land more centered to "stick" instead of bouncing off.
  - Implemented by lowering the horizontal miss threshold ratio.

- `fastPreview`
  - Occasionally increases the horizontal preview movement speed for a short window.
  - This is the "preview moves much faster horizontally every once in a while" mutator.

- `dropTimer`
  - Countdown UI (starting at 3).
  - If timer reaches 0 before dropping, the cat auto-drops, bounces out, and you lose a life.

## Environmental Forces

- `wind`
  - Continuous wind that changes direction/strength fluidly.
  - Wind pushes falling cats horizontally based on the current wind speed.
  - UI shows direction arrow + speed (kph).

- `sway` (tower sway)
  - Tower "leans" back and forth (driven by wind on some levels).
  - Sway shifts effective center-of-gravity and brings the tower closer to the tip threshold.
