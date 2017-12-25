namespace Internme.Models.Entities
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    using Internme.Models.Entities.Enum;

    public class JobListing
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey("Employer")]
        public int EmployerId { get; set; }

        [MaxLength(500)]
        public string Text { get; set; }

        public int? Salary { get; set; }

        public Category? Category { get; set; }

        public Period? Period { get; set; }

        public Schedule? Schedule { get; set; }

        public EducationLevel? EducationLevel { get; set; }

        public ICollection<Language> Languages { get; set; }

        public DateTime Published { get; set; }
    }
}
