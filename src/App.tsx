import './App.css';
import { useState } from 'react'; // Import useState hook

import { mockedCoursesList, mockedAuthorsList } from "./constants";
import { CourseCardProps } from './Interfaces/ICourseCard';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';

function App() {
  // State to track the selected course
  const [selectedCourse, setSelectedCourse] = useState<CourseCardProps>();

  // Function to handle selecting a course
  const handleCourseSelect = (courseId: string | undefined) => {
    const selected = mockedCoursesList.find(course => course.id === courseId);
    setSelectedCourse(selected as CourseCardProps);
  };

  return (
    <>
      <Header name='Harry Potter' auth={true} />
      {mockedCoursesList.length === 0 ? (
        <EmptyCourseList />
      ) : (
        selectedCourse === undefined ? (
          <Courses courses={mockedCoursesList as CourseCardProps[]} authors={mockedAuthorsList} onCourseSelect={handleCourseSelect} />
        ) : (
          <div className="selected-course">
            <CourseInfo course={selectedCourse} authors={mockedAuthorsList} onCourseSelect={handleCourseSelect} />
          </div>
        )
      )}
    </>
  )
}

export default App;
