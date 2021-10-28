%{
    const {Aritmetica,TipoAritmetica} = require('../Expresion/Aritmetica')
    const {Relacional,TipoRelacional} = require('../Expresion/Relacional')
    const {Literal,TipoLiteral} = require('../Expresion/Literal')
    const {Logica,TipoLogica} = require('../Expresion/Logica')
    const error_1 = require('../Error/Error')
    const listaErrores = require('../Error/ListaErrores')
    const {AccesoAmbito} = require('../Expresion/AccesoAmbito')
    const {Declaracion} = require('../Instruccion/Declaracion')
    const {WriteLine} = require('../Instruccion/WriteLine')
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
"char"                return 'CHAR';


//'dijofdjf'+${}'
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';
[A-Za-z]+["_"0-9A-Za-z]* return 'CADENA_COMILLAS';
[A-Za-z]+['_'0-9A-Za-z]* return 'CADENA_COMILLAS_SIMPLES';

"("                     return 'PAR_ABRE';                   
")"                     return 'PAR_CIERRA';

//logicos
"=="                    return 'D_IGUAL';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFERENTE';
//*/

','                     return 'COMA'
"+"					    return 'MAS';
"-"					    return 'MENOS';
"*"					    return 'POR';
"/"					    return 'DIVIDIR';
"^"					    return 'ELEVAR';
"%"					    return 'MODULO';
"="                     return 'IGUAL';
";"                     return 'PUNTO_Y_COMA';

\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA_COMILLAS';}
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA_COMILLAS_SIMPLES';}
<<EOF>>				    return 'EOF';
.					    {
                        const er = new error_1.Error(yylloc.first_line,yylloc.first_column,"Léxico",yytext);
                        listaErrores.ListaErrores.getInstance().push(er);                       
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
%left UMENOS
%right 'NOT'
%right 'UNARIA' 



%start ini

%% 

ini
	: instrucciones EOF{
		return $1;
	}
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
;

declaracion 
    : tiposDatos IDENTIFICADOR IGUAL expresion PUNTO_Y_COMA 
        {$$ = new Declaracion($2,$4,@1.first_line, @1.first_column)}
;

writeline
    :WRITELINE PAR_ABRE ListaExpr PAR_CIERRA PUNTO_Y_COMA 
        {$$ = new WriteLine($3,@1.first_line, @1.first_column)}
;

ListaExpr 
    : ListaExpr COMA expresion
        { $1.push($3);$$ = $1;}
    | expresion
        {$$ = [$1];}
;
tiposDatos:
    STRING
    |INT
    |DOUBLE
    |BOOLEAN
    |CHAR
;

//EXPRESION

expresion
    :MENOS expresion %prec UMENOS		{$$= new Aritmetica($2,new Literal("-1",TipoLiteral.DOUBLE, @1.first_line, @1.first_column),TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
    |expresion MAS expresion            {$$= new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column)} 
    |expresion MENOS expresion          {$$= new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column)} 
    |expresion POR expresion            {$$= new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}   
    |expresion DIVIDIR expresion        {$$= new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column)}
    |expresion ELEVAR expresion         {$$= new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column)}
    |expresion MODULO expresion         {$$= new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column)} 
    //|MENOS expresion %prec UNARIA       {$$= new Aritmetica(new Literal("-1",TipoLiteral.DOUBLE, @1.first_line, @1.first_column),$2,TipoAritmetica.NEGACIONUNARIA, @1.first_line, @1.first_column)}
    |expresion D_IGUAL expresion        {$$= new Relacional($1,$3,TipoRelacional.IGUALIGUAL, @1.first_line, @1.first_column)} 
    |expresion DIFERENTE expresion      {$$= new Relacional($1,$3,TipoRelacional.DIFERENTE, @1.first_line, @1.first_column)} 
    |expresion MAYOR_IGUAL expresion    {$$= new Relacional($1,$3,TipoRelacional.MAYOR_IGUAL, @1.first_line, @1.first_column)} 
    |expresion MENOR_IGUAL expresion    {$$= new Relacional($1,$3,TipoRelacional.MENOR_IGUAL, @1.first_line, @1.first_column)} 
    |expresion MAYOR expresion          {$$= new Relacional($1,$3,TipoRelacional.MAYOR, @1.first_line, @1.first_column)}         
    |expresion MENOR expresion          {$$= new Relacional($1,$3,TipoRelacional.MENOR, @1.first_line, @1.first_column)}
    |PAR_ABRE expresion PAR_CIERRA      {$$= $2}
	|ENTERO	                            {$$= new Literal($1,TipoLiteral.INT, @1.first_line, @1.first_column)}
    |DECIMAL                            {$$= new Literal($1,TipoLiteral.DOUBLE, @1.first_line, @1.first_column)}							
	|CADENA_COMILLAS                    {$$= new Literal($1,TipoLiteral.STRING, @1.first_line, @1.first_column)}  
    |CADENA_COMILLAS_SIMPLES      		{$$= new Literal($1,TipoLiteral.CHAR, @1.first_line, @1.first_column)}			
    |TRUE                               {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}                              
    |FALSE                              {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}
    |IDENTIFICADOR                      {$$= new AccesoAmbito($1, @1.first_line, @1.first_column)}
;