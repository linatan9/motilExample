import ChangePasswordSettings from './ChangePasswordSettings';

import {connect} from 'react-redux';
import * as authAction from '../../../redux/auth/action';

const mapStateToProps = state => {
  return {
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (data) => dispatch(authAction.changePassword(data)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordSettings);
