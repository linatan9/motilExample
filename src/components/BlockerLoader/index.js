import BlockerLoader from './BlockerLoader';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    loading: state.blocker.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlockerLoader);
