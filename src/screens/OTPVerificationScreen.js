import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { COLORS } from '../utils/constants';
import { verifyOTP } from '../services/authService';
import Button from '../components/Button';
import Input from '../components/Input';

const OTPVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const { login } = useAuth();
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyOTP = async () => {
    try {
      setError('');
      
      if (otp.length !== 6) {
        setError(t('auth.invalidOTP'));
        return;
      }

      setLoading(true);
      const response = await verifyOTP(phoneNumber, otp);
      
      if (response.user.isNewUser) {
        navigation.replace('Registration', { 
          phoneNumber, 
          token: response.token 
        });
      } else {
        await login(response.user, response.token);
        Alert.alert(t('common.success'), t('auth.loginSuccess'));
        navigation.replace('MainApp');
      }
    } catch (err) {
      setError(err.message || t('errors.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.icon}>📱</Text>
        <Text style={styles.title}>{t('auth.verifyOTP')}</Text>
        <Text style={styles.subtitle}>
          {t('auth.otpSent')} {phoneNumber}
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label={t('auth.enterOTP')}
          value={otp}
          onChangeText={setOtp}
          placeholder={t('auth.otpPlaceholder')}
          keyboardType="number-pad"
          maxLength={6}
          error={error}
          style={styles.otpInput}
        />

        <Button
          title={t('auth.verifyOTP')}
          onPress={handleVerifyOTP}
          loading={loading}
          style={styles.button}
        />

        <Button
          title={t('common.back')}
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.button}
        />
      </View>
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
    marginTop: 60,
    marginBottom: 40,
  },
  icon: {
    fontSize: 64,
    marginBottom: 24,
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
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  otpInput: {
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});

export default OTPVerificationScreen;

