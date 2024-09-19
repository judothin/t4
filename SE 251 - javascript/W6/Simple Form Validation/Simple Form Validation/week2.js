document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input[type="button"]').addEventListener('click', function() {
        document.body.style.backgroundColor = 'black'; // change background to black
        document.getElementById('form').style.backgroundColor = 'white'; // change form div background to white
        validateForm(); // call the validation function
    });
});

function validateForm() {
    // ------------------ regex patterns ---------------------
    const namePattern = /^[a-zA-Z-]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    // -----------------------------------------------

    // ----------------- validation -------------------
    let isValid = true;

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    // validate first name
    if (firstName.value === '') {
        document.getElementById('fn-error').textContent = 'Please input first name';
        firstName.parentElement.classList.add('error');
        isValid = false;
    } else if (!namePattern.test(firstName.value)) {
        document.getElementById('fn-error').textContent = 'Invalid characters in first name';
        firstName.parentElement.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('fn-error').textContent = '';
        firstName.parentElement.classList.remove('error');
    }

    // validate last name
    if (lastName.value === '') {
        document.getElementById('ln-error').textContent = 'Please input last name';
        lastName.parentElement.classList.add('error');
        isValid = false;
    } else if (!namePattern.test(lastName.value)) {
        document.getElementById('ln-error').textContent = 'Invalid characters in last name';
        lastName.parentElement.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('ln-error').textContent = '';
        lastName.parentElement.classList.remove('error');
    }

    // validate email
    if (email.value === '') {
        document.getElementById('email-error').textContent = 'Please input email';
        email.parentElement.classList.add('error');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        document.getElementById('email-error').textContent = 'Invalid email format';
        email.parentElement.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = '';
        email.parentElement.classList.remove('error');
    }

    // validate phone number
    if (phone.value === '') {
        document.getElementById('phone-error').textContent = 'Please input phone number';
        phone.parentElement.classList.add('error');
        isValid = false;
    } else if (!phonePattern.test(phone.value)) {
        document.getElementById('phone-error').textContent = 'Invalid phone number format';
        phone.parentElement.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('phone-error').textContent = '';
        phone.parentElement.classList.remove('error');
    }
    // -------------------------------------------------

    if (isValid === true) {
        document.getElementById('form').style.display = 'none';
        document.getElementById('confirmation').style.marginTop = '45px';

        // ----------------- creating user object ------------------
        const formattedPhone = phone.value.substring(0, 3) + '-' + phone.value.substring(3, 6) + '-' + phone.value.substring(6); // formatting phone number
        
        const user = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: formattedPhone
        };
        // -----------------------------------------------

        // ----------------- writing user info to the html --------------------
        document.getElementById('info').innerHTML = `${user.firstName} ${user.lastName} <br> ${user.email} <br> ${user.phone}`;
        document.getElementById('confirmation').style.color = '#7110cc'; // changing style of html element
        document.getElementById('confirmation').style.display = 'block';
    }

    if (isValid) {
        // ----------------- creating user object ------------------
        const formattedPhone = phone.value.substring(0, 3) + '-' + phone.value.substring(3, 6) + '-' + phone.value.substring(6); // formatting phone number
        
        const user = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: formattedPhone
        };
        // -----------------------------------------------
    
        // ----------------- writing user info to the html --------------------
        document.getElementById('info').innerHTML = `${user.firstName} ${user.lastName} <br> ${user.email} <br> ${user.phone}`;
        document.getElementById('confirmation').style.color = '#7110cc'; // changing style of html element
        document.getElementById('confirmation').style.display = 'block';
    } else {
        document.getElementById('confirmation').style.display = 'none';
    }
    // ------------------------------------------------------
    // link to regex stuff https://ihateregex.io/
}