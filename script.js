function load() {
    const forty_hours_in_min = 2400;
    let hours_worked_in_min = parseInt(document.getElementById("hours").value * 60);
    let clockin = document.getElementById("clockin").value.split(":");
    let lunch = document.getElementById("lunch").value.split(":");
    let lunch_end = lunchEnd(document.getElementById("lunch").value.split(":"));

    let hours_left_in_min =
        forty_hours_in_min - hours_worked_in_min - minWorkedBeforeLunch(clockin, lunch);


    const time = new Date();
    time.setHours(lunch_end[0]);
    time.setMinutes(lunch_end[1] + ?);
    console.log(time);


}

function parseTime(t, add = 0) {
    let h = parseInt(t[0]);
    let m = parseInt(t[1]) + add;
    while (m >= 60) {
        h++;
        m -= 60;
    }
    return [h, m];
}

function minWorkedBeforeLunch(clockin, lunch) {
    let time_until_lunch = parseInt(lunch[0]) * 60 + parseInt(lunch[1]);
    let time_until_clockin = parseInt(clockin[0]) * 60 + parseInt(clockin[1]);
    return (time_until_lunch - time_until_clockin);
}



function lunchEnd(lunch) {
    return parseTime([lunch[0], parseInt(lunch[1]) + 30]);

    //return [h,m];

    /*
    let output_h = "";
    let output_m = "";
    let output_ampm = "";

    if (lunchend_h > 12) {
        output_h = (lunchend_h - 12).toString();
        output_ampm = "PM";
    } else if (lunchend_h == 0 || lunchend_h == 12) {
        output_h = "12";
        output_ampm = "PM";
    } else {
        output_h = lunchend_h.toString();
        output_ampm = "AM";
    }

    if (lunchend_m < 10) {
        output_m = "0" + (lunchend_m.toString());
    } else {
        output_m = lunchend_m.toString();
    }

    return (output_h + ":" + output_m + " " + output_ampm);
    */
}