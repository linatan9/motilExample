import WorkingDays from './WorkingDays';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    daysOfWeek: state.specialist.daysOfWeek,
    workingDays: state.specialist.workingDays,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeDayOff: daysOfWeek =>
      dispatch(specialistAction.onChangeDayOff(daysOfWeek)),
    saveDaysOff: daysOff => dispatch(specialistAction.saveDaysOff(daysOff)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingDays);
