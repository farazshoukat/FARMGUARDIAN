import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://oqzdapfpkyvbbguywvgs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_j82jV0xyKLizo_nWyms2yA_jTsa-sIT';

// Create Supabase client with AsyncStorage for session persistence in React Native
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;

