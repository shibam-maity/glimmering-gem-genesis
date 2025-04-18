import { createClient } from '@supabase/supabase-js'

// Your Supabase project URL
const supabaseUrl = 'https://gwnkhbciwraqnneapwyo.supabase.co'

// Your Supabase anon public key
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmtoYmNpd3JhcW5uZWFwd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDk4MDMsImV4cCI6MjA2MDQ4NTgwM30.z596YtvD3Z9C39ez7afEcAn8BcF4YbfOMHldKZt86Gg'

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
