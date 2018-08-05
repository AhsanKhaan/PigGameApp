/*
Game RULES:
-The game has 2 players,playing in rounds.
-In each turn, a player rolls a dice as many times as he wishes,Each result get added to his round score
But if the player rolls a '1',all his ROUND score gets lost.After that, it's the next player's turn .
-The player can choose to 'hold',which means that his ROUND score get added to his GLOBAL score. After that, it's the next player's turn.
-The first player to reachh 100 points on global score wins the game. 

*/
//setter(setting a value)

//document.querySelector('#current-'+activePlayer).textContent=dice;
//document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>';

//getter(getting a value/read)
//var x=document.querySelector("#score-0").textContent;
//console.log(x);

var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if(gamePlaying){
     //1:Random Number
  var dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);
  //2:Display The Result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  //3:Update the roundscore IF the rolled number was not 1
  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //next Player
    nextPlayer();
  } 
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;
    //update The UI
    document.querySelector(".player" + activePlayer + "-score").textContent =
      scores[activePlayer];
    //Check If Player Won the Game
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next PLayer
      nextPlayer();
    }
  }
});
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player0-panel").classList.toggle("active");
  document.querySelector(".player1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    gamePlaying=true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player0-panel").classList.remove("winner");
  document.querySelector(".player0-panel").classList.remove("active");
  document.querySelector(".player1-panel").classList.remove("winner");
  document.querySelector(".player1-panel").classList.remove("active");

  document.querySelector(".player0-panel").classList.add("active");
}
