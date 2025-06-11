// Carregar efeitos sonoros
const sounds = {
    alert: new Audio('sounds/alert.mp3'),
    roar: new Audio('sounds/roar.mp3'),
    fence: new Audio('sounds/fence.mp3'),
    click: new Audio('sounds/click.mp3'),
    ambient: new Audio('sounds/ambient.mp3')
};

// Configurar som ambiente
sounds.ambient.loop = true;
sounds.ambient.volume = 0.3;

// Controle do Tema
const themeButton = document.getElementById('themeButton');
const body = document.body;

themeButton.addEventListener('click', () => {
    sounds.click.play();
    body.classList.toggle('light-mode');
    const icon = themeButton.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Sistema de Alerta de Segurança
const securityAlert = document.getElementById('securityAlert');
let alertInterval;

function triggerSecurityAlert(message) {
    sounds.alert.play();
    securityAlert.classList.add('active');
    securityAlert.querySelector('span').textContent = message;
    
    if (alertInterval) clearInterval(alertInterval);
    
    alertInterval = setInterval(() => {
        securityAlert.classList.toggle('active');
    }, 1000);

    setTimeout(() => {
        clearInterval(alertInterval);
        securityAlert.classList.remove('active');
        securityAlert.querySelector('span').textContent = 'Sistema de Segurança Ativo';
    }, 5000);
}

// Navegação Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Filtros de Dinossauros
const filterButtons = document.querySelectorAll('.filter-btn');
const dinoCards = document.querySelectorAll('.dino-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        dinoCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Mapa Interativo
const mapButtons = document.querySelectorAll('.map-btn');
const parkMap = document.getElementById('parkMap');

// Dados das áreas do mapa
const mapAreas = {
    visitor: {
        name: 'Área de Visitantes',
        description: 'Área segura com restaurantes, lojas e centro de visitantes.',
        dangerLevel: 'Baixo',
        facilities: ['Centro de Visitantes', 'Restaurante', 'Loja de Souvenirs']
    },
    paddocks: {
        name: 'Recintos dos Dinossauros',
        description: 'Área restrita com recintos de diferentes espécies.',
        dangerLevel: 'Alto',
        facilities: ['T-Rex Kingdom', 'Raptor Paddock', 'Herbivore Valley']
    },
    lab: {
        name: 'Laboratório de Pesquisa',
        description: 'Centro de pesquisa e desenvolvimento genético.',
        dangerLevel: 'Médio',
        facilities: ['Lab Genético', 'Incubadora', 'Centro de Controle']
    },
    security: {
        name: 'Centro de Segurança',
        description: 'Monitoramento e controle de todo o parque.',
        dangerLevel: 'Médio',
        facilities: ['Sala de Controle', 'Arsenal', 'Centro de Comunicações']
    }
};

// Função para atualizar informações do mapa
function updateMapInfo(area) {
    const areaData = mapAreas[area];
    const mapInfo = document.createElement('div');
    mapInfo.className = 'map-info';
    mapInfo.innerHTML = `
        <h3>${areaData.name}</h3>
        <p>${areaData.description}</p>
        <div class="danger-level">
            <span>Nível de Perigo: ${areaData.dangerLevel}</span>
        </div>
        <ul class="facilities">
            ${areaData.facilities.map(f => `<li>${f}</li>`).join('')}
        </ul>
    `;
    
    const oldInfo = parkMap.querySelector('.map-info');
    if (oldInfo) oldInfo.remove();
    parkMap.appendChild(mapInfo);
}

mapButtons.forEach(button => {
    button.addEventListener('click', () => {
        sounds.click.play();
        const area = button.dataset.area;
        mapButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        updateMapInfo(area);
        parkMap.className = `park-map ${area}-view`;
    });
});

// Sistema de Segurança
const cameraViews = document.querySelectorAll('.camera-view');
const fenceStatus = document.querySelectorAll('.status-item');

// Simular alterações nas câmeras
function simulateCameraActivity() {
    cameraViews.forEach(camera => {
        if (Math.random() > 0.8) {
            camera.classList.add('movement-detected');
            sounds.roar.play();
            setTimeout(() => {
                camera.classList.remove('movement-detected');
            }, 2000);
        }
    });
}

// Simular alterações no status das cercas
function simulateFenceStatus() {
    fenceStatus.forEach(fence => {
        if (Math.random() > 0.95) {
            fence.classList.toggle('warning');
            if (fence.classList.contains('warning')) {
                sounds.fence.play();
                triggerSecurityAlert(`Alerta: Instabilidade detectada em ${fence.querySelector('.status-label').textContent}`);
            }
        }
    });
}

// Formulário de Contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    const formData = new FormData(contactForm);
    console.log('Dados do formulário:', Object.fromEntries(formData));
    
    // Simular envio bem-sucedido
    alert('Mensagem enviada com sucesso!');
    contactForm.reset();
});

// Simulação de Eventos do Parque
const parkEvents = [
    'Fuga de raptor detectada no Setor 7!',
    'T-Rex se aproximando da cerca elétrica!',
    'Falha no sistema de contenção no Setor 4!',
    'Pterodáctilos avistados próximos à área de visitantes!',
    'Sistema de segurança comprometido no laboratório!'
];

function simulateRandomEvent() {
    const randomEvent = parkEvents[Math.floor(Math.random() * parkEvents.length)];
    triggerSecurityAlert(randomEvent);
}

// Inicializar simulações
setInterval(simulateRandomEvent, 30000);
setInterval(simulateCameraActivity, 5000);
setInterval(simulateFenceStatus, 10000);

// Menu Mobile
const menuButton = document.createElement('button');
menuButton.classList.add('menu-toggle');
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.main-nav').prepend(menuButton);

menuButton.addEventListener('click', () => {
    const nav = document.querySelector('.main-nav ul');
    nav.classList.toggle('menu-open');
    menuButton.querySelector('i').classList.toggle('fa-bars');
    menuButton.querySelector('i').classList.toggle('fa-times');
});

// Animações de Entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Adicionar classes de animação aos elementos quando entrarem na viewport
function addAnimationClasses() {
    const elements = document.querySelectorAll('.dino-card, .hero-content, .section-title');
    elements.forEach((element, index) => {
        if (index % 2 === 0) {
            element.classList.add('slide-left');
        } else {
            element.classList.add('slide-right');
        }
    });
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', addAnimationClasses);

// Modal de Detalhes do Dinossauro
function showDinoDetails(card) {
    const name = card.querySelector('h3').textContent;
    const scientific = card.querySelector('.scientific-name').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'dino-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${name}</h2>
            <p class="scientific-name">${scientific}</p>
            <div class="dino-stats">
                <div class="stat">
                    <span>Altura</span>
                    <span>4-6 metros</span>
                </div>
                <div class="stat">
                    <span>Peso</span>
                    <span>7000 kg</span>
                </div>
                <div class="stat">
                    <span>Velocidade</span>
                    <span>50 km/h</span>
                </div>
            </div>
            <div class="dino-description">
                <h3>Sobre</h3>
                <p>Descrição detalhada do dinossauro e suas características...</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        sounds.click.play();
        modal.remove();
    });
}

// Inicializar interações dos cards de dinossauros
function initDinoCards() {
    const dinoCards = document.querySelectorAll('.dino-card');
    dinoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            sounds.roar.volume = 0.3;
            sounds.roar.play();
        });

        const infoBtn = card.querySelector('.info-btn');
        infoBtn.addEventListener('click', () => {
            sounds.click.play();
            showDinoDetails(card);
        });
    });
}

// Inicializar tudo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    sounds.ambient.play();
    initDinoCards();
    setInterval(simulateRandomEvent, 30000);
    setInterval(simulateCameraActivity, 5000);
    setInterval(simulateFenceStatus, 10000);
}); 