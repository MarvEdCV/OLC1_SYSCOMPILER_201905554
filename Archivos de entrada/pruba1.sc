int a=5;
double b=6;
boolean c=true;
boolean d=false;
char e='a';
string f="string";
WriteLine(a);
WriteLine(b);
WriteLine(c);
WriteLine(d);
WriteLine(e);
WriteLine(f);
/*
***OPERACIONES***
*/
//SUMAS
/*
Sumas Con enteros
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a+a);//5+5=10
WriteLine(b+a);//6+5=11
WriteLine(c+a);//true+5=6
WriteLine(e+a);//97+5=102
WriteLine(f+a);//string+5=string5
/*
Sumas Con DOUBLES
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a+b);//5+6=11
WriteLine(b+b);//6+6=12
WriteLine(c+b);//true+6=7
WriteLine(e+b);//97+6=103
WriteLine(f+b);//string+6=string6
/*
Sumas Con BOOLEAN
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a+c);//5+true=11
WriteLine(b+c);//6+true=12
//WriteLine(c+c);//true+true=ERROR
//WriteLine(e+c);//97+true=ERROR
WriteLine(f+c);//string+true=stringtrue
/*
Sumas Con CARACTER
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a+e);//5+97=102
WriteLine(b+e);//6+97=103
//WriteLine(c+e);//true+97=ERROR
WriteLine(e+e);//a+a=aa
WriteLine(f+e);//string+a=stringa
/*
Sumas Con CADENA
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a+f);//5+string=5string
WriteLine(b+f);//6+string=6string
WriteLine(c+f);//true+string=truestring
WriteLine(e+f);//a+string=astring
WriteLine(f+f);//string+a=stringstring


/*
***OPERACIONES***
*/
//RESTAS
/*
Restas Con enteros
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a-a);//5-5=0
WriteLine(b-a);//6-5=1
WriteLine(c-a);//true-5=-5
WriteLine(e-a);//97-5=92
//WriteLine(f-a);//string-5=ERROR
/*
Restas Con DOUBLES
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a-b);//5-6=-1
WriteLine(b-b);//6-6=0
WriteLine(c-b);//true-6=-5
WriteLine(e-b);//97-6=91
//WriteLine(f-a);//string-6=ERROR
/*
Restas Con BOOLEAN
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a-c);//5-true=11
WriteLine(b-c);//6-true=5
//WriteLine(c-c);//true-true=ERROR
//WriteLine(e-c);//97-true=ERROR
//WriteLine(f-c);//string-true=ERROR
/*
Restas Con CARACTER
*/
WriteLine("--ESPACIOOOOO--");
WriteLine(a-e);//5-97=-92
WriteLine(b-e);//6-97=-91
//WriteLine(c-e);//true-97=ERROR
//WriteLine(e-e);//a-a=ERROR
//WriteLine(f-e);//string-a=ERROR
/*
Restas Con CADENA
*/
//WriteLine("--ESPACIOOOOO--");
//WriteLine(a-f);//5-string=ERROR
//WriteLine(b-f);//6-string=ERROR
//WriteLine(c-f);//true-string=ERROR
//WriteLine(e-f);//a-string=ERROR
//WriteLine(f-f);//string-a=ERROR