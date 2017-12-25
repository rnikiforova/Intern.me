import { Inject, Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IStudent } from '../models/student.model';
import { EducationLevelEnum } from '../models/enum/EducationLevelEnum';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {
    private BASE_URL: string;
    private SERVICE_URL: string = "api/Students";

    private jobListings: IStudent[] = [];

    constructor(private http: Http) {
    }

    getAll(): Observable<IStudent[]> {
        return this.http
            .get(`${this.SERVICE_URL}`)
            .map(this.mapAll.bind(this));
    }

    get(id: number): Observable<IStudent> {
        return this.http.get(`${this.SERVICE_URL}/${id}`).map(res => res.json());
    }

    getLogged(): Observable<IStudent> {
        return this.http
            .get(`${this.SERVICE_URL}/getLogged`)
            .map((res) => this.mapSingle(res.json()));
    }

    create(student: IStudent): Observable<IStudent> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${this.SERVICE_URL}`, JSON.stringify(student), { headers: headers })
            .map(res => res.json());
    }

    modify(student: IStudent): Observable<IStudent> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.put(`${this.SERVICE_URL}/${student.id}`, JSON.stringify(student), { headers: headers })
            .map(res => res.json());
    }

    mapEducationLevel(value: number): string {
        return EducationLevelEnum[value];
    }

    mapSingle(r: any): IStudent {
        let student = <IStudent>(
            {
                id: r.id,
                firstName: r.firstName,
                lastName: r.lastName,
                facultyNumber: r.facultyNumber,
                email: r.email,
                educationLevel: r.educationLevel,
                educationLevelName: this.mapEducationLevel(r.educationLevel),
                gpa: r.gpa,
                linkedIn: r.linkedIn,
                phone: r.phone,
                degree: r.degree
            });

        return student;
    }

    mapAll(response: Response): IStudent[] {
        return response.json().map(this.mapSingle.bind(this));
    }
}