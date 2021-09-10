import SelectCategories from './SelectCategories';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    services: state.specialist.services,
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
)(SelectCategories);
