/* var selectTeste = document.querySelectorAll(".space1 .minispace");
var arraySize = selectTeste.length - 1;

for (C = 0; C <= arraySize; C++) {
  selectTeste[C].style.border = "none";
} */
let divset = document.querySelector(".jogo-todo"); //seleciona a div que contém o jogo inteiro
//criação de cada espaço do jogo e miniespaço do jogo
for (C = 1; C <= 9; C++) {
  divset.innerHTML += `<div class='space space${C}'></div>`;
  for (D = 1; D <= 9; D++) {
    document.querySelector(
      `.space${C}`
    ).innerHTML += `<div class='minispace minispace${D}'> </div>`;
  }
}
//criação dos botões clicaveis de cada miniespaço
for (C = 1; C <= 9; C++) {
  for (D = 1; D <= 9; D++) {
    let minispace = document.querySelectorAll(`.space${C} .minispace${D}`);
    minispace[0].innerHTML = `<button type='button' id='minispace${C}${D}'onclick='marcador(this)'></button>`;
  }
}
function marcador(obj) {
  var objectId = obj.id;
  document.querySelector(`#${objectId}`).remove();
}
