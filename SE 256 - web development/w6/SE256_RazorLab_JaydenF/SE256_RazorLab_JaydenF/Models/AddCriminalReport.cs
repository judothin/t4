using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace SE256_RazorLab_JaydenF.Models
{
    public class AddCriminalReport
    {
        public int ReportID { get; set; }
        public string ReporterFname { get; set; }
        public string ReporterLname { get; set; }
        public string PotCriminalFname { get; set; }
        public string PotCriminalLname { get; set; }
        public string CrimeDesc { get; set; }
        public DateTime CrimeDate { get; set; }
        public DateTime ReportDate { get; set; }
        public string ReporterEmail { get; set; }
        public bool IsAnonymous { get; set; }
    }
}
