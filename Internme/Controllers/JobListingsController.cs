using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Internme.Data;
using Internme.Models.Entities;

namespace Internme.Controllers
{
    [Produces("application/json")]
    [Route("api/JobListings")]
    public class JobListingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public JobListingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/JobListings
        [HttpGet]
        public IEnumerable<JobListing> GetJobListings()
        {
            return _context.JobListings;
        }

        // GET: api/JobListings/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobListing([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobListing = await _context.JobListings.SingleOrDefaultAsync(m => m.Id == id);

            if (jobListing == null)
            {
                return NotFound();
            }

            return Ok(jobListing);
        }

        // PUT: api/JobListings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobListing([FromRoute] int id, [FromBody] JobListing jobListing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jobListing.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobListing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobListingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/JobListings
        [HttpPost]
        public async Task<IActionResult> PostJobListing([FromBody] JobListing jobListing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.JobListings.Add(jobListing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobListing", new { id = jobListing.Id }, jobListing);
        }

        // DELETE: api/JobListings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobListing([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobListing = await _context.JobListings.SingleOrDefaultAsync(m => m.Id == id);
            if (jobListing == null)
            {
                return NotFound();
            }

            _context.JobListings.Remove(jobListing);
            await _context.SaveChangesAsync();

            return Ok(jobListing);
        }

        private bool JobListingExists(int id)
        {
            return _context.JobListings.Any(e => e.Id == id);
        }
    }
}