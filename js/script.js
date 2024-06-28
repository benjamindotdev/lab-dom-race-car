window.onload = function () {
  const highScore = document.getElementById("high-score");
  const previousHighScore = localStorage.getItem("highScore");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game = null;

  startButton.addEventListener("click", function () {
    game = new Game();
    game.start();
  });

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyStrokes = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (keyStrokes.includes(key)) {
      event.preventDefault();

      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key;
    const keyStrokes = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (keyStrokes.includes(key)) {
      event.preventDefault();

      switch (key) {
        case "ArrowLeft":
          game.player.directionX = 0;
          break;
        case "ArrowRight":
          game.player.directionX = 0;
          break;
        case "ArrowUp":
          game.player.directionY = 0;
          break;
        case "ArrowDown":
          game.player.directionY = 0;
          break;
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  restartButton.addEventListener("click", location.reload.bind(location));
};
