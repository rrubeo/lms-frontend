import * as React from "react";
import { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import itLocale from "@fullcalendar/core/locales/it";

import SEC_Dialog from "../form/fsme/SEC_Dialog";
import jnStyles from "../../styles/utils.module.css";
const utils = require("../../lib");

let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export function createEventId() {
  return String(eventGuid++);
}

export default function DTC_Calendar(props) {
  // console.log(props.data.inevents);
  const dialogState = {
    dialogOpen: false,
    ruolo: props.data.ruolo,
  };
  const [stateDialog, setOpen] = React.useState(dialogState);
  const [evento, setEvento] = React.useState({});
  const myInput = useRef();

  useEffect(() => {
    // console.log("useEffect");
    if (myInput.current) {
      //   console.log(myInput);
      myInput.current.setText(stateDialog.commento);
    }
  });

  const renderEventContent = (eventInfo) => {
    // console.log(eventInfo);
    const {
      tipoAppuntamento,
      nominativo,
      statoAppuntamento,
      orario,
      linkStanza,
      commento,
      cancellabile,
      idStatoAppuntamento,
      oggetto,
    } = eventInfo?.event?.extendedProps;

    const curStyle =
      eventInfo.event.extendedProps.statoAppuntamento == "Confermato"
        ? jnStyles.jnCalConfermato
        : jnStyles.jnCalEvent;

    let curText;

    switch (eventInfo.view.type) {
      case "listMonth":
      case "timeGridDay":
        if (props.data.ruolo != 6) {
          curText = `${tipoAppuntamento} con ${nominativo} - ${oggetto} - (${statoAppuntamento}) ${commento}`;
        } else {
          curText = `${tipoAppuntamento} con ${nominativo} - ${oggetto} - (${statoAppuntamento})`;
        }
        break;
      default:
        // console.log(eventInfo.view.type);
        curText = `${tipoAppuntamento}`;
        break;
    }

    return (
      <>
        <div className={curStyle}>
          <b>{eventInfo.timeText}</b> <i>{curText}</i>
        </div>
      </>
    );
  };

  const handleClose = () => {
    setOpen(dialogState);
  };

  const handleSubmit = (event, formData) => {
    // console.log(formData);
    setOpen(dialogState);
    props.onSubmit(event, formData);
  };

  const eventClick = (info) => {
    setEvento(info);
    // alert("Event: " + info.event.title);
    const {
      tipoAppuntamento,
      nominativo,
      nominativoRichiedente,
      statoAppuntamento,
      orario,
      linkStanza,
      commento,
      cancellabile,
      idStatoAppuntamento,
      username,
      utenteRichiedente,
    } = info?.event?.extendedProps;

    const richiestodame = username == utenteRichiedente ? true : false;

    const dialogNewState = {
      dialogTitle: `${tipoAppuntamento} - ${nominativo} `,
      dialogText: `Orario ${orario} - ${statoAppuntamento}`,
      dialogOpen: true,
      ruolo: props.data.ruolo,
      btConferma:
        idStatoAppuntamento == 2 ? false : richiestodame ? false : true,
      btPartecipa: true,
      btCommenta: props.data.ruolo == 6 ? false : true,
      linkPartecipa: linkStanza,
      btElimina: cancellabile == 0 ? false : true,
      dialogInfo: info,
      commento: commento,
    };

    // objDialog.setText("Ciccio");
    setOpen(dialogNewState);
  };

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
    <>
      <FullCalendar
        locale={itLocale}
        themeSystem="standard"
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "listMonth today",
        }}
        footerToolbar={{
          left: "prev,next",
          center: "",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        views={{
          dayGridMonth: {
            // name of view
            titleFormat: { year: "numeric", month: "2-digit", day: "2-digit" },
            // other view-specific options here
          },
        }}
        dayHeaderFormat={{ weekday: "long" }}
        initialView="listMonth"
        editable={false}
        selectable
        initialEvents={props.data.inevents}
        weekends={true}
        // height="auto"
        aspectRatio="3.7"
        contentHeight="auto"
        eventColor="#FFFFFF"
        eventTextColor="#FFFFFF"
        eventBorderColor="#FFFFFF"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: true,
          meridiem: "narrow",
        }}
        // select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={eventClick}
      />
      {stateDialog.dialogOpen ? (
        <SEC_Dialog
          ref={myInput}
          id={props.id}
          title={stateDialog.dialogTitle}
          text={stateDialog.dialogText}
          open={stateDialog.dialogOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          btConferma={stateDialog.btConferma}
          btCommenta={stateDialog.btCommenta}
          btPartecipa={stateDialog.btPartecipa}
          linkPartecipa={stateDialog.linkPartecipa}
          btElimina={stateDialog.btElimina}
          commentaLabel="COMMENTO"
          confermaLabel="CONFERMA"
          eliminaLabel="ELIMINA"
          partecipaLabel="PARTECIPA"
          info={stateDialog.dialogInfo}
          commento={stateDialog.commento}
        />
      ) : (
        <></>
      )}
    </>
  );
}
