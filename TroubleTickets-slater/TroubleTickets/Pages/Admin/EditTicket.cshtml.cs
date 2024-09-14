using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TroubleTickets.Models;

namespace TroubleTickets.Pages.Admin
{
    public class EditTicketModel : PageModel
    {
        private readonly IConfiguration _configuration;

        [BindProperty]
        public TroubleTicket ticket {  get; set; }
        public TroubleTicketDataAccessLayer factory;

        public EditTicketModel(IConfiguration configuration)
        {
            _configuration = configuration;
            factory = new TroubleTicketDataAccessLayer(_configuration);
        }

        public ActionResult OnGet(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            else
            {
                ticket = factory.ReadTicketById(id);
                return Page();
            }
        }

        public ActionResult OnPost()
        {
            factory.UpdateTicket(ticket);

            return RedirectToPage("/Admin/ControlPanel");
        }
    }
}
