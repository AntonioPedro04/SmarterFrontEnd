import landingPageView from '../views/landingPageView';
import loginView from '../views/loginView';
import homePageView from '../views/homePageView';
import * as model from '../model';

class landingLoginPageController {
  init() {
    landingPageView.generateText();
    landingPageView.addButtonEvent();
    loginView.createInputAnimation();
    loginView.addCrossEvent();
    loginView.addHandlerSubmit(this.#controlLogin);
  }

  #controlLogin = async function () {
    try {
      const formData = loginView.getFormData();
      await model.validateLogin(formData);
      console.log(model.state.user);
      localStorage.setItem('userData', JSON.stringify(model.state.user));
      loginView.goToMainPage();
    } catch (err) {
      console.log(err.message);
    }
  };
}

controller = new landingLoginPageController();
controller.init();
