// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira e José Renan
// Código fonte original: http://zetcode.com/javascript/snake/


// Declaração de variáveis e constantes
var tela;
var ctx;

var cabeca;
var maca;
var bola;

var pontos;
var maca_x;
var maca_y;

var score = 0;


var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
var noJogo = true;

var trilha_sonora = new Audio('./components/trilha.ogg')

const TAMANHO_PONTO = 10;
const ALEATORIO_MAXIMO = 50;
var ATRASO = 140;
const C_ALTURA = 600;
const C_LARGURA = 700;

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

const TECLA_W = 87;
const TECLA_A = 65;
const TECLA_S = 83;
const TECLA_D = 68;

const TECLA_ESPAÇO  = 32;
const TECLA_R  = 82
const TECLA_M = 77

const iniciarJogoBtn = document.querySelector('#iniciarJogoBtn');
const menuFimDeJogo = document.querySelector('#menuFimDeJogo');
const plarcarDeLideres = document.querySelector('#placardeLideresLista');
const plarcarDeLideresBtn = document.querySelector('#placarDeLideresBtn');

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla

window.onload = iniciar(); // Chama função inicial do jogo


// Definição das funções

function iniciar() {
    menuFimDeJogo.style.display = 'none';
    tela = document.getElementById("tela");
    tela.width = 700;
    tela.height = 600;

    ctx = tela.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);
    
    trilha_sonora.play()
    carregarImagens();
    criarCobra();
    localizarMaca();
    setTimeout("cicloDeJogo()", ATRASO);
}

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = "./components/cabeca.png";

    bola = new Image();
    bola.src = "./components/ponto.png";

    maca = new Image();
    maca.src = "./components/maca.png";
}

function criarCobra() {
    pontos = 3;

    for (var z = 0; z < pontos; z++) {
        x[z] = 50 - z * TAMANHO_PONTO;
        y[z] = 50;
    }
}

function localizarMaca() {
    var r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    maca_x = r * TAMANHO_PONTO;

    r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    maca_y = r * TAMANHO_PONTO;
}

function cicloDeJogo() {
    if (noJogo) {
        verificarMaca();
        verificarColisao();
        mover();
        fazerDesenho();
        desenhar_especial();
        setTimeout("cicloDeJogo()", ATRASO);
    }
}

function verificarMaca() {
    if ((x[0] == maca_x) && (y[0] == maca_y)) {        
        pontos++;
        score++;
        verificar_nivel();
        document.querySelector('#score').textContent = score.toString();
        localizarMaca();
        var audio = new Audio('./components/som_comendo.wav');
        audio.play();
    }
}

function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
    }

    if (y[0] >= C_ALTURA) {
        noJogo = false;
    }

    if (y[0] < 0) {
        noJogo = false;
    }

    if (x[0] >= C_LARGURA) {
        noJogo = false;
    }

    if (x[0] < 0) {
        noJogo = false;
    }
}

function mover() {
    for (var z = pontos; z > 0; z--) {
        x[z] = x[z - 1];
        y[z] = y[z - 1];
    }

    if (paraEsquerda) {
        x[0] -= TAMANHO_PONTO ;
    }

    if (paraDireita) {
        x[0] += TAMANHO_PONTO;
    }

    if (paraCima) {
        y[0] -= TAMANHO_PONTO;
    }

    if (paraBaixo) {
        y[0] += TAMANHO_PONTO;
    }
}
function desenhaScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function fazerDesenho() {
    ctx.clearRect(0, 0, C_LARGURA, C_ALTURA);
    ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);

    if (noJogo) {
        ctx.drawImage(maca, maca_x, maca_y);

        for (var z = 0; z < pontos; z++) {
            if (z == 0) {
                ctx.drawImage(cabeca, x[z], y[z]);
            } else {
                ctx.drawImage(bola, x[z], y[z]);
            }
        }
    } else {
        fimDeJogo();
    }
}

function fimDeJogo() {
    trilha_sonora.pause()
    placardeLideresLista.style.display = 'none';
    menuFimDeJogo.style.display = 'flex';
    document.querySelector('#scoreFinal').textContent = score.toString();
    var nome = prompt("Digite seu nome: ")
    placardeLideres(nome, score);

}

function verificarTecla(e) {
    var tecla = e.keyCode;

    if ((tecla == TECLA_ESQUERDA || tecla == TECLA_A) && (!paraDireita)) {
        paraEsquerda = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_DIREITA || tecla == TECLA_D) && (!paraEsquerda)) {
        paraDireita = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_ACIMA || tecla == TECLA_W) && (!paraBaixo)) {
        paraCima = true;
        paraDireita = false;
        paraEsquerda = false;
    }

    if ((tecla == TECLA_ABAIXO || tecla == TECLA_S) && (!paraCima)) {
        paraBaixo = true;
        paraDireita = false;
        paraEsquerda = false;
    }

    if(tecla == TECLA_ESPAÇO){
        especial()
    }

    if(tecla == TECLA_M){
        trilha_sonora.pause()
    }

    if(tecla == TECLA_R){
        location.reload()
    }
}

var arr = [];
function placardeLideres(nome, pontos) {

    const obj = {
        "nome": nome,
        "pontos": pontos
    };

    if (localStorage.getItem("item") != null) {
        arr = JSON.parse(localStorage.getItem("item"));
        arr.push(obj);
        localStorage.setItem("item", JSON.stringify(arr));
    } else {
        arr.push(obj);
        localStorage.setItem("item", JSON.stringify(arr));
    }

}

iniciarJogoBtn.addEventListener('click', () => {
    location.reload();
})

var listaUl = document.querySelector('div#app ol.list-decimal');
plarcarDeLideresBtn.addEventListener('click', () => {

    placardeLideresLista.style.display = 'block';

    var obj = JSON.parse(localStorage.getItem("item"));
    obj.sort(function(a, b) {
        if(a.pontos > b.pontos) {
          return -1;
        } else {
          return true;
        }
      });
    for (let i = 0; i < 5; i++) {
        var item = document.createElement('li');
        item.textContent = obj[i].nome +" " +  obj[i].pontos + " pontos";
        listaUl.appendChild(item);
    }

})

function comparer(a, b) {
    if (a.pontos < b.pontos)
        return -1;

    if (a.pontos > b.pontos)
        return 1;

    return 0;
}

var contador_especial = 0;
function especial(){
    var pontos_especial = parseInt(score/10)
    if(pontos_especial>contador_especial){
        pontos = pontos - 3
        contador_especial++
    }    
}
function desenhar_especial(){
    var visor_especial = document.querySelector(".especial");
    var pontos_especial = parseInt(score/10) - contador_especial;
    if( pontos_especial == 1){
        visor_especial.innerHTML ="★";
    }else if( pontos_especial == 2){
        visor_especial.innerHTML ="★"+"★";
    }
    else if( pontos_especial == 3){
        visor_especial.innerHTML ="★"+"★"+"★";
    }
    else if( pontos_especial == 4){
        visor_especial.innerHTML ="★"+"★"+"★"+"★";
    }
    else if( pontos_especial == 5){
        visor_especial.innerHTML ="★"+"★"+"★"+"★"+"★";
    }else if( pontos_especial == 0){
        visor_especial.innerHTML ="";
    }
}

function verificar_nivel(){
    if(20 > score && score >=10){
        ATRASO = 100;
        document.querySelector(".nivel").innerHTML = "FASE 2";
        cabeca.src = "./components/cabeca_fase2.png";
        bola.src = "./components/ponto_fase2.png";
        maca.src = "./components/maca_fase2.png";
    }else if(30 >  score && score >=20){
        ATRASO = 60
        document.querySelector(".nivel").innerHTML = "FASE 3"
        cabeca.src = "./components/cabeca_fase3.png";
        bola.src = "./components/ponto_fase3.png";
        maca.src = "./components/maca_fase3.png";
    }else if(40 > score && score>=30){
        ATRASO = 30
        document.querySelector(".nivel").innerHTML = "FASE 4"
        cabeca.src = "./components/cabeca_fase4.png";
        bola.src = "./components/ponto_fase4.png";
        maca.src = "./components/maca_fase4.png";
    }
}