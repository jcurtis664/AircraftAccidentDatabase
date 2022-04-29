if (window.sessionStorage.displayMessage === 'true') {

    var toast = document.getElementById("mtoast");
    toast.innerHTML = "SUCCESS";
    toast.classList.add("show");
    toast.style.background = '#18e85d';
    toast.style.display = 'inline';

    window.sessionStorage.displayMessage = false;
    setTimeout(function makeMessageDisappear() {
        toast.style.display = 'none';
    }, 5000);
}

async function submitAccident() {
    try {
        let ans = {};

        //SUBMITTING THE WRONG DAY

        let date_input = new Date(document.getElementById('date').value);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        ans.accident_date = {
            year: date_input.getFullYear(),
            month: date_input.getMonth() + 1,
            day: date_input.getDate()
        }

        ans.accident_location = document.getElementById('location').value;
        ans.accident_aircraft = document.getElementById('aircraft').value;
        ans.accident_airline = document.getElementById('airline').value;
        ans.accident_fatalities = document.getElementById('fatalities').value;
        ans.accident_synopsis = document.getElementById('synopsis').value;
        ans.accident_avsn_link = document.getElementById('avsn_link').value;

        ans.accident_icao_categories = document.getElementById('icao').value.split(",").map(function (item) {
            return item.trim().toLowerCase();
        });

        ans.accident_tags = document.getElementById('tags').value.split(",").map(function (item) {
            return item.trim().toLowerCase();
        });
        ans.accident_tags.push(months[parseInt(ans.accident_date.month) - 1].toLowerCase());
        ans.accident_tags.push(ans.accident_date.year);
        ans.accident_tags.push(ans.accident_location.toLowerCase());
        ans.accident_tags.push(ans.accident_aircraft.toLowerCase());
        ans.accident_tags.push(ans.accident_airline.toLowerCase());

        ans.references = [];

        let pns = document.getElementsByClassName('pageNum');
        let refs = document.getElementsByClassName('reference');

        for (let index = 0; index < pns.length; index++) {
            ans.references.push({ page_number: pns[index].value, reference: refs[index].value });
        }

        let url = window.location.href + 'makeAccident';
        let file = new Int8Array(await document.getElementById('report').files[0].arrayBuffer());

        //console.log(file);

        let res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ans, file })
        });

        let data = await res.json();

        if (data.msg == 'success') {
            window.sessionStorage.displayMessage = true;
            window.location.reload();
        }
        else {
            var toast = document.getElementById("mtoast");
            toast.innerHTML = "FAILED TO UPLOAD";
            toast.classList.add("show");
            toast.style.background = '#ef522e';
            toast.style.display = 'inline';

            setTimeout(function makeMessageDisappear() {
                toast.style.display = 'none';
            }, 5000);
        }
    }
    catch (err) {
        console.log(err);
        var toast = document.getElementById("mtoast");
        toast.innerHTML = "FAILED TO UPLOAD";
        toast.classList.add("show");
        toast.style.background = '#ef522e';
        toast.style.display = 'inline';

        setTimeout(function makeMessageDisappear() {
            toast.style.display = 'none';
        }, 5000);
    }
}