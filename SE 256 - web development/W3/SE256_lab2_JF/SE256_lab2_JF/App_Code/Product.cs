using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace SE256_lab2_JF.App_Code
{
    public class Product
    {
        private int _id;
        private string _name;
        private string _manufacturer;
        private DateTime _dateExpires;
        private double _price;

        public List<string> Errors { get; private set; } = new List<string>();

        public Product
(
            string name,
            string manufacturer,
            DateTime dateExpires,
            double price
)
        {
            Name = name;
            Manufacturer = manufacturer;
            DateExpires = dateExpires;
            Price = price;
        }

        public int Id
        {
            get => _id;
            set
            {
                _id = value;
            }
        }

        public string Name
        {
            get => _name;
            set
            {
                if (ValidationLibrary.ContainsBadWords(value))
                {
                    Errors.Add("BAD WORD/S DETCETED!!!!");
                }

                _name = value;
            }
        }

        public string Manufacturer
        {
            get => _manufacturer;
            set
            {
                if (ValidationLibrary.ContainsBadWords(value))
                {
                    Errors.Add("BAD WORD/S DETCETED!!!!");
                }

                _manufacturer = value;
            }
        }

        public DateTime DateExpires
        {
            get => _dateExpires;
            set
            {
                if (value < DateTime.Now)
                {
                    Errors.Add("Expiration date must be in the future.");
                }

                _dateExpires = value;
            }
        }

        public double Price
        {
            get => _price;
            set
            {
                if (value < 0)
                {
                    Errors.Add("Price must be greater than 0.");
                }

                _price = value;
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

            return $"Name: {this.Name}\n" +
                    $"Manufacturer: {this.Manufacturer}\n" +
                    $"Expiration Date: {this.DateExpires}\n" +
                    $"Price: ${this.Price}\n";
        }

        public class ProductSearchResult
        {
            private readonly string _connectionString = "Server=sql.neit.edu,4500;Database=Dev_202430_JFagre;User Id=Dev_202430_JFagre;Password=008024602;Encrypt=True;TrustServerCertificate=True;";

            public List<Product> SearchProducts(string name, string manufacturer)
            {
                List<Product> products = new List<Product>();

                try
                {
                    using (SqlConnection conn = new SqlConnection(_connectionString))
                    {
                        conn.Open();
                        // Sql search query
                        string query = "SELECT Id, Name, Manufacturer, DateExpires, Price FROM Products_t4 WHERE 1=1";

                        if (!string.IsNullOrEmpty(name))
                        {
                            query += " AND Name LIKE @Name";
                        }

                        if (!string.IsNullOrEmpty(manufacturer))
                        {
                            query += " AND Manufacturer LIKE @Manufacturer";
                        }

                        using (SqlCommand cmd = new SqlCommand(query, conn))
                        {
                            if (!string.IsNullOrEmpty(name))
                            {
                                cmd.Parameters.AddWithValue("@Name", "%" + name + "%");
                            }

                            if (!string.IsNullOrEmpty(manufacturer))
                            {
                                cmd.Parameters.AddWithValue("@Manufacturer", "%" + manufacturer + "%");
                            }

                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    Product product = new Product(
                                        reader["Name"].ToString(),
                                        reader["Manufacturer"].ToString(),
                                        Convert.ToDateTime(reader["DateExpires"]),
                                        Convert.ToDouble(reader["Price"])

                                    );

                                    product.Id = Convert.ToInt32(reader["Id"]);

                                    products.Add(product);
                                }
                            }

                        }
                    }
                }
                // Catch any errors (gives specifics)
                catch (Exception ex)
                {
                    throw new Exception("An error occurred while searching for products: " + ex.Message + " | StackTrace: " + ex.StackTrace);
                }

                return products;
            }

            // Grab the product id
            public Product GetProductById(int id)
            {
                Product product = null;

                string query = "SELECT Id, Name, Manufacturer, DateExpires, Price FROM Products_t4 WHERE Id = @Id";

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
                                product = new Product(
                                    reader["Name"].ToString(),
                                    reader["Manufacturer"].ToString(),
                                    Convert.ToDateTime(reader["DateExpires"]),
                                    Convert.ToDouble(reader["Price"])
                                );
                                product.Id = id;
                            }
                        }
                    }
                }

                return product;
            }

            // Update the product
            public void UpdateProduct(Product product)
            {
                string query = "UPDATE Products_t4 SET Name = @Name, Manufacturer = @Manufacturer, DateExpires = @DateExpires, Price = @Price WHERE Id = @Id";

                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@Name", product.Name);
                        cmd.Parameters.AddWithValue("@Manufacturer", product.Manufacturer);
                        cmd.Parameters.AddWithValue("@DateExpires", product.DateExpires);
                        cmd.Parameters.AddWithValue("@Price", product.Price);
                        cmd.Parameters.AddWithValue("@Id", product.Id);

                        cmd.ExecuteNonQuery();
                    }
                }
            }



        }

    }
    }