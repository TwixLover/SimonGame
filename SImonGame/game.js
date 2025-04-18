var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level = 0;
var started = false;


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound();
    animatePress();
    checkAnswer(userClickedPattern.length-1);
});
function playSound(){
    var color = userClickedPattern[userClickedPattern.length-1];
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    //console.log(color);
}
function animatePress(){
    $("#" + userClickedPattern[userClickedPattern.length-1]).addClass("pressed");
    setTimeout(function(){
        $("#" + userClickedPattern[userClickedPattern.length-1]).removeClass("pressed");
        }, 100);
}
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
            console.log(currentLevel);
          }, 1000);
        }
      } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
  }
  function nextSequence() {
    userClickedPattern = [];
    level++;
    var random_Number = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[random_Number]; 
    gamePattern.push(randomChosenColour); 
    console.log("The Chosen color is: " + randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
   
    $("#level-title").text("Level " + level);
    return randomChosenColour;
}

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  