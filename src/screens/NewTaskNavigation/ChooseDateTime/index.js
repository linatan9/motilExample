import ChooseDateTime from './ChooseDateTime';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    user: state.auth?.user?.user,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAvailability: (date, id, duration) => dispatch(specialistAction.getAvailability(date, id, duration))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseDateTime);
