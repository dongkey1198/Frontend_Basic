import PopUp from './popup.js';
import  { GameBuilder,Reason } from './game.js';
import * as sound from './sound.js';

const gameFinsishBanner = new PopUp();

const game = new GameBuilder()
.gameDuration(10)
.carrotCount(5)
.bugCount(5)
.build();

game.setGameStopListener((reason) =>{

    let message;
    switch(reason){
        case Reason.cancel:
            message = "Relplay?";
            sound.playAlert();
            break;
        case Reason.win:
            message ="You Won";
            sound.playWin();
            break;
        case Reason.lose:
            message = " You Lost";
            sound.playBug();
            break;
        default:
            throw new Error('Not Valid Reason');
    }
    gameFinsishBanner.showWithText(message);
});

gameFinsishBanner.setClickListener(()=>{
    game.start();
});