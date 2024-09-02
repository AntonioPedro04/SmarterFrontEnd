import landingPageView from '../views/landingLoginPage/landingPageView';
import loginView from '../views/landingLoginPage/loginView';
import homePageView from '../views/homepage/homePageView';
import * as model from '../model';

class landingLoginPageController {
  init() {
    landingPageView.generateText();
    landingPageView.addButtonEvent();
    loginView.createInputAnimation();
    loginView.addCrossEvent();
    loginView.addHandlerSubmit(this.#controlValidate);
  }

  #controlValidate = async function () {
    try {
      const formData = loginView.getFormData();
      await model.validateLogin(formData);
      console.log(model.state.token);
      localStorage.setItem('token', JSON.stringify(model.state.token));
      loginView.goToMainPage();
    } catch (err) {
      console.log(console.error(err));
    }
  };
}

controller = new landingLoginPageController();
controller.init();
