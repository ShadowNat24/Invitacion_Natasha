
document.addEventListener("DOMContentLoaded", function () {

    const selectGroup = (buttons, selectedButton) => {
        buttons.forEach((button) => {
            button.classList.toggle("seleccionado", button === selectedButton);
        });
    };

    const setVisibleSection = (sectionToShow, sectionToHide) => {
        if (sectionToShow) {
            sectionToShow.classList.add("visible");
        }

        if (sectionToHide) {
            sectionToHide.classList.remove("visible");
        }
    };

    const bindCounter = ({ addId, removeId, valueElementId, hiddenInputId, min = 0, max = 10, start = 1 }) => {
        const addButton = document.getElementById(addId);
        const removeButton = document.getElementById(removeId);
        const valueElement = document.getElementById(valueElementId);
        const hiddenInput = document.getElementById(hiddenInputId);

        if (!addButton || !removeButton || !valueElement || !hiddenInput) {
            return;
        }

        let currentValue = start;

        const update = () => {
            valueElement.textContent = String(currentValue);
            hiddenInput.value = String(currentValue);
        };

        addButton.addEventListener("click", () => {
            if (currentValue < max) {
                currentValue += 1;
                update();
            }
        });

        removeButton.addEventListener("click", () => {
            if (currentValue > min) {
                currentValue -= 1;
                update();
            }
        });

        update();
    };

    const asistenciaButtons = document.querySelectorAll(".asistencia");
    const inputAsistencia = document.getElementById("asistencia");
    const preguntasSi = document.getElementById("preguntasSi");
    const respuestaNo = document.getElementById("respuestaNo");

    if (asistenciaButtons.length && inputAsistencia) {
        asistenciaButtons.forEach((button) => {
            button.addEventListener("click", () => {
                selectGroup(asistenciaButtons, button);

                const valor = button.dataset.value;
                inputAsistencia.value = valor;

                if (valor === "si") {
                    setVisibleSection(preguntasSi, respuestaNo);
                }

                if (valor === "no") {
                    setVisibleSection(respuestaNo, preguntasSi);
                }
            });
        });
    }

    const acompanadoButtons = document.querySelectorAll(".acompanado");
    const inputAcompanado = document.getElementById("acompanado");
    const cantidadAcompanantes = document.getElementById("cantidadAcompanantes");
    const inputAcompanantes = document.getElementById("acompanantes");

    if (acompanadoButtons.length && inputAcompanado && cantidadAcompanantes) {
        acompanadoButtons.forEach((button) => {
            button.addEventListener("click", () => {
                selectGroup(acompanadoButtons, button);

                const valor = button.dataset.value;
                inputAcompanado.value = valor;

                if (valor === "si") {
                    cantidadAcompanantes.classList.remove("oculto");
                } else {
                    cantidadAcompanantes.classList.add("oculto");
                    if (inputAcompanantes) {
                        inputAcompanantes.value = "0";
                    }
                }
            });
        });
    }

    const ninosButtons = document.querySelectorAll(".ninos");
    const inputNinos = document.getElementById("ninos");
    const cantidadNinos = document.getElementById("cantidadNinos");
    const inputCantidadNinos = document.getElementById("cantidad_ninos");

    if (ninosButtons.length && inputNinos && cantidadNinos) {
        ninosButtons.forEach((button) => {
            button.addEventListener("click", () => {
                selectGroup(ninosButtons, button);

                const valor = button.dataset.value;
                inputNinos.value = valor;

                if (valor === "si") {
                    cantidadNinos.classList.remove("oculto");
                } else {
                    cantidadNinos.classList.add("oculto");
                    if (inputCantidadNinos) {
                        inputCantidadNinos.value = "0";
                    }
                }
            });
        });
    }

    bindCounter({
        addId: "masAcompanantes",
        removeId: "menosAcompanantes",
        valueElementId: "numeroAcompanantes",
        hiddenInputId: "acompanantes",
        min: 1,
        max: 10,
        start: 1,
    });

    bindCounter({
        addId: "masNinos",
        removeId: "menosNinos",
        valueElementId: "numeroNinos",
        hiddenInputId: "cantidad_ninos",
        min: 1,
        max: 10,
        start: 1,
    });

    const form = document.getElementById("formularioRSVP");
    if (form) {
        form.addEventListener("submit", (event) => {
            const asistencia = document.getElementById("asistencia");
            if (!asistencia || !asistencia.value) {
                event.preventDefault();
                alert("Elegí si vas a venir o no antes de enviar.");
            }
        });
    }
});


// ==========================================
// ACOMPAÑANTES
// ==========================================

const botonesAcompanado =
    document.querySelectorAll(".acompanado");

const inputAcompanado =
    document.getElementById("acompanado");

const cantidadAcompanantes =
    document.getElementById("cantidadAcompanantes");


let numeroAcompanantes = 1;

const textoAcompanantes =
    document.getElementById("numeroAcompanantes");

const inputAcompanantes =
    document.getElementById("acompanantes");


botonesAcompanado.forEach((boton) => {

    boton.addEventListener("click", () => {

        botonesAcompanado.forEach((b) => {
            b.classList.remove("seleccionado");
        });

        boton.classList.add("seleccionado");

        const valor = boton.dataset.value;

        inputAcompanado.value = valor;


        if (valor === "si") {

            cantidadAcompanantes.classList.remove("oculto");

        } else {

            cantidadAcompanantes.classList.add("oculto");

            numeroAcompanantes = 1;

            textoAcompanantes.textContent = "1";

            inputAcompanantes.value = "0";

        }

    });

});


document
    .getElementById("masAcompanantes")
    .addEventListener("click", () => {

        if (numeroAcompanantes < 10) {

            numeroAcompanantes++;

            textoAcompanantes.textContent =
                numeroAcompanantes;

            inputAcompanantes.value =
                numeroAcompanantes;

        }

    });


document
    .getElementById("menosAcompanantes")
    .addEventListener("click", () => {

        if (numeroAcompanantes > 1) {

            numeroAcompanantes--;

            textoAcompanantes.textContent =
                numeroAcompanantes;

            inputAcompanantes.value =
                numeroAcompanantes;

        }

    });


// ==========================================
// NIÑOS
// ==========================================

const botonesNinos =
    document.querySelectorAll(".ninos");

const inputNinos =
    document.getElementById("ninos");

const cantidadNinos =
    document.getElementById("cantidadNinos");


let numeroNinos = 1;

const textoNinos =
    document.getElementById("numeroNinos");

const inputCantidadNinos =
    document.getElementById("cantidad_ninos");


botonesNinos.forEach((boton) => {

    boton.addEventListener("click", () => {

        botonesNinos.forEach((b) => {
            b.classList.remove("seleccionado");
        });

        boton.classList.add("seleccionado");

        const valor = boton.dataset.value;

        inputNinos.value = valor;


        if (valor === "si") {

            cantidadNinos.classList.remove("oculto");

        } else {

            cantidadNinos.classList.add("oculto");

            numeroNinos = 1;

            textoNinos.textContent = "1";

            inputCantidadNinos.value = "0";

        }

    });

});


document
    .getElementById("masNinos")
    .addEventListener("click", () => {

        if (numeroNinos < 10) {

            numeroNinos++;

            textoNinos.textContent =
                numeroNinos;

            inputCantidadNinos.value =
                numeroNinos;

        }

    });


document
    .getElementById("menosNinos")
    .addEventListener("click", () => {

        if (numeroNinos > 1) {

            numeroNinos--;

            textoNinos.textContent =
                numeroNinos;

            inputCantidadNinos.value =
                numeroNinos;

        }

    });


// ==========================================
// ENVÍO A FORMSPREE
// ==========================================

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();


    if (!inputAsistencia.value) {

        alert("Elegí si vas a asistir 💗");

        return;

    }


    const botonEnviar = event.submitter;


    if (botonEnviar) {

        botonEnviar.disabled = true;

        botonEnviar.textContent =
            "ENVIANDO... 💗";

    }


    const datos = new FormData(formulario);


    try {

        const respuesta = await fetch(
            formulario.action,
            {
                method: "POST",
                body: datos,
                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (respuesta.ok) {

            preguntasSi.classList.remove("visible");

            respuestaNo.classList.remove("visible");

            mensajeFinal.classList.add("visible");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            return;

        }


        throw new Error("Error al enviar");

    } catch (error) {

        console.error(error);

        alert(
            "No se pudo enviar la confirmación. Intentá nuevamente 💗"
        );


        if (botonEnviar) {

            botonEnviar.disabled = false;

            botonEnviar.textContent =
                "ENVIAR RESPUESTA";

        }

    }

});

