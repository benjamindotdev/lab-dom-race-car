class Obstacle extends Component {
  constructor(gameScreen) {
    const width = 100;
    const height = 150;
    const src = "./images/redCar.png";
    const left = Math.floor(Math.random() * gameScreen.offsetWidth - 50);
    const top = 0;
    super(gameScreen, width, height, src, left, top);

    this.hasExploded = false;
    this.hasLeftScreen = false;
    this.speedDifference = Math.floor(Math.random() * 3);
  }

  move() {
    this.top += 1 + this.speedDifference;
    this.updatePosition();
  }

  becomeExplosion() {
    this.hasExploded = true;
    this.element.src = "./images/explosion.png";
    this.element.style.width = "150px";
    setTimeout(() => this.remove(), 1000);
  }

  exitScreen() {
    this.hasLeftScreen = true;
    this.remove();
  }
}
