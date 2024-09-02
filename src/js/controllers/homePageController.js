import homePageView from '../views/homepage/homePageView';
import headerView from '../views/homepage/headerView';
import * as model from '../model';

class HomePageController {
  init() {
    homePageView.addButtonLearnEvent();
    this.#controlLoggedUser();
  }

  #controlLoggedUser = async function () {
    await model.getLoggedUser();
    homePageView.renderWelcomeMessage(model.state.user);
  };
}

controller = new HomePageController();
controller.init();
