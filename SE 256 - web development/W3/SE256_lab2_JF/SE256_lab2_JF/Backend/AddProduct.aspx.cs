using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SE256_lab2_JF.App_Code;

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
            }
            else
            {
                feedback_label.Text = "Product added successfully!";
                // You can add additional logic here to save the product to a database or further process it
            }
        }

    }
}