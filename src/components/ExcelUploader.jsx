import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryData = new Uint8Array(event.target.result);
      const workbook = XLSX.read(binaryData, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      setJsonData(data);
      console.log("Converted JSON:", data);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {jsonData && (
        <div>
          <h3>Converted JSON Data:</h3>
          {/* jsonData ,Each property is on a new line
,indented by 2 spaces */}
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
