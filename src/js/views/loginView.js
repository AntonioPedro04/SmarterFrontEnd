class LoginModalView {
  #labels = document.querySelectorAll('label');
  #svg = document.querySelector('.cross');
  #form = document.querySelector('form');
  #usernameEl = document.getElementById('username');
  #passwordEl = document.getElementById('password');

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
    this.#svg.addEventListener('click', () => {
      document.querySelector('.login-modal').classList.toggle('hidden');
    });
  }

  addHandlerSubmit(handler) {
    this.#form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  getFormData() {
    const username = this.#usernameEl.value;
    const userPassword = this.#passwordEl.value;
    return { username, userPassword };
  }

  goToMainPage() {
    window.location.href = '../../homePage.html';
  }
}

export default new LoginModalView();
