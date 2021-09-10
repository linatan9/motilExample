import Categories from './Categories';

import {connect} from 'react-redux';
import * as categoryAction from '../../../redux/category/action';
import * as specialistAction from '../../../redux/specialist/action';


const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    mainCategories: state.category.mainCategories,
    topServices: state.category.topServices,
    specialistServices: state.specialist.services,
    specialistNotifications: state.specialist.specialistNotifications,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(categoryAction.getCategories()),
    getMainCategories: () => dispatch(categoryAction.getMainCategories()),
    getTopServices: () => dispatch(categoryAction.getTopServices()),
    setOnboardingProgress: (slug) => dispatch(specialistAction.setOnboardingProgress(slug)),
    setServices: (categoriesIds) => dispatch(specialistAction.setServices(categoriesIds)),
    removeServices: (categoriesIds) => dispatch(specialistAction.removeServices(categoriesIds)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
