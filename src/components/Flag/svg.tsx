import { SvgProps } from 'react-native-svg';
import ID from './flags/ID.svg';
import US from './flags/US.svg';
import CN from './flags/CN.svg';

export const flagSvg: Record<string, React.FC<SvgProps>> = {
  ID,
  US,
  CN,
};

export const missSvg = ['BR'];
