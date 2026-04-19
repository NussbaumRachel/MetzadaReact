import axios from 'axios'

export const checkValueLimitations = async (key) => {
    // try {
      const response = await axios.get("https://localhost:7253/api/Check/GetChecks?k=" + key);
     
      
      if (response.data) {
        // order.possibleValues.push({name:key,limits:response.data})
        return response.data; // מחזירים את הערכים המוגבלים
      }
    // } catch (error) {
    //   console.error("Error fetching limitations:", error);
    // }
    return [];
  };
