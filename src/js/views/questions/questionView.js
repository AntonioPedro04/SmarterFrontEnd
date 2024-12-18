class QuestionsView {
  slider = document.querySelector('.slider');
  questions;
  totalQuestions;
  arrowLeft = document.querySelector('.arrow.left');
  arrowRight = document.querySelector('.arrow.right');
  dots = document.querySelectorAll('.dot');
  skipButton = document.getElementById('skip');
  checkButton = document.getElementById('check');
  answerDiv = document.querySelector('.answer-background');
  skipDiv = document.querySelector('.skip-container');
  checkDiv = document.querySelector('.check-container');
  currentExercise = 0;
  activeAnswer;
  lessonCompleted = false;
  finalScreen = false;

  goToNextQuestionEvent() {
    this.questions = document.querySelectorAll('.exercise');
    this.totalQuestions = this.questions.length;
    this.arrowRight?.addEventListener('click', () => {
      this.previousExercise = this.currentExercise;

      if (this.currentExercise == this.totalQuestions - 1) {
        this.currentExercise = 0;
      } else {
        this.currentExercise += 1;
      }
      this.questions.forEach((question) => {
        question.style.transform = `translateX(${
          -100 * this.currentExercise
        }%)`;
      });
    });
  }
  goToPreviousQuestionEvent() {
    this.arrowLeft?.addEventListener('click', () => {
      this.previousExercise = this.currentExercise;
      if (this.currentExercise == 0) {
        this.currentExercise = this.totalQuestions - 1;
      } else {
        this.currentExercise -= 1;
      }
      this.questions.forEach((question) => {
        question.style.transform = `translateX(${
          -100 * this.currentExercise
        }%)`;
      });
    });
  }

  goToNextQuestion() {
    this.questions = document.querySelectorAll('.exercise');
    this.totalQuestions = this.questions.length;
    this.previousExercise = this.currentExercise;

    if (this.currentExercise == this.totalQuestions - 1) {
      this.currentExercise = 0;
    } else {
      this.currentExercise += 1;
    }
    this.questions.forEach((question) => {
      question.style.transform = `translateX(${-100 * this.currentExercise}%)`;
    });
  }

  renderCurrentList(currentList) {
    currentList.exercises.forEach((exercise, index) => {
      const alternatives = exercise.question.alternatives;

      const alternativeMapped = alternatives.map((alternative) => {
        return `<button class="learn-button alternative" id="${alternative.id}">${alternative.text}</button>`;
      });

      const alternativeMarkup = alternativeMapped.join('');

      const markup = `<div class="exercise" id="${exercise.question.id}" initialIndex="${index}">
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

  selectAlternativeEvent() {
    // using eventDelegation, instead of adding 40 callbackfunctions, we will add only one
    this.slider.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('learn-button') &&
        !e.target.classList.contains('bottom')
      ) {
        const button = e.target;
        button.get;
        button.classList.add('active');
        this.#removeClassFromSiblings(button);
        this.activeAnswer = button.innerText;
        this.checkButton.disabled = false;
      }
    });
  }

  #removeClassFromSiblings(button) {
    const siblings = Array.prototype.slice
      .call(button.parentElement.children)
      .filter((el) => {
        return el !== button;
      });
    siblings.map((sibling) => {
      sibling.classList.remove('active');
    });
  }

  skipExerciseEvent() {
    this.skipButton.addEventListener('click', () => {
      let myAudio = document.querySelector('#incorrect');
      myAudio.play();
      this.addExerciseToEnd();
      this.disableClickOnAlternatives(this.questions[this.currentExercise]);
      this.answerDiv.classList.add('incorrect');
      this.checkButton.classList.add('incorrect');
      this.skipButton.style.display = 'none';
      this.checkButton.innerText = 'Continue';
      this.checkButton.disabled = false;
    });
  }

  checkAnswer(currentList) {
    console.log(currentList.exercises);

    const exerciseInitialIndex =
      this.questions[this.currentExercise].getAttribute('initialIndex');

    if (this.checkButton.classList.contains('incorrect')) {
      this.resetToDefaultState('incorrect');
      this.goToNextQuestion();
      return;
    }

    if (this.checkButton.classList.contains('correct')) {
      this.resetToDefaultState('correct');
      this.goToNextQuestion();
      return;
    }
    if (
      this.activeAnswer ==
      currentList.exercises[exerciseInitialIndex].question.answers[0].text
    ) {
      let myAudio = document.querySelector('#correct');
      myAudio.play();
      console.log('correct');
      this.disableClickOnAlternatives(this.questions[this.currentExercise]);
      this.answerDiv.classList.add('correct');
      this.checkButton.classList.add('correct');
      this.skipButton.style.display = 'none';
      this.checkButton.innerText = 'Continue';
      console.log(currentList.exercises[exerciseInitialIndex]);
      return {
        exerciseId: currentList.exercises[exerciseInitialIndex].id,
        status: 'correct',
      };
    } else {
      let myAudio = document.querySelector('#incorrect');
      myAudio.play();
      console.log('incorrect');
      this.addExerciseToEnd();
      this.disableClickOnAlternatives(this.questions[this.currentExercise]);
      this.answerDiv.classList.add('incorrect');
      this.checkButton.classList.add('incorrect');
      this.skipButton.style.display = 'none';
      this.checkButton.innerText = 'Continue';
      return {
        exerciseId: currentList.exercises[exerciseInitialIndex].id,
        status: 'wrong',
      };
    }
  }

  disableClickOnAlternatives(exerciseEl) {
    exerciseEl.querySelectorAll('.learn-button').forEach((button) => {
      button.style.pointerEvents = 'none';
    });
  }

  addHandlerCheck(handler) {
    this.checkButton.addEventListener('click', () => {
      handler();
    });
  }

  addExerciseToEnd() {
    const activeButton =
      this.questions[this.currentExercise].querySelector('.active');
    activeButton?.classList.toggle('active');

    this.slider.insertAdjacentHTML(
      'beforeend',
      this.questions[this.currentExercise].outerHTML
    );
  }

  resetToDefaultState(state) {
    this.checkButton.classList.toggle(`${state}`);
    this.answerDiv.classList.toggle(`${state}`);
    this.skipButton.style.display = 'block';
    this.checkButton.innerText = 'Check';
    this.checkButton.disabled = true;
  }

  addLessonCompletedToEnd(execisesLength) {
    const markup = `<div class="exercise completed">
    <div class="text completed">Congratulations!</div>
    <div class="text completed">You Completed This Lesson!</div>
    <h5 class="total-xp">Total XP</h5>
    <h1 class="xp-number">+${execisesLength * 10}</h1>
  </div>
  <div class="dots">`;

    console.log(execisesLength);

    this.slider.insertAdjacentHTML('beforeend', markup);
  }

  renderButtonsCompletedStatus() {
    this.checkButton.disabled = false;
    this.checkButton.innerText = 'Continue';
    this.skipButton.style.display = 'none';
  }

  setFinalScreen(finalScreen) {
    this.finalScreen = finalScreen;
  }

  goToMainPage() {
    window.location.href = '../../homePage.html';
  }

  playLessonCompletedAudio() {
    let myAudio = document.querySelector('#lessonCompleted');
    myAudio.play();
  }
}

export default new QuestionsView();
