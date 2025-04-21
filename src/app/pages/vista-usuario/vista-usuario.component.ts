import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { BarberService } from '../../services/barber.service';
import { AllBarbersCardComponent } from "../../components/all-barbers-card/all-barbers-card.component";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-vista-usuario',
  imports: [CommonModule],
  templateUrl: './vista-usuario.component.html',
  styleUrl: './vista-usuario.component.css'
})
export class VistaUsuarioComponent  implements OnInit{
  isLoading: boolean = false;
  currentid: string = "";
  user : any;
  InfoUser : any;

  constructor(private authService: AuthServiceService, private barberService : BarberService){}
  async ngOnInit(): Promise<void> {
    await this.getCurrentUser(); // Esperar a que el usuario se cargue
    this.DataUser(this.user.user.id); // Ahora sí, el usuario ya está disponible
  }

  DataUser(id : string){
    this.isLoading = true;
    this.barberService.misCitas(id).subscribe({
      next : (response)=>{
          this.InfoUser =(response.data);
          console.log(this.InfoUser)
          this.isLoading = false;

      },
      error: ( err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }
  

  async getCurrentUser(): Promise< string | null> {
    try {
      const { data, error } = await this.authService.getUser();
      if (error) {
        console.error('Error al obtener el usuario:', error);
        return null; 
      }
      if (!data){
        console.error("Data no encontrada");
        return null;
      }
      if (!data.user) {
        console.error('Usuario no autenticado');
        return null;
      }
  
      this.user = data;
      this.currentid = this.user.user.id
      console.log('ID DEL USUARIO ', this.currentid)
      console.log('Usuario autenticado:', this.user);
      return this.user; // Return the user ID
    } catch (e) {
      console.error('Error al obtener el usuario:', e);
      return null; // Return null on error
    }
  }

}
