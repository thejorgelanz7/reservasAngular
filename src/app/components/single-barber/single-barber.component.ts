import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllBarbersCardComponent } from "../all-barbers-card/all-barbers-card.component";

@Component({
  selector: 'app-single-barber',
  templateUrl: './single-barber.component.html',
  styleUrl: './single-barber.component.css'
})
export class SingleBarberComponent {

  @Input() barber : any;
  @Output() volver = new EventEmitter<any>();

  Onvolver(){
    this.barber = null;
    this.volver.emit(this.barber);
    }
  }
  

