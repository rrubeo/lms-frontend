import * as React from "react";
import FullCalendar from "@fullcalendar/react";
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import itLocale from "@fullcalendar/core/locales/it";

let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "All-day event",
//     start: todayStr,
//   },
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: todayStr + "T12:00:00",
//   },
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: "2022-05-18T12:00:00",
//     end: "2022-05-18T18:00:00",
//   },
// ];

export function createEventId() {
  return String(eventGuid++);
}

export default function DTC_Calendar(props) {
  // console.log(props);

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <FullCalendar
      locale={itLocale}
      themeSystem="standard"
      plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "title",
        center: "",
        right: "dayGridMonth listMonth today",
      }}
      footerToolbar={{
        left: "prev,next",
        center: "",
        right: "timeGridWeek,timeGridDay",
      }}
      views={{
        dayGridMonth: {
          // name of view
          titleFormat: { year: "numeric", month: "2-digit", day: "2-digit" },
          // other view-specific options here
        },
      }}
      dayHeaderFormat={{ weekday: "long" }}
      initialView="listWeek"
      editable
      selectable
      initialEvents={props.data.inevents}
      weekends={true}
      //   height="auto"
      aspectRatio="2.7"
      contentHeight="auto"
      eventColor="#B34A9D"
      eventTextColor="#FFFFFF"
      eventBorderColor="#FFFFFF"
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: true,
        meridiem: "narrow",
      }}
      select={handleDateSelect}
    />
  );
}
