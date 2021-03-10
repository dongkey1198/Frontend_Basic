const background = document.querySelector(".background")
const target = document.querySelector('.target');
const coordinate = document.querySelector('.coordinate');
const x_ = document.querySelector('.x');
const y_ = document.querySelector('.y');

document.addEventListener(('mousemove'), event =>{
    const x = event.clientX;
    const y = event.clientY;

    y_.style.left = `${x}px`; 
    x_.style.top = `${y}px`;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    coordinate.style.left = `${x}px`;
    coordinate.style.top = `${y}px`;

    coordinate.innerHTML = `X:${x}, Y:${y}`;
});