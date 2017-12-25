namespace Internme.Models.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    using Internme.Models.Entities.Enum;

    using Microsoft.EntityFrameworkCore.Metadata.Internal;

    public class Student
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Degree { get; set; }

        public EducationLevel? EducationLevel { get; set; }

        [Required]
        public int FacultyNumber { get; set; }

        public decimal? GPA { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public ICollection<Language> Languages { get; set; }

        public string FavoriteClasses { get; set; }

        public string LinkedIn { get; set; }

        public string IdentityId { get; set; }

        public ApplicationUser Identity { get; set; }
    }
}
