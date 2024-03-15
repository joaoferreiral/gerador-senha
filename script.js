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
const criarBarra = document.getElementById('criarBarra');

const letraMaiuscula = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letraMinuscula = 'abcdefghijklmnopqrstuvwxyz';
const numero = '0123456789';
const caracteresEspeciais = '!@#$%&*()_+-=[]{}|;:,.<>?';
var lista = '';

slider.oninput = function() {
  valSlider.innerHTML = this.value;
}

function verificarOpcoesMarcadas() {
  if (!(facil1.checked) && !(facil2.checked) && !(todos.checked)) {
    gerar.disabled = true;
  } else {
    gerar.disabled = false;
  }
}
verificarOpcoesMarcadas();

facil1.onchange = function() {
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

    lista = letraMaiuscula.replace(/[IO]/g, "") + letraMinuscula.replace("l", "") + numero.replace(/1|0/g, "");
  }
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



function gerarSenha(lista) {
  let senha = "";
  let ultimoCaractere = "";
  for(i = 0; i < slider.value; i++) {
    let indice = Math.floor(Math.random() * lista.length);

    if(repeticao.checked) {
      while (lista[indice] == ultimoCaractere) {
        indice = Math.floor(Math.random() * lista.length);
      }
    }

    senha += lista[indice];
    ultimoCaractere = lista[indice];
  }

  return senha;
}


gerar.onclick = function() {
  meuInput.value = gerarSenha(lista);
  forcaSenha(gerarSenha(lista));
}

function forcaSenha(senha) {
  let forca = '';
  let tamanho = senha.length;
  let cor;
  
  if(tamanho >= 8 & tamanho <= 11) {
    forca = 10;
  } else if(tamanho >= 12 & tamanho <= 15) {
    forca = 20;
  } else if(tamanho >= 16 & tamanho <= 20) {
    forca = 30;
  } else if (tamanho >= 21 & tamanho <= 25) {
    forca = 40;
  } else if (tamanho >= 26) {
    forca = 50;
  }
  
  if(/[A-Z]/.test(senha)) {
    forca += 10;
  }
  if(/[a-z]/.test(senha)) {
    forca += 10;
   }
  if(/\d/.test(senha)) {
    forca += 10;
  }
  if (/[!@#$%&*()_+\-=\[\]{}|;:',.<>?/]/.test(senha)) {
    forca += 10
  }

  if(repeticao.checked) {
    forca += 10;
  }

  if(forca <= 24) {
    cor = '#FF0000';
  } else if (forca >= 25 && forca <= 49) {
    cor = '#FFFF00';
  } else if (forca >= 50 && forca <= 100) {
    cor = '#00FF00';
  }
  criarBarra.innerHTML = `<div style="width: ${forca}%; background-color:${cor};height: 10px; border-radius:10px"></div>`
  
  return(forca);
}