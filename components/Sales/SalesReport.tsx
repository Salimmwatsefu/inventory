// pages/report.tsx

import { useState } from "react";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
import { enGB } from "date-fns/locale";

const ReportPage = () => {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(2022, 1, 1),
    new Date(),
  ]);

  const handleGenerateReport = () => {
    const startDate = value[0]?.toLocaleDateString();
    const endDate = value[1]?.toLocaleDateString();

    if (startDate && endDate) {
      console.log("Selected Start Date:", startDate);
      console.log("Selected End Date:", endDate);
      const url = `http://127.0.0.1:3001/sales/report/?start_date=${startDate}&end_date=${endDate}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Process the data or update your state with the fetched data
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching report:", error);
        });
    }
  };

  return (
    <div>
      <h1>Generate Report</h1>
      <DateRangePicker
        className="max-w-md mx-auto"
        value={value}
        onValueChange={setValue}
        locale={enGB}
        dropdownPlaceholder="Select"
      />
      <button onClick={handleGenerateReport}>Generate</button>
    </div>
  );
};

export default ReportPage;