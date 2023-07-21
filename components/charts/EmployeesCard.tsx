import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import { useContext, useEffect, useState } from "react";
import { UserGroupIcon } from "@heroicons/react/outline";
import axios from "axios";
import { AuthContext } from "../AuthContext";

interface Employee {
  id: number;
  name: string;
  job_title: number;
  salary: number;
  phone_number: string;
  start_date: string;
}

export default function EmployeesCard() {
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [totalSalary, setTotalSalary] = useState<number>(0);
  const apiURL = 'https://kuku-hub-ba097a50ef10.herokuapp.com'
  const {token} = useContext(AuthContext)

  useEffect(() => {
    // Fetch the employees and calculate the total number and salary
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${apiURL}/employees`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data: Employee[] = response.data;
        setTotalEmployees(data.length);

       // const salarySum = data.reduce((sum, employee) => sum + employee.salary, 0);
        //setTotalSalary(salarySum);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [token]);

  return (
    <Card className="lg:w-60 sm:w-56 w-[330px] mx-auto md:mt-0 mt-5  " decoration="top" decorationColor="orange">
      <Flex className="">
        <Icon icon={UserGroupIcon} color="orange" variant="solid" tooltip="Total number of employees" size="sm"/>
        <div className="mr-8">
      <Text>Total Employees</Text>
      <Metric>{totalEmployees}</Metric>
      </div>
      </Flex>

    </Card>
  );
};
