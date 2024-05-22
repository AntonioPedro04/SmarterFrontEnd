class HomePageView {
  renderMessage(data) {
    const containerEl = document.querySelector('.container');
    const markup = `<h1>hello ${data.username}</h1>`;
    console.log(markup);
    console.log(containerEl);
    containerEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new HomePageView();
