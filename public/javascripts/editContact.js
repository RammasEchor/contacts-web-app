
function editContact(mail, button) {
    button.setAttribute('title', 'Disabled button');
    button.disabled = true;
    var row = document.getElementById(mail).parentElement.parentElement;
    var elements = row.children;
    var contactInfo = [];

    for (i = 0; i < (elements.length - 2); ++i) {
        contactInfo.push(elements[i].innerText);
    }

    row.parentElement.appendChild(createEditControls(contactInfo, mail));
}

function createEditControls(elements, mail) {
    var rows = document.createElement('div');

    for (i = 0; i <= 4; ++i) {
        var div = document.createElement('div');
        var column = document.createElement('input');
        column.className = 'input'
        column.value = elements[i];
        div.className = 'block';
        div.appendChild(column);
        rows.appendChild(div);
    }

    var div = document.createElement('div');
    div.className = 'columns is-vcentered'

    var column = document.createElement('div');
    var button = document.createElement('button');
    button.className = 'button is-warning';
    button.innerText = 'Save';
    button.setAttribute('id', elements[4]);
    button.setAttribute('title', mail);
    button.setAttribute('onclick', 'postEditedContact(this)');
    column.className = 'column is-narrow';
    column.appendChild(button);
    div.appendChild(column);

    var column = document.createElement('div');
    var button = document.createElement('button');
    button.className = 'button is-danger';
    button.innerText = 'Cancel';
    button.setAttribute('id', elements[4]);
    button.setAttribute('onclick', 'returnToNormal(this.id)');
    column.className = 'column';
    column.appendChild(button);
    div.appendChild(column);

    rows.appendChild(div);
    return rows;
}

function postEditedContact(button) {
    var row = document.getElementById(button.id).parentElement.parentElement.parentElement ;
    var elements = row.children[1].children ;

    for( i = 0 ; i < 5 ; ++i )  {
        elements[i].children[0].className = 'input' ;
    }

    var name = elements[0].children[0].value;
    var lastName = elements[1].children[0].value;
    var company = elements[2].children[0].value;
    var phone = elements[3].children[0].value;
    var email = elements[4].children[0].value;

    var contactHasError = false;

    if (!name || /\d/.test(name)) {
        elements[0].children[0].className = 'input is-danger' ;
        contactHasError = true;
    }

    if (!lastName || /\d/.test(lastName)) {
        elements[1].children[0].className = 'input is-danger' ;
        contactHasError = true;
    }

    if (company && !(/^[A-Za-z0-9\s]+$/.test(company))) {
        elements[2].children[0].className = 'input is-danger' ;
        contactHasError = true;
    }

    if (phone && !(/^[0-9]+$/.test(phone))) {
        elements[3].children[0].className = 'input is-danger' ;
        contactHasError = true;
    }

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
        elements[4].children[0].className = 'input is-danger' ;
        contactHasError = true;
    }

    if (contactHasError) {
        console.log('Error in contact data.');
        return;
    }

    console.log('PATCH contact...');
    fetch('/db', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updatedContact: {
                name: name,
                lastName: lastName,
                company: company,
                phone: phone,
                email: email,
                originalEmail: button.id
            }
        })
    }).then((response) => {
        if( response.ok )   {
            console.log('Contact modified.');
            fetchContacts();
        }
        else    {
            response.json().then( (data) => {
                console.log( error );
                if( error.code == '22001' ) {
                    window.alert('One of the fields is too large');
                }
                else if( error.code == '23505' )    {
                    window.alert('Phone/email already exists');
                }
            });
        }
    });
}

function returnToNormal(mail) {
    var row = document.getElementById(mail).parentElement.parentElement;
    var elements = row.children;

    var columns = document.createElement('div');
    columns.className = 'columns is-vcentered';

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = elements[0].innerText;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = elements[1].innerText;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = elements[2].innerText;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = elements[3].innerText;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = elements[4].innerText;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-1 is-offset-1'
    var button = document.createElement('button');
    button.className = 'button is-warning is-light';
    button.innerText = 'Edit';
    button.setAttribute('id', elements[4].innerText);
    button.setAttribute('onclick', 'editContact(this.id, this)');
    column.appendChild(button);
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column'
    var button = document.createElement('button');
    button.className = 'button is-danger is-light';
    button.innerText = 'Delete';
    button.setAttribute('id', elements[4].innerText);
    button.setAttribute('onclick', 'deleteContact(this.id)');
    column.appendChild(button);
    columns.appendChild(column);

    var parent = row.parentElement;
    parent.innerHTML = '';
    parent.appendChild(columns);
}