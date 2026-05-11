import axios from "axios";
import { useState } from "react";

export default function GenerateDoor() {

    const [image, setImage] = useState(null);

    const generateImage = async () => {

        try {

            const res = await axios.post(
                "https://n8n.srv1251456.hstgr.cloud/webhook-test/generate-door",
                {
                    color: "white",
                    width: 90,
                    height: 210,
                    model: "classic"
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
    };

    return (
        <div>

            <button onClick={generateImage}>
                צור הדמיה
            </button>

            {
                image && (
                    <img src={image} alt="door"width={400} />
                )
            }

        </div>
    );
}