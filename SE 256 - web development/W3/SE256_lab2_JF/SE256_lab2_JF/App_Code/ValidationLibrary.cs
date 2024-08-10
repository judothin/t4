using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SE256_lab2_JF.App_Code
{
    public class ValidationLibrary
    {
        private static readonly string[] _badWords = { "poop", "homework", "caca" };

        public static bool ContainsBadWords(string inputWord)
        {
            return false;
            return _badWords.Any(badWord => inputWord.ToLower().Contains(badWord));
        }
    }
}