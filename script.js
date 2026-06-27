const loader = document.getElementById("loader");
const enterBtn = document.getElementById("enterBtn");

const countdown = document.getElementById("countdown");
const count = document.getElementById("count");

const hero = document.getElementById("hero");
const music = document.getElementById("music");
const playMusic = document.getElementById("playMusic");

enterBtn.addEventListener("click", () => {

    loader.classList.add("hide");
    countdown.classList.remove("hide");

    let number = 3;

    count.innerText = number;

    const timer = setInterval(() => {

        number--;

        if (number > 0) {

            count.innerText = number;

        } else {

            clearInterval(timer);

            countdown.classList.add("hide");
            hero.classList.remove("hide");

            startHearts();

        }

    }, 1000);

});

playMusic.addEventListener("click", () => {

    music.play();

    playMusic.innerHTML = "❤️ Music Playing";

});

function startHearts() {

    setInterval(() => {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = ["❤️","💖","💕","💗"][Math.floor(Math.random()*4)];

        heart.style.left = Math.random()*100 + "vw";
        heart.style.fontSize = (20 + Math.random()*30) + "px";
        heart.style.animationDuration = (3 + Math.random()*3) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        },6000);

    },250);

}
