const lista = document.getElementById("lista");
const input = document.getElementById("tarefa");

// carrega tarefas salvas ao abrir o app
document.addEventListener("DOMContentLoaded", carregarTarefas);

function adicionarTarefa() {
    const texto = input.value.trim();
    if (texto === "") return;

    const tarefa = {
        texto: texto,
        concluida: false
    };

    criarElementoTarefa(tarefa);
    salvarTarefas();

    input.value = "";
}

function criarElementoTarefa(tarefa) {
    const item = document.createElement("li");
    if (tarefa.concluida) item.classList.add("done");

    item.innerHTML = `
        <span>${tarefa.texto}</span>
        <button>🗑️</button>
    `;

    item.querySelector("span").onclick = () => {
        item.classList.toggle("done");
        salvarTarefas();
    };

    item.querySelector("button").onclick = () => {
        item.remove();
        salvarTarefas();
    };

    lista.appendChild(item);
}

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll("li").forEach(item => {
        tarefas.push({
            texto: item.querySelector("span").innerText,
            concluida: item.classList.contains("done")
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const dados = localStorage.getItem("tarefas");
    if (!dados) return;

    const tarefas = JSON.parse(dados);
    tarefas.forEach(tarefa => criarElementoTarefa(tarefa));
}
