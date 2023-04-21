using GeoJsonLab1.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace GeoJsonLab1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        private IndexViewModel GetModel()
        {
            var text = System.IO.File.ReadAllText(Path.Combine(Environment.CurrentDirectory, $"wwwroot/geojson/log.txt"));
            var lines = text.Split('\n', StringSplitOptions.RemoveEmptyEntries);
            var model = new IndexViewModel();
            foreach (var line in lines)
            {
                var arr = line.Split('-');
                var code = arr[0].Trim();
                var name = arr[1].Trim();
                if (!string.IsNullOrWhiteSpace(code) && !string.IsNullOrWhiteSpace(name))
                {
                    model.AddCountry(code, name);
                }
            }
            return model;
        }

        public IActionResult Index()
        {
            var model = GetModel();
            return View(model);
        }

        public IActionResult Europe()
        {
            var model = GetModel();
            return View(model);
        }

        public IActionResult Africa()
        {
            var model = GetModel();
            return View(model);
        }

        public IActionResult LatinAmerica()
        {
            var model = GetModel();
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}