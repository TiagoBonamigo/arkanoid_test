# Arkanoid Game - Architecture Document

## Technology Stack

### Core
- **Language**: TypeScript (strict mode)
- **3D Engine**: Three.js
- **Build Tool**: Vite
- **Package Manager**: npm

### Additional Libraries
- **Physics**: Custom 2D physics (simple AABB collision detection)
- **Audio**: Howler.js (for sound effects)
- **State Management**: Custom event-driven architecture

## Project Structure

```
arkanoid/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts                 # Entry point
│   ├── Game.ts                 # Main game class, orchestrates everything
│   ├── core/
│   │   ├── Scene.ts            # Three.js scene setup
│   │   ├── Renderer.ts         # Three.js renderer configuration
│   │   ├── Camera.ts           # Camera setup and management
│   │   ├── InputManager.ts     # Keyboard and mouse input handling
│   │   └── AudioManager.ts     # Sound effects management
│   ├── entities/
│   │   ├── Entity.ts           # Base entity class
│   │   ├── Paddle.ts           # Player paddle
│   │   ├── Ball.ts             # Ball with physics
│   │   ├── Brick.ts            # Individual brick
│   │   ├── BrickGrid.ts        # Brick layout manager
│   │   └── PowerUp.ts          # Power-up items
│   ├── systems/
│   │   ├── CollisionSystem.ts  # Collision detection and response
│   │   ├── PhysicsSystem.ts    # Basic physics (velocity, bounds)
│   │   └── PowerUpSystem.ts    # Power-up spawning and effects
│   ├── ui/
│   │   ├── HUD.ts              # Score, lives display
│   │   ├── StartScreen.ts      # Start menu
│   │   ├── GameOverScreen.ts   # Game over screen
│   │   └── PauseScreen.ts      # Pause menu
│   ├── levels/
│   │   ├── LevelManager.ts     # Level loading and progression
│   │   └── levels.ts           # Level data definitions
│   ├── effects/
│   │   ├── ParticleSystem.ts   # Particle effects
│   │   └── ScreenShake.ts      # Screen shake effect
│   ├── types/
│   │   └── index.ts            # Shared TypeScript types/interfaces
│   └── constants/
│       └── index.ts            # Game constants (speeds, sizes, colors)
└── public/
    ├── sounds/                 # Sound effect files
    └── textures/               # Texture files (if any)
```

## Game Architecture

### Main Game Loop
```
┌─────────────────────────────────────────────────────┐
│                    Game.ts                          │
│  ┌───────────────────────────────────────────────┐  │
│  │              Main Loop (60 FPS)               │  │
│  │  1. Process Input                             │  │
│  │  2. Update Physics                            │  │
│  │  3. Check Collisions                          │  │
│  │  4. Update Entities                           │  │
│  │  5. Render Scene                              │  │
│  │  6. Update UI                                 │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Game States
```
StartScreen → Playing → (Paused) → GameOver → StartScreen
                 ↓
            LevelComplete → NextLevel → Playing
```

### Entity Hierarchy
```
Entity (base)
├── Paddle
├── Ball
├── Brick
│   ├── StandardBrick
│   ├── HardBrick (2 hits)
│   └── UnbreakableBrick
└── PowerUp
    ├── MultiBall
    ├── WidePaddle
    ├── LaserPaddle
    └── SlowBall
```

## Coordinate System

- **Origin**: Center of play area
- **X-axis**: Left (-) to Right (+)
- **Y-axis**: Bottom (-) to Top (+)
- **Z-axis**: Into screen (-) to Out of screen (+) - used minimally for layering

### Play Area Dimensions
- Width: 800 units
- Height: 600 units
- Paddle Y position: -250 (near bottom)
- Brick area: Y from 100 to 250 (top portion)

## Collision Detection

Using Axis-Aligned Bounding Box (AABB) for all collisions:
- Ball vs Paddle: Reflect with angle based on hit position
- Ball vs Brick: Reflect and destroy/damage brick
- Ball vs Walls: Simple reflection
- Ball vs Bottom: Lose life

## Event System

Custom event bus for decoupled communication:
- `ball:lost` - Ball went off bottom
- `brick:destroyed` - Brick was destroyed
- `powerup:collected` - Power-up was collected
- `level:complete` - All bricks destroyed
- `game:over` - No lives remaining

## Development Guidelines

1. **Separation of Concerns**: Each file has a single responsibility
2. **No Direct Dependencies**: Use events for cross-system communication
3. **Constants**: All magic numbers go in `constants/index.ts`
4. **Types**: All interfaces/types go in `types/index.ts`
5. **Testing**: Each system should be testable in isolation
