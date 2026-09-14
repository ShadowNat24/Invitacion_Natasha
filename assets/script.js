// ==========================================
// ABRIR LA INVITACIÓN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const botonAbrir = document.getElementById("abrirInvitacion");
    const portada = document.getElementById("portada");
    const invitacion = document.getElementById("invitacion");

    if (botonAbrir && portada && invitacion) {

        botonAbrir.addEventListener("click", function () {

            // Ocultar portada
            portada.style.display = "none";

            // Mostrar segunda pantalla
            invitacion.classList.add("mostrar");

            // Accesibilidad
            invitacion.setAttribute("aria-hidden", "false");

            // Volver arriba
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            // Forzar actualización inmediata al abrir
            actualizarReloj();
        });

    }

    // Iniciar el intervalo del reloj al cargar
    setInterval(actualizarReloj, 1000);
    actualizarReloj();

});


// ==========================================
// COSITAS IMPORTANTES (DESPLEGABLE)
// ==========================================

const reglas = document.querySelectorAll(".regla");

reglas.forEach(function (regla) {

    const botonRegla = regla.querySelector(".regla-titulo");

    if (botonRegla) {
        botonRegla.addEventListener("click", function () {
            regla.classList.toggle("abierta");
        });
    }

});


// ==========================================
// CUENTA REGRESIVA / RELOJITO
// ==========================================

function actualizarReloj() {
    // Fecha objetivo: 3 de Octubre de 2026 a las 21:00 hs
    const fechaFiesta = new Date("2026-10-03T21:00:00").getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaFiesta - ahora;

    const elDias = document.getElementById("dias");
    const elHoras = document.getElementById("horas");
    const elMinutos = document.getElementById("minutos");
    const elSegundos = document.getElementById("segundos");

    if (!elDias || !elHoras || !elMinutos || !elSegundos) return;

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        elDias.textContent = dias < 10 ? "0" + dias : dias;
        elHoras.textContent = horas < 10 ? "0" + horas : horas;
        elMinutos.textContent = minutos < 10 ? "0" + minutos : minutos;
        elSegundos.textContent = segundos < 10 ? "0" + segundos : segundos;
    } else {
        elDias.textContent = "00";
        elHoras.textContent = "00";
        elMinutos.textContent = "00";
        elSegundos.textContent = "00";
    }
}


// ==========================================
// GALERÍA DE FOTOS DE BEBÉ
// Solo se activa en la rama de prueba.
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const invitacion = document.getElementById("invitacion");
    const bloqueCelebracion = document.querySelector(".bloque-info");

    if (!invitacion || !bloqueCelebracion) return;

    const estilos = document.createElement("style");
    estilos.textContent = `
        .galeria-bebe {
            margin-top: 35px;
            padding: 30px 20px 28px;
            border: 1px solid #efb4ae;
            border-radius: 22px;
            background: rgba(255, 255, 255, .5);
        }

        .galeria-bebe h2 {
            color: #d76862;
            font-size: 32px;
            margin: 0 0 8px;
        }

        .galeria-bebe .subtitulo-fotos {
            font-size: 19px;
            line-height: 1.4;
            margin: 0 0 25px;
        }

        .fotos-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
        }

        .foto-bebe {
            display: block;
            padding: 7px;
            background: #fff;
            border: 1px solid #e8c2bd;
            border-radius: 10px;
            box-shadow: 0 5px 12px rgba(90, 60, 55, .10);
            cursor: pointer;
            transition: transform .2s ease, box-shadow .2s ease;
        }

        .foto-bebe:hover {
            transform: translateY(-3px) rotate(-1deg);
            box-shadow: 0 9px 18px rgba(90, 60, 55, .16);
        }

        .foto-bebe:nth-child(even):hover {
            transform: translateY(-3px) rotate(1deg);
        }

        .foto-bebe img {
            display: block;
            width: 100%;
            aspect-ratio: 1 / 1;
            object-fit: cover;
            border-radius: 6px;
        }

        .modal-foto {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(45, 30, 28, .78);
        }

        .modal-foto.abierto {
            display: flex;
        }

        .modal-contenido {
            position: relative;
            max-width: min(90vw, 650px);
            max-height: 90vh;
            padding: 10px;
            border-radius: 14px;
            background: #fff9f5;
            box-shadow: 0 15px 40px rgba(0, 0, 0, .25);
        }

        .modal-contenido img {
            display: block;
            max-width: min(84vw, 620px);
            max-height: 78vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
        }

        .cerrar-foto {
            position: absolute;
            top: -12px;
            right: -12px;
            width: 36px;
            height: 36px;
            border: 1px solid #d9aaa5;
            border-radius: 50%;
            background: #fff9f5;
            color: #946863;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
        }

        @media (max-width: 600px) {
            .galeria-bebe {
                padding: 25px 14px;
            }

            .galeria-bebe h2 {
                font-size: 29px;
            }

            .galeria-bebe .subtitulo-fotos {
                font-size: 18px;
            }

            .fotos-grid {
                gap: 10px;
            }
        }
    `;
    document.head.appendChild(estilos);

    const galeria = document.createElement("section");
    galeria.className = "galeria-bebe";
    galeria.innerHTML = `
        <h2>♡ Un poquito de mí ♡</h2>
        <p class="subtitulo-fotos">Antes de cumplir 18... fui una bebé bastante tierna 🥹<br>Te dejo algunos recuerdos de esos años.</p>
        <div class="fotos-grid">
            ${Array.from({ length: 12 }, (_, i) => {
                const numero = String(i + 1).padStart(2, "0");
                return `
                    <a class="foto-bebe" href="Fotos/bebe-${numero}.jpg" data-foto="Fotos/bebe-${numero}.jpg" aria-label="Abrir foto de bebé ${i + 1}">
                        <img src="Fotos/bebe-${numero}.jpg" alt="Foto de bebé ${i + 1}" loading="lazy">
                    </a>
                `;
            }).join("")}
        </div>
    `;

    bloqueCelebracion.insertAdjacentElement("afterend", galeria);

    const modal = document.createElement("div");
    modal.className = "modal-foto";
    modal.innerHTML = `
        <div class="modal-contenido" role="dialog" aria-modal="true" aria-label="Foto ampliada">
            <button class="cerrar-foto" type="button" aria-label="Cerrar foto">×</button>
            <img src="" alt="Foto ampliada">
        </div>
    `;
    document.body.appendChild(modal);

    const imagenModal = modal.querySelector("img");
    const botonCerrar = modal.querySelector(".cerrar-foto");

    galeria.querySelectorAll(".foto-bebe").forEach(function (foto) {
        foto.addEventListener("click", function (evento) {
            evento.preventDefault();
            imagenModal.src = foto.dataset.foto;
            imagenModal.alt = foto.querySelector("img").alt;
            modal.classList.add("abierto");
            document.body.style.overflow = "hidden";
        });
    });

    function cerrarModal() {
        modal.classList.remove("abierto");
        imagenModal.src = "";
        document.body.style.overflow = "";
    }

    botonCerrar.addEventListener("click", cerrarModal);

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) cerrarModal();
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && modal.classList.contains("abierto")) {
            cerrarModal();
        }
    });

});
