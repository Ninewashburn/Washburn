import { Component, OnInit } from '@angular/core';

export interface Tache {
  done: boolean;
  name: string;
}

@Component({
  selector: 'app-flexbox',
  templateUrl: './flexbox.component.html',
  styleUrls: ['./flexbox.component.css']
})
export class FlexboxComponent implements OnInit {
  taches: Tache[] = []; 
  tache: Tache = {done: false,
  name: ''};
  tachefini: Tache[] = [];
  ticked: boolean = false;
  tacheInput: string='';
  erasetache: boolean = false;
  
  constructor() {
    this.taches = [];
   }

  ngOnInit(): void {
  }

  ajouter(): void {
    if (this.tacheInput!=='' && !this.taches.map(x => x.name).includes(this.tacheInput)) {
    this.taches.push({done:false, name: this.tacheInput}); this.tacheInput='';
  }
  }
  
  effacer(): void {
    this.taches=[];
  }
  
  nettoyer(): void {
    this.tacheInput='';
  }

}
  // tacheEnd(tachefini: Tache): void {
  //   if (done) {
  //     this.taches.splice(this.taches.indexOf(this.tache), 1);
  //     this.tachefini.push(this.tache);
  //   } else {
  //     this.tachefini.splice(this.tachefini.indexOf(this.tache), 1);
  //     this.taches.push(this.tache);
  //   }
    
    
  //}
  

