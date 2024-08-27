using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SE256_RazorLab_JaydenF.Pages
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
