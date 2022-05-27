const btnCriar = document.getElementById('criar-tarefa');
const listaDeTarefas = document.getElementById('lista-tarefas');
const btnApagar = document.getElementById('apaga-tudo');
const btnApagarFeitos = document.getElementById('remover-finalizados');

// (5,6) Evento de clique no botao 'adicionar item' / Cria novo 'li' / checa se o valor do 'input' e diferente de '' / adiciona o valor do 'input' ao texto da 'li' / adiciona 'li' ao 'ul' / limpa valor do 'input'

btnCriar.addEventListener('click', () => {
  const input = document.getElementById('texto-tarefa');
  const newLi = document.createElement('li');
  if (input.value !== '') {
    newLi.innerText = input.value;
    listaDeTarefas.appendChild(newLi);
    input.value = '';
  }
});

// (7,8) evento de clique nos 'li'da lista / checa se a cor de fundo dos 'li' é cinza / muda a cor de fundo dos 'li' cinzas para branca / muda a cor de fundo do 'li' selecionado para cinza

listaDeTarefas.addEventListener('click', (event) => {
  const element = event.target;
  for (let index = 0; index < listaDeTarefas.children.length; index += 1) {
    if (listaDeTarefas.children[index].style.background === 'gray') {
      listaDeTarefas.children[index].style.background = 'white';
    }
  }
  element.style.background = 'gray';

  // tentativa de tirar a cor cinza caso o elemento ja tenha fundo cinza / nào funciona pois o for acima troca a cor de todos elementos para branco, fazendo com que a  condicao abaixo seja sempre falsa.
  // if (element.style.background === 'gray') {
  //   element.style.background = 'white';
  // } else {
  //   element.style.background = 'gray';
  // }
});

// (9) evento de clique duplo nos 'li'da lista / checa se o elemento já tem a classe 'completed'/ caso afirmativo remove a classe / caso negativo adiciona a classe

listaDeTarefas.addEventListener('dblclick', (event) => {
  const element = event.target;
  if (element.classList.contains('completed')) {
    element.classList.remove('completed');
  } else {
    element.classList.add('completed');
  }
});

// (10) evento de clique no botao com id apaga-tudo / ao ser clicado apaga todos os filhos da lista de tarefas

btnApagar.addEventListener('click', () => {
  listaDeTarefas.innerHTML = '';
});

// (11) evento de clique no botao com id apagar-feitos / 

btnApagarFeitos.addEventListener('click', () => {
  const listaDeTarefasLength = listaDeTarefas.children.length;
  console.log(listaDeTarefas.children);
  for (let index = 0; index < listaDeTarefasLength; index += 1) {
    const element = listaDeTarefas.children[index];
    if (element.classList.contains('completed')) {
      listaDeTarefas.removeChild(element);
    }
  }
});
