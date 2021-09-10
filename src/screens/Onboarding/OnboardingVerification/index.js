import OnboardingVerification from './OnboardingVerification';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    specialistNotifications: state.specialist.specialistNotifications,
    user: state.auth?.user?.user,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBackgroundCheckerUrl: () => dispatch(specialistAction.getBackgroundCheckerUrl()),
    setOnboardingProgress: (slug) => dispatch(specialistAction.setOnboardingProgress(slug)),
    getNotifications: () => dispatch(specialistAction.getNotifications()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingVerification);
