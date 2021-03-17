'use strict';
import {Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel'
});

//Builder Pattern
export class GameBuilder{
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num){
        this.carrotCount = num;
        return this;
    }

    bugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameButton = document.querySelector('.game__button');
        this.gameButton.addEventListener('click', event =>{
            if(this.started){
                this.stop(Reason.cancel);
            } else{
                this.start();
            }
        });

        this.gameField = new Field(this.carrotCount, this.bugCount);
        this.gameField.setClickListener(this.onItemClick);
        
        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    onItemClick = (item) => {
        if(!this.started){
            return;
        }
        if(item === ItemType.carrot){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            }
        }else if(item === ItemType.bug){
            this.stop(Reason.lose);
        }
    }

    setGameStopListener(OnGameStop){
        this.OnGameStop = OnGameStop;
    }

    start(){
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }
    
    stop(reason){
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.OnGameStop && this.OnGameStop(reason);
    }

    initGame(){
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
        this.score = 0;
    }
    
    showStopButton(){
        const icon = this.gameButton.querySelector('.svg-inline--fa');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
    }
    
    hideGameButton(){
        this.gameButton.style.visibility = 'hidden';
    }
    
    showTimerAndScore(){
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startGameTimer(){
        let remainingTimeSec =  this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(()=>{
            if(remainingTimeSec <= 0){
                this.stop(this.carrotCount===this.score ? Reason.win:Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        },1000)
    }
    
    stopGameTimer(){
        clearInterval(this.timer);
        this.hideGameButton();
    
    }
    
    updateTimerText(time){
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    
    updateScoreBoard(){
        this.gameScore.innerText = this.carrotCount-this.score;
    }

}