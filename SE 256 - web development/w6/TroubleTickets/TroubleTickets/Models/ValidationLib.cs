using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace TroubleTickets.Models
{
    public class MyDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime _dateJoin;

            // Attempt to convert the value to a DateTime
            if (DateTime.TryParse(value?.ToString(), out _dateJoin))
            {
                // Check if the date is less than or equal to the current date
                if (_dateJoin <= DateTime.Now)
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult("Date must be less than or equal to today's date");
                }
            }
            else
            {
                // If the value cannot be converted to DateTime, return an error
                return new ValidationResult("Invalid date format");
            }
        }
    }


    public class StringOptionsValidate : Attribute, IModelValidator
    { 
        public string[] Allowed { get; set; }
        public string ErrorMessage { get; set; }

        public IEnumerable<ModelValidationResult> Validate
            (ModelValidationContext context)
        {
            if (Allowed.Contains(context.Model as string))
            {
                return Enumerable.Empty<ModelValidationResult>();
            }
            else
            {
                return new List<ModelValidationResult>
                {
                    new ModelValidationResult("", ErrorMessage)
                };
            }
        }
    }
}
