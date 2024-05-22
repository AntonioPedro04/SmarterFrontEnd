import homePageView from '../views/homePageView';
import * as model from '../model';

class HomePageController {
  init() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    homePageView.renderMessage(userData);
  }
}

const controller = new HomePageController();
controller.init();
