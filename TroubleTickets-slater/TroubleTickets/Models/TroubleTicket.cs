using System.ComponentModel.DataAnnotations;

namespace TroubleTickets.Models
{
    public class TroubleTicket
    {
        
        [Required]
        public int Id { get; set; }

        [Required, StringLength(255)]
        public string Item { get; set; }

        [Required]
        public string Ingrediants { get; set; }

        public string Notes { get; set; }

        [Required]
        [Display(Name = "Date ticket was created.")]
        [DataType(DataType.DateTime), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy hh:mm:ss tt}", ApplyFormatInEditMode = true)]
        [ValidationLib.MyDate(ErrorMessage = "Future date entry not alowed")]
        public DateTime PlacedAt { get; set; }

        [Display(Name = "Date of solutions/closure.")]
        [DataType(DataType.DateTime), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy hh:mm:ss tt}", ApplyFormatInEditMode = true)]
        [ValidationLib.MyDate(ErrorMessage = "Future date enty now allowed")]
        public DateTime FulfilledAt { get; set; }

        [Required]
        public bool Fulfilled { get; set; }

        public String Feedback { get; set; }
    }
}
