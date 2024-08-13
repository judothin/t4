using System;
using System.Data.SqlClient;
using System.Web.UI;
using SE256_activity_3_JaydenF.App_Code;
using static SE256_activity_3_JaydenF.App_Code.Book;

namespace SE256_activity_3_JaydenF.Backend
{
    public partial class EbookManager : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["Id"] != null)
                {
                    int bookId = Convert.ToInt32(Request.QueryString["Id"]);
                    LoadBookDetails(bookId);
                }
            }
        }

        private void LoadBookDetails(int id)
        {
            BookSearchResult bookSearch = new BookSearchResult();
            Book book = bookSearch.GetBookById(id);

            if (book != null)
            {
                book_title.Text = book.Title;
                author_first_name.Text = book.AuthorFirstName;
                author_last_name.Text = book.AuthorLastName;
                author_email.Text = book.Email;
                date_published.SelectedDate = book.DatePublished;
                price_per_copy.Text = book.Price.ToString("N2");
                number_of_pages.Text = book.Pages.ToString();
            }
        }



        protected void submit_button_click(Object sender, EventArgs e)
        {
            if (!double.TryParse(price_per_copy.Text, out double price))
            {
                feedback_label.Text = "Price per copy must be a number.";
                return;
            }

            if (!int.TryParse(number_of_pages.Text, out int pages))
            {
                feedback_label.Text = "Number of pages must be a number.";
                return;
            }

            Book book = new Book(
                book_title.Text,
                author_first_name.Text,
                author_last_name.Text,
                author_email.Text,
                date_published.SelectedDate,
                price,
                pages
            );

            string connectionString = "Server=sql.neit.edu,4500;Database=Dev_202430_JFagre;User Id=Dev_202430_JFagre;Password=008024602;Encrypt=True;TrustServerCertificate=True;";

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();

                    string query = "INSERT INTO Books (Title, AuthorFirstName, AuthorLastName, Email, DatePublished, Price, Pages) " +
                                   "VALUES (@Title, @AuthorFirstName, @AuthorLastName, @Email, @DatePublished, @Price, @Pages)";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@Title", book.Title);
                        cmd.Parameters.AddWithValue("@AuthorFirstName", book.AuthorFirstName);
                        cmd.Parameters.AddWithValue("@AuthorLastName", book.AuthorLastName);
                        cmd.Parameters.AddWithValue("@Email", book.Email);
                        cmd.Parameters.AddWithValue("@DatePublished", book.DatePublished);
                        cmd.Parameters.AddWithValue("@Price", book.Price);
                        cmd.Parameters.AddWithValue("@Pages", book.Pages);

                        cmd.ExecuteNonQuery();
                    }

                    feedback_label.Text = "Book added successfully!";
                }
            }
            catch (Exception ex)
            {
                feedback_label.Text = "An error occurred: " + ex.Message;
            }
        }

        protected void update_button_Click(object sender, EventArgs e)
        {

            string title = book_title.Text;
            string authorFirstName = author_first_name.Text;
            string authorLastName = author_last_name.Text;
            string email = author_email.Text;
            DateTime datePublished = date_published.SelectedDate;
            double price = double.Parse(price_per_copy.Text);
            int pages = int.Parse(number_of_pages.Text);

            Book updatedBook = new Book(
                title,
                authorFirstName,
                authorLastName,
                email,
                datePublished,
                price,
                pages
            );

            updatedBook.Id = int.Parse(Request.QueryString["Id"]);

            BookSearchResult bookSearchResultInstance = new BookSearchResult();
            bookSearchResultInstance.UpdateBook(updatedBook);

            feedback_label.Text = "Book updated successfully!";

            

        }

    }
}
