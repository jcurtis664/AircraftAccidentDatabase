function submitAccident() {
    let ans = {};
    ans.date_input = new Date(document.getElementById('date').value);

    ans.accident_date = {
        year: ans.date_input.getFullYear(),
        month: ans.date_input.getMonth() + 1,
        day: ans.date_input.getDay()
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

    ans.references = [];

    let pns = document.getElementsByClassName('pageNum');
    let refs = document.getElementsByClassName('reference');

    console.log(pns)

    for(let index = 0; index < pns.length; index++){
        let pair = [];
        console.log(pns[index].value)
        pair[0] = pns[index].value;
        pair[1] = refs[index].value;

        ans.references.push(pair);
    }

    let url = window.location.href + 'makeAccident';
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ans)
    });
}