class QuestionsView {
  questions = document.querySelectorAll('.question');
  arrowLeft = document.querySelector('.arrow.left');
  arrowRight = document.querySelector('.arrow.right');
  dots = document.querySelectorAll('.dot');
  currentQuestion = 0;
  previousQuestion;
  totalQuestions = this.questions.length;

  goToNextQuestionEvent() {
    this.arrowRight.addEventListener('click', () => {
      if (this.currentQuestion == this.totalQuestions - 1) {
        this.questions[this.currentQuestion].classList.remove('active');
        this.questions[0].classList.add('active');
        this.previousQuestion = this.currentQuestion;
        this.currentQuestion = 0;
        this.#animateDots(this.currentQuestion, this.previousQuestion);
        console.log(this.dots);
        return;
      }
      this.questions[this.currentQuestion].classList.remove('active');
      this.questions[this.currentQuestion + 1].classList.add('active');
      this.previousQuestion = this.currentQuestion;
      this.currentQuestion += 1;
      this.#animateDots(this.currentQuestion, this.previousQuestion);
    });
  }
  goToPreviousQuestionEvent() {
    this.arrowLeft.addEventListener('click', () => {
      if (this.currentQuestion == 0) {
        this.questions[this.currentQuestion].classList.remove('active');
        this.questions[this.totalQuestions - 1].classList.add('active');
        this.previousQuestion = this.currentQuestion;
        this.currentQuestion = this.totalQuestions - 1;
        this.#animateDots(this.currentQuestion, this.previousQuestion);
        return;
      }
      this.questions[this.currentQuestion].classList.remove('active');
      this.questions[this.currentQuestion - 1].classList.add('active');
      this.previousQuestion = this.currentQuestion;
      this.currentQuestion -= 1;
      this.#animateDots(this.currentQuestion, this.previousQuestion);
    });
  }

  #animateDots(currentQuestion, previousQuestion) {
    this.dots[currentQuestion].classList.add('active');
    this.dots[previousQuestion].classList.remove('active');
  }
}

export default new QuestionsView();
