import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import {
  COLORS,
  CROP_LIST,
  CROP_STAGES,
  SOIL_COLORS,
} from '../utils/constants';
import { getAdvisoryRecommendations } from '../services/advisoryService';
import Button from '../components/Button';
import Card from '../components/Card';
import Picker from '../components/Picker';
import Loader from '../components/Loader';

const AdvisoryScreen = () => {
  const { t, currentLanguage } = useLanguage();
  
  const [cropType, setCropType] = useState('');
  const [cropStage, setCropStage] = useState('');
  const [soilColor, setSoilColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  
  const [showCropPicker, setShowCropPicker] = useState(false);
  const [showStagePicker, setShowStagePicker] = useState(false);
  const [showSoilPicker, setShowSoilPicker] = useState(false);

  const handleGetRecommendations = async () => {
    if (!cropType || !cropStage || !soilColor) {
      Alert.alert(t('common.error'), t('errors.invalidInput'));
      return;
    }

    try {
      setLoading(true);
      const result = await getAdvisoryRecommendations({
        cropType,
        cropStage,
        soilColor,
        location: 'punjab',
      });
      setRecommendations(result);
    } catch (error) {
      Alert.alert(t('common.error'), error.message || t('errors.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  const getValue = (id, list, key) => {
    const item = list.find(i => i.id === id);
    return item ? item[key] : '';
  };

  if (loading) {
    return <Loader />;
  }

  if (recommendations) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Card title={t('advisory.irrigationSchedule')}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>تعدد:</Text>
            <Text style={styles.infoValue}>{recommendations.irrigation.frequencyUr}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>مقدار:</Text>
            <Text style={styles.infoValue}>{recommendations.irrigation.amountUr}</Text>
          </View>
          <View style={styles.tipsContainer}>
            {recommendations.irrigation.tipsUr.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipBullet}>💧</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card title={t('advisory.fertilizerRecommendation')}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>NPK تناسب:</Text>
            <Text style={styles.infoValue}>{recommendations.fertilizer.npk}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>مقدار:</Text>
            <Text style={styles.infoValue}>{recommendations.fertilizer.amountUr}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>وقت:</Text>
            <Text style={styles.infoValue}>{recommendations.fertilizer.timingUr}</Text>
          </View>
          <View style={styles.tipsContainer}>
            {recommendations.fertilizer.tipsUr.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipBullet}>🌱</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card title={t('advisory.pestControl')}>
          <View style={styles.tipsContainer}>
            {recommendations.pestControl.preventiveUr.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipBullet}>🛡️</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card title={t('advisory.generalTips')}>
          <View style={styles.tipsContainer}>
            {recommendations.generalTipsUr.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipBullet}>💡</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Button
          title="نئی سفارش حاصل کریں"
          onPress={() => setRecommendations(null)}
          style={styles.button}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('advisory.title')}</Text>

      <Card>
        <PickerField
          label={t('yield.cropType')}
          value={getValue(cropType, CROP_LIST, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowCropPicker(true)}
        />

        <PickerField
          label={t('advisory.cropStage')}
          value={getValue(cropStage, CROP_STAGES, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowStagePicker(true)}
        />

        <PickerField
          label={t('yield.soilColor')}
          value={getValue(soilColor, SOIL_COLORS, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowSoilPicker(true)}
          showColor={soilColor ? SOIL_COLORS.find(s => s.id === soilColor)?.color : null}
        />

        <Button
          title={t('advisory.getRecommendations')}
          onPress={handleGetRecommendations}
          style={styles.button}
        />
      </Card>

      <Picker
        visible={showCropPicker}
        onClose={() => setShowCropPicker(false)}
        title={t('yield.cropType')}
        items={CROP_LIST}
        selectedValue={cropType}
        onValueChange={setCropType}
        displayKey={currentLanguage === 'ur' ? 'nameUr' : 'nameEn'}
      />

      <Picker
        visible={showStagePicker}
        onClose={() => setShowStagePicker(false)}
        title={t('advisory.cropStage')}
        items={CROP_STAGES}
        selectedValue={cropStage}
        onValueChange={setCropStage}
        displayKey={currentLanguage === 'ur' ? 'nameUr' : 'nameEn'}
      />

      <Picker
        visible={showSoilPicker}
        onClose={() => setShowSoilPicker(false)}
        title={t('yield.soilColor')}
        items={SOIL_COLORS}
        selectedValue={soilColor}
        onValueChange={setSoilColor}
        displayKey={currentLanguage === 'ur' ? 'nameUr' : 'nameEn'}
      />
    </ScrollView>
  );
};

const PickerField = ({ label, value, onPress, showColor }) => (
  <TouchableOpacity style={styles.pickerField} onPress={onPress}>
    <Text style={styles.pickerLabel}>{label}</Text>
    <View style={styles.pickerValue}>
      {showColor && (
        <View style={[styles.colorIndicator, { backgroundColor: showColor }]} />
      )}
      <Text style={value ? styles.pickerValueText : styles.pickerPlaceholder}>
        {value || 'منتخب کریں'}
      </Text>
      <Text style={styles.pickerArrow}>▼</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  pickerField: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  pickerValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: COLORS.surface,
  },
  pickerValueText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  pickerPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  pickerArrow: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    marginTop: 8,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  tipsContainer: {
    marginTop: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 18,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});

export default AdvisoryScreen;

