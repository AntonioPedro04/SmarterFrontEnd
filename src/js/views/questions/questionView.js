class QuestionsView {
  questions = document.querySelectorAll('.question');
  arrowLeft = document.querySelector('.arrow.left');
  arrowRight = document.querySelector('.arrow.right');
  dots = document.querySelectorAll('.dot');
  currentQuestion = 0;
  totalQuestions = this.questions.length;

  goToNextQuestionEvent() {
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
}

export default new QuestionsView();
