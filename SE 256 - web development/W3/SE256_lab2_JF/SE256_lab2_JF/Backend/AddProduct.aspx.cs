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
            if (!IsPostBack)
            {
                if (Request.QueryString["Id"] != null)
                {
                    int productId = Convert.ToInt32(Request.QueryString["Id"]);
                    LoadProductDetails(productId);
                }
            }
        }

        private void LoadProductDetails(int id)
        {
            Product.ProductSearchResult productSearch = new Product.ProductSearchResult();
            Product product = productSearch.GetProductById(id);

            if (product != null)
            {
                txtName.Text = product.Name;
                txtManufacturer.Text = product.Manufacturer;
                date_Expires.SelectedDate = product.DateExpires;
                txtPrice.Text = product.Price.ToString();
            }
        }

        protected void submit_button_click(object sender, EventArgs e)
        {
            // Validate the price input
            double priceValue;
            if (string.IsNullOrEmpty(txtPrice.Text) || !double.TryParse(txtPrice.Text, out priceValue))
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

            Product product = new Product(
                txtName.Text,
                txtManufacturer.Text,
                date_Expires.SelectedDate,
                priceValue
            );

            if (product.HasErrors())
            {
                feedback_label.Text = product.GetFeedback();
                return;
            }

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

        protected void update_button_Click(object sender, EventArgs e)
        {
            string name = txtName.Text;
            string manufacturer = txtManufacturer.Text;
            DateTime dateExpires = date_Expires.SelectedDate;
            double price = double.Parse(txtPrice.Text);

            Product updatedProduct = new Product(
                name,
                manufacturer,
                dateExpires,
                price
            );

            updatedProduct.Id = int.Parse(Request.QueryString["Id"]);

            Product.ProductSearchResult productSearchResultInstance = new Product.ProductSearchResult();
            productSearchResultInstance.UpdateProduct(updatedProduct);

            feedback_label.Text = "Book updated successfully!";
        }




    }
}