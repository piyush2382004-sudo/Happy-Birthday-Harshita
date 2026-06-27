const finalPage=document.getElementById("finalPage");

const cakePage=document.getElementById("cakePage");
const cake=document.getElementById("cake");

const nextPage=document.getElementById("nextPage");

const letterPage=document.getElementById("letterPage");

const letterText=document.getElementById("letterText");

const letterNext=document.getElementById("letterNext");

const loader = document.getElementById("loader");
const giftBox = document.getElementById("giftBox");
const enterBtn = document.getElementById("enterBtn");

const countdown = document.getElementById("countdown");
const count = document.getElementById("count");

const hero = document.getElementById("hero");

const playMusic = document.getElementById("playMusic");
const music = document.getElementById("music");

giftBox.addEventListener("click", () => {

    giftBox.style.transform = "scale(0)";
    giftBox.style.opacity = "0";

    document.querySelector(".gift-text").style.display = "none";

    setTimeout(() => {
        enterBtn.style.display = "inline-block";
    }, 700);

});

enterBtn.addEventListener("click", () => {

    loader.classList.add("hide");
    countdown.classList.remove("hide");

    let number = 3;

    count.innerHTML = number;

    const timer = setInterval(() => {

        number--;

        if(number>0){

            count.innerHTML = number;

        }else{

            clearInterval(timer);

            countdown.classList.add("hide");
            hero.classList.remove("hide");

            startHearts();

        }

    },1000);

});

playMusic.addEventListener("click",()=>{

    music.play();

    playMusic.innerHTML="❤️ Playing Heeriye";

});

function startHearts(){

    setInterval(()=>{

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML=["❤️","💖","💕","💗"][Math.floor(Math.random()*4)];

        heart.style.left=Math.random()*100+"vw";

        heart.style.fontSize=(20+Math.random()*30)+"px";

        heart.style.animationDuration=(3+Math.random()*3)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },6000);

    },250);

}

const message=`Happy Birthday Harshita ❤️

You are the most beautiful part of my life.

Every smile of yours makes my day brighter.

Thank you for coming into my life.

I may not always express my feelings perfectly,
but one thing is always true...

I Love You So Much ❤️

I wish you endless happiness,
good health,
success,
and a lifetime full of smiles.

Happy Birthday My Love ❤️

Forever Yours,

Piyush ❤️`;

nextPage.onclick=()=>{

hero.classList.add("hide");

letterPage.classList.remove("hide");

let i=0;

letterText.innerHTML="";

const typing=setInterval(()=>{

letterText.innerHTML+=message.charAt(i);

i++;

if(i>=message.length){

clearInterval(typing);

}

},40);

}

letterNext.onclick=()=>{

letterPage.classList.add("hide");

cakePage.classList.remove("hide");

}

cake.onclick=()=>{

cake.innerHTML="🎉";

setTimeout(()=>{

cakePage.classList.add("hide");

finalPage.classList.remove("hide");

startFireworks();

},1200);

}

function startFireworks(){

setInterval(()=>{

let fire=document.createElement("div");

fire.innerHTML=["🎆","✨","🎇","💖"][Math.floor(Math.random()*4)];

fire.style.position="fixed";

fire.style.left=Math.random()*100+"vw";

fire.style.top=Math.random()*80+"vh";

fire.style.fontSize=(30+Math.random()*40)+"px";

document.body.appendChild(fire);

setTimeout(()=>{

fire.remove();

},1500);

},200);

}

