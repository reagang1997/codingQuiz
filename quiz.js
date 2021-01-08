
//Set the questions
var questions = {
    question1: {
        q: "Common used data types do not include...",
        a: [
            "stings",
            "booleans",
            "alerts",
            "numbers"
        ],
        c: "alerts"
    },

    question2: {
        q: "An if statement is enclosed by",
        a: [
            "commas",
            "square brackets",
            "angle brackets",
            "curly brackets"
        ],
        c: "curly brackets"
    },

    question3: {
        q: "Arrays in JS are used to store",
        a: [
            "numbers",
            "booleans",
            "strings",
            "all of the above"
        ],
        c: "all of the above"
    },
    question4: {
        q: "Every line of code should end with",
        a : [
            ";",
            ":",
            "[",
            "-"
        ],
        c: ";"
    }
}

//Num is the number of question that is currently being displayed 
var num = 1;

//Counter for number of questions answered correctly
var correct = 0;


//If there is NOT a 'highscores' set in the session storage, then we will create an empty highscores array
if (sessionStorage.getItem('highscores') == null) {
    var highscores = [];
}
//If there is, then we read it into highscores and parse it.
else {
    var highscores = sessionStorage.getItem('highscores');
    highscores = JSON.parse(highscores)
}


//create a tmp score object that will later be stored in Highscores
var tmpScore = {
    name: "",
    score: 0
};

//grab all of the buttons by ID and add a click event listener 









window.onload = function () {
    //start the timer when the page is loaded
    var twntysec = 20;
    display = document.querySelector('#time');
    startTimer(twntysec, display);

    //display the first question along with the answer choices

    question = document.querySelector('#q');
    question.textContent = questions.question1.q;
    opt1 = document.querySelector('#opt1');
    opt2 = document.querySelector('#opt2');
    opt3 = document.querySelector('#opt3');
    opt4 = document.querySelector('#opt4');

    var inputfield = $("#initals");

    opt1.textContent = questions.question1.a[0];
    opt2.textContent = questions.question1.a[1];
    opt3.textContent = questions.question1.a[2];
    opt4.textContent = questions.question1.a[3];

    var rightWrongText = document.getElementById('right-wrong');
    var rightWrongContainer = document.querySelector('.right-wrong');

    var $answerClick = $(".answer").click(function(){
        if (this.text !== questions["question" + num].c) {
            rightWrongContainer.style.visibility = 'visible'
            rightWrongText.textContent = "Wrong!";
            setTimeout( function(){
                rightWrongContainer.style.visibility = 'hidden';
            }, 1000);
        }
        else {
            rightWrongContainer.style.visibility = 'visible'
            rightWrongText.textContent = "Correct!";
            setTimeout( function(){
                rightWrongContainer.style.visibility = 'hidden';
            }, 1000);
            correct++;
        }
        if (num === 4) {
            
    
            q.textContent = "Results";
            opt1.style.visibility = 'hidden';
            opt2.style.visibility = 'hidden';
            opt3.style.visibility = 'hidden';
            opt4.style.visibility = 'hidden';
    
            results = document.getElementById("results");
            results.style.visibility = 'visible';
            var score = correct / 3;
            score = score * 100;
            score = Math.round(score);
    
            results.textContent = score;
    
            initalField.style.visibility = 'visible';
            submit.style.visibility = 'visible';
    
            submit.addEventListener('click', () => {
                tmpScore.name = initalField.value;
                tmpScore.score = score;
                highscores.push(tmpScore);
    
                sessionStorage.setItem('highscores', JSON.stringify(highscores));
                console.log(sessionStorage);
            });
    
    
        }
        else {
            num++;
            tmp = "question" + num;
    
    
            q.textContent = questions["question" + num].q;
            opt1.textContent = questions["question" + num].a[0];
            opt2.textContent = questions["question" + num].a[1];
            opt3.textContent = questions["question" + num].a[2];
            opt4.textContent = questions["question" + num].a[3];
    
        }
    });


    initalField = document.querySelector('#initals');
    submit = document.querySelector('#submit');

    
};



function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;


        //Once the timer runs out, we go straight to the "enter initials" part of the quiz and display
        //a "time is out" banner
        if (--timer < 0) {
            timeOut = document.getElementById('time-out');
            timeOut.style.visibility = 'visible';

            display.style.visibility = 'hidden';

            q.textContent = "Results";
            opt1.style.visibility = 'hidden';
            opt2.style.visibility = 'hidden';
            opt3.style.visibility = 'hidden';
            opt4.style.visibility = 'hidden';

            results = document.getElementById("results");
            results.style.visibility = 'visible';
            var score = correct / 3;
            score = score * 100;
            score = Math.round(score);

            results.textContent = score;

            initalField.style.visibility = 'visible';
            submit.style.visibility = 'visible';

            //when submit is clicked, fill out the tmpScore object and push it to highscores
            //then set the highscores in session storage
            submit.addEventListener('click', () => {
                tmpScore.name = initalField.value;
                tmpScore.score = score;
                highscores.push(tmpScore);

                sessionStorage.setItem('highscores', JSON.stringify(highscores));
                console.log(sessionStorage);
            });
        }
    }, 1000);
}
