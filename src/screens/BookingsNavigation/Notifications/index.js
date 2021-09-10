import Notifications from './Notifications';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    specialistNotifications: state.specialist.specialistNotifications,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
