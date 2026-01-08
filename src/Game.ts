import { GameScene } from './core/Scene';
import { GameRenderer } from './core/Renderer';
import { GameCamera } from './core/Camera';

/**
 * Main game class that manages the game loop and core systems
 */
export class Game {
    private scene: GameScene;
    private renderer: GameRenderer;
    private camera: GameCamera;
    private container: HTMLElement;

    private isRunning: boolean = false;
    private lastTime: number = 0;
    private animationFrameId: number = 0;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container element with id "${containerId}" not found`);
        }
        this.container = container;

        // Initialize core systems
        this.scene = new GameScene();
        this.renderer = new GameRenderer(this.container);
        this.camera = new GameCamera(this.container);
    }

    /**
     * Start the game loop
     */
    start(): void {
        if (this.isRunning) return;

        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop();
    }

    /**
     * Stop the game loop
     */
    stop(): void {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = 0;
        }
    }

    /**
     * Main game loop using requestAnimationFrame
     */
    private loop = (): void => {
        if (!this.isRunning) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        // Cap delta time to prevent spiral of death
        const cappedDelta = Math.min(deltaTime, 0.1);

        // Update game logic
        this.update(cappedDelta);

        // Render the scene
        this.render();

        // Schedule next frame
        this.animationFrameId = requestAnimationFrame(this.loop);
    };

    /**
     * Update game logic
     * @param _delta - Time elapsed since last frame in seconds
     */
    private update(_delta: number): void {
        // Game update logic will go here
        // Entities, collision detection, etc.
    }

    /**
     * Render the scene
     */
    private render(): void {
        this.renderer.render(
            this.scene.getScene(),
            this.camera.getCamera()
        );
    }

    /**
     * Get the game scene for adding entities
     */
    getScene(): GameScene {
        return this.scene;
    }

    /**
     * Get the game camera
     */
    getCamera(): GameCamera {
        return this.camera;
    }

    /**
     * Check if the game is currently running
     */
    getIsRunning(): boolean {
        return this.isRunning;
    }

    /**
     * Clean up all resources
     */
    dispose(): void {
        this.stop();
        this.renderer.dispose();
        this.camera.dispose();
        this.scene.clear();
    }
}
