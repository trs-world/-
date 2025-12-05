import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useGameStore } from '@/store/gameStore';
import { Demon } from '@/models/game';

function getRarityColor(rarity: Demon['rarity']): string {
  switch (rarity) {
    case 'legendary':
      return '#ffd700';
    case 'epic':
      return '#c77dff';
    case 'rare':
      return '#4dabf7';
    default:
      return '#e0e0e0';
  }
}

const demonImages: Record<string, any> = {
  'udindindindun-attacker': require('../../assets/ウディンディンディンドゥン.png'),
  'espresso-signora-support': require('../../assets/エスプレッソ・シニョーラ.png'),
  'cappucina-ballerina-attacker': require('../../assets/カプチーナ・バレリーナ.png'),
  'cappucino-assassino-attacker': require('../../assets/カプチーノ・アサシーノ.png'),
  'karkelkar-kurukuru-support': require('../../assets/カーケルカール・クルクル.png'),
  'strawberry-elephant-tank': require('../../assets/ストロベリーエレファント.png'),
  'tatatata-sahool-farmer': require('../../assets/タタタタ・サフール.png'),
  'tetetete-sahool-farmer': require('../../assets/テテテテ・サフール.png'),
  'tuntuntun-sahool-farmer': require('../../assets/トゥントゥントゥンサフール.png'),
  'trarara-tralalero-attacker': require('../../assets/トラララ・トララレロ.png'),
  'bulbaroni-rurirori-support': require('../../assets/ブルバロ二・ルリロリ.png'),
  'bulbul-patapim-attacker': require('../../assets/ブルブル・パタピム.png'),
  'bott-hotspot-support': require('../../assets/ボット・ホットスポット.png'),
  'bombardiro-kurodiro-attacker': require('../../assets/ボンバルディロ・クロコディロ.png'),
  'motor-sahool-tank': require('../../assets/モーター・サフール.png'),
  'chimpanzini-bananini-attacker': require('../../assets/チンパンジー二・バナニーニ.png'),
  'la-vaca-saturno-support': require('../../assets/ラ・ヴァカ・サトゥルノ・サトゥルニータ.png'),
  'ririri-rarira-support': require('../../assets/リリリ・ラリラ.png'),
  'frigo-camelo-attacker': require('../../assets/フリゴ・カメロ.png'),
  'il-cacto-hipopotamo-tank': require('../../assets/イル・カクト・ヒポポタモ.png'),
  'grolbo-fruttodrillo-attacker': require('../../assets/グロルボ・フルットドリロ.png'),
  'jiraffa-celeste-viaggioagreste-support': require('../../assets/ジラッファチェレステ・ヴィアッジョアグレステ.png'),
  'trippi-troppi-attacker': require('../../assets/トリッピ・トロッピ.png'),
  'bri-bri-bix-dix-bombix-support': require('../../assets/ブリ・ブリ・ビクス・ディクス・ボンビクス.png'),
  'bonbonbini-guzzini-attacker': require('../../assets/ボンボンビー二・グジーニ.png'),
  'rhino-toasterino-tank': require('../../assets/ライノ・トーステリーノ.png'),
  'orangutini-ananassini-attacker': require('../../assets/オランギュティーニ・アナナシーニ.png'),
  'cocophant-elephant-tank': require('../../assets/ココファント・エレファント.png'),
  'goriro-watermelondrillo-attacker': require('../../assets/ゴリロ・ウォーターメロンドリロ.png'),
  'sigma-boy-support': require('../../assets/シグマボーイ.png'),
  'teaglorigre-fruttoni-attacker': require('../../assets/ティーグロリーグレ・フルトーニ.png'),
  'tracotukutul-delaperadustuz-attacker': require('../../assets/トラコトゥコトゥル・デラペラドゥストゥズ.png'),
  'bananita-dolfinita-support': require('../../assets/バナニータ・ドルフィニータ.png'),
  'blueberrini-octopussini-attacker': require('../../assets/ブルーベリーニ・オクトプッシーニ.png'),
  'pussini-sussini-support': require('../../assets/プッシーニ・スッシーニ.png'),
  'rakkooni-watermelni-attacker': require('../../assets/ラッコオニ・ウォーターメルニ.png'),
  'svinino-bombondino-attacker': require('../../assets/スヴィニーノ・ボンボンディーノ.png'),
  'cococcini-mama-support': require('../../assets/ココッシニ・ママ.png'),
  'perochello-lemonchello-attacker': require('../../assets/ペロケッロ・レモンチェッロ.png'),
  'ballerino-lololo-attacker': require('../../assets/バレリーノ・ロロロ.png'),
  'pipistrawberry-support': require('../../assets/ピピストロベリー.png'),
  'spaghetti-toiletti-attacker': require('../../assets/スパゲッティ・トゥアレッティ.png'),
  'ganganzeli-torlala-support': require('../../assets/ガンガンツェリ・トルララ.png'),
  'shupionilo-gorvilo-attacker': require('../../assets/シュピオニロ・ゴルビロ.png'),
  'torlimelo-torlicina-support': require('../../assets/トルリメロ・トルリチナ.png'),
  'ampari-babbel-support': require('../../assets/アンパリ・バッベル.png'),
  'canneloni-dragoni-attacker': require('../../assets/カネロニ・ドラゴーニ.png'),
  'kiwitt-bandit-attacker': require('../../assets/キウィット・バンディット.png'),
  'kudanire-astronaut-support': require('../../assets/クダニレ・アストロノート.png'),
  'ketupat-kepat-prekpat-tank': require('../../assets/ケトゥパト・ケパト・プレクパト.png'),
  'bururu-es-te-patipum-attacker': require('../../assets/ブルル・エス・テー・パティプム.png'),
  'mateo-attacker': require('../../assets/マテーオ.png'),
  'mangorini-palloccini-support': require('../../assets/マンゴリ二・パッロチ二.png'),
  'bullu-bullu-gangster-guzzini-attacker': require('../../assets/ブッル・ブッル・ガングステル・グシニ.png'),
  'bluebellini-tatticini-support': require('../../assets/ブルエベッリニ・タッティチニ.png'),
  'leonelli-cactaseri-tank': require('../../assets/レオネッリ・カクタセリ.png'),
};

export default function DemonsScreen() {
  const demons = useGameStore((s) => s.demons);
  const resources = useGameStore((s) => s.resources);
  const levelUpDemon = useGameStore((s) => s.levelUpDemon);
  const togglePartyStatus = useGameStore((s) => s.togglePartyStatus);

  const [rarityFilter, setRarityFilter] = useState<
    'all' | 'common' | 'rare' | 'epic' | 'legendary'
  >('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredDemons =
    rarityFilter === 'all'
      ? demons
      : demons.filter((demon) => demon.rarity === rarityFilter);

  const renderItem = ({ item }: { item: Demon }) => {
    const soulCost = Math.floor(10 * Math.pow(1.35, item.level - 1));
    const inParty = item.isInParty;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.demonHeaderLeft}>
            <Image
              source={demonImages[item.id]}
              style={styles.demonImage}
              resizeMode="contain"
            />
            <Text style={styles.demonName}>{item.name}</Text>
          </View>
          <Text style={[styles.rarity, { color: getRarityColor(item.rarity) }]}>
            {item.rarity.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.stat}>Lv. {item.level}</Text>
        <Text style={styles.stat}>ロール: {item.role}</Text>
        <Text style={styles.stat}>
          攻撃 {item.baseAttack} | 防御 {item.baseDefense} | 速度 {item.baseSpeed}
        </Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.button,
              resources.souls < soulCost && styles.buttonDisabled,
            ]}
            disabled={resources.souls < soulCost}
            onPress={() => levelUpDemon(item.id)}
          >
            <Text style={styles.buttonText}>レベルアップ（{soulCost} ソウル）</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              inParty ? styles.buttonSecondary : styles.buttonPrimary,
            ]}
            onPress={() => togglePartyStatus(item.id)}
          >
            <Text style={styles.buttonText}>{inParty ? 'パーティから外す' : 'パーティに入れる'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>パーティー</Text>
      <Text style={styles.subtitle}>
        ソウルを消費してブレインロットを強化し、パーティーメンバーを選びましょう。
      </Text>

      <View style={styles.topRow}>
        <View style={styles.resourcesColumn}>
          <Text style={styles.resource}>ソウル: {resources.souls.toLocaleString()}</Text>
          <Text style={styles.resource}>ジェム: {resources.gems.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterOpen((prev) => !prev)}
        >
          <Text style={styles.filterButtonText}>
            絞り込み{rarityFilter !== 'all' ? `: ${rarityFilter.toUpperCase()}` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {isFilterOpen && (
        <View style={styles.filterRow}>
          {[
            { key: 'all', label: 'すべて' },
            { key: 'common', label: 'N' },
            { key: 'rare', label: 'R' },
            { key: 'epic', label: 'SR' },
            { key: 'legendary', label: 'SSR' },
          ].map((f) => {
            const isActive = rarityFilter === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setRarityFilter(f.key as typeof rarityFilter)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <FlatList
        data={filteredDemons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05030A',
    paddingHorizontal: 16,
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  resourcesColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  resource: {
    fontSize: 13,
    color: '#e7dbff',
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 32,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#3b203f',
    backgroundColor: '#120a1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#fef5ff',
    fontSize: 12,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 6,
  },
  filterChip: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#3b203f',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#120a1f',
  },
  filterChipActive: {
    backgroundColor: '#5f3dd9',
    borderColor: '#a78bfa',
  },
  filterChipText: {
    fontSize: 11,
    color: '#c7b7dd',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fef5ff',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#120a1f',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#241133',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  demonHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demonName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  demonImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 8,
  },
  rarity: {
    fontSize: 12,
    fontWeight: '700',
  },
  stat: {
    fontSize: 13,
    color: '#c7b7dd',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a163d',
  },
  buttonPrimary: {
    backgroundColor: '#5f3dd9',
  },
  buttonSecondary: {
    backgroundColor: '#8f2b5a',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#fef5ff',
    fontSize: 12,
    fontWeight: '600',
  },
});
