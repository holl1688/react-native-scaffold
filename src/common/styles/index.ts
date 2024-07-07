import { StyleSheet } from 'react-native';
import decoration from './modules/decoration';
import layout from './modules/layout';
import shape from './modules/shape';
import text from './modules/text';

export default StyleSheet.create({
  ...decoration,
  ...layout,
  ...shape,
  ...text,
});
