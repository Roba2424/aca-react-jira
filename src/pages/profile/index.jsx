import "./style.css";
import { Button, Form, Input, notification, Upload } from "antd";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../services/firebase";
import { FIRESTORE_PATH_NAMES } from "../../core/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileInfo } from "../../state-managment/slices/userProfile";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    authUserInfo: { userData },
  } = useSelector((store) => store.userProfile);

  const [buttonLoading, setButtonLoading] = useState(false);
  const [form] = Form.useForm();
  const { uid, ...resData } = userData;

  useEffect(() => {
    form.setFieldsValue(resData);
  }, [resData, form]);

  const handleEditUserProfileInfo = async (values) => {
    setButtonLoading(true);

    try {
      const userDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
      await updateDoc(userDocRef, values);
      dispatch(fetchUserProfileInfo);
      notification.success({
        message: "User updated successfully",
      });
    } catch (error) {
      console.log(error, "ERROR");
      notification.error({
        message: "Oops! Something went wrong.",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        className="form-page-container"
        onFinish={handleEditUserProfileInfo}
      >
        <Form.Item label="Profile Image">
          <Upload>UPLOAD FILE</Upload>
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your Firstf name" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your Last name" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input readOnly placeholder="Email" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={buttonLoading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
