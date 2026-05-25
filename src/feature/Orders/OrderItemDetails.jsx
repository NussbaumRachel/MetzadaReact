import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { log } from "three/src/utils.js";

const OrderItemDetails = ({ item }) => {
    const doorFields = useSelector(s => s.doors.doorsFields);
    const frameFields = useSelector(s => s.frames.framesFields);
    const doors = useSelector(s => s.doors.doors);
    const frames = useSelector(s => s.frames.frames);

    const [itemDetails, setItemDetails] = useState(null);

    useEffect(() => {
        if (item.itemType === 1) {
            setItemDetails(doors.find(d => d.id === item.itemId));

        } else if (item.itemType === 2) {
            setItemDetails(frames.find(f => f.id === item.itemId));
        }
        else {
            setItemDetails(item);
        }
    }, [item, doors, frames]);
    const fields = item.itemType === 1 ? doorFields : frameFields;
    return (
        <div className="lux-item-card">
            <div className="lux-item-header">
                <span className="lux-badge">#{item.itemId || item.id}</span>
                <span className="lux-qty">x{item.quantity}</span>
            </div>

            <div className="lux-grid">
                {fields.map(f => (
                    <div key={f.field} className="lux-field">
                        <span className="lux-label">{f.field}</span>
                        <span className="lux-value">
                            {itemDetails ? itemDetails[f.field] : "--"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderItemDetails;