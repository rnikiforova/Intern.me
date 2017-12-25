namespace Internme.Models.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [ForeignKey("Employer")]
        public int EmployerId { get; set; }

        public Employer Employer { get; set; }

        public string IdentityId { get; set; }

        public ApplicationUser Identity { get; set; }
    }
}
