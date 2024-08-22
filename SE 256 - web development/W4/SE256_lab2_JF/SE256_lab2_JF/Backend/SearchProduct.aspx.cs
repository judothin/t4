using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SE256_lab2_JF.App_Code;

namespace SE256_lab2_JF.Backend
{
    public partial class SearchProduct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["logged_in"] == null || (bool)Session["logged_in"] == false)
            {
                Response.Redirect("~/Backend/Default.aspx");
                return;
            }
        }


        protected void btnSearch_Click(object sender, EventArgs e)
        {
            // Get the search criteria from the textboxes
            string name = txtName.Text.Trim();
            string manufacturer = txtManufacturer.Text.Trim();

            Product.ProductSearchResult ProductSearch = new Product.ProductSearchResult();


            // Perform the search
            List<Product> results = ProductSearch.SearchProducts(name, manufacturer);

            // Bind the results to the DataGrid
            dgResults.DataSource = results;
            dgResults.DataBind();

            if (results.Count == 0)
            {
                feedback_label.Text = "No products found matching the search criteria.";
            }
            else
            {
                feedback_label.Text = $"{results.Count} products found.";
            }
        }
    }
}