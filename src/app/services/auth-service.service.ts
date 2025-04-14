import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  async getUser() {
    return await supabase.auth.getUser();
  }
}
