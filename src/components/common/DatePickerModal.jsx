import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, isAfter, differenceInDays } from 'date-fns';

export default function DatePickerModal({ checkIn, checkOut, onChange, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(checkIn || new Date(2026, 8, 1)); // Default to Sept 2026 as per screenshot
  const [hoverDate, setHoverDate] = useState(null);

  const nextMonth = addMonths(currentMonth, 1);

  const handleDateClick = (day) => {
    if (!checkIn) {
      onChange(day, null);
    } else if (checkIn && !checkOut) {
      if (isBefore(day, checkIn)) {
        onChange(day, null);
      } else {
        onChange(checkIn, day);
      }
    } else {
      onChange(day, null);
    }
  };

  const handleMouseEnter = (day) => {
    if (checkIn && !checkOut) {
      setHoverDate(day);
    }
  };

  const isInRange = (day) => {
    if (checkIn && checkOut) {
      return isAfter(day, checkIn) && isBefore(day, checkOut);
    }
    if (checkIn && hoverDate) {
      return isAfter(day, checkIn) && isBefore(day, hoverDate);
    }
    return false;
  };

  const isSelected = (day) => {
    return (checkIn && isSameDay(day, checkIn)) || (checkOut && isSameDay(day, checkOut));
  };

  const renderMonth = (month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const disabled = isBefore(day, new Date(2026, 8, 1)); // Prevent past dates

        const selected = isSelected(day);
        const inRange = isInRange(day);
        const isStart = checkIn && isSameDay(day, checkIn);
        const isEnd = checkOut && isSameDay(day, checkOut);

        days.push(
          <div
            key={day}
            className={`w-10 h-10 flex items-center justify-center relative cursor-pointer
              ${!isCurrentMonth ? 'invisible' : ''}
              ${disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900 font-semibold'}
            `}
            onClick={() => !disabled && handleDateClick(cloneDay)}
            onMouseEnter={() => !disabled && handleMouseEnter(cloneDay)}
            onMouseLeave={() => setHoverDate(null)}
          >
            {/* Range highlight background */}
            {inRange && <div className="absolute inset-0 bg-gray-100" />}
            
            {/* Start/End half backgrounds for continuous range look */}
            {isStart && (checkOut || hoverDate) && <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-100" />}
            {isEnd && checkIn && <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-100" />}

            {/* Hover circle or Selected circle */}
            <div className={`
              absolute inset-0 rounded-full flex items-center justify-center border-2 border-transparent
              ${selected ? 'bg-gray-900 text-white' : (inRange ? '' : 'hover:border-gray-900')}
            `}>
              <span className="z-10">{formattedDate}</span>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex justify-between w-full mb-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="flex-1 w-[320px]">
        <div className="text-center font-bold text-[16px] mb-4">
          {format(month, 'MMMM yyyy')}
        </div>
        <div className="flex justify-between w-full mb-2">
          {weekDays.map((d, i) => (
            <div key={i} className="w-10 text-center text-[12px] font-semibold text-gray-500">
              {d}
            </div>
          ))}
        </div>
        <div className="w-full">
          {rows}
        </div>
      </div>
    );
  };

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  return (
    <div className="absolute right-0 top-0 bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.15)] p-6 w-[800px] z-50 border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[26px] font-bold text-gray-900">
            {nights > 0 ? `${nights} nights` : 'Select dates'}
          </h2>
          <p className="text-[14px] text-gray-500 mt-1">
            {checkIn && checkOut ? `${format(checkIn, 'd MMM yyyy')} - ${format(checkOut, 'd MMM yyyy')}` : 'Minimum stay: 1 night'}
          </p>
        </div>
        
        <div className="flex border-2 border-gray-900 rounded-xl overflow-hidden w-[320px]">
          <div className="flex-1 p-3 cursor-pointer bg-white relative">
            <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Check-in</p>
            <p className="text-[14px] text-gray-900 mt-0.5 outline-none">
              {checkIn ? format(checkIn, 'M/d/yyyy') : 'Add date'}
            </p>
            {checkIn && (
              <button 
                onClick={(e) => { e.stopPropagation(); onChange(null, checkOut); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
          <div className="w-px bg-gray-400" />
          <div className="flex-1 p-3 cursor-pointer bg-white relative">
            <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Checkout</p>
            <p className="text-[14px] text-gray-900 mt-0.5 outline-none">
              {checkOut ? format(checkOut, 'M/d/yyyy') : 'Add date'}
            </p>
            {checkOut && (
              <button 
                onClick={(e) => { e.stopPropagation(); onChange(checkIn, null); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-2">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="absolute left-2 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="absolute right-2 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
        
        <div className="flex gap-8 px-10">
          {renderMonth(currentMonth)}
          {renderMonth(nextMonth)}
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-2">
        <button 
          onClick={() => onChange(null, null)}
          className="text-[14px] font-semibold text-gray-900 underline hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
        >
          Clear dates
        </button>
        <button 
          onClick={onClose}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg text-[14px] font-semibold hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
