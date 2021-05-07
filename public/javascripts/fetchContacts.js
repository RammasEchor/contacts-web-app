var contacts;


function paginateContacts(page) {
    var startIndex = (page - 1) * 10;
    var contactsToShow = [];

    for (i = startIndex, j = 0; i < contacts.length && j < 10; ++i, ++j) {
        contactsToShow.push(contacts[i]);
    }

    showContacts(contactsToShow);
    var navigation = createNavigationButtons(contacts);
    contactsBox.appendChild(navigation);
}

function showContacts(rows) {
    var contactsBox = document.getElementById('contactsBox');
    contactsBox.innerHTML = '';

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

    for (i = 0; i < rows.length; ++i) {
        var contact = createContact(rows[i]);
        contactsBox.appendChild(contact);
    }
}

function createNavigationButtons(rows) {
    var pagination = document.createElement('nav');
    pagination.setAttribute('class', 'pagination');
    pagination.setAttribute('role', 'navigation');
    pagination.setAttribute('arial-label', 'pagination');

    var pagList = document.createElement('ul');
    pagList.setAttribute('class', 'pagination-list');

    var page = 1;
    var item = document.createElement('li');
    var text = document.createElement('a');
    text.setAttribute('class', 'pagination-link');
    text.innerText = page;
    item.appendChild(text);
    item.setAttribute('onclick', 'paginateContacts(this.innerText)');
    pagList.appendChild(item);

    for (i = 0, j = 0 ; i < rows.length; ++i, ++j ) {
        if (j > 9) {
            j = 0 ;
            ++page;
            var item = document.createElement('li');
            var text = document.createElement('a');
            text.setAttribute('class', 'pagination-link');
            text.innerText = page;
            item.setAttribute('onclick', 'paginateContacts(this.innerText)');
            item.appendChild(text);
            pagList.appendChild(item);
        }
    }

    pagination.appendChild(pagList);
    return pagination;
}

function createContact(row) {
    var box = document.createElement('div');
    box.className = 'box';

    var columns = document.createElement('div');
    columns.className = 'columns is-vcentered';

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = row.name;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = row.lastname;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = row.company;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.style.wordWrap = 'break-word';
    column.innerText = row.phone;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.style.wordWrap = 'break-word';
    column.innerText = row.email;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-1 is-offset-1'
    var button = document.createElement('button');
    button.className = 'button is-warning is-light';
    button.innerText = 'Edit';
    button.setAttribute('id', row.email);
    button.setAttribute('onclick', 'editContact(this.id,this)');
    column.appendChild(button);
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column'
    var button = document.createElement('button');
    button.className = 'button is-danger is-light';
    button.innerText = 'Delete';
    button.setAttribute('id', row.email);
    button.setAttribute('onclick', 'deleteContact(this.id)');
    column.appendChild(button);
    columns.appendChild(column);

    box.appendChild(columns);
    return box;
}

function fetchContacts() {
    fetch('/db', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((res) => {
        contacts = res.rows.results;
        paginateContacts(1);
    }).catch((err) => {
        console.log('Fetch error: ' + err);
    });
}

// Filter input
const filterInput = document.getElementById('filterInput')
filterInput.addEventListener('focusin', startTrackingKey);
filterInput.addEventListener('focusout', stopTrackingKeys);

function startTrackingKey(event) {
    const filterInput = document.getElementById('filterInput');
    filterInput.addEventListener('keyup', handleKeyPressed);
}

function stopTrackingKeys(event) {
    const filterInput = document.getElementById('filterInput');
    filterInput.removeEventListener('keyup', handleKeyPressed);
}

async function handleKeyPressed(event) {
    const filterInput = document.getElementById('filterInput');
    const regexFilter = filterInput.value ;

    console.log( regexFilter );

    const allContacts = await fetchContactsToFilter();
    contacts = filterContacts( allContacts, regexFilter );
    paginateContacts(1);
}

async function fetchContactsToFilter()    {
    let cont = await fetch('/db', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((res) => {
        return res.rows.results ;
    }).catch((err) => {
        console.log('Fetch error: ' + err);
    });

    return cont ;
}

function filterContacts( contacts, regex )   {
    console.log( regex );
    let filteredContacts = contacts.filter( (contact) => {
        if( contact.name.includes(regex) )
            return true
        else if( contact.lastname.includes( regex ))
            return true ;

        return false ;
    });

    return filteredContacts ; 
}