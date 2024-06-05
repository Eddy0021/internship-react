import React from 'react';
import './CourseInfo.css';

import { CourseCardProps } from '../../Interfaces/ICourseCard';
import Button from '../../common/Button/Button';

const CourseInfo: React.FC<{ course: CourseCardProps; authors: { id: string; name: string }[], onCourseSelect: (data: string | undefined) => void; }> = ({ course, authors, onCourseSelect }) => {

    const handleAuthors = (authors: { id: string; name: string }[]) => {
        const MAX_LENGTH = 30;
        let authorNames = authors
            .filter(author => course.authors.includes(author.id))
            .map(author => author.name) 
            .join(', '); 
    
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
        <>
            <div className="outter-title">
                <h3>{ course.title }</h3>
            </div>
            <div className="card">
                <div className="card-title">
                    <h4>Description:</h4>
                </div>
                <div className="card-info">
                    <div className="card-info-description">
                        { course.description }
                    </div>
                    <span className='vertical-line'></span>
                    <div className="card-info-details single-card-info-details">
                        <div className="rows single-rows">
                            <div className="row">
                                <b>ID:</b>
                                { course.id }
                            </div>
                            <div className="row">
                                <b>Authors:</b>
                                { handleAuthors(authors) }
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
                    </div>
                </div>
            </div>
            <div className="buttons single-buttons">
                <Button name='BACK' onClick={() => onCourseSelect(undefined)}/>
            </div>
        </>       
    )
}

export default CourseInfo