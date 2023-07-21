import React, { useContext, useEffect, useState } from "react";
import { Card, Title, AreaChart } from "@tremor/react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const SalesAreaChart = () => {
  const [chartData, setChartData] = useState([]);
  const {token} = useContext(AuthContext)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const today = new Date();
        const twelveDaysAgo = new Date();
        twelveDaysAgo.setDate(today.getDate() - 7);
        const url = `http://127.0.0.1:3001/sales/report/?start_date=${twelveDaysAgo.toLocaleDateString()}&end_date=${today.toLocaleDateString()}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;

        if (response.status >= 200 && response.status < 300) {
          const formattedData = formatChartData(data.sales);
          setChartData(formattedData);
         
        } else {
          setChartData([]);
          console.error("Error fetching chart data:", data.message);
        }
      } catch (error) {
        setChartData([]);
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [token]);

  const formatChartData = (salesData) => {
    const formattedData = [];
    const today = new Date();

    // Generate an array of dates for the past 12 days
    const dateArray = [];
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dateArray.push(date.toISOString().split("T")[0]);
    }

    // Group sales by date and calculate total amount
    const salesByDate = salesData.reduce((acc, sale) => {
      const date = sale.date.split("T")[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          totalAmount: sale.amount,
        };
      } else {
        acc[date].totalAmount += sale.amount;
      }
      return acc;
    }, {});

    // Format the data for chart
    for (const date of dateArray) {
      const totalAmount = salesByDate[date] ? salesByDate[date].totalAmount : 0;
      formattedData.push({
        date,
        Sales: totalAmount,
      });
    }

    return formattedData;
  };

  const dataFormatter = (number: number) => {
    return "Ksh " + Intl.NumberFormat().format(number).toString();
  };

  return (
    <Card className="w-[370px] mx-auto sm:w-full ">
      <Title>Sales over time (Ksh)</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartData}
        index="date"
        categories={["Sales"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

export default SalesAreaChart;
