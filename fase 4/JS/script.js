const dino =
    document.querySelector('.dino');

const obstacle =
    document.querySelector('.obstacle');

const scoreElement =
    document.querySelector('#score');

const finalScoreElement =
    document.querySelector('#final-score');

const gameOver =
    document.querySelector('.game-over');

const restartButton =
    document.querySelector('#restart');


let isJumping = false;

let gameRunning = true;

let score = 0;

let scoreInterval;

let gameLoop;

let speedLevel = 0;


function jump() {

    if (!gameRunning) return;

    if (isJumping) return;


    isJumping = true;

    dino.classList.add('jump');


    setTimeout(() => {

        dino.classList.remove('jump');

        isJumping = false;

    }, 700);

}

function startScore() {

    scoreInterval = setInterval(() => {

        if (!gameRunning) return;


        score++;


        scoreElement.textContent =
            score
                .toString()
                .padStart(3, '0');


        if (
            score > 0 &&
            score % 50 === 0
        ) {

            increaseSpeed();

        }

    }, 100);

}

function increaseSpeed() {

    speedLevel++;

    let newSpeed =
        2 - (speedLevel * 0.15);

    if (newSpeed < 0.8) {

        newSpeed = 0.8;

    }

    obstacle.style.setProperty(
        '--obstacle-speed',
        `${newSpeed}s`
    );
}

function startGameLoop() {

    gameLoop = setInterval(() => {

        if (!gameRunning) return;


        const obstaclePosition =
            obstacle.offsetLeft;


        const dinoBottom =
            parseInt(

                window
                    .getComputedStyle(dino)
                    .bottom

            );


        const dinoLeft =
            dino.offsetLeft;


        if (

            obstaclePosition <
                dinoLeft + 80

            &&

            obstaclePosition >
                dinoLeft - 40

            &&

            dinoBottom < 115

        ) {

            endGame();

        }

    }, 10);

}

function endGame() {

    gameRunning = false;


    clearInterval(gameLoop);

    clearInterval(scoreInterval);

    obstacle.style.animation =
        'none';

    obstacle.style.left =
        `${obstacle.offsetLeft}px`;

    dino.classList.remove('jump');

    dino.style.transform =
        'rotate(90deg)';

    dino.style.transformOrigin =
        'bottom center';

    finalScoreElement.textContent =
        score
            .toString()
            .padStart(3, '0');


    gameOver.classList.add('active');

}


function restartGame() {

    clearInterval(gameLoop);

    clearInterval(scoreInterval);


    gameRunning = true;

    isJumping = false;

    score = 0;

    speedLevel = 0;


    scoreElement.textContent =
        '000';

    gameOver.classList.remove('active');

    dino.style.transform = '';

    dino.style.transformOrigin = '';

    dino.classList.remove('jump');

    obstacle.style.animation = '';

    obstacle.style.left = '';

    obstacle.style.animationDuration =
        '2s';

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

            } else {

                restartGame();

            }

        }

    }

);

document.querySelector('.game-board')

    .addEventListener(

        'click',

        () => {

            if (gameRunning) {

                jump();

            }

        }

    );

restartButton.addEventListener(

    'click',

    event => {

        event.stopPropagation();

        restartGame();

    }

);

startScore();

startGameLoop();