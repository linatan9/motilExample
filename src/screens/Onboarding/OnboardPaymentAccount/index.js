import OnboardPaymentAccount from './OnboardPaymentAccount';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    specialistNotifications: state.specialist.specialistNotifications,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: () => dispatch(specialistAction.getNotifications()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardPaymentAccount);
