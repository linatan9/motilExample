import Language from './Language';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: (lang) => dispatch(specialistAction.changeLanguage(lang)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Language);
