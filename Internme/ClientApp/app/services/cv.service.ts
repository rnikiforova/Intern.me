import { Inject, Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICv } from '../models/cv.model';
import 'rxjs/add/operator/map';

@Injectable()
export class CvService {
    private BASE_URL: string;
    private SERVICE_URL: string = "api/CVs";

    private cvs: ICv[] = [];
    private dir: string;

    constructor(private http: Http) {
    }

    getAll(): Observable<ICv[]> {
        return this.http
            .get(`${this.SERVICE_URL}`)
            .map(this.mapAll.bind(this));
    }

    get(id: number): Observable<ICv> {
        return this.http.get(`${this.SERVICE_URL}/${id}`).map(res => res.json());
    }

    getByStudent(id: number): Observable<ICv[]> {
        return this.http.get(`${this.SERVICE_URL}/studentId=${id}`).map(this.mapAll.bind(this));
    }

    getDir(): string {
        this.http.get(`${this.SERVICE_URL}\dirName`).subscribe(result => this.dir = result.toString());
        return this.dir;
    }

    create(cv: ICv): Observable<ICv> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${this.SERVICE_URL}`, JSON.stringify(cv), { headers: headers })
            .map(res => res.json());
    }

    modify(student: ICv): Observable<ICv> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.put(`${this.SERVICE_URL}/${student.id}`, JSON.stringify(student), { headers: headers })
            .map(res => res.json());
    }

    mapSingle(r: any): ICv {
        let student = <ICv>(
            {
                id: r.id,
                studentId: r.studentId,
                text: r.text
            });

        return student;
    }

    mapAll(response: Response): ICv[] {
        return response.json().map(this.mapSingle.bind(this));
    }
}