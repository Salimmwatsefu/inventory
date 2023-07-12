import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { UserGroupIcon } from "@heroicons/react/outline";

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
  const apiURL = 'http://localhost:3001'

  useEffect(() => {
    // Fetch the employees and calculate the total number and salary
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`${apiURL}/employees`);
        const data: Employee[] = await response.json();
        setTotalEmployees(data.length);

       // const salarySum = data.reduce((sum, employee) => sum + employee.salary, 0);
        //setTotalSalary(salarySum);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

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
