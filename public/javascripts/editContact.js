
function editContact(mail, button) {
    button.setAttribute('title', 'Disabled button');
    button.disabled = true ;
    var row = document.getElementById(mail).parentElement.parentElement;
    var elements = row.children;
    var contactInfo = [];

    for (i = 0; i < (elements.length - 2); ++i) {
        contactInfo.push(elements[i].innerText);
    }

    row.parentElement.appendChild(createEditControls(contactInfo));
}

function createEditControls(elements) {
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
    button.setAttribute('onclick', 'postEditedContact(this.id)');
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

function postEditedContact(mail) {
    console.log(mail)
}

function validateInputs(mail) {

}

function returnToNormal(mail) {
    var row = document.getElementById(mail).parentElement.parentElement;
    var elements = row.children;
    console.log(row.children);

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
    button.setAttribute('onclick', 'editContact(this.id)');
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