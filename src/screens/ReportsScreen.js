import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, CROP_LIST } from '../utils/constants';
import { getDiseaseHistory, getYieldHistory } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import Card from '../components/Card';
import HealthStatusBadge from '../components/HealthStatusBadge';

const ReportsScreen = () => {
  const { t, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('disease');
  const [diseaseHistory, setDiseaseHistory] = useState([]);
  const [yieldHistory, setYieldHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const getCropName = (cropId) => {
    const crop = CROP_LIST.find(c => c.id === cropId);
    if (!crop) return cropId;
    return currentLanguage === 'ur' ? crop.nameUr : crop.nameEn;
  };

  const loadHistory = async () => {
    try {
      const diseases = await getDiseaseHistory();
      const yields = await getYieldHistory();
      setDiseaseHistory(diseases);
      setYieldHistory(yields);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'disease' && styles.activeTab]}
          onPress={() => setActiveTab('disease')}
        >
          <Text style={[styles.tabText, activeTab === 'disease' && styles.activeTabText]}>
            {t('reports.diseaseDetections')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'yield' && styles.activeTab]}
          onPress={() => setActiveTab('yield')}
        >
          <Text style={[styles.tabText, activeTab === 'yield' && styles.activeTabText]}>
            {t('reports.yieldPredictions')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'disease' ? (
          diseaseHistory.length === 0 ? (
            <Card>
              <Text style={styles.noData}>{t('disease.noHistory')}</Text>
            </Card>
          ) : (
            diseaseHistory.map((item, index) => (
              <Card key={index}>
                <View style={styles.itemHeader}>
                  <Text style={styles.cropType}>{getCropName(item.cropType)}</Text>
                  <Text style={styles.date}>{formatDate(item.detectionDate)}</Text>
                </View>
                <HealthStatusBadge status={item.result.status} />
                <Text style={styles.diseaseName}>{item.result.diseaseNameUrdu}</Text>
                <Text style={styles.confidence}>
                  {t('disease.confidence')}: {(item.result.confidence * 100).toFixed(0)}%
                </Text>
              </Card>
            ))
          )
        ) : (
          yieldHistory.length === 0 ? (
            <Card>
              <Text style={styles.noData}>{t('yield.noHistory')}</Text>
            </Card>
          ) : (
            yieldHistory.map((item, index) => (
              <Card key={index}>
                <View style={styles.itemHeader}>
                  <Text style={styles.cropType}>{getCropName(item.cropType)}</Text>
                  <Text style={styles.date}>{formatDate(item.predictionDate)}</Text>
                </View>
                <View style={styles.yieldInfo}>
                  <View style={styles.yieldBox}>
                    <Text style={styles.yieldLabel}>{t('yield.predictedYield')}</Text>
                    <Text style={styles.yieldValue}>
                      {item.predictedYield} {item.unit}
                    </Text>
                  </View>
                  <View style={styles.yieldBox}>
                    <Text style={styles.yieldLabel}>{t('yield.totalYield')}</Text>
                    <Text style={styles.yieldValue}>
                      {item.totalYield} {item.unit}
                    </Text>
                  </View>
                </View>
              </Card>
            ))
          )
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
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  noData: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 16,
    padding: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cropType: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  diseaseName: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 8,
  },
  confidence: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  yieldInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  yieldBox: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  yieldLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  yieldValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

export default ReportsScreen;

