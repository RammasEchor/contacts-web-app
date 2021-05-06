
function editContact(mail) {
    var row = document.getElementById(mail).parentElement.parentElement;
    console.log(row);
    var elements = row.children;
    var contactInfo = [];

    for (i = 0; i < (elements.length - 2); ++i) {
        contactInfo.push(elements[i].innerText);
    }

    // row.innerHTML = '';
    row.parentElement.appendChild(createEditControls(contactInfo));
}

function createEditControls(elements) {
    console.log(elements);

    var rows = document.createElement('div');

    var div = document.createElement('div');
    var column = document.createElement('input');
    column.className = 'input'
    column.value = elements[0];
    div.className = 'block';
    div.appendChild(column);
    rows.appendChild(div);

    var div = document.createElement('div');
    var column = document.createElement('input');
    column.className = 'input box'
    column.value = elements[1];
    div.className = 'block';
    div.appendChild(column);
    rows.appendChild(div);

    var div = document.createElement('div');
    var column = document.createElement('input');
    column.className = 'input box'
    column.value = elements[2];
    div.className = 'block';
    div.appendChild(column);
    rows.appendChild(div);

    var div = document.createElement('div');
    var column = document.createElement('input');
    column.className = 'input box'
    column.value = elements[3];
    div.className = 'block';
    div.appendChild(column);
    rows.appendChild(div);

    var div = document.createElement('div');
    var column = document.createElement('input');
    column.className = 'input box'
    column.value = elements[4];
    div.className = 'block';
    rows.appendChild(column);
    div.appendChild(column);

    var div = document.createElement('div');
    div.className = 'columns is-vcentered'

    var column = document.createElement('div');
    var button = document.createElement('button');
    button.className = 'button is-warning';
    button.innerText = 'Save';
    button.setAttribute('id', elements[4]);
    button.setAttribute('onclick', 'postEditedContact(this.id)');
    column.className = 'column' ;
    column.appendChild(button);
    div.appendChild(column);

    var column = document.createElement('div');
    var button = document.createElement('button');
    button.className = 'button is-danger';
    button.innerText = 'Cancel';
    button.setAttribute('id', elements[4]);
    button.setAttribute('onclick', 'returnToNormal(this.id)');
    column.className = 'column' ;
    column.appendChild(button);
    div.appendChild(column);

    rows.appendChild( div );
    return rows;
}

function postEditedContact(mail) {
    console.log(mail)
}

function returnToNormal(mail) {
    var row = document.getElementById(mail).parentElement.parentElement;
    var elements = row.children;
    console.log(elements);

    var columns = document.createElement('div');
    columns.className = 'columns is-vcentered';

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = elements[0].value;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-1'
    column.innerText = elements[1].value;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = elements[2].value;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = elements[3].value;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-2'
    column.innerText = elements[4].value;
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column is-1 is-offset-1'
    var button = document.createElement('button');
    button.className = 'button is-warning is-light';
    button.innerText = 'Edit';
    button.setAttribute('id', elements[4].value);
    button.setAttribute('onclick', 'editContact(this.id)');
    column.appendChild(button);
    columns.appendChild(column);

    var column = document.createElement('p');
    column.className = 'column'
    var button = document.createElement('button');
    button.className = 'button is-danger is-light';
    button.innerText = 'Delete';
    button.setAttribute('id', elements[4].value);
    button.setAttribute('onclick', 'deleteContact(this.id)');
    column.appendChild(button);
    columns.appendChild(column);

    row.innerHTML = '';
    row.appendChild(columns);
}