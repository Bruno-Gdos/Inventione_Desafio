// Seus scripts aqui



// Script para contar os caracteres do text area.
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

// Script para após clicar no checkbox exibir o segundo painel.
function Checkbox() {
  document.getElementById('segundo-painel').style.display = 'none';

  if (document.getElementById('painel').checked) {
    document.getElementById('segundo-painel').style.display = 'block';
  } else {
    document.getElementById('segundo-painel').style.display = 'none';

  }
}

// Script para formatar a data.
function formataData(data){
  var data = data.split("-");
  var data = new Date(data);
  dia = (data.getDate()).toString().padStart(2, '0'),
  mes = (data.getMonth()+1).toString().padStart(2, '0'),
  ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;

}

// Script para validar o forms no qual verifica se algum resultado está vazio, além de outros parametros.
const valida = () =>{

  var resultado = Forms();

  if (resultado[0] == "" || resultado[1] == "" || resultado[2] == "" || resultado[3] == "" || resultado[4] == ""){
    swal("Preencha todos os campos", "Preencha todos os campos para continuar", "error");
    
    return;
}
  if (resultado[1] <= 0)
  {
    swal("Idade inválida", "A idade deve ser maior que 0", "error");
    return;
  }
  if (resultado[1] > 150)
  {
    swal("Idade inválida", "A idade deve ser menor que 150", "error");
    return;
  }

  if (resultado[2]){
    var data = resultado[2].split("/");
    var data = new Date(data[2], data[1] - 1, data[0]);
    var dataAtual = new Date();
    var dataAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
    var dataMinima = new Date(1900,01,01);

    if (data < dataMinima){
      swal("Data inválida", "A data deve ser maior que 01/01/1900", "error");
      return;
    }
    if (data > dataAtual){
      swal("Data inválida", "A data deve ser menor que a data atual", "error");
      return;
    }
  }

  if (resultado[0]){
    var nome = resultado[0];
    if (nome.length > 50){
      swal("Nome inválido", "O nome deve ter no máximo 50 caracteres", "error");
      return;
    }if (nome.length < 3){
      swal("Nome inválido", "O nome deve ter no mínimo 3 caracteres", "error");
      return;
    }if (nome.includes("0") || nome.includes("1") || nome.includes("2") || nome.includes("3") ||
     nome.includes("4") || nome.includes("5") || nome.includes("6") || nome.includes("7") || 
     nome.includes("8") || nome.includes("9")){
      swal("Nome inválido", "O nome não pode conter números", "error");
      return;
    }
  }

  if (ContarPalavras()<1){
    swal("Texto inválido", "O texto deve ter no mínimo 1 palavra", "error");
    return;
  }

  Apresentar();
  handleSubmit();

  }

// Script para pegar todas as informações do forms, separar e retornar em um array.
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
          
        }
        var texto = input[indice].value;
        resultado.push(texto);
      }
    }
    return resultado;
}

// Script para exibição da apresentação, além de fazer uso das funções de validação e de pegar os dados do forms.
function Apresentar(){



var resultado = Forms();

document.getElementById('apresentacao').style.display = 'block';


document.getElementById('resultado').innerHTML = `Olá me chamo ${resultado[0]}, tenho ${resultado[1]} anos, escolhi no formulário a data ${resultado[2]} e sou do sexo ${resultado[3]}.

O número de caracteres colocados na apresentação foi: ${resultado[4].length}
O número de palavras colocadas na apresentação foi: ${ContarPalavras()}

E o texto foi: ${resultado[4]}

Gostaria de acrescentar também que, Bruno é um cara muito legal, e além de fazer o que foi pedido, entregou pensando na usabilidade futura do programa, o cadastro das informações do formulário numa planilha do excel, na qual com ajustes podem ser usados para RH, e controle de estoque.`;
;
document.getElementById('resultado2').innerHTML = `Olá me chamo ${resultado[0]}, tenho ${resultado[1]} anos, escolhi no formulário a data ${resultado[2]} e sou do sexo ${resultado[3]}.

O número de caracteres colocados na apresentação foi: ${resultado[4].length}
O número de palavras colocadas na apresentação foi: ${ContarPalavras()}

E o texto foi: ${resultado[4]}

Gostaria de acrescentar também que, Bruno é um cara muito legal, e além de fazer o que foi pedido, entregou pensando na usabilidade futura do programa, o cadastro das informações do formulário numa planilha do excel, na qual com ajustes podem ser usados para RH, e controle de estoque.`;
;
}

// Script para o botão de copiar.
function Copia(){
  var copyText = document.getElementById("resultado2");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  swal("Texto copiado com sucesso!", "O texto foi copiado para a área de transferência", "success");
}

// Script para o botão de limpar.
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

// Script para assim que realizar o submit do forms, ele não atualizar a página e envia para o Excel.
const handleSubmit = () => {
  resultado = Forms();
  swal("Apresentação criada com sucesso, ".concat(resultado[0] + " !"), "Verifique sua apresentação", "success");

  fetch('https://api.sheetmonkey.io/form/jKo1g4cjViWVKkkVpVdriK',{
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({Nome: resultado[0], 
      Idade: resultado[1], 
      Data_Escolhida: resultado[2], 
      Sexo: resultado[3], 
      Texto: resultado[4],
      Palavras_no_Texto: ContarPalavras()})
});
}

// Script para ver a planilha no Excel, além de solicitar uma senha para acesso do mesmo.
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


// Scipt para contar palavras
function ContarPalavras() {
 
  // Get the input text value
  var palavras = document.getElementById("texto").value;

  // Initialize the word counter
  var count = 0;

  // Split the words on each
  // space character
  var split = palavras.split(' ');

  // Loop through the words and
  // increase the counter when
  // each split word is not empty
  for (var i = 0; i < split.length; i++) {
      if(split[i] == "a" || split[i] == "e" || split[i] == "i" || split[i] == "o" || split[i] == "u" || split[i] == " "
      || split[i] == "A" || split[i] == "E" || split[i] == "I" || split[i] == "O" || split[i] == "U" || split[i] == "0" 
      || split[i] == "1" || split[i] == "2" || split[i] == "3" || split[i] == "4" || split[i] == "5" || split[i] == "6"
      || split[i] == "7" || split[i] == "8" || split[i] == "9" || split[i] == "@" || split[i] == "#" || split[i] == "$"
      || split[i] == "%" || split[i] == "&" || split[i] == "*" || split[i] == "(" || split[i] == ")" || split[i] == "-"
      || split[i] == "_" || split[i] == "+" || split[i] == "=" || split[i] == "{" || split[i] == "}" || split[i] == "["
      || split[i] == "]" || split[i] == ":" || split[i] == ";" || split[i] == "," || split[i] == "." || split[i] == "<"
      || split[i] == ">" || split[i] == "?" || split[i] == "/" || split[i] == "|" || split[i] == "!" || split[i] == "~"
      || split[i] == "`" || split[i] == "^" || split[i] == "´" || split[i] == "¨" || split[i] == "ª" || split[i] == "º"
      || split[i] == "" || split[i] == " " || split[i] == "  " || split[i] == "   " || split[i] == "    " || split[i] == "     "){
        continue;
      }else{
        if (split[i].includes("a") || split[i].includes("e") || split[i].includes("i") || split[i].includes("o")
         || split[i].includes("u")){
        count++;
        }}
  }

  console.log(count);

  // // Display it as output
   document.getElementById("cont2")
       .innerHTML = count;
   
       return count;
}

