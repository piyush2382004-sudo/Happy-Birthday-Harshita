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
