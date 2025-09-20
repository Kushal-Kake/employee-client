// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { fetchEmployees, type Employee } from "../service/api.ts";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const EmployeeChart: React.FC = () => {
//   const {
//     data: employees = [],
//     isLoading,
//     error,
//   } = useQuery<Employee[]>({
//     queryKey: ["employees"],
//     queryFn: fetchEmployees,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching employees</p>;

//   const chartData = {
//     labels: employees.map((e) => `${e.firstName} ${e.lastName}`),
//     datasets: [
//       {
//         label: "Performance",
//         data: employees.map((e) => e.performance),
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//       },
//     ],
//   };

//   return <Bar data={chartData} />;
// };
