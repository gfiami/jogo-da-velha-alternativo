let spaceHasWin = {
  space1: false,
  space2: false,
  space3: false,
  space4: false,
  space5: false,
  space6: false,
  space7: false,
  space8: false,
  space9: false,
};
let spaceFull = {
  space1: 0,
  space2: 0,
  space3: 0,
  space4: 0,
  space5: 0,
  space6: 0,
  space7: 0,
  space8: 0,
  space9: 0,
};

let spaceFullTrueFalse = {
  space1: false,
  space2: false,
  space3: false,
  space4: false,
  space5: false,
  space6: false,
  space7: false,
  space8: false,
  space9: false,
};
let spacePlayedClass;
let finalWin = {
  s1: "",
  s2: "",
  s3: "",
  s4: "",
  s5: "",
  s6: "",
  s7: "",
  s8: "",
  s9: "",
};

//simbolos dos jogadores
const p1 = "X";
const p2 = "O";

//jogador 1 começa (depois a função changePlayer irá mudar de jogador)
let playerAtual = p1;

//criação de cada espaço do jogo e miniespaço do jogo
let divset = document.querySelector(".jogo-todo");
for (C = 1; C <= 9; C++) {
  divset.innerHTML += `<div  class='space${C}'></div>`;
  document.querySelector(
    `.space${C}`
  ).innerHTML += `<span  class='scaler${C}'> </span>`;
  for (D = 1; D <= 9; D++) {
    document.querySelector(
      `.scaler${C}`
    ).innerHTML += `<div  id='mini${C}${D}' class='minispace minispace${D}'> </div>`;
  }
}

//criação dos botões clicaveis de cada div
for (C = 1; C <= 9; C++) {
  for (D = 1; D <= 9; D++) {
    let minispace = document.querySelectorAll(`.space${C} .minispace${D}`);
    minispace[0].innerHTML = `<button  type='button' class='buttonMini' id='minispace${C}${D}'onclick='marcador(this)'></button>`;
  }
}

//ao clicar no miniespaço, marca com o símbolo do jogador e desabilita aquele miniespaço e invoca outras funções
MS = 0; //contador para inclusão de cada minispaço clicado
function marcador(obj) {
  let objectId = obj.id;
  document.querySelector(`#${objectId}`).innerHTML = playerAtual;
  document.querySelector(`#${objectId}`).disabled = true;
  let digitsOfId = objectId[9] + objectId[10];
  completedMinispaces[MS] = digitsOfId;
  MS++;
  let lastPlayedId = objectId;
  changePlayer();
  spacePlayedClass = obj.parentNode.parentNode.parentNode.className; //classe do espaço jogado
  spaceFull[spacePlayedClass]++; //espaço jogado ganha mais 1 ponto (com 9 vira 'cheio')
  if (spaceFull[spacePlayedClass] == 9) {
    includeSpaceFull(spacePlayedClass);
  }
  checkWin(spacePlayedClass);
  checkWhatMinispace(objectId);
  changeBorderColor();
  changeColor(lastPlayedId);
  checkFinalWin();
}
//checa qual minispace o jogador clicou para levá-lo até o space correspondente
function checkWhatMinispace(idDoButton) {
  let spaceRedirect = idDoButton[10]; //número que corresponde ao space que iremos
  let spaceCompleted = spaceHasWin[`space${spaceRedirect}`];
  let spaceCompletedFull = spaceFullTrueFalse[`space${spaceRedirect}`];
  for (C = 1; C <= 9; C++) {
    for (D = 1; D <= 9; D++) {
      let buttonText = document.querySelector(`#minispace${C}${D}`).innerText;
      //se o espaço tiver 'vitoria', habilita TODOS os outros botões, exceto lá, se nao, habilita apenas do local para jogar
      if (spaceCompleted == true || spaceCompletedFull == true) {
        document.querySelector(`#minispace${C}${D}`).disabled = false;
        document.querySelector(
          `#minispace${spaceRedirect}${D}`
        ).disabled = true;
      } else {
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
      }
      //se já tiver 'vitoria' ou 'cheio' mantém DESABILITADO
      if (
        completedSpaces.includes(`${C}`) == true ||
        spaceIsFull.includes(`${C}`) == true
      ) {
        document.querySelector(`#minispace${C}${D}`).disabled = true;
      }
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

//deixa a cor da última peça colocada como vermelha
let primeiraJogada = true;
let oldSpaceId;
function changeColor(idOfSpace) {
  if (primeiraJogada == true) {
    primeiraJogada = false;
    oldSpaceId = idOfSpace;
    document.querySelector(`#${idOfSpace}`).style.color = "red";
    return;
  }
  document.querySelector(`#${oldSpaceId}`).style.color = "black";
  document.querySelector(`#${idOfSpace}`).style.color = "red";
  oldSpaceId = idOfSpace;
}

let localJogado;
let simbolo;
//função para checar o símbolo jogado no espaço
function enterMiniSpaceNumber(X) {
  simbolo = document.querySelector(`#minispace${localJogado}${X}`).innerText;

  return simbolo;
}

//função para checar após cada jogada se naquele espaço ocorreu vitória e adiciona o espaço aos nao jogaveis
function checkWin(localJogadoClass) {
  localJogado = localJogadoClass[5]; //pega último digito da class, que informa o espaço jogado de 1 a 9

  //LINHAS 1 = 2 = 3 // 4 = 5 = 6 // 7 = 8 = 9
  if (enterMiniSpaceNumber(1) !== "") {
    //linha 1 = 2 = 3
    if (
      enterMiniSpaceNumber(1) == enterMiniSpaceNumber(2) &&
      enterMiniSpaceNumber(2) == enterMiniSpaceNumber(3)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
  if (enterMiniSpaceNumber(4) !== "") {
    //linha 4 = 5 = 6
    if (
      enterMiniSpaceNumber(4) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(6)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
  if (enterMiniSpaceNumber(7) !== "") {
    //linha 7 = 8 = 9
    if (
      enterMiniSpaceNumber(7) == enterMiniSpaceNumber(8) &&
      enterMiniSpaceNumber(8) == enterMiniSpaceNumber(9)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
  //COLUNAS: 1 = 4 = 7 // 2 = 5 = 8 // 3 = 6 = 9
  if (enterMiniSpaceNumber(1) !== "") {
    //coluna 1 = 4 = 7
    if (
      enterMiniSpaceNumber(1) == enterMiniSpaceNumber(4) &&
      enterMiniSpaceNumber(4) == enterMiniSpaceNumber(7)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
  if (enterMiniSpaceNumber(2) !== "") {
    //coluna 2 = 5 = 8
    if (
      enterMiniSpaceNumber(2) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(8)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
  if (enterMiniSpaceNumber(3) !== "") {
    //coluna 3 = 6 = 9
    if (
      enterMiniSpaceNumber(3) == enterMiniSpaceNumber(6) &&
      enterMiniSpaceNumber(6) == enterMiniSpaceNumber(9)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
  // DIAGONAIS: 1 = 5 = 9 // 3 = 5 = 7
  if (enterMiniSpaceNumber(1) !== "") {
    //diagonal 1 = 5 = 9
    if (
      enterMiniSpaceNumber(1) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(9)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
  if (enterMiniSpaceNumber(3) !== "") {
    //diagonal 3 = 5 = 9
    if (
      enterMiniSpaceNumber(3) == enterMiniSpaceNumber(5) &&
      enterMiniSpaceNumber(5) == enterMiniSpaceNumber(7)
    ) {
      SpaceEnded(localJogadoClass);
      changeToSpaceWinner(simbolo, localJogado);
    }
  }
}
let G = 0;
let H = 0;
let completedSpaces = new Array(9);
let spaceIsFull = new Array(9);
//função que coloca o space como finalizado devido a VITORIA
function SpaceEnded(classOfSpace) {
  spaceHasWin[classOfSpace] = true;
  completedSpaces[G] = spacePlayedClass[5];
  G++;
  //document.querySelector(`.${classOfSpace}`).innerHTML = `<p id=> TESTE </p>`; // DEPOIS CRIAR UM ABSOLUTE POSITION PARA ESSA PARTE DE POR EM CIMA O RESULTADO
}

//função que coloca o space como finalizado devido a CHEIO
function includeSpaceFull(classOfSpaceFull) {
  spaceIsFull[H] = classOfSpaceFull[5];
  spaceFullTrueFalse[classOfSpaceFull] = true;
  H++;
}

let completedMinispaces = new Array(81);
//muda a cor do jogo da velha para indicar onde se deve jogar
function changeBorderColor() {
  let Y;
  for (C = 1; C <= 9; C++) {
    for (D = 1; D <= 9; D++) {
      //se estiver desabilitado fica cinza
      if (document.querySelector(`#minispace${C}${D}`).disabled == true) {
        document.querySelector(`.scaler${C}`).style.transform = "scale(1)";
        document.querySelector(`#mini${C}${D}`).style.borderColor = "gray";
      }
      //se estiver habilitado fica verde
      if (document.querySelector(`#minispace${C}${D}`).disabled == false) {
        document.querySelector(`#mini${C}${D}`).style.borderColor = "purple";
        document.querySelector(`.scaler${C}`).style.transform = "scale(1.5)";

        Y = C;
      }
      //completedMinispaces.includes(`${C}${D}`) lógica para se incluir o espaço e estiver disabilitado
    }
  }
  for (E = 1; E <= 9; E++) {
    //se o miniespaço já tiver sido jogado mas agora o jogo será no espaço dele, muda a cor dele também
    if (completedMinispaces.includes(`${Y}${E}`)) {
      document.querySelector(`#mini${Y}${E}`).style.borderColor = "purple";
      document.querySelector(`.scaler${Y}`).style.transform = "scale(1.35)";
    }
  }
}

//add a simple text to make a space looks like an 'X' or 'O' depending on winner of space
function changeToSpaceWinner(vencedorDoEspaço, numberSpace) {
  if (vencedorDoEspaço == "X") {
    finalWin[`s${numberSpace}`] = "X";
    document.querySelector(`.space${numberSpace}`).style.backgroundColor =
      "yellow";
    for (C = 1; C <= 9; C++) {
      document.querySelector(`#minispace${numberSpace}${C}`).innerHTML = "";
    }
    for (E = 1; E <= 9; E = E + 2) {
      document.querySelector(`#minispace${numberSpace}${E}`).innerHTML = "X";
      document.querySelector(`#minispace${numberSpace}${E}`).style.color =
        "black";
    }
  }
  if (vencedorDoEspaço == "O") {
    finalWin[`s${numberSpace}`] = "O";
    document.querySelector(`.space${numberSpace}`).style.backgroundColor =
      "cyan";
    for (D = 1; D <= 9; D++) {
      document.querySelector(`#minispace${numberSpace}${D}`).innerHTML = "O";
      document.querySelector(`#minispace${numberSpace}${D}`).style.color =
        "black";
    }
    document.querySelector(`#minispace${numberSpace}${5}`).innerHTML = "";
  }
}
//checa se houve vitória no jogo "grande"
function checkFinalWin() {
  //LINHAS 1 = 2 = 3 // 4 = 5 = 6 // 7 = 8 = 9
  if (finalWin.s1 !== "") {
    //linha 1 = 2 = 3
    if (finalWin.s1 == finalWin.s2 && finalWin.s2 == finalWin.s3) {
      msgWin(finalWin.s1);
    }
  }
  if (finalWin.s4 !== "") {
    //linha 4 = 5 = 6
    if (finalWin.s4 == finalWin.s5 && finalWin.s5 == finalWin.s6) {
      msgWin(finalWin.s4);
    }
  }
  if (finalWin.s7 !== "") {
    //linha 7 = 8 = 9
    if (finalWin.s7 == finalWin.s8 && finalWin.s8 == finalWin.s9) {
      msgWin(finalWin.s7);
    }
  }
  //COLUNAS: 1 = 4 = 7 // 2 = 5 = 8 // 3 = 6 = 9
  if (finalWin.s1 !== "") {
    //coluna 1 = 4 = 7
    if (finalWin.s1 == finalWin.s4 && finalWin.s4 == finalWin.s7) {
      msgWin(finalWin.s1);
    }
  }
  if (finalWin.s2 !== "") {
    //coluna 2 = 5 = 8
    if (finalWin.s2 == finalWin.s5 && finalWin.s5 == finalWin.s8) {
      msgWin(finalWin.s2);
    }
  }
  if (finalWin.s3 !== "") {
    //coluna 3 = 6 = 9
    if (finalWin.s3 == finalWin.s6 && finalWin.s6 == finalWin.s9) {
      msgWin(finalWin.s3);
    }
  }
  // DIAGONAIS: 1 = 5 = 9 // 3 = 5 = 7
  if (finalWin.s1 !== "") {
    //diagonal 1 = 5 = 9
    if (finalWin.s1 == finalWin.s5 && finalWin.s5 == finalWin.s9) {
      msgWin(finalWin.s1);
    }
  }
  if (finalWin.s3 !== "") {
    //diagonal 3 = 5 = 7
    if (finalWin.s3 == finalWin.s5 && finalWin.s5 == finalWin.s7) {
      msgWin(finalWin.s3);
    }
  }
}
let winner;
//quando o jogo acaba, mostra mensagem e desabilita botões, scales e bordas para cinza
function msgWin(winnerSymbol) {
  if (winnerSymbol == "X") {
    winner = "Jogador 1";
  }
  if (winnerSymbol == "O") {
    winner = "Jogador 2";
  }
  document.querySelector(
    "#messageWinner"
  ).innerHTML = `O vencedor foi o ${winner}(${winnerSymbol})`;
  for (C = 1; C <= 9; C++) {
    for (D = 1; D <= 9; D++) {
      document.querySelector(`#minispace${C}${D}`).disabled = true;
      document.querySelector(`#mini${C}${D}`).style.borderColor = "gray";
      document.querySelector(`.scaler${C}`).style.transform = "scale(1)";
    }
  }
}
