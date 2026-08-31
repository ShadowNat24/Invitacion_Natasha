document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ABRIR / MOSTRAR LA INVITACIÓN
    // ==========================================
    const btnEntrar = document.getElementById('abrirInvitacion');
    const secInvitacion = document.getElementById('invitacion');

    if (btnEntrar && secInvitacion) {
        btnEntrar.addEventListener('click', () => {
            secInvitacion.setAttribute('aria-hidden', 'false');
            secInvitacion.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================
    // 2. DESPLEGABLE ACORDEÓN DE REGLAS
    // ==========================================
    const botonesRegla = document.querySelectorAll('.regla-titulo');

    botonesRegla.forEach(boton => {
        boton.addEventListener('click', () => {
            const reglaPadre = boton.parentElement;
            const flecha = boton.querySelector('.flecha');

            // Cerrar otras reglas abiertas
            document.querySelectorAll('.regla').forEach(item => {
                if (item !== reglaPadre) {
                    item.classList.remove('activa');
                    const f = item.querySelector('.flecha');
                    if (f) f.textContent = '+';
                }
            });

            // Alternar estado de la regla actual
            reglaPadre.classList.toggle('activa');
            if (flecha) {
                flecha.textContent = reglaPadre.classList.contains('activa') ? '×' : '+';
            }
        });
    });

    // ==========================================
    // 3. EASTER EGGS (SECRETOS)
    // ==========================================

    // Funció para disparar confeti
    function lanzarConfeti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    // A. EL GATO INTERACTIVO
    const gatoContainer = document.getElementById('gatoMeme');
    const soundMiau = document.getElementById('soundMiau');
    let clicsGato = 0;

    if (gatoContainer) {
        gatoContainer.addEventListener('click', (e) => {
            clicsGato++;

            // Reproducir sonido de miau
            if (soundMiau) {
                soundMiau.currentTime = 0;
                soundMiau.play().catch(() => {});
            }

            // Generar emoji flotante en la posición del clic
            const emojis = ['✨', '🎈', '🎉', '🐱', '💖', '🐾'];
            const emoji = document.createElement('span');
            emoji.className = 'emoji-flotante';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            const rect = gatoContainer.getBoundingClientRect();
            emoji.style.left = (e.clientX - rect.left) + 'px';
            emoji.style.top = (e.clientY - rect.top) + 'px';

            gatoContainer.appendChild(emoji);
            setTimeout(() => emoji.remove(), 1000);

            // Secret a los 5 clics: Giro de Super Gato
            if (clicsGato === 5) {
                gatoContainer.classList.add('gato-super-spin');
                lanzarConfeti();
                setTimeout(() => {
                    gatoContainer.classList.remove('gato-super-spin');
                    clicsGato = 0;
                }, 3000);
            }
        });
    }

    // B. CONFETI AL TOCAR "18"
    const secret18 = document.getElementById('secret18');
    let clics18 = 0;

    if (secret18) {
        secret18.addEventListener('click', () => {
            clics18++;
            if (clics18 >= 3) {
                lanzarConfeti();
                clics18 = 0;
            }
        });
    }

    // C. MODO FIESTA NEÓN (Estrella ✦)
    const starParty = document.getElementById('starParty');
    if (starParty) {
        starParty.addEventListener('click', () => {
            document.body.classList.toggle('modo-fiesta');
            lanzarConfeti();
        });
    }

});
