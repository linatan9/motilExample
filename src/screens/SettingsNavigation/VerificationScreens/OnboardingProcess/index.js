import OnboardingProcess from './OnboardingProcess';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    specialistNotifications: state.specialist.specialistNotifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingProcess);
