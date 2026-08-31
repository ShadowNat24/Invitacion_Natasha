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

    // --- ASISTENCIA ---
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

    // --- ACOMPAÑANTES ---
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
                    if (inputAcompanantes && inputAcompanantes.value === "0") {
                        inputAcompanantes.value = "1";
                    }
                } else {
                    cantidadAcompanantes.classList.add("oculto");
                    if (inputAcompanantes) {
                        inputAcompanantes.value = "0";
                    }
                }
            });
        });
    }

    // --- NIÑOS ---
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
                    if (inputCantidadNinos && inputCantidadNinos.value === "0") {
                        inputCantidadNinos.value = "1";
                    }
                } else {
                    cantidadNinos.classList.add("oculto");
                    if (inputCantidadNinos) {
                        inputCantidadNinos.value = "0";
                    }
                }
            });
        });
    }

    // CONTADORES
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

    // --- ENVÍO A FORMSPREE CON FETCH ---
    const form = document.getElementById("formularioRSVP");
    const mensajeFinal = document.getElementById("mensajeFinal");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!inputAsistencia || !inputAsistencia.value) {
                alert("Elegí si vas a asistir 💗");
                return;
            }

            const botonEnviar = event.submitter;
            let textoOriginal = "";

            if (botonEnviar) {
                textoOriginal = botonEnviar.textContent;
                botonEnviar.disabled = true;
                botonEnviar.textContent = "ENVIANDO... 💗";
            }

            const datos = new FormData(form);

            try {
                const respuesta = await fetch(form.action, {
                    method: "POST",
                    body: datos,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (respuesta.ok) {
                    if (preguntasSi) preguntasSi.classList.remove("visible");
                    if (respuestaNo) respuestaNo.classList.remove("visible");
                    if (mensajeFinal) mensajeFinal.classList.add("visible");

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                    return;
                }

                throw new Error("Error al enviar");

            } catch (error) {
                console.error(error);
                alert("No se pudo enviar la confirmación. Intentá nuevamente 💗");

                if (botonEnviar) {
                    botonEnviar.disabled = false;
                    botonEnviar.textContent = textoOriginal;
                }
            }
        });
    }
});