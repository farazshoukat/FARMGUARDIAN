/**
 * tfliteService.js
 * JS wrapper around the TFLiteClassifier native module.
 * Handles model invocation and result mapping using modelConfig.
 */

import { NativeModules } from 'react-native';
import { MODEL_CONFIG, RECOMMENDATIONS } from '../config/modelConfig';

const { TFLiteClassifier } = NativeModules;

/**
 * Run inference on an image for the given crop type.
 *
 * @param {string} imageUri  - content:// or file:// URI of the captured image
 * @param {string} cropType  - one of: maize, potato, rice, tomato, wheat
 * @returns {Promise<{status, diseaseLabel, diseaseLabelUr, confidence, recommendations}>}
 */
export const classifyImage = async (imageUri, cropType) => {
  if (!TFLiteClassifier) {
    throw new Error(
      'TFLiteClassifier native module is not available. Ensure the app was built with the native module.'
    );
  }

  const config = MODEL_CONFIG[cropType];
  if (!config) {
    throw new Error(`Unknown crop type: ${cropType}`);
  }

  const numClasses = config.labels.length;
  const result = await TFLiteClassifier.classify(imageUri, config.modelFile, numClasses);

  const { topIndex, topScore } = result;

  const diseaseLabel = config.labels[topIndex] || 'Unknown';
  const diseaseLabelUr = config.labelsUr[topIndex] || diseaseLabel;
  const status = config.severity[topIndex] || 'warning';
  const recommendations = RECOMMENDATIONS[status] || RECOMMENDATIONS.warning;

  return {
    status,
    diseaseLabel,
    diseaseLabelUr,
    confidence: topScore,
    recommendations,
  };
};

/**
 * Release a loaded model from memory (call on screen unmount).
 *
 * @param {string} cropType
 */
export const releaseModel = async (cropType) => {
  if (!TFLiteClassifier) return;
  const config = MODEL_CONFIG[cropType];
  if (!config) return;
  try {
    await TFLiteClassifier.releaseModel(config.modelFile);
  } catch (_) {
    // best-effort
  }
};
