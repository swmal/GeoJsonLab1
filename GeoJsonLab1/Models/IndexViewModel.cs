namespace GeoJsonLab1.Models
{
    public class IndexViewModel
    {
        public IndexViewModel()
        {
            _countries= new List<Country>();
        }

        private readonly List<Country> _countries;

        public IEnumerable<Country> Countries => _countries;

        public void AddCountry(string code, string name)
        {
            _countries.Add(new Country(code, name));
        }
    }
}
