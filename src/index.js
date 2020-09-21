// const snake = new Snake();
import '@/assets/styles/index.scss';
import Snake from '@/snake';

const app = document.querySelector('.app');
const container = document.createElement('div');
container.classList.add('container');
app.appendChild(container);

const snake = new Snake('.container');
