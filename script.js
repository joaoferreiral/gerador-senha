const slider = document.getElementById('slider'); // selecionando a div
const valSlider = document.getElementById('valSlider'); // selecionando o span
const facil1 = document.getElementById('facil1');
const facil2 = document.getElementById('facil2');
const todos = document.getElementById('todos');
const opcao1 = document.getElementById('opcao1');
const opcao2 = document.getElementById('opcao2');
const opcao3 = document.getElementById('opcao3');
const opcao4 = document.getElementById('opcao4');
const repeticao = document.getElementById('repeticao');
const gerar = document.getElementById('gerar');
const meuInput = document.getElementById('meuInput');

const letraMaiuscula = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letraMinuscula = 'abcdefghijklmnopqrstuvwxyz';
const numero = '0123456789';
const caracteresEspeciais = '!@#$%&*()_+-=[]{}|;:,.<>?';
var lista = '';

slider.oninput = function() { // quando o slider for alterado, atualizará o valor do span
  valSlider.innerHTML = this.value; // atualizando o valor do span
}

function verificarOpcoesMarcadas() {
  if (!(facil1.checked) && !(facil2.checked) && !(todos.checked)) {
    gerar.disabled = true; // Se nenhuma opção está marcada, desabilita o botão "gerar"
  } else {
    gerar.disabled = false; // Caso contrário, habilita o botão "gerar"
  }
}
verificarOpcoesMarcadas();

facil1.onchange = function() { // se o checkbox estiver marcado
  verificarOpcoesMarcadas();
  if (this.checked) {
    opcao1.checked = true
    opcao2.checked = true;
    opcao3.checked = false;
    opcao4.checked = false;

    lista = letraMaiuscula + letraMinuscula;
  }
}

facil2.onchange = function() {
  verificarOpcoesMarcadas();
  if (this.checked) {
    opcao1.checked = true
    opcao2.checked = true;
    opcao3.checked = true;
    opcao4.checked = false;

    lista = letraMaiuscula.replace(/[IO]/g, "") + letraMinuscula.replace("l", "") + numero.replace(/1|0/g, ""); // removendo letras I e O usando regex g = global
  }  //????
}
todos.onchange = function() {
  verificarOpcoesMarcadas();
  if (this.checked) {
    opcao1.checked = true
    opcao2.checked = true;
    opcao3.checked = true;
    opcao4.checked = true;

    lista = letraMaiuscula + letraMinuscula + numero + caracteresEspeciais; 
  }
}



function gerarSenha (lista) {
  let senha = "";
  let ultimoCaractere = "";
  
  for(i = 0; i < slider.value ; i++) {
   let indice = Math.floor(Math.random() * lista.length); // pega um número aleatório e pega o caractere da lista 

    if(repeticao.checked) { // se a caixa de repetição estiver marcada
      while(lista[indice] == ultimoCaractere) { //?
        indice = Math.floor(Math.random() * lista.length);
      }
    }
    senha += lista[indice]; // pega o caractere da lista e adiciona na senha
    ultimoCaractere = lista[indice]; // ultimo caractere vai o prox caractere 
  }
  return senha; // retorna a senha
}

gerar.onclick = function() { // ao clicar no botão
  meuInput.value = gerarSenha(lista);  // pega a senha e coloca no input
}

