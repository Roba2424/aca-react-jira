import "./style.css";
import { Button, Form, Input, message, notification } from "antd";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db, storage } from "../../services/firebase";
import {
  FIRESTORE_PATH_NAMES,
  STORAGE_PATH_NAMES,
} from "../../core/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfileInfo,
  setProfileImgUrl,
} from "../../state-managment/slices/userProfile";
import ImgUpload from "../../components/shared/imgUpload";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Profile = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
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

  const updatedUserProfileImg = async (imgUrl) => {
    try {
      const userDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
      await updateDoc(userDocRef, { imgUrl });
    } catch {
      notification.error({
        message: "Error :(",
      });
    }
  };

  const hanldeUpload = ({ file }) => {
    setUploading(true);
    const storageRef = ref(
      storage,
      `${STORAGE_PATH_NAMES.PROFILE_IMAGES}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressValue = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressValue);
      },
      (error) => {
        setUploading(false);
        setProgress(0);
        message.error(`Error uploading file ${error.message}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) => {
          setUploading(false);
          setProgress(0);
          updatedUserProfileImg(imgUrl);
          dispatch(setProfileImgUrl(imgUrl));
          message.success(`File uploaded`);
        });
      }
    );
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
          <ImgUpload
            handleUpload={hanldeUpload}
            progress={progress}
            uploading={uploading}
          />
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
