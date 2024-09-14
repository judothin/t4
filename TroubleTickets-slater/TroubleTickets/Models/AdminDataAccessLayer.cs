using System.Data;
using System.Data.SqlClient;

namespace TroubleTickets.Models
{
    public class AdminDataAccessLayer
    {
        string connectionString;
        private readonly IConfiguration _configuration;

        public AdminDataAccessLayer(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<Admin> GetAdminLogin(Admin admin)
        {
            List<Admin> admins = new List<Admin>();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string statement = "SELECT TOP 1 * FROM TicketAdmins WHERE email=@email AND password=@password;";
                    SqlCommand command = new SqlCommand(statement, connection);
                    command.CommandType = CommandType.Text;

                    command.Parameters.AddWithValue("@email", admin.Email);
                    command.Parameters.AddWithValue("@password", admin.Password);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Admin _admin = new Admin();

                        _admin.Id = Convert.ToInt32(reader["id"]);
                        _admin.Email = reader["email"].ToString();
                        _admin.Password = reader["password"].ToString();

                        admins.Add(_admin);
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return admins;
        }
    }
}
