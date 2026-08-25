// Autoria de: Angelo Antonio da Silva
const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
const scoreElement = document.querySelector('#score');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('#restart');

let isJumping = false;
let gameStarted = true;
let score = 0;
let scoreInterval;
let gameLoop;

function jump() {

    if (isJumping || !gameStarted) return;

    isJumping = true;

    dino.classList.add('jump');

    setTimeout(() => {

        dino.classList.remove('jump');

        isJumping = false;

    }, 650);
}

function startScore() {

    scoreInterval = setInterval(() => {

        if (gameStarted) {

            score++;

            scoreElement.textContent =
                score.toString().padStart(4, '0');

        }

    }, 100);
}

function startGameLoop() {

    gameLoop = setInterval(() => {

        const cactusPosition = cactus.offsetLeft;

        const dinoBottom =
            parseInt(
                window
                    .getComputedStyle(dino)
                    .bottom
            );

        const dinoLeft = dino.offsetLeft;


        const collision =
            cactusPosition < dinoLeft + 55 &&
            cactusPosition > dinoLeft - 30 &&
            dinoBottom < 100;


        if (collision) {

            gameOverGame();

        }

    }, 10);
}

function gameOverGame() {

    gameStarted = false;

    clearInterval(gameLoop);
    clearInterval(scoreInterval);

    cactus.style.animation = 'none';

    const cactusPosition = cactus.offsetLeft;

    cactus.style.left = `${cactusPosition}px`;

    dino.style.animation = 'none';

    dino.style.transform =
        'rotate(90deg)';

    dino.style.transformOrigin =
        'bottom center';

    gameOver.classList.add('active');
}

function restartGame() {

    gameStarted = true;

    score = 0;

    scoreElement.textContent = '0000';

    gameOver.classList.remove('active');


    cactus.style.animation = '';

    cactus.style.left = '';

    dino.style.animation = '';

    dino.style.transform = '';

    dino.classList.remove('jump');


    startScore();
    startGameLoop();
}

document.addEventListener('keydown', (event) => {

    if (event.code === 'Space') {

        event.preventDefault();

        if (!gameStarted) {

            restartGame();

        } else {

            jump();

        }

    }

});


document.addEventListener('click', () => {

    if (gameStarted) {

        jump();

    }

});


restartButton.addEventListener('click', (event) => {

    event.stopPropagation();

    restartGame();

});

startScore();
startGameLoop();
