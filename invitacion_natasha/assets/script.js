document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btnEntrar");
    const seccionInvitacion = document.getElementById("seccionInvitacion");
    const btnRsvp = document.getElementById("btnRsvp");
    const reglasTitulos = document.querySelectorAll(".regla-titulo");

    // Mostrar sección de invitación al hacer clic en Entrar
    if (btnEntrar) {
        btnEntrar.addEventListener("click", () => {
            seccionInvitacion.removeAttribute("aria-hidden");
            seccionInvitacion.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Desplegable del acordeón de reglas
    reglasTitulos.forEach((boton) => {
        boton.addEventListener("click", () => {
            const regla = boton.parentElement;
            regla.classList.toggle("activa");
        });
    });

    // Botón RSVP / WhatsApp
    if (btnRsvp) {
        btnRsvp.addEventListener("click", () => {
            const numeroTelefono = "59899000000"; // Reemplazar con el número real
            const mensaje = encodeURIComponent("¡Hola! Confirmo mi asistencia para tus 18 🥳");
            window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
        });
    }
});
