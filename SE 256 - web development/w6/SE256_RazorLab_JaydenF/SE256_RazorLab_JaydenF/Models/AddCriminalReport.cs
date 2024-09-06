using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SE256_RazorLab_JaydenF.Models
{
    public class AddCriminalReport
    {
        [Required]
        public int ReportID { get; set; }

        [StringLength(60)]
        public string ReporterFname { get; set; }

        [StringLength(60)]
        public string ReporterLname { get; set; }

        [Required, StringLength(60)]
        public string PotCriminalFname { get; set; }

        [Required, StringLength(60)]
        public string PotCriminalLname { get; set; }

        [Required]
        public string CrimeDesc { get; set; }

        [Required]
        [Display(Name = "Original date of the crime")]
        [DataType(DataType.DateTime), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy hh:mm:ss tt}", ApplyFormatInEditMode = true)]
        [MyDate(ErrorMessage = "Future date entry not allowed")]
        public DateTime CrimeDate { get; set; }

        [Required]
        [Display(Name = "Date of this report")]
        [DataType(DataType.DateTime), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy hh:mm:ss tt}", ApplyFormatInEditMode = true)]
        [MyDate(ErrorMessage = "Future date entry not allowed")]
        public DateTime ReportDate { get; set; }

        [EmailAddress]
        public string ReporterEmail { get; set; }

        [Required]
        public bool IsAnonymous { get; set; }
    }
}
