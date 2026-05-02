import { GAME_TEMPLATES } from '../../src/core/templates.js';
import { GAME_CARS } from '../../src/core/cars.js';
import { GAME_CIRCUITS } from '../../src/core/circuits.js';

export function getGames() {
  return GAME_TEMPLATES.map(game => ({
    id: game.id,
    name: game.name,
    tabCount: Array.isArray(game.tabs) ? game.tabs.length : 0
  }));
}

export function getCarsForGame(gameId) {
  return GAME_CARS[gameId] || [];
}

export function getCircuitsForGame(gameId) {
  return GAME_CIRCUITS[gameId] || [];
}

export function getCatalogStats(gameId) {
  return {
    games: GAME_TEMPLATES.length,
    cars: getCarsForGame(gameId).length,
    circuits: getCircuitsForGame(gameId).length
  };
}
