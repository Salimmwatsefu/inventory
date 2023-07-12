import { useState, useEffect } from "react";
import { Card, Metric, Text, Icon, Flex } from "@tremor/react";
import { Sales } from "../Sales/ManageSales";
import { CashIcon, TicketIcon } from "@heroicons/react/outline";

const SalesCard = () => {
  const [reportData, setReportData] = useState<Sales[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  


  useEffect(() => {
    // Calculate totals for the past 7 days
    const calculateTotals = () => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 30);

      const past7DaysSales = reportData.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= sevenDaysAgo && saleDate <= today;
      });

      let quantitySum = 0;
      let amountSum = 0;

      for (const sale of past7DaysSales) {
        quantitySum += sale.quantity;
        amountSum += sale.amount;
      }
      console.log("Total Quantity:", quantitySum);

      setTotalQuantity(quantitySum);
      setTotalAmount(amountSum);
    };

    calculateTotals();
  }, [reportData]);

  // Fetch the report data
  useEffect(() => {
    const fetchReportData = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);

      const url = `http://127.0.0.1:3001/sales/report/?start_date=${startDate.toLocaleDateString()}&end_date=${endDate.toLocaleDateString()}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setReportData(data.sales || []);
          console.log("Fetched report data:", data.sales);
        } else {
          setReportData([]);
          console.error("Error fetching report:", data.message);
        }
      } catch (error) {
        setReportData([]);
        console.error("Error fetching report:", error);
      }
    };

    fetchReportData();
  }, []);


  return (
    <div>
      
      <div className="sm:flex sm:justify-center sm:gap-3 lg:gap-24">
        <Card className="lg:w-60 sm:w-56 w-[330px] mx-auto " decoration="top" decorationColor="green">
          <Flex className="space-x-1">
        <Icon icon={CashIcon} color="green" variant="solid" tooltip="Sum of Sales fot the past 7 days" size="sm" />
        <div>
          <Text>Amount sold</Text>
          <Metric>Ksh {totalAmount}</Metric>
          </div>
          </Flex>

        </Card>

        <Card className="lg:w-60 sm:w-56 w-[330px] sm:mt-0 mt-5 mx-auto" decoration="top" decorationColor="purple" >
          <Flex className="space-x-1">
        <Icon icon={TicketIcon} color="purple" variant="solid" tooltip="Sum of Sales fot the past 7 days" size="sm" />
        <div>
          <Text>Profit</Text>
          <Metric>Ksh {totalAmount}</Metric>
          </div>
          </Flex>

        </Card>

      </div>
    </div>
  );
};

export default SalesCard;
