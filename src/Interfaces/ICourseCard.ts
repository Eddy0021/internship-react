export interface CourseCardProps {
    id: string,
    title : string,
    description : string,
    authors : string[],
    duration : number,
    creationDate : string,
    mockedAuthorsList?: { id: string; name: string }[];
}