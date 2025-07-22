import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rcrqobztwmelhsugpygq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcnFvYnp0d21lbGhzdWdweWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODc4ODksImV4cCI6MjA2ODc2Mzg4OX0.eNngcWREwqtHDqYRGfAJ6RLiXRwKeMoAd9DlF-ZpeDc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)