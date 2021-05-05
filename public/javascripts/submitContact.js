
const button = document.getElementById('createContact');

button.addEventListener('click', function (e) {
    var name = document.getElementById('contactNameInput').value;
    var lastName = document.getElementById('lastNameInput').value;
    var company = document.getElementById('companyInput').value;
    var phone = document.getElementById('phoneInput').value;
    var email = document.getElementById('emailInput').value;

    var hadError = false ;

    if( /\d/.test(name) )   {
        var errorMsg = 'Name may not have numbers'
        document.getElementById('errorTextName').innerText = errorMsg ;
        hadError = true ;
    }

    if( /\d/.test(lastName) )   {
        var errorMsg = 'Last Name may not have numbers' ;
        document.getElementById('errorTextLastName').innerText = errorMsg ;
        hadError = true ;
    }

    if( company && !(/^[A-Za-z0-9]+$/.test(company)) )    {
        var errorMsg = 'Company may be empty, but may not have symbols' ;
        document.getElementById('errorTextCompany').innerText = errorMsg ;
        hadError = true ;
    }

    if( !(/^[0-9]+$/.test(phone)) )    {
        var errorMsg = 'Phone may only be numbers' ;
        document.getElementById('errorTextCompany').innerText = errorMsg ;
        hadError = true ;
    }

    fetch('/db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newContact: {
                name: "Luis",
                lastName: "Smith",
                company: "Encora",
                phone: "4444908947",
                email: "john@example.com"
            }
        })
    }).then((response) => {
            console.log(response);
    });
});