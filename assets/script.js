
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
