import SignIn from './SignIn';

import {connect} from 'react-redux';
import * as authAction from '../../../redux/auth/action';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    specialistNotifications: state.specialist.specialistNotifications,
    user: state.auth?.user?.user,
    token: state.auth?.user?.token,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password, coordinates, fcmToken) =>
      dispatch(authAction.signIn(email, password, coordinates, fcmToken)),
    signInExternal: data => dispatch(authAction.signInExternal(data)),
    refreshToken: auth => dispatch(authAction.refreshToken(auth)),
    getSpecialistServices: () =>
      dispatch(specialistAction.getSpecialistServices()),
    getNotifications: () => dispatch(specialistAction.getNotifications()),
    getSchedule: () => dispatch(specialistAction.getSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
