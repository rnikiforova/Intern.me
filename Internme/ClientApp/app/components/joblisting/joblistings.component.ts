import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobListing } from '../../models/joblisting.model';
import { JobListingService } from '../../services/joblisting.service';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';

@Component({
    selector: 'joblistings',
    templateUrl: './joblistings.component.html',
    styleUrls: ['./joblistings.component.min.css']
})
export class JobListingsComponent {
    jobListings: JobListing[] = [];

    constructor(
        private jobListingService: JobListingService,
        private applicationService: ApplicationService,
        private router: Router) { }

    ngOnInit() {
        this.jobListingService
            .getAll()
            .subscribe(x => this.jobListings = x.reverse());
    }

    apply(jobListingId: number) {
        this.router.navigate(['/application-add/', jobListingId]);

        /*let application = <Application>(
            {
                jobListingId: jobListingId,
                publishedOn: new Date()
            });
        this.applicationService.create(application); */
    }
}
