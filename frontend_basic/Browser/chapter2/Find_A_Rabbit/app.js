const bg = document.querySelector(".bg");
const btn = document.querySelector(".btn");

const random = parseInt((Math.random()* 9) + 1);
const rabbit_position = bg.children[random];

btn.addEventListener('click', ()=>{
    rabbit_position.classList.add('rabbit');
    const rabbit = document.querySelector('.rabbit');
    const position = rabbit.getBoundingClientRect();
    rabbit.scrollIntoView({behavior:'smooth', block: "center"});
});
