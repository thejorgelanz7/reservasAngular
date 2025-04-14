// src/app/supabase.client.ts
import { createClient } from '@supabase/supabase-js';
import { environment } from './environments/environments';

const supabaseUrl = environment.API_URL;
const supabaseKey = environment.API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
