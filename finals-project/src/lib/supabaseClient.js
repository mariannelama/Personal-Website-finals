import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient('https://ndiynsjjhrpcvokrkhdx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kaXluc2pqaHJwY3Zva3JraGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTE5MjksImV4cCI6MjA1NjI4NzkyOX0.uBsCl7VxE8gz1f_monCym0oI7J98r5V76UqxbnDCfgg')