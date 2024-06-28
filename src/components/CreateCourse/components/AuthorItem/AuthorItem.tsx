import { useEffect, useState } from 'react';
import './AuthorItem.css'

import {AuthorProps} from '../../../../Interfaces/IAuthor';

type AuthorItemProps = {
    authorProp: AuthorProps,
    handleAddAuthor?: OnSpanClickHandler;
    handleDeleteAuthor: onDeleteClickHandler;
    toShowAdd?: boolean;
};
type OnSpanClickHandler = (authorProp: AuthorProps) => void;
type onDeleteClickHandler = (authorProp: AuthorProps) => void;

const AuthorItem: React.FC<AuthorItemProps> = ({authorProp, handleAddAuthor, handleDeleteAuthor, toShowAdd}) => {
    const [author, setAuthor] = useState<AuthorProps | null>(null);

    useEffect(() => {
        setAuthor(authorProp);
    }, [authorProp])

    const handleAdd = () => {
        if(author && handleAddAuthor){
            handleAddAuthor(author);
        }       
    }

    const handleDelete = () => {
        if(author){
            handleDeleteAuthor(author);
        }
    }
    
    return (
        <div className="authors-row">
            <p>{ author?.name }</p> 
            <div className="actions">
                { toShowAdd === true ? <span className='add-author' onClick={handleAdd}>+</span> : <span></span> }        
                <span className='remove-Author' onClick={handleDelete}>&#128465;</span>
            </div>
        </div>
    )
}

export default AuthorItem;
