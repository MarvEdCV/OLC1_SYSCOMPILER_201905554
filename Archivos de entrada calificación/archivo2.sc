//!Se cambio el start with para abajo...
//!Se arreglo lo de los simbolos de las potencias...
void FactorialIterativo(int n2){
    writeline("==============Para Calificar Ciclos=============");
    writeline("----------------CICLO WHILE Y FOR---------------");

    int numeroFactorial = n2;
    while (numeroFactorial > -1) {
        mostrarFactorial(numeroFactorial);
        numeroFactorial--;
    }
    writeline("------------------------------------------------");
    SentenciasAnidadas();
    writeline("======================================");
}



void Principal(){
    writeline("***************ARCHIVO 2**************");
    writeline("VALOR: 15 PTS");
    FactorialIterativo(10);
    RecursividadBasica();
    multiPlicacionPorSumas(7,9);
    writeline("**************************************");
}


void mostrarFactorial(int n2){
    int fact = 1;
    string cadena1 = "El factorial de: " + n2 + " = ";
    if (n2 != 0) {
        for (int i = n2; i > 0; i--) {
            fact = fact * i;
            cadena1 = cadena1 + i;
            if (i > 1) {
                cadena1 = cadena1 + " * ";

            } else {
                cadena1 = cadena1 + " = ";
            }
        }
    }
    cadena1 = cadena1 + fact;
    writeline(cadena1);
}

void SentenciasAnidadas(){
    writeline("-----------------CICLO DO WHILE-----------------");
    int numero1 = 0;
    writeline("-------------------SWITCH CASE------------------");
    do {
        switch (numero1) {
            case 0:
                figura0(8);
                break;
            case 1:
                figura1(10);
                break;
            case 2:
                figura2();
                writeline("");
                break;
            case 3:
                ciclosContinueBreak();
                writeline("");
                break;
            default:
                writeline("Esto se va a imprimir 2 veces :3");
        }
        numero1 = numero1 + 1;
    } while (numero1 < 6);
    writeline("------------------------------------------------");
}

void figura0(int numero){
    writeline("-----------------WHILE ANIDADO------------------");
    int i = 0;
    while (i < numero) {
        int j = 0;
        int numeroMostrar = 1;
        string unaFila = "";
        while (j <= i) {
            unaFila = unaFila + " " + numeroMostrar;
            numeroMostrar = numeroMostrar + 1;
            j = j + 1;
        }
        writeline(unaFila);
        i = i + 1;
    }
    writeline("Si la figura es un triangulo de numeros + 5 :3");
    writeline("------------------------------------------------");
}

void figura1(int n){

    string cadenaFigura = "";
    //! se cambia el tipo.
    double i;
    for (i = -3 * n / 2; i <= n; i++) {
        cadenaFigura = "";
        double j;
        for (j = -3 * n / 2; j <= 3 * n / 2; j++) {

            double absolutoi;
            absolutoi = i;
            double absolutoj;
            absolutoj = j;
            if (i < 0) {
                absolutoi = i * -1;
            }
            if (j < 0) {
                absolutoj = j * -1;
            }
            if ((absolutoi + absolutoj < n)
                || ((-n / 2 - i) * (-n / 2 - i) + (n / 2 - j) * (n / 2 - j) <= n * n / 2)
                || ((-n / 2 - i) * (-n / 2 - i) + (-n / 2 - j) * (-n / 2 - j) <= n * n / 2)) {
                cadenaFigura = cadenaFigura + "* ";
            }
            else {
                cadenaFigura = cadenaFigura + ". ";
            }
        }
        writeline(cadenaFigura);
    }
    writeline("Si la figura es un corazon +10 <3");
}

void figura2(){
    string cadenaFigura = "";
    string c = "* ";
    string b = "  ";
    int altura = 10;
    int ancho = 1;
    for (int i = 0; i < altura / 4; i++) {
        for (int k = 0; k < altura - i; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i * 2 + ancho; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        writeline(cadenaFigura);
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int ii = 0; ii < altura / 4; ii++) {
        for (int k = 0; k < (altura - ii) - 2; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < ii * 2 + 5; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        writeline(cadenaFigura);
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int ix = 0; ix < altura / 4; ix++) {
        for (int k = 0; k < (altura - ix) - 4; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < ix * 2 + 9; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        writeline(cadenaFigura);
        cadenaFigura = "";
    }

    cadenaFigura = "";
    for (int ia = 0; ia < altura / 4; ia++) {
        for (int k = 0; k < (altura - ia) - 6; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < ia * 2 + 13; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        writeline(cadenaFigura);
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int iz = 0; iz < altura / 4; iz++) {
        for (int k = 0; k < altura - 2; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < 5; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        writeline(cadenaFigura);
        cadenaFigura = "";
    }

    writeline("Si la figura es un Arbol +10 <3");

}

void ciclosContinueBreak(){
    writeline("============Validar Continue y Break===========");
    int i = 0;

    while (i < 10) { //repetir 10 veces
        int j = i;
        if (i != 7 && i != 5) {
            while (!(j <= 0)) {
                j = j - 2;
            }
            if (j == 0) {
                writeline("El numero: " + i + " es par");
            } else if (j != 0) {
                writeline("El numero: " + i + " es impar");

            }
        } else {
            if (i == 7) {

                writeline("Hay un break para el numero 7 :3");
                break;
                writeline("Esto no deberia imprimirse por el continue :/");
            } else if (i == 5) {
                writeline("me voy a saltar el 5 porque hay un continue :3");
                i = i + 1;
                continue;
            }
        }
        i = i + 1;

    }
    if (i == 7) {
        writeline("Si el ultimo numero impreso es un 7, tienes un +5 :D");

    } else {
        writeline("No funciona tu Break o Continue, perdiste 5 puntos :(");
    }
    writeline("======================================");
    //h=55$

}

double r_toRadians;
double r_sine;

void toRadians(double angle){
    r_toRadians = angle * 3.141592653589793 / 180;
}

void sine(double x){
    double sin = 0.0;
    int fact;
    for (int i = 1; i <= 10; i++) {
        fact = 1;
        for (int j = 1; j <= 2 * i - 1; j++) {
            fact = fact * j;
        }
        sin = sin + ((x ^ (2 * i - 1)) / fact);

    }
    r_sine = sin;
}

void drawTree(double x1, double y1, double angle, int depth) {
    if (depth != 0) {
        toRadians(angle);
        sine(3.141592653589793 / 2 + r_toRadians);
        double x2 = x1 + (r_sine * depth * 10.0);
        toRadians(angle);
        sine(r_toRadians);
        double y2 = y1 + (r_sine * depth * 10.0);
        writeline(x1 + " " + y1 + " " + x2 + " " + y2 + "");
        drawTree(x2, y2, angle - 20, depth - 1);
        drawTree(x2, y2, angle + 20, depth - 1);
    }

}

void RecursividadBasica() {
    writeline("===============RECURSIVIDAD BASICA=================");
    drawTree(250.0, 500.0, -90.0, 4);
    writeline("======================= FIN =======================");
}

void multiPlicacionPorSumas(int m, int n){
    writeline("===============MULTIPLICACION POR SUMAS==============");
    int mul = 0;
    //Establecemos condición de que (m y n) no sean cero.
    if ((m != 0) && (n != 0)) {
        //Utilizamos un for para ejecutar el ciclo de sumas.
        for (int i = 0; i < n-1; i++) {
            // += representa (mul = mul + m), solo acorta lo anterior.
            mul = mul + m;
            writeline(mul);
        }
    }
    //Retornamos el resultado.
    //Si m o n es cero, retornará cero.
    writeline(m + "x" + n + " = " + mul);
    writeline("========================= FIN =======================");
}

start with Principal();

