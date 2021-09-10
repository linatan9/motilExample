import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {colors, icons} from '../../../constants';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import TransportItem from './components/TransportItem/TransportItem';
import {TRANSPORTS} from '../../../constants/data';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export const TransportationSettings = props => {
  const getItems = activeId => {
    return [
      {
        icon: (
          <icons.TransportationBicycle
            color={
              activeId !== TRANSPORTS.BIKE
                ? colors.textWhite
                : colors.background
            }
          />
        ),
        id: TRANSPORTS.BIKE,
      },
      {
        icon: (
          <icons.TransportationMotorcycle
            color={
              activeId !== TRANSPORTS.MOTORCYCLE
                ? colors.textWhite
                : colors.background
            }
          />
        ),
        id: TRANSPORTS.MOTORCYCLE,
      },
      {
        icon: (
          <icons.TransportationWalking
            color={
              activeId !== TRANSPORTS.FOOT
                ? colors.textWhite
                : colors.background
            }
          />
        ),
        id: TRANSPORTS.FOOT,
      },
      {
        icon: (
          <icons.TransportationCar
            color={
              activeId !== TRANSPORTS.CAR ? colors.textWhite : colors.background
            }
          />
        ),
        id: TRANSPORTS.CAR,
      },
      {
        icon: (
          <icons.TransportationBus
            color={
              activeId !== TRANSPORTS.TRUCK
                ? colors.textWhite
                : colors.background
            }
          />
        ),
        id: TRANSPORTS.TRUCK,
      },
    ];
  };
  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate(
          'settingsNavigation.transportationSettings.transportation',
        )}
      />
      <Text style={styles.title}>
        {translate(
          'settingsNavigation.transportationSettings.chooseVechicleType',
        )}
      </Text>
      <View style={styles.itemsRowContainer}>
        {getItems(props.vehicleType).map((item, index) => (
          <TransportItem
            isLast={index === TRANSPORTS.TRUCK}
            activeId={props.vehicleType}
            onPress={props.changeTransport}
            key={index}
            {...item}
          />
        ))}
      </View>
    </ScreenContainer>
  );
};

export default TransportationSettings;
