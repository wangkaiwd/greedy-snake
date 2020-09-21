import { addClass, createEle } from '@/shared/dom';

function Snake (container) {
  this.container = document.querySelector(container);
  this.timer = null;
  this.snakeBody = null;
  this.direction = 'right';
  this.head = null;
  this.tail = null;
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
  this.moveToRight();
};

Snake.prototype.moveToRight = function (start) {
  const children = [...this.snakeBody.children];
  // read-only, return the number of pixels that the upper start corner of current element is offset to the start within HTMLElement.offsetParent node
  start = start || children[children.length - 1].offsetLeft;
  children.forEach((child, i) => {
    child.style.left = start + i * 20 + 'px';
  });
};
Snake.prototype.run = function (e) {
  if (e.keyCode === 40) {
    this.direction = 'down';
    this.head = this.snakeBody.lastChild;
    this.tail = this.snakeBody.firstChild;
  } else if (e.keyCode === 38) {
    this.direction = 'up';
    this.head = this.snakeBody.firstChild;
    this.tail = this.snakeBody.lastChild;
  } else if (e.keyCode === 37) {
    this.direction = 'left';
    this.head = this.snakeBody.firstChild;
    this.tail = this.snakeBody.lastChild;
  } else if (e.keyCode === 39) {
    this.direction = 'right';
    this.head = this.snakeBody.lastChild;
    this.tail = this.snakeBody.firstChild;
  }
  clearInterval(this.timer);
  this.timer = setInterval(() => {
    if (this.direction === 'right') {
      const moveStart = this.tail.offsetLeft;
      this.moveToRight(moveStart + 20);
    }
    if (this.direction === 'down') {
      this.moveToDown();
    }
  }, 400);
};

Snake.prototype.moveToDown = function () {
  const children = this.snakeBody.children;
  const left = this.head.offsetLeft;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.offsetLeft < left) {
      child.style.left = child.offsetLeft + 20 + 'px';
    } else {
      child.style.top = child.offsetTop + 20 + 'px';
    }
  }
};

function createEleAndAddClass ({ tag, className }) {
  const ele = createEle(tag);
  if (className) {
    addClass(ele, className);
  }
  return ele;
}

export default Snake;
