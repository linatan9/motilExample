import GeneralSettings from './ContactSettings';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    markedDates: state.test.markedDates,
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
)(GeneralSettings);
