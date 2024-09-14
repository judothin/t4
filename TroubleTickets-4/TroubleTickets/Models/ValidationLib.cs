﻿using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace TroubleTickets.Models
{
    public class ValidationLib
    {
        public class MyDate : ValidationAttribute
        {
            protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
            {
                DateTime _dateJoin = Convert.ToDateTime(value);

                if (_dateJoin <= DateTime.Now)
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult(ErrorMessage);
                }
            }
        }

        public class StringOptionsValidate : Attribute, IModelValidator
        {
            public string[] Allowed { get; set; }
            public string ErrorMessage { get; set; }

            public IEnumerable<ModelValidationResult> Validate(ModelValidationContext context)
            {
                if (Allowed.Contains(context.Model as string))
                {
                    return Enumerable.Empty<ModelValidationResult>();
                }
                else
                {
                    return new List<ModelValidationResult> { new ModelValidationResult("", ErrorMessage) };
                }
            }
        }
    }
}
