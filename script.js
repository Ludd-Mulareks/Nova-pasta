


    // Pega o formulário pelo ID
    const form = document.getElementById('meuFormulario');

    
    // Adiciona um evento de submit ao formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio automático
        
        // Pega o valor do campo
        const nome = document.getElementById('fname').value;
        
        // Verifica se o campo está vazio
        if(nome === '') {
            alert('Por favor, preencha o nome!');
            return;
        }
        
        // Se estiver tudo ok, envia o formulário
        form.submit();
    });
