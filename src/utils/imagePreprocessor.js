/**
 * imagePreprocessor.js
 * Utilities for validating and preparing image URIs before passing
 * to the native TFLite classifier module.
 *
 * Heavy pixel-level work (resize, decode, normalize) is handled
 * inside TFLiteClassifierModule.java on the native side.
 */

import { Platform } from 'react-native';

/**
 * Ensures the URI is in a format that Android's ContentResolver can open.
 * react-native-image-picker returns content:// or file:// URIs on Android.
 *
 * @param {string} uri
 * @returns {string} normalized URI
 */
export const normalizeImageUri = (uri) => {
  if (!uri) return uri;
  // On Android, file paths without scheme need file:// prefix
  if (Platform.OS === 'android' && !uri.startsWith('content://') && !uri.startsWith('file://')) {
    return `file://${uri}`;
  }
  return uri;
};

/**
 * Basic validation that the URI looks like an image path.
 * Does NOT read the file — actual decode errors are caught natively.
 *
 * @param {string} uri
 * @returns {{ valid: boolean, reason?: string }}
 */
export const validateImageUri = (uri) => {
  if (!uri || typeof uri !== 'string') {
    return { valid: false, reason: 'No image URI provided' };
  }
  const lower = uri.toLowerCase();
  const hasImageExt =
    lower.includes('.jpg') ||
    lower.includes('.jpeg') ||
    lower.includes('.png') ||
    lower.includes('.webp') ||
    lower.startsWith('content://') ||
    lower.startsWith('file://');
  if (!hasImageExt) {
    return { valid: false, reason: 'URI does not appear to be an image' };
  }
  return { valid: true };
};
