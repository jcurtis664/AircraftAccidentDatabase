async function displayAccident() {
    let accident = await (await fetch('http://' + window.location.host + '/accident_' + window.location.pathname.slice(8, window.location.pathname.length))).json();

    console.log(accident);

    let date = document.createElement('p');
    date.innerHTML = accident.date.month + '-' + accident.date.day + '-' + accident.date.year;
    document.body.append(date);

    let aircraft = document.createElement('p');
    aircraft.innerHTML = accident.aircraft;
    document.body.append(aircraft);

    let airline = document.createElement('p');
    airline.innerHTML = accident.airline;
    document.body.append(airline);

    let fatalities = document.createElement('p');
    fatalities.innerHTML = accident.fatalities;
    document.body.append(fatalities);

    let location = document.createElement('p');
    location.innerHTML = accident.location;
    document.body.append(location);

    let synopsis = document.createElement('p');
    synopsis.innerHTML = accident.synopsis;
    document.body.append(synopsis);
};

displayAccident();