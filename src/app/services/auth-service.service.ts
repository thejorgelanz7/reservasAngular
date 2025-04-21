import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private sessionSubject = new BehaviorSubject<Session | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor() {
    this.initAuthListener(); // ¡Se inicializa automáticamente al cargar!
  }

  async getUser() {
    return await supabase.auth.getUser();
  }

  private async initAuthListener() {
    const { data: { session } } = await supabase.auth.getSession();
    this.sessionSubject.next(session);

    supabase.auth.onAuthStateChange((_event, session) => {
      this.sessionSubject.next(session);
    });
  }

  //Verificar si existe una sesion
  isLoggedIn(): boolean {
    return this.sessionSubject.value !== null;
  }
//Cerrar Sesion
  async logout() {
    await supabase.auth.signOut();
  }
}

