class LandingPageView {
  #textEl = document.querySelector('h2');
  #button = document.querySelector('.start-button');
  #login = document.querySelector('.login-modal');
  #signup = document.querySelector('.signup-modal');
  #text = 'Medical knowledge. No downloads. Fun.';
  #letterIndex = 1;
  #intervalId = null;

  generateText() {
    this.#intervalId = setInterval(this.#appendLetter.bind(this), 90);
  }

  #appendLetter() {
    this.#textEl.innerText = this.#text.slice(0, this.#letterIndex);

    this.#letterIndex++;

    if (this.#letterIndex > this.#text.length) clearInterval(this.#intervalId);
  }
  addButtonEvent() {
    this.#button.addEventListener('click', () => {
      this.#signup.classList.toggle('hidden');
    });
  }
}

export default new LandingPageView();
