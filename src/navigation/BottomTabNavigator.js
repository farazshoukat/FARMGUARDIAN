import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DiseaseDetectionScreen from '../screens/DiseaseDetectionScreen';
import YieldPredictionScreen from '../screens/YieldPredictionScreen';
import AdvisoryScreen from '../screens/AdvisoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'DiseaseDetection':
              iconName = focused ? 'microscope' : 'microscope';
              break;
            case 'YieldPrediction':
              iconName = focused ? 'chart-line' : 'chart-line';
              break;
            case 'Advisory':
              iconName = focused ? 'lightbulb' : 'lightbulb-outline';
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.home'),
          title: t('common.appName'),
        }}
      />
      <Tab.Screen
        name="DiseaseDetection"
        component={DiseaseDetectionScreen}
        options={{
          tabBarLabel: t('navigation.disease'),
          title: t('disease.title'),
        }}
      />
      <Tab.Screen
        name="YieldPrediction"
        component={YieldPredictionScreen}
        options={{
          tabBarLabel: t('navigation.yield'),
          title: t('yield.title'),
        }}
      />
      <Tab.Screen
        name="Advisory"
        component={AdvisoryScreen}
        options={{
          tabBarLabel: t('navigation.advisory'),
          title: t('advisory.title'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('navigation.profile'),
          title: t('profile.title'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

