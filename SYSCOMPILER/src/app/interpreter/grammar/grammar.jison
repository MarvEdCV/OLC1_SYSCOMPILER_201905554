%{
    const {Aritmetica,TipoAritmetica} = require('../Expresion/Aritmetica')
    const {Relacional,TipoRelacional} = require('../Expresion/Relacional')
    const {Literal,TipoLiteral} = require('../Expresion/Literal')
    const {Logica,TipoLogica} = require('../Expresion/Logica')
    const error_1 = require('../Error/Error')
        
    const {AccesoAmbito} = require('../Expresion/AccesoAmbito')
    const {Declaracion} = require('../Instruccion/Declaracion')
    const {WriteLine} = require('../Instruccion/WriteLine')
    const {Asignacion} = require('../Instruccion/Asignacion')
    const {AsignacionSinDeclaracion} = require('../Instruccion/AsignacionSinDeclaracion')
    const {Casteos} = require('../Instruccion/Casteos')
    const {IncrementoDecremento}=require('../Instruccion/IncrementoDecremento')
    const {If}=require('../Instruccion/If')
    const {Statement}=require('../Instruccion/Statement')
    const {Continue}=require('../Instruccion/Continue')
    const {Break}=require('../Instruccion/Break')
    const {While}=require('../Instruccion/While')
    const {Switch}=require('../Instruccion/Switch')
    const {DoWhile}=require('../Instruccion/DoWhile')
    const {For}=require('../Instruccion/For')
    const {Error}=require('../Error/Error')
    const {Metodo}=require('../Instruccion/Metodo')
    const {LlamadaMetodo}=require('../Instruccion/LlamadaMetodo')
    const {StartWith}=require('../Instruccion/StartWith')
    const {LowerOrUpper}=require('../Instruccion/LowerOrUpper')
%}

%lex

%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

//palabras reservadas

"true"                  return 'TRUE';
"false"                 return 'FALSE';
"writeline"             return 'WRITELINE';
"string"                return 'STRING';
"int"                   return 'INT';
"double"                return 'DOUBLE';
"boolean"               return 'BOOLEAN';
"char"                  return 'CHAR';
"if"                    return 'IF';
"else"                  return 'ELSE';
"while"                 return 'WHILE';
"do"                    return 'DO';
"break"                 return 'BREAK';
"continue"              return 'CONTINUE';
"switch"                return 'SWITCH';
"default"               return 'DEFAULT';
"case"                  return 'CASE';
"for"                   return 'FOR';
"void"                  return 'VOID';
"start"                 return 'START';
"with"                  return 'WITH';
"tolower"               return 'TOLOWER';
"toupper"               return 'TOUPPER';
"round"                 return 'ROUND';
"truncate"              return 'TRUNCATE';
"tostring"              return 'TOSTRING';
"typeof"                return 'TYPEOF';


//'dijofdjf'+${}'
[0-9]+("."[0-9]+)+\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';
[A-Za-z]+["_"0-9A-Za-z]* return 'CADENA_COMILLAS';
[A-Za-z]+['_'0-9A-Za-z]* return 'CADENA_COMILLAS_SIMPLES';

"("                     return 'PAR_ABRE';                   
")"                     return 'PAR_CIERRA';
"{"                     return   'LLAV_ABRE';
"}"                     return   'LLAV_CIERRA';

//logicos
"=="                    return 'D_IGUAL';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFERENTE';
"||"                    return 'OR';
"&&"                    return 'AND';
"!"                     return 'NOT';
//*/
'++'                    return 'MASMAS'
'--'                    return 'MENOSMENOS'
','                     return 'COMA'
"+"					    return 'MAS';
"-"					    return 'MENOS';
"*"					    return 'POR';
"/"					    return 'DIVIDIR';
"^"					    return 'ELEVAR';
"%"					    return 'MODULO';
"="                     return 'IGUAL';
";"                     return 'PUNTO_Y_COMA';
":"                     return 'DOS_PUNTOS';


\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA_COMILLAS';}
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA_COMILLAS_SIMPLES';}
<<EOF>>				    return 'EOF';
.					    {
                        console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);
                        new Error(yylloc.first_line, yylloc.first_column,'Lexico','Error detectado');                     
                        }
/lex


%left 'INTERROGACION' 'DOS_PUNTOS'
%left 'OR'
%left 'AND'
%left 'DIFERENTE' 'D_IGUAL'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIVIDIR' 'MODULO'
%left 'ELEVAR'
%left 'PAR_ABRE' 'PAR_CIERRA' 
%left UMENOS
%right 'NOT'
%left 'MASMAS' 'MENOSMENOS' 



%start ini

%% 

ini
	: finalinstrucciones EOF{
        
		return $1;
	}
;
finalinstrucciones
    :instrucciones startwith {$1.push($2);}
;
instrucciones
    :instrucciones inicio 
        { $1.push($2); $$ = $1; }
    |inicio 
        { $$ = [$1]; }
;


inicio
    :writeline
    |declaracion
    |asignacion
    |if
    |while
    |dowhile 
    |switch
    |for
    |metodo
    |startwith
    |llamadametodo PUNTO_Y_COMA 
    |BREAK PUNTO_Y_COMA      {$$=new Break(@1.first_line, @1.first_column)}
    |CONTINUE PUNTO_Y_COMA   {$$=new Continue(@1.first_line, @1.first_column)}
;
/*
STATEMENT
*/
statement
    :LLAV_ABRE LLAV_CIERRA                      {$$=new Statement([],@1.first_line, @1.first_column)}
    |LLAV_ABRE instrucciones LLAV_CIERRA        {$$=new Statement($2,@1.first_line, @1.first_column)}
;
/*
IF,ELSE,ELSE IF
*/

if
    :IF PAR_ABRE expresion PAR_CIERRA statement else               {$$= new If($3,$5,$6,@1.first_line, @1.first_column)}  
    
;

else
    :ELSE statement     {$$=$2}
    |ELSE if            {$$=$2}
    |                   {$$=null}
    
;
startwith
    :START WITH IDENTIFICADOR  PAR_ABRE PAR_CIERRA PUNTO_Y_COMA              {$$=new StartWith($3,[],@1.first_line, @1.first_column)}
    |START WITH IDENTIFICADOR PAR_ABRE ListaExpr PAR_CIERRA PUNTO_Y_COMA     {$$=new StartWith($3,$5,@1.first_line, @1.first_column)} 
;
/*
WHILE
*/
while
    :WHILE PAR_ABRE expresion PAR_CIERRA statement {$$=new While($3,$5,@1.first_line, @1.first_column)}
;
/*
DO-WHILE
*/
dowhile
    :DO statement WHILE PAR_ABRE expresion PAR_CIERRA PUNTO_Y_COMA {$$=new DoWhile($5,$2,@1.first_line, @1.first_column)}
;
/*
FOR
*/
for
    :FOR PAR_ABRE asignacion expresion PUNTO_Y_COMA actualizacion PAR_CIERRA statement {$$=new For($3,$4,$6,$8,@1.first_line, @1.first_column)}   
;
actualizacion
    :expresion                                       {$$=$1}
    |IDENTIFICADOR IGUAL expresion                   {$$= new AsignacionSinDeclaracion($1,$3,@1.first_line, @1.first_column)}
;
/*
SWITCH
*/
switch
    :SWITCH PAR_ABRE expresion PAR_CIERRA LLAV_ABRE ListaCase LLAV_CIERRA {$$=new Switch($3,$6,@1.first_line, @1.first_column)}
;
/*
METODOS
*/
metodo
    :VOID IDENTIFICADOR PAR_ABRE PAR_CIERRA statement               {$$=new Metodo($2,$5,[],@1.first_line, @1.first_column)}
    |VOID IDENTIFICADOR PAR_ABRE parametros PAR_CIERRA statement    {$$=new Metodo($2,$6,$4,@1.first_line, @1.first_column)}
;
parametros
    :parametros COMA declaracionmetodo    {$1.push($3);$$=$1;}
    |declaracionmetodo                    {$$=[$1]}   
;
declaracionmetodo
    :tiposDatosparametros IDENTIFICADOR             {$$=[$1,$2]}
;
llamadametodo
    :IDENTIFICADOR  PAR_ABRE PAR_CIERRA              {$$=new LlamadaMetodo($1,[],@1.first_line, @1.first_column)}
    |IDENTIFICADOR PAR_ABRE ListaExpr PAR_CIERRA     {$$=new LlamadaMetodo($1,$3,@1.first_line, @1.first_column)}
;
ListaCase
    :ListaCase case {$1.push($2);$$=$1;}
    |case           {$$=[$1];}
;
case
    :CASE expresion DOS_PUNTOS instrucciones {$$=[$2,$4]}
    |DEFAULT DOS_PUNTOS instrucciones {$$=[new Literal("DEFAULT",TipoLiteral.STRING, @1.first_line, @1.first_column),$3]}
;

/*
WRITELINE
*/
writeline
    :WRITELINE PAR_ABRE ListaExpr PAR_CIERRA PUNTO_Y_COMA 
        {$$ = new WriteLine($3,@1.first_line, @1.first_column)}
;
/*
VARIABLES,ASIGNACION,DECLARACIONES,LISTAS
*/
ListaVariables
    :ListaVariables COMA IDENTIFICADOR  { $1.push($3);
                                          $$ = $1;}
    |IDENTIFICADOR                      {$$ = [$1];}
;

tiposDatos:
    STRING
    |INT
    |DOUBLE
    |BOOLEAN
    |CHAR
;
tiposDatosparametros:
    STRING  {$$=4}
    |INT    {$$=0}
    |DOUBLE {$$=1}
    |BOOLEAN{$$=2}
    |CHAR   {$$=3}
;
asignacion
    :IDENTIFICADOR IGUAL expresion PUNTO_Y_COMA                  {$$= new AsignacionSinDeclaracion($1,$3,@1.first_line, @1.first_column)}
    |tiposDatos IDENTIFICADOR IGUAL expresion PUNTO_Y_COMA       {$$ = new Declaracion($1,$2,$4,@1.first_line, @1.first_column)}
    |incrementos PUNTO_Y_COMA                                    {$$=$1}

;
declaracion 
    :tiposDatos ListaVariables PUNTO_Y_COMA                       {$$= new Asignacion($1,$2,@1.first_line, @1.first_column)}
;

/*
INCREMENTO Y DECREMENTO
*/
incrementos
    :IDENTIFICADOR MASMAS               {$$=new IncrementoDecremento($1,$2,@1.first_line, @1.first_column)}
    |IDENTIFICADOR MENOSMENOS           {$$=new IncrementoDecremento($1,$2,@1.first_line, @1.first_column)}
;
//EXPRESION
ListaExpr 
    : ListaExpr COMA expresion
        { $1.push($3);$$ = $1;}
    | expresion
        {$$ = [$1];}
;
expresion
    //Operaciones matematicas
    :MENOS expresion %prec UMENOS		{$$= new Aritmetica($2,new Literal("-1",TipoLiteral.DOUBLE, @1.first_line, @1.first_column),TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
    |expresion MAS expresion            {$$= new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column)} 
    |expresion MENOS expresion          {$$= new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column)} 
    |expresion POR expresion            {$$= new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}   
    |expresion DIVIDIR expresion        {$$= new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column)}
    |expresion ELEVAR expresion         {$$= new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column)}
    |expresion MODULO expresion         {$$= new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column)} 
    //Operacines Relacionales
    |expresion D_IGUAL expresion        {$$= new Relacional($1,$3,TipoRelacional.IGUALIGUAL, @1.first_line, @1.first_column)} 
    |expresion DIFERENTE expresion      {$$= new Relacional($1,$3,TipoRelacional.DIFERENTE, @1.first_line, @1.first_column)} 
    |expresion MAYOR_IGUAL expresion    {$$= new Relacional($1,$3,TipoRelacional.MAYOR_IGUAL, @1.first_line, @1.first_column)} 
    |expresion MENOR_IGUAL expresion    {$$= new Relacional($1,$3,TipoRelacional.MENOR_IGUAL, @1.first_line, @1.first_column)} 
    |expresion MAYOR expresion          {$$= new Relacional($1,$3,TipoRelacional.MAYOR, @1.first_line, @1.first_column)}         
    |expresion MENOR expresion          {$$= new Relacional($1,$3,TipoRelacional.MENOR, @1.first_line, @1.first_column)}
    //Operaciones Logicas
    |expresion AND expresion            {$$= new Logica($1,$3,TipoLogica.AND, @1.first_line, @1.first_column)}
    |expresion OR expresion             {$$= new Logica($1,$3,TipoLogica.OR, @1.first_line, @1.first_column)}
    |NOT expresion                      {$$= new Logica(null,$2,TipoLogica.NOT, @1.first_line, @1.first_column)}

    |PAR_ABRE expresion PAR_CIERRA      {$$= $2}
    //Llamada funcion
    |llamadametodo
    //Casteos
    |PAR_ABRE tiposDatos PAR_CIERRA expresion {$$ = new Casteos($2,$4,@1.first_line, @1.first_column)}
    |TOLOWER PAR_ABRE expresion PAR_CIERRA      {$$=new LowerOrUpper("tolower",$3,@1.first_line, @1.first_column)}
    |TOUPPER PAR_ABRE expresion PAR_CIERRA      {$$=new LowerOrUpper("toupper",$3,@1.first_line, @1.first_column)}
    |TRUNCATE PAR_ABRE expresion PAR_CIERRA      {$$=new LowerOrUpper("truncate",$3,@1.first_line, @1.first_column)}
    |ROUND PAR_ABRE expresion PAR_CIERRA      {$$=new LowerOrUpper("round",$3,@1.first_line, @1.first_column)}
    |TYPEOF PAR_ABRE expresion PAR_CIERRA      {$$=new LowerOrUpper("typeof",$3,@1.first_line, @1.first_column)}
    |TOSTRING PAR_ABRE expresion PAR_CIERRA      {$$=new LowerOrUpper("tostring",$3,@1.first_line, @1.first_column)}
    //incrementos y decrementos
    |incrementos                        {$$=$1}
	|ENTERO	                            {$$= new Literal($1,TipoLiteral.INT, @1.first_line, @1.first_column)}
    |DECIMAL                            {$$= new Literal($1,TipoLiteral.DOUBLE, @1.first_line, @1.first_column)}							
	|CADENA_COMILLAS                    {
                                        var cadena = $1.substr(0,$1.length);
                                         cadena=cadena.replace(/\\n/g,"\n");
                                         cadena=cadena.replace(/\\t/g,"\t");
                                         cadena=cadena.replace(/\\'/g,"\'");
                                         cadena=cadena.replace(/\\\\/g,"\\");
                                         cadena=cadena.replace(/\"/g,"\\\"");//no agarra no se por que:( pero si le cambio de simbolo si agarra
                                        $$= new Literal(cadena,TipoLiteral.STRING, @1.first_line, @1.first_column);
                                        }  
    |CADENA_COMILLAS_SIMPLES      		{$$= new Literal($1,TipoLiteral.CHAR, @1.first_line, @1.first_column)}			
    |TRUE                               {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}                              
    |FALSE                              {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}
    |IDENTIFICADOR                      {$$= new AccesoAmbito($1, @1.first_line, @1.first_column)}
;

