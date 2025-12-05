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
  'トゥントゥントゥン・サフール': require('../../assets/トゥントゥントゥンサフール.png'),
  'トラララ・トララレロ': require('../../assets/トラララ・トララレロ.png'),
  'ブルバロ二・ルリロリ': require('../../assets/ブルバロ二・ルリロリ.png'),
  'ブルブル・パタピム': require('../../assets/ブルブル・パタピム.png'),
  'ボット・ホットスポット': require('../../assets/ボット・ホットスポット.png'),
  'ボンバルディロ・クロコディロ': require('../../assets/ボンバルディロ・クロコディロ.png'),
  'モーター・サフール': require('../../assets/モーター・サフール.png'),
  'ラ・ヴァカ・サトゥルノ・サトゥルニータ': require('../../assets/ラ・ヴァカ・サトゥルノ・サトゥルニータ.png'),
  'リリリ・ラリラ': require('../../assets/リリリ・ラリラ.png'),
  'チンパンジー二・バナニーニ': require('../../assets/チンパンジー二・バナニーニ.png'),
  'フリゴ・カメロ': require('../../assets/フリゴ・カメロ.png'),
  'イル・カクト・ヒポポタモ': require('../../assets/イル・カクト・ヒポポタモ.png'),
  'グロルボ・フルットドリロ': require('../../assets/グロルボ・フルットドリロ.png'),
  'ジラッファチェレステ・ヴィアッジョアグレステ': require('../../assets/ジラッファチェレステ・ヴィアッジョアグレステ.png'),
  'トリッピ・トロッピ': require('../../assets/トリッピ・トロッピ.png'),
  'ブリ・ブリ・ビクス・ディクス・ボンビクス': require('../../assets/ブリ・ブリ・ビクス・ディクス・ボンビクス.png'),
  'ボンボンビー二・グジーニ': require('../../assets/ボンボンビー二・グジーニ.png'),
  'ライノ・トーステリーノ': require('../../assets/ライノ・トーステリーノ.png'),
  'オランギュティーニ・アナナシーニ': require('../../assets/オランギュティーニ・アナナシーニ.png'),
  'ココファント・エレファント': require('../../assets/ココファント・エレファント.png'),
  'ゴリロ・ウォーターメロンドリロ': require('../../assets/ゴリロ・ウォーターメロンドリロ.png'),
  'シグマボーイ': require('../../assets/シグマボーイ.png'),
  'ティーグロリーグレ・フルトーニ': require('../../assets/ティーグロリーグレ・フルトーニ.png'),
  'トラコトゥコトゥル・デラペラドゥストゥズ': require('../../assets/トラコトゥコトゥル・デラペラドゥストゥズ.png'),
  'バナニータ・ドルフィニータ': require('../../assets/バナニータ・ドルフィニータ.png'),
  'ブルーベリーニ・オクトプッシーニ': require('../../assets/ブルーベリーニ・オクトプッシーニ.png'),
  'プッシーニ・スッシーニ': require('../../assets/プッシーニ・スッシーニ.png'),
  'ラッコオニ・ウォーターメルニ': require('../../assets/ラッコオニ・ウォーターメルニ.png'),
  'スヴィニーノ・ボンボンディーノ': require('../../assets/スヴィニーノ・ボンボンディーノ.png'),
  'ココッシニ・ママ': require('../../assets/ココッシニ・ママ.png'),
  'ペロケッロ・レモンチェッロ': require('../../assets/ペロケッロ・レモンチェッロ.png'),
  'バレリーノ・ロロロ': require('../../assets/バレリーノ・ロロロ.png'),
  'ピピストロベリー': require('../../assets/ピピストロベリー.png'),
  'スパゲッティ・トゥアレッティ': require('../../assets/スパゲッティ・トゥアレッティ.png'),
  'ガンガンツェリ・トルララ': require('../../assets/ガンガンツェリ・トルララ.png'),
  'シュピオニロ・ゴルビロ': require('../../assets/シュピオニロ・ゴルビロ.png'),
  'トルリメロ・トルリチナ': require('../../assets/トルリメロ・トルリチナ.png'),
  'アンパリ・バッベル': require('../../assets/アンパリ・バッベル.png'),
  'カネロニ・ドラゴーニ': require('../../assets/カネロニ・ドラゴーニ.png'),
  'キウィット・バンディット': require('../../assets/キウィット・バンディット.png'),
  'クダニレ・アストロノート': require('../../assets/クダニレ・アストロノート.png'),
  'ケトゥパト・ケパト・プレクパト': require('../../assets/ケトゥパト・ケパト・プレクパト.png'),
  'ブルル・エス・テー・パティプム': require('../../assets/ブルル・エス・テー・パティプム.png'),
  'マテーオ': require('../../assets/マテーオ.png'),
  'マンゴリ二・パッロチ二': require('../../assets/マンゴリ二・パッロチ二.png'),
  'ブッル・ブッル・ガングステル・グシニ': require('../../assets/ブッル・ブッル・ガングステル・グシニ.png'),
  'ブルエベッリニ・タッティチニ': require('../../assets/ブルエベッリニ・タッティチニ.png'),
  'レオネッリ・カクタセリ': require('../../assets/レオネッリ・カクタセリ.png'),
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
