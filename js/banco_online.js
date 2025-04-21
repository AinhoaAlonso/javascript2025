let usuarioBanco = {
    "nombre" : "",
    "ingresoInicial" : 0,
    movimientos : [],
    "saldoActual": 0
};

function limpiarMensajes() {
    document.getElementById("errorIngresoMenorIgualCero").innerHTML = "";
    document.getElementById("mensajeDescubierto").innerHTML = "";
}

function ingresarDineroAlAbrirCuenta(){
    usuarioBanco.nombre = document.getElementById("nombre-usuario-banco-input").value;
    usuarioBanco.ingresoInicial = parseFloat(document.getElementById("ingreso-inicial-input").value);
    if(isNaN(usuarioBanco.ingresoInicial) || usuarioBanco.ingresoInicial <= 0){
        document.getElementById("errorIngresoMenorIgualCero").innerHTML = "No se puede hacer un ingreso igual o menor a 0€"
    } else{
        usuarioBanco.saldoActual = usuarioBanco.ingresoInicial;
        limpiarMensajes();

        // Solo lo guarda si no hay movimientos anteriores
        if(usuarioBanco.movimientos.length === 0){
            usuarioBanco.movimientos.push({
                "descripcion": "Ingreso inicial",
                "cantidad": usuarioBanco.ingresoInicial,
                "fecha": new Date().toLocaleDateString()
            });
        }
    }
    console.log("Cuenta creada", usuarioBanco);
}

function ingresarDinero(){
    let nuevoIngreso = parseFloat(document.getElementById("cantidad-input").value);
    if (isNaN(nuevoIngreso) || nuevoIngreso <= 0) {
        document.getElementById("errorIngresoMenorIgualCero").innerHTML = "Ingresa una cantidad válida mayor a 0€";
        return;
    } 
    usuarioBanco.movimientos.push({
        "descripcion": "Ingreso",
        "cantidad": nuevoIngreso,
        "fecha": new Date().toLocaleDateString()
    });
    usuarioBanco.saldoActual += nuevoIngreso;
    limpiarMensajes();
    document.getElementById("cantidad-input").value = "";
    console.log("Nuevo saldo tras ingreso", usuarioBanco);

}

function extraerDinero(){
    limpiarMensajes();
    let sacarDinero = parseFloat(document.getElementById("cantidad-input").value);
    if(isNaN(sacarDinero) || sacarDinero <=0){
        document.getElementById("errorIngresoMenorIgualCero").innerHTML = "Extraer una cantidad valida mayor a 0€";
        return;
    } 
    if(sacarDinero > usuarioBanco.saldoActual){
        document.getElementById("mensajeDescubierto").innerHTML = "Este movimiento va a dejar tu cuenta al descubierto.";
    }
    usuarioBanco.movimientos.push({
        "descripcion": "Extracción",
        "cantidad": -sacarDinero,
        "fecha": new Date().toLocaleDateString()
    });
    
    usuarioBanco.saldoActual -= sacarDinero;
    
    document.getElementById("cantidad-input").value = "";
    console.log("Nuevo saldo tras extraccion", usuarioBanco);
}

function mostrarSaldoMovimientos(){
    const saludoBienvenida = `Bienvenido/a ${usuarioBanco.nombre} <br>`;
    document.getElementById("saludo-bienvenida").innerHTML = saludoBienvenida;

    const saldoActualElemento = document.getElementById("saldo-actual");
    saldoActualElemento.innerHTML = `Saldo ${usuarioBanco.saldoActual} €`;
    if (usuarioBanco.saldoActual >= 0) {
        saldoActualElemento.className = 'saldo-positivo';
    } else {
        saldoActualElemento.className = 'saldo-negativo';
    }

    let listadoMovimientos = "";

    for (let movimiento of usuarioBanco.movimientos) {
        let cantidadFormateada = movimiento.cantidad >= 0 ? `+${movimiento.cantidad}` : `${movimiento.cantidad}`;
        listadoMovimientos += `${movimiento.fecha} ${movimiento.descripcion}: ${cantidadFormateada}€<br>`;  
    }
    document.getElementById("movimientos").innerHTML = listadoMovimientos;
}
console.log(usuarioBanco);