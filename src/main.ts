import { Game } from './Game';

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game('game-container');
    game.start();

    // Expose game instance for debugging (remove in production)
    (window as unknown as { game: Game }).game = game;
});
