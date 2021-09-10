import EditPersonalInfo from './EditPersonalInfo';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    user: state.auth?.user?.user,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUserProfile: (profileData) => dispatch(specialistAction.changeUserProfile(profileData)),
    setUserFacebook: (profileData) => dispatch(specialistAction.setUserFacebook(profileData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPersonalInfo);
