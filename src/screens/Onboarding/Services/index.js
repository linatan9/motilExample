import Services from './Services';

import {connect} from 'react-redux';
import * as serviceAction from '../../../redux/service/action';
import * as specialistAction from '../../../redux/specialist/action';
import * as categoryAction from '../../../redux/category/action';

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    specialistServices: state.specialist.services,
    specialistNotifications: state.specialist.specialistNotifications,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getServicesByCategory: (category) => dispatch(serviceAction.getServicesByCategory(category)),
    setServices: (categoriesIds) => dispatch(specialistAction.setServices(categoriesIds)),
    removeServices: (categoriesIds) => dispatch(specialistAction.removeServices(categoriesIds)),
    setOnboardingProgress: (slug) => dispatch(specialistAction.setOnboardingProgress(slug)),
    getServiceByName: (searchServiceName) => dispatch(categoryAction.getServiceByName(searchServiceName)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Services);
