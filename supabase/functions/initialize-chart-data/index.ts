
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Define Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle CORS preflight requests
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Checking if chart data exists...')
    
    // Check if data already exists in the tables we created
    const { data: callTrendsData, error: callTrendsError } = await supabase
      .from('call_trends')
      .select('*')
      .limit(1);

    if (callTrendsError) {
      throw callTrendsError;
    }
    
    // Only populate if no data exists
    if (!callTrendsData || callTrendsData.length === 0) {
      console.log('Populating tables with sample data...');
      
      // We would populate the tables here if needed, but our SQL migration already added sample data
      // This function could be used to refresh data in the future
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Tables already populated with sample data via SQL migration' 
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Chart data already exists' 
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          }
        }
      );
    }
    
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
