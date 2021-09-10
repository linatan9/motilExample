import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {colors, icons} from "../../../../../constants/index";
import {Input} from 'react-native-elements';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DefaultButton from '../../../../../components/DefaultButton/DefaultButton';


const DurationTime = ({onChange}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const onChangeDuration = (isMore) => {
    if (isMore) {
      const newMinutesValue = minutes === 0 ? 30 : 0;
      setMinutes(newMinutesValue);
      const newHoursValue = newMinutesValue === 30 ? hours : hours + 1;
      setHours(newHoursValue);
    } else if (hours > 0 ) {
      const newMinutesValue = minutes === 0 ? 30 : 0;
      setMinutes(newMinutesValue);
      const newHoursValue = newMinutesValue === 0 ? hours : hours - 1;
      setHours(newHoursValue);
    }
  };

  useEffect(() => {
    onChange({hours, minutes});
  }, [hours, minutes]);

  return (
    <View style={styles.container} >
      <View style={styles.valuesContainer}>
        <TouchableOpacity onPress={() => onChangeDuration(false)} style={styles.changeDurationButton}>
          <icons.Minus/>
        </TouchableOpacity>
        <View style={styles.durationValueItemContainer}>
          <Text style={styles.durationItemValueText}>{hours > 10 ? hours : `0${hours}`}</Text>
        </View>
        <Text style={styles.durationItemValueText}>:</Text>
        <View>
          <Text style={styles.durationItemValueText}>{minutes > 0 ? minutes : `0${minutes}`}</Text>
        </View>
        <TouchableOpacity onPress={() => onChangeDuration(true)} style={styles.changeDurationButton}>
          <icons.PlusIcon/>
        </TouchableOpacity>

      </View>
      <View style={styles.durationTitlesRow}>
        <Text style={[styles.timeValuesTitle, {textAlign: 'right', paddingRight: 30}]}>Hours</Text>
        <Text style={styles.timeValuesTitle}>Minutes</Text>
      </View>
    </View>
  )
};

export default DurationTime;
