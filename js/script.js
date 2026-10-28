/*
  Portfólio de Paulo Guilherme.
  Uso de IA: ChatGPT, para ajudar a estruturar e explicar o HTML, CSS e JavaScript.
  Revise o código e entenda cada função antes da defesa individual.
*/

const botaoMenu = document.getElementById("botaoMenu");
const menuNavegacao = document.getElementById("menuNavegacao");
const botaoTema = document.getElementById("botaoTema");
const saudacao = document.getElementById("saudacao");
const formularioContato = document.getElementById("formularioContato");
const mensagemFormulario = document.getElementById("mensagemFormulario");

// Retorna uma saudação conforme a hora informada (0 a 23).
function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return "Bom dia!";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde!";
  } else {
    return "Boa noite!";
  }
}

// Atualiza o texto de saudação usando a hora atual do dispositivo.
function atualizarSaudacao() {
  const horaAtual = new Date().getHours();
  saudacao.textContent = obterSaudacao(horaAtual);
}

// Abre ou fecha o menu de navegação e atualiza o estado acessível.
function alternarMenu() {
  const menuEstaAberto = menuNavegacao.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
  botaoMenu.setAttribute(
    "aria-label",
    menuEstaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
  );
}

// Fecha o menu móvel quando uma seção é escolhida.
function fecharMenuAoNavegar(evento) {
  if (evento.target.closest("a") && window.innerWidth < 768) {
    menuNavegacao.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
  }
}

// Alterna o tema visual entre claro e escuro.
function alternarTema() {
  const modoClaroAtivo = document.body.classList.toggle("modo-claro");
  botaoTema.textContent = modoClaroAtivo ? "☾" : "☼";
  botaoTema.setAttribute(
    "aria-label",
    modoClaroAtivo ? "Ativar modo escuro" : "Ativar modo claro"
  );
}

// Mostra ou limpa uma mensagem de erro ligada a um campo.
function mostrarErro(idCampo, idErro, textoErro) {
  const campo = document.getElementById(idCampo);
  const areaErro = document.getElementById(idErro);
  areaErro.textContent = textoErro;
  if (campo) {
    campo.setAttribute("aria-invalid", textoErro ? "true" : "false");
  }
}

// Valida os campos do formulário e retorna true somente se todos forem válidos.
function validarFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const consentimento = document.getElementById("consentimento").checked;
  let formularioValido = true;

  mostrarErro("nome", "erroNome", "");
  mostrarErro("email", "erroEmail", "");
  mostrarErro("mensagem", "erroMensagem", "");
  document.getElementById("erroConsentimento").textContent = "";

  if (!nome) {
    mostrarErro("nome", "erroNome", "Preencha seu nome.");
    formularioValido = false;
  }

  if (!email) {
    mostrarErro("email", "erroEmail", "Preencha seu e-mail.");
    formularioValido = false;
  } else if (!email.includes("@") || !email.includes(".") || email.startsWith("@") || email.endsWith(".")) {
    mostrarErro("email", "erroEmail", "Digite um e-mail válido.");
    formularioValido = false;
  }

  if (!mensagem) {
    mostrarErro("mensagem", "erroMensagem", "Escreva uma mensagem.");
    formularioValido = false;
  } else if (mensagem.length < 20) {
    mostrarErro("mensagem", "erroMensagem", "A mensagem precisa ter pelo menos 20 caracteres.");
    formularioValido = false;
  }

  if (!consentimento) {
    document.getElementById("erroConsentimento").textContent =
      "Marque o consentimento para continuar.";
    formularioValido = false;
  }

  return formularioValido;
}

// Confere o formulário sem enviar dados para um servidor.
function processarFormulario(evento) {
  evento.preventDefault();
  mensagemFormulario.className = "mensagem-formulario";
  mensagemFormulario.textContent = "";

  if (validarFormulario()) {
    mensagemFormulario.textContent =
      "Tudo certo! A validação foi concluída. Esta demonstração não enviou seus dados.";
    mensagemFormulario.classList.add("sucesso");
    formularioContato.reset();
    ["nome", "email", "mensagem"].forEach((idCampo) => {
      document.getElementById(idCampo).removeAttribute("aria-invalid");
    });
  } else {
    mensagemFormulario.textContent = "Confira os campos destacados e tente novamente.";
    mensagemFormulario.classList.add("falha");
    const primeiroCampoComErro = formularioContato.querySelector('[aria-invalid="true"]');
    if (primeiroCampoComErro) {
      primeiroCampoComErro.focus();
    }
  }
}

// Insere automaticamente o ano atual no rodapé.
function atualizarAno() {
  document.getElementById("anoAtual").textContent = new Date().getFullYear();
}

botaoMenu.addEventListener("click", alternarMenu);
menuNavegacao.addEventListener("click", fecharMenuAoNavegar);
botaoTema.addEventListener("click", alternarTema);
formularioContato.addEventListener("submit", processarFormulario);

atualizarSaudacao();
atualizarAno();
