/* var selectTeste = document.querySelectorAll(".space1 .minispace");
var arraySize = selectTeste.length - 1;

for (C = 0; C <= arraySize; C++) {
  selectTeste[C].style.border = "none";
} */
const p1 = "X";
const p2 = "O";
//jogador 1 começa
let playerAtual = p1;
let divset = document.querySelector(".jogo-todo"); //seleciona a div que contém o jogo inteiro
//criação de cada espaço do jogo e miniespaço do jogo
for (C = 1; C <= 9; C++) {
  divset.innerHTML += `<div class='space${C}'></div>`;
  for (D = 1; D <= 9; D++) {
    document.querySelector(
      `.space${C}`
    ).innerHTML += `<div id='mini${C}${D}' class='minispace minispace${D}'> </div>`;
  }
}
//criação dos botões clicaveis de cada div
for (C = 1; C <= 9; C++) {
  for (D = 1; D <= 9; D++) {
    let minispace = document.querySelectorAll(`.space${C} .minispace${D}`);
    minispace[0].innerHTML = `<button type='button' id='minispace${C}${D}'onclick='marcador(this)'></button>`;
  }
}
//ao clicar no espaço, marca com o símbolo do jogador e disabilita espaço
function marcador(obj) {
  let objectId = obj.id;
  document.querySelector(`#${objectId}`).innerHTML = playerAtual;
  document.querySelector(`#${objectId}`).disabled = true;
  let lastPlayedId = objectId;
  changePlayer();
  changeColor(lastPlayedId);
  let spacePlayedClass = obj.parentNode.parentNode.className;
  checkWin(spacePlayedClass);
  checkWhatMinispace(objectId);
}
//checa qual minispace o jogador clicou para levá-lo até o space correspondente
function checkWhatMinispace(idDoButton) {
  let spaceRedirect = idDoButton[10]; //número que corresponde ao space que iremos
  console.log(spaceRedirect);
  for (C = 1; C <= 9; C++) {
    for (D = 1; D <= 9; D++) {
      let buttonText = document.querySelector(`#minispace${C}${D}`).innerText;
      //Habilita botões no espaço correto de se jogar (se já tiver X ou O continua disabled)
      if (C == spaceRedirect) {
        if (buttonText == "") {
          document.querySelector(`#minispace${C}${D}`).disabled = false;
        } else {
          document.querySelector(`#minispace${C}${D}`).disabled = true;
        }
      }
      //Desabilita os botões nos espaços que não está ocorrendo a jogada
      if (C != spaceRedirect) {
        document.querySelector(`#minispace${C}${D}`).disabled = true;
      }

      //desabilitar botões e muda cor para preto
    }
  }
}
//muda de jogador
function changePlayer() {
  if (playerAtual == p1) {
    playerAtual = p2;
    document.querySelector(".vez-de-quem").innerHTML =
      "Turno do Jogador 2<strong>(O)</strong>";
  } else {
    playerAtual = p1;
    document.querySelector(".vez-de-quem").innerHTML =
      "Turno do Jogador 1<strong>(X)</strong>";
  }
}
//deixa cor da última peça jogada vermelha

let primeiraJogada = true;
let oldSpaceId;
//troca cor da ultima peça colocada
function changeColor(idOfSpace) {
  //checa se é a primeira jogada, se não for, irá começar a trocar cores
  if (primeiraJogada == true) {
    primeiraJogada = false;
    oldSpaceId = idOfSpace;
    return;
  }
  document.querySelector(`#${oldSpaceId}`).style.color = "black";
  document.querySelector(`#${idOfSpace}`).style.color = "red";
  oldSpaceId = idOfSpace;
}
let localJogado;

//função para checar o símbolo jogado no espaço
function enterMiniSpaceNumber(X) {
  let simbolo = document.querySelector(
    `#minispace${localJogado}${X}`
  ).innerText;
  return simbolo;
}
//função para checar após cada jogada se naquele espaço ocorreu vitória
function checkWin(localJogadoClass) {
  localJogado = localJogadoClass[5]; //pega último digito da class, que informa o espaço jogado de 1 a 9

  //LINHAS 1 = 2 = 3 // 4 = 5 = 6 // 7 = 8 = 9
  if (enterMiniSpaceNumber(1) !== "") {
    //linha 1 = 2 = 3
    if (
      enterMiniSpaceNumber(1) == enterMiniSpaceNumber(2) &&
      enterMiniSpaceNumber(2) == enterMiniSpaceNumber(3)
    )
      console.log("Linha 1 ganhou com símbolo " + enterMiniSpaceNumber(1));
  }
  if (enterMiniSpaceNumber(4) !== "") {
    //linha 4 = 5 = 6
    if (
      enterMiniSpaceNumber(4) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(6)
    )
      console.log("Linha 2 ganhou com símbolo " + enterMiniSpaceNumber(4));
  }
  if (enterMiniSpaceNumber(7) !== "") {
    //linha 7 = 8 = 9
    if (
      enterMiniSpaceNumber(7) == enterMiniSpaceNumber(8) &&
      enterMiniSpaceNumber(8) == enterMiniSpaceNumber(9)
    )
      console.log("Linha 3 ganhou com símbolo " + enterMiniSpaceNumber(7));
  }
  //COLUNAS: 1 = 4 = 7 // 2 = 5 = 8 // 3 = 6 = 9
  if (enterMiniSpaceNumber(1) !== "") {
    //coluna 1 = 4 = 7
    if (
      enterMiniSpaceNumber(1) == enterMiniSpaceNumber(4) &&
      enterMiniSpaceNumber(4) == enterMiniSpaceNumber(7)
    )
      console.log("Coluna 1 ganhou com símbolo " + enterMiniSpaceNumber(1));
  }
  if (enterMiniSpaceNumber(2) !== "") {
    //coluna 2 = 5 = 8
    if (
      enterMiniSpaceNumber(2) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(8)
    )
      console.log("Coluna 2 ganhou com símbolo " + enterMiniSpaceNumber(2));
  }
  if (enterMiniSpaceNumber(3) !== "") {
    //coluna 3 = 6 = 9
    if (
      enterMiniSpaceNumber(3) == enterMiniSpaceNumber(6) &&
      enterMiniSpaceNumber(6) == enterMiniSpaceNumber(9)
    )
      console.log("Coluna 3 ganhou com símbolo " + enterMiniSpaceNumber(3));
  }
  // DIAGONAIS: 1 = 5 = 9 // 3 = 5 = 7
  if (enterMiniSpaceNumber(1) !== "") {
    //diagonal 1 = 5 = 9
    if (
      enterMiniSpaceNumber(1) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(9)
    )
      console.log("Diagonal 1 ganhou com símbolo " + enterMiniSpaceNumber(1));
  }
  if (enterMiniSpaceNumber(3) !== "") {
    //diagonal 3 = 5 = 9
    if (
      enterMiniSpaceNumber(3) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(7)
    )
      console.log("Diagonal 2 ganhou com símbolo " + enterMiniSpaceNumber(3));
  }
}
