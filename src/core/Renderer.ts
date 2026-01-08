import * as THREE from 'three';

/**
 * Game renderer wrapper that manages the Three.js WebGL renderer
 */
export class GameRenderer {
    private renderer: THREE.WebGLRenderer;
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.updateSize();

        container.appendChild(this.renderer.domElement);

        // Handle window resize
        window.addEventListener('resize', this.handleResize);
    }

    private handleResize = (): void => {
        this.updateSize();
    };

    private updateSize(): void {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.renderer.setSize(width, height);
    }

    /**
     * Get the current renderer size
     */
    getSize(): { width: number; height: number } {
        const size = new THREE.Vector2();
        this.renderer.getSize(size);
        return { width: size.x, height: size.y };
    }

    /**
     * Render the scene with the given camera
     */
    render(scene: THREE.Scene, camera: THREE.Camera): void {
        this.renderer.render(scene, camera);
    }

    /**
     * Get the canvas element
     */
    getCanvas(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    /**
     * Clean up resources
     */
    dispose(): void {
        window.removeEventListener('resize', this.handleResize);
        this.renderer.dispose();
        this.container.removeChild(this.renderer.domElement);
    }
}
