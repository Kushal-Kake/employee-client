import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, type Employee } from "../service/api";
import { EmployeeCard } from "./EmployeeCard";

export const Dashboard: React.FC = () => {
  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  if (isLoading)
    return <p className="text-center mt-20 text-lg">Loading employees...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-lg">Error fetching employees</p>
    );

  return (
    <div className="flex justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
        {employees.map((emp) => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
};
