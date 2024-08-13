using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace SE256_activity_3_JaydenF.App_Code
{
    public class ValidationLibrary
    {
        private static readonly string[] _badWords = { "poop", "homework", "caca" };

        public static bool ContainsBadWords(string inputWord)
        {
            return _badWords.Any(badWord => inputWord.ToLower().Contains(badWord));
        }

        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }

            // Simple validation to check if the email contains an @ symbol
            return email.Contains("@");
        }
    }

    public class BookSearch
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

                    string query = "SELECT Title, AuthorFirstName, AuthorLastName, Email, DatePublished, Price, Pages FROM Books WHERE 1=1";

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

                                books.Add(book);
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Handle exceptions
                throw new Exception("An error occurred while searching for books: ");
            }

            return books;
        }
    }
    }