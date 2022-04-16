async function displayAccident() {
    let accident = await (await fetch('http://' + window.location.host + '/accident_' + window.location.pathname.slice(8, window.location.pathname.length))).json();

    console.log(accident);

    let table = document.createElement('table');

    let dateRow = document.createElement('tr');
    let dateLabel = document.createElement('td');
    let date = document.createElement('td');

    dateLabel.innerHTML = 'Date: ';
    date.innerHTML = accident.date.month + '-' + accident.date.day + '-' + accident.date.year;
    
    dateRow.append(dateLabel, date);
    table.append(dateRow);

    let aircraftRow = document.createElement('tr');
    let aircraftLabel = document.createElement('td');
    let aircraft = document.createElement('td');

    aircraftLabel.innerHTML = 'Aircraft: ';
    aircraft.innerHTML = accident.aircraft;

    aircraftRow.append(aircraftLabel, aircraft);
    table.append(aircraftRow);

    let airlineRow = document.createElement('tr');
    let airlineLabel = document.createElement('td');
    let airline = document.createElement('td');

    airlineLabel.innerHTML = 'Airline: ';
    airline.innerHTML = accident.airline;

    airlineRow.append(airlineLabel, airline);
    table.append(airlineRow);

    let fatalitiesRow = document.createElement('tr');
    let fatalitiesLabel = document.createElement('td');
    let fatalities = document.createElement('td');

    fatalitiesLabel.innerHTML = 'Fatalities: ';
    fatalities.innerHTML = accident.fatalities;

    fatalitiesRow.append(fatalitiesLabel, fatalities);
    table.append(fatalitiesRow);

    let locationRow = document.createElement('tr');
    let locationLabel = document.createElement('td');
    let location = document.createElement('td');

    locationLabel.innerHTML = 'Location: ';
    location.innerHTML = accident.location;

    locationRow.append(locationLabel, location);
    table.append(locationRow);

    let synopsisRow = document.createElement('tr');
    let synopsisLabel = document.createElement('td');
    let synopsis = document.createElement('td');

    synopsisLabel.innerHTML = 'Synopsis: ';
    synopsis.innerHTML = accident.synopsis;

    synopsisRow.append(synopsisLabel, synopsis);
    table.append(synopsisRow);

    let avsnLinkRow = document.createElement('tr');
    let avsnLinkLabel = document.createElement('td');
    let avsnLink = document.createElement('td');

    avsnLinkLabel.innerHTML = 'AVSN Link: ';
    avsnLink.innerHTML = accident.AVSN_link;
    
    avsnLinkRow.append(avsnLinkLabel, avsnLink);
    table.append(avsnLinkRow);

    document.body.append(table);
};

displayAccident();