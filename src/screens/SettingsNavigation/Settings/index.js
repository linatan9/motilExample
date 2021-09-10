import Settings from './Settings';

import {connect} from 'react-redux';
import * as authAction from '../../../redux/auth/action';

const mapStateToProps = state => {
  return {
    markedDates: state.test.markedDates,
    user: state.auth?.user?.user,
    token: state.auth?.user?.token,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: (email, password, fcmToken) => dispatch(authAction.logOutAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
