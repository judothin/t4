using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TroubleTickets.Models;

namespace TroubleTickets.Pages.Admin
{
    public class DeleteTicketModel : PageModel
    {
        TroubleTicketDataAccessLayer factory;
        public TroubleTicket ticket { get; set; }
        private readonly IConfiguration _configuration;

        public DeleteTicketModel(IConfiguration configuration)
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

            ticket = factory.ReadTicketById(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Page();
        }

        public ActionResult OnPost(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            factory.DeleteTicket(id);

            return RedirectToPage("/Admin/ControlPanel");
        }
    }
}
