import axios from "axios";
import { useState } from "react";

export default function GenerateDoor({ door, onClose }) {

    
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    if (!door) {
        return <div>אין דלת נבחרת</div>;
    }
    const generateImage = async () => {

        try {
            setLoading(true);
            const res = await axios.post(
                "https://n8n.srv1251456.hstgr.cloud/webhook-test/generate-door",
                {
                    
                    width: door.width || 205,
                    height: door.height || 205,
                    color: door.color
                },
                {
                    responseType: "blob"
                }
            );
            const imageUrl = URL.createObjectURL(res.data);
        setImage(imageUrl);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal">

            <button onClick={onClose}>
                סגור
            </button>

            <h3>דלת נבחרת: {door.color}</h3>

            <button onClick={generateImage}>
                צור הדמיה
            </button>

            {loading && <p>טוען...</p>}

            {image && (
                <img
                    src={image}
                    alt="door"
                    style={{ width: "300px" }}
                />
            )}

        </div>
    );
}