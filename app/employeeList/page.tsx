"use client";
import React, { useEffect, useState } from "react";
import { Button, Radio, Space, Table } from "antd";
import type { TableProps } from "antd";
import Link from "next/link";
import { addData, deleteRecord, getData, updateRecord } from "./utils";
import { DataItem } from "@/src/types/types";
import Model from "@/src/components/Model";

const EmployeeList = (props: any) => {
  const propsData = props?.searchParams?.data;
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpenAddModal: false,
    isOpenEditModal: false,
  });
  const [selectedRecord, setSelectedRecord] = useState({});

  const fetchData = async () => {
    const res = await getData(propsData);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: TableProps<DataItem>["columns"] = [
    {
      title: "EmpId",
      dataIndex: "empId",
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "employeeName",
      width: "20%",
    },
    {
      title: "Position",
      dataIndex: "position",
      width: "20%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "",
      align: "right",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="text-blue-600"
            onClick={() => handleEditModal(record)}
          >
            Edit
          </button>
          <button className="text-red-600" onClick={() => handleDelete(record)}>
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const handleAddModal = () => {
    setIsModalOpen({
      ...isModalOpen,
      isOpenAddModal: !isModalOpen.isOpenAddModal,
    });
  };

  const handleAddRecord = async (data: DataItem) => {
    const payload = {
      employeeName: data.employeeName,
      position: data.position,
      gender: data.gender,
      empId: data.empId,
    };
    const res = await addData(payload);
    setData(res.data);
    setIsModalOpen({
      ...isModalOpen,
      isOpenAddModal: !isModalOpen.isOpenAddModal,
    });
  };

  const handleEditModal = (record: DataItem) => {
    setSelectedRecord(record);
    setIsModalOpen({
      ...isModalOpen,
      isOpenEditModal: !isModalOpen.isOpenEditModal,
    });
  };

  const handleEditRecord = async (data: DataItem) => {
    const payload = {
      id: selectedRecord.id,
      employeeName: data.employeeName,
      position: data.position,
      gender: data.gender,
      empId: data.empId,
    };
    await updateRecord(payload);
    fetchData();
    setIsModalOpen({
      ...isModalOpen,
      isOpenEditModal: !isModalOpen.isOpenEditModal,
    });
  };

  const handleDelete = async (data: DataItem) => {
    const res = await deleteRecord(data);
    fetchData();
  };

  return (
    <div className="p-20">
      <div className="flex justify-between pb-10">
        <Link href={"/"} className="text-blue-500">
          Back
        </Link>
        {propsData === "All" && <Button onClick={handleAddModal}>+Add</Button>}
        {isModalOpen.isOpenAddModal && (
          <Model
            title={"Add"}
            isOpen={isModalOpen.isOpenAddModal}
            onSubmit={handleAddRecord}
            onCancel={handleAddModal}
          />
        )}
        {isModalOpen.isOpenEditModal && (
          <Model
            title={"Edit"}
            isOpen={isModalOpen.isOpenEditModal}
            onSubmit={handleEditRecord}
            onCancel={handleEditModal}
            data={selectedRecord}
          />
        )}
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </div>
    <div style={{ marginTop: 16 }}>
      <Radio.Group defaultValue="c" buttonStyle="solid">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b" disabled>
          Shanghai
        </Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </div>
    </div>
  );
};

export default EmployeeList;
