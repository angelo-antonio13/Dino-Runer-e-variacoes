// Autoria de: Angelo Antonio da Silva 
const robot =
    document.querySelector('.robot');

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

let obstacleSpeed = 12;

let obstacleAnimation;

let collisionAnimation;

let scoreInterval;

function jump() {

    if (!gameRunning) return;

    if (isJumping) return;


    isJumping = true;

    robot.classList.add('jump');


    setTimeout(() => {

        robot.classList.remove('jump');

        isJumping = false;

    }, 700);

}


function moveObstacle() {

    if (!gameRunning) return;


    obstaclePosition -= obstacleSpeed;

    obstacle.style.left =
        `${obstaclePosition}px`;


    if (obstaclePosition < -100) {

        obstaclePosition =
            gameBoard.offsetWidth + 80;


        if (obstacleSpeed < 35) {

            obstacleSpeed += 1;

        }

    }


    obstacleAnimation =
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


    const robotRect =
        robot.getBoundingClientRect();

    const obstacleRect =
        obstacle.getBoundingClientRect();


    if (

        robotRect.right >
            obstacleRect.left

        &&

        robotRect.left <
            obstacleRect.right

        &&

        robotRect.bottom >
            obstacleRect.top

        &&

        robotRect.top <
            obstacleRect.bottom

    ) {

        endGame();

        return;

    }


    collisionAnimation =
        requestAnimationFrame(
            checkCollision
        );

}

function endGame() {

    if (!gameRunning) return;


    gameRunning = false;


    cancelAnimationFrame(
        obstacleAnimation
    );

    cancelAnimationFrame(
        collisionAnimation
    );


    clearInterval(
        scoreInterval
    );


    robot.classList.remove('jump');


    robot.style.transform =
        'rotate(90deg)';

    robot.style.transformOrigin =
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
        obstacleAnimation
    );

    cancelAnimationFrame(
        collisionAnimation
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

    robot.style.transform = '';

    robot.style.transformOrigin = '';

    robot.classList.remove('jump');

    obstaclePosition =
        gameBoard.offsetWidth + 80;

    obstacle.style.left =
        `${obstaclePosition}px`;

    startScore();

    moveObstacle();

    checkCollision();

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
    gameBoard.offsetWidth + 80;


startScore();

moveObstacle();

checkCollision();
