import questionView from '../views/questions/questionView';
import * as model from '../model';

class QuestionsController {
  init() {
    questionView.goToNextQuestionEvent();
    questionView.goToPreviousQuestionEvent();
  }
}

controller = new QuestionsController();
controller.init();
