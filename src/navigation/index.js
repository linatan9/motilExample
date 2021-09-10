import React from 'react';
import styles from './styles';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import ResetPassword from '../screens/Password/ResetPassword';
import ChangePassword from '../screens/Password/ChangePassword';
import SuccessfullChange from '../screens/Password/SuccessfullChange';
import Subcategories from '../screens/Onboarding/Subcategories';
import {colors, icons} from '../constants';
import Intro from '../screens/Intro';
import Categories from '../screens/Onboarding/Categories';
import ScheduleSummary from '../screens/Onboarding/ScheduleSummary';
import WorkingHours from '../screens/Onboarding/WorkingHours';
import RestDays from '../screens/Onboarding/RestDays';
import OnboardPaymentAccount from '../screens/Onboarding/OnboardPaymentAccount';
import OnboardingVerification from '../screens/Onboarding/OnboardingVerification';
import SherableSchedule from '../screens/Onboarding/SherableSchedule';
import Settings from '../screens/SettingsNavigation/Settings';
import Language from '../screens/SettingsNavigation/Language';
import PaymentMethod from '../screens/SettingsNavigation/PaymentMethod/PaymentMethod';
import ChangePasswordSettings from '../screens/SettingsNavigation/ChangePasswordSettings';
import TransportationSettings from '../screens/SettingsNavigation/TransportationSettings';
import TrustedSpecialist from '../screens/SettingsNavigation/VerificationScreens/TrustedSpecialist';
import StartApplication from '../screens/SettingsNavigation/VerificationScreens/StartApplication';
import OnboardingProcess from '../screens/SettingsNavigation/VerificationScreens/OnboardingProcess';
import EditPersonalInfo from '../screens/SettingsNavigation/EditPersonalInfo';
import WorkingDays from '../screens/Onboarding/WorkingDays';
import SelectCategories from '../screens/NewTaskNavigation/SelectCategories';
import CreateBooking from '../screens/NewTaskNavigation/CreateBooking';
import ServiceDuration from '../screens/NewTaskNavigation/ServiceDuration';
import ChooseDateTime from '../screens/NewTaskNavigation/ChooseDateTime';
import NewTaskSummary from '../screens/NewTaskNavigation/NewTaskSummary';
import CompleteBooking from '../screens/NewTaskNavigation/CompleteBooking';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BookingsList from '../screens/BookingsNavigation/BookingsList';
import Notifications from '../screens/BookingsNavigation/Notifications';
import Services from '../screens/Onboarding/Services';
import GeneralSettings from '../screens/SettingsNavigation/GeneralSettings';
import OnboardingSettings from '../screens/SettingsNavigation/OnboardingSettings';
import ContactSettings from '../screens/SettingsNavigation/ContactSettings';
import {CALLBACK_LINK_FOR_STRIPE} from '../constants/data';
import SignUpExternal from '../screens/Auth/SignUpExternal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="Intro"
      component={Intro}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="SignUpExternal"
      component={SignUpExternal}
      options={{headerLeft: () => null, headerShown: false}}
    />
  </Stack.Navigator>
);

const PasswordNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{headerLeft: () => null, headerShown: false}}
    />
  </Stack.Navigator>
);

const OnboardingNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Categories"
      component={Categories}
      options={{
        headerLeft: () => null,
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="Subcategories"
      component={Subcategories}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="ScheduleSummary"
      component={ScheduleSummary}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="WorkingHours"
      component={WorkingHours}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="WorkingDays"
      component={WorkingDays}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="RestDays"
      component={RestDays}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="OnboardPaymentAccount"
      component={OnboardPaymentAccount}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="OnboardingVerification"
      component={OnboardingVerification}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="SherableSchedule"
      component={SherableSchedule}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="Services"
      component={Services}
      options={{headerLeft: () => null, headerShown: false}}
    />
  </Stack.Navigator>
);

const SettingsNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{
        headerLeft: () => null,
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="Language"
      component={Language}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="PaymentMethod"
      component={PaymentMethod}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordSettings}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="TransportationSettings"
      component={TransportationSettings}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="TrustedSpecialist"
      component={TrustedSpecialist}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="StartApplication"
      component={StartApplication}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="OnboardingProcess"
      component={OnboardingProcess}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="EditPersonalInfo"
      component={EditPersonalInfo}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="GeneralSettings"
      component={GeneralSettings}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="OnboardingSettings"
      component={OnboardingSettings}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="ContactSettings"
      component={ContactSettings}
      options={{headerLeft: () => null, headerShown: false}}
    />
  </Stack.Navigator>
);

const NewTaskNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CreateBooking"
      component={CreateBooking}
      options={{
        headerLeft: () => null,
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="SelectCategories"
      component={SelectCategories}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="ServiceDuration"
      component={ServiceDuration}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="ChooseDateTime"
      component={ChooseDateTime}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="NewTaskSummary"
      component={NewTaskSummary}
      options={{headerLeft: () => null, headerShown: false}}
    />
    <Stack.Screen
      name="CompleteBooking"
      component={CompleteBooking}
      options={{headerLeft: () => null, headerShown: false}}
    />
  </Stack.Navigator>
);

const BookingsNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BookingsList"
      component={BookingsList}
      options={{
        headerLeft: () => null,
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{headerLeft: () => null, headerShown: false}}
    />
  </Stack.Navigator>
);

const tabBarIconColors = props => {
  return {
    color: props.accessibilityState.selected
      ? colors.darkTabBar
      : colors.inactive,
  };
};

const getIsTabBarVisible = navigation => {
  const routeName = getFocusedRouteNameFromRoute(navigation.route);
  if (
    routeName === 'ServiceDuration' ||
    routeName === 'ChooseDateTime' ||
    routeName === 'NewTaskSummary' ||
    routeName === 'CompleteBooking' ||
    routeName === 'Notifications'
  ) {
    return false;
  }
  return true;
};

const TabButtonBookings = ({props, propsOptions}) => {
  return (
    <View style={styles.tebButtonContainer}>
      <TouchableWithoutFeedback
        onPress={() => propsOptions.navigation.navigate('BookingsNavigation')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            props.accessibilityState.selected
              ? ['#FFE38C', '#F1CD5F']
              : [colors.darkTabBar, colors.darkTabBar]
          }
          style={styles.tabIconContainer}>
          <icons.TabIconBookings style={tabBarIconColors(props)} />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

const TabButtonNewTask = ({props, propsOptions}) => {
  return (
    <View style={styles.tebButtonContainer}>
      <TouchableWithoutFeedback
        onPress={() => propsOptions.navigation.navigate('NewTaskNavigation')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            props.accessibilityState.selected
              ? ['#FFE38C', '#F1CD5F']
              : [colors.darkTabBar, colors.darkTabBar]
          }
          style={styles.tabIconContainer}>
          <icons.TabIconNewTask style={tabBarIconColors(props)} />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};
const TabButtonSettings = ({props, propsOptions}) => {
  return (
    <View style={styles.tebButtonContainer}>
      <TouchableWithoutFeedback
        onPress={() => propsOptions.navigation.navigate('SettingsNavigation')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            props.accessibilityState.selected
              ? ['#FFE38C', '#F1CD5F']
              : [colors.darkTabBar, colors.darkTabBar]
          }
          style={styles.tabIconContainer}>
          <icons.TabIconSettings style={tabBarIconColors(props)} />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

const TabAppNavigation = () => (
  <Tab.Navigator
    screenOptions={navigation => ({
      tabBarVisible: getIsTabBarVisible(navigation),
    })}
    tabBarOptions={{
      activeTintColor: colors.yellow,
      inactiveTintColor: colors.darkTabBar,
      tabStyle: {
        width: 40,
      },
      style: {
        height: 70,
        borderTopWidth: 0,
      },
      showLabel: false,
      activeTabStyle: {
        width: 40,
        height: 40,
        backgroundColor: colors.yellow,
      },
    }}>
    <Tab.Screen
      name="BookingsNavigation"
      component={BookingsNavigation}
      options={propsOptions => ({
        tabBarButton: props => (
          <TabButtonBookings props={props} propsOptions={propsOptions} />
        ),
      })}
    />
    <Tab.Screen
      name="NewTaskNavigation"
      component={NewTaskNavigation}
      options={propsOptions => ({
        tabBarButton: props => (
          <TabButtonNewTask props={props} propsOptions={propsOptions} />
        ),
      })}
    />
    <Tab.Screen
      name="SettingsNavigation"
      component={SettingsNavigation}
      options={propsOptions => ({
        tabBarButton: props => (
          <TabButtonSettings props={props} propsOptions={propsOptions} />
        ),
      })}
    />
  </Tab.Navigator>
);

const AppNavigator = props => {
  console.log(props, 'AppNavigator');
  return (
    <NavigationContainer
      linking={CALLBACK_LINK_FOR_STRIPE}
      theme={{dark: true, colors: {background: colors.background}}}>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthNavigation"
          component={AuthNavigation}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="Password"
          component={PasswordNavigation}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="OnboardingNavigation"
          component={OnboardingNavigation}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={TabAppNavigation}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="SuccessfullChange"
          component={SuccessfullChange}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="ScheduleSummary"
          component={ScheduleSummary}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="WorkingHours"
          component={WorkingHours}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="WorkingDays"
          component={WorkingDays}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="RestDays"
          component={RestDays}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="SherableSchedule"
          component={SherableSchedule}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{headerLeft: () => null, headerShown: false}}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{headerLeft: () => null, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
