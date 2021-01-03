
//Load and parse the highscores from session storage
var highscores = sessionStorage.getItem('highscores');
highscores = JSON.parse(highscores);

//sort the highscore based on the score
highscores.sort(compare);


//display the highscores
for(var i = 0; i < highscores.length; i++){
    if(document.getElementById('noHS').style.visibility == 'visible'){
        document.getElementById('noHS').style.visibility = 'hidden';
    }
    hs = document.getElementById(String(i + 1));
    hs.textContent = i+1 + ". " + highscores[i].name + " - " + highscores[i].score;
    hs.style.visibility = 'visible';
}


//set the highscores into session storage
sessionStorage.setItem('highscores', JSON.stringify(highscores));

//to clear the highscores, first we clear the session storage and then make all the displayed highscores hidden
//show a 'no highscores' text to show the user
document.getElementById('clearHS').addEventListener('click', () => {
    sessionStorage.clear();
    document.getElementById('noHS').style.visibility = 'visible';
    for(var i = 0; i < highscores.length; i++){
        hs = document.getElementById(String(i + 1));
        if(hs.style.visibility == 'visible'){
            hs.style.visibility = 'hidden';
        }
        
    }
});

function compare(a, b){
    if(a.score > b.score){
        return -1;
    }
    if(a.score < b.score){
        return 1;
    }
    return 0;
}