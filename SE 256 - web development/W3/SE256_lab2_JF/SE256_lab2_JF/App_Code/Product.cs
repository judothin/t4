using System;
using System.Collections.Generic;

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

    }
}