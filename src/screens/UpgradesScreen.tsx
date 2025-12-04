import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useGameStore } from '@/store/gameStore';

const UPGRADE_LABELS: Record<string, string> = {
  attackMultiplier: '攻撃オーラ',
  defenseMultiplier: '黒曜の守り',
  soulGainMultiplier: 'ソウル収穫',
  gemGainMultiplier: '強欲の紋章',
};

export default function UpgradesScreen() {
  const upgrades = useGameStore((s) => s.demonLordUpgrades);
  const resources = useGameStore((s) => s.resources);
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);

  const getUpgradeCost = (multiplier: number) => {
    const base = 20;
    const growth = 2.0;
    const steps = (multiplier - 1) / 0.05;
    return Math.floor(base * Math.pow(growth, steps));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>あなたの強化</Text>
      <Text style={styles.subtitle}>
        ジェムを消費して、あなたの力を高めます。すべてのブレインロットに効果があります。
      </Text>

      <View style={styles.resourcesCard}>
        <Text style={styles.resourcesText}>ソウル: {resources.souls.toLocaleString()}</Text>
        <Text style={styles.resourcesText}>ジェム: {resources.gems.toLocaleString()}</Text>
      </View>

      {Object.entries(upgrades).map(([key, value]) => {
        const typedKey = key as keyof typeof upgrades;
        const cost = getUpgradeCost(value);
        const canBuy = resources.gems >= cost;

        return (
          <View key={key} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.upgradeName}>{UPGRADE_LABELS[key] ?? key}</Text>
              <Text style={styles.level}>x{value.toFixed(2)}</Text>
            </View>
            <Text style={styles.description}>
              {key === 'attackMultiplier' && 'パーティ全体の攻撃力を上昇させる。'}
              {key === 'defenseMultiplier' && 'パーティ全体の防御力を上昇させる。'}
              {key === 'soulGainMultiplier' && '各フロアで獲得できるソウルが増加する。'}
              {key === 'gemGainMultiplier' && '各フロアで獲得できるジェムが増加する。'}
            </Text>

            <TouchableOpacity
              style={[styles.button, !canBuy && styles.buttonDisabled]}
              disabled={!canBuy}
              onPress={() => buyUpgrade(typedKey)}
            >
              <Text style={styles.buttonText}>強化（{cost} ジェム）</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05030A',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  contentContainer: {
    paddingBottom: 32,
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
  resourcesCard: {
    backgroundColor: '#120a1f',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#241133',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourcesText: {
    fontSize: 13,
    color: '#e7dbff',
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
  upgradeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  level: {
    fontSize: 14,
    color: '#c7b7dd',
  },
  description: {
    fontSize: 13,
    color: '#c7b7dd',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#e945ff',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#1b071f',
    fontWeight: '700',
    fontSize: 14,
  },
});
