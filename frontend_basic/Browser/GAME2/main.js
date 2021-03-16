const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5; 

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameButton = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');


let started = false;
let score = 0;
let timer = undefined;

gameButton.addEventListener('click', event =>{
    if(started){
        stopGame();
    } else{
        startGame();
    }
});

field.addEventListener('click', onFieldClick);

popUpRefresh.addEventListener('click', ()=>{
    startGame();
    hidePopUp();
    gameButton.style.visibility = 'visible';
});

function startGame(){
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame(){
    started = false;
    stopGameTimer();
}

function finishGame(win){
    started = false;
    gameButton.style.visibility = 'hidden';
    showPopUpWithText(win ? 'You Won':'You Lost');
}

function showStopButton(){
    const icon = gameButton.querySelector('.svg-inline--fa');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton(){
    gameButton.style.visibility = 'hidden';
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT===score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000)
}

function stopGameTimer(){
    clearInterval(timer);
    hideGameButton();
    showPopUpWithText('Replay?');
}

function updateTimerText(time){
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text){
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp(){
    popUp.classList.add('pop-up--hide');
}

function initGame(){
    field.innerHTML = '';
    score = 0;
    timer = undefined;
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT){
            finishGame(true);
        }
    }else if(target.matches('.bug')){
        stopGameTimer();
        finishGame(false);
    }
}

function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT-score;
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height -CARROT_SIZE;

    for(let i = 0; i <count ; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}

