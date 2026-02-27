import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jmhhxisfcpjjitjdkrtm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptaGh4aXNmY3Bqaml0amRrcnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1Nzg2MDIsImV4cCI6MjA4NzE1NDYwMn0.RmjAHjhc9Tp8LkCR5B5MMPzmQYs2XfwY5DJw7EMP15k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
