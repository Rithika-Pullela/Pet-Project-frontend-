import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import { QueryClientProvider, QueryClient } from 'react-query'
import React from 'react';
import Studenthome from './components/Studenthome';
import Facutlyhome from './components/Facultyhome'
import Syt from './components/Syt';
import EnrolledCoursePage from './components/EnrolledCoursePage';


const queryClient = new QueryClient();


function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Login />}> </Route>
        <Route path='/shome' element={<Studenthome />}></Route>
        <Route path='/fhome' element={<Facutlyhome />}></Route>
        <Route path='/subjects/:id' element={<Syt/>}></Route>
        <Route path='/Courses/:id' element={<EnrolledCoursePage/>}> </Route>
      </Routes>

    </QueryClientProvider >
  );
}

export default App;
