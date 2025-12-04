import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useGameStore } from '@/store/gameStore';
import { Demon } from '@/models/game';

const zukanImages: Record<string, any> = {
  'ウディンディンディンドゥン': require('../../assets/ウディンディンディンドゥン.png'),
  'エスプレッソ・シニョーラ': require('../../assets/エスプレッソ・シニョーラ.png'),
  'カプチーナ・バレリーナ': require('../../assets/カプチーナ・バレリーナ.png'),
  'カプチーノ・アサシーノ': require('../../assets/カプチーノ・アサシーノ.png'),
  'カーケルカール・クルクル': require('../../assets/カーケルカール・クルクル.png'),
  'ストロベリーエレファント': require('../../assets/ストロベリーエレファント.png'),
  'タタタタ・サフール': require('../../assets/タタタタ・サフール.png'),
  'テテテテ・サフール': require('../../assets/テテテテ・サフール.png'),
  'トゥントゥントゥンサフール': require('../../assets/トゥントゥントゥンサフール_.png'),
  'トラララ・トララレロ': require('../../assets/トラララ・トララレロ.png'),
  'ブルバロ二・ルリロリ': require('../../assets/ブルバロ二・ルリロリ.png'),
  'ブルブル・パタピム': require('../../assets/ブルブル・パタピム.png'),
  'ボット・ホットスポット': require('../../assets/ボット・ホットスポット.png'),
  'ボンバルディロ・クロディロ': require('../../assets/ボンバルディロ・クロディロ.png'),
  'モーター・サフール': require('../../assets/モーター・サフール.png'),
  'ラ・ヴァカ・サトゥルノ・サトゥルニータ': require('../../assets/ラ・ヴァカ・サトゥルノ・サトゥルニータ.png'),
  'リリリ・ラリラ': require('../../assets/リリリ・ラリラ.png'),
};

export default function SettingsScreen() {
  const demons = useGameStore((s) => s.demons);

  const renderItem = ({ item }: { item: Demon }) => {
    const source = zukanImages[item.name] ?? require('../../assets/hatena.png');

    return (
      <View style={styles.gridItem}>
        <Image source={source} style={styles.demonImage} resizeMode="contain" />
        <Text style={styles.demonName} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>図鑑</Text>
      <Text style={styles.subtitle}>集めたブレインロットたち</Text>

      <FlatList
        data={demons}
        keyExtractor={(item) => item.id}
        numColumns={4}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05030A',
    paddingHorizontal: 12,
    paddingTop: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FDE7FF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#b4a0c8',
    textAlign: 'center',
    marginBottom: 16,
  },
  grid: {
    paddingBottom: 24,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  demonImage: {
    width: 56,
    height: 56,
    marginBottom: 4,
    borderRadius: 8,
  },
  demonName: {
    fontSize: 10,
    color: '#fef5ff',
    textAlign: 'center',
  },
});
