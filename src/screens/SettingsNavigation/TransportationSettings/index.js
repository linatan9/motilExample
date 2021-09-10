import TransportationSettings from './TransportationSettings';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    vehicleType: state.auth.user?.user?.specialistProfile?.vehicleType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTransport: vehicleType =>
      dispatch(specialistAction.changeTransport(vehicleType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportationSettings);
