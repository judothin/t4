using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TroubleTickets.Models;
using Microsoft.Extensions.Configuration;
using System.ComponentModel;

namespace TroubleTickets.Pages
{
    public class AddTicketModel : PageModel
    {
        [BindProperty]
        public TroubleTicket troubleTicket { get; set; }

        private readonly IConfiguration _configuration;

        public AddTicketModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            TroubleTicketDataAccessLayer factory = new TroubleTicketDataAccessLayer(_configuration);
            factory.Create(troubleTicket);

            //if (!ModelState.IsValid)
            //{
            //    var errors = ModelState.Values.SelectMany(v => v.Errors);
            //    return Page();
            //}
            //else
            //{
            //    if (troubleTicket is null == false)
            //    {
            //        TroubleTicketDataAccessLayer factory = new TroubleTicketDataAccessLayer(_configuration);
            //        factory.Create(troubleTicket);
            //    }
            //}

            return Page();
            return RedirectToPage(" /Index");
        }
    }
}
