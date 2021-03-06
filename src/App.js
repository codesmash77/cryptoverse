import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, PriceTracker, Homepage, Cryptocurrencies, News, CryptoDetails, ReturnsCalculator, CryptoAnalyzer } from './components';
import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme as customTheme } from './components/Crypto Analyzer/theme';

import { Amplify } from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';


Amplify.configure(awsExports);


const App = () => {
   const mode = 'dark';
  
  return (
    <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>          
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage/>
            </Route>
            <Route exact path="/pricetracker">
              <PriceTracker/>
            </Route>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies/>
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails/>
            </Route>
            <Route exact path="/news">
              <News/>
            </Route>
            <Route exact path="/returnscalc">
              <ReturnsCalculator/>
            </Route>
            <Route exact path="/cryptoanalyzer">
              <ThemeProvider theme={customTheme[mode]}>
                <CssBaseline />
                <CryptoAnalyzer/>
              </ThemeProvider>
            </Route>
          </Switch>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2022 
          <Link to="/">
            Cryptoverse Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/pricetracker">PriceTracker</Link>
          <Link to="/returnscalc">Returns Calculator</Link>
          <Link to="/news">News</Link>
          <Link to="/cryptoanalyzer">Crypto Analyzer</Link>
        </Space>
        <AmplifySignOut />
      </div>
    </div>
    </div>
  )
}

export default withAuthenticator(App);
