import SignUpExternal from './SignUpExternal';

import {connect} from 'react-redux';
import * as authAction from "../../../redux/auth/action";
import * as specialistAction from '../../../redux/specialist/action';


const mapStateToProps = state => {
  return {
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpExternal: (userData) => dispatch(authAction.signUpExternal(userData)),
    getSpecialistServices: () => dispatch(specialistAction.getSpecialistServices()),
    getNotifications: () => dispatch(specialistAction.getNotifications()),
    getSchedule: () => dispatch(specialistAction.getSchedule()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpExternal);
