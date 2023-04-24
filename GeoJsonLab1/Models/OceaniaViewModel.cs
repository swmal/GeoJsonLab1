namespace GeoJsonLab1.Models
{
    public class OceaniaViewModel
    {
        public SortedDictionary<string, string> CountryCodes
        {
            get
            {
                return new SortedDictionary<string, string> {
                    { "AU", "Australia" },
                    { "NZ", "New Zealand" },
                    { "FJ", "Fiji" },
                    { "TO", "Tonga" }
                };
            }
        }
    }
}
