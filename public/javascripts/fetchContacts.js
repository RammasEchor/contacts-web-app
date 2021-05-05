
function showContacts( rows )   {
    console.log( rows );
    console.log('Show contacts');
    var contactsBox = document.getElementById('contactsBox');
    contactsBox.innerHTML = '' ;
    
    contactsBox.innerHTML = `
    <div class="columns is-vcentered" id="titles">
        <div class="column is-1">
            <h6 class="title is-6">Name<h6>
        </div>
        <div class="column is-1">
            <h6 class="title is-6">Last Name<h6>
        </div>
        <div class="column is-2">
            <h6 class="title is-6">Company<h6>
        </div>
        <div class="column is-2">
            <h6 class="title is-6">Phone<h6>
        </div>
        <div class="column is-2">
            <h6 class="title is-6">Email<h6>
        </div>
    </div>
    `;

    var pagination = document.createElement('nav');
    pagination.setAttribute('class', 'pagination');
    pagination.setAttribute('role', 'navigation');
    pagination.setAttribute('arial-label', 'pagination');

    var pagList = document.createElement('ul');
    pagList.setAttribute('class', 'pagination-list');

    var page = 1 ;
    var item = document.createElement('li');
    var text = document.createElement('a');
    text.setAttribute('class', 'pagination-link');
    text.innerText = page ;
    item.appendChild( text );
    pagList.appendChild( item );

    for( i = 0 ; i < rows.length ; ++i )    {
        var contact = createContact( rows[i] );

        if( i > 9 ) {
            ++page ;
            var item = document.createElement('li');
            var text = document.createElement('a');
            text.setAttribute('class', 'pagination-link');
            text.innerText = page ;
            item.appendChild( text );
            pagList.appendChild( item );
        }

        contactsBox.appendChild( contact );
    }

    pagination.appendChild( pagList );
    contactsBox.appendChild( pagination ); 
}

function createContact( row )   {
    var box = document.createElement('div');
    box.className = 'box';

    var columns = document.createElement('div');
    columns.className = 'columns is-vcentered' ;

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = row.name ;
    columns.appendChild( column );

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = row.lastname ;
    columns.appendChild( column );

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = row.company ;
    columns.appendChild( column );

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = row.phone ;
    columns.appendChild( column );

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = row.email ;
    columns.appendChild( column );

    var column = document.createElement('p');
    column.className = 'column is-1 is-offset-1'
    var button = document.createElement('button');
    button.className = 'button is-warning';
    button.innerText = 'Edit' ;
    column.appendChild( button );
    columns.appendChild( column );

    var column = document.createElement('p');
    column.className = 'column'
    var button = document.createElement('button');
    button.className = 'button is-danger';
    button.innerText = 'Delete' ;
    column.appendChild( button );
    columns.appendChild( column );

    box.appendChild( columns );
    return box ;
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