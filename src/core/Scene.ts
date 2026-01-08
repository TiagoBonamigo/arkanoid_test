import * as THREE from 'three';

/**
 * Game scene wrapper that manages the Three.js scene
 */
export class GameScene {
    private scene: THREE.Scene;

    constructor() {
        this.scene = new THREE.Scene();
        // Dark blue/purple background for arcade feel
        this.scene.background = new THREE.Color(0x0a0a2e);
    }

    /**
     * Get the underlying Three.js scene
     */
    getScene(): THREE.Scene {
        return this.scene;
    }

    /**
     * Add an object to the scene
     */
    add(object: THREE.Object3D): void {
        this.scene.add(object);
    }

    /**
     * Remove an object from the scene
     */
    remove(object: THREE.Object3D): void {
        this.scene.remove(object);
    }

    /**
     * Clear all objects from the scene (except background)
     */
    clear(): void {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]!);
        }
    }
}
