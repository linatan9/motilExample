import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {colors, icons} from "../../../constants";
import Carousel from 'react-native-snap-carousel';
import {translate} from '../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import ServiceItem from './components/ServiceItem/ServiceItem';
import SearchInput from '../../../components/SearchInput/SearchInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { ONBOARDING_SLUGS } from '../../../constants/data';
import { getNotificationBySlug } from '../../../constants/helpers';

const iamgeSizeheight = Dimensions.get('window').width - 40;

const CategoryItem = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress(item)} style={styles.categotyItemContainer}>
      <Text numberOfLines={2} style={styles.categoryTitle}>{item.name}</Text>
      <View style={styles.categotyIconContainer}>
        {item.icon}
      </View>
    </TouchableOpacity>
  )
};

export  const Categories = (props) => {
  const [checkedServicesIds, setCheckedServicesIds] = useState([]);
  const [uncheckedServicesIds, setUncheckedServicesIds] = useState([]);
  const [existingServicesIds, setExistingServicesIds] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceNotification, setServiceNotification] = useState(getNotificationBySlug(props.specialistNotifications, ONBOARDING_SLUGS.SPECIALIST_SETUP_SERVICE));
  const isFromSettings = props?.route?.params?.isFromSettings;
  console.log(isFromSettings, 'isFromSettings')
  useEffect(() => {
    const backAction = (e) => {
      console.log(e, 'EVENT')
      if (e?.data?.action?.type === 'POP') {
        if(Platform.OS === 'ios') {
          RNExitApp.exitApp();
        } else {
          BackHandler.exitApp();
        }
        e.preventDefault();
      }
    };
    const listern = props.navigation.addListener('beforeRemove', backAction);
    return () =>  listern("beforeRemove", backAction);
  }, []);

  useEffect(() => {
    props.getCategories();
    props.getMainCategories();
    props.getTopServices().then(topServices => {
      console.log(topServices, 'topServicestopServicestopServices TOP======')
      setServices(topServices);
      getExistingServicesIds(topServices);
    });
  }, []);

  const renderCategoryItem = ({item, index}) => {
    item.icon = <icons.CategoryLifestyleIcon/>;
    return(
      <CategoryItem onPress={(category) => props.navigation.navigate('Subcategories', {category: category, isFromSettings: isFromSettings}) } key={item.name} item={item}/>
    )
  };

  const renderServiceItems = ({item, index}) => {
    return (
      <ServiceItem
        key={item.id}
        isChecked={checkedServicesIds.includes(item.id) && !uncheckedServicesIds.includes(item.id)}
        id={item.id} onPress={onChecklService}
        title={item.name}
        price={item.price}
      />
    )
  };
  const onChecklService = (serviceId) => {
    const copyChecked = [...checkedServicesIds];
    const copyCheckedUnChecked = [...uncheckedServicesIds];
    if (copyChecked.includes(serviceId)) {
      const itemIndex = copyChecked.indexOf(serviceId);
      copyChecked.splice(itemIndex, 1);
      if(existingServicesIds.includes(serviceId)) {
        copyCheckedUnChecked.push(serviceId);
      }
    } else {
      if (copyCheckedUnChecked.includes(serviceId)) {
        const itemIndex = copyCheckedUnChecked.indexOf(serviceId);
        copyCheckedUnChecked.splice(itemIndex, 1);
      }
      copyChecked.push(serviceId);
    }
    setUncheckedServicesIds(copyCheckedUnChecked);
    setCheckedServicesIds(copyChecked);
  };

  const getExistingServicesIds = (servicesList) => {
    const existingIds = props.specialistServices.map(s => s.id);
    const newCheckedList = [];
    setExistingServicesIds(existingIds || []);
    servicesList.map(si => {
      if (existingIds.includes(si.id)){
        newCheckedList.push(si.id);
      }
    });
    setCheckedServicesIds(newCheckedList);
  };

  const addNewServices = (newServicesIds) => {
    props.setServices(newServicesIds).then(res => {
      props.navigation.navigate(isFromSettings ? 'Main' : 'WorkingHours');
    }).catch(e => console.log(e));
  };

  const onPressSaveNext = () => {
    if (serviceNotification) {
      props.setOnboardingProgress(ONBOARDING_SLUGS.SPECIALIST_SETUP_SERVICE)
    }
    if (uncheckedServicesIds.length) {
      props.removeServices(uncheckedServicesIds).then(res => {
        const existingIds = props.specialistServices.map(s => s.id);
        const newServicesIds = checkedServicesIds.filter(cs => {
          if (!existingIds.includes(cs)) {
            return cs
          }
        });
        console.log(newServicesIds, 'newServicesIds')
        if (newServicesIds.length) {
          addNewServices(newServicesIds);
        } else {
          setUncheckedServicesIds([]);
          props.navigation.navigate(isFromSettings ? 'Main' : 'WorkingHours');
        }
        return;
      }).catch(e => {
        console.log(e)
        return;
      });
    } else {
      const existingIds = props.specialistServices.map(s => s.id);
      const newServicesIds = checkedServicesIds.filter(cs => {
        console.log(!existingIds.includes(cs), '!existingIds.includes(cs.id)')
        if (!existingIds.includes(cs)) {
          return cs
        }
      });
      if (newServicesIds.length) {
        addNewServices(newServicesIds);
      } else {
        props.navigation.reset({
          routes: [{ name: 'Main' }]
        });
        props.navigation.navigate(isFromSettings ? 'Main' : 'WorkingHours');
      }
    }
  };

  const onSubmitSearch = (serviceName) => {
    props.navigation.navigate('Services', {searchServiceName: serviceName, isFromSettings: isFromSettings});
  };

  return (
      <ScreenContainer>
        <MainHeader isNoBackArrow={!isFromSettings} onLeftIconClick={props.navigation.goBack} title={isFromSettings ? 'Select Categories' : 'Step 1'}/>
        <ScrollView style={{width: '100%'}}>
          <Text style={styles.title}>{translate('onboarding.categories.letClientsKnow')}</Text>
          <SearchInput onSubmitEditing={onSubmitSearch} placeholder={translate('onboarding.categories.search')}/>
          <View style={styles.titleContainer}>
           <Text style={styles.serviceMainTitle}>{translate('onboarding.categories.categories')}</Text>
          </View>
          <View style={styles.subCategoriesWrapper}>
            <Carousel
              layoutCardOffset={props.mainCategories.length - 1}
              layout={'default'}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              activeSlideAlignment={'start'}
              data={props.mainCategories}
              renderItem={renderCategoryItem}
              sliderWidth={iamgeSizeheight}
              itemWidth={iamgeSizeheight * 0.55}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.serviceMainTitle}>{translate('onboarding.categories.popularNearYou')}</Text>
          </View>
          <View style={styles.subCategoriesWrapper}>
            <Carousel
              layoutCardOffset={props.topServices.length}
              layout={'default'}
              data={props.topServices}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              activeSlideAlignment={'start'}
              renderItem={renderServiceItems}
              sliderWidth={iamgeSizeheight}
              itemWidth={iamgeSizeheight * 0.55}
            />
          </View>
          {
            services.length ? <DefaultButton
              disabled={checkedServicesIds.length === 0}
              title={isFromSettings ? translate('save') : translate('next')}
              onPress={onPressSaveNext}
              containerStyle={{marginTop: 40}}
            /> : null
          }
        </ScrollView>
      </ScreenContainer>
  );
};

export default Categories;
