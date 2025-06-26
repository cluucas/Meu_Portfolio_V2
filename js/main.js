document.addEventListener('DOMContentLoaded', () => {

    const botaoNavegacaoMovel = document.getElementById('mobile-nav-toggle');
    const menuMovel = document.getElementById('mobile-menu');

    if (botaoNavegacaoMovel && menuMovel) {
        botaoNavegacaoMovel.addEventListener('click', () => {
            menuMovel.classList.toggle('active');
        });
    }

    const caixaLuz = document.getElementById('lightbox-overlay');
    const imagemCaixaLuz = document.getElementById('lightbox-image');
    const fecharCaixaLuz = document.getElementById('lightbox-close');

    if (caixaLuz && imagemCaixaLuz && fecharCaixaLuz) {
        document.querySelectorAll('.gallery-card img').forEach(imagem => {
            imagem.addEventListener('click', () => {
                const caminhoCompleto = imagem.getAttribute('data-full-src');
                if (caminhoCompleto) {
                    imagemCaixaLuz.setAttribute('src', caminhoCompleto);
                    caixaLuz.classList.remove('hidden');
                    caixaLuz.classList.add('flex');
                }
            });
        });
        
        const fecharCaixaLuzFuncao = () => {
            caixaLuz.classList.add('hidden');
            caixaLuz.classList.remove('flex');
        };
    
        fecharCaixaLuz.addEventListener('click', fecharCaixaLuzFuncao);
        caixaLuz.addEventListener('click', evento => {
            if (evento.target === caixaLuz) fecharCaixaLuzFuncao();
        });
    }

    // Validação e envio do formulário de contato
    const formularioDeContato = document.getElementById('contact-form');
    
    if (formularioDeContato) {
        const botaoEnviar = document.getElementById('submit-button');
        const statusFormulario = document.getElementById('form-status');

        // TODO: Substitua com as suas credenciais do EmailJS
        const publicKey = 'zzDUmDcmpaADEDfkb';
        const serviceID = 'service_q19pmbe';
        const templateID = 'template_yluictx';

        (function(){
            emailjs.init(publicKey);
        })();

        formularioDeContato.addEventListener('submit', function(evento) {
            evento.preventDefault();
            
            let formularioValido = validarFormulario();
            
            if (formularioValido) {
                botaoEnviar.innerText = 'Enviando...';
                botaoEnviar.disabled = true;

                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        statusFormulario.innerText = 'Mensagem enviada com sucesso!';
                        statusFormulario.classList.add('success');
                        statusFormulario.classList.remove('error');
                        formularioDeContato.reset();
                    }, (err) => {
                        statusFormulario.innerText = `Erro ao enviar: ${JSON.stringify(err)}`;
                        statusFormulario.classList.add('error');
                        statusFormulario.classList.remove('success');
                    }).finally(() => {
                        botaoEnviar.innerText = 'Enviar Mensagem';
                        botaoEnviar.disabled = false;
                        setTimeout(() => statusFormulario.innerText = '', 5000);
                    });
            }
        });

        function validarFormulario() {
            let eValido = true;
            const campoNome = document.getElementById('name');
            const campoEmail = document.getElementById('email');
            const campoMensagem = document.getElementById('message');

            if (campoNome.value.trim() === '') {
                mostrarErro(campoNome, 'O campo Nome é obrigatório.');
                eValido = false;
            } else {
                limparErro(campoNome);
            }

            if (campoEmail.value.trim() === '') {
                mostrarErro(campoEmail, 'O campo Email é obrigatório.');
                eValido = false;
            } else if (!emailEValido(campoEmail.value)) {
                mostrarErro(campoEmail, 'Por favor, insira um email válido.');
                eValido = false;
            } else {
                limparErro(campoEmail);
            }

            if (campoMensagem.value.trim() === '') {
                mostrarErro(campoMensagem, 'O campo Mensagem é obrigatório.');
                eValido = false;
            } else {
                limparErro(campoMensagem);
            }
            return eValido;
        }

        function mostrarErro(input, mensagem) {
            const grupoDoFormulario = input.parentElement;
            const elementoDeErro = grupoDoFormulario.querySelector('.error-message');
            elementoDeErro.innerText = mensagem;
            input.classList.add('invalid');
        }

        function limparErro(input) {
            const grupoDoFormulario = input.parentElement;
            const elementoDeErro = grupoDoFormulario.querySelector('.error-message');
            elementoDeErro.innerText = '';
            input.classList.remove('invalid');
        }

        function emailEValido(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    }
});
