import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { getScaleFactor, getScaleFactorS } from './createScaleFactor';

type NamedStyle = ViewStyle | TextStyle | ImageStyle;
type StylePreprocessor<T extends NamedStyle = NamedStyle> = {
  [key in keyof T]: string;
};

const preProcessor: Partial<StylePreprocessor> = {
  fontSize: 'getScaleFactor',
  lineHeight: 'getScaleFactor',
  borderRadius: 'getScaleFactor',
  minWidth: 'getScaleFactorS',
  minHeight: 'getScaleFactorS',
  height: 'getScaleFactorS',
  width: 'getScaleFactorS',
  padding: 'getScaleFactorS',
  paddingTop: 'getScaleFactorS',
  paddingBottom: 'getScaleFactorS',
  paddingLeft: 'getScaleFactorS',
  paddingRight: 'getScaleFactorS',
  margin: 'getScaleFactorS',
  marginTop: 'getScaleFactorS',
  marginBottom: 'getScaleFactorS',
  marginLeft: 'getScaleFactorS',
  marginRight: 'getScaleFactorS',
  left: 'getScaleFactorS',
  right: 'getScaleFactorS',
  top: 'getScaleFactorS',
  bottom: 'getScaleFactorS',
};

const preProcessorKeys = Object.keys(
  preProcessor
) as (keyof typeof preProcessor)[];
const preProcessorLength = preProcessorKeys.length;

/**
 * Create StyleSheet with customized pre-processor
 * Return a StyleSheet that pre-processed
 * @param styles
 * @returns StyleSheet
 * */
export default function createStyleSheet<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(styles: T | StyleSheet.NamedStyles<T>): T {
  // console.log('test:createStyleSheet:');
  Object.values(styles).forEach((style) => {
    const styleKeys = Object.keys(style) as (keyof NamedStyle)[];
    const styleLength = styleKeys.length;
    const keys =
      styleLength < preProcessorLength ? styleKeys : preProcessorKeys;
    keys.forEach((key) => {
      // console.log('test:createStyleSheet:', key);
      if (preProcessor.hasOwnProperty(key) && style.hasOwnProperty(key)) {
        if (
          key === 'fontSize' ||
          key === 'lineHeight' ||
          key === 'borderRadius'
        ) {
          const d = Object.getOwnPropertyDescriptor(style, key);
          if (d) {
            d.value = getScaleFactor()(d.value as number);
            Object.defineProperty(style, key, d);
          }
        } else if (
          key === 'minWidth' ||
          key === 'minHeight' ||
          key === 'height' ||
          key === 'width' ||
          key === 'padding' ||
          key === 'paddingTop' ||
          key === 'paddingBottom' ||
          key === 'paddingLeft' ||
          key === 'paddingRight' ||
          key === 'margin' ||
          key === 'marginTop' ||
          key === 'marginBottom' ||
          key === 'marginLeft' ||
          key === 'marginRight' ||
          key === 'left' ||
          key === 'right' ||
          key === 'top' ||
          key === 'bottom'
        ) {
          const d = Object.getOwnPropertyDescriptor(style, key);
          if (d) {
            d.value = getScaleFactorS()(d.value as string | number);
            Object.defineProperty(style, key, d);
          }
        }
      }
    });
  });

  return StyleSheet.create<T>(styles);
}

type Return<T> = T | StyleSheet.NamedStyles<T>;
type F<T, P> = (p: P) => Return<T>;

export function createStyleSheetP<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  P
>(f: F<T, P>, p: P): T {
  // console.log('test:', f, typeof f);
  // console.log('test:f:', f(p));
  let styles: StyleSheet.NamedStyles<any> | StyleSheet.NamedStyles<T> = f(p);
  return createStyleSheet(styles);
}
