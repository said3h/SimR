import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DashboardScreen } from './src/screens/DashboardScreen.js';
import { GameSelectorScreen } from './src/screens/GameSelectorScreen.js';
import { CarSelectorScreen } from './src/screens/CarSelectorScreen.js';
import { CircuitSelectorScreen } from './src/screens/CircuitSelectorScreen.js';
import { getCarsForGame, getCatalogStats, getCircuitsForGame, getGames } from './src/coreData.js';
import { colors, spacing } from './src/theme.js';

export default function App() {
  const games = useMemo(() => getGames(), []);
  const [screen, setScreen] = useState('dashboard');
  const [selectedGame, setSelectedGame] = useState(games[0] || null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);

  const cars = useMemo(
    () => selectedGame ? getCarsForGame(selectedGame.id) : [],
    [selectedGame]
  );

  const circuits = useMemo(
    () => selectedGame ? getCircuitsForGame(selectedGame.id) : [],
    [selectedGame]
  );

  const stats = useMemo(
    () => getCatalogStats(selectedGame?.id),
    [selectedGame]
  );

  function selectGame(game) {
    setSelectedGame(game);
    setSelectedCar(null);
    setSelectedCircuit(null);
    setScreen('dashboard');
  }

  function selectCar(car) {
    setSelectedCar(car);
    setScreen('dashboard');
  }

  function selectCircuit(circuit) {
    setSelectedCircuit(circuit);
    setScreen('dashboard');
  }

  return (
    <View style={styles.root}>
      {screen !== 'dashboard' ? (
        <Pressable style={styles.backButton} onPress={() => setScreen('dashboard')}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      ) : null}

      {screen === 'dashboard' ? (
        <DashboardScreen
          selectedGame={selectedGame}
          selectedCar={selectedCar}
          selectedCircuit={selectedCircuit}
          stats={stats}
          onNavigate={setScreen}
        />
      ) : null}

      {screen === 'game' ? (
        <GameSelectorScreen
          games={games}
          selectedGameId={selectedGame?.id}
          onSelect={selectGame}
        />
      ) : null}

      {screen === 'car' && selectedGame ? (
        <CarSelectorScreen
          game={selectedGame}
          cars={cars}
          selectedCarId={selectedCar?.id}
          onSelect={selectCar}
        />
      ) : null}

      {screen === 'circuit' && selectedGame ? (
        <CircuitSelectorScreen
          game={selectedGame}
          circuits={circuits}
          selectedCircuitId={selectedCircuit?.id}
          onSelect={selectCircuit}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  backText: {
    color: colors.text,
    fontWeight: '800'
  }
});
