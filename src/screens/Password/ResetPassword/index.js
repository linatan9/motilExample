import ResetPassword from './ResetPassword';

import {connect} from 'react-redux';
import * as authAction from '../../../redux/auth/action';

const mapStateToProps = state => {
  return {
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    resetPasswordRequest: (email) => dispatch(authAction.resetPasswordRequest(email)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
