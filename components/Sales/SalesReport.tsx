import { useState } from "react";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
import { enGB } from "date-fns/locale";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Sales } from "./ManageSales";

const ReportPage = () => {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(2022, 1, 1),
    new Date(),
  ]);

  const [reportData, setReportData] = useState<Sales[]>([]);
  const [reportError, setReportError] = useState<string | null>(null);

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
          console.log("Fetched data:", data); // Log the fetched data
          if (data.sales && data.sales.length > 0) {
            setReportData(data.sales); // Set the sales data in the state
            setReportError(null); // Clear any previous error
          } else {
            setReportData([]); // No sales found, set empty array in the state
            setReportError("No sales found for the selected date range"); // Set the error message
          }
        })
        .catch((error) => {
          console.error("Error fetching report:", error);
          setReportData([]); // Clear any previous data
          setReportError("Error fetching report. Please try again."); // Set the error message
        });
    }
  };

  return (
    <div>
      <h1 className='my-5 text-center font-black text-4xl text-orange-600 tracking-wider uppercase'>Generate Sales Report</h1>
      <DateRangePicker
        className="max-w-md mx-auto"
        value={value}
        onValueChange={setValue}
        locale={enGB}
        dropdownPlaceholder="Select"
      />
      <button
            className='bg-orange-500 h-10 rounded-2xl hover:bg-orange-700'
            onClick={handleGenerateReport}
          >
            <span className='mx-5 font-bold text-base uppercase'>Generate</span>
          </button>
      {/* Display the report data */}
      {reportData.length > 0 ? (
        <div className="mt-10">
          <h2 className='my-5 ml-10 font-bold text-2xl text-orange-600 tracking-wider uppercase'>Generated Report</h2>
          <div className="overflow-x-auto flex items-center justify-center">
            <TableContainer component={Paper}>
              <Table className="bg-red-500">
                <TableHead>
                  <TableRow className="bg-gray-200">
                    <TableCell>ID</TableCell>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((sale, index) => (
                    <TableRow
                      key={sale.id}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      <TableCell className="py-2 px-4 border-b border-l bg-red-700">{sale.id}</TableCell>
                      <TableCell className="py-2 px-4 border-b">{sale.product_id}</TableCell>
                      <TableCell className="py-2 px-4 border-b">{sale.quantity}</TableCell>
                      <TableCell className="py-2 px-4 border-b">{sale.amount}</TableCell>
                      <TableCell className="py-2 px-4 border-b border-r">{sale.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        <div>
          {reportError ? (
            <Typography variant="body1" color="error">{reportError}</Typography>
          ) : (
            <Typography variant="body1">Click "Generate" to generate the report</Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportPage;
