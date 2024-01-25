import { RestClientV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';
const key = "1K1DGfEqJg5nMZnrau";
const secret = "iskpN4znl3s7BzfPcqkWhIniHfacDvkDGPbl";

const client = new RestClientV5(
  {
    key: key,
    secret: secret,
    parseAPIRateLimits: true,
    testnet: true,
    // Sometimes using a proxy introduces recv timestamp errors (due to the extra latency)
    // If that happens, you can try increasing the recv window (which is 5000ms by default)
    // recv_window: 10000,
  },
  {
    proxy: {
      host: 'proxyhost',
      port: Number('proxyport'),
      auth: {
        username: 'proxyuserifneeded',
        password: 'proxypassifneeded',
      },
    },
  },
);

(async () => {
  try {
    const res = await client.getWalletBalance({ accountType: 'UNIFIED' });

    console.log('response: ', JSON.stringify(res, null, 2));

    const orders = await client.batchSubmitOrders('linear', [
      {
        symbol: 'DOGEUSDT',
        orderType: 'Market',
        side: 'Buy',

        qty: '8',
        orderIv: '6',
        timeInForce: 'GTC',
        orderLinkId: 'option-test-001',
        mmp: false,
        reduceOnly: false,
      },
      {
        symbol: 'DOGEUSDT',
        orderType: 'Limit',
        side: 'Sell',
        qty: '1',
        price: '1',
        timeInForce: 'GTC',
        orderLinkId: 'option-test-001',
        mmp: false,
        reduceOnly: false,
      },
    ]);

    console.log('orders: ', JSON.stringify(orders, null, 2));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
