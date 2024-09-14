using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SE256_RazorLab_JaydenF.Models;

namespace SE256_RazorLab_JaydenF.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        [BindProperty(SupportsGet = true)]
        public string FirstName { get; set; }

        private readonly IConfiguration _configuration;

        public List<AddCriminalReport> CriminalReports { get; set; }

        public IndexModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void OnGet()
        {
            CriminalReportLayer factory = new CriminalReportLayer(_configuration);

            if (string.IsNullOrWhiteSpace(FirstName))
            {
                FirstName = "Stranger.";
            }

            CriminalReports = factory.GetActiveTickets().ToList();
            CriminalReports.ForEach(ticket => { });
        }
    }
}

