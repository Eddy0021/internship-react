import './Courses.css'

import { useState, useEffect } from 'react';

import { CourseCardProps } from '../../Interfaces/ICourseCard';

import SearchBar from "./components/SearchBar/SearchBar";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import { useNavigate } from 'react-router-dom';

interface CoursesProps {
    courses: CourseCardProps[];
    authors: { id: string; name: string }[];
    textChanged?: (data: string) => void;
}

export default function Courses({ courses, authors }: CoursesProps) {
    const navigator = useNavigate();

    const [filteredCourses, setFilteredCourses] = useState<CourseCardProps[]>(courses);
    const [token, setToken] = useState<string | null>(null);

    const handleTextChange = (text: string) => {
        const filtered = courses.filter(course => {
            // Filter by occurrence of text in title or ID
            return (
                course.title.toLowerCase().includes(text.toLowerCase()) ||
                course.id.toLowerCase().includes(text.toLowerCase())
            );
        });
        setFilteredCourses(filtered);
    };
    
    const handleAddCourseClick = () => {
        navigator('/courses/add')
    }

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            setToken(token);
        }
    },[])

    return (
       <>
            <div className="courses-actions">
                <SearchBar textChanged={handleTextChange} />
                {
                    token !== null && 
                    <Button name="ADD NEW COURSE" onClick={handleAddCourseClick} />
                }          
            </div>
            <div className="courses-lists">
                {filteredCourses.map((course: CourseCardProps) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        mockedAuthorsList={authors}
                    />
                ))}
            </div>
       </>
    );
}
