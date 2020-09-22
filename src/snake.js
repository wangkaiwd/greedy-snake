import { addClass, createEle } from '@/shared/dom';

const getMoveMap = (child) => {
  return {
    37: { direction: 'left', ...child && { value: child.offsetLeft - 20, key: 'left' } },
    38: { direction: 'up', ...child && { value: child.offsetTop - 20, key: 'top' } },
    39: { direction: 'right', ...child && { value: child.offsetLeft + 20, key: 'left' } },
    40: { direction: 'down', ...child && { value: child.offsetTop + 20, key: 'top' } }
  };
};

function Snake (container) {
  this.container = document.querySelector(container);
  this.timer = null;
  this.snakeBody = null;
  this.direction = null;
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
};

Snake.prototype.run = function (e) {
  const map = getMoveMap();
  if (!map[e.keyCode]) {return;}
  const { direction } = map[e.keyCode];
  if (isForbiddenChangeDirection(this.direction, direction)) {return;}
  this.direction = direction;
  clearInterval(this.timer);
  this.timer = setInterval(() => {
    this.move(e.keyCode);
  }, 400);
};

Snake.prototype.move = function (keyCode) {
  const children = this.snakeBody.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const nextChild = children[i + 1];
    if (nextChild) { // 蛇身
      child.style.left = nextChild.offsetLeft + 'px';
      child.style.top = nextChild.offsetTop + 'px';
    } else { // 蛇头
      const { key, value } = getMoveMap(child)[keyCode];
      child.style[key] = value + 'px';
    }
  }
};

function isForbiddenChangeDirection (prevDirection, currentDirection) {
  return prevDirection === currentDirection
    ||
    (prevDirection === 'down' && currentDirection === 'up')
    ||
    (prevDirection === 'up' && currentDirection === 'down')
    ||
    (prevDirection === 'left' && currentDirection === 'right')
    ||
    (prevDirection === 'right' && currentDirection === 'left');
}

function createEleAndAddClass ({ tag, className }) {
  const ele = createEle(tag);
  if (className) {
    addClass(ele, className);
  }
  return ele;
}

export default Snake;
