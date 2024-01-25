
require('dotenv').config();
const { google } = require('googleapis');

require('punycode/')

const id = "whv5betgotone8n4lfwnaco9xq15dl7t";
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const alerts = require("./alerts-bybit");

// googleSheetsService.js

const sheets = google.sheets('v4');






async function getSpreadSheetValues({spreadsheetId, auth, range}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range // Using the 'range' parameter directly
  });
  return res;
}




async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({ scopes: SCOPES });
    const authToken = await auth.getClient();
    return authToken;
}





async function main123(){

    try {
        console.log('HTTP request received at /runTask');
      

        try {
            const auth = await getAuthToken();
            const response = await getSpreadSheetValues({
              spreadsheetId: "1aZJSu6ggpyCpjlvTkz-j1qQ_TAf8ZGfWTwU_9MzcSTM",
              range: 'Overview!D5:F5', // Adjust range as needed
              auth
            });
            // console.log(response)
            const data =response.data.values
            if (data && data.length > 0) {
                
                // const testData = {
                //     displayTPIValues: [
                //         { displayName: 'BTC % allocation', score: data[0][0] },
                //         { displayName: 'ETH % allocation', score: data[0][1] },
                //         { displayName: 'Net % percentage', score: data[0][2] }
                //         // Add more items as needed
                //     ]
                //     // Include other necessary properties as expected by your alert function
                // };
                
                // // Call the alert function with test data
                // alerts.discordTPIAlert(testData)
                //     .then(() => console.log('Alert sent successfully.'))
                //     .catch(error => console.error('Error sending alert:', error));
                
                    console.log(data[0][0])
                    console.log(data[0][1])
                    

                return [data[0][0],data[0][1] ]
              }
          } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data');
          }
        //main.js

    
        
        return [0,0]

  
   
}catch (error) {
    console.error(error);
    
  };
  return [0,0]

}

  main123()

  module.exports = { main123 };