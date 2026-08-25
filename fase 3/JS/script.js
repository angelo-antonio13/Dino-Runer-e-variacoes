const dino = document.querySelector('.dino');
const obstacle = document.querySelector('.obstacle');

const scoreElement =
    document.querySelector('#score');

const gameOverScreen =
    document.querySelector('.game-over');

const restartButton =
    document.querySelector('#restart');


let isJumping = false;
let gameRunning = true;

let score = 0;

let gameLoop;
let scoreLoop;


/* =========================
   PULAR
========================= */

function jump() {

    if (!gameRunning) return;

    if (isJumping) return;


    isJumping = true;

    dino.classList.add('jump');


    setTimeout(() => {

        dino.classList.remove('jump');

        isJumping = false;

    }, 650);
}


/* =========================
   PONTUAÇÃO
========================= */

function startScore() {

    scoreLoop =
        setInterval(() => {

            if (gameRunning) {

                score++;

                scoreElement.textContent =
                    score
                        .toString()
                        .padStart(4, '0');

            }

        }, 100);
}


/* =========================
   COLISÃO
========================= */

function startGameLoop() {

    gameLoop =
        setInterval(() => {

            if (!gameRunning) return;


            const obstaclePosition =
                obstacle.offsetLeft;


            const dinoPosition =
                parseInt(
                    window
                        .getComputedStyle(dino)
                        .bottom
                );


            const dinoLeft =
                dino.offsetLeft;


            if (

                obstaclePosition <
                dinoLeft + 60

                &&

                obstaclePosition >
                dinoLeft - 40

                &&

                dinoPosition < 110

            ) {

                endGame();

            }

        }, 10);
}


/* =========================
   GAME OVER
========================= */

function endGame() {

    gameRunning = false;


    clearInterval(gameLoop);

    clearInterval(scoreLoop);


    obstacle.style.animation =
        'none';


    obstacle.style.left =
        `${obstacle.offsetLeft}px`;


    dino.classList.remove('jump');

    dino.style.transform =
        'rotate(90deg)';

    dino.style.transformOrigin =
        'bottom center';

    gameOverScreen
        .classList
        .add('active');
}

function restartGame() {

    gameRunning = true;

    isJumping = false;

    score = 0;


    scoreElement.textContent =
        '0000';


    gameOverScreen
        .classList
        .remove('active');


    obstacle.style.animation =
        '';

    obstacle.style.left =
        '';


    dino.style.transform =
        '';

    dino.style.transformOrigin =
        '';


    startScore();

    startGameLoop();
}

document.addEventListener(
    'keydown',

    event => {

        if (event.code === 'Space') {

            event.preventDefault();


            if (gameRunning) {

                jump();

            }

            else {

                restartGame();

            }

        }

    }
);

document
    .querySelector('.game-board')
    .addEventListener(
        'click',

        () => {

            if (gameRunning) {

                jump();

            }

        }
    );

restartButton
    .addEventListener(
        'click',

        event => {

            event.stopPropagation();

            restartGame();

        }
    );

startScore();

startGameLoop();