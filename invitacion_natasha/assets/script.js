
// ==========================================
// ABRIR LA INVITACIÓN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const botonAbrir =
        document.getElementById("abrirInvitacion");

    const portada =
        document.getElementById("portada");

    const invitacion =
        document.getElementById("invitacion");


    if (botonAbrir && portada && invitacion) {

        botonAbrir.addEventListener("click", function () {

            // Ocultar portada
            portada.style.display = "none";

            // Mostrar segunda pantalla
            invitacion.classList.add("mostrar");

            // Accesibilidad
            invitacion.setAttribute(
                "aria-hidden",
                "false"
            );

            // Volver arriba
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});



// ==========================================
// COSITAS IMPORTANTES
// ==========================================

const reglas =
    document.querySelectorAll(".regla");


reglas.forEach(function (regla) {

    const botonRegla =
        regla.querySelector(".regla-titulo");


    if (botonRegla) {

        botonRegla.addEventListener(
            "click",
            function () {

                regla.classList.toggle(
                    "abierta"
                );

            }
        );

    }

});
// ==========================================
// EASTER EGGS (SECRETOS)
// ==========================================

// 1. EL GATO INTERACTIVO
const gatoContainer = document.getElementById('gatoMeme');
const soundMiau = document.getElementById('soundMiau');
let clicsGato = 0;

if (gatoContainer) {
    gatoContainer.addEventListener('click', (e) => {
        clicsGato++;

        // Sonido miau
        if (soundMiau) {
            soundMiau.currentTime = 0;
            soundMiau.play().catch(() => {});
        }

        // Emoji flotante
        const emojis = ['✨', '🎈', '🎉', '🐱', '💖', '🐾'];
        const emoji = document.createElement('span');
        emoji.className = 'emoji-flotante';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posición del clic
        const rect = gatoContainer.getBoundingClientRect();
        emoji.style.left = (e.clientX - rect.left) + 'px';
        emoji.style.top = (e.clientY - rect.top) + 'px';
        
        gatoContainer.appendChild(emoji);
        setTimeout(() => emoji.remove(), 1000);

        // Easter egg 5 clics: Modo Super Gato
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

// 2. CONFETI AL TOCAR "18" (o Código Konami)
const secret18 = document.getElementById('secret18');
let clics18 = 0;

function lanzarConfeti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

if (secret18) {
    secret18.addEventListener('click', () => {
        clics18++;
        if (clics18 >= 3) {
            lanzarConfeti();
            clics18 = 0;
        }
    });
}

// 3. MODO FIESTA NEÓN (Tocar la estrella ✦)
const starParty = document.getElementById('starParty');
if (starParty) {
    starParty.addEventListener('click', () => {
        document.body.classList.toggle('modo-fiesta');
        lanzarConfeti();
    });
}
