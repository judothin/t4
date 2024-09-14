using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TroubleTickets.Models;

namespace TroubleTickets.Pages.Admin
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public Models.Admin admin { get; set; }
        private readonly IConfiguration _configuration;

        public IndexModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void OnGet()
        {
            HttpContext.Session.SetInt32("test", 5);
        }

        public IActionResult OnPost()
        {
            List<Models.Admin> admins = new List<Models.Admin>();
            
            if (admin != null )
            {
                AdminDataAccessLayer factory = new AdminDataAccessLayer(_configuration);
                admins = factory.GetAdminLogin(admin).ToList();

                if (admins.Count > 0 )
                {
                    HttpContext.Session.SetInt32("id", admins[0].Id);
                    HttpContext.Session.SetString("email", admins[0].Email);
                    return Redirect("/Admin/ControlPanel");
                }
                else
                {
                    admin.Feedback = "Login failed.";
                }
            }

            return Page();
        }
    }
}
