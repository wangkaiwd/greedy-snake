function Snake (container) {
  this.container = document.querySelector(container);
  this.left = 0;
  this.top = 0;
  this.timer = null;
  this.snakeBody = null;
  this.initSnake();
  this.bindEvent();
}

Snake.prototype.bindEvent = function () {
  window.addEventListener('keypress', this.start.bind(this));
};

Snake.prototype.start = function (e) {
  if (e.keyCode === 32) {
    this.run();
  }
};
Snake.prototype.initSnake = function () {
  const snakeBody = document.createElement('div');
  snakeBody.classList.add('snake-body');
  for (let i = 0; i < 2; i++) {
    const snakeBodyItem = document.createElement('div');
    snakeBodyItem.classList.add('snake-body-item');
    snakeBody.appendChild(snakeBodyItem);
  }
  this.container.appendChild(snakeBody);
  this.snakeBody = snakeBody;
};
Snake.prototype.run = function () {
  setInterval(() => {
    this.left += 20;
    this.snakeBody.style.left = this.left + 'px';
  }, 400);
};

export default Snake;
