# CatStacker Design Conversation

## Vision
CatStacker is a short-form browser game where players assemble quirky cats into a vertical tower without tipping over. Each cat is a physics object with its own weight, personality, and sensory quirks, so the fun comes from learning how placements change the balance and how special abilities can rescue a wobbling stack.

## Experience pillars
- **Tactile stacking:** Simple keyboard controls place the next cat (press Space to drop); leaning into subtle physics gives each placement weight.
- **Visual personality:** Each cat has a distinct silhouette and expression, with playful purrfect audio cues when stacks succeed.
- **Snackable goals:** Quick runs (60–90 seconds) with leaderboard-style scoring that rewards height, combos, and stylistic flourishes.

## Game loop
1. **Prep phase:** The camera frames the base platform. A preview shows the next few cats and their traits (heavy, stretchy, magnetic, etc.).
2. **Placement phase:** Player presses Space to drop the next cat onto the tower. Cats ripple the stack and may trigger temporary effects (slow motion, gust of wind, etc.).
3. **Evaluation:** When a cat settles, the game scores stability, height gain, and combo streaks. A wobble meter warns a collapse is imminent.
4. **Failure or celebrate:** If the tower tips, the run ends and the final height/score is tallied. Otherwise continue to the next cat until time, score, or cat limit triggers victory.

## User notes
- Core idea: Cat stacking works like a playful block-stacking game. The goal is to stack as many cats as possible, but if the stack leans too far to one side the whole tower collapses. Keeping weight balanced and understanding each cat’s quirks is the main strategic element.
- Unlock new cats once you reach target heights to reward progression. These unlocks can come with fresh silhouettes, abilities, or balance quirks that change how you approach future stacks.
- Keep the gameplay loop simple and immediately understandable, with quick failure/success cycles so each run feels concise and satisfying.

## Core systems
- **Physics balance:** Cats behave as dynamic rigid bodies with adjustable mass/softness. Weight distribution is key—strategic placements can counteract wobble or chain reactions.
- **Power-up cats:** Every third cat includes a modifier (stabilizer, trampoline, adhesive). Players can choose to spend or save these freebies for tricky moments.
- **Progression:** Earn currency by stacking combos to unlock new cat families, backgrounds, and “purrformance” skins with light particles or confetti bursts.
- **Scoring:** Height × stability bonus + combo multiplier. Extra points for landing on specific targets (floating saucers, moving platforms). Could include daily missions (stack 12 cats, keep wobble under 30%, etc.).

## Art & Audio direction (starter notes)
- Palette: warm pastel gradients with neon highlights for power-ups.
- Silhouettes: fat, round cats with exaggerated tails; keep the stack readable from the bottom-of-screen camera.
- Audio: short purrs, thumps, and success jingles; optional voiceover chirps from a narrator cat.

## Questions for you
1. What are the target controls/platforms (mouse only, keyboard, touch, gamepad, mobile web)?
2. How challenging should each run feel—endless stacking until failure, a fixed number of cats, or a score/directional goal?
3. Do you want any narrative framing (a cat café owner, a delivery chase, an interstellar stacker)?
4. What progression should feel meaningful: cosmetic unlocks, new cat abilities, persistent upgrades, or leaderboard badges?
5. Are there specific inspirations (games, movies, memes) we should reference for tone, pacing, or aesthetics?
6. Should we plan for social sharing (GIF exports, screenshot captions, short replays) or keep it purely single-player?

Feel free to answer these directly in chat, and I’ll iterate the doc to capture your intentions before we start any implementation.
