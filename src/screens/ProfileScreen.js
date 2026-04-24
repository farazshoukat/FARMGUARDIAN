import React from 'react';
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
import { COLORS } from '../utils/constants';
import Card from '../components/Card';
import Button from '../components/Button';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { t, currentLanguage, toggleLanguage } = useLanguage();

  const handleLogout = () => {
    Alert.alert(
      'لاگ آؤٹ',
      'کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.logout'),
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Welcome');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Guest'}</Text>
        {user?.phoneNumber && (
          <Text style={styles.phone}>{user.phoneNumber}</Text>
        )}
      </View>

      {user && !user.isGuest && (
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ضلع:</Text>
            <Text style={styles.infoValue}>{user.district || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>گاؤں:</Text>
            <Text style={styles.infoValue}>{user.village || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>کھیت کا رقبہ:</Text>
            <Text style={styles.infoValue}>{user.farmSize || 0} ایکڑ</Text>
          </View>
        </Card>
      )}

      <Card>
        <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={toggleLanguage}>
          <Text style={styles.settingText}>{t('profile.language')}</Text>
          <Text style={styles.settingValue}>
            {currentLanguage === 'ur' ? 'اردو' : 'English'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>{t('profile.notifications')}</Text>
          <Text style={styles.settingValue}>آن</Text>
        </TouchableOpacity>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>دیگر</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>{t('profile.help')}</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>{t('profile.about')}</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{t('profile.version')}</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
      </Card>

      {!user?.isGuest && (
        <Button
          title={t('common.logout')}
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      )}

      {user?.isGuest && (
        <Button
          title="رجسٹر کریں"
          onPress={() => navigation.navigate('Welcome')}
          style={styles.logoutButton}
        />
      )}
    </ScrollView>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingText: {
    fontSize: 16,
    color: COLORS.text,
  },
  settingValue: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  settingArrow: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default ProfileScreen;

