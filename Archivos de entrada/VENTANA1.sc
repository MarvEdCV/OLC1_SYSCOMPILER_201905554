int suma(int par1, int par2){
    int resultado = par1 + par2;
    return resultado;
}

int resta(int par1, int par2){
    int resultado = par1 - par2;
    return resultado;
}

int multiplicacion(int par1, int par2){
    int resultado = par1 * par2;
    return resultado;
}

int division(int par1, int par2){
    double resultado = par1 / par2;
    return resultado;
}

int potencia(int par1, int par2){
    int resultado = par1 ˆ par2;
    return resultado;
}

int modulo(int par1, int par2){
    double resultado = par1 % par2;
    return resultado;
}

void main(){
    int opcion = 6;
    if(opcion == 1){
        WriteLine(suma(5,5));
    }else if(opcion == 2){
        WriteLine(resta(5,5));
    }else if(opcion == 3){
        WriteLine(multiplicacion(5,5));
    }else if(opcion == 4){
        WriteLine(division(5,5));
    }else if(opcion == 5){
        WriteLine(potencia(5,5));
    }else{
        WriteLine(modulo(6,5));
    }
}

start with main();





