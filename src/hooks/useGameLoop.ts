import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useGameStore } from '@/store/gameStore';

export function useGameLoop() {
  const processTime = useGameStore((s) => s.processTime);
  const touch = useGameStore((s) => s.touch);

  // On mount, run offline catchup once
  useEffect(() => {
    touch();
  }, [touch]);

  // In-app loop: advance time at a steady rate (1s per tick)
  useEffect(() => {
    const interval = setInterval(() => {
      processTime(1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [processTime]);

  // When app returns to foreground, run offline catchup once
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        touch();
      }
    });

    return () => {
      sub.remove();
    };
  }, [touch]);
}
