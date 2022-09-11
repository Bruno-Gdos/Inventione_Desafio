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

function Apresentar(){
  var resultado = [];
  var sexo = document.getElementsByName('sexo');
  console.log(sexo.length);

  for(i = 0; i < sexo.length; i++) {
    if(sexo[i].checked){
    var sexo = sexo[i];
    console.log(sexo);
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
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('resultado2').innerHTML = '';
  document.getElementById("texto").value = '';
  document.getElementById("nome").value = '';
  document.getElementById("idade").value = '';
  document.getElementById('sexo').checked = false;
  document.getElementById("data").value = '';
  document.getElementById('painel').checked = false;
  document.getElementById('segundo-painel').style.display = 'none';
  alert("Formulário limpo, obrigado por usar o formulário");
}

  

