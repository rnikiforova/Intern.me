import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employer } from '../../models/employer.model';
import { EmployerService } from '../../services/employer.service';

@Component({
    selector: 'employerProfile',
    templateUrl: './employer.profile.component.html',
    styleUrls: ['./employer.profile.component.min.css']
})
export class EmployerProfileComponent {
    currId: number;
    employer: Employer;

    constructor(private employerService: EmployerService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.currId = params['id'];
            
            this.employerService.get(this.currId).subscribe(x => {
                this.employer = x;
            });
        });
    }

    onSubmit({ value, valid }: { value: Employer, valid: boolean }) {
    }
}