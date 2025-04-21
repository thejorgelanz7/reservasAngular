// barber.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environments';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarberService {
  supabaseUrl = environment.API_URL;
  supabaseKey = environment.API_KEY;

  constructor() {}

  supabase = createClient(this.supabaseUrl, this.supabaseKey);

  crearCita(user_id:string ,id_barber: number, date : Date, time : any,): Observable<any>{
    return from(this.supabase 
    .from('appointments')
    .insert([
      { user_id: user_id, barber_id: id_barber, date: date, time: time},
    ])
    .select()
  )
  }
  user(){
    return supabase.auth.getSession()

  }

  misCitas(id_user: string): Observable<any>{
    return from(this.supabase
      .from('appointments')
    .select("*").eq("user_id", id_user))
  }


  mostrarCitasDisponibles(id: number, date : string): Observable<any> {
    return from(
      this.supabase
      .from('availability')
  .select(`
    start_time,disponible,id,
    barbers (
      id
    )
  `).eq('barber_id', id)
  .eq('date', date)
    );
  }

  selectBarberById(id: number): Observable<any> {
    return from(this.supabase.from('barbers').select('*').eq('id', id));
  }

  getBarbers(): Observable<any> {
    return  from(
      this.supabase.from('barbers').select(`
        id,
        name,
        avatar_url
      )
      `)
    );
  }

  async signUp(email: string, password: string) {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  }

  async Login(email: string, password: string) {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }


}
