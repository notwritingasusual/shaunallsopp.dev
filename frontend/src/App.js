import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import GetInTouchBottom from './components/GetInTouchBottom';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Fitness from './components/Fitness';
import Writing from './components/Writing';
import FullJournal from './components/FullJournal';
import WorkExperience from './components/WorkExperience';


function App() {
  return (
    <Router>
      <div className="App p-0 lg:p-[50px] xl:p-[100px]">
        <Header />

        {/* ----------------------routing setup----------------------- */}
        <Routes>
          {/* home page */}
          <Route
            path="/"
            element={
              <>
                <div>
                  <Projects />
                </div>
                <div>
                  <WorkExperience />
                </div>
                <div>
                  <Blog />
                </div>
                <div>
                  <Fitness />
                </div>
                <div>
                  <Writing />
                </div>
                <div>
                  <GetInTouchBottom />
                </div>
              </>
            }
          />
          {/* link to full journal entries */}
          <Route path="/FullJournal" element={<FullJournal />} />
        </Routes>
        {/*-------------------------------------------------------------*/}


        <footer className="w-full text-center p-6 mt-10 border-t border-gray-300 font-mono text-xs text-gray-600">
          © {new Date().getFullYear()} Shaun Allsopp. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
