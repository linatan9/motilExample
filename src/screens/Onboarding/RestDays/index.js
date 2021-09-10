import RestDays from './RestDays';

import {connect} from 'react-redux';
import * as specialistActions  from "../../../redux/specialist/action";

const mapStateToProps = state => {
  return {
    markedDates: state.test.markedDates,
    daysOfWeek: state.specialist.daysOfWeek,
    specificDates: state.specialist.specificDates,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDateSchedule: (date) => dispatch(specialistActions.getDateSchedule(date)),
    saveDaysOff: (daysOff) => dispatch(specialistActions.saveDaysOff(daysOff)),
    setDayOffForCetainDate: (data) => dispatch(specialistActions.setDayOffForCetainDate(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestDays);
