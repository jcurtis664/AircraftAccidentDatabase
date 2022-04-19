async function searchAccidents()
{
    let search = document.getElementById('search').value.split(" ").map(function (item) {
        return item.trim();
    });

    //if (search.length == 1 && search[0] == '') return;
    
    let table = document.getElementById('table');

    table.innerHTML = '';

    list.append(table);
    makeHeader(table);

    let url = window.location.href + 'searchResults';

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(search)
    });

    let data = await res.json();

    function cap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    data.forEach(ele => {
        if (ele != null) {
            let tr = document.createElement('tr');
            let date = document.createElement('td');
            date.innerHTML = ele.date.month + '/' + ele.date.day + '/' + ele.date.year + ' ';
            let location = document.createElement('td');
            location.innerHTML = cap(ele.location);

            tr.append(date);
            tr.append(location);

            tr.onclick = () => {
                window.location = window.location + 'report_' + ele._id;
            };

            tr.className = 'link';

            table.append(tr);
        }
    });
}

function makeHeader (table){
    let row = document.createElement('tr');
    table.append(row);
    
    let date = document.createElement('th');
    date.innerHTML = 'Date';

    let location = document.createElement('th');
    location.innerHTML = 'Location';

    row.append(date);
    row.append(location);
}