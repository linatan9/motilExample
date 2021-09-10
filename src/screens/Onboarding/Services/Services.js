import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import {colors, icons} from "../../../constants";
import {translate} from '../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import ServiceItem from '../Categories/components/ServiceItem/ServiceItem';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { getNotificationBySlug } from '../../../constants/helpers';
import { ONBOARDING_SLUGS } from '../../../constants/data';

export  const Services = (props) => {
  const [checkedServicesIds, setCheckedServicesIds] = useState([]);
  const [uncheckedServicesIds, setUncheckedServicesIds] = useState([]);
  const [existingServicesIds, setExistingServicesIds] = useState([]);
  const [serviceNotification, setServiceNotification] = useState(getNotificationBySlug(props.specialistNotifications, ONBOARDING_SLUGS.SPECIALIST_SETUP_SERVICE));

  const [services, setServices] = useState([]);

  const isFromSettings = props?.route?.params?.isFromSettings;
  const searchServiceName = props?.route?.params?.searchServiceName;
  const category = props?.route?.params?.category;

  useEffect(() => {

  }, [searchServiceName]);

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

  useEffect(() => {
    if(searchServiceName) {
      props.getServiceByName(searchServiceName).then(servicesList => {
        if (servicesList?.length > 0) {
          setServices(servicesList);
          getExistingServicesIds(servicesList);
        }
      }).catch(e => {
        console.log(e,' ERROR');
      })
    } else if(category) {
      props.getServicesByCategory(category.category).then(servicesList => {
        if (servicesList?.length > 0) {
          setServices(servicesList);
          getExistingServicesIds(servicesList);
        }
      }).catch(e => {
        console.log(e,' ERROR');
      })
    }
  }, [category, searchServiceName]);

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
        <MainHeader onLeftIconClick={props.navigation.goBack} title={searchServiceName || category?.name}/>
        <ScrollView style={{width: '100%'}}>

          <View style={styles.titleContainer}>
           <Text style={styles.title}>{category?.name}</Text>
          </View>
          <View style={styles.subCategoriesWrapper}>
            {
              services.map(s => {
                console.log(s.id, checkedServicesIds.includes(s.id) , !uncheckedServicesIds.includes(s.id))
                return (
                <ServiceItem
                  key={s.id}
                  isChecked={checkedServicesIds.includes(s.id) && !uncheckedServicesIds.includes(s.id)}
                  id={s.id} onPress={onChecklService}
                  title={s.name}
                  price={s.price}
                />
              )}
              )
            }
          </View>
        </ScrollView>
        {
          services.length ? <DefaultButton
            disabled={checkedServicesIds.length === 0}
            title={isFromSettings ? translate('save') : translate('next')}
            onPress={onPressSaveNext}
            containerStyle={{marginTop: 10}}
          /> : null
        }
      </ScreenContainer>
  );
};

export default Services;
