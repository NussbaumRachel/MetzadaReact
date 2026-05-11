
import axios from "axios";

export default function ExportOrdersExcel() {

  const openExcel = async () => {
    try {

      const res = await axios.get(
        "https://localhost:7253/api/Order/export-excel",
        {
          responseType: "blob"
        }
      );

      const blob = new Blob(
        [res.data],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      );

      const fileURL = URL.createObjectURL(blob);

      // פתיחת הקובץ בלשונית חדשה
      window.open(fileURL, "_blank");

    } catch (err) {
      console.error("Excel open error:", err);
    }
  };

  return (
    <button onClick={openExcel}>
      ייצוא הזמנות לאקסל
    </button>
  );
}