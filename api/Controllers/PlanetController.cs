using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;
[ApiController]
[Route("api/planets")]
public class PlanetController : ControllerBase{
   private readonly ApplicationDbContext _context;

    public PlanetController(ApplicationDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllPlanets()
    {
        var planets = await _context.Planets
            .Where(p => !p.IsDeleted)
            .ToListAsync();
        return Ok(planets);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePlanet(Planet planet)
    {
        var existingPlanets = await _context.Planets.ToListAsync();
        if (existingPlanets.Any(p => p.Name.Equals(planet.Name)&& !p.IsDeleted ))
            return BadRequest("Planet already exists!");
        await _context.Planets.AddAsync(planet);
        await _context.SaveChangesAsync();
        return Ok(planet);
    }
    
    [HttpGet("{name}")]
    public async Task<IActionResult> GetPlanetByName(string name)
    {
        var planet = await _context.Planets.FirstOrDefaultAsync(p => p.Name.Equals(name) && !p.IsDeleted);
        if (planet == null) return NotFound("Planet not found!");
        return Ok(planet);
    }
    
    [HttpPut("{name}")]
    public async Task<IActionResult> DeletePlanet(string name)
    {
        var planet = await _context.Planets.FirstOrDefaultAsync(p => p.Name.Equals(name) && !p.IsDeleted);
        if (planet == null ) return NotFound("Planet not found!");
        planet.IsDeleted = true;
        _context.Planets.Update(planet);
        await _context.SaveChangesAsync();
        return Ok("Planet successfully deleted");
    }

    [HttpPut("type/{name}")]
    public async Task<IActionResult> UpdatePlanetType(string name, string newType)
    {
        var planet = await _context.Planets.FirstOrDefaultAsync(p => p.Name.Equals(name) && !p.IsDeleted);
        if (planet is null) return NotFound("Planet not found");
        planet.Type = newType;
        _context.Planets.Update(planet);
        await _context.SaveChangesAsync();
        return Ok(planet);

    }
    
    
    
    
    
    

}