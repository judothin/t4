using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Linq.Expressions;

namespace SE256_activity_3_JaydenF.App_Code
{
    public class Book
    {
        private int _id;
        private string _title;
        private string _authorFirstName;
        private string _authorLastName;
        private string _email;
        private DateTime _datePublished;
        private double _price;
        private int _pages;

        public List<string> Errors { get; private set; } = new List<string>();

        public Book(
            string title,
            string authorFirstName,
            string authorLastName,
            string email,
            DateTime datePublished,
            double price,
            int pages
        )
        {
            Title = title;
            AuthorFirstName = authorFirstName;
            AuthorLastName = authorLastName;
            Email = email;
            DatePublished = datePublished;
            Price = price;
            Pages = pages;
        }

        public int Id
        {
            get => _id;
            set
            {
                _id = value;
            }
        }

        public string Title
        {
            get => _title;
            set
            {
                if (ValidationLibrary.ContainsBadWords(value))
                {
                    Errors.Add("Title contains bad word(s)");
                    return;
                }

                _title = value;
            }
        }

        public string AuthorFirstName
        {
            get => _authorFirstName;
            set
            {
                _authorFirstName = value;
            }
        }

        public string AuthorLastName
        {
            get => _authorLastName;
            set
            {
                _authorLastName = value;
            }
        }

        public string Email
        {
            get => _email;
            set
            {
                if (!ValidationLibrary.IsValidEmail(value))
                {
                    Errors.Add("Invalid Email Address");
                }
                else
                {
                    _email = value;
                }
            }
        }

        public DateTime DatePublished
        {
            get => _datePublished;
            set
            {
                if (value > DateTime.Now)
                {
                    Errors.Add("Date Published must not be in the future");
                    return;
                }

                _datePublished = value;
            }
        }

        public double Price
        {
            get => _price;
            set
            {
                _price = value;
            }
        }

        public int Pages
        {
            get => _pages;
            set
            {
                _pages = value;
            }
        }

        public bool HasErrors()
        {
            return this.Errors.Count > 0;
        }

        public virtual string GetFeedback()
        {
            if (this.HasErrors())
            {
                return String.Join("<br>", Errors);
            }

            return $"Title: {this.Title}\n" +
                    $"Author First Name: {this.AuthorFirstName}\n" +
                    $"Author Last Name: {this.AuthorLastName}\n" +
                    $"Author Email: {this.Email}\n" +
                    $"Date Published: {this.DatePublished.Date:yyyy-MM-dd}\n" +
                    $"Price: ${this.Price:N2}\n" +
                    $"Number of Pages: {this.Pages:N0}\n";
        }

        public class BookSearchResult
        {
            private readonly string _connectionString = "Server=sql.neit.edu,4500;Database=Dev_202430_JFagre;User Id=Dev_202430_JFagre;Password=008024602;Encrypt=True;TrustServerCertificate=True;";

            public List<Book> SearchBooks(string title, string authorLastName)
            {
                List<Book> books = new List<Book>();

                try
                {
                    using (SqlConnection conn = new SqlConnection(_connectionString))
                    {
                        conn.Open();

                        string query = "SELECT Id, Title, AuthorFirstName, AuthorLastName, Email, DatePublished, Price, Pages FROM Books WHERE 1=1";

                        if (!string.IsNullOrEmpty(title))
                        {
                            query += " AND Title LIKE @Title";
                        }

                        if (!string.IsNullOrEmpty(authorLastName))
                        {
                            query += " AND AuthorLastName LIKE @AuthorLastName";
                        }

                        using (SqlCommand cmd = new SqlCommand(query, conn))
                        {
                            if (!string.IsNullOrEmpty(title))
                            {
                                cmd.Parameters.AddWithValue("@Title", "%" + title + "%");
                            }

                            if (!string.IsNullOrEmpty(authorLastName))
                            {
                                cmd.Parameters.AddWithValue("@AuthorLastName", "%" + authorLastName + "%");
                            }

                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    Book book = new Book(
                                        reader["Title"].ToString(),
                                        reader["AuthorFirstName"].ToString(),
                                        reader["AuthorLastName"].ToString(),
                                        reader["Email"].ToString(),
                                        Convert.ToDateTime(reader["DatePublished"]),
                                        Convert.ToDouble(reader["Price"]),
                                        Convert.ToInt32(reader["Pages"])
                                    );

                                    book.Id = Convert.ToInt32(reader["Id"]);

                                    books.Add(book);
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("An error occurred while searching for books: " + ex.Message + " | StackTrace: " + ex.StackTrace);
                }

                return books;
            }

            public Book GetBookById(int id)
            {
                Book book = null;

                string query = "SELECT Id, Title, AuthorFirstName, AuthorLastName, Email, DatePublished, Price, Pages FROM Books WHERE Id = @Id";

                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                book = new Book(
                                    reader["Title"].ToString(),
                                    reader["AuthorFirstName"].ToString(),
                                    reader["AuthorLastName"].ToString(),
                                    reader["Email"].ToString(),
                                    Convert.ToDateTime(reader["DatePublished"]),
                                    Convert.ToDouble(reader["Price"]),
                                    Convert.ToInt32(reader["Pages"])
                                );
                                book.Id = id;
                            }
                        }
                    }
                }

                return book;
            }

            public void UpdateBook(Book book)
            {
                string query = "UPDATE Books SET Title = @Title, AuthorFirstName = @AuthorFirstName, AuthorLastName = @AuthorLastName, Email = @Email, DatePublished = @DatePublished, Price = @Price, Pages = @Pages WHERE Id = @Id";

                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@Title", book.Title);
                        cmd.Parameters.AddWithValue("@AuthorFirstName", book.AuthorFirstName);
                        cmd.Parameters.AddWithValue("@AuthorLastName", book.AuthorLastName);
                        cmd.Parameters.AddWithValue("@Email", book.Email);
                        cmd.Parameters.AddWithValue("@DatePublished", book.DatePublished);
                        cmd.Parameters.AddWithValue("@Price", book.Price);
                        cmd.Parameters.AddWithValue("@Pages", book.Pages);
                        cmd.Parameters.AddWithValue("@Id", book.Id);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
