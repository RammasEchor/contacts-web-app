
const button = document.getElementById('createContact');

button.addEventListener('click', function (e) {
    var name = document.getElementById('contactNameInput').value;
    var lastName = document.getElementById('lastNameInput').value;
    var company = document.getElementById('companyInput').value;
    var phone = document.getElementById('phoneInput').value;
    var email = document.getElementById('emailInput').value;

    var errorTexts = document.getElementsByClassName('errorText');
    for (i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = '' ;
    } 

    var contactHasError = false ;

    if( /\d/.test(name) )   {
        var errorMsg = 'Name may not have numbers'
        document.getElementById('errorTextName').innerText = errorMsg ;
        contactHasError = true ;
    }

    if( /\d/.test(lastName) )   {
        var errorMsg = 'Last Name may not have numbers' ;
        document.getElementById('errorTextLastName').innerText = errorMsg ;
        contactHasError = true ;
    }

    if( company && !(/^[A-Za-z0-9]+$/.test(company)) )    {
        var errorMsg = 'Company may be empty, but may not have symbols' ;
        document.getElementById('errorTextCompany').innerText = errorMsg ;
        contactHasError = true ;
    }

    if( phone && !(/^[0-9]+$/.test(phone)) )    {
        var errorMsg = 'Phone may be empty, or only be numbers' ;
        document.getElementById('errorTextPhone').innerText = errorMsg ;
        contactHasError = true ;
    }

    if( !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) ) {
        var errorMsg = 'Is not a valid email address' ;
        document.getElementById('errorTextEmail').innerText = errorMsg ;
        contactHasError = true ;
    }

    if( contactHasError )   {
        return ;
    }

    fetch('/db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newContact: {
                name: name,
                lastName: lastName,
                company: company,
                phone: phone,
                email: email
            }
        })
    }).then((response) => {
        if( response.ok )   {
            fetchContacts();
        }
        else    {
            console.log( response );
        }
    });
});