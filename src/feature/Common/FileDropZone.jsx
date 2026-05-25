import React, { useState } from "react";

/**
 * FileDropZone
 * קומפוננטה כללית לגרירת קבצים או בחירה רגילה
 *
 * Props:
 * - onFileSelect(File) => callback כשנבחר קובץ
 * - accept (string) => סוגי קבצים מותרים (כמו input accept)
 * - label (string) => טקסט שמוצג למשתמש
 * - showPreview (boolean) => האם להציג שם קובץ שנבחר
 */

const FileDropZone = ({
    onFileSelect,
    accept = "*",
    label = "גרור קובץ לכאן או לחץ לבחירה",
    showPreview = true,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState("");

    /**
     * טיפול בבחירת קובץ רגילה
     */
    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        onFileSelect(file);
    };

    /**
     * טיפול בגרירה ושחרור קובץ
     */
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (!file) return;

        setFileName(file.name);
        onFileSelect(file);
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{
                border: "2px dashed #999",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                background: isDragging ? "#f0f0f0" : "transparent",
                borderRadius: "8px",
            }}
        >
            {/* טקסט הנחיה */}
            <p style={{ marginBottom: "10px" }}>{label}</p>

            {/* input רגיל */}
            <input type="file" accept={accept} onChange={handleInputChange} />

            {/* תצוגת שם קובץ */}
            {showPreview && fileName && (
                <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    קובץ נבחר: {fileName}
                </p>
            )}
        </div>
    );
};

export default FileDropZone;