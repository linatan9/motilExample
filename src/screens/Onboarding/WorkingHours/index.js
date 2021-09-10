import WorkingHours from './WorkingHours';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    workingDays: state.specialist.workingDays,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWorkingHours: workingHours =>
      dispatch(specialistAction.setWorkingHours(workingHours)),
    changeDaySchedule: dayOfWeek =>
      dispatch(specialistAction.changeDaySchedule(dayOfWeek)),
    setCertainDateSchedule: dayOfWeek =>
      dispatch(specialistAction.setCertainDateSchedule(dayOfWeek)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingHours);
