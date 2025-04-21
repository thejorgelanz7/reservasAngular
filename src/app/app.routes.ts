import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { VistaUsuarioComponent } from './pages/vista-usuario/vista-usuario.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [ { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { 
      path: 'appointment', 
      component: AppointmentComponent , canActivate: [AuthGuard]// Protege esta ruta
    },
  {path: 'user', component: VistaUsuarioComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login' }]
;
