import { View, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStack from '../screens/HomeStack';
import ReviewScreen from '../screens/ReviewScreen';


const Tab = createBottomTabNavigator();


const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);


const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'Review') {
            iconName = 'cog';
          }
          // Return the icon component with the specified name, color, and size
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 16, fontWeight:"bold" }
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Review" component={ReviewScreen} 
        options={{ title: 'Review' }}
      />
    </Tab.Navigator>
  );
}

export { MainBottomTabNavigator };