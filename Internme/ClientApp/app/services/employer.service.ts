import { Inject, Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Employer } from '../models/employer.model';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployerService {
    private BASE_URL: string;
    private SERVICE_URL: string = "api/Employers";

    constructor(private http: Http) {
    }

    getAll(): Observable<Employer[]> {
        return this.http
            .get(`${this.SERVICE_URL}`)
            .map((response) => {
                console.log(response);
                return response.json();
            });
    }

    get(id: number): Observable<Employer> {
        return this.http
            .get(`${this.SERVICE_URL}/${id}`)
            .map((response) => response.json());
    }
}