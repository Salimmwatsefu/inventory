import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
import { enGB } from "date-fns/locale";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import apiURL from "@/api";

export type Sales = {
  id: number;
  product_id: number;
  quantity: number;
  amount: number;
  date: string;
};

export type Product = {
  id: number;
  title: string;
  instock: number;
  price: number;
  date: string;
};



const ReportPage = () => {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(2022, 1, 1),
    new Date(),
  ]);

  const {token} = useContext(AuthContext)

  const [reportData, setReportData] = useState<Sales[]>([]);
  const [reportError, setReportError] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleGenerateReport = async () => {
    const startDate = value[0]?.toLocaleDateString();
    const endDate = value[1]?.toLocaleDateString();

    if (startDate && endDate) {
      console.log("Selected Start Date:", startDate);
      console.log("Selected End Date:", endDate);
      const url = `${apiURL}/sales/report/?start_date=${startDate}&end_date=${endDate}`;

      try {
        const response = await axios.get(url, {
          headers: {
           Authorization: `Bearer ${token}`
          },
        });
        const data = response.data;

        console.log("Fetched data:", data);

        if (data.sales && data.sales.length > 0) {
          setReportData(data.sales);
          setReportError(null);
        } else {
          setReportData([]);
          setReportError("No sales found for the selected date range");
        }
      } catch (error) {
        console.error("Error fetching report:", error);
        setReportData([]);
        setReportError("Error fetching report. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1 className="my-5 text-center font-black text-4xl text-orange-600 tracking-wider uppercase">
        Generate Sales Report
      </h1>
      <DateRangePicker
        className="max-w-md mx-auto"
        value={value}
        onValueChange={setValue}
        locale={enGB}
        dropdownPlaceholder="Select"
      />
      <button
        className="bg-orange-500 h-10 mt-5 rounded-2xl hover:bg-orange-700 mx-28 sm:mx-[460px]"
        onClick={handleGenerateReport}
      >
        <span className="mx-5 font-bold text-base uppercase">Generate</span>
      </button>
      {reportData.length > 0 ? (
        <div className="mt-10">
          <h2 className="my-5 ml-10 font-bold  text-2xl text-orange-600 tracking-wider uppercase">
            Generated Report
          </h2>
          <div className="overflow-x-auto flex items-center justify-center">
            <TableContainer component={Paper}>
              <Table className="bg-red-500">
                <TableHead>
                  <TableRow className="bg-gray-200">
                    <TableCell>ID</TableCell>
                    <TableCell>Product Title</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((sale, index) => {
                    const product = productData.find(
                      (product) => product.id === sale.product_id
                    );
                    const productName = product ? product.title : "";

                    return (
                      <TableRow
                        key={sale.id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <TableCell className="py-2 px-4 border-b border-l bg-red-700">
                          {sale.id}
                        </TableCell>
                        <TableCell className="py-2 px-4 border-b">
                          {productName}
                        </TableCell>
                        <TableCell className="py-2 px-4 border-b">
                          {sale.quantity}
                        </TableCell>
                        <TableCell className="py-2 px-4 border-b">
                          {sale.amount}
                        </TableCell>
                        <TableCell className="py-2 px-4 border-b border-r">
                          {sale.date}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        <div>
          {reportError ? (
            <Typography variant="body1" color="error">
              {reportError}
            </Typography>
          ) : (
            <Typography variant="body1" className="mt-5 mx-28 sm:mx-[370px]">
              Click Generate to generate the report
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportPage;
