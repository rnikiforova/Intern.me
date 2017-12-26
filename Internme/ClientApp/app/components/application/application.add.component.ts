import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from '../../models/student.model';
import { Application } from '../../models/application.model';
import { JobListing } from '../../models/joblisting.model';
import { ICv } from '../../models/cv.model';
import { StudentService } from '../../services/student.service';
import { ApplicationService } from '../../services/application.service';
import { CvService } from '../../services/cv.service';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'applicationAdd',
    templateUrl: './application.add.component.html',
    styleUrls: ['./application.add.component.min.css']
})
export class ApplicationAddComponent {
    student: IStudent;
    applicationData: FormGroup;
    application: Application | null;
    jobListingId: number;
    studentCvs: ICv[];
    error: string | null;

    constructor(
        private applicationService: ApplicationService,
        private cvService: CvService,
        private studentService: StudentService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.studentService.getLogged()
            .subscribe(s => {
            this.student = s;

            this.route.params
                .subscribe(params => {
                    this.jobListingId = params["jobListingId"];

                    this.cvService.getByStudent(this.student.id).subscribe(cvs => {
                        this.studentCvs = cvs;

                        this.applicationData = new FormGroup({
                            cvId: new FormControl(0)
                        });
                    });
                });
        });
    }
    
    onSubmit({ value, valid }: { value: Application, valid: boolean }) {
        console.log(new Date());
        let selectedId = +this.applicationData.controls["cvId"].value;
        if (selectedId !== 0) {
            let txt = this.studentCvs.filter(cv => cv.id === selectedId)[0].text;

            let app = <Application> ({
                jobListingId: +this.jobListingId,
                studentId: this.student.id,
                text: txt,
                cvId: selectedId
            });
            this.applicationService.create(app).subscribe(res => {
                this.application = res;
                this.error = null;
                console.log("Application sent!");
            });
        } else {
            this.error = "Не сте избрали CV";
            this.application = null;
            console.log("No selected cv");
        }
    }
}
