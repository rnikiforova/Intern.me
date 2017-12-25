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
    using System.IO;

    [Produces("application/json")]
    [Route("api/CVs")]
    public class CVsController : Controller
    {
        private readonly ApplicationDbContext _context;

        private const string DirectoryName = "StudentCvs";

        public CVsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CVs
        [HttpGet]
        public IEnumerable<CV> GetCvs()
        {
            return _context.Cvs;
        }

        // GET: api/CVs
        [HttpGet("studentId={studentId}")]
        public async Task<IActionResult> GetCvByStudentId([FromRoute]int studentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cV = await _context.Cvs.SingleOrDefaultAsync(m => m.StudentId == studentId);

            if (cV == null)
            {
                return NotFound();
            }

            return Ok(cV);
        }

        // GET: api/CVs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCV([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cV = await _context.Cvs.SingleOrDefaultAsync(m => m.Id == id);

            if (cV == null)
            {
                return NotFound();
            }

            return Ok(cV);
        }

        // PUT: api/CVs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCV([FromRoute] int id, [FromBody] CV cV)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cV.Id)
            {
                return BadRequest();
            }

            _context.Entry(cV).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CVExists(id))
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

        // POST: api/CVs
        [HttpPost]
        public async Task<IActionResult> PostCV([FromBody] CV cV)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cvs.Add(cV);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCV", new { id = cV.Id }, cV);
        }

        // DELETE: api/CVs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCV([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cV = await _context.Cvs.SingleOrDefaultAsync(m => m.Id == id);
            if (cV == null)
            {
                return NotFound();
            }

            _context.Cvs.Remove(cV);
            await _context.SaveChangesAsync();

            return Ok(cV);
        }

        private bool CVExists(int id)
        {
            return _context.Cvs.Any(e => e.Id == id);
        }

        [HttpGet("dirName")]
        public string GetCvDir()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), DirectoryName);
        }
    }
}