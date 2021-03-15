const gameWindow = document.querySelector('.game-window');
const button = document.querySelector('.start');
const time = document.querySelector('.time');
const count = document.querySelector('.count');
const game = document.querySelector('.game');

let seconds;
let carrotNumbers;
let interval;

function init(num){
    seconds = 10;
    carrotNumbers = 10;
    time.innerText = seconds<10 ? `00:0${seconds}`:`00:${seconds}`;
    count.innerText = carrotNumbers;
    button.style.visibility = 'visible';
    interval = 0; // 0 === false
    if(game.hasChildNodes){
        while(game.firstChild){
            game.removeChild(game.firstChild);
        }
    }
    if(num === 1){
        if(!interval) startGame();
        interval = setInterval(countDown, 1000);
    }
    
}

function countDown(){
    seconds--;
    time.innerText = seconds<10 ? `00:0${seconds}`:`00:${seconds}`;
    if(seconds <= 0){
        gameOver(0);
    }
}

function getLeft(){
    let left = parseInt(Math.random() * 530) + 1;
    return left;
}

function getTop(){
    let top = parseInt(Math.random() * 140) + 1;
    return top;
}

function startGame(){
    init();
    for(let i = 1; i <= carrotNumbers; i++){
        let carrot = document.createElement('img');
        carrot.setAttribute('class', `carrot`);
        carrot.style.top = `${getTop()}px`;
        carrot.style.left = `${getLeft()}px`;
        game.append(carrot);

        let bug = document.createElement('img');
        bug.setAttribute('class', 'bug');
        bug.style.top = `${getTop()}px`;
        bug.style.left = `${getLeft()}px`;
        game.append(bug);
    }
}

function gameOver() {
    clearInterval(interval);
    createWindow(0);
}

function createWindow(n){
    const modal = document.createElement('div');
    button.style.visibility = 'hidden';
    modal.setAttribute('class', 'modal');
    modal.innerHTML = `
    <button class='restart'><i class="fas fa-undo"></i></button>
    <span>${n === 0 ? 'You Lost':'You Won'}</span>
    `;
    gameWindow.append(modal);

    const restart = document.querySelector('.restart');
    restart.addEventListener('click', (event)=>{
        gameWindow.removeChild(event.currentTarget.parentNode);
        init(1);
    });
}

button.addEventListener('click', event =>{
    let id = event.currentTarget.dataset.id;
    if(id === '1'){
        if(!interval) startGame();
        button.innerHTML = '<i class="fas fa-stop"></i>';
        event.currentTarget.dataset.id = '0';
        interval = setInterval(countDown, 1000);
    } else{
        button.innerHTML = ' <i class="fas fa-play"></i>';
        event.currentTarget.dataset.id = '1';
        clearInterval(interval);
    }
});

game.addEventListener('click', (event)=>{
    if(event.target.nodeName !== 'IMG'){
        return;
    }
    else if(event.target.className === 'carrot'){
        let carrot = event.target;
        carrotNumbers--;
        count.innerText = carrotNumbers;
        game.removeChild(carrot);
        if(carrotNumbers === 0){
            clearInterval(interval);
            createWindow(1);
        }

    } else if(event.target.className === 'bug'){
        gameOver();
    }
});

