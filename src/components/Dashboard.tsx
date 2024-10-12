import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import './style.css'

const Dashboard = () => {
  const router = useRouter();
  const [uniqueData, setUniqueData] = useState([]);

  async function fetchData() {
    const response = await fetch(`/api/employee`);
    const responseData = await response.json();
    const data = responseData.list;
    const uniquePositions = data.reduce((positions: any, employee: any) => {
      if (!positions.includes(employee.position)) {
        positions.push(employee.position);
      }
      return positions;
    }, []);
    setUniqueData(uniquePositions);
  }
console.log(uniqueData)
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (selectedData: any) => {
    router.push("/employeeList");
    const data = { data: selectedData };
    const queryString = new URLSearchParams(data).toString();
    router.push(`/employeeList?${queryString}`);
  };

  return (
    <div className="container">
      <button className="cards" onClick={() => handleClick("All")}>All</button>
      {uniqueData.map((item) => (
        <button className="cards" key={item} onClick={() => handleClick(item)}>
          {item}
        </button>
      ))}
      <button className="cards" onClick={() => handleClick("Male")}>Male</button>
      <button className="cards" onClick={() => handleClick("Female")}>Female</button>
    </div>
  );
};

export default Dashboard;
