import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { lista, MensajeError } from './interpreter/Error/Error';
import {parser} from './interpreter/grammar/grammar.js';
import { saveAs } from 'file-saver';
import { textPrint } from './interpreter/Instruccion/WriteLine';
import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties'; 
import { Ambito, listavar } from './interpreter/Ambito/Ambito';
import { AstMetodo, Metodo } from './interpreter/Instruccion/Metodo';
import { AstStartWith, StartWith } from './interpreter/Instruccion/StartWith';
import { AstDeclaracion, AstDeclaracionNombre, Declaracion } from './interpreter/Instruccion/Declaracion';
import { Asignacion, AstAsignacion } from './interpreter/Instruccion/Asignacion';
import { AsignacionSinDeclaracion, AstAsignacionSinDeclaracion } from './interpreter/Instruccion/AsignacionSinDeclaracion';
import {graphviz} from 'd3-graphviz';
import { AstLiteral, AstLiteralNombre } from './interpreter/Expresion/Literal';
import { ThrowStmt } from '@angular/compiler';
//mport * as fs from 'file-system';

const THEME = 'ace/theme/tomorrow_night_eighties';
const LANG = 'ace/mode/typescript';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('codeEditor', { static: true })
  codeEditorElmRef!: ElementRef;
  @ViewChild('network')
  el!: ElementRef;
  public codeEditor!: ace.Ace.Editor;
  private editorBeautify:any;
  consolelog = "";
  tabladesimbolos :any=[];
  tablademetodos :any=[];
  tabladeerrores : any=[];
  CodGrap= `digraph G { \n Principal [label="AST"];\n`;

  ngOnInit(): void {
    this.editorBeautify = ace.require('ace/ext/beautify');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
      cursorStyle: "ace",
      showLineNumbers:true,
      printMarginColumn: 100,
      highlightActiveLine: true,
      minLines: 45,
      maxLines: Infinity,
      maxPixelHeight: 800,
      fontSize: 20
    };
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);

  }
  AddConsole(variable: any){
    if (variable!=null){
      console.log(variable);
      this.consolelog =this.consolelog +">"+ variable + "\n"
    }
  }
  AbrirExplorador(fileInput: any) {
    var contenido:string;
    const fileReaded = fileInput.target.files[0];
    //Creamos un objeto tipo Filereader para leer el contenido
    var myReader:FileReader = new FileReader();
    myReader.onloadend = e => {
      contenido =<string> myReader.result;
      //Insertamos el contenido en el editor
      this.codeEditor.setValue(contenido);
    }
    myReader.readAsText(fileReaded);
  }
  Save(){
    var contenido:string;
    contenido = this.codeEditor.getValue();
      const blob = new Blob([contenido], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "File.sc");
  }
  SaveGraph(){
    var contenido:string;
    contenido = this.CodGrap;
      const blob = new Blob([contenido], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "Graph.dot");
  }

  ejecutar() {
    let entrada = this.codeEditor?.getValue()
    this.tabladesimbolos=[];
    this.tablademetodos=[];
    this.tabladeerrores=[];
    entrada = entrada.toLowerCase();
    console.log("Iniciando Análisis...")
    this.consolelog="Iniciando Análisis";
    if (entrada == "") {
      alert("Entrada vacia")
      return
    } 
   const ast = parser.parse(entrada)
   //console.log(ast)
   const ambito = new Ambito(null);
   
   

   //EJECUCION PARA PRIMERA VUELTA GUARDAR METODOS;
   try {
    for(const instruccion of ast){
      if(instruccion instanceof Metodo){
        instruccion.execute(ambito);   
       }
    }
   } catch (error) {
     console.log(error)
     this.consolelog = this.consolelog+error;
   }

   //EJECUCION SEGUNDA VUELTA PARA DECLARACIONES, ASIGNACIONES,
    try {
    let contador =0;
    for(const inst of ast){
      if(inst instanceof Declaracion || inst instanceof Asignacion || inst instanceof AsignacionSinDeclaracion){
        inst.execute(ambito);
        console.log("estoy en declaracion");        
      }
      if(inst instanceof Metodo){
        continue;
      }
      if(inst instanceof StartWith){
        if(contador == 0){
          const retorno =inst.execute(ambito);
           
          this.consolelog = textPrint;
          contador++;
        }
      }
      continue;
    }
    } catch (error) {
      console.log(error)
      this.consolelog = this.consolelog+error;
    }

  //IMPRIMIR SIMBOLOS EN TABLA DE SIMBOLOS
   this.tabladesimbolos = listavar;

   //IMPRIMIR FUNCIONES EN TABLA DE SIMBOLOS 
   for(const func of ambito.metodos){
      this.tablademetodos.push(func);
   }

    this.consolelog = this.consolelog +MensajeError
    this.tabladeerrores = lista;
    this.consolelog= this.consolelog +"\n"+"Análisis Finalizado...";
    
    //Ejecucion para graficar AST
   this.CodGrap = this.CodGrap +"\n"+AstStartWith;
   this.CodGrap = this.CodGrap +AstDeclaracion;
   this.CodGrap = this.CodGrap +AstAsignacion;
   this.CodGrap = this.CodGrap + "\n"+AstAsignacionSinDeclaracion;
   this.CodGrap = this.CodGrap + "\n"+AstMetodo;
   this.CodGrap = this.CodGrap + "\n"+AstLiteral;
   this.CodGrap = this.CodGrap+`}`;
   console.log(this.CodGrap);
   console.log("Análisis Finalizado...")
  }

  Generatex(){
   graphviz('#graph').renderDot('digraph {a -> b}');
  }
}