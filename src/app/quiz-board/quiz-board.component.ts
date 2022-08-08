import { Component, OnInit, ViewChild } from '@angular/core';
import { getRandomSelection, questionsBank } from '../constant/question';
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

  // init remarks
  remark : [] = [];
  
  ngOnInit(): void {
    this.element = {
      questionContainer : document.querySelector('.question-container'),
      conclusion : document.querySelector('.conclusion'),
      multipleChoice : document.querySelector('.multiple-choice'),
      question: document.querySelector('.question')
    }  
    this.initTrigger()
    this.generateQuestion(this.questions[this.currentIndex])
  }

  generateQuestion({choices, question}: any): void {
    var questionTemplate = quiz_templates.options(choices)
    this.element.question.innerHTML = question
    this.element.multipleChoice.innerHTML = questionTemplate
  }
  
  initTrigger(): void {
    this.element.multipleChoice?.addEventListener('click', () => {
      //  save the score
      this.currentIndex++
      if(this.currentIndex < this.numberOfQuestion) this.generateQuestion(this.questions[this.currentIndex])
      else this.showResult()
    })
  }

  showResult(): void {
    this.element.questionContainer.classList.add('hide')
    this.element.conclusion.innerHTML = quiz_templates.conclusion({remark: 'this is the remark', score: '10/100'})
  }

}
