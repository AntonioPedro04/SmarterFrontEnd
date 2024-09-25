import questionView from '../views/questions/questionView';
import * as model from '../model';

class QuestionsController {
  init() {
    this.#controlCurrentList();
  }

  #controlCurrentList = async function () {
    try {
      await model.getCurrrentList();
      questionView.renderCurrentList(model.state.currentList);
      questionView.goToNextQuestionEvent();
      questionView.goToPreviousQuestionEvent();
    } catch (err) {
      console.log(console.error(err));
    }
  };
}

controller = new QuestionsController();
controller.init();
