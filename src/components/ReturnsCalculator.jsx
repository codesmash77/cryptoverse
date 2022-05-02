import React, { useState } from 'react';
import { coinList } from '../static/coinlist';
import 'antd/dist/antd.css';
import { CalculatorOutlined } from '@ant-design/icons';
import { Space, Layout, Input, Button, Select } from 'antd';

const ReturnsCalculator = () => {

    const [trade, setTrade] = useState({
    sellData: {},
    buyData: {},
    gains: 0,
    valid: false,
  });


  const [buyDate, setBuyDate] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [coin, setCoin] = useState(coinList.name);
  const [volume, setVol] = useState(null);

  const calcGains = () => {
    setTrade({
      ...trade,
      gains:
        (trade.sellData.market_data?.current_price.usd -
          trade.buyData.market_data?.current_price.usd) *
        volume,
    });
  }; 

  const coingeckoUrl = (coin, date) => {
    return `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date}&localization=false`;
  };

  const coingeckoFetch = async (buy, coin, date) => {
    fetch(coingeckoUrl(coin, date)).then((response) =>
      response.json().then((jsonData) => {
        if (buy) {
          setTrade({ ...trade, buyData: jsonData });
        } else {
          setTrade({ ...trade, sellData: jsonData });
        }
      })
    );
  };

  const handleBuyChange = (e) => {
    let val = e.target.value;
    setBuyDate(val);
    coingeckoFetch(true, coin, val);
  };

  const handleSellChange = (e) => {
    let val = e.target.value;
    setSellDate(val);
    coingeckoFetch(false, coin, val);
  };

  const handleCoinChange = (e) => {
    let val = e;
    setCoin(val);
    coingeckoFetch(null, coin, val);
  };




  return (
<div>
      <h1> 📈🚀 Cryptocurrency Returns Calculator 😢📉 </h1>
      <Space
        direction="vertical"
        style={{
        width: '100%',
        }}
       >
        <div>  
            <h2> 🏦 Select Coin </h2>
            <Select 
            style={{ width: '100%' }} placeholder="None Selected" 
            defaultValue={coin}
            onChange={(val) => handleCoinChange(val)}
            >
              {coinList.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </Select>
            <h2>Enter Buy Date </h2>
            <Input 
            placeholder="dd-mm-yyyy"
            format="dd-mm-yyyy"
            helperText="Insert date in the correct format"
            defaultValue={buyDate}
            onChange={(val) => handleBuyChange(val)}
            />

            <h2>Enter Sell Date</h2>
            <Input 
            placeholder="dd-mm-yyyy"
            format="dd-mm-yyyy"
            helperText="Insert date in the correct format"
            defaultValue={sellDate}
            onChange={(val) => handleSellChange(val)}
            />
          <Layout>
            <h2> 💰 Enter Amount of Tokens</h2>
            <Input 
            placeholder="Number of Tokens" 
            value={volume}
            onChange={(e) => setVol(e.target.value)}
            />
          </Layout>
        </div>
        <div className="bottom-row"></div>
        <Button type="primary" icon={<CalculatorOutlined/>} color="primary" onClick={calcGains}>
            Calculate
        </Button>
        <h1 style={{ color: trade.gains < -1 ? "red" : "green" }}>
          🤑💸 Returns: ${trade.gains.toFixed(2)} USD 💸🤑
        </h1>
        <h3>
          You've bought {trade.buyData.name} at:{" "}
          {trade.buyData.market_data?.current_price.usd.toFixed(2)} USD
        </h3>
        <h3>
          You've sold {trade.buyData.name} at:{" "}
          {trade.sellData.market_data?.current_price.usd.toFixed(2)} USD
        </h3>
        <h4>
          <h2>Warning:</h2> If the calculator doesn't calculate your returns, re-check the
          accuracy of the dates you input and the format (dd-mm-yyyy). Always
          restart the application in between calculations. Start from the left
          to right when inputting the data. As this is a tutorial, continue
          building this and make it better! Some ideas include adding a
          percentage on your gains, change the emojis based on the results,
          and/or conditionally render the "USD" and other text elements.
        </h4>
      </Space>
    </div>
  );
}

export default ReturnsCalculator