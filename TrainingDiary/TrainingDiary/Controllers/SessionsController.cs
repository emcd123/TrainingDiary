using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrainingDiary.Data;
using TrainingDiary.Models;

namespace TrainingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        //private readonly UserManager<IdentityUser> _userManager;

        public SessionsController(ApplicationDbContext context/*, UserManager<IdentityUser> userManager*/)
        {
            _context = context;
            //_userManager = userManager;
        }

        // GET: api/Sessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Session>>> GetSession()
        {
            //var user = await _userManager.GetUserAsync(HttpContext.User);
            //return await _context.Session.Include(t => t.Excercises).Where(e => e.UserId == user.Id).ToListAsync();
            return await _context.Session.Include(t => t.Excercises).Include(t => t.ActiveTags).ToListAsync();
        }

        // GET: api/Sessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(int id)
        {
            //var user = await _userManager.GetUserAsync(HttpContext.User);
            //var sessions _context.Session.Include(t => t.Excercises).Where(e => e.UserId == user.Id).ToListAsync();
            var sessions = await _context.Session.Include(t => t.Excercises).Include(t => t.ActiveTags).ToListAsync();

            if (sessions == null)
            {
                return NotFound();
            }

            return sessions.Where(e => e.Id == id).FirstOrDefault();
        }

        // PUT: api/Sessions/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSession(int id, Session session)
        {
            if (id != session.Id)
            {
                return BadRequest();
            }

            _context.Entry(session).State = EntityState.Modified;

            foreach (var excercise in session.Excercises)
            {
                _context.Entry(excercise).State = EntityState.Modified;
            }

            _context.SaveChanges();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SessionExists(id))
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

        // POST: api/Sessions
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Session>> PostSession(Session session)
        {
            //var user = await _userManager.GetUserAsync(HttpContext.User);
            //session.UserId = user.Id;
            _context.Session.Add(session);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSession", new { id = session.Id }, session);
        }

        // DELETE: api/Sessions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Session>> DeleteSession(int id)
        {
            var session = await _context.Session.FindAsync(id);
            if (session == null)
            {
                return NotFound();
            } 

            _context.Session.Remove(session);
            await _context.SaveChangesAsync();

            return session;
        }

        private bool SessionExists(int id)
        {
            return _context.Session.Any(e => e.Id == id);
        }
    }
}
