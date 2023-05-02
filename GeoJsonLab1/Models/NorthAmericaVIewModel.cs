namespace GeoJsonLab1.Models
{
    public class NorthAmericaVIewModel
    {
        public SortedDictionary<string, string> CountryCodes
        {
            get
            {
                return new SortedDictionary<string, string> {
                    { "CA", "Canada" },
                    { "US", "United States" },
                    { "MX", "Mexico" },
                    { "NI", "Nicaragua" },
                    { "HN", "Honduras" },
                    { "GT", "Guatemala" },
                    { "PA", "Panama" },
                    { "CR", "Costa Rica" }
                };
            }
        }
    }
}
