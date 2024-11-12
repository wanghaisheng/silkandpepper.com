function showDatePicker(target) {
    var calendarDiv = document.createElement("div");
    calendarDiv.id = "calendar";
    calendarDiv.style.display = "block";
    calendarDiv.style.position = "absolute";
    var leftOffset = 0;
    var topOffset = 0;
    var elem = target;
    while (elem != null) {
       leftOffset += elem.offsetLeft;
       topOffset += elem.offsetTop;
       elem = elem.offsetParent;
    }
    calendarDiv.style.left = leftOffset + "px";
    calendarDiv.style.top = (topOffset + target.offsetHeight) + "px";
    calendarDiv.style.border = "1px solid";
    calendarDiv.style.background = "#fff";
    document.body.appendChild(calendarDiv);
    showMonth("calendar", target.id);
   }

   function showMonth(calendarDestId, dateInputId, month, year) {
    var target = document.getElementById(calendarDestId);
    var month = month != null ? month : new Date().getMonth();
    var year = year || new Date().getFullYear();
    var firstOfMonth = new Date();
    firstOfMonth.setFullYear(year);
    firstOfMonth.setMonth(month);
    firstOfMonth.setDate(1);
    var lastOfMonth = new Date();
    lastOfMonth.setDate(1);
    lastOfMonth.setFullYear(year);
    lastOfMonth.setMonth(month + 1);
    lastOfMonth.setDate(lastOfMonth.getDate() - 1);
    var previousYear = year;
    var nextYear = year;
    var previousMonth = month - 1;
    var nextMonth = month + 1;
    if (previousMonth < 0) {
       previousYear -= 1;
       previousMonth = 11;
    }
    if (nextMonth > 11) {
       nextYear += 1;
       nextMonth = 0;
    }
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var tbl = "<div class='calendarMonth'><a href='#inv' onclick='return showMonth(\"" + calendarDestId + "\", \"" + dateInputId + "\", " + previousMonth + ", " + previousYear + ");'>&lt;&lt;</a>" +
       " " + monthNames[month] + " " + year + " " +
       "<a href='#inv' onclick='return showMonth(\"" + calendarDestId + "\", \"" + dateInputId + "\", " + nextMonth + ", " + nextYear + ");'>&gt;&gt;</a></div>" +
       "<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>";
    var dow = firstOfMonth.getDay();
    for (var dow = 0; dow < firstOfMonth.getDay(); dow++) {
       tbl += "<td></td>";
    }
    for (var day = 1; day <= lastOfMonth.getDate(); day++) {
       if (dow == 7) {
         tbl += "</tr><tr>";
         dow = 0;
       }
       tbl += "<td><a href='#inv' onclick='return selectDate(\"" + dateInputId + "\", " + year + ", " + (month + 1) + ", " + day + ");'>" + day + "</a></td>";
       dow++;
    }
    tbl += "</tr></table>";
    target.innerHTML = tbl;
   }

   function selectDate(dateInputId, year, month, day) {
    var dateInput = document.getElementById(dateInputId);
    if (dateInput) {
       dateInput.value = year + "-" + ((month < 10) ? "0" : "") + month + "-" + ((day < 10) ? "0" : "") + day;
    }
    removeCalendar();
    return false;
   }

   function removeCalendar() {
    var calendarDiv = document.getElementById("calendar");
    if (calendarDiv) {
       calendarDiv.parentElement.removeChild(calendarDiv);
    }
   }

   function dismissCalendar(event) {
    var cal = document.getElementById("calendar");
    if (cal) {
       if (event.target == cal.targetId) {
         return;
       }
       var elem = event.target;
       while (elem) {
         if (elem.id == "calendar") {
           return;
         }
         elem = elem.parentElement;
       }
       cal.parentElement.removeChild(cal);
       document.removeEventListener("mousedown", dismissCalendar);
    }
   }
   
   document.addEventListener("mousedown", dismissCalendar);
   