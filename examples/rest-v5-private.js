// import { RestClientV5 } from '../src/index';

const { main123 } = require('./index-runfromdesktop2-update');

// or
const { RestClientV5 }= require('bybit-api');
 const alerts = require("./alerts-bybit");

const key = "1K1DGfEqJg5nMZnrau";
const secret = "iskpN4znl3s7BzfPcqkWhIniHfacDvkDGPbl";

const lev = 1.8
const client = new RestClientV5({
  key: key,
  secret: secret,
});


async function fetchCurrentPrices() {
  try {
    // Replace 'client' with your Bybit API client instance
    const responseBTC = await client.getTickers({
    category: 'linear',

      symbol: 'BTCUSDT' // For BTC
    });

    const btcPrice = responseBTC.result.list[0].lastPrice;

    const responseETH = await client.getTickers({
      category: 'linear',

      symbol: 'ETHUSDT' // For ETH
    });

    const ethPrice = responseETH.result.list[0].lastPrice;

    console.log('Current BTC Price:', btcPrice);
    console.log('Current ETH Price:', ethPrice);

    return  [parseFloat(btcPrice), parseFloat(ethPrice)] ;
  } catch (error) {
    console.error('Error fetching current prices:', error);
  }
  return  [0, 0]
}


(async () => {
  try {
    /** Simple examples for private REST API calls with bybit's V5 REST APIs */
    // const response = await client.getPositionInfo({
    //   category: 'option',
    //   symbol: 'DOGEUSDT',
    // });

    // console.log('response:', response);

    // Trade USDT linear perps
    // const buyOrderResult = await client.submitOrder({
    //   category: 'linear',
    //   symbol: 'XRPUSDT',
    //   orderType: 'Limit',
    //   qty: '6',
    //   side: 'Buy',
    //   price:'0.4',
    //   orderIv: '6',
    //   timeInForce: 'GTC',
    //   mmp: false,
    //   reduceOnly: false,
    // });
    // console.log('buyOrderResult:', buyOrderResult);

    // const sellOrderResult = await client.submitOrder({
    //   category: 'linear',
    //   symbol: 'DOGEUSDT',
    //   orderType: 'Market',
    //   qty: '1',
    //   side: 'Sell',
    // });
    // console.log('sellOrderResult:', sellOrderResult);


    // const print = await client.getActiveOrders({"USDT"});
    // console.log('sellOrderResult:', print['result']);

  } catch (e) {
    console.error('request failed: ', e);
  }
})();

// async function fetchActiveOrders() {
//   try {
//       const response = await client.getActiveOrders({ 
//           symbol: "XRPUSDT",
//           category: "linear" // Replace with the appropriate category value
//       });
//       console.log('sellOrderResult:', response.result);
//   } catch (error) {
//       console.error('Error fetching active orders:', error);
//   }
// }

//fetchActiveOrders();

function convertPercentageStringToNumber(percentageString) {
  // Remove the '%' character and convert to a number
  return parseFloat(percentageString.replace('%', '')) / 100;
}


// Example usage:
const targetBtcAllocationString = "-10.00%";
const targetBtcAllocationNumber = convertPercentageStringToNumber(targetBtcAllocationString);

console.log(targetBtcAllocationNumber); // Outputs: -10.00

async function fetchActiveOrders1() {
  try {
    // const response = await client.getWalletBalance({
    //   accountType: "UNIFIED"
    // });

    const response = await client.getWalletBalance({
      accountType: "UNIFIED"
    });
    console.log('Response:', response.result);


    const totalEquity = parseFloat(response.result.list[0].totalEquity)*lev;

    const responseBTC = await client.getPositionInfo({
      category: 'linear',
            symbol: 'BTCUSDT',

    });
    console.log('Response:', response.result.list);
    const responseETH = await client.getPositionInfo({
      category: 'linear',
            symbol: 'ETHUSDT',

    });
    const btcDetails = responseBTC.result.list[0];
    const ethDetails = responseETH.result.list[0];
    console.log('Response btc details:', btcDetails);
    console.log('Response btc details:', ethDetails);



    let btcEquity = 0, btcUsdValue = 0, ethEquity = 0, ethUsdValue = 0, btc_price = 0, eth_price =0,   btc_side=  'Buy',eth_side=  'Buy';

    if (btcDetails) {
      btcEquity = parseFloat(btcDetails["size"]);
      btcUsdValue =parseFloat( btcDetails["positionValue"]);
      if (btcDetails["positionValue"] === '' )
      {
        btcUsdValue =0

      }
      
      btc_side = btcDetails.side;
      if (btc_side === 'Sell' )
      {
        btcUsdValue *= -1;
        btcEquity *= -1;


      }
      btc_price = parseFloat( btcDetails.markPrice);
    }

    if (ethDetails) {
      ethEquity =parseFloat(ethDetails["size"]);
      ethUsdValue =parseFloat( ethDetails["positionValue"]);
      if (ethDetails["positionValue"] === '' )
      {
        ethUsdValue =0

      }
      eth_side = ethDetails.side;

      if (eth_side === 'Sell' )
      {
        ethUsdValue *= -1;
        ethEquity *= -1;


      }

      eth_price = parseFloat( ethDetails.markPrice);
    }

    let btcPercentageOfTotalEquity = 0, ethPercentageOfTotalEquity = 0;

    if (totalEquity > 0) {
      btcPercentageOfTotalEquity = (btcUsdValue / totalEquity) * 100;
      ethPercentageOfTotalEquity = (ethUsdValue / totalEquity) * 100;
    }

    const newJson = {
      "total_equity": totalEquity,
      "btc_equity": btcEquity,
      "btc_$equity": btcUsdValue,
      "eth_equity": ethEquity,
      "eth_$equity": ethUsdValue,
      "btc_%of_totalEquity": btcPercentageOfTotalEquity,
      "eth_%of_totalEquity": ethPercentageOfTotalEquity
    };

    console.log('Current Portfolio:', newJson);

    // Assuming main123 returns an array [targetBtcAllocation, targetEthAllocation]
    const [targetBtcAllocation, targetEthAllocation] = await main123();

    console.log("Target BTC Allocation:", convertPercentageStringToNumber(targetBtcAllocation));
    console.log("Target ETH Allocation:", convertPercentageStringToNumber(targetEthAllocation));

    // Calculate the target USD value for BTC and ETH
    const targetBtcUsdValue = totalEquity * convertPercentageStringToNumber(targetBtcAllocation) ;
    const targetEthUsdValue = totalEquity * convertPercentageStringToNumber(targetEthAllocation);

    // Calculate the amount to buy/sell
    const btc$ToAdjust = targetBtcUsdValue - btcUsdValue;
    const eth$ToAdjust = targetEthUsdValue - ethUsdValue;

    const btcToAdjust = btc$ToAdjust / btc_price;
    const ethToAdjust = eth$ToAdjust / eth_price;



    console.log("targetBtcUsdValue", targetBtcUsdValue);
    console.log("targetEthUsdValue", targetEthUsdValue);

    console.log("btcToAdjust", btcToAdjust);

    console.log("ethToAdjust", ethToAdjust);

    const testData = {
      displayTPIValues: [
          
          { displayName: 'Bybit total Equity', score:totalEquity  }
          // Add more items as needed
      ]
      // Include other necessary properties as expected by your alert function
  };
  
  // Call the alert function with test data
  alerts.discordTPIAlert(testData)
      .then(() => console.log('Alert sent successfully.'))
      .catch(error => console.error('Error sending alert:', error));




    // Submit BTC Market Order
    if (btcToAdjust !== 0) {
      const btcOrderResult = await client.submitOrder({
        category: 'linear',
        symbol: 'BTCUSDT',
        orderType: 'Limit',
        qty: (Math.abs(btcToAdjust)).toFixed(3),
        side: btcToAdjust > 0 ? 'Buy' : 'Sell',
        price: btc_price.toString(),
        // Other necessary parameters...
      });
      console.log('BTC Order Result:', btcOrderResult);
    }

    // Submit ETH Market Order
    if (ethToAdjust !== 0) {
      const ethOrderResult = await client.submitOrder({
        category: 'linear',
        symbol: 'ETHUSDT',
        orderType: 'Limit',
        price: eth_price.toString(),

        qty: Math.abs(ethToAdjust).toFixed(2),
        side: ethToAdjust > 0 ? 'Buy' : 'Sell',

        // Other necessary parameters...
      });
      console.log('ETH Order Result:', ethOrderResult);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchActiveOrders1();


