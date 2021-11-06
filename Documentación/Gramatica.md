GRAMATICA JISON SYSCOMPILER 201905554
=================

## Índice 
- [Expresiones regulares](#expresiones)
- [Terminales](#terminales)
- [No Terminales](#noterminales)
- [Inicio Gramatica ](#inicio)
- [Producciones con su descripción](#producciones)

<div id='expresiones'/>
## Expresiones Regulares
|**EXPRESION REGULAR**|**NOMBRE**|
|---------|----------------------|
| `"//".*`|Comentario unilínea |
| `[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	`|Comentario multilinea |
|`[0-9]+("."[0-9]+)+\b `|Decimal|
|`[0-9]+\b`|Entero|
|`([a-zA-Z])[a-zA-Z0-9_]*	`|Identificador|
|`[A-Za-z]+["_"0-9A-Za-z]*`|Cadena comilla doble |
|`[A-Za-z]+['_'0-9A-Za-z]*`|Cadena comilla simple|
<div id='terminales'/>
## Terminales
   
   | **NOMBRE** | **SIMBOLO** |
   |------------|---------|
   |`true`     | TRUE|
|`false`    | FALSE|
|`writeline`|WRITELINE|
|`string`   |STRING|
|`int`      |INT|
|`double`   |DOUBLE|
|`boolean`  |BOOLEAN|
|`char`     |CHAR|
|`if`       |IF|
|`else`     |ELSE|
|`while`    |WHILE|
|`do`       |DO|
|`break`    |BREAK|
|`continue` |CONTINUE|
|`switch`   |SWITCH|
|`default`  |DEFAULT|
|`case`     |CASE|
|`for`      |FOR|
|`void`     |VOID|
|`start`    |START|
|`with`     |WITH|
|`tolower`  |TOLOWER|
|`toupper`  |TOUPPER|
|`round`    |ROUND|
|`truncate` |TRUNCATE|
|`tostring` |TOSTRING|
|`typeof`   |TYPEOF|
|`(` |                   PAR_ABRE|
|`)` | PAR_CIERRA|
|`{` |   LLAV_ABRE|
|`}` |   LLAV_CIERRA|
|`==`| D_IGUAL|
|`<=`| MENOR_IGUAL|
|`<` | MENOR|
|`>=`| MAYOR_IGUAL|
|`>` | MAYOR|
|`!=`| DIFERENTE|
|`or`| OR|
|`&&`| AND|
|`!` | NOT|
|++| MASMAS|
|--| MENOSMENOS|
|, | COMA|
|`+`	| MAS|
|`-`	| MENOS|
|`*`	| POR|
|`/`	| DIVIDIR|
|`^`	| ELEVAR|
|`%`	| MODULO|
|`=` | IGUAL|
|`;` | PUNTO_Y_COMA|
|`:` | DOS_PUNTOS|

<div id='inicio'/>
##Inicio Gramática
* %start ini

<div id='noterminales'/>

## No terminales

   | **NOMBRE**    |    **NOMBRE**  |    **NOMBRE**   |
   |---------------|----------------|-----------------|
   | `ini`          | `while`    | `expresion `   |
   | `finalinstrucciones`   |   `dowhile`  | `ListaCase`|
   | `instrucciones`|  `switch`       | `parametros`      | 
   | `startwith`        |  `for`       | `declaracionmetodo`   | 
   | `inicio` | `metodo`      | `ListaExpr`        |
   | `writeline`        | `statement`        |   `tiposDatos`
   | `declaracion`          | `llamadametodo`    | `ListaCase `   |
   | `asignacion`   |   `else`  | `case`|
   | `if`|  `Exp`       | `actualizacion`      |   


<div id='producciones'/>

## Producciones

```typescript
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
```

```java
Universidad San Carlos de Guatemala Segundo Semestre 2021
Programador: Marvin Eduardo Catalán Véliz.
Carnet: 201905554
```
