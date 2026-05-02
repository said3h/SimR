import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListRow } from '../components/ListRow.js';
import { Screen } from '../components/Screen.js';
import { colors } from '../theme.js';

export function CircuitSelectorScreen({ game, circuits, selectedCircuitId, onSelect }) {
  return (
    <Screen title="Select circuit" subtitle={`${circuits.length} circuits loaded for ${game.name}`}>
      <FlatList
        data={circuits}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={{ color: colors.muted }}>No circuits available for this game yet.</Text>}
        renderItem={({ item }) => (
          <ListRow
            title={item.name}
            subtitle={item.class || 'Circuit'}
            selected={item.id === selectedCircuitId}
            onPress={() => onSelect(item)}
          />
        )}
      />
    </Screen>
  );
}
