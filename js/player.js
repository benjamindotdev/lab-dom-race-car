class Player extends Component {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    super(gameScreen, width, height, imgSrc, left, top);
    this.directionX = 0;
    this.directionY = 0;
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    this.left < 10 && (this.left = 10);
    this.top < 10 && (this.top = 10);
    this.left > this.gameScreen.offsetWidth - this.width &&
      (this.left = this.gameScreen.offsetWidth - this.width);
    this.top > this.gameScreen.offsetHeight - this.height &&
      (this.top = this.gameScreen.offsetHeight - this.height);
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.left + obstacleRect.width &&
      playerRect.left + this.width > obstacleRect.left &&
      playerRect.top < obstacleRect.top + obstacleRect.height &&
      playerRect.top + this.height > obstacleRect.top
    ) {
      return true;
    }
    return false;
  }
}
