let list = document.getElementById('list');

(async () => {
    let table = document.createElement('table');
    table.id = 'table'
    list.append(table);
    makeHeader(table);

    let url = window.location.href + 'top20';

    let res = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
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
    })
})();

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