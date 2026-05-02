import React from 'react';
import { FlatList } from 'react-native';
import { ListRow } from '../components/ListRow.js';
import { Screen } from '../components/Screen.js';

export function GameSelectorScreen({ games, selectedGameId, onSelect }) {
  return (
    <Screen title="Select game" subtitle={`${games.length} games loaded from shared core`}>
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListRow
            title={item.name}
            subtitle={`${item.tabCount} setup sections`}
            selected={item.id === selectedGameId}
            onPress={() => onSelect(item)}
          />
        )}
      />
    </Screen>
  );
}
