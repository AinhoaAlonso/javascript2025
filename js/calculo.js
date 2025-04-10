//Función que nos calcula hasta que número se puede sumar sin que la suma supere 1000
function sumaDeNumeros(){
    let numeroMaximo = 1000;
    let totalSuma = 0;
    let contador = 1
    while(totalSuma<numeroMaximo){
        totalSuma = totalSuma + contador;
        contador = contador + 1;
    }
    let resultadoSuma = document.getElementById("resultado");
    resultadoSuma.innerHTML = contador;
    console.log(contador);
}