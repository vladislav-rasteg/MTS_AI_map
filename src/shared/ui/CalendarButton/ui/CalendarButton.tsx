import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { createEvent, EventAttributes } from 'ics';
import { Button } from '../../Button';
import { CalendarIcon } from '../../Icons/CalendarIcon';
import s from "./CalendarButton.module.scss"

type CalendarButtonProps = {
  name: string;
  description: string;
  startDate: string; // Формат: "YYYY-MM-DD"
  endDate: string;   // Формат: "YYYY-MM-DD"
  startTime: string; // Формат: "HH:MM"
  endTime: string;   // Формат: "HH:MM"
  location: string;
  event_url: string;
  className: string
};

export const CalendarButton: React.FC<CalendarButtonProps> = ({
  name,
  description,
  startDate,
  endDate,
  startTime,
  endTime,
  location,
  event_url,
  className
}) => {

    const [showModal, setShowModal] = useState(false)
    const handleGoogleCalendar = () => {
        const formatDateTime = (date: string, time: string) => {
        return `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
        };

        const startDateTime = formatDateTime(startDate, startTime);
        const endDateTime = formatDateTime(endDate, endTime);

        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        name
        )}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(
        description
        )}&location=${encodeURIComponent(location)}`;

        window.open(url, '_blank');
    };

    const handleAppleCalendar = () => {
        // Apple Calendar поддерживает импорт файлов ICS
        handleICSDownload();
    };

    const handleICSDownload = () => {
        // Парсим даты и время
        const parseDateTime = (date: string, time: string): [number, number, number, number, number] => {
        const [year, month, day] = date.split('-').map(Number);
        const [hour, minute] = time.split(':').map(Number);
        return [year, month, day, hour, minute];
        };

        const start = parseDateTime(startDate, startTime);
        const end = parseDateTime(endDate, endTime);

        const event: EventAttributes = {
        start: start as [number, number, number, number, number],
        end: end as [number, number, number, number, number],
        title: name,
        description: description,
        location: location,
        url: event_url
        };

        createEvent(event, (error, value) => {
        if (error) {
            console.error('Ошибка при создании ICS файла:', error);
            return;
        }
        const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
        saveAs(blob, 'event.ics');
        });
    };

  return (
    <div className={s.button_wrapper}>
        <Button color='tetrinary' onClick={() => setShowModal(!showModal)} className={className}>
            <CalendarIcon size={2.4} className={s.icon_secondary} />
            Добавить в календарь
        </Button>
        {showModal &&
            <div className={s.modal_wrapper}>
                <div className={s.menu_bg} onClick={() => setShowModal(false)}></div>
                <div className={s.modal}>
                    <Button color="tetrinary" size='default' onClick={handleGoogleCalendar}>Google Calendar</Button>
                    <Button color="tetrinary" size='default' onClick={handleAppleCalendar}>Apple Calendar</Button>
                    <Button color="tetrinary" size='default' onClick={handleICSDownload}>Скачать файл ICS</Button>
                </div>
            </div>
        }
    </div>
  );
};
