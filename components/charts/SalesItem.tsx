import React, { useContext, useEffect, useState } from "react";
import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { Product } from "../Products/ManageProducts";
import { Sales } from "../Sales/ManageSales";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const apiURL = 'https://kuku-hub-ba097a50ef10.herokuapp.com'

const BarGraph = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [reportData, setReportData] = useState<Sales[]>([]);
  const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

const {token} = useContext(AuthContext)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${apiURL}/products`, {
          headers: {
            Authorization : `Bearer ${ token }`
          }
        });
        const data = response.data;
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchReportData = async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const endDate = new Date();

      const startDateString = startDate.toLocaleDateString();
      const endDateString = endDate.toLocaleDateString();

      const url = `${apiURL}/sales/report/?start_date=${startDateString}&end_date=${endDateString}`;

      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = response.data;
        setReportData(data.sales);
      } catch (error) {
        console.error("Error fetching sales report data:", error);
      }
    };

    fetchProductData();
    fetchReportData();
  }, [token]);

  

  const calculateSoldAmount = (product: Product) => {
    const soldAmount = reportData.reduce((total, sale) => {
      if (sale.product_id === product.id) {
        return total + sale.amount;
      }
      return total;
    }, 0);

    return soldAmount;
  };

  const chartData = productData.map((product) => ({
    name: product.title,
    "Sold Amount": calculateSoldAmount(product),
  }));

  const dataFormatter = (number: number) => {
    return "Ksh " + Intl.NumberFormat().format(number).toString();
  };

  

  

  return (
    <Card className="w-[370px] mx-auto my-5 sm:my-0 sm:mb-5 sm:w-full">
      <Title>Sold Amount for Each Product (Past 7 Days)</Title>
      <Subtitle>
        This bar graph shows the sold amount of each product for the past 7 days.
      </Subtitle>
      
      <BarChart
        className="mt-6 "
        data={chartData}
        index="name"
        categories={["Sold Amount"]}
        colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
        showYAxis={true}
      />
      
    </Card>
  );
};

export default BarGraph;
