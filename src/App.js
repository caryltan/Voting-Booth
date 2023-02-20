// modules
import { Routes, Route } from 'react-router-dom';
import * as React from 'react';

// components
import ErrorPage from "./Pages/ErrorPage";
import CreatePoll from './Pages/CreatePoll';
import FindPoll from './Pages/FindPoll';
import VotingBooth from './Pages/VotingBooth';
import Results from './Pages/Results';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import PollConfirmation from './Components/PollConfirmation';
import Hamburger from './Components/Hamburger';

// CSS
import './App.scss';

//function for the hamburger menu


function App() {
  
  return (
    <div className="app wrapper">
      <header>
        <NavBar />
        <Hamburger />               
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpoll" element={<CreatePoll />} />
          <Route path="/pollConfirmation" element={<PollConfirmation />} />
          <Route path="/findpoll" element={<FindPoll />} />
          <Route path="/votingbooth/:boothID" element={<VotingBooth />} />
          <Route path="/results/:boothID" element={<Results />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;