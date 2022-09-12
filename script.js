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
         swal("Preencha todos os campos", "Preencha todos os campos para continuar", "error");
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

Gostaria de acrescentar também que, Bruno é um cara muito legal, e além de fazer o que foi pedido, entregou pensando na usabilidade futura do programa, o cadastro das informações do formulário numa planilha do excel, na qual com ajustes podem ser usados para RH, e controle de estoque.`;
;
document.getElementById('resultado2').innerHTML = `Olá me chamo ${resultado[0]}, tenho ${resultado[1]} anos, escolhi no formulário a data ${resultado[2]} e sou do sexo ${resultado[3]}.

O número de caracteres colocados na apresentação foi: ${resultado[4].length}
E o texto foi: ${resultado[4]}

Gostaria de acrescentar também que, Bruno é um cara muito legal, e além de fazer o que foi pedido, entregou pensando na usabilidade futura do programa, o cadastro das informações do formulário numa planilha do excel, na qual com ajustes podem ser usados para RH, e controle de estoque.`;
;
}

function Copia(){
  var copyText = document.getElementById("resultado2");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  swal("Texto copiado com sucesso!", "O texto foi copiado para a área de transferência", "success");
}

function Limpa(){
  swal({
    title: "Você tem certeza?",
    text: "Você não poderá recuperar os dados depois de limpar!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      document.getElementById('form').reset();
      document.getElementById('apresentacao').style.display = 'none';
      document.getElementById('painel').checked = false;
      document.getElementById('segundo-painel').style.display = 'none';
      swal("Os dados foram limpos com sucesso!", {
        icon: "success",
      });
    }
  });
  
}

const handleSubmit = (event) => {
  resultado = Forms();
  event.preventDefault();
  swal("Apresentação criada com sucesso, ".concat(resultado[0] + " !"), "Verifique sua apresentação", "success");

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

function VerPlanilha(){

  var senha = 123;

  swal("Digite a senha aqui:", {
    content: {
      element: "input",
      attributes: {
        placeholder: "Digite a senha aqui",
        type: "password",
      },
    },
  })
  .then((value) => {
    if (value == senha){
      window.open("https://docs.google.com/spreadsheets/d/1rlDxpcVVz6awwCSL52oX5DREyxBmwm3omr7cr26dMNw/edit?usp=sharing", '_blank').focus();
    }else{
      swal("Senha incorreta", "A senha está incorreta, tente novamente", "error");
    }
  });

}

