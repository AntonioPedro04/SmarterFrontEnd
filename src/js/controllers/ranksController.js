import ranksView from '../views/ranks/rankView.js';
import { findFlagUrlByCountryName } from 'country-flags-svg/dist';

class RanksController {
  init() {
    this.#controlRanks();
  }

  #controlRanks = async function () {
    try {
      const country = findFlagUrlByCountryName('Brazil');
      console.log(country);
      await model.getRanks();
      ranksView.renderRanks(model.state.ranks);
    } catch (err) {
      console.log(console.error(err));
    }
  };
}

controller = new RanksController();
controller.init();
