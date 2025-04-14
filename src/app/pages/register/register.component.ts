import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarberService } from '../../services/barber.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;
  message = '';

  constructor(private barberService: BarberService, private router: Router) {
    
    //Creacion del formulario para registrarte
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }


  //Funcion para registrarte
  async signup(email: string, password: string) {
    const { data, error } = await this.barberService.supabase.auth.signUp({
      email,
      password
    });
//Manejo de errores
    if (error) {
      this.message = error.message;
    } else {
      this.message = 'Registro exitoso. Verifica tu correo.';
      this.router.navigate(['/login']);
    }
  }

  //Metodo OnSubmit()
  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.signup(email, password);
    } else {
      this.message = 'Por favor, completa el formulario correctamente.';
    }
  }
}
