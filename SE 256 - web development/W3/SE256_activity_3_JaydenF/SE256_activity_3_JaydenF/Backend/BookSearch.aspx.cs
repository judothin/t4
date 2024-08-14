using SE256_activity_3_JaydenF.App_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SE256_activity_3_JaydenF.App_Code;
using static SE256_activity_3_JaydenF.App_Code.Book;

namespace SE256_activity_3_JaydenF.Backend
{
    public partial class BookSearch : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["LoggedIn"] != null && Session["LoggedIn"].ToString() == "TRUE")
            {
                // yas
            }
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            // Get the search criteria from the textboxes
            string title = txtTitle.Text.Trim();
            string authorLastName = txtAuthorLast.Text.Trim();

            // Create an instance of the BookSearchResult class
            BookSearchResult bookSearch = new BookSearchResult();

            // Perform the search
            List<Book> results = bookSearch.SearchBooks(title, authorLastName);

            // Bind the results to the DataGrid
            dgResults.DataSource = results;
            dgResults.DataBind();

            if (results.Count == 0)
            {
                feedback_label.Text = "No books found matching the search criteria.";
            }
            else
            {
                feedback_label.Text = $"{results.Count} books found.";
            }
        }

    }
}