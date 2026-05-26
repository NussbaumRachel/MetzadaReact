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
            setImage(null);

            // קריאה ל-OpenAI DALL·E
            const prompt = `A door with width ${door.width || 205}cm, height ${door.height || 205}cm, color ${door.color || "brown"}`;
            const res = await axios.post(
                "https://api.openai.com/v1/images/generations",
                {
                    prompt,
                    n: 1,
                    size: "512x512"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // ודא שהמפתח קיים ב-env
                    }
                }
            );
            const imageUrl = res.data.data[0].url;
            setImage(imageUrl);
        } catch (err) {
            console.error(err);
            alert("אירעה שגיאה ביצירת ההדמיה");
        } finally {
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