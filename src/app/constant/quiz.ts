import { getRandomSelection, questions, shuffle} from "./question"
import { quiz_templates } from "./template"
export const quiz_builder = (function (doc) {

    // Creates new quiz properties
    const getQuizProps = (questions: any, num = 5) => ({
      numCorrect: 0,
      count: 0,
      questions: getRandomSelection(questions, num)
    })
  
    const startQuiz = ((optionHandler) => {
      
      const quizContainer = doc.querySelector('#quiz')
      if (quizContainer === null) return;
      const multiChoice = quizContainer.querySelector('.multiple-choice')
      if (multiChoice === null) return;
  
      return function quizHandler ({ target, type } : any) {
        console.log("here1")
        if (type === 'click' && !target.matches('button')) return
  
        // Remove previous handler
        if (optionHandler) {
          multiChoice.removeEventListener('click', optionHandler)
        }
  
        const newQuiz = getQuizProps(questions, 10)
  
        // add new handler bundled with new quiz properties in a closure
        multiChoice.addEventListener('click', getOptionHandler(newQuiz))
  
        console.log(newQuiz.questions)
        // display first questions
        displayQuestion(newQuiz.questions[0])
  
        quizContainer.classList.add('intro-hidden')
      }
    })()
  
    /* Returns handler bundled with new quiz properties */
  
    const getOptionHandler = function ({ count, numCorrect, questions }: any) {
  
      return function optionHandler ({ target } : any) {
  
        if (!target.matches('button')) return
  
        if (questions[count].answer === target.textContent) numCorrect++
  
        // display next question
        if (count < questions.length - 1) {
          return displayQuestion(questions[++count])
        }
  
        displayResult(numCorrect, questions.length)
      }
    }
  
    /* --- Display Intro --- */
  
    const displayIntro = function () {
      const quizContainer = doc.querySelector('.quiz-container')
      const intro = quizContainer!.querySelector('.intro')
  
      intro!.innerHTML = quiz_templates.intro()
      quizContainer!.classList.remove('intro-hidden')
    }
  
    /* --- Display Question and Multiple Choice --- */
  
    const displayQuestion = function ({ question, choices }: any) {
      const questionElem = doc.querySelector('.question')
      const multipleChoice = doc.querySelector('.multiple-choice')
  
      questionElem!.innerHTML = question
      multipleChoice!.innerHTML = quiz_templates.options(shuffle(choices))
    }
  
    /* --- Display Results --- */
  
    const remarks = ['Nevermind, try Again!', 'Pretty Good!', 'Very Good!', 'Top Notch!']
  
    const displayResult = function (numCorrect: any, numQuestions: any) {
  
      const quizContainer = doc.querySelector('.quiz-container')
      const conclusion = quizContainer!.querySelector('.conclusion')
      const index = Math.floor(numCorrect / numQuestions * 3)
  
      conclusion!.innerHTML = quiz_templates.conclusion({
        remark: remarks[index],
        score: `${numCorrect} out of ${numQuestions} Correct`
      })
  
      quizContainer!.classList.remove('intro-hidden')
    }
  
    return { displayIntro, start: startQuiz }
  }(window.document))