using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace TroubleTickets.Models
{
    public class TroubleTicketDataAccessLayer
    {
        string connectionString;
        private readonly IConfiguration _configuration;

        public TroubleTicketDataAccessLayer(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<TroubleTicket> GetActiveTickets()
        {
            List<TroubleTicket> tickets = new List<TroubleTicket>();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string statement = "SELECT * FROM TroubleTickets ORDER BY createdAt;";
                    SqlCommand command = new SqlCommand(statement, connection);

                    command.CommandType = CommandType.Text;

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        TroubleTicket ticket = new TroubleTicket();

                        ticket.Id = Convert.ToInt32(reader["id"]);
                        ticket.Title = reader["id"].ToString();
                        ticket.Category = reader["category"].ToString();
                        ticket.ReporterEmail = reader["reporterEmail"].ToString();
                        ticket.CreatedAt = DateTime.Parse(reader["createdAt"].ToString());
                        ticket.Active = Boolean.Parse(reader["active"].ToString());
                        ticket.ResponderEmail = reader["responderEmail"].ToString();
                        ticket.Notes = reader["notes"].ToString();

                        tickets.Add(ticket);
                    }

                    connection.Close();
                }
            }
            catch (Exception ex)
            {
            }

            return tickets;
        }

        public void Create(TroubleTicket ticket)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string statement = "INSERT INTO TroubleTickets (title, description, category, reporterEmail, createdAt) VALUES (@title, @description, @category, @reporterEmail, @createdAt);";
                ticket.Feedback = String.Empty;

                try
                {
                    using (SqlCommand command = new SqlCommand(statement, connection))
                    {
                        command.CommandType = CommandType.Text;
                        command.Parameters.AddWithValue("@title", ticket.Title);
                        command.Parameters.AddWithValue("@description", ticket.Description);
                        command.Parameters.AddWithValue("@category", ticket.Category);
                        command.Parameters.AddWithValue("@reporterEmail", ticket.ReporterEmail);
                        command.Parameters.AddWithValue("@createdAt", DateTime.Now);

                        connection.Open();

                        ticket.Feedback = command.ExecuteNonQuery().ToString();

                        connection.Close();
                    }
                }
                catch (Exception ex)
                {
                    ticket.Feedback += ex.ToString();
                }
            }
        }

        public TroubleTicket ReadTicketById(int? id)
        {
            TroubleTicket ticket = new TroubleTicket();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string statement = "SELECT * FROM TroubleTickets WHERE id=@id;";
                    SqlCommand command = new SqlCommand(statement, connection);
                    command.Parameters.AddWithValue("@id", id);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        ticket.Id = Convert.ToInt32(reader["id"]);
                        ticket.Title = reader["title"].ToString();
                        ticket.Description = reader["description"].ToString();
                        ticket.Category = reader["category"].ToString();
                        ticket.ReporterEmail = reader["reporterEmail"].ToString();
                        ticket.CreatedAt = DateTime.Parse(reader["createdAt"].ToString());
                        ticket.Active = Boolean.Parse(reader["active"].ToString());
                        ticket.ResponderEmail = reader["responderEmail"].ToString();
                        ticket.Notes = reader["notes"].ToString();

                        if (DateTime.TryParse(reader["closedAt"].ToString(), out DateTime closedAt))
                        {
                            ticket.ClosedAt = closedAt;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ticket.Feedback = ex.ToString();
            }

            return ticket;
        }

        public TroubleTicket UpdateTicket(TroubleTicket ticket)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string statement;
                    if (ticket.Active == false)
                    {
                        statement = "UPDATE TroubleTickets SET responderEmail=@responderEmail, notes=@notes, closedAt=@closedAt, active=@active WHERE id=@id;";
                    }
                    else
                    {
                        statement = "UPDATE TroubleTickets SET responderEmail=@responderEmail, notes=@notes, active=@active WHERE id=@id;";
                    }

                    SqlCommand command = new SqlCommand(statement, connection);
                    command.CommandType = CommandType.Text;

                    command.Parameters.AddWithValue("@responderEmail", ticket.ResponderEmail);
                    command.Parameters.AddWithValue("@notes", ticket.Notes);
                    command.Parameters.AddWithValue("@active", ticket.Active);
                    command.Parameters.AddWithValue("@id", ticket.Id);

                    if (ticket.Active == false)
                    {
                        command.Parameters.AddWithValue("@closedAt", ticket.ClosedAt);
                    }

                    connection.Open();
                    command.ExecuteNonQuery();
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                ticket.Feedback = ex.ToString();
            }

            return ticket;
        }

        public string DeleteTicket(int? id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string statement = "DELETE FROM TroubleTickets WHERE id=@id;";
                    SqlCommand command = new SqlCommand(statement, connection);
                    command.CommandType = CommandType.Text;
                    
                    command.Parameters.AddWithValue("@id", id);

                    connection.Open();
                    command.ExecuteNonQuery();
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            return string.Empty;
        }
    }
}
