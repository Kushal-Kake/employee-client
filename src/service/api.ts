import api from "./api-instance.ts";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export interface LoginOutput {
  accessToken: string;
}

export interface Attendance {
  id: string;
  date: string;
  isPresent: boolean;
}

export interface Performance {
  id: string;
  rating: number;
  review: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export const fetchEmployees = async (): Promise<Employee[]> => {
  const res = await api.get<Employee[]>("/employees");
  return res.data;
};

export const fetchEmployeeAttendance = async (
  employeeId: string
): Promise<Attendance[]> => {
  const res = await api.get<Attendance[]>(`/attendances/${employeeId}`);
  return res.data;
};

export const fetchEmployeePerformance = async (
  employeeId: string
): Promise<Performance[]> => {
  const res = await api.get<Performance[]>(`/performances/${employeeId}`);
  return res.data;
};

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post<User>("/register", { email, password });
  return res.data;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginOutput> => {
  const res = await api.post<LoginOutput>("/login", { email, password });
  return res.data;
};
