class HomePageView {
  #buttonLearn = document.querySelector('.learn-button');

  renderWelcomeMessage(data) {
    const containerEl = document.querySelector('.welcome-container');
    const markup = `<h1>Welcome back, ${data.firstname}</h1>`;
    console.log(markup);
    console.log(containerEl);
    containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  addButtonLearnEvent() {
    console.log(this.#buttonLearn);
    this.#buttonLearn.addEventListener('click', () => {
      window.location.href = '../../questions.html';
    });
  }
}

export default new HomePageView();
