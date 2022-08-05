export const quiz_templates = {
    intro : () =>
    (`
      <h1>Ready to Play?</h1>
      <button id="start-quiz" ng-click="startQuizBuilder()">Start Quiz</button>
    `),
  
    options : ([a, b, c, d] : any) =>
    (`
      <button class='choice-a'>${a}</button>
      <button class='choice-b'>${b}</button>
      <button class='choice-c'>${c}</button>
      <button class='choice-d'>${d}</button>
    `),
  
    conclusion : ({ remark, score } : any) =>
    (`
      <h1>${remark}</h1>
      <h2 class='score'>${score}</h2>
      <button>Play Again?</button>
    `)
  }