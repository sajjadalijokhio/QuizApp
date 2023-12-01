// Define quiz questions
const questions = [
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "correctAnswer": "Mars"
    },
    {
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        "correctAnswer": "William Shakespeare"
    },
    {
        "question": "Which element has the chemical symbol 'H'?",
        "options": ["Hydrogen", "Helium", "Hassium", "Hafnium"],
        "correctAnswer": "Hydrogen"
    }
      
      
    // Add more questions as needed
];

// Shuffle questions and options
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    const userName = document.getElementById("userName").value;
    if (!userName) {
        alert("Please enter your name!");
        return;
    }

    document.getElementById("landingPage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";

    showNextQuestion();
}

function showNextQuestion() {
    const quizPage = document.getElementById("quizPage");
    quizPage.innerHTML = "";

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        const questionElement = document.createElement("h2");
        questionElement.textContent = currentQuestion.question;
        questionElement.classList.add("mb-4");
        quizPage.appendChild(questionElement);

        shuffleArray(currentQuestion.options);

        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.classList.add("btn", "btn-light");
            optionButton.onclick = () => checkAnswer(option, currentQuestion.correctAnswer);
            quizPage.appendChild(optionButton);
        });
    } else {
        showResults();
    }
}

function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    showNextQuestion();
}

function showResults() {
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";

    const quizResults = document.getElementById("quizResults");
    quizResults.innerHTML = "";

    questions.forEach((question, index) => {
        const resultItem = document.createElement("p");
        resultItem.textContent = `Q${index + 1}: ${question.question} - Your Answer: ${question.options.find(option => option !== question.correctAnswer)} | Correct Answer: ${question.correctAnswer}`;
        quizResults.appendChild(resultItem);
    });

    const greetingMessage = document.getElementById("greetingMessage");
    greetingMessage.textContent = `Congratulations, ${document.getElementById("userName").value}! Your score is ${score} out of ${questions.length}.`;

    document.getElementById("resultPage").scrollIntoView();
}

function refreshPage() {
    location.reload();
}