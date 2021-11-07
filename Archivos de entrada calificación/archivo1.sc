// !Se cambiaron todos los simbolos ˆ por ^ que se utilizó para la gramática
// !Se cambio el Start With hasta abajo ya que no especificaba que podía venir en cualquier parte del código.
int var1 = 1;
int punteo = 0;
void InicioArchivo1() {
    writeline("-----------------CALIFICACION ARCHIVO 1-----------------");
    writeline("Valor: 15 pts");
    writeline("--------------------------------------------------------");
    // !Se comento la declaración, ya que tengo validado el no poder declarar variables iguales en el mismo ambito.
    /*int*/ var1 = 0;
    //Verificar ambitos, se toma con prioridad la variable local ante la global.
    if (var1 != 0) {
        writeline("No se toma con prioridad la variable local ante la global");
        writeline("Perdiste 8 puntos :c");
    }
    else {
        punteo = punteo + 8;
        writeline("Muy bien, prioridad de variable local correcta");
        writeline("Haz sumado 8 puntos");
        writeline("Punteo = " + punteo);
    }

    //Sección de declaracion de variables
    Declaracion();
    //seccion de manejo de Ámbitos 2
    int amb1 = 3;
    Ambitos2();

    //Sección de expresiones aritméticas
    Aritmeticas();

    //Seccion de expresiones lógicas
    Logicas();

    //Seccion de expresiones relacionales
    Relacionales();

    //punteo final
    writeline("Punteo Final: " + punteo);
    double resultado = (punteo*15)/100;
    writeline("-----------------------------------");
    writeline("|   RESULTADO ARCHIVO 1 = " + resultado +" pts  |");
    writeline("-----------------------------------");

}

void Declaracion(){
    /*  SALIDA ESPERADA:
            ========= Metodo Declaracion =========
            Voy a ganar Compiladores 1 :D
            ======================================
    */
    writeline("========= Metodo Declaracion =========");
    int n1 = 1;
    int n2 = 1;
    int n3 = 1;
    int n4 = 1;
    string str1 = "Voy a ganar Compiladores";
    string str2 = "Voy a ganar Compiladores";
    string str3 = "Voy a ganar Compiladores";
    string str4 = "Voy a ganar Compiladores";
    double db1 = 0.0;
    double db2 = 0.0;
    double db3 = 0.0;
    double db4 = 0.0;
    char chr1 = 's';
    char chr2 = 's';
    char chr3 = 's';
    char chr4 = 's';
    //si n modificar la asignaci?n
    if (db1 == db4) {
        writeline(str1 + chr2 + " " + n3 + " :D");
        punteo = punteo + 6;
        writeline("Declaración correcta");
        writeline("Haz sumado 6 puntos");
    } else {
        writeline("Problemas en el metodo declaracion :(");
        writeline("Perdiste 6 pts :(");
    }
    writeline("--------------------------------------");
    writeline("Punteo = " + punteo);
    writeline("======================================");
}

void Ambitos2(){
    //Ambito local                                                                                                           //aca hay un error semantico amb1 //no existe   |F:64 C18|
    string amb1 = "Desde ambito2";
    writeline("==============Ambitos 2===============");
    if (amb1 == "Desde ambito2") {
        writeline(amb1);
        punteo = punteo + 8;
    }
    else {
        writeline("Tienes un error al manejar la variable amb1 :(");
        writeline("Perdiste 8 puntos");
    }
    writeline("Punteo = " + punteo);
    writeline("======================================");
}

void Aritmeticas(){
    //suma de strings con caracteres
    /* SALIDA ESPERADA
    ==============Aritmeticas=============
    Hola COMPI
    El valor de  n1 = 52.1
    El valor de n3 = 70.0
    -Operaciones Basicas: valor esperado:   a)62   b)0   c)-19   d)256   resultados>
    a) 62
    b) 0
    c) -19
    d) 256
    ======================================
    */
    writeline("==============Aritmeticas=============");
    string art1 = "Hola " + 'C' + "" + 'O' + "" + 'M' + "" + 'P' + "" + 'I';
    writeline(art1);
    if (art1 == "Hola COMPI") {
        punteo = punteo + 6;
    } else {
        writeline("Perdiste 6 puntos en suma de cadena y caracter :c");
    }

    double n1 = 0.0 + true + true + 1 + 0.1 + '1';
    writeline("El valor de  n1 = " + n1);
    if (n1 == 52.1) {
        punteo = punteo + 6;
    } else {
        writeline("Perdiste 6 puntos en suma de enteros booleanos y caracteres :c");
    }

    int n2 = '2' - 1 - '1';
    if (n2 == 0) {
        punteo = punteo + 5;
    } else {
        writeline("Perdiste 5 puntos en la resta de caracteres :c");
    }

    double n4 = (5750 * 2) - 11800 + 1.0;
    double n3 = (((3 * 3) + 4) - 80 + 40.00 * 2 + 358.50 - (29 / 14.50)) - (0.50) + n4;
    writeline("El valor de n3 = " + n3);
    if (n3 == 70.0) {
        punteo = punteo + 6;
    }
    else {
        writeline("Perdiste 6 puntos :c ");
    }

    operacionesBasicas();
    operacionesAvanzadas();
    writeline("Punteo = " + punteo);
    writeline("======================================");

}

void operacionesBasicas(){
    writeline("Operaciones Aritmeticas 1: valor esperado:   a)62   b)0   c)-19   d)256   resultados>");
    /* !Se cambiaron todas estas declaraciones a DOUBLE ya que no se les puede asignar un valor distinto al
       ! de su tipo declarado
    */
    double a;
    a = (20 - 10 + 8 / 2 * 3 + 10 - 10 - 10 + 50);
    double b;
    b = (50 / 50 * 50 + 50 - 100 + 100 - 100);
    double c;
    c = (100 / 20 * 9 - 78 + 6 - 7 + 8 - 7 + 7 * 1 * 2 * 3 / 3);
    double d;
    d = (2 ^ (20 / 5 * 2));
    writeline("a) " + a);
    writeline("b) " + b);
    writeline("c) " + c);
    writeline("d) " + d);
    if (a == 62 && b == 0 && c == -19 && d == 256) {
        writeline("Operaciones aritmeticas 1 bien :D");
        punteo = punteo + 8;
    } else {
        writeline("Error para las operaciones basicas :(");
    }
}

void operacionesAvanzadas(){
    int aritmetica1 = 2;
    int aritmetica2 = 0-10;
    writeline("Operaciones Aritmeticas 2: valor esperado>-20  41 \nresultado>");
    int aritmetica3 = aritmetica2 * aritmetica1;
    writeline(aritmetica3 + "");
    // !Se declaro double la variable temporal ya que por las divisiones da un retorno Type.Double y genera conflicto.
    double temporal = aritmetica3 / aritmetica1 + 50 ^ 2 / 50 + 50 * 2 - 100 + 100 / 100 - 0;
    //aritmetica1 = aritmetica3 / aritmetica1 + 50 ^ 2 / 50 + 50 * 2 - 100 + 100 / 100 - 0;
    writeline(temporal + "");
    if (aritmetica3 == -20 && temporal == 41) {
        writeline("Operaciones aritmeticas 2 bien :D");
        punteo = punteo + 8;
    } else {
        writeline("Error Operaciones Aritmeticas");
    }
}

void Logicas(){
    writeline("==============Logicas1=============");
    if (!!!!!!!!!!!!!!!!!!true) {
        punteo = punteo + 1;
        writeline("Bien primera condicion:)");
    } else {
        writeline("Perdiste 1 punto :c");
    }

    if (((true && true) || ((false && false) && (false == true))) || (!true)) {
        punteo = punteo + 5;
        writeline("Bien segunda condicion:)");
    } else {
        writeline("Perdiste 5 puntos :c");
    }
    writeline("======================================");
    Logicas2();
    writeline("--------------------------------------");
    writeline("Punteo = " + punteo);
    writeline("--------------------------------------");
}

void Logicas2(){
    int n0 = 16;
    writeline("==============Logicas2=============");

    if (!(!(n0 == 16 && false == true) && !(true))) {
        writeline("Not y Ands Correctos");
        punteo = punteo + 5;

    } else {
        writeline("No funcionan nots y ands :(");
    }
    // !Se cambia de int a double por la misma razon anterior
    double n1;
    n1 = n0 / 16;
    n1 = n1 + true;
    boolean condicion1 = n1 != 2; //esto es falso
    double aritmetica1 = n0 / 16 + ((!(true || false))); // aritmetica1 = 0
    boolean condicion2 = aritmetica1 == n1; //falso
    boolean condicion3 = !true; //falso

    if (!(!(!(condicion1 || condicion2) || condicion3))) {
        writeline("Nots y Ors correctos");
        punteo = punteo + 5;
    } else {
        writeline("No Funciona nots y ands :(");
    }
    writeline("======================================");

    Logicas3(n0);
}

void Logicas3(int n0){
    //Hacer lo mismo que logicas2 pero con nands y nors
    writeline("==============Logicas3=============");

    if (!(!(n0 == 16 && false == true) && !(true))) {
        writeline("NANDS Correctos");
        punteo = punteo + 5;

    } else {
        writeline("No funcionan NANDS :(");
    }

    double n1;
    n1 = n0 / 16;
    n1 = n1 + true;
    boolean condicion1 = false; //esto es falso
    double aritmetica1;
    aritmetica1 = n0 / 16 + ((!(true || false))); // aritmetica1 = 0
    boolean condicion2 = false; //falso
    boolean condicion3 = true; //verdadero

    if (!(!(!(condicion1 || condicion2) || condicion3))) {
        writeline("NORS correectos");
        punteo = punteo + 3;
    } else {
        writeline("No Funcionan NORS :(");
    }

    writeline("======================================");
}

void Relacionales(){
    int n0 = 34;
    int n1 = 16;

    relaciones1(n0);
    relaciones2(n1);
}

void relaciones1(int salida)
{
    
    writeline("==============relacionales1=============");
    double n0 = salida + 0.0;
    if (n0 < 34.44) {
        salida = salida + 15;
        if (salida > 44) {
            salida = salida++;

        }
    }
    else {
        salida = 1;
    }
    if (salida != 1) {
        if (salida == 50) {
            writeline("Salida Correcta Relacionales 1!");
            punteo = punteo + 10;
        }
        else {
            writeline("Salida incorrecta!!");
        }
    }
    else {
        writeline("Salida incorrecta!!");
    }
    writeline("======================================");
}

void relaciones2(int n0){
    writeline("vas bien, animo :D");

    writeline("============Relacionales2=============");


    if(10 - 15 >= 0 && 44.44 == 44.44)
    {

        writeline("Salida incorrecta primer Si relacionales2!!");

    }

    else {

        if(15 + 8 == 22 - 10 + 5 * 3 - 4 && 13 * 0 > -1)

        {

            if(10.0 != 11.0 - 1.01)

            {

                writeline("Salida CORRECTA en relacionales2!!");
                punteo = punteo + 5;
            }

            else {

                writeline("Salida incorrecta segundo Si relacionales 2!!");

            }



        }

        else {

            if(1 == 1)

            {

                writeline("Salida incorrecta relacionales 2 3er si !!");

            }

            else {

                writeline("Salida incorrecta relacionales 2 Sino3er si !!");

            }



        }



    }
    writeline("======================================");

}
start with InicioArchivo1();