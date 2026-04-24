import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../utils/constants';
import Button from './Button';

const Picker = ({
  visible,
  onClose,
  title,
  items,
  selectedValue,
  onValueChange,
  displayKey = 'nameEn',
  valueKey = 'id',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            {items.map((item) => (
              <TouchableOpacity
                key={item[valueKey]}
                style={[
                  styles.item,
                  selectedValue === item[valueKey] && styles.selectedItem,
                ]}
                onPress={() => {
                  onValueChange(item[valueKey]);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.itemText,
                    selectedValue === item[valueKey] && styles.selectedItemText,
                  ]}
                >
                  {item[displayKey]}
                </Text>
                {selectedValue === item[valueKey] && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  scrollView: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: COLORS.background,
  },
  selectedItem: {
    backgroundColor: `${COLORS.primary}15`,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  selectedItemText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default Picker;

