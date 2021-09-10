import SherableSchedule from './SherableSchedule';
import * as specialistAction from '../../../redux/specialist/action';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    usersSlug: state.auth?.user?.user?.slug,
    specialistNotifications: state.specialist.specialistNotifications,
    selectedLanguage: state.auth?.user?.user?.selectedLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOnboardingProgress: (slug) => dispatch(specialistAction.setOnboardingProgress(slug)),
    shareLink: (link, notificationSlug) => dispatch(specialistAction.shareLink(link, notificationSlug)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SherableSchedule);
