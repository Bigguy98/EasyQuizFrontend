import { Component, OnInit, ViewChild } from '@angular/core';
import { getRandomSelection, questionsBank } from '../constant/question';
import { QUESTION_DELAY_TIME, QUIZ_CORRECT_SOUND, QUIZ_WRONG_SOUND } from '../constant/quiz_constants';
import { quiz_templates } from '../constant/template';

@Component({
  selector: 'app-quiz-board',
  templateUrl: './quiz-board.component.html',
  styleUrls: ['./quiz-board.component.css']
})
export class QuizBoardComponent implements OnInit {

  
  constructor() {
    this.questions = getRandomSelection(questionsBank, this.numberOfQuestion)
    
  }
  numberOfQuestion = 10;
  currentIndex = 0;
  questions : any[];

  element : any;
  mark = 0; 
  trueAnswers : number[] = [];

  // init remarks
  remark : [] = [];
  states = {
    INTRO : "intro",
    QUIZ: "quiz",
    CONCLUSION: "conclusion"
  }
  currentState : string = this.states.INTRO;
  audio = new Audio()
  
  ngOnInit(): void {
    this.element = {
      quizContainer: document.querySelector('.quiz-container'),
      questionContainer : document.querySelector('.question-container'),
      introConclusion : document.querySelector('.conclusion'),
      multipleChoice : document.querySelector('.multiple-choice'),
      question: document.querySelector('.question')
    }  

    this.multiChoiceTrigger(); // only need to trigger once
    this.showIntro();
    
  }

  showIntro(): void {
    this.currentState = this.states.INTRO
    this.element.introConclusion.innerHTML = quiz_templates.intro()
    setTimeout(() => {
      this.startButtonTrigger()
    }, 10);
  }

  startButtonTrigger(): void {
    document.querySelector('.intro')?.querySelector('button')!.addEventListener('click', () => {
      this.restartQuiz()
      this.generateQuestion(this.questions[this.currentIndex])
    })
  }

  restartQuiz(): void {
    this.currentState = this.states.QUIZ
    this.currentIndex = 0
    this.mark = 0
    this.trueAnswers = []
  }

  generateQuestion({choices, question}: any): void {
    var questionTemplate = quiz_templates.options(choices)
    this.element.question.innerHTML = question
    this.element.multipleChoice.innerHTML = questionTemplate
  }
  
  multiChoiceTrigger(): void {
    this.element.multipleChoice?.addEventListener('click', (event: any) => {
      this.checkAnswer(event, this.questions[this.currentIndex].answer)
      this.nextQuestion()
    })
  }

  nextQuestion(): void {
    setTimeout(() => {
      this.currentIndex++
      if(this.currentIndex < this.numberOfQuestion) this.generateQuestion(this.questions[this.currentIndex])
      else this.showResult()
    }, QUESTION_DELAY_TIME)
  }

  replayButtonTrigger(): void {
    document.querySelector('.intro')?.querySelector('button')!.addEventListener('click', () => {
      this.showIntro()
    })
  }

  showResult(): void {
    this.currentState = this.states.CONCLUSION
    this.element.introConclusion.innerHTML = quiz_templates.conclusion({remark: 'this is the remark', score: this.mark + '/' + this.numberOfQuestion})
    setTimeout(() => {
      this.replayButtonTrigger()
    }, 10)
  }

  isQuiz(): boolean {
    return this.currentState === this.states.QUIZ
  }

  checkAnswer(event: any, answer: string): void {
    let answerIsTrue = event.target.innerHTML === answer

    // blue the true option
    let buttons = document.querySelector('.multiple-choice')?.getElementsByTagName('button')
    if(buttons === undefined) return
    for(var i = 0 ; i < buttons.length; i ++) {
      var btn = buttons.item(i)
      if(btn?.innerHTML === answer) btn.classList.add('true-option')
    } 

    if (answerIsTrue) {
      this.mark += 1
      this.trueAnswers.push(this.currentIndex)
    } else {
      event.target.classList.add('false-option')
    }

    this.playSound(answerIsTrue)
  }

  saveQuizHistory(): void {

  }

  playSound(answerIsTrue: boolean) : void{
    this.audio.src = answerIsTrue ? QUIZ_CORRECT_SOUND : QUIZ_WRONG_SOUND
    this.audio.load()
    this.audio.play()
  }


}
