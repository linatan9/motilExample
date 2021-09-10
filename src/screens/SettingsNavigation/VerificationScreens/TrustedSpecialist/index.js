import TrustedSpecialist from './TrustedSpecialist';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    markedDates: state.test.markedDates
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrustedSpecialist);
