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
// COSITAS IMPORTANTES (DESPLEGABLE)
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
// CUENTA REGRESIVA / RELOJITO
// ==========================================

function actualizarReloj() {
    // Fecha objetivo: 3 de Octubre de 2026 a las 21:00 hs
    const fechaFiesta = new Date("October 3, 2026 21:00:00").getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaFiesta - ahora;

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");

        if (elDias) elDias.textContent = dias < 10 ? "0" + dias : dias;
        if (elHoras) elHoras.textContent = horas < 10 ? "0" + horas : horas;
        if (elMinutos) elMinutos.textContent = minutos < 10 ? "0" + minutos : minutos;
        if (elSegundos) elSegundos.textContent = segundos < 10 ? "0" + segundos : segundos;
    }
}

// Ejecutar cada segundo
setInterval(actualizarReloj, 1000);
actualizarReloj();
