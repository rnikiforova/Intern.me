import { Employer } from './employer.model'

export interface JobListing {
    id: number;
    text: string;
    employerId: number;
    employer: Employer;
    salary: number;
    category: number,
    categoryName: string;
    period: number;
    periodName: string;
    educationLevel: number;
    educationLevelName: string;
    schedule: number;
    scheduleName: string;
    published: Date;
}