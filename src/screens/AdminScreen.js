import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../utils/constants';
import { adminLogin } from '../services/authService';
import { getFarmers, getAdminStats } from '../services/adminService';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';

const AdminScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, farmersData] = await Promise.all([
        getAdminStats(),
        getFarmers(),
      ]);
      setStats(statsData);
      setFarmers(farmersData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await adminLogin(username, password);
      setIsLoggedIn(true);
      Alert.alert('کامیابی', 'ایڈمن لاگ ان کامیاب');
    } catch (error) {
      Alert.alert('خرابی', error.message || 'غلط اسناد');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('لاگ آؤٹ', 'کیا آپ لاگ آؤٹ کرنا چاہتے ہیں؟', [
      { text: 'منسوخ', style: 'cancel' },
      {
        text: 'ہاں',
        onPress: () => {
          setIsLoggedIn(false);
          setUsername('');
          setPassword('');
        },
      },
    ]);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.loginContent}>
          <View style={styles.loginHeader}>
            <Text style={styles.loginIcon}>🔐</Text>
            <Text style={styles.loginTitle}>ایڈمن لاگ ان</Text>
          </View>

          <Card>
            <Input
              label="صارف نام"
              value={username}
              onChangeText={setUsername}
              placeholder="admin"
              autoCapitalize="none"
            />
            <Input
              label="پاس ورڈ"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••"
              secureTextEntry
            />
            <Button
              title="لاگ ان"
              onPress={handleLogin}
              loading={loading}
              style={styles.button}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }

  if (loading && !stats) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ایڈمن پینل</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>لاگ آؤٹ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            ڈیش بورڈ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'farmers' && styles.activeTab]}
          onPress={() => setActiveTab('farmers')}
        >
          <Text style={[styles.tabText, activeTab === 'farmers' && styles.activeTabText]}>
            کسان
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'dashboard' && stats && (
          <View style={styles.dashboard}>
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>{stats.totalFarmers}</Text>
                <Text style={styles.statLabel}>کل کسان</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>{stats.totalDetections}</Text>
                <Text style={styles.statLabel}>تشخیصات</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>{stats.totalPredictions}</Text>
                <Text style={styles.statLabel}>پیشن گوئیاں</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statValue}>{stats.activeUsers}</Text>
                <Text style={styles.statLabel}>فعال صارفین</Text>
              </Card>
            </View>

            <Card title="بیماری کی تقسیم">
              <View style={styles.chartRow}>
                <View style={styles.chartLabel}>
                  <View style={[styles.chartDot, { backgroundColor: COLORS.healthy }]} />
                  <Text>صحت مند: {stats.diseasesByType.healthy}</Text>
                </View>
                <View style={styles.chartLabel}>
                  <View style={[styles.chartDot, { backgroundColor: COLORS.warning }]} />
                  <Text>انتباہ: {stats.diseasesByType.warning}</Text>
                </View>
                <View style={styles.chartLabel}>
                  <View style={[styles.chartDot, { backgroundColor: COLORS.diseased }]} />
                  <Text>بیمار: {stats.diseasesByType.diseased}</Text>
                </View>
              </View>
            </Card>
          </View>
        )}

        {activeTab === 'farmers' && (
          <View style={styles.farmersList}>
            {farmers.map((farmer) => (
              <Card key={farmer.id}>
                <Text style={styles.farmerName}>{farmer.name}</Text>
                <Text style={styles.farmerInfo}>📱 {farmer.phoneNumber}</Text>
                <Text style={styles.farmerInfo}>📍 {farmer.district}, {farmer.village}</Text>
                <Text style={styles.farmerInfo}>🌾 {farmer.farmSize} ایکڑ</Text>
                <Text style={styles.farmerInfo}>
                  شامل ہوئے: {new Date(farmer.joinedDate).toLocaleDateString('ur-PK')}
                </Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loginContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  loginIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  button: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: 4,
    margin: 16,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  dashboard: {},
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    padding: 20,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  chartRow: {
    flexDirection: 'column',
  },
  chartLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  farmersList: {},
  farmerName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  farmerInfo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
});

export default AdminScreen;

