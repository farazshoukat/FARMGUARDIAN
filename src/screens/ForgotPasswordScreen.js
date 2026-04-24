import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { COLORS } from '../utils/constants';
import { sendPasswordResetEmail } from '../services/authService';
import Button from '../components/Button';
import Input from '../components/Input';

const ForgotPasswordScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      setError('');
      
      if (!email.trim()) {
        setError(t('auth.emailRequired'));
        return;
      }
      
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError(t('auth.invalidEmail'));
        return;
      }

      setLoading(true);
      await sendPasswordResetEmail(email);
      
      Alert.alert(
        t('common.success'),
        t('auth.resetEmailSent'),
        [
          {
            text: t('common.ok'),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (err) {
      setError(err.message || t('errors.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>🔑</Text>
        <Text style={styles.title}>{t('auth.forgotPasswordTitle')}</Text>
        <Text style={styles.subtitle}>
          {t('auth.forgotPasswordSubtitle')}
        </Text>

        <Input
          label={t('auth.email')}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          placeholder={t('auth.emailPlaceholder')}
          keyboardType="email-address"
          autoCapitalize="none"
          error={error}
        />

        <Button
          title={t('auth.sendResetLink')}
          onPress={handleResetPassword}
          loading={loading}
          style={styles.button}
        />

        <Button
          title={t('common.back')}
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.backButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    marginTop: 16,
  },
  backButton: {
    marginTop: 12,
  },
});

export default ForgotPasswordScreen;

