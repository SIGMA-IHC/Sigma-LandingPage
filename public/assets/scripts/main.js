document.addEventListener("DOMContentLoaded", function () {
    const enlacesInternos = document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach(function (enlace) {
        enlace.addEventListener("click", function (evento) {
            const selector = enlace.getAttribute("href");

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

    window.abrirLogin = function () {
        mostrarModal("modal-login");
    };

    window.cerrarLogin = function () {
        ocultarModal("modal-login");
    };

    window.abrirRegistro = function () {
        mostrarModal("modal-registro");
    };

    window.cerrarRegistro = function () {
        ocultarModal("modal-registro");
    };

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

    window.alternarContrasena = function () {
        const campo = document.getElementById("contrasena");

        if (campo) {
            campo.type = campo.type === "password" ? "text" : "password";
        }
    };

    const formularioLogin = document.getElementById("form-login");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function (evento) {
            evento.preventDefault();

            alert("Inicio de sesión de demostración.");

            formularioLogin.reset();

            ocultarModal("modal-login");
        });
    }

    const formularioRegistro = document.getElementById("form-registro");

    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", function (evento) {
            evento.preventDefault();

            alert("Registro de demostración. Próximamente podrás crear tu cuenta.");

            formularioRegistro.reset();

            ocultarModal("modal-registro");
        });
    }

    const formularioRecuperacion = document.getElementById("form-recuperacion");

    if (formularioRecuperacion) {
        formularioRecuperacion.addEventListener("submit", function (evento) {
            evento.preventDefault();

            alert("Solicitud de recuperación de demostración. No se ha enviado ningún correo.");

            formularioRecuperacion.reset();

            ocultarModal("modal-recuperacion");
        });
    }

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

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-camara");
    const botonActivar = document.getElementById("activar-camara");
    const botonDetener = document.getElementById("detener-camara");
    const botonCapturar = document.getElementById("capturar-foto");
    const mensajeCamara = document.getElementById("mensaje-camara");
    const canvas = document.getElementById("canvas-captura");

    let flujoCamara = null;

    if (video && botonActivar && botonDetener) {
        botonActivar.addEventListener("click", async function () {
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error("La cámara no está disponible en esta dirección.");
                }

                flujoCamara = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "user"
                    },
                    audio: false
                });

                video.srcObject = flujoCamara;
                video.style.display = "block";

                if (mensajeCamara) {
                    mensajeCamara.style.display = "none";
                }

                await video.play();

            } catch (error) {
                console.error("Error al activar la cámara:", error);

                if (mensajeCamara) {
                    mensajeCamara.style.display = "block";
                    mensajeCamara.textContent =
                        "No se pudo activar la cámara. Verifica los permisos del navegador.";
                }

                alert("No se pudo acceder a la cámara. Comprueba los permisos y utiliza HTTPS o localhost.");
            }
        });

        botonDetener.addEventListener("click", function () {
            if (flujoCamara) {
                flujoCamara.getTracks().forEach(function (pista) {
                    pista.stop();
                });

                flujoCamara = null;
            }

            video.srcObject = null;
            video.style.display = "none";

            if (mensajeCamara) {
                mensajeCamara.style.display = "block";
                mensajeCamara.textContent = "La cámara está desactivada.";
            }
        });
    }

    if (botonCapturar && video && canvas) {
        botonCapturar.addEventListener("click", function () {
            if (!flujoCamara || video.readyState < 2) {
                alert("Primero activa la cámara.");
                return;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const contexto = canvas.getContext("2d");

            contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imagen = canvas.toDataURL("image/png");

            const enlace = document.createElement("a");

            enlace.href = imagen;
            enlace.download = "captura-sigma.png";
            enlace.click();

            alert("Fotografía capturada correctamente.");
        });
    }
    const texto = document.getElementById("texto-voz");
const botonVoz = document.getElementById("reproducir-voz");
const botonLimpiarTexto = document.getElementById("limpiar-texto-voz");
const contador = document.getElementById("contador-caracteres");
const selectorIdioma = document.getElementById("idioma-voz");
const selectorVoz = document.getElementById("selector-voz");

if (texto && botonVoz && selectorIdioma && selectorVoz) {
    if (botonLimpiarTexto) {
        botonLimpiarTexto.addEventListener("click", function () {
            texto.value = "";

            if (contador) {
                contador.textContent = "0";
            }

            window.speechSynthesis.cancel();
        });
    }

    let vocesDisponibles = [];

    const nombresIdiomas = {
        "es-MX": "Español (México)",
        "es-ES": "Español (España)",
        "es-US": "Español (Estados Unidos)",
        "en-US": "Inglés (Estados Unidos)",
        "en-GB": "Inglés (Reino Unido)",
        "de-DE": "Alemán",
        "fr-FR": "Francés",
        "it-IT": "Italiano",
        "pt-BR": "Portugués (Brasil)",
        "hi-IN": "Hindi",
        "id-ID": "Indonesio",
        "ja-JP": "Japonés",
        "ko-KR": "Coreano",
        "nl-NL": "Neerlandés",
        "pl-PL": "Polaco",
        "ru-RU": "Ruso",
        "zh-CN": "Chino mandarín (China)",
        "zh-HK": "Cantonés (Hong Kong)",
        "zh-TW": "Chino mandarín (Taiwán)"
    };
    

function obtenerNombreIdioma(codigo) {
    const nombresEspeciales = {
        "yue": "Cantonés",
        "zh": "Chino mandarín",
        "bs": "Bosnio",
        "sr": "Serbio",
        "kok": "Konkani",
        "ks": "Cachemiro",
        "sd": "Sindhi",
        "sat": "Santali",
        "pa": "Punyabí",
        "su": "Sundanés",
        "hi": "Hindi",
        "as": "Asamés",
        "brx": "Bodo",
        "doi": "Dogri",
        "mni": "Manipuri",
        "mai": "Maithili",
        "or": "Odia",
        "sa": "Sánscrito",
        "jv": "Javanés",
        "cy": "Galés",
        "mn": "Mongol",
        "fil": "Filipino"
    };

    const variantes = {
        "yue-HK-#Hant": "Cantonés (Hong Kong)",
        "zh-CN-#Hans": "Chino mandarín (China, simplificado)",
        "zh-HK-#Hans": "Chino mandarín (Hong Kong, simplificado)",
        "zh-MO-#Hans": "Chino mandarín (Macao, simplificado)",
        "zh-MY-#Hans": "Chino mandarín (Malasia, simplificado)",
        "zh-SG-#Hans": "Chino mandarín (Singapur, simplificado)",
        "zh-HK-#Hant": "Chino mandarín (Hong Kong, tradicional)",
        "zh-MO-#Hant": "Chino mandarín (Macao, tradicional)",
        "zh-MY-#Hant": "Chino mandarín (Malasia, tradicional)",
        "zh-TW-#Hant": "Chino mandarín (Taiwán, tradicional)",
        "bs-BA-#Cyrl": "Bosnio (alfabeto cirílico)",
        "bs-BA-#Latn": "Bosnio (alfabeto latino)",
        "sr-RS-#Cyrl": "Serbio (alfabeto cirílico)",
        "sr-RS-#Latn": "Serbio (alfabeto latino)",
        "kok-IN-#Deva": "Konkani (alfabeto devanagari)",
        "kok-IN-#Latn": "Konkani (alfabeto latino)",
        "ks-IN-#Arab": "Cachemiro (alfabeto árabe)",
        "ks-IN-#Deva": "Cachemiro (alfabeto devanagari)",
        "sat-IN-#Olck": "Santali (alfabeto ol chiki)",
        "sd-IN-#Deva": "Sindhi (alfabeto devanagari)",
        "pa-IN-#Guru": "Punyabí (alfabeto gurmukhi)",
        "mni-IN-#Beng": "Manipuri (alfabeto bengalí)",
        "su-ID-#Latn": "Sundanés (Indonesia)"
    };

    if (variantes[codigo]) {
        return variantes[codigo];
    }

    const normalizado = codigo.replace(/_/g, "-");
    const base = normalizado.split("-")[0];

    if (nombresEspeciales[base]) {
        const paises = {
            IN: "India",
            ID: "Indonesia",
            HK: "Hong Kong",
            CN: "China",
            TW: "Taiwán",
            MY: "Malasia",
            SG: "Singapur",
            MO: "Macao",
            BA: "Bosnia y Herzegovina",
            RS: "Serbia",
            GB: "Reino Unido"
        };

        const partes = normalizado.split("-");
        const region = partes.find(p => /^[A-Z]{2}$/.test(p));
        const nombre = nombresEspeciales[base];

        if (region && paises[region]) {
            return `${nombre} (${paises[region]})`;
        }

        return nombre;
    }

    if (nombresIdiomas[normalizado]) {
        return nombresIdiomas[normalizado];
    }

    try {
        const nombres = new Intl.DisplayNames(["es"], {
            type: "language"
        });

        return nombres.of(normalizado) || normalizado;
    } catch (error) {
        return normalizado;
    }
}



    function cargarVoces() {

        vocesDisponibles = window.speechSynthesis.getVoices();

        if (vocesDisponibles.length === 0) {
            return;
        }

        const idiomaAnterior = selectorIdioma.value;

        selectorIdioma.innerHTML = "";

        const idiomas = [...new Set(
            vocesDisponibles.map(voz => voz.lang)
        )];

        idiomas.forEach(idioma => {

            const opcion = document.createElement("option");

            opcion.value = idioma;
            opcion.textContent = obtenerNombreIdioma(idioma);

            selectorIdioma.appendChild(opcion);

        });

        if (idiomas.includes(idiomaAnterior)) {
            selectorIdioma.value = idiomaAnterior;
        } else if (idiomas.includes("es-MX")) {
            selectorIdioma.value = "es-MX";
        }

        actualizarVoces();
    }

    function actualizarVoces() {

        const idiomaSeleccionado = selectorIdioma.value;

        const vocesFiltradas = vocesDisponibles.filter(
            voz => voz.lang === idiomaSeleccionado
        );

        selectorVoz.innerHTML = "";

        vocesFiltradas.forEach((voz, indice) => {

            const opcion = document.createElement("option");

            opcion.value = indice;
            opcion.textContent = voz.name;

            selectorVoz.appendChild(opcion);

        });

    }

    texto.addEventListener("input", function () {

        if (contador) {
            contador.textContent = texto.value.length;
        }

    });

    selectorIdioma.addEventListener("change", actualizarVoces);

    window.speechSynthesis.onvoiceschanged = cargarVoces;

    cargarVoces();

    botonVoz.addEventListener("click", function () {

        const mensaje = texto.value.trim();

        if (mensaje === "") {
            alert("Primero escribe un mensaje.");
            return;
        }

        if (!("speechSynthesis" in window)) {
            alert("Tu navegador no admite texto a voz.");
            return;
        }

        const vocesFiltradas = vocesDisponibles.filter(
            voz => voz.lang === selectorIdioma.value
        );

        const vozElegida = vocesFiltradas[
            Number(selectorVoz.value)
        ];

        if (!vozElegida) {
            alert("Selecciona un idioma y una voz disponible.");
            return;
        }

        window.speechSynthesis.cancel();

        const lectura = new SpeechSynthesisUtterance(mensaje);

        lectura.voice = vozElegida;
        lectura.lang = vozElegida.lang;
        lectura.rate = 1;
        lectura.pitch = 1;

        window.speechSynthesis.speak(lectura);

    });

}
    const botonMicrofono = document.getElementById("activar-microfono");
    const resultadoVoz = document.getElementById("resultado-voz");
    const botonLimpiarVoz = document.getElementById("limpiar-voz-texto");

if (botonLimpiarVoz && resultadoVoz) {
    botonLimpiarVoz.addEventListener("click", function () {
        resultadoVoz.textContent = "Aquí aparecerá el texto reconocido.";
    });
}
    const ondasVoz = document.getElementById("ondas-voz");

    const Reconocimiento =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (botonMicrofono && resultadoVoz) {
        if (!Reconocimiento) {
            botonMicrofono.addEventListener("click", function () {
                alert("Tu navegador no admite reconocimiento de voz. Prueba con Google Chrome.");
            });
        } else {
            const reconocimiento = new Reconocimiento();

            reconocimiento.lang = "es-PE";
            reconocimiento.continuous = false;
            reconocimiento.interimResults = true;

            botonMicrofono.addEventListener("click", function () {
                resultadoVoz.textContent = "Te estoy escuchando...";

                if (ondasVoz) {
                    ondasVoz.classList.add("ondas-activas");
                }

                try {
                    reconocimiento.start();
                } catch (error) {
                    console.log("El reconocimiento ya está activo.");
                }
            });

            reconocimiento.onresult = function (evento) {
                let textoReconocido = "";

                for (let i = evento.resultIndex; i < evento.results.length; i++) {
                    textoReconocido += evento.results[i][0].transcript;
                }

                resultadoVoz.textContent = textoReconocido;
            };

            reconocimiento.onend = function () {
                if (ondasVoz) {
                    ondasVoz.classList.remove("ondas-activas");
                }
            };

            reconocimiento.onerror = function (evento) {
                resultadoVoz.textContent =
                    "No se pudo reconocer la voz: " + evento.error;

                if (ondasVoz) {
                    ondasVoz.classList.remove("ondas-activas");
                }
            };
        }
    }

    const subirImagen = document.getElementById("subir-imagen");
    const vistaImagen = document.getElementById("vista-imagen");

    if (subirImagen && vistaImagen) {
        subirImagen.addEventListener("change", function () {
            const archivo = subirImagen.files[0];

            if (!archivo) {
                return;
            }

            if (!archivo.type.startsWith("image/")) {
                alert("Selecciona un archivo de imagen válido.");
                subirImagen.value = "";
                return;
            }

            const lector = new FileReader();

            lector.onload = function (evento) {
                vistaImagen.src = evento.target.result;
                vistaImagen.hidden = false;
            };

            lector.readAsDataURL(archivo);
        });
    }

    const botonGuardar = document.getElementById("guardar-traduccion");
    const resultadoSena = document.getElementById("resultado-sena");
    const listaHistorial = document.getElementById("lista-historial");

    function mostrarHistorial() {
        if (!listaHistorial) return;

        const historial = JSON.parse(
            localStorage.getItem("historialSigma") || "[]"
        );

        listaHistorial.innerHTML = "";

        if (historial.length === 0) {
            listaHistorial.textContent = "Todavía no tienes traducciones guardadas.";
            return;
        }

        historial.forEach(function (textoGuardado) {
            const elemento = document.createElement("p");
            elemento.textContent = textoGuardado;

            listaHistorial.appendChild(elemento);
        });
    }

    mostrarHistorial();

    if (botonGuardar && resultadoSena) {
        botonGuardar.addEventListener("click", function () {
            const traduccion = resultadoSena.textContent.trim();

            if (!traduccion || traduccion === "Esperando una seña...") {
                alert("Todavía no hay una traducción para guardar.");
                return;
            }

            const historial = JSON.parse(
                localStorage.getItem("historialSigma") || "[]"
            );

            historial.unshift(traduccion);

            localStorage.setItem(
                "historialSigma",
                JSON.stringify(historial.slice(0, 20))
            );

            mostrarHistorial();

            alert("Traducción guardada correctamente.");
        });
    }

    const botonCopiar = document.getElementById("copiar-resultado");

    if (botonCopiar && resultadoSena) {
        botonCopiar.addEventListener("click", async function () {
            const textoCopiar = resultadoSena.textContent.trim();

            if (!textoCopiar || textoCopiar === "Esperando una seña...") {
                alert("No hay texto para copiar.");
                return;
            }

            try {
                await navigator.clipboard.writeText(textoCopiar);
                alert("Texto copiado correctamente.");
            } catch (error) {
                alert("No se pudo copiar el texto.");
            }
        });
    }

    const botonEscuchar = document.getElementById("escuchar-resultado");

    if (botonEscuchar && resultadoSena) {
        botonEscuchar.addEventListener("click", function () {
            const mensaje = resultadoSena.textContent.trim();

            if (!mensaje || mensaje === "Esperando una seña...") {
                alert("No hay una traducción para escuchar.");
                return;
            }

            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();

                const lectura = new SpeechSynthesisUtterance(mensaje);
                lectura.lang = "es-PE";

                window.speechSynthesis.speak(lectura);
            }
        });
    }

    const botonAumentar = document.getElementById("aumentar-letra");

    if (botonAumentar) {
        let letraGrande = false;

        botonAumentar.addEventListener("click", function () {
            letraGrande = !letraGrande;

            document.body.classList.toggle("letra-grande", letraGrande);

            botonAumentar.textContent = letraGrande
                ? "Restablecer letra"
                : "Aumentar letra";
        });
    }
});