
function showContacts( rows )   {
    console.log( rows );
    console.log('Show contacts');
    var contactsBox = document.getElementById('contactsBox');
    contactsBox.innerHTML = '' ;

    console.log( contactsBox );

    for( i = 0 ; i < rows.length ; ++i )    {
        var box = document.createElement('div');
        box.className = 'box';

        console.log( box );

        var columns = document.createElement('div');
        columns.className = 'columns is-vcentered' ;

        var column = document.createElement('p');
        column.className = 'column'
        column.innerText = rows[i].name ;
        columns.appendChild( column );

        var column = document.createElement('p');
        column.className = 'column'
        column.innerText = rows[i].lastname ;
        columns.appendChild( column );

        var column = document.createElement('p');
        column.className = 'column'
        column.innerText = rows[i].company ;
        columns.appendChild( column );

        var column = document.createElement('p');
        column.className = 'column'
        column.innerText = rows[i].phone ;
        columns.appendChild( column );

        var column = document.createElement('p');
        column.className = 'column'
        column.innerText = rows[i].email ;
        columns.appendChild( column );

        box.appendChild( columns );
        contactsBox.appendChild( box );
    }
}

function fetchContacts()    {
    console.log('Fetching contacts...');
    fetch('/db', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then( (res) => {
        console.log('Contacts fetched.');
        showContacts( res.rows );
    }).catch((err) => {
        console.log('Fetch error: ' + err );
    });
}