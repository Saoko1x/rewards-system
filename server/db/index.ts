import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://gmvnmbxzhmpmzvzsnwaq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtdm5tYnh6aG1wbXp2enNud2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxODE2MTYsImV4cCI6MjA0Mzc1NzYxNn0.n0rL-fOVlFZzDL2ciyGEack9Jguz41IcARRnDUqNtNw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
