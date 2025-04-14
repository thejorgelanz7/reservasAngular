import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-all-barbers-card',
  imports: [],
  templateUrl: './all-barbers-card.component.html',
  styleUrl: './all-barbers-card.component.css'
})
export class AllBarbersCardComponent {

  @Output() idSeleccionado = new EventEmitter<number>();

  @Input() barber : any;


  seleccionar(){
    this.idSeleccionado.emit(this.barber.id);
  }

}
