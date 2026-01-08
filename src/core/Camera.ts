import * as THREE from 'three';

// Game play area dimensions in game units
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

/**
 * Orthographic camera for 2D gameplay
 * Shows coordinates from -400 to 400 (X) and -300 to 300 (Y)
 */
export class GameCamera {
    private camera: THREE.OrthographicCamera;
    private container: HTMLElement;
    private shakeOffset: THREE.Vector2 = new THREE.Vector2(0, 0);
    private basePosition: THREE.Vector3;

    constructor(container: HTMLElement) {
        this.container = container;

        // Create orthographic camera with game dimensions
        // Centered at origin, so left=-400, right=400, top=300, bottom=-300
        this.camera = new THREE.OrthographicCamera(
            -GAME_WIDTH / 2,   // left
            GAME_WIDTH / 2,    // right
            GAME_HEIGHT / 2,   // top
            -GAME_HEIGHT / 2,  // bottom
            0.1,               // near
            1000               // far
        );

        // Position camera looking down at the XY plane
        this.camera.position.set(0, 0, 500);
        this.camera.lookAt(0, 0, 0);
        this.basePosition = this.camera.position.clone();

        // Handle window resize to maintain aspect ratio with letterboxing
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    private handleResize = (): void => {
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;
        const gameAspect = GAME_WIDTH / GAME_HEIGHT;
        const containerAspect = containerWidth / containerHeight;

        if (containerAspect > gameAspect) {
            // Container is wider than game - letterbox on sides
            const visibleWidth = GAME_HEIGHT * containerAspect;
            this.camera.left = -visibleWidth / 2;
            this.camera.right = visibleWidth / 2;
            this.camera.top = GAME_HEIGHT / 2;
            this.camera.bottom = -GAME_HEIGHT / 2;
        } else {
            // Container is taller than game - letterbox on top/bottom
            const visibleHeight = GAME_WIDTH / containerAspect;
            this.camera.left = -GAME_WIDTH / 2;
            this.camera.right = GAME_WIDTH / 2;
            this.camera.top = visibleHeight / 2;
            this.camera.bottom = -visibleHeight / 2;
        }

        this.camera.updateProjectionMatrix();
    };

    /**
     * Get the underlying Three.js camera
     */
    getCamera(): THREE.OrthographicCamera {
        return this.camera;
    }

    /**
     * Apply a shake offset to the camera (for screen shake effect)
     */
    setShakeOffset(x: number, y: number): void {
        this.shakeOffset.set(x, y);
        this.camera.position.x = this.basePosition.x + this.shakeOffset.x;
        this.camera.position.y = this.basePosition.y + this.shakeOffset.y;
    }

    /**
     * Reset shake offset
     */
    resetShake(): void {
        this.setShakeOffset(0, 0);
    }

    /**
     * Convert screen coordinates to game coordinates
     */
    screenToGame(screenX: number, screenY: number): THREE.Vector2 {
        const rect = this.container.getBoundingClientRect();
        const ndcX = ((screenX - rect.left) / rect.width) * 2 - 1;
        const ndcY = -((screenY - rect.top) / rect.height) * 2 + 1;

        const gameX = ndcX * (this.camera.right - this.camera.left) / 2;
        const gameY = ndcY * (this.camera.top - this.camera.bottom) / 2;

        return new THREE.Vector2(gameX, gameY);
    }

    /**
     * Clean up resources
     */
    dispose(): void {
        window.removeEventListener('resize', this.handleResize);
    }
}
