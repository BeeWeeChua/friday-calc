function load() {
    const HR_MS = 60 * 60 * 1000;

    var clockInRaw = extractHM(document.getElementById("clockin").value);
    var lunchRaw = extractHM(document.getElementById("lunch").value);
    
    var clockIn = new Date();
    var lunch = new Date();
    clockIn.setHours(clockInRaw.H, clockInRaw.M, 0, 0);
    lunch.setHours(lunchRaw.H, lunchRaw.M, 0, 0);

    // if (lunch.getTime() < clockIn.getTime()) {
    //     document.getElementById("lunch-container").style.backgroundColor = "yellow";
    //     document.getElementById("lunch").value = document.getElementById("clockin").value;
    //     document.getElementById("lunch").focus();
    //     setTimeout(function() { document.getElementById("lunch-container").style.backgroundColor = ""; }, 500 ); 
    // }
    // if (parseFloat(document.getElementById("hours").value) >= 40) {
    //     document.getElementById("hours-container").style.backgroundColor = "yellow";
    //     document.getElementById("hours").value = 39;
    //     document.getElementById("hours").focus();
    //     setTimeout(function() { document.getElementById("hours-container").style.backgroundColor = ""; }, 500 ); 
    // }

    var lunchEnd = new Date();
    lunchEnd.setTime(lunch.getTime() + 0.5 * HR_MS);
    document.getElementById("lunchend").textContent = lunchEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    var hoursWorked_ms = parseFloat(document.getElementById("hours").value) * HR_MS + (lunch.getTime() - clockIn.getTime());
    var hoursLeft_ms = (40 * HR_MS) - hoursWorked_ms;
    // if (hoursLeft_ms < HR_MS) {
    //     document.getElementById("hours-container").style.backgroundColor = "yellow";
    //     document.getElementById("hours").value = parseFloat(document.getElementById("hours").value) + (hoursLeft_ms / HR_MS) - 1;
    //     document.getElementById("hours").focus();
    //     setTimeout(function() { document.getElementById("hours-container").style.backgroundColor = ""; }, 500 ); 
    //     load();
    //     return;
    // }
    document.getElementById("hoursleft").textContent = parseFloat(hoursLeft_ms / HR_MS).toFixed(2);

    var clockOut = new Date(lunchEnd.getTime());
    var hoursLeft = parseInt(((document.getElementById("hoursleft").textContent).split("."))[0]);
    var minutesLeft = parseFloat("." + ((document.getElementById("hoursleft").textContent).split("."))[1]) * 60;

    clockOut.setHours(clockOut.getHours() + hoursLeft);
    clockOut.setMinutes(clockOut.getMinutes() + minutesLeft);
    document.getElementById("clockout").textContent = clockOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    for (let i = 0; i < document.getElementsByClassName("output").length; ++i) {
        if (isNaN(document.getElementsByClassName("output")[i].textContent.charAt(0))) {
                for (let j = 0; j < document.getElementsByClassName("output").length; ++j) {
                    document.getElementsByClassName("output")[j].textContent = "??";
                }
                return;
        }
    }
}

function extractHM(timeString) {
    var splitTime = timeString.split(":");
    return {
        H: parseInt(splitTime[0]),
        M: parseInt(splitTime[1])
    };
}