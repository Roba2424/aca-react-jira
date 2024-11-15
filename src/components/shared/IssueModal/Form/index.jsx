import { Form, Input, Select, Space } from "antd";
import {
  ISSUE_OPTIONS,
  ISSUE_PRIORITY_OPTIONS,
} from "../../../../core/utils/issues";
import Editor from "../Edit";

const ModalForm = ({ form, onFinish }) => {
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      {/* ISSUE TITLE */}
      <Form.Item
        label="Issue Name"
        rules={[
          {
            required: true,
            message: "Please enter your Issue Name!",
          },
        ]}
      >
        <Input type="text" placeholder="Issue Name" />
      </Form.Item>

      {/* ISSUE TYPE */}
      <Form.Item
        name="type"
        label="Issue Type"
        rules={[
          {
            required: true,
            message: "Please enter your Issue Type!",
          },
        ]}
      >
        <Select placeholder="Issue Type" op>
          {Object.values(ISSUE_OPTIONS).map(({ value, icon, label }) => {
            return (
              <Select.Option key={value} value={value}>
                <Space>
                  {icon}
                  <span>{label}</span>
                </Space>
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {/* ISSUE DESCRIPTION */}
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input  Issue Description!",
          },
        ]}
      >
        <Editor type="text" placeholder="description" />
      </Form.Item>

      {/* ISSUE PRIORITY */}
      <Form.Item
        name="priority"
        label="Priority"
        rules={[
          {
            required: true,
            message: "Please select Issue Priority!",
          },
        ]}
      >
        <Select placeholder="Priority">
          {Object.values(ISSUE_PRIORITY_OPTIONS).map(
            ({ value, label, icon }) => {
              console.log(value, "PRIORITY<<<<<<<");
              return (
                <Select.Option key={value} value={value}>
                  <Space>
                    {icon}
                    <span>{label}</span>
                  </Space>
                </Select.Option>
              );
            }
          )}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ModalForm;
