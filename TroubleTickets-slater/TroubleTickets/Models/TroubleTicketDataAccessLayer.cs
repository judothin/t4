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
                    string statement = "SELECT * FROM OrderTickets ORDER BY placedAt;";
                    SqlCommand command = new SqlCommand(statement, connection);

                    command.CommandType = CommandType.Text;

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        TroubleTicket ticket = new TroubleTicket();

                        ticket.Id = Convert.ToInt32(reader["id"]);
                        ticket.Item = reader["item"].ToString();
                        ticket.PlacedAt = DateTime.Parse(reader["placedAt"].ToString());
                        ticket.Fulfilled = Boolean.Parse(reader["fulfilled"].ToString());
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
                string statement = "INSERT INTO OrderTickets (item, ingrediants, placedAt) VALUES (@item, @ingrediants, @placedAt);";
                ticket.Feedback = String.Empty;

                try
                {
                    using (SqlCommand command = new SqlCommand(statement, connection))
                    {
                        command.CommandType = CommandType.Text;
                        command.Parameters.AddWithValue("@item", ticket.Item);
                        command.Parameters.AddWithValue("@ingrediants", ticket.Ingrediants);
                        command.Parameters.AddWithValue("@placedAt", DateTime.Now);

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
                    string statement = "SELECT * FROM OrderTickets WHERE id=@id;";
                    SqlCommand command = new SqlCommand(statement, connection);
                    command.Parameters.AddWithValue("@id", id);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        ticket.Id = Convert.ToInt32(reader["id"]);
                        ticket.Item = reader["item"].ToString();
                        ticket.Ingrediants = reader["ingrediants"].ToString();
                        ticket.PlacedAt = DateTime.Parse(reader["placedAt"].ToString());
                        ticket.Fulfilled = Boolean.Parse(reader["fullfilled"].ToString());
                        ticket.Notes = reader["notes"].ToString();

                        if (DateTime.TryParse(reader["fulfilledAt"].ToString(), out DateTime fulfilledAt))
                        {
                            ticket.FulfilledAt = fulfilledAt;
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
                    if (ticket.Fulfilled == false)
                    {
                        statement = "UPDATE OrderTickets SET notes=@notes, fulfilledAt=@fulfilledAt, fulfilled=@fulfilled WHERE id=@id;";
                    }
                    else
                    {
                        statement = "UPDATE OrderTickets SET notes=@notes, fulfilled=@fulfilled WHERE id=@id;";
                    }

                    SqlCommand command = new SqlCommand(statement, connection);
                    command.CommandType = CommandType.Text;

                    command.Parameters.AddWithValue("@notes", ticket.Notes);
                    command.Parameters.AddWithValue("@active", ticket.Fulfilled);
                    command.Parameters.AddWithValue("@id", ticket.Id);

                    if (ticket.Fulfilled == false)
                    {
                        command.Parameters.AddWithValue("@fulfilledAt", ticket.FulfilledAt);
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
                    string statement = "DELETE FROM OrderTickets WHERE id=@id;";
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
