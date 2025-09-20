import React, { useState } from "react";
import {
  type Employee,
  type Attendance,
  type Performance,
  fetchEmployeeAttendance,
  fetchEmployeePerformance,
} from "../service/api";
import { useQuery } from "@tanstack/react-query";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { UserIcon } from '@heroicons/react/24/solid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  employee: Employee;
}

export const EmployeeCard: React.FC<Props> = ({ employee }) => {
  const [activeChart, setActiveChart] = useState<
    "attendance" | "performance" | null
  >(null);

  const { data: attendance = [] } = useQuery<Attendance[]>({
    queryKey: ["attendance", employee.id],
    queryFn: () => fetchEmployeeAttendance(employee.id),
    enabled: activeChart === "attendance",
  });

  const { data: performance = [] } = useQuery<Performance[]>({
    queryKey: ["performance", employee.id],
    queryFn: () => fetchEmployeePerformance(employee.id),
    enabled: activeChart === "performance",
  });

  const attendanceData = {
    labels: attendance.map((a) => new Date(a.date).toLocaleDateString()),
    datasets: [
      {
        label: "Presence",
        data: attendance.map((a) => (a.isPresent ? 1 : 0)),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // blue
      },
    ],
  };

  const performanceData = {
    labels: ["Rating", "Remaining"],
    datasets: [
      {
        label: "Performance",
        data: performance.length
          ? [performance[0].rating, 10 - performance[0].rating]
          : [0, 10],
        backgroundColor: ["rgba(16, 185, 129, 0.7)", "rgba(200,200,200,0.3)"], // green + gray
      },
    ],
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 transition-transform transform hover:-translate-y-3 hover:shadow-xl">
      {/* Employee Name */}
      <h3 className="text-center font-bold text-lg mb-4">
        {employee.firstName} {employee.lastName}
      </h3>

      {/* Chart Buttons */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          className={`px-4 py-1 rounded text-white font-medium ${
            activeChart === "attendance"
              ? "bg-blue-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() =>
            setActiveChart(activeChart === "attendance" ? null : "attendance")
          }
        >
          Attendance
        </button>
        <button
          className={`px-4 py-1 rounded text-white font-medium ${
            activeChart === "performance"
              ? "bg-green-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() =>
            setActiveChart(activeChart === "performance" ? null : "performance")
          }
        >
          Performance
        </button>
      </div>

      {/* Chart / Icon */}
      <div className="flex justify-center items-center h-48">
        {activeChart === "attendance" && attendance.length > 0 && (
          <Bar data={attendanceData} options={{ maintainAspectRatio: false }} />
        )}
        {activeChart === "performance" && performance.length > 0 && (
          <Pie
            data={performanceData}
            options={{ maintainAspectRatio: false }}
          />
        )}
        {!activeChart && (
          <UserIcon className="w-20 h-20 text-gray-400" /> // person icon centered
        )}
      </div>
    </div>
  );
};
