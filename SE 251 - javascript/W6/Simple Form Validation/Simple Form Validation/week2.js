// ------------------------ call function on button click / change styleing ----------------------
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input[type="button"]').addEventListener('click', function() {
        document.body.style.backgroundColor = 'black'; // change background to black
        document.getElementById('form').style.backgroundColor = 'white'; // change form div background to white
        validateForm(); // call the validation function
    });
});
// -----------------------------------------------------

function validateForm() {
    // ------------------ regex patterns ---------------------
    const namePattern = /^[a-z]+$/i;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    // -----------------------------------------------

    // ----------------- getting input values -----------------
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    // ----------------------------------------------

    // ----------------- validation -------------------
    let isValid = true;

    if (!namePattern.test(firstName)) {
        document.getElementById('fn-error').textContent = 'invalid first name';
        isValid = false;
    } else {
        document.getElementById('fn-error').textContent = '';
    }

    if (!namePattern.test(lastName)) {
        document.getElementById('ln-error').textContent = 'invalid last name';
        isValid = false;
    } else {
        document.getElementById('ln-error').textContent = '';
    }

    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = 'invalid email';
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = '';
    }

    if (!phonePattern.test(phone)) {
        document.getElementById('phone-error').textContent = 'invalid phone number';
        isValid = false;
    } else {
        document.getElementById('phone-error').textContent = '';
    }
    // -------------------------------------------------

    if (isValid) {
        // ----------------- creating user object ------------------
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        };
        // -----------------------------------------------

        // ----------------- writing user info to the html --------------------

        document.getElementById('info').innerHTML = `your info was submitted successfully<br>first name: ${user.firstName}<br>last name: ${user.lastName}<br>email: ${user.email}<br>phone: ${user.phone}`;
        document.getElementById('confirmation').style.color = '#7110cc'; // changing style of html element
        document.getElementById('confirmation').style.display = 'block';
    } else {
        document.getElementById('confirmation').style.display = 'none';
    }
    // ------------------------------------------------------
    // link to regex stuff https://ihateregex.io/
}