import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListRow } from '../components/ListRow.js';
import { Screen } from '../components/Screen.js';
import { colors } from '../theme.js';

export function CarSelectorScreen({ game, cars, selectedCarId, onSelect }) {
  return (
    <Screen title="Select car" subtitle={`${cars.length} cars loaded for ${game.name}`}>
      <FlatList
        data={cars}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={{ color: colors.muted }}>No cars available for this game yet.</Text>}
        renderItem={({ item }) => (
          <ListRow
            title={item.name}
            subtitle={item.class || 'Unclassified'}
            selected={item.id === selectedCarId}
            onPress={() => onSelect(item)}
          />
        )}
      />
    </Screen>
  );
}
