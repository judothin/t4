using System.ComponentModel.DataAnnotations;

namespace TroubleTickets.Models
{
    public class TroubleTicket
    {
        
        [Required]
        public int Id { get; set; }

        [Required, StringLength(255)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [ValidationLib.StringOptionsValidate(
            Allowed = new String[] { "Monitor", "Computer", "Printer", "Software Install", "Software Upgrade", "Configuration", "Internet" },
            ErrorMessage = "Invalid Category. Must Be: Monitor, Computer, Printer, Software Install, Software Upgrade, Configuration, Internet"
        )]
        public string Category { get; set; }

        [RegularExpression(@"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}", ErrorMessage = "Incorrect Email Format")]
        public string ReporterEmail { get; set; }

        [RegularExpression(@"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}", ErrorMessage = "Incorrect Email Format")]
        public string ResponderEmail { get; set; }

        public string Notes { get; set; }

        [Required]
        [Display(Name = "Date ticket was created.")]
        [DataType(DataType.DateTime), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy hh:mm:ss tt}", ApplyFormatInEditMode = true)]
        [ValidationLib.MyDate(ErrorMessage = "Future date entry not alowed")]
        public DateTime CreatedAt { get; set; }

        [Display(Name = "Date of solutions/closure.")]
        [DataType(DataType.DateTime), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy hh:mm:ss tt}", ApplyFormatInEditMode = true)]
        [ValidationLib.MyDate(ErrorMessage = "Future date enty now allowed")]
        public DateTime ClosedAt { get; set; }

        [Required]
        public bool Active { get; set; }

        public String Feedback { get; set; }
    }
}
