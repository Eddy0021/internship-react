import './Courses.css'

import { useState, useEffect } from 'react';

import { CourseCardProps } from '../../Interfaces/ICourseCard';

import SearchBar from "./components/SearchBar/SearchBar";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";

interface CoursesProps {
    courses: CourseCardProps[];
    authors: { id: string; name: string }[];
    onCourseSelect: (data: string) => void;
    textChanged?: (data: string) => void;
}

export default function Courses({ courses, authors, onCourseSelect }: CoursesProps) {
    const [filteredCourses, setFilteredCourses] = useState<CourseCardProps[]>(courses);

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
    

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    return (
       <>
            <div className="courses-actions">
                <SearchBar textChanged={handleTextChange} />
                <Button name="ADD NEW COURSE" />
            </div>
            <div className="courses-lists">
                {filteredCourses.map((course: CourseCardProps) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        mockedAuthorsList={authors}
                        onCourseSelect={onCourseSelect}
                    />
                ))}
            </div>
       </>
    );
}
