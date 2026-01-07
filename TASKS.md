# Arkanoid Project - Task Board

## Overview
This document tracks all development tasks for the Arkanoid game project.

---

## TASK-001: Project Setup and Build Configuration
- **Assigned to**: dev1
- **Status**: pending
- **Branch**: feature/task-001-project-setup
- **Priority**: high
- **Dependencies**: none

### Description
Initialize the TypeScript + Three.js project with Vite as the build tool. Set up the development environment with hot reloading and production build capability.

### Acceptance Criteria
- [ ] `npm install` installs all dependencies without errors
- [ ] `npm run dev` starts development server with hot reload
- [ ] `npm run build` creates production build
- [ ] TypeScript strict mode enabled
- [ ] Three.js properly imported and types available
- [ ] Basic index.html with canvas placeholder

### Technical Notes
- Use Vite for fast development and building
- TypeScript should be in strict mode
- Include Howler.js for future audio needs

### Files to Create
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`
- `src/main.ts` (empty entry point with console.log)

---

## TASK-002: Core Scene Setup
- **Assigned to**: dev1
- **Status**: pending
- **Branch**: feature/task-002-core-scene
- **Priority**: high
- **Dependencies**: TASK-001

### Description
Set up the Three.js scene with orthographic camera, renderer, and basic game loop. Create the foundational classes that all other systems will build upon.

### Acceptance Criteria
- [ ] Three.js scene renders without errors
- [ ] Orthographic camera shows 800x600 unit play area
- [ ] Renderer fills browser window and resizes properly
- [ ] Game loop runs at 60 FPS using requestAnimationFrame
- [ ] Delta time calculated correctly for frame-independent movement
- [ ] Background color set (dark blue/purple theme)

### Technical Notes
- Use OrthographicCamera for 2D gameplay
- Camera should show coordinates from -400 to 400 (X) and -300 to 300 (Y)
- Renderer should use antialiasing
- Handle window resize events

### Files to Create
- `src/core/Scene.ts`
- `src/core/Renderer.ts`
- `src/core/Camera.ts`
- `src/Game.ts` (main game class with loop)

### Files to Modify
- `src/main.ts` (instantiate Game)

---

## TASK-003: Constants and Types Foundation
- **Assigned to**: dev2
- **Status**: pending
- **Branch**: feature/task-003-constants-types
- **Priority**: high
- **Dependencies**: TASK-001

### Description
Create the shared constants and TypeScript types/interfaces that will be used throughout the project. This establishes the data contracts for all entities.

### Acceptance Criteria
- [ ] All game constants defined (speeds, sizes, colors)
- [ ] Entity interfaces defined (position, velocity, bounds)
- [ ] Game state types defined
- [ ] Power-up types enumerated
- [ ] Brick types enumerated

### Technical Notes
- Constants should be readonly/const
- Use discriminated unions for game states
- Export all types from a single index file

### Files to Create
- `src/constants/index.ts`
- `src/types/index.ts`

---

## TASK-004: Input Manager
- **Assigned to**: dev2
- **Status**: pending
- **Branch**: feature/task-004-input-manager
- **Priority**: high
- **Dependencies**: TASK-001

### Description
Create an input manager that handles keyboard and mouse input for paddle control. Support both keyboard arrows/A-D and mouse movement.

### Acceptance Criteria
- [ ] Keyboard left/right arrow keys tracked
- [ ] Keyboard A/D keys tracked
- [ ] Mouse X position tracked relative to play area
- [ ] `getDirection()` returns -1, 0, or 1 for keyboard
- [ ] `getMouseX()` returns mouse position in game coordinates
- [ ] Input mode detection (keyboard vs mouse)
- [ ] Space bar tracked for ball launch
- [ ] Escape key tracked for pause

### Technical Notes
- Use event listeners on window
- Convert mouse coordinates to game coordinate system
- Clean up listeners on destroy

### Files to Create
- `src/core/InputManager.ts`

---

## TASK-005: Entity Base Class
- **Assigned to**: dev3
- **Status**: pending
- **Branch**: feature/task-005-entity-base
- **Priority**: high
- **Dependencies**: TASK-002, TASK-003

### Description
Create the base Entity class that all game objects will inherit from. This provides common functionality for position, mesh management, and bounds.

### Acceptance Criteria
- [ ] Entity has position (x, y)
- [ ] Entity has optional velocity (vx, vy)
- [ ] Entity has bounds (width, height)
- [ ] Entity can add/remove its mesh from scene
- [ ] Entity has update(delta) method
- [ ] Entity has getBounds() returning AABB
- [ ] Entity has destroy() for cleanup

### Technical Notes
- Use Three.js Mesh internally
- Position should sync with mesh position
- getBounds() returns {left, right, top, bottom}

### Files to Create
- `src/entities/Entity.ts`

---

## TASK-006: Paddle Entity
- **Assigned to**: dev3
- **Status**: pending
- **Branch**: feature/task-006-paddle
- **Priority**: high
- **Dependencies**: TASK-005, TASK-004

### Description
Create the player-controlled paddle. It should move horizontally based on input and stay within the play area bounds.

### Acceptance Criteria
- [ ] Paddle renders as a rectangular shape
- [ ] Paddle moves left/right based on keyboard input
- [ ] Paddle follows mouse position (when mouse mode)
- [ ] Paddle cannot leave play area bounds
- [ ] Paddle speed configurable via constants
- [ ] Paddle width can be modified (for power-ups)
- [ ] Paddle has distinct color/appearance

### Technical Notes
- Default width: 100 units, height: 15 units
- Y position fixed at -250
- Movement speed: 500 units/second
- Use BoxGeometry and MeshBasicMaterial

### Files to Create
- `src/entities/Paddle.ts`

---

## TASK-007: Ball Entity
- **Assigned to**: dev4
- **Status**: pending
- **Branch**: feature/task-007-ball
- **Priority**: high
- **Dependencies**: TASK-005

### Description
Create the ball entity with physics movement. The ball should move based on velocity and bounce off walls (except bottom).

### Acceptance Criteria
- [ ] Ball renders as a circle/sphere shape
- [ ] Ball moves based on velocity each frame
- [ ] Ball bounces off left, right, and top walls
- [ ] Ball emits event when hitting bottom (lost)
- [ ] Ball can be reset to starting position
- [ ] Ball starts attached to paddle until launched
- [ ] Ball speed configurable via constants

### Technical Notes
- Radius: 8 units
- Initial speed: 400 units/second
- Use CircleGeometry or SphereGeometry
- Launch at 45-60 degree angle upward

### Files to Create
- `src/entities/Ball.ts`

---

## TASK-008: Event System
- **Assigned to**: dev4
- **Status**: in-progress
- **Branch**: feature/task-008-events
- **Priority**: high
- **Dependencies**: TASK-003

### Description
Create a simple event bus for decoupled communication between game systems. This allows entities to emit events without direct dependencies.

### Acceptance Criteria
- [ ] Can register event listeners with on(event, callback)
- [ ] Can remove listeners with off(event, callback)
- [ ] Can emit events with emit(event, data)
- [ ] Singleton pattern for global access
- [ ] TypeScript typed events
- [ ] Clear all listeners method for cleanup

### Technical Notes
- Use a simple pub/sub pattern
- Event names should be typed constants
- Data payloads should be typed

### Files to Create
- `src/core/EventBus.ts`

---

## TASK-009: Brick Entity
- **Assigned to**: dev5
- **Status**: pending
- **Branch**: feature/task-009-brick
- **Priority**: high
- **Dependencies**: TASK-005

### Description
Create the brick entity that can be destroyed by the ball. Support multiple brick types with different hit points and colors.

### Acceptance Criteria
- [ ] Brick renders as a rectangular shape
- [ ] Brick has hitPoints property (1-3, or -1 for unbreakable)
- [ ] Brick color varies by type/hitPoints
- [ ] hit() method reduces hitPoints and returns true if destroyed
- [ ] Brick emits event when destroyed with score value
- [ ] Visual feedback on hit (color change for multi-hit)

### Technical Notes
- Standard brick: 1 HP, 10 points (green)
- Hard brick: 2 HP, 20 points (orange)
- Tough brick: 3 HP, 30 points (red)
- Unbreakable: -1 HP, 0 points (gray/silver)
- Default size: 60x20 units

### Files to Create
- `src/entities/Brick.ts`

---

## TASK-010: Brick Grid Manager
- **Assigned to**: dev5
- **Status**: pending
- **Branch**: feature/task-010-brick-grid
- **Priority**: high
- **Dependencies**: TASK-009

### Description
Create a manager that generates and manages the brick layout. It should create bricks based on level data and track remaining breakable bricks.

### Acceptance Criteria
- [ ] Generate brick grid from 2D array level data
- [ ] Center brick grid horizontally
- [ ] Track count of remaining breakable bricks
- [ ] Emit event when all breakable bricks destroyed
- [ ] Clear all bricks method for level transitions
- [ ] Get all bricks method for collision checking
- [ ] Proper spacing between bricks (2-4 units)

### Technical Notes
- Grid should fit within top portion of play area
- Level data format: 2D array of brick type codes
- 0 = empty, 1 = standard, 2 = hard, 3 = tough, 9 = unbreakable

### Files to Create
- `src/entities/BrickGrid.ts`
- `src/levels/levels.ts` (with 3 sample levels)

---

## TASK-011: Collision System
- **Assigned to**: dev1
- **Status**: pending
- **Branch**: feature/task-011-collision
- **Priority**: high
- **Dependencies**: TASK-006, TASK-007, TASK-009

### Description
Create the collision detection system that handles ball-paddle, ball-brick, and ball-wall collisions with proper physics responses.

### Acceptance Criteria
- [ ] Detect ball-paddle collision
- [ ] Ball reflects off paddle with angle based on hit position
- [ ] Detect ball-brick collision
- [ ] Ball reflects off brick and damages it
- [ ] Handle corner collision cases
- [ ] Ball speed slightly increases on paddle hit (up to max)
- [ ] Collision checks are efficient (spatial considerations)

### Technical Notes
- Use AABB intersection for detection
- Paddle hit angle: center = straight up, edges = angled
- Brick collision: determine which side was hit for reflection
- Maximum ball speed: 700 units/second

### Files to Create
- `src/systems/CollisionSystem.ts`

---

## TASK-012: Game State Management
- **Assigned to**: dev2
- **Status**: pending
- **Branch**: feature/task-012-game-state
- **Priority**: high
- **Dependencies**: TASK-008

### Description
Implement game state management for score, lives, and game flow (start, playing, paused, game over, level complete).

### Acceptance Criteria
- [ ] Track current score
- [ ] Track remaining lives (start with 3)
- [ ] Track current level number
- [ ] State machine for game states
- [ ] Reset method for new game
- [ ] Events emitted on state changes
- [ ] High score tracking (session only)

### Technical Notes
- States: 'start', 'playing', 'paused', 'gameOver', 'levelComplete'
- Emit events on score change, life lost, state change
- Store in Game class or separate GameState class

### Files to Modify
- `src/Game.ts`

### Files to Create
- `src/core/GameState.ts` (optional, can be in Game.ts)

---

## TASK-013: HUD Display
- **Assigned to**: dev3
- **Status**: pending
- **Branch**: feature/task-013-hud
- **Priority**: medium
- **Dependencies**: TASK-012

### Description
Create the heads-up display showing score, lives, and level information using HTML/CSS overlay (not Three.js).

### Acceptance Criteria
- [ ] Display current score (top left)
- [ ] Display remaining lives (top right)
- [ ] Display current level (top center)
- [ ] Display high score
- [ ] Updates reactively when values change
- [ ] Clean, readable styling
- [ ] Lives shown as paddle icons or number

### Technical Notes
- Use HTML overlay positioned over canvas
- Subscribe to game state events
- CSS for styling (simple, arcade-like)
- Use a monospace or pixel-style font

### Files to Create
- `src/ui/HUD.ts`

### Files to Modify
- `index.html` (add HUD container)

---

## TASK-014: Start Screen
- **Assigned to**: dev3
- **Status**: pending
- **Branch**: feature/task-014-start-screen
- **Priority**: medium
- **Dependencies**: TASK-012

### Description
Create the start screen shown when the game loads. It should display the game title and prompt to start.

### Acceptance Criteria
- [ ] Display game title "ARKANOID"
- [ ] Display "Press SPACE to Start" message
- [ ] Display high score if exists
- [ ] Display simple controls info
- [ ] Hide when game starts
- [ ] Show when returning to start state
- [ ] Arcade-style visual design

### Technical Notes
- HTML/CSS overlay
- Listen for space key to trigger game start
- Can include simple animation (blinking text)

### Files to Create
- `src/ui/StartScreen.ts`

### Files to Modify
- `index.html` (add screen container)

---

## TASK-015: Game Over Screen
- **Assigned to**: dev4
- **Status**: pending
- **Branch**: feature/task-015-game-over
- **Priority**: medium
- **Dependencies**: TASK-012

### Description
Create the game over screen shown when the player loses all lives.

### Acceptance Criteria
- [ ] Display "GAME OVER" title
- [ ] Display final score
- [ ] Display "New High Score!" if applicable
- [ ] Display "Press SPACE to Restart"
- [ ] Hide when game restarts
- [ ] Dramatic reveal animation

### Technical Notes
- HTML/CSS overlay
- Subscribe to game over event
- Red/dark theme for game over

### Files to Create
- `src/ui/GameOverScreen.ts`

### Files to Modify
- `index.html` (add screen container)

---

## TASK-016: Level Manager
- **Assigned to**: dev5
- **Status**: pending
- **Branch**: feature/task-016-level-manager
- **Priority**: medium
- **Dependencies**: TASK-010

### Description
Create the level manager that handles level progression and loading level data into the brick grid.

### Acceptance Criteria
- [ ] Load level data by level number
- [ ] Advance to next level on completion
- [ ] Reset to level 1 on game over/restart
- [ ] Emit events on level changes
- [ ] Handle "all levels complete" (loop or victory)
- [ ] Brief pause between levels

### Technical Notes
- Work with BrickGrid to set up levels
- Levels should get progressively harder
- After last level, loop with increased difficulty or show victory

### Files to Create
- `src/levels/LevelManager.ts`

### Files to Modify
- `src/levels/levels.ts` (ensure 3+ levels)

---

## TASK-017: Level Complete Screen
- **Assigned to**: dev4
- **Status**: pending
- **Branch**: feature/task-017-level-complete
- **Priority**: medium
- **Dependencies**: TASK-016

### Description
Create the level complete screen shown between levels.

### Acceptance Criteria
- [ ] Display "LEVEL COMPLETE!" title
- [ ] Display level score bonus
- [ ] Display "Get Ready for Level X"
- [ ] Auto-advance after 2-3 seconds
- [ ] Or advance on SPACE press
- [ ] Celebratory visual style

### Technical Notes
- HTML/CSS overlay
- Auto-hide and trigger next level
- Brief fanfare feel

### Files to Create
- `src/ui/LevelCompleteScreen.ts`

### Files to Modify
- `index.html` (add screen container)

---

## TASK-018: Pause Screen
- **Assigned to**: dev2
- **Status**: pending
- **Branch**: feature/task-018-pause
- **Priority**: medium
- **Dependencies**: TASK-012

### Description
Implement pause functionality with a pause screen overlay.

### Acceptance Criteria
- [ ] ESC key toggles pause
- [ ] Game loop stops when paused
- [ ] Display "PAUSED" overlay
- [ ] Display "Press ESC to Resume"
- [ ] Display "Press R to Restart"
- [ ] Ball and paddle freeze in place

### Technical Notes
- Pause state in game state machine
- Don't update entities while paused
- Semi-transparent overlay

### Files to Create
- `src/ui/PauseScreen.ts`

### Files to Modify
- `index.html` (add screen container)
- `src/Game.ts` (pause logic)

---

## TASK-019: Power-Up Base System
- **Assigned to**: dev1
- **Status**: pending
- **Branch**: feature/task-019-powerup-base
- **Priority**: medium
- **Dependencies**: TASK-011

### Description
Create the power-up entity and spawning system. Power-ups drop from destroyed bricks and fall toward the paddle.

### Acceptance Criteria
- [ ] PowerUp entity that falls downward
- [ ] Different visual for each power-up type
- [ ] Collision detection with paddle
- [ ] Random chance to spawn from bricks (20%)
- [ ] Power-up removed if falls off bottom
- [ ] Event emitted when collected

### Technical Notes
- Power-up types: multiball, wide, slow, laser
- Fall speed: 150 units/second
- Size: 30x15 units
- Random type selection on spawn

### Files to Create
- `src/entities/PowerUp.ts`
- `src/systems/PowerUpSystem.ts`

---

## TASK-020: Power-Up Effects Implementation
- **Assigned to**: dev2
- **Status**: pending
- **Branch**: feature/task-020-powerup-effects
- **Priority**: medium
- **Dependencies**: TASK-019

### Description
Implement the actual effects of each power-up type when collected.

### Acceptance Criteria
- [ ] Wide Paddle: Increase paddle width for 10 seconds
- [ ] Multi-Ball: Spawn 2 additional balls
- [ ] Slow Ball: Reduce ball speed for 8 seconds
- [ ] Active power-ups tracked with timers
- [ ] Visual indicator of active power-ups
- [ ] Power-ups can stack or refresh timer

### Technical Notes
- Wide paddle: 150% normal width
- Slow ball: 60% normal speed
- Multi-ball: Clone current ball with slight angle variance
- Show timer or indicator in HUD

### Files to Modify
- `src/systems/PowerUpSystem.ts`
- `src/entities/Paddle.ts` (width modification)
- `src/entities/Ball.ts` (speed modification)
- `src/ui/HUD.ts` (active power-up display)

---

## TASK-021: Audio Manager
- **Assigned to**: dev5
- **Status**: pending
- **Branch**: feature/task-021-audio
- **Priority**: low
- **Dependencies**: TASK-001

### Description
Create the audio manager using Howler.js to handle all game sound effects.

### Acceptance Criteria
- [ ] Play sound on ball-paddle hit
- [ ] Play sound on ball-brick hit
- [ ] Play sound on brick destroyed
- [ ] Play sound on power-up collected
- [ ] Play sound on life lost
- [ ] Play sound on level complete
- [ ] Play sound on game over
- [ ] Volume control (mute toggle)
- [ ] Use placeholder sounds (generate or free assets)

### Technical Notes
- Use Howler.js for audio playback
- Preload all sounds on game start
- Keep sounds short and retro-style
- Can use Web Audio API to generate simple sounds

### Files to Create
- `src/core/AudioManager.ts`
- `public/sounds/` (placeholder sound files)

---

## TASK-022: Particle Effects
- **Assigned to**: dev3
- **Status**: pending
- **Branch**: feature/task-022-particles
- **Priority**: low
- **Dependencies**: TASK-002

### Description
Create a particle system for visual effects when bricks are destroyed and other events.

### Acceptance Criteria
- [ ] Particle burst when brick destroyed
- [ ] Particles match brick color
- [ ] Particles fade out and disappear
- [ ] Particle count configurable (performance)
- [ ] Small sparkle on ball-paddle hit
- [ ] Efficient particle pooling

### Technical Notes
- Use Three.js Points or small meshes
- Pool and reuse particles
- Limit max particles (100-200)
- Simple physics (velocity + gravity + fade)

### Files to Create
- `src/effects/ParticleSystem.ts`

---

## TASK-023: Screen Shake Effect
- **Assigned to**: dev4
- **Status**: pending
- **Branch**: feature/task-023-screen-shake
- **Priority**: low
- **Dependencies**: TASK-002

### Description
Implement screen shake effect for impactful moments like losing a life.

### Acceptance Criteria
- [ ] Screen shakes when life is lost
- [ ] Shake intensity and duration configurable
- [ ] Smooth shake using perlin noise or sin waves
- [ ] Camera returns to center after shake
- [ ] Optional shake on brick destruction (subtle)

### Technical Notes
- Offset the camera position temporarily
- Use Math.sin with decay for smooth shake
- Duration: 0.3-0.5 seconds for life lost

### Files to Create
- `src/effects/ScreenShake.ts`

### Files to Modify
- `src/core/Camera.ts` (add shake method)

---

## TASK-024: Final Integration and Polish
- **Assigned to**: unassigned
- **Status**: pending
- **Branch**: feature/task-024-integration
- **Priority**: low
- **Dependencies**: All previous tasks

### Description
Final integration testing, bug fixes, and polish. Ensure all systems work together smoothly.

### Acceptance Criteria
- [ ] Complete game loop works start to finish
- [ ] All screens transition correctly
- [ ] No console errors during gameplay
- [ ] Performance is smooth (60 FPS)
- [ ] Game is fun and playable
- [ ] Edge cases handled (multi-ball all lost, etc.)

### Technical Notes
- This is a polish task for final integration
- Focus on feel and responsiveness
- Fix any remaining bugs

### Files to Modify
- Any files needing fixes

---

## Task Summary

| ID | Task | Assignee | Priority | Status |
|----|------|----------|----------|--------|
| 001 | Project Setup | dev1 | high | pending |
| 002 | Core Scene | dev1 | high | pending |
| 003 | Constants & Types | dev2 | high | pending |
| 004 | Input Manager | dev2 | high | pending |
| 005 | Entity Base | dev3 | high | pending |
| 006 | Paddle Entity | dev3 | high | pending |
| 007 | Ball Entity | dev4 | high | pending |
| 008 | Event System | dev4 | high | in-progress |
| 009 | Brick Entity | dev5 | high | pending |
| 010 | Brick Grid | dev5 | high | pending |
| 011 | Collision System | dev1 | high | pending |
| 012 | Game State | dev2 | high | pending |
| 013 | HUD | dev3 | medium | pending |
| 014 | Start Screen | dev3 | medium | pending |
| 015 | Game Over Screen | dev4 | medium | pending |
| 016 | Level Manager | dev5 | medium | pending |
| 017 | Level Complete Screen | dev4 | medium | pending |
| 018 | Pause Screen | dev2 | medium | pending |
| 019 | Power-Up Base | dev1 | medium | pending |
| 020 | Power-Up Effects | dev2 | medium | pending |
| 021 | Audio Manager | dev5 | low | pending |
| 022 | Particle Effects | dev3 | low | pending |
| 023 | Screen Shake | dev4 | low | pending |
| 024 | Final Polish | unassigned | low | pending |

## Developer Assignment Overview

- **dev1**: Project Setup, Core Scene, Collision System, Power-Up Base
- **dev2**: Constants/Types, Input Manager, Game State, Pause, Power-Up Effects
- **dev3**: Entity Base, Paddle, HUD, Start Screen, Particles
- **dev4**: Ball, Event System, Game Over Screen, Level Complete, Screen Shake
- **dev5**: Brick Entity, Brick Grid, Level Manager, Audio Manager
