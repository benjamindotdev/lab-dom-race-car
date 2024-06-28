class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndSCreen = document.querySelector("#game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.exits = [];
    this.explosions = [];
    this.score = 0;
    this.lives = 3;
    this.distance = 0;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    this.gameScreen.style.width = this.width + "px";
    this.gameScreen.style.height = this.height + "px";
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();
    this.gameIsOver && clearInterval(this.gameIntervalId);
  }

  update() {
    this.player.move();
    this.lives === 0 && this.endGame();
    const random = Math.floor(Math.random() * 100);
    random < 1 && this.obstacles.push(new Obstacle(this.gameScreen));
    const scoreElement = document.querySelector("#score");
    scoreElement.innerHTML = `Score: ${this.score}`;
    const livesElement = document.querySelector("#lives");
    this.distance += 1;
    const distanceElement = document.querySelector("#distance");
    distanceElement.innerHTML = `Distance: ${
      this.distance >= 1000
        ? (this.distance / 1000).toFixed(1) + "km"
        : this.distance + "m"
    }`;
    this.obstacles.forEach((obstacle) => {
      if (this.player.didCollide(obstacle)) {
        this.lives--;
        livesElement.innerHTML = `Lives: ${this.lives}`;
        this.lives === 0 && this.gameOver();
        this.explosions.push(obstacle);
        obstacle.becomeExplosion();
      } else if (obstacle.top > this.height) {
        this.exits.push(obstacle);
        obstacle.exitScreen();
        this.score += 1;
      } else {
        obstacle.move();
      }
    });
    this.obstacles = this.obstacles.filter(
      (obstacle) => !obstacle.hasLeftScreen && !obstacle.hasExploded
    );
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndSCreen.style.display = "block";
    localStorage.setItem("highScore", this.distance);
  }
}
