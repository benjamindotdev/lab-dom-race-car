class User {
  constructor(name) {
    this.name = name;
    this.scores = [];
  }

  addScore(score) {
    this.scores.push(score);
  }

  getTopScore() {
    return this.scores.sort((a, b) => b - a)[0];
  }
}
