import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JobListing } from '../../models/joblisting.model';
import { JobListingService } from '../../services/joblisting.service';
import { CategoryEnum } from '../../models/enum/CategoryEnum';

@Component({
    selector: 'joblistingAdd',
    templateUrl: './joblisting.add.component.html',
    styleUrls: ['./joblisting.add.component.min.css']
})
export class JobListingAddComponent {
    jobListing: FormGroup;

    constructor(private jobListingService: JobListingService) { }

    ngOnInit() {
        this.jobListing = new FormGroup({
            text: new FormControl(''),
            category: new FormControl(0),
            period: new FormControl(0),
            educationLevel: new FormControl(0),
            salary: new FormControl(),
            schedule: new FormControl(0)
        });
    }

    onSubmit({ value, valid }: { value: JobListing, valid: boolean }) {
        let response = <JobListing>{};
        value.employerId = 1;
        value.categoryName = this.jobListingService.mapCategory(value.category);
        value.periodName = this.jobListingService.mapPeriod(value.period);
        value.educationLevelName = this.jobListingService.mapEducationLevel(value.educationLevel);
        value.scheduleName = this.jobListingService.mapSchedule(value.schedule);
        this.jobListingService.create(value).subscribe(r => response = r);
    }
}