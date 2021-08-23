import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from "./components/Calendar"
import { goToCurrentMonth } from './utils/windowFunctions';
import Navbar from './components/navbar';
import journalrLogo from "./Journalr.svg"
import logOut from "./utils/logOut"
import checkIfLoggedIn from './utils/checkIfLoggedIn';
import "react-toastify/dist/ReactToastify.css"
checkIfLoggedIn()

goToCurrentMonth()


ReactDOM.render(
  <React.StrictMode>
    <Navbar imgSrc={journalrLogo} imgHref = {goToCurrentMonth} imgAlt = "JournalR Logo" handleButton={logOut}/>
    <Calendar year={2021}/>
  </React.StrictMode>,
  document.getElementById('root')
);


