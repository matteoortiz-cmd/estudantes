let alunos = [];

const listaAlunos = document.getElementById("listaAlunos");
const status = document.getElementById("status");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const btnReprovado = document.getElementById("btnReprovado");
const btnAprovado = document.getElementById("btnAprovado");

async function carregarAlunos() {

    try {

        status.textContent = "Carregando alunos...";

        const resposta = await fetch('alunos.json');

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o JSON.");
        }

        alunos = await resposta.json();

        mostrarAlunos(alunos);

        status.textContent = `${alunos.length} aluno(s) carregado(s).`;

    } catch (erro) {

        status.textContent = `Erro: ${erro.message}`;

    }
}

function mostrarAlunos(lista) {

    listaAlunos.innerHTML = "";
if (lista.length === 0) {
        listaAlunos.innerHTML = "<p>Nenhum aluno encontrado.</p>";
        return;
    }

    lista.forEach((aluno) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h2>${aluno.nome}</h2>
            <p><strong>Idade:</strong> ${aluno.idade}</p>
            <p><strong>id:</strong> ${aluno.id}</p>
            <p><strong>Curso:</strong> ${aluno.curso}</p>
        `;
    listaAlunos.appendChild(card);
});
}

btnBuscar.addEventListener("click", () => {
    status.textContent = `${alunos.length} alunos carregados.`;
    mostrarAlunos(alunos);
});

function mostrarTodos() {
    mostrarAlunos(alunos);
    status.textContent = `${alunos.length} alunos carregados.`;
}
function mostraraprovados() {
    const aprovados = alunos.filter(aluno => aluno.nota >= 6);
    mostrarAlunos(aprovados);
    status.textContent = `${aprovados.length} aluno(s) aprovado(s).`;
}
function mostrarreprovados() {
    const reprovados = alunos.filter(aluno => aluno.nota < 6);
    mostrarAlunos(reprovados);
    status.textContent = `${reprovados.length} aluno(s) reprovado(s).`;
}
btnTodos.addEventListener("click", carregarAlunos);
 btnAprovado.addEventListener("click", mostraraprovados);
 btnReprovado.addEventListener("click", mostrarreprovados);



carregarAlunos();