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
import { COLORS, CROP_LIST, DISTRICTS } from '../utils/constants';
import { registerUser } from '../services/authService';
import Button from '../components/Button';
import Input from '../components/Input';
import Picker from '../components/Picker';

const RegistrationScreen = ({ route, navigation }) => {
  const { phoneNumber, token } = route.params;
  const { register } = useAuth();
  const { t, currentLanguage } = useLanguage();
  
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [cropsGrown, setCropsGrown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [showCropPicker, setShowCropPicker] = useState(false);

  const handleRegister = async () => {
    try {
      if (!name || !district || !village || !farmSize) {
        Alert.alert(t('common.error'), t('errors.invalidInput'));
        return;
      }

      setLoading(true);
      const userData = {
        phoneNumber,
        name,
        district,
        village,
        farmSize: parseFloat(farmSize),
        cropsGrown,
      };
      
      const response = await registerUser(userData);
      await register(response.user, token);
      Alert.alert(t('common.success'), t('auth.registerSuccess'));
      navigation.replace('MainApp');
    } catch (err) {
      Alert.alert(t('common.error'), err.message || t('errors.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  const toggleCrop = (cropId) => {
    if (cropsGrown.includes(cropId)) {
      setCropsGrown(cropsGrown.filter(id => id !== cropId));
    } else {
      setCropsGrown([...cropsGrown, cropId]);
    }
  };

  const getDistrictName = () => {
    const dist = DISTRICTS.find(d => d.id === district);
    return dist ? (currentLanguage === 'ur' ? dist.nameUr : dist.nameEn) : '';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.title}>{t('auth.register')}</Text>
        <Text style={styles.subtitle}>کچھ بنیادی معلومات بتائیں</Text>
      </View>

      <View style={styles.form}>
        <Input
          label={t('auth.name')}
          value={name}
          onChangeText={setName}
          placeholder={t('auth.namePlaceholder')}
        />

        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowDistrictPicker(true)}
        >
          <Text style={styles.pickerLabel}>{t('auth.district')}</Text>
          <View style={styles.pickerValue}>
            <Text style={district ? styles.pickerValueText : styles.pickerPlaceholder}>
              {getDistrictName() || 'منتخب کریں'}
            </Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </View>
        </TouchableOpacity>

        <Input
          label={t('auth.village')}
          value={village}
          onChangeText={setVillage}
          placeholder={t('auth.villagePlaceholder')}
        />

        <Input
          label={t('auth.farmSize')}
          value={farmSize}
          onChangeText={setFarmSize}
          placeholder={t('auth.farmSizePlaceholder')}
          keyboardType="numeric"
        />

        <Text style={styles.cropsLabel}>{t('auth.cropsGrown')}</Text>
        <View style={styles.cropsContainer}>
          {CROP_LIST.map((crop) => (
            <TouchableOpacity
              key={crop.id}
              style={[
                styles.cropChip,
                cropsGrown.includes(crop.id) && styles.cropChipSelected,
              ]}
              onPress={() => toggleCrop(crop.id)}
            >
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={styles.cropName}>
                {currentLanguage === 'ur' ? crop.nameUr : crop.nameEn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title={t('auth.register')}
          onPress={handleRegister}
          loading={loading}
          style={styles.button}
        />
      </View>

      <Picker
        visible={showDistrictPicker}
        onClose={() => setShowDistrictPicker(false)}
        title={t('auth.district')}
        items={DISTRICTS}
        selectedValue={district}
        onValueChange={setDistrict}
        displayKey={currentLanguage === 'ur' ? 'nameUr' : 'nameEn'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  form: {
    flex: 1,
  },
  pickerButton: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: COLORS.surface,
  },
  pickerValueText: {
    fontSize: 16,
    color: COLORS.text,
  },
  pickerPlaceholder: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  pickerArrow: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  cropsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  cropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  cropChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginRight: 8,
    marginBottom: 8,
  },
  cropChipSelected: {
    backgroundColor: `${COLORS.primary}15`,
    borderColor: COLORS.primary,
  },
  cropIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  cropName: {
    fontSize: 14,
    color: COLORS.text,
  },
  button: {
    marginTop: 24,
  },
});

export default RegistrationScreen;

