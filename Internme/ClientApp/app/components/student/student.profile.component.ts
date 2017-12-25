import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IStudent } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
    selector: 'studentProfile',
    templateUrl: './student.profile.component.html',
    styleUrls: ['./student.profile.component.min.css']
})
export class StudentProfileComponent {
    student: IStudent;
    studentData: FormGroup;

    constructor(private studentService: StudentService) { }

    ngOnInit() {
        this.studentService.getLogged().subscribe(s => {
            this.student = s;

            this.studentData = new FormGroup({
                firstName: new FormControl(this.student.firstName),
                lastName: new FormControl(this.student.lastName),
                email: new FormControl(this.student.email),
                degree: new FormControl(this.student.degree),
                educationLevel: new FormControl(this.student.educationLevelName),
                linkedIn: new FormControl(this.student.linkedIn),
                gpa: new FormControl(this.student.gpa),
                facultyNumber: new FormControl(this.student.facultyNumber)
            });
        });
    }

    onSubmit({ value, valid }: { value: IStudent, valid: boolean }) {
        let res = <IStudent>{};
        value.id = this.student.id;
        this.studentService.modify(value).subscribe(s => res = s);
    }
}
