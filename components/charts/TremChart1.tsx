import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../AuthContext';
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
    const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

const {token} = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/products', {
              headers: {
                Authorization : `Bearer ${token}`
              }
            });
            const data = response.data;
            setProductData(data);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
    
        fetchData();
      }, [token]);

      
      

  return (
    <div>
    <Card className="sm:w-[270px] w-[370px] mx-auto">
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
