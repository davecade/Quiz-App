import {Question} from './Question.js';
import {Quiz} from './Quiz.js'
import {getPercentage, setValue} from "./Utilities.js";


const App = (() => {
    // --Cache the DOM
    const currentQuestion = document.querySelector('.question-title')
    const questionTracker = document.querySelector('.question-number')
    const progressBar = document.querySelector('.progress-bar')
    const optionsArray = document.querySelector('.options');
    const nextButton = document.querySelector('.next')
    const restartButton = document.querySelector('.restart')
    const instructionsEl = document.querySelector('.instructions')


    const q1 = new Question(
        "Who is Captain Sisko to the Bajorans?",
        ["The Jem'Hadar", "The Emissary", "The Promanade", "The Maquis"],
        1
    )
    const q2 = new Question(
        "What kind of brain does Data have?",
        ["Biotronic", "Positronic", "Electronic", "Paleotronic"],
        1
    )
    const q3 = new Question(
        "What is Worf's brothers name?",
        ["Gowron", "Kahless", "Kurn", "T'Kuvma", "Duras", "Klaang"],
        2
    )
    const q4 = new Question(
        "Name Data's offspring.",
        ["B-4", "Juliana", "Lore", "Lal"],
        3
    )
    const q5 = new Question(
        "What do you shout before pulling your parachute?",
        ["Kaplaaaa!", "Energize!", "Jaffa Cre!", "3000 Meters!"],
        3
    )

    const quiz = new Quiz([q1, q2, q3, q4, q5])

    const renderQuestion = () => {
        setValue(currentQuestion, quiz.getCurrentQuestion().question)
    }

    const renderTracker = () => {
        setValue(questionTracker, `${quiz.currentIndex+1} of ${quiz.questions.length}`)
    }

    const renderProgress = () => {
        progressBar.style = `width: ${getPercentage(quiz.currentIndex, quiz.questions.length)}%`
    }

    const renderChoices = () => {
        let markup = ''
        const currentChoices = quiz.getCurrentQuestion().choices;

        currentChoices.forEach((element, index) => {
            markup += `
            <li class="option">
                <input type="radio" name="choice" class="choice-input" choiceIndex="${index}" id="choice${index}">
                <label for="choice${index}" class="choice-label">
                    <i class="icon"></i>
                    <p class="answer-text">${element}</p>
                </label>
            </li>
            `
        });

        setValue(optionsArray, markup)
    }

    const renderEndScreen = () => {
        setValue(currentQuestion, `Great Job!`)
        progressBar.style = "width: 100%";
        setValue(instructionsEl, `Score: ${quiz.score} out of ${quiz.questions.length}`)
        nextButton.style = "visibility: hidden"
    }

    const listeners = () => {
        nextButton.addEventListener('click', () => {
            const selectedRadioElem = document.querySelector('input[name="choice"]:checked')

            if (selectedRadioElem == null) {
                alert("Please select an answer")
            } else {
                quiz.guess(selectedRadioElem.getAttribute('choiceIndex'))
                RenderAll();
            }
        })

        restartButton.addEventListener('click', () => {
            quiz.reset();
            setValue(instructionsEl, "Pick an option below")
            nextButton.style = "visibility: visible"
            RenderAll();
        })
    }

    const RenderAll = () => {
        if (quiz.hasEnded()) {
            renderEndScreen();
        } else {
            renderQuestion();
            renderTracker();
            renderProgress();
            renderChoices();
        }
    }

    return {
        RenderAll: RenderAll,
        listeners: listeners
    }

})();


App.RenderAll();
App.listeners();