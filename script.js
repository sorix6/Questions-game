
(function questionsGame(){
    // build a function constructor for the questions
    function Question(text, answers, correctAnswer) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;

    }

    // add a method to check for the correct answer
    Question.prototype.checkAnswer = function(response) {
        return response == this.correctAnswer + 1;
    }

    // add a method to return the correct answer as a string
    Question.prototype.getCorrectAnswer = function() {
        return this.answers[this.correctAnswer];
    }

    // add method to display the text and naswer options for a question
    Question.prototype.displayQuestion = function() {
        var answers = '';
        for (k in this.answers) {
            answers += "\n" + (++k) + ": " + this.answers[k-1];
        }
        
        return prompt( this.text + answers );
    }

    // define the list of questions
    var questions = [];
    questions.push(new Question('What is the capital of Spain?', ['Paris', 'London', 'Madrid'], 2));
    questions.push(new Question('What river passes through London?', ['Thames', 'Danube', 'Seine'], 0));
    questions.push(new Question('What is 2 * 4?', [5, 6, 8], 2));
    questions.push(new Question('What maker produces the A5?', ['BMW', 'Audi', 'Renault'], 1));

    var currentQuestion = null;
    

    // add listener for game start
    document.querySelector('.start_bttn').addEventListener("click", () => {
        playGame();
    }, this);

    // function for selecting the next random question
    // makes sure that the question is different from the previous
    function selectNextQuestion() {
        var rnd = getRandom();
        do{ 
            rnd = getRandom();
        }
        while (currentQuestion === rnd);

        currentQuestion = rnd;

        return questions[currentQuestion];

        function getRandom() {
            return Math.floor(Math.random() * questions.length);
        }

    }

    // add a function that keeps track of the score
    function score() {
        var score = 0;

        return function(correct) {
            return correct ? ++score : score;
        }
    }

    // function that displays questions and keeps track of game
    // if user presses cancel, the game stops
    function playGame() {
        var keepScore = score();
        var question = selectNextQuestion();
        while (quizz !== null) {
            
            
            var quizz = question.displayQuestion();

            if (quizz === null) {
                return;
            }

            var msg = '';
            var correctAnswer = question.checkAnswer(quizz);
            if (correctAnswer){
                msg = "Well done! ";
            }
            else{
                msg = "The correct answer was: " + question.getCorrectAnswer() + "! ";
            }

            if (!confirm(msg + "Your score is: " + keepScore(correctAnswer) + "! \nWould you like to play again?")) {
                quizz = null;
            }

            question = selectNextQuestion();
        }
        
    }
})();


