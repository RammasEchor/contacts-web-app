
function deleteContact( mail )  {
    var answer = window.confirm("Delete contact?");

    if( !answer )
        return ;

    console.log('PATCH contact...');
    fetch('/db', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updatedContact: {
                mail: mail,
                delete: 'yes'
            }
        })
    }).then((response) => {
        if( response.ok )   {
            console.log('Contact deleted.');
            fetchContacts();
        }
        else    {
            console.log( response );
        }
    });
}