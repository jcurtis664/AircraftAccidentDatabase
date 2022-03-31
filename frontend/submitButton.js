async function submitAccident() {
    let ans = {};
    let date_input = new Date(document.getElementById('date').value);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    ans.accident_date = {
        year: date_input.getFullYear(),
        month: date_input.getMonth() + 1,
        day: date_input.getDay()
    }

    ans.accident_location = document.getElementById('location').value;
    ans.accident_aircraft = document.getElementById('aircraft').value;
    ans.accident_airline = document.getElementById('airline').value;
    ans.accident_fatalities = document.getElementById('fatalities').value;
    ans.accident_synopsis = document.getElementById('synopsis').value;
    ans.accident_avsn_link = document.getElementById('avsn_link').value;

    ans.accident_icao_categories = document.getElementById('icao').value.split(",").map(function (item) {
        return item.trim();
    });

    ans.accident_tags = document.getElementById('tags').value.split(",").map(function (item) {
        return item.trim();
    });

    ans.accident_tags.push(months[parseInt(ans.accident_date.month) - 1]);
    ans.accident_tags.push(ans.accident_date.year);
    ans.accident_tags.push(ans.accident_location);
    ans.accident_tags.push(ans.accident_aircraft);
    ans.accident_tags.push(ans.accident_airline);
    ans.accident_tags = ans.accident_tags.concat(ans.accident_icao_categories);

    ans.references = [];

    let pns = document.getElementsByClassName('pageNum');
    let refs = document.getElementsByClassName('reference');

    for (let index = 0; index < pns.length; index++) {
        ans.references.push({ page_number: pns[index].value, reference: refs[index].value });
    }

    let url = window.location.href + 'makeAccident';
    let file = new Int8Array(await document.getElementById('report').files[0].arrayBuffer());

    console.log(file);

    let res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ans, file })
    });
}