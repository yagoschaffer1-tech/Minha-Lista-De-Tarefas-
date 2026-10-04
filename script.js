// Pega os elementos do HTML

const inputTarefa = document.getElementById("inputTarefa");

const btnAdicionar = document.getElementById("btnAdicionar");

const listaTarefas = document.getElementById("listaTarefas");

const totalTarefas = document.getElementById("totalTarefas");

const tarefasConcluidas = document.getElementById("tarefasConcluidas");

const tarefasPendentes = document.getElementById("tarefasPendentes");

const mensagemVazia = document.getElementById("mensagemVazia");


// Carrega as tarefas salvas no navegador

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


// Quando clicar no botão adicionar

btnAdicionar.addEventListener("click", adicionarTarefa);


// Permite adicionar apertando ENTER

inputTarefa.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarTarefa();
    }

});


// FUNÇÃO PARA ADICIONAR TAREFA

function adicionarTarefa() {

    const texto = inputTarefa.value.trim();


    // Verifica se o campo está vazio

    if (texto === "") {

        alert("Digite uma tarefa!");

        return;
    }


    // Cria uma nova tarefa

    const novaTarefa = {

        id: Date.now(),

        texto: texto,

        concluida: false

    };


    // Adiciona a tarefa no array

    tarefas.push(novaTarefa);


    // Salva no navegador

    salvarTarefas();


    // Limpa o campo

    inputTarefa.value = "";


    // Atualiza a tela

    mostrarTarefas();

}


// FUNÇÃO PARA MOSTRAR AS TAREFAS

function mostrarTarefas() {

    // Limpa a lista

    listaTarefas.innerHTML = "";


    // Verifica se não existem tarefas

    if (tarefas.length === 0) {

        mensagemVazia.style.display = "block";

    } else {

        mensagemVazia.style.display = "none";
    }


    // Percorre todas as tarefas

    tarefas.forEach(function(tarefa) {

        const li = document.createElement("li");

        li.classList.add("tarefa");


        // Se estiver concluída

        if (tarefa.concluida) {

            li.classList.add("concluida");

        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = tarefa.concluida;


        // Quando marcar/desmarcar

        checkbox.addEventListener("change", function() {

            alternarTarefa(tarefa.id);

        });


        // Texto da tarefa

        const texto = document.createElement("span");

        texto.classList.add("texto-tarefa");

        texto.textContent = tarefa.texto;


        // Área dos botões

        const acoes = document.createElement("div");

        acoes.classList.add("acoes");


        // Botão editar

        const btnEditar = document.createElement("button");

        btnEditar.classList.add("btn-editar");

        btnEditar.textContent = "Editar";


        btnEditar.addEventListener("click", function() {

            editarTarefa(tarefa.id);

        });


        // Botão excluir

        const btnExcluir = document.createElement("button");

        btnExcluir.classList.add("btn-excluir");

        btnExcluir.textContent = "Excluir";


        btnExcluir.addEventListener("click", function() {

            excluirTarefa(tarefa.id);

        });


        // Monta os elementos

        acoes.appendChild(btnEditar);

        acoes.appendChild(btnExcluir);

        li.appendChild(checkbox);

        li.appendChild(texto);

        li.appendChild(acoes);

        listaTarefas.appendChild(li);

    });


    atualizarContadores();

}


// FUNÇÃO PARA EDITAR

function editarTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.id === id;

    });


    if (!tarefa) {
        return;
    }


    const novoTexto = prompt(
        "Digite o novo texto da tarefa:",
        tarefa.texto
    );


    // Se o usuário cancelar

    if (novoTexto === null) {
        return;
    }


    const textoLimpo = novoTexto.trim();


    if (textoLimpo === "") {

        alert("A tarefa não pode ficar vazia.");

        return;
    }


    // Atualiza o texto

    tarefa.texto = textoLimpo;


    salvarTarefas();

    mostrarTarefas();

}


// FUNÇÃO PARA EXCLUIR

function excluirTarefa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );


    if (!confirmar) {
        return;
    }


    // Remove a tarefa

    tarefas = tarefas.filter(function(tarefa) {

        return tarefa.id !== id;

    });


    salvarTarefas();

    mostrarTarefas();

}


// FUNÇÃO PARA CONCLUIR

function alternarTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.id === id;

    });


    if (!tarefa) {
        return;
    }


    // Inverte o estado

    tarefa.concluida = !tarefa.concluida;


    salvarTarefas();

    mostrarTarefas();

}


// FUNÇÃO PARA SALVAR

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}


// FUNÇÃO PARA ATUALIZAR CONTADORES

function atualizarContadores() {

    const total = tarefas.length;


    const concluidas = tarefas.filter(function(tarefa) {

        return tarefa.concluida === true;

    }).length;


    const pendentes = total - concluidas;


    totalTarefas.textContent = total;

    tarefasConcluidas.textContent = concluidas;

    tarefasPendentes.textContent = pendentes;

}


// Inicializa o aplicativo

mostrarTarefas();