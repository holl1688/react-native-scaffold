import { adaptDP } from '@src/hooks/adaptive';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  border: {
    borderWidth: 1,
  },
  'border-2': {
    borderWidth: 2,
  },
  'border-bottom-0': {
    borderBottomWidth: 0,
  },
  'border-bottom-1': {
    borderBottomWidth: 1,
  },
  'm-10': {
    margin: adaptDP(10),
  },
  'mt-10': {
    marginTop: adaptDP(10),
  },
  'mt-20': {
    marginTop: adaptDP(20),
  },
  'mt-40': {
    marginTop: adaptDP(40),
  },
  'mt-130': {
    marginTop: adaptDP(130),
  },
  '-mt-30': {
    marginTop: adaptDP(-30),
  },
  'mb-20': {
    marginBottom: adaptDP(20),
  },
  'ml-10': {
    marginLeft: adaptDP(10),
  },
  'ml-15': {
    marginLeft: adaptDP(15),
  },
  'ml-20': {
    marginLeft: adaptDP(20),
  },
  'mr-5': {
    marginRight: adaptDP(5),
  },
  'mr-10': {
    marginRight: adaptDP(10),
  },
  'mx-3': {
    marginHorizontal: adaptDP(3),
  },
  'mx-5': {
    marginHorizontal: adaptDP(5),
  },
  'mx-10': {
    marginHorizontal: adaptDP(10),
  },
  'my-10': {
    marginVertical: adaptDP(10),
  },
  'my-30': {
    marginVertical: adaptDP(30),
  },
  'p-3': {
    padding: adaptDP(3),
  },
  'p-5': {
    padding: adaptDP(5),
  },
  'p-10': {
    padding: adaptDP(10),
  },
  'p-20': {
    padding: adaptDP(20),
  },
  'pt-10': {
    paddingTop: adaptDP(10),
  },
  'pt-20': {
    paddingTop: adaptDP(20),
  },
  'pb-10': {
    paddingBottom: adaptDP(10),
  },
  'pl-5': {
    paddingLeft: adaptDP(5),
  },
  'pl-10': {
    paddingLeft: adaptDP(10),
  },
  'pr-3': {
    paddingRight: adaptDP(3),
  },
  'pr-10': {
    paddingRight: adaptDP(10),
  },
  'px-3': {
    paddingHorizontal: adaptDP(3),
  },
  'px-5': {
    paddingHorizontal: adaptDP(5),
  },
  'px-10': {
    paddingHorizontal: adaptDP(10),
  },
  'px-16': {
    paddingHorizontal: adaptDP(16),
  },
  'px-20': {
    paddingHorizontal: adaptDP(20),
  },
  'py-3': {
    paddingVertical: adaptDP(3),
  },
  'py-5': {
    paddingVertical: adaptDP(5),
  },
  'py-10': {
    paddingVertical: adaptDP(10),
  },
  'py-20': {
    paddingVertical: adaptDP(20),
  },
  transparent: {
    backgroundColor: 'rgba(0,0,0,0)', // transparent
  },
});
