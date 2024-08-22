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

        public static bool NoNegative(double number)
        {
            return number >= 0;
        }

        public static bool NoNegative(int number)
        {
            return number >= 0;
        }
    }

    
    }