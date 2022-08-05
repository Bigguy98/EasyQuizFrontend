import { Component, OnInit } from '@angular/core';
import { quiz_builder } from '../constant/quiz';


@Component({
  selector: 'app-quiz-board',
  templateUrl: './quiz-board.component.html',
  styleUrls: ['./quiz-board.component.css']
})
export class QuizBoardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    quiz_builder.displayIntro()
  }
  startQuizBuilder() {
    // how to call this shit?
    // if (quiz_builder !== undefined) quiz_builder.start()
  }

}
