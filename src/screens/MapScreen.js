import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useLanguage } from '../context/LanguageContext';
import { COLORS } from '../utils/constants';
import Button from '../components/Button';
import Card from '../components/Card';

const MapScreen = () => {
  const { t } = useLanguage();
  const mapRef = useRef(null);
  const [farmLocation, setFarmLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 31.5204, // Lahore, Punjab
    longitude: 74.3587,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const handleGetCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = {
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setCurrentLocation(newLocation);
        mapRef.current?.animateToRegion(newLocation, 1000);
      },
      (error) => {
        Alert.alert(t('common.error'), t('errors.locationPermission'));
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setFarmLocation({ latitude, longitude });
    Alert.alert(t('common.success'), t('map.locationMarked'));
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentLocation}
        onPress={handleMapPress}
      >
        {farmLocation && (
          <>
            <Marker
              coordinate={farmLocation}
              title={t('map.yourLocation')}
              description="آپ کا کھیت"
              pinColor={COLORS.primary}
            />
            <Circle
              center={farmLocation}
              radius={500}
              strokeColor={COLORS.primary}
              fillColor={`${COLORS.primary}30`}
            />
          </>
        )}
      </MapView>

      <View style={styles.overlay}>
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>{t('map.title')}</Text>
          <Text style={styles.infoText}>
            نقشے پر اپنے کھیت کی جگہ کو نشان زد کرنے کے لیے ٹیپ کریں
          </Text>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="📍 موجودہ مقام"
            onPress={handleGetCurrentLocation}
            style={styles.button}
          />
          
          {farmLocation && (
            <Button
              title="محفوظ کریں"
              onPress={() => Alert.alert('مقام محفوظ ہو گیا!')}
              variant="secondary"
              style={styles.button}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },
  infoCard: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  button: {
    marginBottom: 8,
  },
});

export default MapScreen;

