import { Inject, Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JobListing } from '../models/joblisting.model';
import { Employer } from '../models/employer.model';
import { EmployerService } from './employer.service';
import { CategoryEnum } from '../models/enum/CategoryEnum';
import { PeriodEnum } from '../models/enum/PeriodEnum';
import { EducationLevelEnum } from '../models/enum/EducationLevelEnum';
import { ScheduleEnum } from '../models/enum/ScheduleEnum';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JobListingService {
    private BASE_URL: string;
    private SERVICE_URL: string = "api/JobListings";

    private jobListings: JobListing[] = [];

    constructor(private http: Http, private employerService: EmployerService) {
    }

    getAll(): Observable<JobListing[]> {
        return this.http
            .get(`${this.SERVICE_URL}`)
            .map(this.mapAll.bind(this));
    }

    create(jobListing: JobListing) : Observable<JobListing> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        console.log(jobListing);
        return this.http.post(`${this.SERVICE_URL}`, JSON.stringify(jobListing), { headers: headers })
            .map(res => res.json());
    }

    mapCategory(value: number) : string {
        return CategoryEnum[value];
    }

    mapPeriod(value: number): string {
        return PeriodEnum[value];
    }

    mapEducationLevel(value: number): string {
        return EducationLevelEnum[value];
    }

    mapSchedule(value: number): string {
        return ScheduleEnum[value];
    }

    mapSingle(r: any): JobListing {
        let employer = <Employer>{};
        let joblisting = <JobListing>(
            {
                id: r.id,
                text: r.text,
                salary: r.salary,
                category: r.category,
                categoryName: CategoryEnum[r.category],
                periodName: PeriodEnum[r.period],
                educationLevelName: EducationLevelEnum[r.educationLevel],
                scheduleName: ScheduleEnum[r.schedule],
                period: r.period,
                employerId: r.employerId
            });
        this.employerService.get(r.employerId).subscribe((val) => {
            employer = val;
            joblisting.employer = employer;
        });

        return joblisting;
    }

    mapAll(response: Response): JobListing[] {
        return response.json().map(this.mapSingle.bind(this));
    }
}