function Snake (container) {
  this.container = document.querySelector(container);
  this.initSnake();
}

Snake.prototype.initSnake = function () {
  const snakeBody = document.createElement('div');
  const snakeBodyItem = document.createElement('div');
  snakeBody.classList.add('snake-body');
  snakeBodyItem.classList.add('snake-body-item');
  snakeBody.appendChild(snakeBodyItem);
  this.container.appendChild(snakeBody);
};

export default Snake;
