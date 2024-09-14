using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TroubleTickets.Models;
using Microsoft.Extensions.Configuration;

namespace TroubleTickets.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        //public IndexModel(ILogger<IndexModel> logger)
        //{
        //    _logger = logger;
        //}

        [BindProperty(SupportsGet = true)]
        public string FirstName { get; set; }

        private readonly IConfiguration _configuration;

        public List<TroubleTicket> troubleTickets { get; set; }

        public IndexModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void OnGet()
        {
            TroubleTicketDataAccessLayer factory = new TroubleTicketDataAccessLayer(_configuration);

            if (string.IsNullOrWhiteSpace(FirstName))
            {
                FirstName = "You!";
            }

            troubleTickets = factory.GetActiveTickets().ToList();
            troubleTickets.ForEach(ticket => { });
        }
    }
}
