import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import GetInTouchBottom from './components/GetInTouchBottom';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Fitness from './components/Fitness';
import Writing from './components/Writing';
import FullJournal from './components/FullJournal';
import WorkExperience from './components/WorkExperience';
import TagResults from './components/TagResults';
import ImageGallery from './components/imageGallery.jsx';
import FullImageGallery from './components/FullImageGallery';
import NewPost from './components/NewPost.jsx';
import Login from './components/Login.jsx';
import ScreenshotsNotes from './components/ScreenshotsNotes.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App p-0 md:p-[50px] pt-[20px] lg:p-[60px] xl:p-[100px] bg-white max-w-7xl mx-auto">
          <Header />

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
                    <ImageGallery />
                  </div>
                  <div>
                    <ScreenshotsNotes />
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
            {/* other pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/FullJournal" element={<FullJournal />} />
            <Route path="/tags/:tagName" element={<TagResults />} />
            <Route path="/image-gallery" element={<FullImageGallery />} />
            <Route
              path="/new-post"
              element={
                <ProtectedRoute>
                  <NewPost />
                </ProtectedRoute>
              }
            />
          </Routes>

          <footer className="w-full text-center p-6 mt-10 border-t border-gray-300 font-mono text-xs text-gray-600">
            © {new Date().getFullYear()} Shaun Allsopp. All rights reserved.
            <p className="mt-2 text-xs">v1.0.1</p>
          </footer>
        </div >
      </AuthProvider>
    </Router >
  );
}

export default App;
