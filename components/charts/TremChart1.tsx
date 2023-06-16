import React from 'react'
import {
    BadgeDelta,
    Card,
    DeltaType,
    DonutChart,
    Flex,
    Legend,
    List,
    ListItem,
    Title,
  } from "@tremor/react";
  import { useEffect, useState } from "react";

  interface Product {
    title: string;
    instock: number;
  }



export default function TremChart1() {

    const [productData, setProductData] = useState<Product[]>([]);

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

      

  return (
    <div>
    <Card className="max-w-md ml-10">
    <Flex className="space-x-8" justifyContent="start" alignItems="center">
      <Title>Products in Stock</Title>
    </Flex>
    <Legend categories={productData.map((product) => product.title)} className="mt-6"
    colors={[ "rose", "cyan", "amber"]}
    />
    <DonutChart
      data={productData}
      index="title"
      category="instock"
      variant='pie'
      colors={[ "rose", "cyan", "amber"]}
      
      className="mt-6"
    />
    <List className="mt-6">
        {productData.map((product) => (
          <ListItem key={product.title}>
            <span>{product.title}</span>
            <span>{product.instock}</span>
          </ListItem>
        ))}
      </List>
  </Card></div>
  )
}
