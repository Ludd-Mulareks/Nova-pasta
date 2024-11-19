document.addEventListener('DOMContentLoaded', function () {
    mostrarClientes();

    const form = document.getElementById('formCadastro');
    const btnSubmit = document.getElementById('btnSubmit');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const cliente = {
            id: form.dataset.editing || Date.now(),
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            cidade: document.getElementById('cidade').value.trim(),
            dataCadastro: form.dataset.editing ?
                buscarCliente(form.dataset.editing).dataCadastro :
                new Date().toLocaleDateString()
        };

        if (!validarFormulario(cliente)) return;

        salvarOuAtualizarCliente(cliente);
        form.reset();
        btnSubmit.textContent = 'Cadastrar';
        delete form.dataset.editing;
        mostrarClientes();
    });

    // Máscara para telefone
    document.getElementById('telefone').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }

        e.target.value = value;
    });

    // Pesquisa
    document.getElementById('pesquisa').addEventListener('input', function (e) {
        const termo = e.target.value.toLowerCase();
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        const clientesFiltrados = clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(termo) ||
            cliente.email.toLowerCase().includes(termo) ||
            cliente.cidade.toLowerCase().includes(termo)
        );

        mostrarClientes(clientesFiltrados);
    });
});

function validarFormulario(cliente) {
    if (cliente.nome.length < 3) {
        alert('O nome deve ter pelo menos 3 caracteres!');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cliente.email)) {
        alert('Email inválido!');
        return false;
    }

    const telefoneRegex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
    if (!telefoneRegex.test(cliente.telefone)) {
        alert('Telefone inválido! Use formato: (99) 99999-9999');
        return false;
    }

    return true;
}

function salvarOuAtualizarCliente(cliente) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    const index = clientes.findIndex(c => c.id == cliente.id);
    if (index !== -1) {
        clientes[index] = cliente;
        alert('Cliente atualizado com sucesso!');
    } else {
        clientes.push(cliente);
        alert('Cliente cadastrado com sucesso!');
    }

    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function buscarCliente(id) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    return clientes.find(c => c.id == id);
}

function editarCliente(id) {
    const cliente = buscarCliente(id);

    if (cliente) {
        document.getElementById('nome').value = cliente.nome;
        document.getElementById('email').value = cliente.email;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('cidade').value = cliente.cidade;

        const form = document.getElementById('formCadastro');
        form.dataset.editing = id;
        document.getElementById('btnSubmit').textContent = 'Atualizar';

        // Scroll suave até o formulário
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function excluirCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes = clientes.filter(cliente => cliente.id != id);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    mostrarClientes();
    alert('Cliente excluído com sucesso!');
}

function mostrarClientes(clientesFiltrados) {
    let clientes = clientesFiltrados || JSON.parse(localStorage.getItem('clientes')) || [];
    const listaClientes = document.getElementById('clientes');

    clientes.sort((a, b) => a.nome.localeCompare(b.nome));

    listaClientes.innerHTML = '';

    if (clientes.length === 0) {
        listaClientes.innerHTML = '<p style="text-align: center; color: #666;">Nenhum cliente cadastrado.</p>';
        return;
    }

    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.className = 'cliente-item';
        li.innerHTML = `
            <div class="cliente-info">
                <strong>${cliente.nome}</strong><br>
                Email: ${cliente.email}<br>
                Telefone: ${cliente.telefone}<br>
                Cidade: ${cliente.cidade}<br>
                <small>Cadastrado em: ${cliente.dataCadastro}</small>
            </div>
            <div class="botoes">
                <button onclick="editarCliente(${cliente.id})" class="editar">Editar</button>
                <button onclick="excluirCliente(${cliente.id})" class="excluir">Excluir</button>
            </div>
        `;
        listaClientes.appendChild(li);
    });
}