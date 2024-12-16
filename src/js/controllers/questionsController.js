import questionView from '../views/questions/questionView';
import * as model from '../model';

class QuestionsController {
  init() {
    this.#controlCurrentList();
    questionView.addHandlerCheck(this.#controlUserAnswers);
  }

  #controlCurrentList = async function () {
    try {
      await model.getCurrrentList();
      questionView.renderCurrentList(model.state.currentList);
      questionView.selectAlternativeEvent();
      // questionView.checkAnswerEvent(model.state.currentList);
      questionView.skipExerciseEvent();
      questionView.goToPreviousQuestionEvent();
      questionView.goToNextQuestionEvent();
    } catch (err) {
      console.log(console.error(err));
    }
  };

  #controlUserAnswers = async function () {
    try {
      if (questionView.finalScreen) {
        questionView.goToMainPage();
        return;
      }

      if (model.allExerciseDone()) {
        if (await model.UserAlreadyDoneList(model.state.currentList.id)) {
          questionView.addLessonCompletedToEnd(0);
        } else {
          questionView.addLessonCompletedToEnd(
            model.state.currentList.exercises.length
          );
        }

        questionView.resetToDefaultState('correct');
        questionView.goToNextQuestion();
        questionView.renderButtonsCompletedStatus();
        questionView.setFinalScreen(true);
        questionView.playLessonCompletedAudio();
        model.postUserAnswers(model.state.userAnswers);
        return;
      }

      await model.getLoggedUser();

      const { exerciseId, status } =
        questionView.checkAnswer(model.state.currentList) || {};

      model.processAnswer(exerciseId, status, model.state.user);
    } catch (err) {
      console.log(err);
    }
  };
}

controller = new QuestionsController();
controller.init();
