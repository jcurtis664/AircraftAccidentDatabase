async function searchAccidents() {
    let list = document.getElementById('list');
    list.innerHTML = "";
    let table = document.createElement('table');
    table.id = 'table'
    list.append(table);

    let search = document.getElementById('search').value.split(" ").map(function (item) {
        return item.trim().toLowerCase();
    });

    //if (search.length == 1 && search[0] == '') return;

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

            let aircraft = document.createElement('td');
            aircraft.innerHTML = cap(ele.aircraft);

            let airline = document.createElement('td');
            airline.innerHTML = cap(ele.airline);

            let fatalities = document.createElement('td');
            fatalities.innerHTML = ele.fatalities;

            tr.append(date);
            tr.append(location);
            tr.append(aircraft);
            tr.append(airline);
            tr.append(fatalities);

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
    //tr : table row
    //th : table header
    let row = document.createElement('tr');
    table.append(row);
    
    let date = document.createElement('th');
    date.innerHTML = 'Date';

    let location = document.createElement('th');
    location.innerHTML = 'Location';

    let aircraft = document.createElement('th');
    aircraft.innerHTML = 'Aircraft';

    let airline = document.createElement('th');
    airline.innerHTML = 'Airline';

    let fatalities = document.createElement('th');
    fatalities.innerHTML = 'Fatalities';

    row.append(date);
    row.append(location);
    row.append(aircraft);
    row.append(airline);
    row.append(fatalities);
}