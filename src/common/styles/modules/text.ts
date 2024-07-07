import { adaptDP } from '@src/hooks/adaptive';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'text-10': {
    fontSize: adaptDP(10),
  },
  'text-12': {
    fontSize: adaptDP(12),
  },
  'text-14': {
    fontSize: adaptDP(14),
  },
  'text-16': {
    fontSize: adaptDP(16),
  },
  'text-20': {
    fontSize: adaptDP(20),
  },
  'text-40': {
    fontSize: adaptDP(40),
  },
  'weight-700': {
    fontWeight: '700',
  },
  'weight-900': {
    fontWeight: '900',
  },
  'text-center': {
    textAlign: 'center',
  },
});
