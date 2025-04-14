import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from '../../supabase.client';
import { CommonModule } from '@angular/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BarberService } from '../../services/barber.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';

  constructor(private barberService : BarberService, private router : Router){
    //Creacion del formulario para Loggearme
    this.loginForm= new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

  //Funcion para iniciar Sesion
  async Login(email: string, password:string){
    const {data,error} = await this.barberService.supabase.auth.signInWithPassword({
      email,
      password
    })
    if(error){
      this.message= error.message;
    }else{
      this.message = "Iniciando Sesion"
      this.router.navigate(['/appointment'])
    }
  }

  onSubmit(){
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.Login(email, password);
    } else {
      this.message = 'Por favor, completa el formulario correctamente.';
    }
  }
}