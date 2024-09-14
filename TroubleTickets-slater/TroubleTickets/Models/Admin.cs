using System.ComponentModel.DataAnnotations;

namespace TroubleTickets.Models
{
    public class Admin
    {
        [Required]
        public int Id { get; set; }

        [EmailAddress]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required, StringLength(20)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string Feedback { get; set; }
    }
}
