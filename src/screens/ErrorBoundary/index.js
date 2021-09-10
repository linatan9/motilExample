import ErrorBoundary from './ErrorBoundary';

import {connect} from 'react-redux';

import {clearError} from '../../redux/error/action';

const mapStateToProps = state => {
  return {
    errorType: state.error.type,
    errorMessage: state.error.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearError: () => {
      dispatch(clearError());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorBoundary);
