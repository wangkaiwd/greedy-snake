import { createEleAndAddClass } from '@/shared/dom';

function Food (container) {
  this.width = 20;
  this.height = 20;
  this.container = container;
  this.food = null;
  this.create();
}

Food.prototype.create = function () {
  this.food = createEleAndAddClass({ tag: 'div', className: 'food' });
  this.container.appendChild(this.food);
  const foodWidth = this.food.offsetWidth;
  const foodHeight = this.food.offsetHeight;
  const { width, height } = this.container.getBoundingClientRect();
  this.food.style.left = Math.random() * (width - foodWidth) + 'px';
  this.food.style.top = Math.random() * (height - foodHeight) + 'px';
};

export default Food;
