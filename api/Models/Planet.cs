namespace api.Models;

public class Planet
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public bool IsDeleted { get; set; } = false;
}