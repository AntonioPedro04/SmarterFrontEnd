import questionView from '../views/questions/questionView';
import * as model from '../model';

class QuestionsController {
  init() {
    questionView.goToNextQuestionEvent();
    questionView.goToPreviousQuestionEvent();
    console.log(questionView.questions);
    console.log(questionView.arrowLeft);
    console.log(questionView.arrowRight);
  }
}

controller = new QuestionsController();
controller.init();
