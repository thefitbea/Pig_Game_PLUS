/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CHALLENGES:
1.A player loses his entire score when he rolls two 6's in a row

2.Take input from user to set what the game winning score is to be set to.

3.Add another dice to the game so that players loses score if either dice is a 1.

*/


var globalScore, roundScore, activePerson,gameState,previousDice,scoreLimit,scoreLimitDefault;

gameInitialisation();


// ROLLING DICE
document.querySelector(".btn-roll").addEventListener("click", function() { //stil jquery cant be used
  if(gameState){
    var firstDice = Math.floor((Math.random() * 6) + 1); //generates random score for dice whose scope is within this function
    var secondDice = Math.floor((Math.random() * 6) + 1);
    document.querySelectorAll(".dice")[0].style.display = "block";
    document.querySelectorAll(".dice")[1].style.display = "block";
    document.querySelectorAll(".dice")[0].setAttribute("src", "dice-" + firstDice + ".png");
    document.querySelectorAll(".dice")[1].setAttribute("src", "dice-" + secondDice + ".png");
    //OR - document.querySelector(".dice").src("dice-"+dice+".png");

    // ************CHALLENGE2******

    // if(previousDice===6 && firstDice===6){
    //   globalScore[activePerson]=0;
    //   document.querySelector("#score-" + activePerson).textContent = "0";
    //   nextPlayer();
    // }
    // else

    // ***********CHALLENGE2******

    if(firstDice !== 1 && secondDice !==1) {
      roundScore += firstDice+secondDice; //same as roundScore=roundScore+dice;
      $("#current-" + activePerson).text(roundScore); //adds score generated randomly
    }
    else{
      nextPlayer();
    }
    // previousDice=dice;//CHALLENGE2
  }
});


// HOLDING SCORE
document.querySelector(".btn-hold").addEventListener("click", function() {
  if(gameState){

    // SCORE LIMIT FETCH
    scoreLimitDefault=100;//default value just in case user inputs nothing or large value.
    scoreLimit=document.getElementById("winning-score").value;
    if(scoreLimit){//0,undefined,null,"" returns false while anything else returns true
      scoreLimit=document.getElementById("winning-score").value;
    }
    else{
      scoreLimit=scoreLimitDefault;
    }

    globalScore[activePerson] += roundScore; //OR we could PUSH into array, too you know;
    document.querySelector("#score-" + activePerson).textContent = globalScore[activePerson];
    if (globalScore[activePerson] >= scoreLimit) {
      document.querySelector("#name-" + activePerson).textContent = "WINNER!";
      document.querySelectorAll(".dice")[0].style.display = "none";
      document.querySelectorAll(".dice")[1].style.display = "none";
      document.querySelector(".player-" + activePerson + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePerson + "-panel").classList.remove("active");
      gameState=false;
    } else {
      nextPlayer();
    }
  }
});

// NEW GAME
document.querySelector(".btn-new").addEventListener("click", gameInitialisation);

// START GAME BY INITIALISING
function gameInitialisation(){
  globalScore = [0, 0];
  roundScore = 0;
  activePerson = 0;
  gameState=true;
  // $(".dice").style.display = "none"; //didnt work
  document.querySelectorAll(".dice")[0].style.display = "none"; // so used DOM
  document.querySelectorAll(".dice")[1].style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //resetting values
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");//we removed it to make sure that we don't have two classes being added, then added it back just in case if player 1 was having class "active"
}

//SWITCH PLAYERS
function nextPlayer() {
  activePerson === 0 ? activePerson = 1 : activePerson = 0;
  roundScore = 0; //resetting score to zero
  document.getElementById("current-0").textContent = "0"; //updating current score too, to zero
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelectorAll(".dice")[0].style.display = "none";
  document.querySelectorAll(".dice")[1].style.display = "none";
}
