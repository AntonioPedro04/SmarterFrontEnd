class LoginModalView {
  #labels = document.querySelectorAll('label');
  #svgs = document.querySelectorAll('.cross');
  #loginFormEl = document.querySelector('.login-form');
  #signUpFormEl = document.querySelector('.signup-form');
  #usernameEl = document.getElementById('username');
  #passwordEl = document.getElementById('password');
  #signupSpanEl = document.querySelector('.signup-span');
  #selectEl = document.querySelector('.select-country');
  #usernameSignupEl = document.getElementById('username-signup');
  #passwordSignupEl = document.getElementById('password-signup');
  #confirmationEl = document.getElementById('password-confirmation');
  #codeEl = document.getElementById('code');
  #formControlPasswordEl = document.querySelector('.form-control-password');
  #formControlCodeEl = document.querySelector('.form-control-code');

  createInputAnimation() {
    this.#labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, i) => {
          return `<span style="transition-delay:${i * 50}ms">${letter}</span>`;
        })
        .join('');
    });
  }

  addCrossEvent() {
    this.#svgs.forEach((svg) => {
      svg.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.toggle('hidden');
      });
    });
  }

  addGoToSignUpEvent() {
    this.#signupSpanEl.addEventListener('click', () => {
      document.querySelector('.login-modal').classList.toggle('hidden');
      document.querySelector('.signup-modal').classList.toggle('hidden');
    });
  }

  addSelectEvent() {
    this.#selectEl.addEventListener('change', () => {
      if (this.#selectEl.value !== '0') {
        this.#selectEl.classList.remove('default');
        return;
      }
      this.#selectEl.classList.add('default');
    });
  }

  addHandlerLogin(handler) {
    this.#loginFormEl.addEventListener('submit', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  addHandlerSignUp(handler) {
    this.#signUpFormEl.addEventListener('submit', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  getFormData() {
    const username = this.#usernameEl.value;
    const password = this.#passwordEl.value;
    return { username, password };
  }

  getSignUpData() {
    const username = this.#usernameSignupEl.value;
    const password = this.#passwordSignupEl.value;
    const confirmation = this.#confirmationEl.value;
    const country = this.#selectEl.value;
    const code = this.#codeEl.value;
    return { username, password, confirmation, country, code };
  }

  goToMainPage() {
    window.location.href = '../../homePage.html';
  }

  renderMessageLogin(message) {
    const markup = `<div class="error login">${message}</div>`;

    this.#formControlPasswordEl.insertAdjacentHTML('beforeend', markup);
  }

  renderMessageSignUp(message) {
    const markup = `<div class="error login">${message}</div>`;

    const lastChild = this.#formControlCodeEl.lastElementChild;

    if (lastChild.classList.contains('error')) {
      lastChild.remove();
    }

    this.#formControlCodeEl.insertAdjacentHTML('beforeend', markup);
  }
}

export default new LoginModalView();
