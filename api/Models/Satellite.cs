using System.Text.Json.Serialization;

namespace api.Models;

public class Satellite
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsDeleted { get; set; } = false;
    [JsonIgnore]
    public Planet? Planet { get; set; }
    public int PlanetId { get; set; }
    
}