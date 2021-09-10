import Intro from './Intro';

import {connect} from 'react-redux';
import * as specialistAction from '../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    specialistNotifications: state.specialist.specialistNotifications,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPassedIntro: () => dispatch(specialistAction.setPassedIntro()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro);
