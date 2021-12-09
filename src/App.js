import React from 'react';

//Routing 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound'
import Login from './components/Login';

//Context
import UserProvider from './context';

// Styles
import { GlobalStyle } from './GlobalStyle';

const App = () =>  (
    <Router>   {/* wrap whole app into the Router */}
      <UserProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />  {/* first route to 'Home' */}
          <Route path='/login' element={<Login />} />
          <Route path='/:movieId' element={<Movie />} />  {/* route to movie page by movieID (this param name can be changed) */}
          <Route path='/*' element={<NotFound />} />  {/* route to NotFound page  - any page that doesn't exist*/}
        </Routes>
        <GlobalStyle/>
      </UserProvider>
    </Router>
  );

export default App;
