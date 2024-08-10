using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SE256_lab2_JF.App_Code;
using System.Data.SqlClient;


namespace SE256_lab2_JF.Backend
{
    public partial class AddProduct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        protected void submit_button_click(object sender, EventArgs e)
        {
            // Validate the price input
            double priceValue;
            if (string.IsNullOrEmpty(price.Text) || !double.TryParse(price.Text, out priceValue))
            {
                feedback_label.Text = "Please enter a valid price.";
                return;
            }

            // Validate the date input
            DateTime dateExpires;
            if (!DateTime.TryParse(date_Expires.SelectedDate.ToString(), out dateExpires))
            {
                feedback_label.Text = "Please select a valid expiration date.";
                return;
            }

            // Create a new Product instance
            Product product = new Product(
                name.Text,
                manufacturer.Text,
                dateExpires,
                priceValue
            );

            // Check for any validation errors
            if (product.HasErrors())
            {
                feedback_label.Text = product.GetFeedback();
                return;
            }

            // Database connection string
            string connectionString = "Server=sql.neit.edu,4500;Database=Dev_202430_JFagre;User Id=Dev_202430_JFagre;Password=008024602;Encrypt=True;TrustServerCertificate=True;";

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();

                    string query = "INSERT INTO Products_t4 (Name, Manufacturer, DateExpires, Price) " +
                                   "VALUES (@Name, @Manufacturer, @DateExpires, @Price)";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@Name", product.Name);
                        cmd.Parameters.AddWithValue("@Manufacturer", product.Manufacturer);
                        cmd.Parameters.AddWithValue("@DateExpires", product.DateExpires);
                        cmd.Parameters.AddWithValue("@Price", product.Price);

                        cmd.ExecuteNonQuery();
                    }

                    feedback_label.Text = "Product added successfully!";
                }
            }
            catch (Exception ex)
            {
                feedback_label.Text = "An error occurred: " + ex.Message;
            }
        }


    }
}