$(document).ready(function() {

  var levelNumber = 1;
  var expected = [];
  var indexToBeVerified = 0;
  var isGameStarted = false;
  var colorMapping = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue"
  };

  $(document).on("keypress", startGame);
  $(".start-button").on("click", startGame);
  $(".btn").on("click", handleUserSelection);

  function startGame() {

    if (!isGameStarted) {
      $(".start-button").hide(1000);
      setTimeout(nextSequence, 1000);
      isGameStarted = true;
    }
  }

  function nextSequence() {
    $("#level-title").text("Level " + levelNumber);

    let randomNumber = Math.ceil(Math.random() * 4);

    expected.push(colorMapping[randomNumber]);
    $("#" + colorMapping[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSounds(colorMapping[randomNumber]);
  }

  function handleUserSelection() {

    if (isGameStarted) {
      activeButtonId = this.id;
      playSounds(activeButtonId);

      if (expected[indexToBeVerified] === activeButtonId) {
        $("#" + activeButtonId).addClass("pressed");
        setTimeout(function() {
          $("#" + activeButtonId).removeClass("pressed");
        }, 100);

        indexToBeVerified++;

        if (expected.length === indexToBeVerified) {
          levelNumber++;
          indexToBeVerified = 0;
          setTimeout(nextSequence, 1000);
        }

      } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
          playSounds("wrong");
        }, 200);

        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);

        isGameStarted = false;
        indexToBeVerified = 0;
        levelNumber = 1;
        expected = [];

        $(".start-button").show(1000);
      }

    }
  }

  function playSounds(activeButtonId) {
    switch (activeButtonId) {
      case "green":
        var gAudio = new Audio("sounds/green.mp3");
        gAudio.play();
        break;
      case "red":
        var rAudio = new Audio("sounds/red.mp3");
        rAudio.play();
        break;
      case "yellow":
        var yAudio = new Audio("sounds/yellow.mp3");
        yAudio.play();
        break;
      case "blue":
        var bAudio = new Audio("sounds/blue.mp3");
        bAudio.play();
        break;
      case "wrong":
        var wAudio = new Audio("sounds/wrong.mp3");
        wAudio.play();
        break;
    }

    // $(this).addClass("pressed");
    //
    // setTimeout(function() {
    //   $("#" + activeButtonId).removeClass("pressed");
    // }, 100);

  }
});
