using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace api.Controllers
{
    [ApiController]
    [Route("api/satellites")]
    public class SatelliteController : ControllerBase 
    {
        private readonly ApplicationDbContext _context;
        
        public SatelliteController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{planet}")]
        public async Task<IActionResult> GetSatellitesForPlanet(string planet)
        {
            var planetEntity = await _context.Planets.SingleOrDefaultAsync(p => p.Name.Equals(planet) && !p.IsDeleted);
            if (planetEntity is null) return NotFound("Planet not found");
            var satellites = await _context.Satellites
                .Where(s => s.PlanetId == planetEntity.Id && !s.IsDeleted)
                .ToListAsync();
                
            return Ok(satellites);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSatelliteForPlanet(Satellite satellite)
        {
            await _context.Satellites.AddAsync(satellite);
            await _context.SaveChangesAsync();
            return Ok(satellite);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> DeleteSatellite(int id)
        {
            var satellite = await _context.Satellites.FindAsync(id);
            if (satellite is null) return NotFound("Satellite not found");
            satellite.IsDeleted = true;
            _context.Satellites.Update(satellite);
            await _context.SaveChangesAsync();
            return Ok(satellite);
        }    
    }
}