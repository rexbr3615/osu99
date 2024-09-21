const target = document.getElementById('target');
const blueTarget = document.getElementById('blueTarget');
const yellowTarget = document.getElementById('yellowTarget');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const gameMusic = document.getElementById('gameMusic');
const startButton = document.getElementById('startButton');
const winMessage = document.getElementById('winMessage');

let score = 0;
let moveInterval;

function moveTarget(targetElement) {
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);
    targetElement.style.left = `${x}px`;
    targetElement.style.top = `${y}px`;
    targetElement.style.display = 'block';
}

target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    target.style.backgroundColor = 'green';
    setTimeout(() => {
        target.style.backgroundColor = 'red';
        moveTarget(target);
    }, 200);
    resetTimer();
    
    if (score >= 100) {
        endGame();
    }
});

// Lógica para a bolinha azul
function showBlueTarget() {
    setTimeout(() => {
        moveTarget(blueTarget);
        setTimeout(() => {
            blueTarget.style.display = 'none';
        }, 5000);
    }, Math.random() * (5000) + 5000); // Aparece entre 5 e 10 segundos
}

// Lógica para a bolinha amarela
function showYellowTarget() {
    setTimeout(() => {
        moveTarget(yellowTarget);
        setTimeout(() => {
            yellowTarget.style.display = 'none';
        }, 5000);
    }, Math.random() * (5000) + 15000); // Aparece entre 15 e 20 segundos
}

// Mover o alvo a cada 3 segundos
function startTimer() {
    moveInterval = setInterval(() => {
        moveTarget(target);
        showBlueTarget();
        showYellowTarget();
    }, 3000);
}

function resetTimer() {
    clearInterval(moveInterval);
    startTimer();
}

// Função para iniciar o jogo
function startGame() {
    gameMusic.play();
    moveTarget(target);
    startTimer();
    startButton.style.display = 'none'; // Esconde o botão após iniciar
}

// Função para finalizar o jogo
function endGame() {
    clearInterval(moveInterval);
    target.style.display = 'none'; // Esconde o alvo
    blueTarget.style.display = 'none'; // Esconde a bolinha azul
    yellowTarget.style.display = 'none'; // Esconde a bolinha amarela
    winMessage.style.display = 'block'; // Exibe a mensagem de vitória
}

// Adiciona evento de clique ao botão
startButton.addEventListener('click', startGame);

// Adiciona eventos de clique para as bolinhas
blueTarget.addEventListener('click', () => {
    score += 5;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    blueTarget.style.display = 'none';
});

yellowTarget.addEventListener('click', () => {
    score += 10;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    yellowTarget.style.display = 'none';
});
