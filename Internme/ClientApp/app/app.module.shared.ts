import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { JobListingsComponent } from './components/joblisting/joblistings.component';
import { JobListingAddComponent } from './components/joblisting/joblisting.add.component';
import { StudentProfileComponent } from './components/student/student.profile.component';
import { EmployerProfileComponent } from './components/employer/employer.profile.component';
import { JobListingService } from './services/joblisting.service';
import { StudentService } from './services/student.service';
import { EmployerService } from './services/employer.service';
import { ApplicationService } from './services/application.service';
import { CounterComponent } from './components/counter/counter.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        JobListingsComponent,
        JobListingAddComponent,
        StudentProfileComponent,
        EmployerProfileComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'joblistings', component: JobListingsComponent},
            { path: 'joblistings-add', component: JobListingAddComponent },
            { path: 'student-profile', component: StudentProfileComponent },
            { path: 'employer-profile/:id', component: EmployerProfileComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        JobListingService,
        EmployerService,
        ApplicationService,
        StudentService
    ]
})
export class AppModuleShared {
}
