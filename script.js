let nave = document.getElementById("nave");
let tiro = document.getElementById("tiro");
let alvo = document.getElementById("alvo");
let jogo = document.getElementById("game");
let win = document.getElementById("ganhou");
let btnatirar = document.getElementById("atirar");
let btnreiniciar = document.getElementById("reiniciar");

let animacaoAtiva = false; // Variável de controle

function ativou() {
    if (animacaoAtiva) return; // Não executa se a animação estiver ativa

    animacaoAtiva = true; // Define o controle para indicar que a animação está ativa

    nave.style.animationPlayState = 'paused';
    tiro.className = 'atirou';

    // Verificar colisão a cada 100ms
    const intervaloColisao = setInterval(function () {
        if (verificarColisao(tiro, alvo)) {
            colidiu();
            clearInterval(intervaloColisao); // Para a verificação de colisão após a colisão ser detectada
        }
    }, 100);

    // Reiniciar a nave após 3 segundos, independentemente da colisão
    setTimeout(() => {
        nave.style.animationPlayState = ""; // Continua a animação da nave
        tiro.className = ''; // Remove a animação do tiro
        animacaoAtiva = false; // Reativa o controle
        clearInterval(intervaloColisao); // Para a verificação de colisão se não houver colisão
    }, 2000); // Corrigido para 3000ms para coincidir com o tempo de animação
}

function verificarColisao(elemento1, elemento2) {
    const rect1 = elemento1.getBoundingClientRect();
    const rect2 = elemento2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

function colidiu() {
    console.log('Acertou!');

    nave.style.animationPlayState = 'paused';
    alvo.style.animationPlayState = 'paused';
    jogo.style.opacity = '0';
    win.style.opacity = '1';
    btnatirar.style.display = 'none';
    btnreiniciar.style.display = 'block';
}

function reiniciar() {
    nave.style.animationPlayState = 'running';
    alvo.style.animationPlayState = 'running';
    jogo.style.opacity = '1';
    win.style.opacity = '0';
    btnatirar.style.display = 'block';
    btnreiniciar.style.display = 'none';
}
