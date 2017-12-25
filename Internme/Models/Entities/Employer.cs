namespace Internme.Models.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Internme.Models.Entities.Enum;

    public class Employer
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string FullLegalNameLocal { get; set; }

        public string FullLegalNameEnglish { get; set; }

        public string Uid { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string Website { get; set; }

        public string LinkedIn { get; set; }

        [MaxLength(250)]
        public string About { get; set; }

        public Category? Category { get; set; }

        public ICollection<JobListing> JobListings { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}
