import { Inject, Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Application } from '../models/application.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApplicationService {
    private BASE_URL: string;
    private SERVICE_URL: string = "api/Applications";

    constructor(private http: Http) {
    }

    getAll(): Observable<Application[]> {
        return this.http
            .get(`${this.SERVICE_URL}`)
            .map((response) => {
                console.log(response);
                return response.json();
            });
    }

    get(id: number): Observable<Application> {
        return this.http
            .get(`${this.SERVICE_URL}/${id}`)
            .map((response) => response.json());
    }

    create(app: Application) : Observable<Application> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        app.publishedOn = new Date();
        return this.http.post(`${this.SERVICE_URL}`, JSON.stringify(app), { headers: headers })
            .map(res => res.json());
    }
}