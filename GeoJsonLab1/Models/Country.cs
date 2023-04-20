namespace GeoJsonLab1.Models
{
    public class Country
    {
        public Country(string code, string name)
        {
            Code = code;
            Name = name;
        }
        public string Code { get; private set; }

        public string Name { get; private set; }
    }
}
