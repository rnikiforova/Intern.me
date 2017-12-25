import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employer } from '../../models/employer.model';
import { EmployerService } from '../../services/employer.service';

@Component({
    selector: 'employerProfileEdit',
    templateUrl: './employer.profile.edit.component.html',
    styleUrls: ['./employer.profile.edit.component.min.css']
})
export class EmployerProfileEditComponent {
    employerData: FormGroup;
    currId: number;
    employer: Employer;

    constructor(private employerService: EmployerService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.currId = params['id'];

            this.employerService.get(this.currId).subscribe(x => {
                this.employer = x;

                this.employerData = new FormGroup({
                    name: new FormControl(this.employer.name),
                    about: new FormControl(this.employer.about),
                    address: new FormControl(this.employer.address),
                    category: new FormControl(this.employer.category),
                    categoryName: new FormControl(this.employer.categoryName),
                    email: new FormControl(this.employer.email),
                    fullLegalNameLocal: new FormControl(this.employer.fullLegalNameLocal),
                    fullLegalNameEn: new FormControl(this.employer.fullLegalNameEn),
                    website: new FormControl(this.employer.website),
                    linkedIn: new FormControl(this.employer.linkedIn),
                });
            });
        });
    }

    onSubmit({ value, valid }: { value: Employer, valid: boolean }) {
    }
}