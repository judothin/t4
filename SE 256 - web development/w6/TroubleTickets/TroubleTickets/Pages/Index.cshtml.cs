using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TroubleTickets.Pages
{
    public class IndexModel : PageModel
    {

        [BindProperty(SupportsGet = true)]
        public string FName { get; set; }

        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            if (string.IsNullOrEmpty(FName))
            {
                FName = "Stranger!";
            }
        }
    }
}
