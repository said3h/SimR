import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen.js';
import { colors, spacing } from '../theme.js';

export function DashboardScreen({ selectedGame, selectedCar, selectedCircuit, stats, onNavigate }) {
  return (
    <Screen
      title="SimRacing Vault"
      subtitle="Native Expo shell validating the shared core catalogs."
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statsGrid}>
          <StatCard label="Games" value={stats.games} />
          <StatCard label="Cars" value={stats.cars} />
          <StatCard label="Circuits" value={stats.circuits} />
        </View>

        <View style={styles.selectionPanel}>
          <SelectionLine label="Game" value={selectedGame?.name || 'Not selected'} />
          <SelectionLine label="Car" value={selectedCar?.name || 'Not selected'} />
          <SelectionLine label="Circuit" value={selectedCircuit?.name || 'Not selected'} />
        </View>

        <NavButton title="Select game" onPress={() => onNavigate('game')} />
        <NavButton title="Select car" onPress={() => onNavigate('car')} disabled={!selectedGame} />
        <NavButton title="Select circuit" onPress={() => onNavigate('circuit')} disabled={!selectedGame} />
      </ScrollView>
    </Screen>
  );
}

function StatCard({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SelectionLine({ label, value }) {
  return (
    <View style={styles.selectionLine}>
      <Text style={styles.selectionLabel}>{label}</Text>
      <Text style={styles.selectionValue}>{value}</Text>
    </View>
  );
}

function NavButton({ title, onPress, disabled }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && styles.buttonPressed
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.panel,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md
  },
  statValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800'
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4
  },
  selectionPanel: {
    backgroundColor: colors.panel,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg
  },
  selectionLine: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  selectionLabel: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  selectionValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700'
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  buttonDisabled: {
    backgroundColor: colors.panelAlt
  },
  buttonPressed: {
    opacity: 0.8
  },
  buttonText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 16
  }
});
