using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SE256_RazorLab_JaydenF.Models;

namespace SE256_RazorLab_JaydenF.Pages
{
    public class MakeReportModel : PageModel
    {
        [BindProperty]
        public AddCriminalReport rReport { get; set; }
        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            IActionResult temp;
            if (ModelState.IsValid == false)
            {
                temp = Page();
            }
            else
            {
                temp = Page();
            }
            return temp;
        }
    }
}
