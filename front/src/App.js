import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled  from 'styled-components';
import 'antd/dist/antd.min.css';

import DefaultHeader from './DefaultLayout.jsx';
import BlockInfo from './components/blockInfo.jsx'
import ViewBlock from './pages/viewBlock.jsx'
import ViewTx from './pages/viewTx.jsx';
import ViewWallet from './pages/viewWallet.jsx'
import ViewCoinbase from './pages/viewCoinbase.jsx'

const Wrap = styled.div`
  width : 100%;
  height : 100%;
  overflow : hidden; 
  position : relative;
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  return (
    <Wrap>
      <BrowserRouter>
        <DefaultHeader/>
        <Routes>
          <Route path="/" element={<BlockInfo />} />
          <Route path="/viewBlock/:idx" element = {<ViewBlock/>} />
          <Route path="/viewTx/:idx" element = {<ViewTx/>}/>
          <Route path="/viewWallet/:idx" element = {<ViewWallet/>}/>
          <Route path='/viewCoinbase/:idx' element = {<ViewCoinbase/>} />
        </Routes>
      </BrowserRouter>
    </Wrap>
  )
};

export default App;
