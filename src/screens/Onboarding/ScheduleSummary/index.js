import ScheduleSummary from './ScheduleSummary';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    markedDates: state.test.markedDates,
    workingDays: state.specialist.workingDays,
    daysOfWeek: state.specialist.daysOfWeek,
    specialistNotifications: state.specialist.specialistNotifications,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOnboardingProgress: (slug) => dispatch(specialistAction.setOnboardingProgress(slug)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleSummary);
