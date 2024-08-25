using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TroubleTickets.Models;

namespace TroubleTickets.Pages
{
    public class AddTicketModel : PageModel
    {

        [BindProperty]
        public TroubleTicketModel tTicket { get; set; }
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
