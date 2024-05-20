function load() {
    const HR_MS = 60 * 60 * 1000;

    var clockInRaw = extractHM(document.getElementById("clockin").value);
    var lunchRaw = extractHM(document.getElementById("lunch").value);
    
    var clockIn = new Date();
    var lunch = new Date();
    clockIn.setHours(clockInRaw.H, clockInRaw.M, 0, 0);
    lunch.setHours(lunchRaw.H, lunchRaw.M, 0, 0);

    if (lunch.getTime() < clockIn.getTime()) document.getElementById("lunch").value = document.getElementById("clockin").value;
    if (parseFloat(document.getElementById("hours").value) >= 40) document.getElementById("hours").value = 39;

    var lunchEnd = new Date();
    lunchEnd.setTime(lunch.getTime() + 0.5 * HR_MS);
    document.getElementById("lunchend").textContent = lunchEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    var hoursWorked_ms = parseFloat(document.getElementById("hours").value) * HR_MS + (lunch.getTime() - clockIn.getTime());
    var hoursLeft_ms = (40 * HR_MS) - hoursWorked_ms;
    if (hoursLeft_ms < 1) {
        document.getElementById("hours").value = parseFloat(document.getElementById("hours").value) + (hoursLeft_ms / HR_MS) - 1;
        load();
        return;
    }
    document.getElementById("hoursleft").textContent = parseFloat(hoursLeft_ms / HR_MS).toFixed(2);

    var clockOut = new Date(lunchEnd.getTime());
    var hoursLeft = parseInt(((document.getElementById("hoursleft").textContent).split("."))[0]);
    var minutesLeft = parseFloat("." + ((document.getElementById("hoursleft").textContent).split("."))[1]) * 60;

    clockOut.setHours(clockOut.getHours() + hoursLeft);
    clockOut.setMinutes(clockOut.getMinutes() + minutesLeft);
    document.getElementById("clockout").textContent = clockOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function extractHM(timeString) {
    var splitTime = timeString.split(":");
    return {
        H: parseInt(splitTime[0]),
        M: parseInt(splitTime[1])
    };
}