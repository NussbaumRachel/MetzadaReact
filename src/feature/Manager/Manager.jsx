// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import HebrewDate from 'hebrew-date';
// import './Manager.css';

// const Manager = () => {

//     const [date, setDate] = useState(new Date());

//     const orders = [
//         { id: 1, custName: "יוסי כהן", deliveryDate: "2024-07-01" },
//         { id: 2, custName: "שרה לוי", deliveryDate: "2024-07-05" },
//         { id: 3, custName: "דוד ישראלי", deliveryDate: "2024-07-10" },
//     ];

//     const getOrdersByDate = (d) => {
//         return orders.filter(order =>
//             new Date(order.deliveryDate).toDateString() === d.toDateString()
//         );
//     };

//     const getHebrewDate = (d) => {
//         const h = new HebrewDate(d);
//         return `${h.day}`;
//     };

//     const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];

//     return (
//         <div className="calendar-layout">

//             {/* צד שמאל - ימי השבוע */}
//             <div className="week-days-column">
//                 {days.map((d, i) => (
//                     <div key={i} className="week-day">{d}</div>
//                 ))}
//             </div>

//             {/* לוח */}
//             <div className="calendar-wrapper custom">

//                 <Calendar
//                     onChange={setDate}
//                     value={date}
//                     calendarType="gregory"

//                     formatDay={(locale, date) => date.getDate()}

//                     tileContent={({ date, view }) => {
//                         if (view !== 'month') return null;

//                         const dailyOrders = getOrdersByDate(date);

//                         return (
//                             <div className="tile-inner">

//                                 <div className="dates">
//                                     <span className="greg">{date.getDate()}</span>
//                                     <span className="heb">{getHebrewDate(date)}</span>
//                                 </div>

//                                 {dailyOrders.length > 0 && (
//                                     <div className="orders">
//                                         {dailyOrders.map(o => (
//                                             <span key={o.id} className="order">
//                                                 #{o.id}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 )}

//                             </div>
//                         );
//                     }}

//                     tileClassName={({ date, view }) => {
//                         if (view !== 'month') return null;
//                         return getOrdersByDate(date).length ? 'delivery' : null;
//                     }}
//                 />

//             </div>
//         </div>
//     );
// };

// export default Manager;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import HebrewDate from 'hebrew-date';
import './Manager.css';
import { useSelector } from 'react-redux';

const Manager = () => {
    const [date, setDate] = useState(new Date());

    // const orders = [
    //     { id: 1, custName: "יוסי כהן", deliveryDate: "2024-07-01" },
    //     { id: 2, custName: "שרה לוי", deliveryDate: "2024-07-05" },
    //     { id: 3, custName: "דוד ישראלי", deliveryDate: "2024-07-10" },
    // ];
    const orders = useSelector(state => state.orders.orders) || [];

    const getOrdersByDate = (d) => {
        return orders.filter(order =>
            new Date(order.deliveryDate).toDateString() === d.toDateString()
        );
    };

    const getHebrewDate = (d) => {
        const h = new HebrewDate(d);
        return `${h.day}`;
    };

    // שים לב שהסדר כאן הוא מ-ראשון ועד שבת
    const days = ['שבת', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];

    return (
        <div className="calendar-layout">
            {/* צד שמאל - ימי השבוע */}
            <div className="week-days-column">
                {days.map((d, i) => (
                    <div key={i} className="week-day">{d}</div>
                ))}
            </div>

            {/* לוח */}
            <div className="calendar-wrapper custom">
                <Calendar
                    onChange={setDate}
                    value={date}
                    calendarType="gregory"
                    locale="he-IL"  // הצגת התאריך לפי לוקל עברי

                    formatDay={(locale, date) => date.getDate()}

                    tileContent={({ date, view }) => {
                        if (view !== 'month') return null;

                        const dailyOrders = getOrdersByDate(date);

                        return (
                            <div className="tile-inner">
                                <div className="dates">
                                    <span className="greg">{date.getDate()}</span>
                                    <span className="heb">{getHebrewDate(date)}</span>
                                </div>

                                {dailyOrders.length > 0 && (
                                    <div className="orders">
                                        {dailyOrders.map(o => (
                                            <span key={o.id} className="order">
                                                #{o.id}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }}

                    tileClassName={({ date, view }) => {
                        if (view !== 'month') return null;
                        return getOrdersByDate(date).length ? 'delivery-day' : null;
                    }}
                />
            </div>
        </div>
    );
};

export default Manager;