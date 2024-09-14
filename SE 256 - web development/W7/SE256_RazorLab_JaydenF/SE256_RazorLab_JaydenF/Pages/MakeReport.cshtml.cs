using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SE256_RazorLab_JaydenF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SE256_RazorLab_JaydenF.Pages
{
    public class MakeReportModel : PageModel
    {
        [BindProperty]
        public AddCriminalReport rReport { get; set; }

        private readonly IConfiguration _configuration;
        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            CriminalReportLayer factory = new CriminalReportLayer(_configuration);
            factory.Create(rReport);

            return Page();
            return RedirectToPage(" /Index");
        }
    }
}
