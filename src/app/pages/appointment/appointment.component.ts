// appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { supabase } from '../../supabase.client';
import { BarberService } from '../../services/barber.service';
import { Router } from '@angular/router';
import { AllBarbersCardComponent } from "../../components/all-barbers-card/all-barbers-card.component";
import { SingleBarberComponent } from "../../components/single-barber/single-barber.component";
import { AuthServiceService } from '../../services/auth-service.service'; // ✅ asegúrate de la ruta correcta

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AllBarbersCardComponent,
    SingleBarberComponent
],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

  
  barbers: any[] = [];
  selectedBarber: any; // Para almacenar el barbero seleccionado completo

  citasDisponibles : any[] = [];
  
  selectedCita: any;
  selectedDate : any;
  userId : any;

  isLoading: boolean = false;

  constructor(private barberService: BarberService, private authService: AuthServiceService, private router: Router) {
  }
  ngOnInit(): void {
    this.getBarbers();
  }

  async getCurrentUser() {
    try {
      const { data, error } = await this.authService.getUser();
      if (error || !data?.user) {
        console.error('Usuario no autenticado');
        return;
      }
  
      this.userId = data.user.id;
      console.log('Usuario autenticado:', this.userId);
    } catch (e) {
      console.error('Error al obtener el usuario:', e);
    }
  }

  crearCita() {
    if (!this.selectedBarber || !this.selectedDate || !this.selectedCita) {
      alert('Por favor, selecciona un barbero, una fecha y una hora.');
      return;
    }

  
    const barberId = this.selectedBarber.id;
    const date = this.selectedDate; // debe tener formato yyyy-MM-dd
    const time = this.selectedCita.start_time; // ahora sí funciona
  
    console.log('Enviando cita:', { barberId, date, time });
     console.log(this.selectedDate)
  
    this.barberService.crearCita(this.userId ,barberId, date, time).subscribe({
      next: (respuesta) => {
        console.log(date)
        console.log(typeof this.selectedDate)
        console.log('Cita creada exitosamente:', respuesta);
        alert('¡Cita creada!');
      },
      error: (error) => {
        console.error('Error al crear la cita:', error);
        alert('Hubo un error al crear la cita.');
      }
    });
  }
  
  seleccionarBarbero(id: number) {
    if (this.selectedBarber?.id === id) {
      this.selectedBarber = null;
    } else {
      this.selectedBarber = this.barbers.find(barbero => barbero.id === id);
    }
  }

  volverTodosBarberos(){
    this.selectedBarber = null;
    this.citasDisponibles = [];
  }
  
  getBarbers() {
    this.isLoading = true;
    this.barberService.getBarbers().subscribe({
      next: (response) => {
        this.barbers = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err); 
        this.isLoading = false;
      }
    });
  }

  getCitasDisp(id : number,date : string){
    this.isLoading = true;
    this.barberService.mostrarCitasDisponibles(id,date).subscribe({
      next: (response)=>{
        this.citasDisponibles = response.data;
        this.isLoading = false;
      },
      error : (err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  toggleCita(cita : any){
    if( this.selectedCita?.id === cita.id){
        this.selectedCita = null;
    }else{
      this.selectedCita = cita;
    }
  }

}