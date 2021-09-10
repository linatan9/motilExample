import BookingsList from './BookingsList';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUpcomingsTasks: () => dispatch(specialistAction.getUpcomingsTasks()),
    getHistoryTasks: () => dispatch(specialistAction.getHistoryTasks()),
    changeTaskStatus: (taskId, status) => dispatch(specialistAction.changeTaskStatus(taskId, status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingsList);
