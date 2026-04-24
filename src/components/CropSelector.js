import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const CropSelector = ({ selectedCrop, onSelectCrop, crops }) => {
  const { currentLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      {crops.map((crop) => (
        <TouchableOpacity
          key={crop.id}
          style={[
            styles.cropButton,
            selectedCrop === crop.id && styles.selectedCrop,
          ]}
          onPress={() => onSelectCrop(crop.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.cropIcon}>{crop.icon}</Text>
          <Text
            style={[
              styles.cropName,
              selectedCrop === crop.id && styles.selectedCropText,
            ]}
          >
            {currentLanguage === 'ur' ? crop.nameUr : crop.nameEn}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  cropButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
  },
  selectedCrop: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}15`,
  },
  cropIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  selectedCropText: {
    color: COLORS.primary,
  },
});

export default CropSelector;

