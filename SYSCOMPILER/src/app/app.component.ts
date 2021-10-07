import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
//import parser from './interpreter/grammar/grammar.js';
import { Expresion } from './interpreter/Expresion/Expresion.js'; 

import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
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
  
  AbrirExplorador(fileInput: any) {
    var contenido:string;
    const fileReaded = fileInput.target.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = e => {
      contenido =<string> myReader.result;
      this.codeEditor.setValue(contenido);
    }
    myReader.readAsText(fileReaded);

  }

  ejecutar() {
    const entrada = this.codeEditor.getValue()
   
    if (entrada == "") {
      alert("Entrada vacia")
      this.codeEditor.setValue("Julio Pendejo");
      return
    }
  //const ast = parser.parse(entrada)
   //console.log(ast)
    try {
    //console.log(ast.execute());
    } catch (error) {
      console.log(error)
    }

    console.log("Ejecucion terminada")

  }

}