import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {colors, icons} from "../../../constants";

import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import ServiceItem from '../Categories/components/ServiceItem/ServiceItem';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { getNotificationBySlug } from '../../../constants/helpers';
import { ONBOARDING_SLUGS } from '../../../constants/data';

const SubCategoryItem = ({item, title, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress(item)} style={styles.categotyItemContainer}>
      <Text numberOfLines={2} style={styles.subCategoryTitle}>{title}</Text>
    </TouchableOpacity>
  )
};

export  const Subcategories = (props) => {
  const [checkedServicesIds, setCheckedServicesIds] = useState([]);
  const [existingServicesIds, setExistingServicesIds] = useState([]);
  const [uncheckedServicesIds, setUncheckedServicesIds] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [isServicesInRootCategory, setIsServicesInRootCategory] = useState(false);
  const [serviceNotification, setServiceNotification] = useState(getNotificationBySlug(props.specialistNotifications, ONBOARDING_SLUGS.SPECIALIST_SETUP_SERVICE));


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

  const isFromSettings = props?.route?.params?.isFromSettings;
  console.log('Subcategories')
  const category = props?.route?.params?.category;
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



  useEffect(() => {
    if(category) {
      const newSubCategories = props.categories.filter(c => c.parent === category.category);
      setSubCategories(newSubCategories);
      props.getServicesByCategory(category.category).then(servicesList => {
        const isInRoot = servicesList.every(s => s.category === category.category);
        console.log(isInRoot, 'isInRootisInRootisInRootisInRootisInRoot')
        if (servicesList?.length > 0 && isInRoot) {
          getExistingServicesIds(servicesList);
          setServices(servicesList);
          setIsServicesInRootCategory(true);
        }
      }).catch(e => {
        console.log(e,' ERROR');
      })
    }
  }, [category]);

  const addNewServices = (newServicesIds) => {
    props.setServices(newServicesIds).then(res => {
      props.navigation.navigate(isFromSettings ? 'Main' : 'WorkingHours');
    }).catch(e => console.log(e));
  };
  const onPressNext = () => {
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

      console.log(newServicesIds, 'newServicesIdsnewServicesIdsnewServicesIds', checkedServicesIds, existingIds)
      if (newServicesIds.length) {
        addNewServices(newServicesIds);
      } else {
        props.navigation.navigate(isFromSettings ? 'Main' : 'WorkingHours');
      }
    }
  };

  return (
      <ScreenContainer>
        <MainHeader onLeftIconClick={props.navigation.goBack} title={category?.name}/>
        <ScrollView style={{width: '100%'}}>

          <View style={styles.titleContainer}>
           <Text style={styles.title}>{category?.name}</Text>
          </View>
          {
            isServicesInRootCategory ? (
              <View style={styles.subCategoriesWrapper}>
                {
                  services.map(s => (
                    <ServiceItem
                      key={s.id}
                      isChecked={checkedServicesIds.includes(s.id) && !uncheckedServicesIds.includes(s.id)}
                      id={s.id} onPress={onChecklService}
                      title={s.name}
                      price={s.price}
                    />
                  ))
                }
              </View>
            ) : (
              <View style={styles.subCategoriesWrapper}>
                {
                  subCategories.map(sc => <SubCategoryItem key={sc.id} onPress={(category) => props.navigation.navigate('Services', {category: category, isFromSettings: isFromSettings}) } item={sc} title={sc.name}/>)
                }
              </View>
            )
          }
        </ScrollView>
        {
          services.length ? <DefaultButton
            disabled={checkedServicesIds.length === 0}
            title={isFromSettings ? 'Save' : 'Next'}
            onPress={onPressNext}
            containerStyle={{marginTop: 10}}
          /> : null
        }
      </ScreenContainer>
  );
};

export default Subcategories;
