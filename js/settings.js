import { Quiz } from './quiz.js';

export class Setting {
    constructor() {
        this.categoryElement = document.getElementById("category");
        this.difficultyElement = document.getElementsByName("difficulty");
        this.numberOfQuestions = document.getElementById("Number");
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", this.startQuiz.bind(this));
    }

    async startQuiz() {
        let numberOfQuestionsValue = this.numberOfQuestions.value;
        let categoryElementValue = this.categoryElement.value;
        let difficultyElementValue = [...this.difficultyElement].filter(
            (element) => element.checked
        );
        let url = `https://opentdb.com/api.php?amount=${numberOfQuestionsValue}&category=${categoryElementValue}&difficulty=${difficultyElementValue[0].value}`;
        let resultArray = await this.fetchUrl(url);
        console.log(resultArray);
        if (resultArray.length > 0) {
            $("#setting").fadeOut(500, () => {
                $("#quiz").fadeIn(500);
            });

            new Quiz(resultArray, numberOfQuestionsValue);
        }
    }

    async fetchUrl(url) {
        let responses = await fetch(url);
        let questions = await responses.json();
        console.log(questions);
        return questions.results;
    }
}