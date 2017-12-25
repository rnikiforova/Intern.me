import { JobListing } from './joblisting.model';

export interface Application {
    id: number;
    publishedOn: Date;
    jobListingId: number;
    jobListing: JobListing;
    cvId: number;
}