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
    loginView.addHandlerLogin(this.#controlValidate);
    loginView.addHandlerSignUp(this.#controlRegister);
    loginView.addGoToSignUpEvent();
    loginView.addSelectEvent();
  }

  #controlValidate = async function () {
    try {
      const formData = loginView.getFormData();
      await model.validateLogin(formData);
      console.log(model.state.token);
      localStorage.setItem('token', JSON.stringify(model.state.token));
      loginView.goToMainPage();
    } catch (err) {
      loginView.renderMessageLogin('Invalid Username or Password');
    }
  };

  #controlRegister = async function () {
    try {
      const formData = loginView.getSignUpData();
      console.log(formData);
      model.validatePassword(formData.password, formData.confirmation);
      model.validateUsername(formData.username);
      model.validateCountry(formData.country);
      await model.registerUser(formData);
      localStorage.setItem('token', JSON.stringify(model.state.token));
      loginView.goToMainPage();
    } catch (err) {
      loginView.renderMessageSignUp(err.message);
    }
  };
}

const controller = new landingLoginPageController();
controller.init();
