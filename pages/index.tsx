import { useEffect, useState, useRef } from 'react';
import Chart, { ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';

interface Product {
  title: string;
  instock: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}

export default function Home() {
  const [productData, setProductData] = useState<Product[] | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (productData) {
      // Generate chart data from productData
      const generateChartData = () => {
        const labels = productData.map((product) => product.title);
        const instockData = productData.map((product) => product.instock);

        return {
          labels: labels,
          datasets: [
            {
              data: instockData,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
            },
          ],
        };
      };

      const data = generateChartData();
      setChartData(data);
    }
  }, [productData]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && chartData) {
      const chartConfig: ChartConfiguration<keyof ChartTypeRegistry, number[], string> = {
        type: 'pie',
        data: chartData,
        options: {},
      };
      const chart = new Chart(ctx, chartConfig);

      return () => {
        chart.destroy(); // Cleanup the chart on component unmount
      };
    }
  }, [chartData]);

  const renderChart = () => {
    if (!chartData) {
      return <div>Loading chart...</div>;
    }

    return <canvas ref={canvasRef} />;
  };

  return (
    <div>
      {/* Render the chart */}
      <div className='w-52'>
      {renderChart()}
      </div>

      {/* Rest of your home page content */}
      
    </div>
  );
}
