document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const caixaLuz = document.getElementById('lightbox-overlay');
    const imagemCaixaLuz = document.getElementById('lightbox-image');
    const fecharCaixaLuz = document.getElementById('lightbox-close');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const translations = {
        en: {

            nav_home: "Home",
            nav_about: "About",
            nav_projects: "Projects",
            nav_certificates: "Certificates",
            nav_contact: "Contact",

            // menu hamburguer
            nav_home_mobile: "Home",
            nav_about_mobile: "About",
            nav_projects_mobile: "Projects",
            nav_certificates_mobile: "Certificates",
            nav_contact_mobile: "Contact",

            // index.html
            home_title: "Hello, I'm Caio Lucas",
            home_subtitle: "Software Engineering student and future AI Engineer, passionate about innovation, research, and teamwork.",
            home_resume_button: "My Resume",
            // sobre.html
            about_title: "About Me",
            about_bio: "I'm a Software Engineering student, passionate about AI and Machine Learning.<br><br>My career goal is to become a complete specialist in the field and work as an AI Engineer.",
            about_skills_title: "My Skills",
            // projetos.html
            projects_title: "Projects",
            project_1_title: "Technical Support Manual",
            project_1_desc: "A manual for remote support, developed during my time as a Help Desk Analyst.",
            project_1_link_text: "View on Notion &rarr;",
            // certificados.html
            certificates_title: "Certificates",
            certificate_1_title: "Machine Learning Specialization",
            certificate_1_issuer: "Issued by: Stanford University Online",
            certificate_1_link_text: "View Credential &rarr;",
            // contato.html
            contact_title: "Let's Talk",
            contact_subtitle: "Send me a message!",
            form_name: "Name:",
            form_email: "Email:",
            form_message: "Message:",
            form_submit: "Send Message",
        },
        pt: {
            nav_home: "Início",
            nav_about: "Sobre",
            nav_projects: "Projetos",
            nav_certificates: "Certificados",
            nav_contact: "Contato",
            // index.html
            home_title: "Olá, me chamo Caio Lucas",
            home_subtitle: "Estudante de Engenharia de Software e futuro Engenheiro de IA, apaixonado por inovação, pesquisa e trabalho em equipe.",
            home_resume_button: "Meu currículo",
            // sobre.html
            about_title: "Sobre Mim",
            about_bio: "Sou estudante de Engenharia de Software, apaixonado por IA e Machine Learning.<br><br>Tenho como objetivo de carreira me tornar especialista completo na área e atuar como Engenheiro de IA.",
            about_skills_title: "Minhas Competências",
            // projetos.html
            projects_title: "Projetos",
            project_1_title: "Manual Suporte Técnico",
            project_1_desc: "Um manual para atendimento remoto, desenvolvido durante minha passagem como Analista de Help Desk.",
            project_1_link_text: "Ver no Notion &rarr;",
            // certificados.html
            certificates_title: "Certificados",
            certificate_1_title: "Machine Learning Specialization",
            certificate_1_issuer: "Emitido por: Stanford University Online",
            certificate_1_link_text: "Ver Credencial &rarr;",
             // contato.html
            contact_title: "Vamos Conversar",
            contact_subtitle: "Me envie uma mensagem!",
            form_name: "Nome:",
            form_email: "Email:",
            form_message: "Mensagem:",
            form_submit: "Enviar Mensagem",
        }
    };

    const dynamicLinks = {
        en: {
            "resume-link": "https://docs.google.com/document/d/1rTbN4LTked4fYLyGIbzymIZviJ2rVjiO4hmURS3V9Dg/edit?usp=sharing",
            "project_1_link": "https://luxuriant-fang-e29.notion.site/Manual-Techinal-Support-en-us-15ec530d701580a792b8fe28d029f218",
            "certificate_1_link": "https://www.coursera.org/account/accomplishments/specialization/NBX78AK2D860",
        },
        pt: {
            "resume-link": "https://docs.google.com/document/d/1t575zWSOU7f7c_BPuiVhS4FmsZTKHp6CdD2hNnaGF-0/edit?usp=sharing",
            "project_1_link": "https://luxuriant-fang-e29.notion.site/Manual-Suporte-T-cnico-pt-br-15ec530d7015800a8200d35beefef2d0?source=copy_link",
            "certificate_1_link": "https://www.coursera.org/account/accomplishments/specialization/NBX78AK2D860",
        }
    };

    const langButtons = document.querySelectorAll('[data-lang-switch]');

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        for (const id in dynamicLinks[lang]) {
            const element = document.getElementById(id);
            if (element) {
                element.href = dynamicLinks[lang][id];
            }
        }

        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang-switch') === lang) {
                btn.classList.add('active');
            }
        });

        localStorage.setItem('language', lang);
    };

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-lang-switch');
            setLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('language') || 'pt';
    setLanguage(savedLang);


    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }


    if (caixaLuz && imagemCaixaLuz && fecharCaixaLuz) {
        document.querySelectorAll('.gallery-card img').forEach(imagem => {
            imagem.addEventListener('click', () => {
                const caminhoCompleto = imagem.getAttribute('data-full-src');
                if (caminhoCompleto) {
                    imagemCaixaLuz.setAttribute('src', caminhoCompleto);
                    caixaLuz.classList.remove('hidden');
                    caixaLuz.classList.add('flex');
                    body.classList.add('no-scroll');
                }
            });
        });
        
        const fecharCaixaLuzFuncao = () => {
            caixaLuz.classList.add('hidden');
            caixaLuz.classList.remove('flex');
            body.classList.remove('no-scroll');
        };
    
        fecharCaixaLuz.addEventListener('click', fecharCaixaLuzFuncao);
        caixaLuz.addEventListener('click', evento => {
            if (evento.target === caixaLuz) fecharCaixaLuzFuncao();
        });
    }

    const formularioDeContato = document.getElementById('contact-form');
    
    if (formularioDeContato) {
        const botaoEnviar = document.getElementById('submit-button');
        const statusFormulario = document.getElementById('form-status');

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