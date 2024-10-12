import { DataItem } from "@/src/types/types";

export const getData = async (propsData: string) => {
  let url;
  switch (propsData) {
    case "Developer":
    case "Designer":
    case "DevOps":
    case "Tester":
      url = `/api/employee?position=${propsData}`;
      break;
    case "Male":
    case "Female":
      url = `/api/employee?gender=${propsData}`;
      break;
    default:
      url = `/api/employee`;
      break;
  }
  const response = await fetch(url);
  const responseData = await response.json();
  return { data: responseData.list };
};

export const addData = async (payload: DataItem) => {
  const res = await fetch(`/api/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  return { data: result.list };
};

export const deleteRecord = async (data: DataItem) => {
  const payload = {
    id: data.id,
  };
  const res = await fetch(`/api/employee`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  return { data: result.list };
};

export const updateRecord = async (payload: DataItem) => {
  const res = await fetch(`/api/employee`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  return { data: result.list };
};
