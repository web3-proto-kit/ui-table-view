import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './Table';
import AppBar from './AppBar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <div>
   <AppBar />
   <Table/>
   </div>
   , document.getElementById('root')
);
registerServiceWorker();
