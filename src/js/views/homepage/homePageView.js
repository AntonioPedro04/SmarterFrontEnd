import { findFlagUrlByIso3Code } from 'country-flags-svg/dist';

class HomePageView {
  #buttonLearn = document.querySelector('.learn-button');
  #rankListEl = document.querySelector('.rank-list');

  renderWelcomeMessage(data) {
    const containerEl = document.querySelector('.welcome-container');
    const markup = `<h1>Welcome back, ${data.username}</h1>`;
    console.log(markup);
    console.log(containerEl);
    containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderRank(rank) {
    console.log(rank);
    rank.forEach((userData) => {
      console.log(findFlagUrlByIso3Code(userData.country));
      const markup = `<li>
                  <div class="person">
                    <p class="position">${userData.position}</p>
                    <!--
                    <object
                      type="image/svg+xml"
                      data="${findFlagUrlByIso3Code(userData.country)}"
                      class=""
                    >
                      Your browser does not support SVG
                    </object>
                    -->
                    <p class="name">${userData.userName}</p>
                    <p class="exp">${userData.points} xp</p>
                  </div>
                </li>`;

      this.#rankListEl.insertAdjacentHTML('beforeend', markup);
    });
    console.log(this.#rankListEl);
  }

  renderUserRank(userRank) {
    const markup = `<div class="dots">
    <button class="dot" id="dot-2"></button>
    <button class="dot" id="dot-2"></button>
    <button class="dot" id="dot-2"></button>
    </div><li class="user"> 
      <div class="person">
        <p class="position">${userRank.position ? userRank.position : '-'}</p>
        <object
          type="image/svg+xml"
          data="${findFlagUrlByIso3Code(userRank.country)}"
          class=""
        >
          Your browser does not support SVG
        </object>
        <p class="name">${userRank.userName}</p>
        <p class="exp">${userRank.points} xp</p>
      </div>
    </li>`;
    this.#rankListEl.insertAdjacentHTML('beforeend', markup);
  }

  colorUserRankBackground(position) {
    console.log(
      this.#rankListEl
        .querySelectorAll('li')
        [position - 1].classList.add('user')
    );
  }

  addButtonLearnEvent() {
    console.log(this.#buttonLearn);
    this.#buttonLearn.addEventListener('click', () => {
      window.location.href = '../../questions.html';
    });
  }
}

export default new HomePageView();
