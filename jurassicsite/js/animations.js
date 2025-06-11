// Efeito de Parallax na Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Efeito de Scanner nos Botões
function addScannerEffect(element) {
    element.addEventListener('mouseover', () => {
        const scanner = document.createElement('div');
        scanner.classList.add('scanner-effect');
        element.appendChild(scanner);
        
        scanner.addEventListener('animationend', () => {
            scanner.remove();
        });
    });
}

document.querySelectorAll('.primary-btn, .secondary-btn').forEach(addScannerEffect);

// Animação de Cards de Dinossauros
function animateDinoCards() {
    const cards = document.querySelectorAll('.dino-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
        
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.1) rotate(2deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Efeito de Glitch no Sistema de Segurança
function addGlitchEffect(element) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            element.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            element.style.opacity = Math.random() * 0.5 + 0.5;
            
            setTimeout(() => {
                element.style.transform = 'translate(0, 0)';
                element.style.opacity = 1;
            }, 100);
        }
    }, 100);
}

// Efeito de Radar no Mapa
function initRadarEffect() {
    const radar = document.querySelector('.radar-overlay');
    if (radar) {
        setInterval(() => {
            radar.style.transform = 'rotate(360deg)';
        }, 3000);
    }
}

// Efeito de Digitação para Textos
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicialização das Animações
document.addEventListener('DOMContentLoaded', () => {
    animateDinoCards();
    initRadarEffect();
    
    // Adicionar efeito glitch ao alerta de segurança
    const securityAlert = document.querySelector('.security-alert');
    if (securityAlert) {
        addGlitchEffect(securityAlert);
    }
    
    // Efeito de digitação nos títulos das seções
    document.querySelectorAll('.section-title').forEach(title => {
        const text = title.textContent;
        typeWriter(title, text);
    });
}); 