
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // NAVEGACIÓN Y DESPLAZAMIENTO SUAVE
    // =====================================

    const enlacesInternos = document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            const selector = enlace.getAttribute("href");

            // Evita procesar enlaces vacíos o solo con #
            if (!selector || selector === "#") {
                return;
            }

            const destino = document.querySelector(selector);

            if (destino) {
                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    // =====================================
    // MOSTRAR Y OCULTAR MODALES
    // =====================================

    function mostrarModal(id) {

        const modal = document.getElementById(id);

        if (modal) {

            document.querySelectorAll(".modal-login").forEach(function (elemento) {
                elemento.hidden = true;
            });

            modal.hidden = false;
        }

    }


    function ocultarModal(id) {

        const modal = document.getElementById(id);

        if (modal) {
            modal.hidden = true;
        }

    }


    // =====================================
    // FUNCIONES DE INICIO DE SESIÓN
    // =====================================

    window.abrirLogin = function () {
        mostrarModal("modal-login");
    };

    window.cerrarLogin = function () {
        ocultarModal("modal-login");
    };


    // =====================================
    // FUNCIONES DE REGISTRO
    // =====================================

    window.abrirRegistro = function () {
        mostrarModal("modal-registro");
    };

    window.cerrarRegistro = function () {
        ocultarModal("modal-registro");
    };


    // =====================================
    // FUNCIONES DE RECUPERACIÓN
    // =====================================

    window.abrirRecuperacion = function () {
        mostrarModal("modal-recuperacion");
    };

    window.cerrarRecuperacion = function () {
        ocultarModal("modal-recuperacion");
    };

    window.volverLogin = function () {
        mostrarModal("modal-login");
    };

    window.volverDesdeRecuperacion = function () {
        mostrarModal("modal-login");
    };


    // =====================================
    // MOSTRAR U OCULTAR CONTRASEÑA
    // =====================================

    window.alternarContrasena = function () {

        const campo = document.getElementById("contrasena");

        if (campo) {
            campo.type = campo.type === "password" ? "text" : "password";
        }

    };


    // =====================================
    // FORMULARIO DE INICIO DE SESIÓN
    // =====================================

    const formularioLogin = document.getElementById("form-login");

    if (formularioLogin) {

        formularioLogin.addEventListener("submit", function (evento) {

            evento.preventDefault();

            alert("Inicio de sesión de demostración.");

            formularioLogin.reset();

            ocultarModal("modal-login");

        });

    }


    // =====================================
    // FORMULARIO DE REGISTRO
    // =====================================

    const formularioRegistro = document.getElementById("form-registro");

    if (formularioRegistro) {

        formularioRegistro.addEventListener("submit", function (evento) {

            evento.preventDefault();

            alert("Registro de demostración. Próximamente podrás crear tu cuenta.");

            formularioRegistro.reset();

            ocultarModal("modal-registro");

        });

    }


    // =====================================
    // FORMULARIO DE RECUPERACIÓN
    // =====================================

    const formularioRecuperacion = document.getElementById("form-recuperacion");

    if (formularioRecuperacion) {

        formularioRecuperacion.addEventListener("submit", function (evento) {

            evento.preventDefault();

            alert("Solicitud de recuperación de demostración. No se ha enviado ningún correo.");

            formularioRecuperacion.reset();

            ocultarModal("modal-recuperacion");

        });

    }


    // =====================================
    // FORMULARIO DE CONTACTO
    // =====================================

    const formularioContacto = document.querySelector("#form-contacto");

    if (formularioContacto) {

        formularioContacto.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const estadoContacto = document.querySelector("#contacto-estado");

            if (estadoContacto) {

                estadoContacto.textContent =
                    "¡Gracias por escribirnos! Tu mensaje ha sido registrado en esta demostración.";

            }

            formularioContacto.reset();

        });

    }

});
