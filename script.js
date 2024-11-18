


    // // Pega o formulário pelo ID
    // const form = document.getElementById('meuFormulario');

    
    // // Adiciona um evento de submit ao formulário
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault(); // Impede o envio automático
        
    //     // Pega o valor do campo
    //     const nome = document.getElementById('fname').value;
        
    //     // Verifica se o campo está vazio
    //     if(nome === '') {
    //         alert('Por favor, preencha o nome!');
    //         return;
    //     }
        
    //     // Se estiver tudo ok, envia o formulário
    //     form.submit();
    // });


    document.getElementById('meuFormulario').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('fname').value;
        const sobrenome = document.getElementById('lname').value;
        
        if(nome === '' || sobrenome === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Você pode fazer algo com os dados aqui, como:
        console.log('Nome:', nome, 'Sobrenome:', sobrenome);
    });