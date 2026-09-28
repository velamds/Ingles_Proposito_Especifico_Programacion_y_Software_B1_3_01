//INICIO VARIABLES GENERALES
var descripcion = "Let your imagination fly and complete the following activity.";
var control_de_tiempo = "300";
var numero_de_preguntas = 1;
var numero_de_intentos = 1;
var puntaje = "1";
var puntaje_actual = "0";
var exito_puntaje = "1";
//TIPO: memorando, email, cuento
var preguntas_txt = '{"preguntas":[{"id_pregunta":"1","pregunta":"0", "tipo":"email", "respuestas":"","justificacion":"","pista":"","correcta":""}]}';
//FIN VARIABLES GENERALES

//VARIABLES DE LA ACTIVIDAD
var preguntas_json = eval("(" + preguntas_txt + ")");
var preguntas_realizadas = new Array();
var pregunta_actual;
var intento_actual = 1;
var letras_a_encontrar;
var mis_respuestas = [];

function inicializar_reglas_actividad() {
    $('#cont_descripcion').html(descripcion);
    if (numero_de_preguntas > 1) {
        $('#cont_numero_de_preguntas').html('The activity is composed of ' + numero_de_preguntas + ' questions. This icon will change every time you answer each question.');
    } else {
        $('#cont_numero_de_preguntas').html('The activity is composed of ' + numero_de_preguntas + ' question. This icon will change every time you answer each question.');
    }
    if (numero_de_intentos > 1) {
        $('#cont_numero_de_intentos').html('You have ' + numero_de_intentos + ' attempts to successfully complete the activity.');
    } else {
        $('#cont_numero_de_intentos').html('You have ' + numero_de_intentos + ' attempt to successfully complete the activity.');
    }
    if (exito_puntaje > 1) {
        $('#cont_puntaje').html('To successfully complete this activity, you must get at least ' + exito_puntaje + ' points. Each correct answer gives ');
    } else {
        $('#cont_puntaje').html('To successfully complete this activity, you must get at least ' + exito_puntaje + ' point. Each correct answer gives ');
    }
    if (puntaje > 1) {
        $('#cont_puntaje').html($('#cont_puntaje').html() + ' ' + puntaje + ' points.');
    } else {
        $('#cont_puntaje').html($('#cont_puntaje').html() + ' ' + puntaje + ' point.');
    }
    msg_tiempo = 'This activity has no time limit.';
    if (control_de_tiempo !== '' && control_de_tiempo !== '0') {
        if (control_de_tiempo > 1) {
            msg_tiempo = 'You have  ' + control_de_tiempo + ' seconds to complete the activity.';
        } else {
            msg_tiempo = 'You have  ' + control_de_tiempo + ' second to complete the activity.';
        }
    }
    $('#cont_tiempo').html(msg_tiempo);
    logo_animation();
}

var preguntas_json_original = eval("(" + preguntas_txt + ")");
/*INICIO FUNCIONES PUNTUALES ACTIVIDAD*/

function inicializar_actividad() {
    preguntas_json = JSON.parse(JSON.stringify(preguntas_json_original));
    $('#btn_actividad_container').html('<button id="btn_acciones" onclick="responder_pregunta();" class="btn_actividad btn_enviar_morado">Submit</button>');
    $('#cont_puntos').html("0");
    $(".input").val("");
    mis_respuestas = [];
    pregunta_actual = 1;
    preguntas_json.preguntas.mezclar_preguntas();
    siguiente_pregunta();
    activar_contenedor('cont_actividad');
    activar_cronometro();
}

/*INICIO FUNCIONES PUNTUALES ACTIVIDAD*/
function siguiente_pregunta() {

    $('.actividad_area_de_texto_memorando').css('display', 'none');
    $('.actividad_area_de_texto_cuento').css('display', 'none');
    $('.actividad_area_de_texto_correo').css('display', 'none');
    if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'memorando') {
        $('.actividad_area_de_texto_memorando').css('display', 'block');
    } else if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'cuento') {
        $('.actividad_area_de_texto_cuento').css('display', 'block');
    } else if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'email') {
        $('.actividad_area_de_texto_correo').css('display', 'block');
    }
    $('#btn_actividad_container button').css('display', 'block');
}

function responder_pregunta() {
    var html_txt = '';
    if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'memorando') {
        html_txt += '<div class="resultado_correo_memorando">';
        html_txt += '<div>';
        html_txt += '<p class="titulo_para_txt"><b>To:</b></p><br/>';
        html_txt += '<p>' + $('#para_memorando').val() + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Subject:</b></p><br/>';
        html_txt += '<p>' + $('#asunto_memorando').val() + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Message:</b></p><br/>';
        html_txt += '<p>' + $('#mensaje_memorando').val() + '</p><br/>';
        html_txt += '</div>';
        html_txt += '</div>';
    } else if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'email') {
        html_txt += '<div class="resultado_correo_memorando">';
        html_txt += '<div>';
        html_txt += '<p class="titulo_para_txt"><b>To:</b></p><br/>';
        html_txt += '<p>' + $('#para_correo').val() + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Subject:</b></p><br/>';
        html_txt += '<p>' + $('#asunto_correo').val() + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Message:</b></p><br/>';
        html_txt += '<p>' + $('#mensaje_correo').val() + '</p><br/>';
        html_txt += '</div>';
        html_txt += '</div>';
    } else if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'cuento') {
        html_txt += '<div class="resultado_cuento_area_texto">';
        html_txt += '<div>';
        html_txt += '<p class="titulo_para_txt"><b>Introduction:</b></p><br/>';
        html_txt += '<p>' + $('#introduccion_cuento').val() + '</p><br/>';
        html_txt += '<p class="titulo_para_txt"><b>Knot:</b></p><br/>';
        html_txt += '<p>' + $('#nudo_cuento').val() + '</p><br/>';
        html_txt += '<p class="titulo_para_txt"><b>Ending:</b></p><br/>';
        html_txt += '<p>' + $('#desenlace_cuento').val() + '</p><br/>';
        html_txt += '</div>';
        html_txt += '</div>';
    }
    activar_contenedor('cont_resultados');
    parar_cuenta_regresiva();
    $('#txt_pagina_resultados').html('');
    $('.resultados_preguntas').css('display', 'block');
    $('.resultados_preguntas').html(html_txt);
    $('.cont_reintentar').css('display', 'none');
}
/*FIN FUNCIONES PUNTUALES ACTIVIDAD*/

/*DE ACA EN ADELANTE ESTAN LAS FUNCIONES GENERICAS*/

function mostrar_mensaje_de_informacion(mensaje_a_mostrar) {
    $('#cont_mensaje_interno_txt').html(mensaje_a_mostrar);
    $('#ahogado_actividad').css('display', 'none');
    $('#cont_mensaje_interno').fadeIn(1500);
}
function ocultar_mensaje_de_informacion() {
    $('#ahogado_actividad').css('display', 'block');
    $('#cont_mensaje_interno').css('display', 'none');
}
function reintentar() {
    preguntas_realizadas = new Array();
    $('#cont_puntos').html("0");
    puntaje_actual = "0";
    intento_actual++;
    inicializar_actividad();
}

function activar_estrella(num_pregunta, estado) {
    var obj_pregunta = $('#pregunta_' + num_pregunta);
    var imagen = '../assets/img/estrella_exito.png';
    var titulo = "CORRECT";
    if (estado === 'fallo') {
        imagen = '../assets/img/estrella_fallo.png';
        titulo = "INCORRECT";
    } else {
        preguntas_json.preguntas[pregunta_actual - 1].correcta = 'si';
    }
    preguntas_realizadas.push(preguntas_json.preguntas[pregunta_actual - 1]);
    obj_pregunta.fadeOut(500, function () {
        obj_pregunta.attr("src", imagen);
        obj_pregunta.attr("title", titulo);
        obj_pregunta.fadeIn(500);
    });
}

function inicializa_iconos_preguntas() {
    var html_txt = '';
    for (var i = 1; i <= parseInt(numero_de_preguntas); i++) {
        html_txt += '<div class="pregunta_' + i + '"><img title="QUESTION ' + i + '" id="pregunta_' + i + '" src="../assets/img/estrella_turno_actual.png" alt="Icono"/></div>';
    }
    $('.preguntas').html(html_txt);
}

function activar_contenedor(contenedor) {
    if (contenedor === 'cont_actividad') {
        $('#cont_actividad').fadeIn(1000);
        $('#inicio_actividad').fadeOut(1000);
        $('#cont_resultados').fadeOut(1000);
    } else if (contenedor === 'inicio_actividad') {
        $('#cont_actividad').fadeOut(1000);
        $('#inicio_actividad').fadeIn(1000);
        $('#cont_resultados').fadeOut(1000);
    } else if (contenedor === 'cont_resultados') {
        $('#cont_actividad').fadeOut(1000);
        $('#inicio_actividad').fadeOut(1000);
        $('#cont_resultados').fadeIn(1000);
    } else {
        console.log('ERROR GARRAFAL. NO LLEGO TIPO DE CONTENEDOR. CONTACTE AL PROVEEDOR DEL SOFTWARE.');
        return false;
    }
}

function armar_resultados() {
    console.log((numero_de_intentos - intento_actual));
    $('.resultados_preguntas').css('display', 'none');
    if ((numero_de_intentos - intento_actual) > 1) {
        msg_intentos = "You have " + (numero_de_intentos - intento_actual) + " attempts left.";
        $('.cont_reintentar').css('display', 'block');
    } else if ((numero_de_intentos - intento_actual) === 1) {
        msg_intentos = "You have 1 try.";
        $('.cont_reintentar').css('display', 'block');
    } else {
        msg_intentos = "You have no further attempts.";
        $('.cont_reintentar').css('display', 'block');
        $('.btn_actividad').css('display', 'none');
        $('#txt_pagina_resultados').css('display', 'none');
    }
    $('#cantidad_intentos_restantes').html(msg_intentos);
    intento_actual++;
}

function calcular_resultados() {
    var html_txt = '';
    if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'memorando') {
        html_txt += '<div class="resultado_correo_memorando">';
        html_txt += '<div>';
        html_txt += '<p class="titulo_para_txt"><b>To:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].para + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Subject:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].asunto + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Message:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].mensaje + '</p><br/>';
        html_txt += '</div>';
        html_txt += '</div>';
    } else if (preguntas_json.preguntas[pregunta_actual - 1].tipo === 'email') {
        html_txt += '<div class="resultado_correo_memorando">';
        html_txt += '<div>';
        html_txt += '<p class="titulo_para_txt"><b>To:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].para + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Subject:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].asunto + '</p><br/>';
        html_txt += '<p class="titulo_asunto_txt"><b>Message:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].mensaje + '</p><br/>';
        html_txt += '</div>';
        html_txt += '</div>';
    } else if (preguntas_json.preguntas[pregunta_actual - 1].pregunta === 'cuento') {
        html_txt += '<div class="resultado_cuento_area_texto">';
        html_txt += '<div>';
        html_txt += '<p class="titulo_para_txt"><b>Introduction:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].para + '</p><br/>';
        html_txt += '<p class="titulo_para_txt"><b>Knot:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].asunto + '</p><br/>';
        html_txt += '<p class="titulo_para_txt"><b>Ending:</b></p><br/>';
        html_txt += '<p>' + mis_respuestas[0].mensaje + '</p><br/>';
        html_txt += '</div>';
        html_txt += '</div>';
    }
    return html_txt;
}

function perdio_por_tiempo() {
    activar_contenedor('cont_resultados');
    armar_resultados();
}

/*INICIO FUNCIONES DEL CRONOMETRO*/
function activar_cronometro() {
    if (control_de_tiempo > 0) {
        $('.tiempo_actividad').css('display', 'block');
        inicio_cuenta_regresiva(control_de_tiempo);
    } else {
        $('.tiempo_actividad').css('display', 'none');
    }
}
function inicio_cuenta_regresiva(control_de_tiempo) {
    if (typeof control !== 'undefined') {
        reinicio_cuenta_regresiva(control_de_tiempo);
    } else {
        segundos = control_de_tiempo;
        control = setInterval(cuenta_regresiva, 1000);
    }
}
function parar_cuenta_regresiva() {
    if (control_de_tiempo > 0) {
        clearInterval(control);
    }
}
function reinicio_cuenta_regresiva(control_de_tiempo) {
    clearInterval(control);
    segundos = control_de_tiempo;
    $('#cont_segundos').html(segundos);
    control = setInterval(cuenta_regresiva, 1000);
}
function cuenta_regresiva() {
    $('#cont_segundos').html(segundos);
    if (segundos === 0) {
        parar_cuenta_regresiva();
        perdio_por_tiempo();
    } else {
        segundos--;
    }
}
/*FIN FUNCIONES DEL CRONOMETRO*/

Array.prototype.mezclar_preguntas = function () {
    var m = this.length - 1;
    for (var i = m; i > 1; i--) {
        var alea = Math.floor(i * Math.random());
        var temp = this[i];
        this[i] = this[alea];
        this[alea] = temp;
    }
};
Array.prototype.mezclar_respuestas = function () {
    var m = this.length - 1;
    for (var i = m; i > 1; i--) {
        var alea = Math.floor(i * Math.random());
        var temp = this[i];
        this[i] = this[alea];
        this[alea] = temp;
    }
};
$(window).load(setTimeout(inicializar_reglas_actividad(), 1000));