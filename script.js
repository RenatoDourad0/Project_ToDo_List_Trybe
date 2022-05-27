const btnCriar = document.getElementById('criar-tarefa');
const listaDeTarefas = document.getElementById('lista-tarefas');
const btnApagar = document.getElementById('apaga-tudo');
const btnApagarFeitos = document.getElementById('remover-finalizados');
const btnSalvarTarefas = document.getElementById('salvar-tarefas');
const btnApagarSelecionado = document.getElementById('remover-selecionado');
const btnMoverParaCima = document.getElementById('mover-cima');
const btnMoverParaBaixo = document.getElementById('mover-baixo');

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

// (10) evento de clique no botao com id apaga-tudo / ao ser clicado apaga todos os filhos da lista de tarefas / limpa o localStorage

btnApagar.addEventListener('click', () => {
  listaDeTarefas.innerHTML = '';
  localStorage.clear();
});

// (11) evento de clique no botao com id apagar-feitos / percorre os filhos da 'ul' a partir do final / checa se contem a classe 'completed' / caso verdadeiro remove este filho / limpa o local storage e rearmazena os dados com base na nova disposicao da lista

btnApagarFeitos.addEventListener('click', () => {
  const listaDeTarefasLength = listaDeTarefas.childElementCount;
  for (let index = listaDeTarefasLength - 1; index >= 0; index -= 1) {
    const element = listaDeTarefas.children[index];
    if (element.classList.contains('completed')) {
      listaDeTarefas.removeChild(element);
    }
  }
  localStorage.clear();
  for (let index1 = 0; index1 < listaDeTarefas.childElementCount; index1 += 1) {
    const liContent = listaDeTarefas.children[index1].innerText;
    const info = {
      text: liContent,
      class: listaDeTarefas.children[index1].className,
      color: listaDeTarefas.children[index1].style.background,
    };
    const memory = JSON.stringify(info);
    localStorage.setItem(`${index1 + 1}`, `${memory}`);
  }
});

// (12) evento de click no botao com id salavar-tarefas / percorre os filhos da 'ul' e salva o conteudo de cada um no localstorage com a chave representando a posicao na lista / cria a funcao onload que gera uma nova lista no carregamento da pagina com o conteudo armazernado no local storage

btnSalvarTarefas.addEventListener('click', () => {
  for (let index = 0; index < listaDeTarefas.childElementCount; index += 1) {
    const liContent = listaDeTarefas.children[index].innerText;
    const info = {
      text: liContent,
      class: listaDeTarefas.children[index].className,
      color: listaDeTarefas.children[index].style.background,
    };
    const memory = JSON.stringify(info);
    localStorage.setItem(`${index + 1}`, `${memory}`);
  }
});

window.onload = () => {
  for (let index = 0; index < localStorage.length; index += 1) {
    const newLi = document.createElement('li');
    const info = localStorage.getItem(`${index + 1}`);
    const memory = JSON.parse(info);
    newLi.innerText = memory.text;
    newLi.className = memory.class;
    newLi.style.background = memory.color;
    listaDeTarefas.appendChild(newLi);
  }
};

// (13) dois eventos distintos de click nos botoes com id mover-cima e mover-baixo / percorre a ul e checa se o elemento em questao tem o background 'grey' e se nào é o primeiro ou ultimo da lista / caso verdadeiro salva as caracteristicas deste elemento no objeto 'info' e as caracteristicas do elemento que vai ser trocado no objeto info2 / troca de lugar a li com a imediatamente acima ou abaixo

// eslint-disable-next-line max-lines-per-function
function moveLiUp() {
  let info = {};
  let info2 = {};
  for (let index = 0; index < listaDeTarefas.childElementCount; index += 1) {
    if (listaDeTarefas.children[index].style.background === 'gray' && index !== 0) {
      info = {
        text: listaDeTarefas.children[index].innerText,
        class: listaDeTarefas.children[index].className,
        color: listaDeTarefas.children[index].style.background,
      };
      const placeHolder = listaDeTarefas.children[index - 1];
      info2 = {
        text: placeHolder.innerText,
        class: placeHolder.className,
        color: placeHolder.style.background,
      };
      listaDeTarefas.children[index - 1].innerText = info.text;
      listaDeTarefas.children[index - 1].className = info.class;
      listaDeTarefas.children[index - 1].style.background = info.color;
      listaDeTarefas.children[index].innerText = info2.text;
      listaDeTarefas.children[index].className = info2.class;
      listaDeTarefas.children[index].style.background = info2.color;
    }
  }
}

// eslint-disable-next-line max-lines-per-function
function moveLiDown() {
  let info = {};
  let info2 = {};
  for (let index = listaDeTarefas.childElementCount - 1; index >= 0; index -= 1) {
    if (listaDeTarefas.children[index].style.background === 'gray' && index !== listaDeTarefas.childElementCount - 1) {
      console.log('teste');
      info = {
        text: listaDeTarefas.children[index].innerText,
        class: listaDeTarefas.children[index].className,
        color: listaDeTarefas.children[index].style.background,
      };
      const placeHolder = listaDeTarefas.children[index + 1];
      console.log(placeHolder);
      info2 = {
        text: placeHolder.innerText,
        class: placeHolder.className,
        color: placeHolder.style.background,
      };
      listaDeTarefas.children[index + 1].innerText = info.text;
      listaDeTarefas.children[index + 1].className = info.class;
      listaDeTarefas.children[index + 1].style.background = info.color;
      listaDeTarefas.children[index].innerText = info2.text;
      listaDeTarefas.children[index].className = info2.class;
      listaDeTarefas.children[index].style.background = info2.color;
    }
  }
}

btnMoverParaCima.addEventListener('click', moveLiUp);
btnMoverParaBaixo.addEventListener('click', moveLiDown);

// (14) evento de click no botao com id apagar-selecionado / percorre os filhos da 'ul' a partir do final / checa se contem a cor de fundo cinza / caso verdadeiro remove este filho / limpa o local storage e rearmazena os dados com base na nova disposicao da lista

btnApagarSelecionado.addEventListener('click', () => {
  const listaDeTarefasLength = listaDeTarefas.childElementCount;
  for (let index = listaDeTarefasLength - 1; index >= 0; index -= 1) {
    const element = listaDeTarefas.children[index];
    if (element.style.background === 'gray') {
      listaDeTarefas.removeChild(element);
    }
  }
  localStorage.clear();
  for (let index1 = 0; index1 < listaDeTarefas.childElementCount; index1 += 1) {
    const liContent = listaDeTarefas.children[index1].innerText;
    const info = {
      text: liContent,
      class: listaDeTarefas.children[index1].className,
      color: listaDeTarefas.children[index1].style.background,
    };
    const memory = JSON.stringify(info);
    localStorage.setItem(`${index1 + 1}`, `${memory}`);
  }
});
