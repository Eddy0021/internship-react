import './App.css';

import { Routes, Route, Navigate } from "react-router-dom";

import { mockedCoursesList, mockedAuthorsList } from "./constants";

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CreateCourse from './components/CreateCourse/CreateCourse';

function App() {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
  });
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
        setToken(token);
    }
  }, [token])

  return (
    <>
      <Header />
      <Routes>
        {
          token === null ? (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/courses" element={<Navigate to="/login" />} />
            </>
           ) : (
            <>
              <Route path="/" element={<Navigate to="/courses" />} />
              { mockedCoursesList.length === 0 ? (
                <Route path="/courses" element={<EmptyCourseList />}/>
              ) : (
                <>
                  <Route path="/courses" element={<Courses courses={mockedCoursesList} authors={mockedAuthorsList} />}/>
                  <Route path='/courses/:courseId' element={<CourseInfo courses={mockedCoursesList} authors={mockedAuthorsList} />} /> 
                </>
              )}
            </>           
          )
        }      
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/courses/add" element={<CreateCourse />} />
      </Routes>
    </>
  )
}

export default App;
