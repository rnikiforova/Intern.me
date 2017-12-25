using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Internme.Models.Entities
{
    using System.ComponentModel.DataAnnotations.Schema;

    using Microsoft.EntityFrameworkCore.Metadata.Internal;

    public class Application
    {
        public int Id { get; set; }

        public int JobListingId { get; set; }

        public JobListing JobListing { get; set; }

        public int StudentId { get; set; }

        public Student Student { get; set; }

        public DateTime PublishedOn { get; set; }
        
        [ForeignKey("CV")]
        public int? CVId { get; set; }

        public CV Cv { get; set; }
    }
}
