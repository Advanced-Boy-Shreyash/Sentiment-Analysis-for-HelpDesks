
import { supabase } from "@/integrations/supabase/client";

export async function initializeDatabase() {
  try {
    console.log("Initializing database...");
    
    // Check if we already have chart data in our existing tables
    const { data: chartData, error } = await supabase
      .from('call_trends')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error("Error checking chart data:", error);
      return;
    }
    
    if (!chartData || chartData.length === 0) {
      console.log("Initializing chart data...");
      
      // Invoke the function to initialize chart data
      const { data, error: funcError } = await supabase.functions.invoke('initialize-chart-data');
      
      if (funcError) {
        console.error("Error initializing chart data:", funcError);
      } else {
        console.log("Chart data initialization response:", data);
      }
    } else {
      console.log("Chart data already initialized.");
    }
    
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
