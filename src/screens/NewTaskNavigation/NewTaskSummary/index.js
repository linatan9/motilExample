import NewTaskSummary from './NewTaskSummary';

import {connect} from 'react-redux';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    services: state.specialist.services,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewTask: data => dispatch(specialistAction.createNewTask(data)),
    getCustomerCards: id => dispatch(specialistAction.getCustomerCards(id)),
    getCustomers: () => dispatch(specialistAction.getCustomers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskSummary);
