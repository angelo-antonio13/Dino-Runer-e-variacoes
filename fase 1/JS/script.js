const frog =
    document.querySelector('.frog');

const obstacle =
    document.querySelector('.obstacle');

const gameBoard =
    document.querySelector('.game-board');

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

let obstaclePosition = 0;

let obstacleSpeed = 6;

let animationFrame;

let scoreInterval;


function jump() {

    if (!gameRunning) return;

    if (isJumping) return;


    isJumping = true;

    frog.classList.add('jump');


    setTimeout(() => {

        frog.classList.remove('jump');

        isJumping = false;

    }, 650);

}


function moveObstacle() {

    if (!gameRunning) return;


    obstaclePosition -= obstacleSpeed;

    obstacle.style.left =
        `${obstaclePosition}px`;


    if (obstaclePosition < -120) {

        obstaclePosition =
            gameBoard.offsetWidth + 100;


        if (obstacleSpeed < 16) {

            obstacleSpeed += 0.5;

        }

    }


    animationFrame =
        requestAnimationFrame(
            moveObstacle
        );

}


function startScore() {

    scoreInterval =
        setInterval(() => {

            if (!gameRunning) return;


            score++;


            scoreElement.textContent =
                score
                    .toString()
                    .padStart(4, '0');

        }, 100);

}


function checkCollision() {

    if (!gameRunning) return;


    const frogRect =
        frog.getBoundingClientRect();

    const obstacleRect =
        obstacle.getBoundingClientRect();


    if (

        frogRect.right >
            obstacleRect.left

        &&

        frogRect.left <
            obstacleRect.right

        &&

        frogRect.bottom >
            obstacleRect.top

        &&

        frogRect.top <
            obstacleRect.bottom

    ) {

        endGame();

    }


    requestAnimationFrame(
        checkCollision
    );

}

function endGame() {

    if (!gameRunning) return;


    gameRunning = false;


    cancelAnimationFrame(
        animationFrame
    );

    clearInterval(
        scoreInterval
    );


    frog.classList.remove('jump');


    frog.style.transform =
        'rotate(90deg)';

    frog.style.transformOrigin =
        'bottom center';


    finalScoreElement.textContent =
        score
            .toString()
            .padStart(4, '0');


    gameOver
        .classList
        .add('active');

}

function restartGame() {

    cancelAnimationFrame(
        animationFrame
    );

    clearInterval(
        scoreInterval
    );


    gameRunning = true;

    isJumping = false;

    score = 0;

    obstacleSpeed = 6;


    scoreElement.textContent =
        '0000';


    gameOver
        .classList
        .remove('active');


    frog.style.transform = '';

    frog.style.transformOrigin = '';

    frog.classList.remove('jump');


    obstaclePosition =
        gameBoard.offsetWidth + 100;


    obstacle.style.left =
        `${obstaclePosition}px`;


    startScore();

    moveObstacle();

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


gameBoard.addEventListener(

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

obstaclePosition =
    gameBoard.offsetWidth + 100;


startScore();

moveObstacle();

checkCollision();