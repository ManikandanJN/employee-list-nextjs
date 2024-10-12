import { Button, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";

const Model = ({ ...props }) => {
  const { isOpen, onSubmit, onCancel, title, data } = props;
  const [formData, setFormData] = useState({
    employeeName: data?.employeeName ?? "",
    position: data?.position ?? "",
    empId: data?.empId ?? "",
    gender: data?.gender ?? "",
  });

  const handleOk = () => {
    onSubmit(formData);
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {isOpen && (
        <Modal
          title={`${title} Record`}
          open={isOpen}
          footer={
            <div className="flex gap-5">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleOk}>Save</Button>
            </div>
          }
        >
          <Form layout="horizontal" onFinish={handleOk}>
            <Form.Item>
              <Input
                placeholder="Enter employee name"
                onChange={handleChange}
                name="employeeName"
                value={formData.employeeName}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Enter employee designation"
                onChange={handleChange}
                name="position"
                value={formData.position}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Enter employee id"
                onChange={handleChange}
                name="empId"
                value={formData.empId}
              />
            </Form.Item>
            <Form.Item label="Gender:">
              <Radio.Group
                onChange={handleChange}
                name="gender"
                value={formData.gender}
              >
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Model;
