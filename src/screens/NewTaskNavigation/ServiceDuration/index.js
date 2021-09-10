import ServiceDuration from './ServiceDuration';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceDuration);
