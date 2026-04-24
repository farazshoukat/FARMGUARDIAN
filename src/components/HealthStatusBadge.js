import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getHealthStatusColor } from '../utils/helpers';

const HealthStatusBadge = ({ status, size = 'medium' }) => {
  const getStatusText = () => {
    switch (status) {
      case 'healthy':
        return 'صحت مند';
      case 'warning':
        return 'انتباہ';
      case 'diseased':
        return 'بیمار';
      default:
        return '';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: 12, height: 12 };
      case 'medium':
        return { width: 16, height: 16 };
      case 'large':
        return { width: 24, height: 24 };
      default:
        return { width: 16, height: 16 };
    }
  };

  const color = getHealthStatusColor(status);

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, getSize(), { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{getStatusText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    borderRadius: 12,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HealthStatusBadge;

