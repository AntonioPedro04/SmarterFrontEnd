class QuestionsView {
  slider = document.querySelector('.slider');
  questions;
  totalQuestions;
  arrowLeft = document.querySelector('.arrow.left');
  arrowRight = document.querySelector('.arrow.right');
  dots = document.querySelectorAll('.dot');
  currentQuestion = 0;

  goToNextQuestionEvent() {
    this.questions = document.querySelectorAll('.question');
    this.totalQuestions = this.questions.length;
    console.log(this.questions);
    this.arrowRight.addEventListener('click', () => {
      this.previousQuestion = this.currentQuestion;

      if (this.currentQuestion == this.totalQuestions - 1) {
        this.currentQuestion = 0;
      } else {
        this.currentQuestion += 1;
      }
      this.questions.forEach((question) => {
        question.style.transform = `translateX(${
          -100 * this.currentQuestion
        }%)`;
      });
      this.#animateDots(this.currentQuestion, this.previousQuestion);
    });
  }
  goToPreviousQuestionEvent() {
    this.arrowLeft.addEventListener('click', () => {
      this.previousQuestion = this.currentQuestion;
      if (this.currentQuestion == 0) {
        this.currentQuestion = this.totalQuestions - 1;
      } else {
        this.currentQuestion -= 1;
      }
      this.questions.forEach((question) => {
        question.style.transform = `translateX(${
          -100 * this.currentQuestion
        }%)`;
      });
      this.#animateDots(this.currentQuestion, this.previousQuestion);
    });
  }

  #animateDots(currentQuestion, previousQuestion) {
    this.dots[currentQuestion].classList.add('active');
    this.dots[previousQuestion].classList.remove('active');
  }

  renderCurrentList(currentList) {
    console.log(currentList);
    currentList.exercises.forEach((exercise) => {
      const alternatives = exercise.question.alternatives;

      const alternativeMapped = alternatives.map((alternative) => {
        return `<button class="learn-button">${alternative.text}</button>`;
      });

      const alternativeMarkup = alternativeMapped.join('');

      const markup = `<div class="question">
      <div class="text">
        <h1>${exercise.question.text}</h1>
      </div>
      <div class="options">
        ${alternativeMarkup}
      </div>
    </div>`;
      this.slider.insertAdjacentHTML('beforeend', markup);
    });
  }
}

export default new QuestionsView();
