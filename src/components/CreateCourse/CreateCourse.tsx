import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CreateCourse.css';

import { mockedAuthorsList as initialAuthorsList, mockedCoursesList } from '../../constants';

//import Api from '../../constants/apiPaths';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { AuthorProps } from '../../Interfaces/IAuthor';
import { handleDuration } from '../../helpers/getCoursesDuration';

const Login = () => {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [duration, setDuration] = useState<number>(0);
    const [mockedAuthorsList, setMockedAuthorsList] = useState(initialAuthorsList);
    const [newAuthor, setNewAuthor] = useState<string>('');
    const [selectedAuthors, setSelectedAuthors] = useState<AuthorProps[]>([]);

    const handleAddAuthor = (newAuthor: AuthorProps) => {
        setSelectedAuthors([...selectedAuthors, newAuthor]);
    }

    const handleDeleteAuthor = (newAuthor: AuthorProps) => {
        const index = initialAuthorsList.findIndex(author => author.id === newAuthor.id);

        if (index !== -1) {
            initialAuthorsList.splice(index, 1);
            setMockedAuthorsList(prevAuthorsList => {
                // Filter out the author with the matching id
                return prevAuthorsList.filter(author => author.id !== newAuthor.id);
            });
        } 
    }

    const handleDeleteAuthorSelected = (newAuthor: AuthorProps) => {
        const updatedAuthors = selectedAuthors.filter(author => author.id !== newAuthor.id);

        setSelectedAuthors(updatedAuthors);
    }

    const handleAddAuthorToDB = () => {    
        setMockedAuthorsList([...mockedAuthorsList, { id: new Date().getTime().toString(), name: newAuthor}]);
        initialAuthorsList.push({ id: new Date().getTime().toString(), name: newAuthor})
    }

    const handleAddCourse = () => {
        if(title === '') { alert("Title can't be empty"); }
        else if (description === '') { alert("Description can't be empty"); }
        else if (duration === 0) { alert("Duration can't be empty"); }
        else if (selectedAuthors.length === 0) { alert("Select at least one author"); }

        const formattedDate = getFormattedDate();
        
        mockedCoursesList.push({
            id: new Date().getTime().toString(),
            title: title,
            description: description,
            creationDate: formattedDate,
            duration: duration,
            authors: selectedAuthors.map(item => item.id)
        })

        navigate('/courses');
    }

    function getFormattedDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
    
        return mm + '/' + dd + '/' + yyyy;
    }

    return (
        <div className="box">
            <h1>Course Edit/Create Page</h1>
            <div className="box-form">
                <div className="main">
                    <h2>Main Info</h2>
                    <div className="input">
                        <label>Title:</label>
                        <Input input={{ type: 'text', placeholder: 'Title', required: true, width: '80rem'}} textChanged={(title: string) => setTitle(title)} />
                    </div>
                    <div className="input">
                        <label>Description:</label>
                        <Input input={{ type: 'text', placeholder: 'Description', required: true, width: '80rem' }} textChanged={(description: string) => setDescription(description)} />
                    </div>             
                </div>
                <div className="duration">
                    <h2>Duration</h2>
                        <div className="input">
                            <label>Duration:</label>
                            <div className="input-bottom">
                                <Input input={{ type: 'number', placeholder: 'Duration', required: true }} textChanged={(duration: string) => { setDuration( parseInt(duration)) }} />
                                <label>{handleDuration(duration)} <span>hours</span></label>
                            </div>
                        </div>
                </div>
                <div className="authors">           
                    <div className="left">
                        <h2>Authors</h2>
                        <div className="left-top">
                            <div className="input">
                                <label>Author Name:</label>
                                <Input input={{ type: 'text', placeholder: 'Author name', required: true, width: '20rem' }} textChanged={(newAuthor: string) => { setNewAuthor(newAuthor) }} />
                            </div> 
                            <Button name='CREATE AUTHOR' onClick={handleAddAuthorToDB} />
                        </div>
                        <div className="left-bottom">
                            <h4>Author List</h4>
                            <div className="authors-list-db">
                                {
                                    mockedAuthorsList.length === 0 ? <p>Authors list is empty</p> :
                                    mockedAuthorsList.map((author, index) => (
                                        !selectedAuthors.some(selectedAuthor => selectedAuthor.id === author.id) && (
                                            <AuthorItem
                                                key={index}
                                                authorProp={author}
                                                handleAddAuthor={handleAddAuthor}
                                                handleDeleteAuthor={handleDeleteAuthor}
                                                toShowAdd={true}
                                            />
                                        )
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="righ">
                        <h2>Course Authors</h2>
                        <div className="authors-list-selected">
                            {
                                selectedAuthors.length === 0 ? <p>Authors list is empty</p> :
                                selectedAuthors.map((author, index) => (
                                    <AuthorItem key={index} authorProp={author} handleDeleteAuthor={handleDeleteAuthorSelected} toShowAdd={false} />
                                ))
                            }
                        </div>
                    </div>  
                </div>
            </div>
            <div className="buttons">
                <Button name='CANCEL' onClick={() => { navigate('/courses') }} />
                <Button name='CREATE COURSE' onClick={handleAddCourse} />
            </div>
        </div>
    )
}

export default Login;
