import { addClass, createEle } from '@/shared/dom';

function Snake (container) {
  this.container = document.querySelector(container);
  this.timer = null;
  this.snakeBody = null;
  this.direction = null;
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
  const len = 4;
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

Snake.prototype.run = function (e) {
  const map = {
    37: { direction: 'left', move: this.moveToLeft },
    38: { direction: 'up', move: this.moveToUp },
    39: { direction: 'right', move: this.moveToRight },
    40: { direction: 'down', move: this.moveToDown }
  };
  if (!map[e.keyCode]) {return;}
  const { direction, move } = map[e.keyCode];
  if (direction === this.direction) {return;}
  clearInterval(this.timer);
  this.timer = setInterval(() => {
    this.direction = direction;
    move.call(this);
  }, 400);
};

Snake.prototype.moveToRight = function () {
  const children = this.snakeBody.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const nextChild = children[i + 1];
    if (nextChild) { // 蛇身
      child.style.left = nextChild.offsetLeft + 'px';
      child.style.top = nextChild.offsetTop + 'px';
    } else { // 蛇头
      child.style.left = child.offsetLeft + 20 + 'px';
    }
  }
};

Snake.prototype.moveToLeft = function () {
  const children = this.snakeBody.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const nextChild = children[i + 1];
    if (nextChild) { // 蛇身
      child.style.left = nextChild.offsetLeft + 'px';
      child.style.top = nextChild.offsetTop + 'px';
    } else { // 蛇头
      child.style.left = child.offsetLeft - 20 + 'px';
    }
  }
};

Snake.prototype.moveToDown = function () {
  const children = this.snakeBody.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const nextChild = children[i + 1];
    if (nextChild) { // 蛇身
      child.style.left = nextChild.offsetLeft + 'px';
      child.style.top = nextChild.offsetTop + 'px';
    } else { // 蛇头
      child.style.top = child.offsetTop + 20 + 'px';
    }
  }
};

Snake.prototype.moveToUp = function () {
  const children = this.snakeBody.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const nextChild = children[i + 1];
    if (nextChild) { // 蛇身
      child.style.left = nextChild.offsetLeft + 'px';
      child.style.top = nextChild.offsetTop + 'px';
    } else { // 蛇头
      child.style.top = child.offsetTop - 20 + 'px';
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
