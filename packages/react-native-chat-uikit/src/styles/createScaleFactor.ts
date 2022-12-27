import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const DESIGNED_DEVICE_WIDTH = 360;

export function createScaleFactor(deviceWidth = DESIGNED_DEVICE_WIDTH) {
  const ratio = Math.min(width, height) / deviceWidth;
  const rangedRatio = Math.min(Math.max(0.85, ratio), 1.25);
  return (dp: number) => PixelRatio.roundToNearestPixel(dp * rangedRatio);
}

createScaleFactor.updateScaleFactor = (scaleFactor: (dp: number) => number) => {
  defaultScaleFactor = scaleFactor;
};

export let defaultScaleFactor = createScaleFactor();

export const defaultScaleFactorS = (val: string | number) =>
  typeof val === 'string' ? val : defaultScaleFactor(val);
