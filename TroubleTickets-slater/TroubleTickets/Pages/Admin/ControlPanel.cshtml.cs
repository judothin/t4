using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TroubleTickets.Models;

namespace TroubleTickets.Pages.Admin
{
    public class ControlPanelModel : PageModel
    {
        private readonly IConfiguration _configuration;
        TroubleTicketDataAccessLayer factory;
        public List<TroubleTicket> tickets { get; set; }

        public ControlPanelModel(IConfiguration configuration)
        {
            _configuration = configuration;
            factory = new TroubleTicketDataAccessLayer(_configuration);
        }

        public IActionResult OnGet()
        {
            if (HttpContext.Session.GetString("email") is null)
            {
                return RedirectToPage("/Admin/Index");
            }
            else
            {
                tickets = factory.GetActiveTickets().ToList();
                return Page();
            }
        }
    }
}
