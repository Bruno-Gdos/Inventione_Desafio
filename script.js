// Seus scripts aqui


function limite_textarea(valor) {
  quant = 10000;
  total = valor.length;
  if (total <= quant) {
    resto = quant - total;
    document.getElementById('cont').innerHTML = resto;
  } else {
    document.getElementById('texto').value = valor.substr(0, quant);
  }
}

function Checkbox() {
  document.getElementById('segundo-painel').style.display = 'none';

  if (document.getElementById('painel').checked) {
    document.getElementById('segundo-painel').style.display = 'block';
  } else {
    document.getElementById('segundo-painel').style.display = 'none';

  }
}

function formataData(data){
  var data = new Date(data);
  dia = (data.getDate()+1).toString().padStart(2, '0'),
  mes = (data.getMonth()+1).toString().padStart(2, '0'),
  ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

const valida = () =>{

  var resultado = Forms();

  if (resultado[0] == "" || resultado[1] == "" || resultado[2] == "" || resultado[3] == "" || resultado[4] == ""){
    alert("Preencha todos os campos");
    return;
}
}

const Forms = () => {

    var resultado = [];
    var sexo = document.getElementsByName('sexo');
  
    for(i = 0; i < sexo.length; i++) {
      if(sexo[i].checked){
      var sexo = sexo[i];
      }
  }
  
    var input = [document.querySelector("#nome"), document.querySelector("#idade"), document.querySelector("#data"),sexo, document.getElementById("texto")];
  
    for (let indice=0; indice < input.length; indice++){
      
      if (input[indice].id == "data"){
        var data = formataData(input[indice].value);
        resultado.push(data);
      }else{
        if (input[indice].value == ""){
          alert("Preencha todos os campos");
          return;
        }
        var texto = input[indice].value;
        resultado.push(texto);
      }
    }
    return resultado;
}

function Apresentar(){

valida();


var resultado = Forms();





document.getElementById('apresentacao').style.display = 'block';


document.getElementById('resultado').innerHTML = `Olá me chamo ${resultado[0]}, tenho ${resultado[1]} anos, escolhi no formulário a data ${resultado[2]} e sou do sexo ${resultado[3]}.

O número de caracteres colocados na apresentação foi: ${resultado[4].length}
E o texto foi: ${resultado[4]}

Gostaria de acrescentar também que, Bruno é um cara muito legal, e que eu recomendo ele para qualquer trabalho, ele merece essa vaga.`;

document.getElementById('resultado2').innerHTML = `Olá me chamo ${resultado[0]}, tenho ${resultado[1]} anos, escolhi no formulário a data ${resultado[2]} e sou do sexo ${resultado[3]}.

O número de caracteres colocados na apresentação foi: ${resultado[4].length}
E o texto foi: ${resultado[4]}

Gostaria de acrescentar também que, Bruno é um cara muito legal, e que eu recomendo ele para qualquer trabalho, ele merece essa vaga.`;
;
}

function Copia(){
  var copyText = document.getElementById("resultado2");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Apresentação copiada para sua area de transferencia");
}

function Limpa(){
  document.getElementById('apresentacao').style.display = 'none';
  document.getElementById('painel').checked = false;
  document.getElementById('segundo-painel').style.display = 'none';
  alert("Formulário limpo, obrigado por usar o formulário");
}

const handleSubmit = (event) => {
  resultado = Forms();
  event.preventDefault();
  alert('Formulário enviado com sucesso');

  fetch('https://api.sheetmonkey.io/form/jKo1g4cjViWVKkkVpVdriK',{
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({Nome: resultado[0], Idade: resultado[1], Data_Escolhida: resultado[2], Sexo: resultado[3], Texto: resultado[4]})
});
}

document.querySelector('form').addEventListener('submit', handleSubmit); 

