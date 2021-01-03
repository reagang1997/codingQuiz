
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
document.getElementById("opt1").addEventListener("click", nextFromOpt1);
document.getElementById("opt2").addEventListener("click", nextFromOpt2);
document.getElementById("opt3").addEventListener("click", nextFromOpt3);
document.getElementById("opt4").addEventListener("click", nextFromOpt4);








window.onload = function () {
    //start the timer when the page is loaded
    var twoMinuntes = 60 * 2;
    display = document.querySelector('#time');
    startTimer(twoMinuntes, display);

    //display the first question along with the answer choices
    question = document.querySelector('#q');
    question.textContent = questions.question1.q;
    opt1.textContent = questions.question1.a[0];
    opt2.textContent = questions.question1.a[1];
    opt3.textContent = questions.question1.a[2];
    opt4.textContent = questions.question1.a[3];


    //set the progress bar
    progress = document.getElementById('bar');
    var percent = ((num - 1) / 3) * 100;
    percent = percent + "%";
    console.log(percent);
    progress.style.width = percent;

    //grab all of the components on the page
    rightWrongText = document.getElementById('right-wrong');
    rightWrongContainer = document.querySelector('.right-wrong');

    opt1 = document.querySelector('#opt1');
    opt2 = document.querySelector('#opt2');
    opt3 = document.querySelector('#opt3');
    opt4 = document.querySelector('#opt4');

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

//Shows the next question when the first answer choice is selected
function nextFromOpt1() {
    //if the coice is wrong then briefly display a wrong text banner
    if (opt1.textContent !== questions["question" + num].c) {
        rightWrongContainer.style.visibility = 'visible'
        rightWrongText.textContent = "Wrong!";
        setTimeout( function(){
            rightWrongContainer.style.visibility = 'hidden';
        }, 1000);
    }
    //else if the coice is correct then briefly display a correct text banner
    else {
        rightWrongContainer.style.visibility = 'visible'
        rightWrongText.textContent = "Correct!";
        setTimeout( function(){
            rightWrongContainer.style.visibility = 'hidden';
        }, 1000);
        correct++;
    }
    //if the question is the last question then show the results section
    if (num === 3) {
        progress.style.visibility = 'hidden';

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


        var percent = ((num - 1) / 3) * 100;
        percent = percent + "%";
        console.log(percent);
        progress.style.width = percent;
    }
}

//Shows the next question when the second answer is selected
function nextFromOpt2() {
    tmp = "question" + num;
    if (opt2.textContent !== questions["question" + num].c) {
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
    if (num === 3) {
        progress.style.visibility = 'hidden';

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

        var percent = ((num -1) / 3) * 100;
        percent = percent + "%";
        console.log(percent);
        progress.style.width = percent;
    }

}

//shows the next question when the 3rd answer is selected
function nextFromOpt3() {
    tmp = "question" + num;
    if (opt3.textContent !== questions["question" + num].c) {
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
    if (num === 3) {
        progress.style.visibility = 'hidden';

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

        var percent = ((num -1) / 3) * 100;
        percent = percent + "%";
        console.log(percent);
        progress.style.width = percent;
    }

}

//shows the next question when the 4th answer is selected
function nextFromOpt4() {
    tmp = "question" + num;
    if (opt4.textContent !== questions["question" + num].c) {
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
    if (num === 3) {
        progress.style.visibility = 'hidden';
        progress.style.visibility = 'hidden';

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


        var percent = ((num -1) / 3) * 100;
        percent = percent + "%";
        console.log(percent);
        progress.style.width = percent;
    }

}








