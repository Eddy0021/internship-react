import React from 'react';
import './CourseCard.css';

import { CourseCardProps } from '../../../../Interfaces/ICourseCard';

import Button from '../../../../common/Button/Button';

interface courseCard {
    course: CourseCardProps,
    mockedAuthorsList: { id: string; name: string }[];
    onCourseSelect: (data: string) => void;
}

const CourseCard: React.FC<courseCard> = ({ course, mockedAuthorsList, onCourseSelect }) => {

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

    const handleDuration = (duration: number) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        let formattedDuration = '';

        if (hours < 10) {
            formattedDuration += '0' + hours;
        } else {
            formattedDuration += hours;
        }

        formattedDuration += ':';

        if (minutes < 10) {
            formattedDuration += '0' + minutes;
        } else {
            formattedDuration += minutes;
        }

        if (hours === 1) {
            formattedDuration += ' hour';
        } else {
            formattedDuration += ' hours';
        }

        return formattedDuration;
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
                        <Button name='SHOW COURSE' onClick={() => onCourseSelect(course.id)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard