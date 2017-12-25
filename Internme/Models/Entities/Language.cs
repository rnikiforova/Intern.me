using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Internme.Models.Entities
{
    using System.ComponentModel.DataAnnotations;

    using Internme.Models.Entities.Enum;

    public class Language
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
