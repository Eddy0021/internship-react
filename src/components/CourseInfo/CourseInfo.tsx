import React, { useEffect, useState } from 'react';
import './CourseInfo.css';

import { CourseCardProps } from '../../Interfaces/ICourseCard';
import Button from '../../common/Button/Button';

import { handleDuration } from '../../helpers/getCoursesDuration';
import { useParams, useNavigate } from 'react-router-dom';

const CourseInfo: React.FC<{ courses: CourseCardProps[]; authors: { id: string; name: string }[] }> = ({ courses, authors }) => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState<CourseCardProps | null>(null);

    useEffect(() => {
        const course = courses.find(course => course.id === courseId);
        if (course) {
            setSelectedCourse(course);
        } else {
            setSelectedCourse(null);
        }
    }, [courseId, courses]); 

    const handleAuthors = (authors: { id: string; name: string }[]) => {
        const MAX_LENGTH = 30;
        if (!selectedCourse) return '';

        let authorNames = authors
            .filter(author => selectedCourse.authors.includes(author.id))
            .map(author => author.name)
            .join(', ');

        if (authorNames.length > MAX_LENGTH) {
            authorNames = authorNames.substring(0, MAX_LENGTH) + '...';
        }
        return authorNames;
    };

    if (!selectedCourse) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="selected-course">
            <div className="outter-title">
                <h3>{ selectedCourse.title }</h3>
            </div>
            <div className="card">
                <div className="card-title">
                    <h4>Description:</h4>
                </div>
                <div className="card-info">
                    <div className="card-info-description">
                        { selectedCourse.description }
                    </div>
                    <span className='vertical-line'></span>
                    <div className="card-info-details single-card-info-details">
                        <div className="rows single-rows">
                            <div className="row">
                                <b>ID:</b>
                                { selectedCourse.id }
                            </div>
                            <div className="row">
                                <b>Authors:</b>
                                { handleAuthors(authors) }
                            </div>
                            <div className="row">
                                <b>Duration:</b>
                                { handleDuration(selectedCourse.duration) }
                            </div>
                            <div className="row">
                                <b>Created:</b>
                                { selectedCourse.creationDate }
                            </div>
                        </div>                
                    </div>
                </div>
            </div>
            <div className="buttons single-buttons">
                <Button name='BACK' onClick={() => navigate('/courses')}/>
            </div>
        </div>     
    )
}

export default CourseInfo