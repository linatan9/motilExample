import CreateBooking from './CreateBooking';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {

  return {
    getCustomers: () => dispatch(specialistAction.getCustomers())

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBooking);
