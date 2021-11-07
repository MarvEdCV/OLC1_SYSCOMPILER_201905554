void Archivo3(){
    writeline("====================ARCHIVO 3====================");
    writeline("**************SECCION DE VECTORES****************");
    writeline("---Vector Desordenado---");
    imprimirVector(vectorNumeros);
    BubbleSort(vectorNumeros);
    writeline("-----Vector Ordenado----");
    imprimirVector(vectorNumeros);
    writeline("************FIN DE SECCION VECTORES***************");
    writeline("****************SECCION DE LISTAS****************");
    //agregamos valores a la lista
    agregarValorLista(")");
    agregarValorLista(":");
    agregarValorLista(" ");
    agregarValorLista("1");
    agregarValorLista("I");
    agregarValorLista("P");
    agregarValorLista("M");
    agregarValorLista("O");
    agregarValorLista("C");
    agregarValorLista(" ");
    agregarValorLista("E");
    agregarValorLista("L");
    agregarValorLista("A");
    agregarValorLista("S");
    agregarValorLista(" ");
    agregarValorLista("I");
    agregarValorLista("S");
    imprimirLista(frase);
    writeline("El mensaje es:");
    writeline(mensajeVolteado(frase));
    writeline("************FIN DE SECCION DE LISTAS**************");
    writeline("**************SECCION DE CASTEOS***************");
    Casteos();
    writeline("************FIN DE SECCION DE CASTEOS*************");
    writeline("**************SECCION DE NATIVAS***************");
    FuncionesEspecialesNativas();
    writeline("************FIN DE SECCION DE NATIVAS*************");
    writeline("***********SECCION DE RECURSIVIDAD***************");
    writeline("---------------FUNCION FIBONACCI-----------------");
    imprimir_fibonacci(20);
    writeline("-------------------------------------------------");
    writeline("---------------FUNCION PAR-IMPAR-----------------");
    ParoImpar(71);
    writeline("-------------------------------------------------");
    writeline("----------------TORRES DE HANOI------------------");
    int discos = 3;
    int origen = 1;
    int auxiliar = 2;
    int destino = 3;
    Hanoi(discos, origen, auxiliar, destino);
    writeline("-------------------------------------------------");
    writeline("---------------FUNCION ACKERMANN-----------------");
    int m = 3;
    int n = 4;
    writeline("Funcion de Ackerman (" + m + ", " + n + ") = " + ackerman(m, n));
    //writeline("Funcion de Ackerman Puntos Menos (" + m + ", " + n + ") = " + ackermanPuntosMenos(m, n));
    writeline("-------------------------------------------------");
    writeline("*************FIN DE RECURSIVIDAD*****************");
    writeline("=================================================");
}

void Casteos(){
    writeline("int a "+typeof((double) 1789));
    writeline("double a "+ typeof((int) 258.2));
    writeline("char  a "+ typeof((double) 'F'));
    writeline("int a "+typeof((char) 98));
    writeline("double a "+typeof(toString(2589.97)));
}

void FuncionesEspecialesNativas(){
    writeline("------------------LENGTH-------------------");
    writeline("vectorNumero es de "+length(vectorNumeros)+" elementos");
    writeline("La lista frase tiene "+length(frase)+" elementos");
    int a = 15;
    writeline("------------------TOLOWER-------------------");
    writeline("SIN TOLOWER");
    writeline(toLower("CON TOLOWER"));
    writeline("------------------TOUPPER-------------------");
    writeline("sin toupper");
    writeline(toUpper("con toupper"));
    writeline("------------------TRUNCATE------------------");
    double b=17.8;
    writeline("sin truncate: "+b);
    b=truncate(b);
    writeline("con truncate "+b);
    writeline("------------------ROUND-------------------");
    double c=26.5;
    writeline("sin round: "+c);
    c=round(c);
    writeline("con round "+c);
    double cc=26.4;
    writeline("sin round: "+cc);
    cc=round(cc);
    writeline("con round "+cc);
    writeline("-----------------TYPEOF--------------------");
    string x="soy una cadena";
    int y = 50;
    double z = 78.5;
    char xx = 'a';
    boolean yy = true;
    writeline("tipo: "+typeof(x));
    writeline("tipo: "+typeof(y));
    writeline("tipo: "+typeof(z));
    writeline("tipo: "+typeof(xx));
    writeline("tipo: "+typeof(yy));
    writeline("------------------LENGTH-------------------");
    string cadena="soy una cadena";
    writeline("tamaño: "+length(cadena));
    writeline("------------------TOSTRING-------------------");
    int numero=105;
    writeline("tipo: "+typeof(numero));
    writeline("tipo: "+typeof(toString(numero)));
    writeline("----------------TOCHARARRAY------------------");
    dynamiclist<char> listaChar = toCharArray("SOY UNA LISTA");
    writeline("########imprimiendo lista de caracteres#######");
    imprimirListaChar(listaChar);
}

void imprimirListaChar(dynamiclist<char> miLista){
    for (int i = 0; i < length(miLista); i++) {
        writeline("listaChar[[" + i + "]] = " + getValue(miLista,i));
    }
}

void imprimir_fibonacci(int valor) {
    writeline("Resultado de fibonacci(" + valor + ") = " + fibonacci(valor));
}

int fibonacci(int n) {
    if (n > 1) {
        return fibonacci(n - 1) + fibonacci(n - 2);
    } else if (n == 1) {
        return 1;
    } else if (n == 0) {
        return 0;
    } else {
        writeline("error");
        return 0;
    }
}
start with Archivo3();