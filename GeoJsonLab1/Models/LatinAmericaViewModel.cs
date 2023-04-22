namespace GeoJsonLab1.Models
{
    public class LatinAmericaViewModel
    {
        public SortedDictionary<string, string> CountryCodes
        {
            get
            {
                return new SortedDictionary<string, string> {
                    { "PE", "Peru" },
                    { "CO", "Colombia" },
                    { "AR", "Argentina" },
                    { "BR", "Brazil" },
                    { "VE", "Venezuela" },
                    { "EC", "Ecuador" },
                    { "CL", "Chile" },
                    { "BO", "Bolivia" }
                };
            }
        }
    }
}
