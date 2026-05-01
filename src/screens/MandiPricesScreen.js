import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { COLORS } from '../utils/constants';
import Card from '../components/Card';

// Mock mandi prices data (PKR per 40 kg)
const MANDI_DATA = {
  lastUpdated: '2026-05-01',
  lastUpdatedUr: '1 مئی 2026',
  prices: [
    {
      id: 'wheat',
      nameEn: 'Wheat',
      nameUr: 'گندم',
      icon: '🌾',
      pricePer40kg: 4200,
      changePercent: +2.5,
      districtPrices: [
        { districtEn: 'Lahore',       districtUr: 'لاہور',      price: 4250 },
        { districtEn: 'Faisalabad',   districtUr: 'فیصل آباد', price: 4200 },
        { districtEn: 'Multan',       districtUr: 'ملتان',      price: 4180 },
        { districtEn: 'Rawalpindi',   districtUr: 'راولپنڈی',  price: 4220 },
        { districtEn: 'Gujranwala',   districtUr: 'گوجرانوالہ',price: 4230 },
      ],
    },
    {
      id: 'rice',
      nameEn: 'Rice (Basmati)',
      nameUr: 'باسمتی چاول',
      icon: '🍚',
      pricePer40kg: 8500,
      changePercent: -1.2,
      districtPrices: [
        { districtEn: 'Gujranwala',   districtUr: 'گوجرانوالہ', price: 8600 },
        { districtEn: 'Sialkot',      districtUr: 'سیالکوٹ',    price: 8500 },
        { districtEn: 'Sheikhupura', districtUr: 'شیخوپورہ',   price: 8450 },
        { districtEn: 'Lahore',       districtUr: 'لاہور',       price: 8520 },
        { districtEn: 'Hafizabad',    districtUr: 'حافظ آباد',  price: 8480 },
      ],
    },
    {
      id: 'maize',
      nameEn: 'Maize',
      nameUr: 'مکئی',
      icon: '🌽',
      pricePer40kg: 2800,
      changePercent: +0.8,
      districtPrices: [
        { districtEn: 'Faisalabad',   districtUr: 'فیصل آباد', price: 2820 },
        { districtEn: 'Sahiwal',      districtUr: 'ساہیوال',    price: 2790 },
        { districtEn: 'Okara',        districtUr: 'اوکاڑہ',     price: 2780 },
        { districtEn: 'Multan',       districtUr: 'ملتان',       price: 2810 },
        { districtEn: 'Lahore',       districtUr: 'لاہور',       price: 2800 },
      ],
    },
    {
      id: 'potato',
      nameEn: 'Potato',
      nameUr: 'آلو',
      icon: '🥔',
      pricePer40kg: 1600,
      changePercent: -3.5,
      districtPrices: [
        { districtEn: 'Okara',       districtUr: 'اوکاڑہ',     price: 1580 },
        { districtEn: 'Sahiwal',     districtUr: 'ساہیوال',    price: 1600 },
        { districtEn: 'Lahore',      districtUr: 'لاہور',       price: 1650 },
        { districtEn: 'Faisalabad',  districtUr: 'فیصل آباد', price: 1620 },
        { districtEn: 'Multan',      districtUr: 'ملتان',       price: 1590 },
      ],
    },
    {
      id: 'tomato',
      nameEn: 'Tomato',
      nameUr: 'ٹماٹر',
      icon: '🍅',
      pricePer40kg: 3200,
      changePercent: +5.0,
      districtPrices: [
        { districtEn: 'Lahore',       districtUr: 'لاہور',       price: 3300 },
        { districtEn: 'Faisalabad',   districtUr: 'فیصل آباد', price: 3200 },
        { districtEn: 'Rawalpindi',   districtUr: 'راولپنڈی',  price: 3250 },
        { districtEn: 'Multan',       districtUr: 'ملتان',       price: 3150 },
        { districtEn: 'Gujranwala',   districtUr: 'گوجرانوالہ', price: 3180 },
      ],
    },
  ],
};

const MandiPricesScreen = () => {
  const { currentLanguage } = useLanguage();
  const L = currentLanguage === 'en';
  const [expandedCrop, setExpandedCrop] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  const formatPrice = (price) => `Rs. ${price.toLocaleString()}`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
    >
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>{L ? '🏪 Mandi Prices' : '🏪 منڈی کے ریٹ'}</Text>
        <Text style={styles.lastUpdated}>
          {L ? `Updated: ${MANDI_DATA.lastUpdated}` : `تازہ: ${MANDI_DATA.lastUpdatedUr}`}
        </Text>
      </View>

      <Text style={styles.subtitle}>
        {L
          ? 'Average prices per 40 kg (Mann) — Pull to refresh'
          : '40 کلو (من) کی اوسط قیمت — تازہ کرنے کے لیے نیچے کھینچیں'}
      </Text>

      {MANDI_DATA.prices.map((crop) => {
        const isExpanded = expandedCrop === crop.id;
        const isUp = crop.changePercent >= 0;
        return (
          <TouchableOpacity
            key={crop.id}
            style={styles.cropCard}
            onPress={() => setExpandedCrop(isExpanded ? null : crop.id)}
            activeOpacity={0.85}
          >
            <View style={styles.cropRow}>
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>{L ? crop.nameEn : crop.nameUr}</Text>
                <Text style={styles.priceText}>{formatPrice(crop.pricePer40kg)}</Text>
              </View>
              <View style={styles.changeBox}>
                <Text style={[styles.changeText, isUp ? styles.changeUp : styles.changeDown]}>
                  {isUp ? '▲' : '▼'} {Math.abs(crop.changePercent).toFixed(1)}%
                </Text>
                <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
              </View>
            </View>

            {isExpanded && (
              <View style={styles.districtTable}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableCell, styles.tableHeaderText]}>
                    {L ? 'District' : 'ضلع'}
                  </Text>
                  <Text style={[styles.tableCell, styles.tableHeaderText, styles.tablePriceCol]}>
                    {L ? 'Price / 40 kg' : 'قیمت / 40 کلو'}
                  </Text>
                </View>
                {crop.districtPrices.map((dp, idx) => (
                  <View key={idx} style={[styles.tableRow, idx % 2 === 0 && styles.tableRowAlt]}>
                    <Text style={styles.tableCell}>
                      {L ? dp.districtEn : dp.districtUr}
                    </Text>
                    <Text style={[styles.tableCell, styles.tablePriceCol, styles.priceValue]}>
                      {formatPrice(dp.price)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          {L
            ? '⚠️ Prices are indicative and may vary. Always confirm with your local mandi before selling.'
            : '⚠️ یہ قیمتیں صرف اشارے کے لیے ہیں۔ فروخت سے پہلے اپنی مقامی منڈی سے تصدیق کریں۔'}
        </Text>
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
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  lastUpdated: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  cropCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border || '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  cropRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 2,
  },
  changeBox: {
    alignItems: 'flex-end',
    gap: 4,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  changeUp: {
    color: '#2E7D32',
  },
  changeDown: {
    color: '#C62828',
  },
  chevron: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  districtTable: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tableHeaderText: {
    fontWeight: '700',
    color: COLORS.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  tableRowAlt: {
    backgroundColor: '#F9F9F9',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  tablePriceCol: {
    flex: 1,
    textAlign: 'right',
  },
  priceValue: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  disclaimer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FFC107',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 18,
  },
});

export default MandiPricesScreen;
