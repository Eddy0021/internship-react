import React from 'react';
import './CourseCard.css';

import { CourseCardProps } from '../../../../Interfaces/ICourseCard';

import Button from '../../../../common/Button/Button';

import { handleDuration } from '../../../../helpers/getCoursesDuration';
import { useNavigate } from 'react-router-dom';

interface courseCard {
    course: CourseCardProps,
    mockedAuthorsList: { id: string; name: string }[];
}

const CourseCard: React.FC<courseCard> = ({ course, mockedAuthorsList }) => {
    const navigate = useNavigate();

    const handleAuthors = (authors: string[]) => {
        const MAX_LENGTH = 30;
        let authorNames = authors.map(authorId => {
            const author = mockedAuthorsList?.find(author => author.id === authorId);
            return author ? author.name : '';
        }).join(', '); 

        if (authorNames.length > MAX_LENGTH) {
            authorNames = authorNames.substring(0, MAX_LENGTH) + '...';
        }
        return authorNames;
    }
    
    return (
        <div className="card">
            <div className="card-title">
                <h3>{ course.title }</h3>
            </div>
            <div className="card-info">
                <div className="card-info-description">
                    { course.description }
                </div>
                <div className="card-info-details">
                    <div className="rows">
                        <div className="row">
                            <b>Authors:</b>
                            { handleAuthors(course.authors) }
                        </div>
                        <div className="row">
                            <b>Duration:</b>
                            { handleDuration(course.duration) }
                        </div>
                        <div className="row">
                            <b>Created:</b>
                            { course.creationDate }
                        </div>
                    </div>
                    <div className="buttons">
                        <Button name='SHOW COURSE' onClick={() => navigate('/courses/'+course.id)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard