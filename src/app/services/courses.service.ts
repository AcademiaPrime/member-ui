import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private readonly hostname = 'http://localhost:8080/mockup/';
    constructor(private httpClient: HttpClient) {
    }

    getCoursesApi() {
        const url = 'courses.json';
        return this.httpClient.get(`${this.hostname}${url}`);
    }

}
