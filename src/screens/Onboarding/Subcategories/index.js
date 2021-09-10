import Subcategories from './Subcategories';

import {connect} from 'react-redux';
import * as categoryAction from '../../../redux/category/action';
import * as serviceAction from '../../../redux/service/action';
import * as specialistAction from '../../../redux/specialist/action';

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    specialistServices: state.specialist.services,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
    specialistNotifications: state.specialist.specialistNotifications,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getServicesByCategory: (category) => dispatch(serviceAction.getServicesByCategory(category)),
    setServices: (categoriesIds) => dispatch(specialistAction.setServices(categoriesIds)),
    setOnboardingProgress: (slug) => dispatch(specialistAction.setOnboardingProgress(slug)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Subcategories);
