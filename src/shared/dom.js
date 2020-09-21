export function createEle (tag) {
  return document.createElement(tag);
}

export function addClass (element, className) {
  const array = className.split(' ');
  array.forEach(name => {
    element.classList.add(name);
  });
}
