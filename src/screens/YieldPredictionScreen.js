import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  COLORS,
  CROP_LIST,
  SOIL_COLORS,
  FERTILIZER_TYPES,
  DISTRICTS,
} from '../utils/constants';
import { predictYield } from '../services/yieldService';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Picker from '../components/Picker';
import Loader from '../components/Loader';

const YieldPredictionScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  
  const [cropType, setCropType] = useState('');
  const [farmArea, setFarmArea] = useState('');
  const [location, setLocation] = useState('');
  const [soilColor, setSoilColor] = useState('');
  const [previousCrop, setPreviousCrop] = useState('');
  const [fertilizerUsed, setFertilizerUsed] = useState('');
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState(null);
  
  const [showCropPicker, setShowCropPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showSoilPicker, setShowSoilPicker] = useState(false);
  const [showPreviousCropPicker, setShowPreviousCropPicker] = useState(false);
  const [showFertilizerPicker, setShowFertilizerPicker] = useState(false);

  const handlePredict = async () => {
    if (!cropType || !farmArea || !location || !soilColor) {
      Alert.alert(t('common.error'), t('errors.invalidInput'));
      return;
    }

    try {
      setPredicting(true);
      const prediction = await predictYield({
        cropType,
        farmSize: parseFloat(farmArea),
        location,
        soilColor,
        previousCrop,
        fertilizerUsed,
        userId: user?.id,
      });
      setResult(prediction);
    } catch (error) {
      Alert.alert(t('common.error'), error.message || t('errors.somethingWrong'));
    } finally {
      setPredicting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCropType('');
    setFarmArea('');
    setLocation('');
    setSoilColor('');
    setPreviousCrop('');
    setFertilizerUsed('');
  };

  const getValue = (id, list, key) => {
    const item = list.find(i => i.id === id);
    return item ? item[key] : '';
  };

  if (predicting) {
    return (
      <View style={styles.loadingContainer}>
        <Loader />
        <Text style={styles.analyzingText}>{t('yield.predicting')}</Text>
      </View>
    );
  }

  if (result) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Card title={t('yield.result')}>
          <View style={styles.resultCard}>
            <View style={styles.yieldBox}>
              <Text style={styles.yieldLabel}>{t('yield.predictedYield')}</Text>
              <Text style={styles.yieldValue}>
                {result.predictedYield} {result.unit}
              </Text>
              <Text style={styles.yieldSubtext}>{t('yield.perAcre')}</Text>
            </View>

            <View style={styles.totalYieldBox}>
              <Text style={styles.totalLabel}>{t('yield.totalYield')}</Text>
              <Text style={styles.totalValue}>
                {result.totalYield} {result.unit}
              </Text>
            </View>

            <View style={styles.comparisonBox}>
              <Text style={styles.comparisonLabel}>
                {t('yield.regionalAverage')}: {result.regionalAverage} {result.unit}
              </Text>
              <View style={styles.comparisonBar}>
                <View
                  style={[
                    styles.comparisonFill,
                    { width: `${(result.regionalAverage / result.predictedYield) * 100}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.confidenceBox}>
              <Text style={styles.confidenceLabel}>{t('yield.confidenceLevel')}:</Text>
              <Text style={styles.confidenceValue}>
                {(result.confidence * 100).toFixed(0)}%
              </Text>
            </View>

            {(result.recommendationsEn || result.recommendationsUr) && (
              <View style={styles.recommendations}>
                <Text style={styles.recommendationsTitle}>
                  {currentLanguage === 'ur' ? 'سفارشات:' : 'Recommendations:'}
                </Text>
                {(currentLanguage === 'ur' ? result.recommendationsUr : result.recommendationsEn)?.map((rec, index) => (
                  <View key={index} style={styles.recommendationItem}>
                    <Text style={styles.recommendationBullet}>•</Text>
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Card>

        <Button
          title={currentLanguage === 'ur' ? 'نئی پیشن گوئی' : 'New Prediction'}
          onPress={handleReset}
          style={styles.button}
        />

        <Button
          title={t('yield.viewHistory')}
          onPress={() => navigation.navigate('Reports')}
          variant="outline"
          style={styles.button}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('yield.title')}</Text>

      <Card>
        <PickerField
          label={t('yield.cropType')}
          value={getValue(cropType, CROP_LIST, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowCropPicker(true)}
        />

        <Input
          label={t('yield.farmArea')}
          value={farmArea}
          onChangeText={setFarmArea}
          placeholder={t('yield.farmAreaPlaceholder')}
          keyboardType="numeric"
        />

        <PickerField
          label={t('yield.location')}
          value={getValue(location, DISTRICTS, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowLocationPicker(true)}
        />

        <PickerField
          label={t('yield.soilColor')}
          value={getValue(soilColor, SOIL_COLORS, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowSoilPicker(true)}
          showColor={soilColor ? SOIL_COLORS.find(s => s.id === soilColor)?.color : null}
        />

        <PickerField
          label={t('yield.previousCrop')}
          value={getValue(previousCrop, CROP_LIST, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowPreviousCropPicker(true)}
          optional
        />

        <PickerField
          label={t('yield.fertilizerUsed')}
          value={getValue(fertilizerUsed, FERTILIZER_TYPES, currentLanguage === 'ur' ? 'nameUr' : 'nameEn')}
          onPress={() => setShowFertilizerPicker(true)}
          optional
        />

        <Button
          title={t('yield.predict')}
          onPress={handlePredict}
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
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        title={t('yield.location')}
        items={DISTRICTS}
        selectedValue={location}
        onValueChange={setLocation}
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

      <Picker
        visible={showPreviousCropPicker}
        onClose={() => setShowPreviousCropPicker(false)}
        title={t('yield.previousCrop')}
        items={CROP_LIST}
        selectedValue={previousCrop}
        onValueChange={setPreviousCrop}
        displayKey={currentLanguage === 'ur' ? 'nameUr' : 'nameEn'}
      />

      <Picker
        visible={showFertilizerPicker}
        onClose={() => setShowFertilizerPicker(false)}
        title={t('yield.fertilizerUsed')}
        items={FERTILIZER_TYPES}
        selectedValue={fertilizerUsed}
        onValueChange={setFertilizerUsed}
        displayKey={currentLanguage === 'ur' ? 'nameUr' : 'nameEn'}
      />
    </ScrollView>
  );
};

const PickerField = ({ label, value, onPress, optional, showColor }) => {
  const { t } = useLanguage();
  
  return (
    <TouchableOpacity style={styles.pickerField} onPress={onPress}>
      <Text style={styles.pickerLabel}>
        {label} {optional && t('yield.optional')}
      </Text>
      <View style={styles.pickerValue}>
        {showColor && (
          <View style={[styles.colorIndicator, { backgroundColor: showColor }]} />
        )}
        <Text style={value ? styles.pickerValueText : styles.pickerPlaceholder}>
          {value || t('yield.selectPlaceholder')}
        </Text>
        <Text style={styles.pickerArrow}>▼</Text>
      </View>
    </TouchableOpacity>
  );
};

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  analyzingText: {
    marginTop: 16,
    fontSize: 18,
    color: COLORS.text,
  },
  resultCard: {
    marginTop: 8,
  },
  yieldBox: {
    backgroundColor: `${COLORS.primary}15`,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  yieldLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  yieldValue: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.primary,
  },
  yieldSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  totalYieldBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  comparisonBox: {
    marginBottom: 16,
  },
  comparisonLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  comparisonBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  comparisonFill: {
    height: '100%',
    backgroundColor: COLORS.warning,
  },
  confidenceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  confidenceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  recommendations: {
    marginTop: 8,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recommendationBullet: {
    fontSize: 16,
    color: COLORS.text,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});

export default YieldPredictionScreen;

