import { adaptDP } from '@src/hooks/adaptive';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'flex-row': {
    flexDirection: 'row',
  },
  'flex-wrap': {
    flexWrap: 'wrap',
  },
  'flex-0': {
    flex: 0,
  },
  'flex-1': {
    flex: 1,
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-between': {
    justifyContent: 'space-between',
  },
  'justify-around': {
    justifyContent: 'space-around',
  },
  'justify-end': {
    justifyContent: 'flex-end',
  },
  'items-center': {
    alignItems: 'center',
  },
  'items-end': {
    alignItems: 'flex-end',
  },
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  'left-0': {
    left: 0,
  },
  'left-20': {
    left: adaptDP(20),
  },
  'right-0': {
    right: adaptDP(0),
  },
  'right-10': {
    right: adaptDP(10),
  },
  'right-20': {
    right: adaptDP(20),
  },
  'top-0': {
    top: 0,
  },
  'top-20': {
    top: adaptDP(20),
  },
  '-top-5': {
    top: adaptDP(-5),
  },
  '-top-20': {
    top: adaptDP(-20),
  },
  'bottom-20': {
    bottom: adaptDP(20),
  },
  hidden: {
    overflow: 'hidden',
  },
});
