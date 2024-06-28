import './EmptyCourseList.css'

import Button from "../../common/Button/Button";

export default function EmptyCourseList() {
    return (
       <>
            <div className="box">
                <h1>Your List Is Empty</h1>
                <p>Please use 'Add New Course' button to add your first course</p>
                <Button name='ADD NEW COURSE' />
            </div>
       </>
    );
}
