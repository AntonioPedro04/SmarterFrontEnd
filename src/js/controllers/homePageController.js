import homePageView from '../views/homepage/homePageView';
import headerView from '../views/homepage/headerView';
import * as model from '../model';

class HomePageController {
  init() {
    homePageView.addButtonLearnEvent();
    this.#controlLoggedUser();
    this.#controlWeekRank();
  }

  #controlLoggedUser = async function () {
    await model.getLoggedUser();
    homePageView.renderWelcomeMessage(model.state.user);
  };

  #controlWeekRank = async function () {
    try {
      await model.getWeekRank();
      await model.getUserWeekRank();
      homePageView.renderRank(model.state.weekRank);

      if (model.isUserinTop10()) {
        homePageView.colorUserRankBackground(model.state.userRank.position);
        return;
      }

      homePageView.renderUserRank(model.state.userRank);
    } catch (err) {
      console.log(console.error(err));
    }
  };
}

controller = new HomePageController();
controller.init();
