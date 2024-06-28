import request from "./apiConfig";

import { UserProps } from '../Interfaces/Iuser';

export default class Api {
    static fetchLogin(user: UserProps) {
        return request('/login', { method: "POST", body: user});
    }

    static fetchRegistration(user: UserProps) {
        return request('/register/', { method: "POST", body: user });
    }

    // courses 

    static fetchGetCourses() {
        return request('/courses/all', { method: "GET" });
    }

    static fetchGetCourse(id: string) {
        return request('/courses/' + id, { method: "GET" });
    }
}