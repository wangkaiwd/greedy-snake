import { addClass, createEle } from '@/shared/dom';

function Snake (container) {
  this.container = document.querySelector(container);
  this.timer = null;
  this.snakeBody = null;
  this.direction = 'right';
  this.initSnake();
  this.bindEvent();
}

Snake.prototype.bindEvent = function () {
  window.addEventListener('keydown', this.run.bind(this));
};

Snake.prototype.initSnake = function () {
  const snakeBody = createEleAndAddClass({ tag: 'div', className: 'snake-body' });
  const len = 2;
  for (let i = 0; i < len; i++) {
    let snakeItem = undefined;
    if (i === len - 1) {
      snakeItem = createEleAndAddClass({ tag: 'div', className: 'snake-body-item head' });
    } else {
      snakeItem = createEleAndAddClass({ tag: 'div', className: 'snake-body-item' });
    }
    snakeBody.appendChild(snakeItem);
  }
  this.container.appendChild(snakeBody);
  this.snakeBody = snakeBody;
  this.setPosition();
};

Snake.prototype.setPosition = function (start) {
  const children = [...this.snakeBody.children];
  // read-only, return the number of pixels that the upper start corner of current element is offset to the start within HTMLElement.offsetParent node
  start = start || children[children.length - 1].offsetLeft;
  children.forEach((child, i) => {
    child.style.left = start + i * 20 + 'px';
  });
};
Snake.prototype.run = function (e) {
  clearInterval(this.timer);
  this.timer = setInterval(() => {
    if (this.direction === 'right') {
      const head = this.snakeBody.lastChild;
      const tail = this.snakeBody.firstChild;
      const moveStart = tail.offsetLeft;
      this.setPosition(moveStart + 20);
    }
  }, 400);
};

function createEleAndAddClass ({ tag, className }) {
  const ele = createEle(tag);
  if (className) {
    addClass(ele, className);
  }
  return ele;
}

export default Snake;
