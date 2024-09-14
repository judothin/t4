using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Net.Sockets;
using System.Reflection;

namespace SE256_RazorLab_JaydenF.Models
{
    public class CriminalReportLayer
    {
        string connectionString;
        private readonly IConfiguration _configuration;

        public CriminalReportLayer(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<AddCriminalReport> GetActiveTickets()
        {
            List <AddCriminalReport> reports = new List<AddCriminalReport>();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string statement = "SELECT * FROM CriminalReport";
                    SqlCommand command = new SqlCommand(statement, connection);

                    command.CommandType = CommandType.Text;

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        AddCriminalReport report = new AddCriminalReport();

                        report.ReportID = Convert.ToInt32(reader["ReportID"]);
                        report.ReporterFname = reader["ReporterFname"].ToString();
                        report.ReporterLname = reader["ReporterLname"].ToString();
                        report.PotCriminalFname = reader["PotCriminalFname"].ToString();
                        report.PotCriminalLname = reader["PotCriminalLname"].ToString();
                        report.CrimeDesc = reader["CrimeDesc"].ToString();
                        report.CrimeDate = DateTime.Parse(reader["CrimeDate"].ToString());
                        report.ReportDate = DateTime.Parse(reader["ReportDate"].ToString());
                        report.ReporterEmail = reader["ReporterEmail"].ToString();
                        report.IsAnonymous = Boolean.Parse(reader["IsAnonymous"].ToString());
                        report.Feedback = reader["Feedback"].ToString();

                        reports.Add(report);
                    }

                    connection.Close();
                }
            }

            catch (Exception ex)
            {
            }

            return reports;
        }

        public void Create(AddCriminalReport report)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string statement = "INSERT INTO CriminalReport (ReporterFname, ReporterLname, PotCriminalFname, PotCriminalLname, CrimeDesc, CrimeDate, ReportDate, ReporterEmail) " +
                    "VALUES (@ReporterFname, @ReporterLname, @PotCriminalFname, @PotCriminalLname, @CrimeDesc, @CrimeDate, @ReportDate, @ReporterEmail)";
                
                try
                {
                    using (SqlCommand command = new SqlCommand(statement, connection))
                    {
                        command.CommandType = CommandType.Text;
                        command.Parameters.AddWithValue("@ReporterFname", report.ReporterFname);
                        command.Parameters.AddWithValue("@ReporterLname", report.ReporterLname);
                        command.Parameters.AddWithValue("@PotCriminalFname", report.PotCriminalFname);
                        command.Parameters.AddWithValue("@PotCriminalLname", report.PotCriminalLname);
                        command.Parameters.AddWithValue("@CrimeDesc", report.CrimeDesc);
                        command.Parameters.AddWithValue("@CrimeDate", report.CrimeDate);
                        command.Parameters.AddWithValue("@ReportDate", report.ReportDate);
                        command.Parameters.AddWithValue("@ReporterEmail", report.ReporterEmail);

                        connection.Open();

                        report.Feedback = "your report has been submitted successfully!";

                        connection.Close();
                    }
                }
                catch (Exception ex)
                {
                    report.Feedback += ex.ToString();
                }
            }
        }

        public AddCriminalReport ReadReportById(int? ReportId)
        {
            AddCriminalReport report = new AddCriminalReport();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string statement = "SELECT * FROM CriminalReport WHERE ReportID = @ReportID";
                    SqlCommand command = new SqlCommand(statement, connection);
                    command.Parameters.AddWithValue("@ReportID", ReportId);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        report.ReportID = Convert.ToInt32(reader["ReportID"]);
                        report.ReporterFname = reader["ReporterFname"].ToString();
                        report.ReporterLname = reader["ReporterLname"].ToString();
                        report.PotCriminalFname = reader["PotCriminalFname"].ToString();
                        report.PotCriminalLname = reader["PotCriminalLname"].ToString();
                        report.CrimeDesc = reader["CrimeDesc"].ToString();
                        report.CrimeDate = DateTime.Parse(reader["CrimeDate"].ToString());
                        report.ReportDate = DateTime.Parse(reader["ReportDate"].ToString());
                        report.ReporterEmail = reader["ReporterEmail"].ToString();
                        report.IsAnonymous = Boolean.Parse(reader["IsAnonymous"].ToString());
                        report.Feedback = reader["Feedback"].ToString();

                        
                        
                    }
                }
            }

            catch (Exception ex)
            {
                report.Feedback = ex.ToString();
            }

            return report;
        }
    }
}
