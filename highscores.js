var highscores = sessionStorage.getItem('highscores');

highscores = JSON.parse(highscores);


highscores.sort(compare);


for(var i = 0; i < highscores.length; i++){
    if(document.getElementById('noHS').style.visibility == 'visible'){
        document.getElementById('noHS').style.visibility = 'hidden';
    }
    hs = document.getElementById(String(i + 1));
    hs.textContent = i+1 + ". " + highscores[i].name + " - " + highscores[i].score;
    hs.style.visibility = 'visible';
}


sessionStorage.setItem('highscores', JSON.stringify(highscores));



clearHS = document.getElementById('clearHS').addEventListener('click', () => {
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