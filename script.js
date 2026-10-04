// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const inputTarefa =
    document.getElementById("inputTarefa");

const btnAdicionar =
    document.getElementById("btnAdicionar");

const listaTarefas =
    document.getElementById("listaTarefas");

const mensagemVazia =
    document.getElementById("mensagemVazia");

const totalTarefas =
    document.getElementById("totalTarefas");

const tarefasConcluidas =
    document.getElementById("tarefasConcluidas");

const tarefasPendentes =
    document.getElementById("tarefasPendentes");

const porcentagemProgresso =
    document.getElementById("porcentagemProgresso");

const inputPesquisa =
    document.getElementById("inputPesquisa");

const formulario =
    document.getElementById("formularioTarefa");

const btnNovaTarefa =
    document.getElementById("btnNovaTarefa");

const btnAdicionarVazio =
    document.getElementById("btnAdicionarVazio");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnFecharFormulario =
    document.getElementById("btnFecharFormulario");

const btnTema =
    document.getElementById("btnTema");

const selectPrioridade =
    document.getElementById("selectPrioridade");

const selectCategoria =
    document.getElementById("selectCategoria");

const inputData =
    document.getElementById("inputData");

const notificacao =
    document.getElementById("notificacao");

const textoNotificacao =
    document.getElementById("textoNotificacao");

const iconeNotificacao =
    document.getElementById("iconeNotificacao");


// ==========================================
// CARREGAR TAREFAS
// ==========================================

let tarefas =
    JSON.parse(
        localStorage.getItem("tarefas")
    ) || [];


// ==========================================
// CORRIGIR TAREFAS ANTIGAS
// ==========================================

tarefas = tarefas.map(function (tarefa) {

    return {

        id: tarefa.id || Date.now(),

        texto: tarefa.texto || "",

        concluida:
            tarefa.concluida || false,

        prioridade:
            tarefa.prioridade || "media",

        categoria:
            tarefa.categoria || "Pessoal",

        data:
            tarefa.data || ""
    };
});


salvarTarefas();


// ==========================================
// FILTRO ATUAL
// ==========================================

let filtroAtual = "todas";


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarTema();

        definirDataMinima();

        mostrarTarefas();
    }
);


// ==========================================
// ABRIR FORMULÁRIO
// ==========================================

btnNovaTarefa.addEventListener(
    "click",
    abrirFormulario
);


btnAdicionarVazio.addEventListener(
    "click",
    abrirFormulario
);


function abrirFormulario() {

    formulario.classList.remove(
        "escondido"
    );

    inputTarefa.focus();
}


// ==========================================
// FECHAR FORMULÁRIO
// ==========================================

btnCancelar.addEventListener(
    "click",
    fecharFormulario
);


btnFecharFormulario.addEventListener(
    "click",
    fecharFormulario
);


function fecharFormulario() {

    formulario.classList.add(
        "escondido"
    );

    limparFormulario();
}


// ==========================================
// ADICIONAR TAREFA
// ==========================================

btnAdicionar.addEventListener(
    "click",
    adicionarTarefa
);


inputTarefa.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            adicionarTarefa();
        }
    }
);


function adicionarTarefa() {

    const texto =
        inputTarefa.value.trim();


    if (texto === "") {

        mostrarNotificacao(
            "Digite uma tarefa!",
            "!"
        );

        inputTarefa.focus();

        return;
    }


    const novaTarefa = {

        id: Date.now(),

        texto: texto,

        // NOVA TAREFA SEMPRE COMEÇA PENDENTE
        concluida: false,

        prioridade:
            selectPrioridade.value,

        categoria:
            selectCategoria.value,

        data:
            inputData.value || ""
    };


    tarefas.push(novaTarefa);


    salvarTarefas();


    limparFormulario();


    formulario.classList.add(
        "escondido"
    );


    mostrarTarefas();


    mostrarNotificacao(
        "Tarefa adicionada!",
        "✓"
    );
}


// ==========================================
// MOSTRAR TAREFAS
// ==========================================

function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    const pesquisa =
        inputPesquisa.value
            .toLowerCase()
            .trim();


    const tarefasFiltradas =
        tarefas.filter(function (tarefa) {


            const correspondePesquisa =
                tarefa.texto
                    .toLowerCase()
                    .includes(pesquisa);


            if (!correspondePesquisa) {

                return false;
            }


            if (
                filtroAtual ===
                "pendentes"
            ) {

                return !tarefa.concluida;
            }


            if (
                filtroAtual ===
                "concluidas"
            ) {

                return tarefa.concluida;
            }


            return true;
        });


    // ======================================
    // MENSAGEM QUANDO NÃO HÁ TAREFAS
    // ======================================

    if (
        tarefasFiltradas.length === 0
    ) {

        mensagemVazia.style.display =
            "block";

    } else {

        mensagemVazia.style.display =
            "none";
    }


    // ======================================
    // CRIAR CADA TAREFA
    // ======================================

    tarefasFiltradas.forEach(
        function (tarefa) {

            const li =
                document.createElement(
                    "li"
                );


            li.classList.add(
                "tarefa"
            );


            // SE CONCLUÍDA,
            // FICA VERDE
            if (tarefa.concluida) {

                li.classList.add(
                    "concluida"
                );
            }


            // =================================
            // CHECKBOX
            // =================================

            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.classList.add(
                "checkbox"
            );


            checkbox.checked =
                tarefa.concluida;


            checkbox.addEventListener(
                "change",
                function () {

                    alternarTarefa(
                        tarefa.id
                    );
                }
            );


            // =================================
            // CONTEÚDO
            // =================================

            const conteudo =
                document.createElement(
                    "div"
                );


            conteudo.classList.add(
                "conteudo-tarefa"
            );


            const texto =
                document.createElement(
                    "span"
                );


            texto.classList.add(
                "texto-tarefa"
            );


            texto.textContent =
                tarefa.texto;


            // =================================
            // INFORMAÇÕES
            // =================================

            const meta =
                document.createElement(
                    "div"
                );


            meta.classList.add(
                "meta-tarefa"
            );


            // PRIORIDADE

            const prioridade =
                document.createElement(
                    "span"
                );


            prioridade.classList.add(
                "tag",
                tarefa.prioridade
            );


            prioridade.textContent =
                obterNomePrioridade(
                    tarefa.prioridade
                );


            meta.appendChild(
                prioridade
            );


            // CATEGORIA

            const categoria =
                document.createElement(
                    "span"
                );


            categoria.classList.add(
                "tag"
            );


            categoria.textContent =
                "📁 " +
                tarefa.categoria;


            meta.appendChild(
                categoria
            );


            // DATA

            if (tarefa.data) {

                const data =
                    document.createElement(
                        "span"
                    );


                data.classList.add(
                    "tag",
                    "data"
                );


                data.textContent =
                    "📅 " +
                    formatarData(
                        tarefa.data
                    );


                meta.appendChild(
                    data
                );
            }


            conteudo.appendChild(
                texto
            );


            conteudo.appendChild(
                meta
            );


            // =================================
            // BOTÕES
            // =================================

            const acoes =
                document.createElement(
                    "div"
                );


            acoes.classList.add(
                "acoes"
            );


            // BOTÃO EDITAR

            const btnEditar =
                document.createElement(
                    "button"
                );


            btnEditar.classList.add(
                "btn-acao",
                "btn-editar"
            );


            btnEditar.textContent =
                "✏️";


            btnEditar.title =
                "Editar tarefa";


            btnEditar.addEventListener(
                "click",
                function () {

                    editarTarefa(
                        tarefa.id
                    );
                }
            );


            // BOTÃO EXCLUIR

            const btnExcluir =
                document.createElement(
                    "button"
                );


            btnExcluir.classList.add(
                "btn-acao",
                "btn-excluir"
            );


            btnExcluir.textContent =
                "🗑️";


            btnExcluir.title =
                "Excluir tarefa";


            btnExcluir.addEventListener(
                "click",
                function () {

                    excluirTarefa(
                        tarefa.id
                    );
                }
            );


            acoes.appendChild(
                btnEditar
            );


            acoes.appendChild(
                btnExcluir
            );


            // =================================
            // MONTAR TAREFA
            // =================================

            li.appendChild(
                checkbox
            );


            li.appendChild(
                conteudo
            );


            li.appendChild(
                acoes
            );


            listaTarefas.appendChild(
                li
            );
        }
    );


    atualizarContadores();
}


// ==========================================
// EDITAR TAREFA
// ==========================================

function editarTarefa(id) {

    const tarefa =
        tarefas.find(
            function (tarefa) {

                return tarefa.id === id;
            }
        );


    if (!tarefa) {

        return;
    }


    const novoTexto =
        prompt(
            "Digite o novo texto:",
            tarefa.texto
        );


    if (novoTexto === null) {

        return;
    }


    const textoLimpo =
        novoTexto.trim();


    if (textoLimpo === "") {

        mostrarNotificacao(
            "A tarefa não pode ficar vazia!",
            "!"
        );

        return;
    }


    tarefa.texto =
        textoLimpo;


    salvarTarefas();


    mostrarTarefas();


    mostrarNotificacao(
        "Tarefa atualizada!",
        "✓"
    );
}


// ==========================================
// EXCLUIR TAREFA
// ==========================================

function excluirTarefa(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta tarefa?"
        );


    if (!confirmar) {

        return;
    }


    tarefas =
        tarefas.filter(
            function (tarefa) {

                return tarefa.id !== id;
            }
        );


    salvarTarefas();


    mostrarTarefas();


    mostrarNotificacao(
        "Tarefa excluída!",
        "🗑️"
    );
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function alternarTarefa(id) {

    const tarefa =
        tarefas.find(
            function (tarefa) {

                return tarefa.id === id;
            }
        );


    if (!tarefa) {

        return;
    }


    tarefa.concluida =
        !tarefa.concluida;


    salvarTarefas();


    mostrarTarefas();


    if (tarefa.concluida) {

        mostrarNotificacao(
            "Tarefa concluída! 🎉",
            "✓"
        );

    } else {

        mostrarNotificacao(
            "Tarefa voltou para pendente.",
            "!"
        );
    }
}


// ==========================================
// CONTADORES
// ==========================================

function atualizarContadores() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            function (tarefa) {

                return tarefa.concluida;
            }
        ).length;


    const pendentes =
        total - concluidas;


    let progresso = 0;


    if (total > 0) {

        progresso =
            Math.round(
                (concluidas / total) * 100
            );
    }


    totalTarefas.textContent =
        total;


    tarefasConcluidas.textContent =
        concluidas;


    tarefasPendentes.textContent =
        pendentes;


    porcentagemProgresso.textContent =
        progresso + "%";
}


// ==========================================
// SALVAR
// ==========================================

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


// ==========================================
// PESQUISA
// ==========================================

inputPesquisa.addEventListener(
    "input",
    mostrarTarefas
);


// ==========================================
// FILTROS
// ==========================================

const botoesFiltro =
    document.querySelectorAll(
        ".filtro"
    );


botoesFiltro.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {


                botoesFiltro.forEach(
                    function (item) {

                        item.classList.remove(
                            "ativo"
                        );
                    }
                );


                botao.classList.add(
                    "ativo"
                );


                filtroAtual =
                    botao.dataset.filtro;


                mostrarTarefas();
            }
        );
    }
);


// ==========================================
// TEMA
// ==========================================

btnTema.addEventListener(
    "click",
    alternarTema
);


function alternarTema() {

    document.body.classList.toggle(
        "dark"
    );


    const modoEscuro =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "tema",
        modoEscuro
            ? "dark"
            : "light"
    );


    btnTema.textContent =
        modoEscuro
            ? "☀️"
            : "🌙";
}


// ==========================================
// CARREGAR TEMA
// ==========================================

function carregarTema() {

    const tema =
        localStorage.getItem(
            "tema"
        );


    if (tema === "dark") {

        document.body.classList.add(
            "dark"
        );


        btnTema.textContent =
            "☀️";
    }
}


// ==========================================
// NOTIFICAÇÕES
// ==========================================

let tempoNotificacao;


function mostrarNotificacao(
    mensagem,
    icone
) {

    textoNotificacao.textContent =
        mensagem;


    iconeNotificacao.textContent =
        icone;


    notificacao.classList.add(
        "mostrar"
    );


    clearTimeout(
        tempoNotificacao
    );


    tempoNotificacao =
        setTimeout(
            function () {

                notificacao.classList.remove(
                    "mostrar"
                );

            },
            2500
        );
}


// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    inputTarefa.value = "";

    selectPrioridade.value =
        "media";

    selectCategoria.value =
        "Pessoal";

    inputData.value = "";
}


// ==========================================
// DATA MÍNIMA
// ==========================================

function definirDataMinima() {

    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            hoje.getDate()
        ).padStart(
            2,
            "0"
        );


    inputData.min =
        `${ano}-${mes}-${dia}`;
}


// ==========================================
// FORMATAR DATA
// ==========================================

function formatarData(data) {

    const partes =
        data.split("-");


    if (partes.length !== 3) {

        return data;
    }


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}


// ==========================================
// NOME DA PRIORIDADE
// ==========================================

function obterNomePrioridade(
    prioridade
) {

    if (
        prioridade === "alta"
    ) {

        return "🔴 Alta";
    }


    if (
        prioridade === "media"
    ) {

        return "🟡 Média";
    }


    return "🟢 Baixa";
}