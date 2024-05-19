function load() {
    const HR_MS = 60 * 60 * 1000;

    var clockInRaw = extractHM(document.getElementById("clockin").value);
    var lunchRaw = extractHM(document.getElementById("lunch").value);
    
    var clockIn = new Date();
    var lunch = new Date();
    clockIn.setHours(clockInRaw.H, clockInRaw.M, 0, 0);
    lunch.setHours(lunchRaw.H, lunchRaw.M, 0, 0);

    var lunchEnd = lunch;
    lunchEnd.setMinutes(lunchEnd.getMinutes() + 30);
    document.getElementById("lunchend").textContent = lunchEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    var hoursWorked_ms = parseFloat(document.getElementById("hours").value) * HR_MS + (lunch - clockIn);
    var hoursLeft_ms = (40 * HR_MS) - hoursWorked_ms;
    document.getElementById("hoursleft").textContent = parseFloat(hoursLeft_ms / HR_MS).toFixed(2);

    var clockOut = lunchEnd;
    var hoursLeft = parseInt(((document.getElementById("hoursleft").textContent).split("."))[0]);
    var minutesLeft = parseFloat("." + ((document.getElementById("hoursleft").textContent).split("."))[1]) * 60;

    console.log(hoursLeft);
    console.log(minutesLeft);

    clockOut.setHours(clockOut.getHours() + hoursLeft);
    console.log(clockOut);

    clockOut.setMinutes(clockOut.getMinutes() + minutesLeft);
    console.log(clockOut);

    document.getElementById("clockout").textContent = clockOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //clockOut.setMinutes(clockOut.getMinutes() + minutesLeft);
    //console.log(clockOut);

}

function extractHM(timeString) {
    var splitTime = timeString.split(":");
    return {
        H: parseInt(splitTime[0]),
        M: parseInt(splitTime[1])
    };
}