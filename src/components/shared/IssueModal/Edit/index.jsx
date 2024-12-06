import { Modal, Form, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import ModalForm from "../Form";
import { useEffect, useState } from "react";
import { db } from "../../../../services/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../../core/utils/constants";
import { doc, updateDoc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { fetchIssueData } from "../../../../state-managment/slices/issues";

const EditIssueModal = ({ data, isOpen, onClose }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleEditIssue = async (formData) => {
    setButtonLoading(true);
    try {
      const { taskId } = data;
      const issueDocRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId);
      await updateDoc(issueDocRef, formData);
      notification.success({ message: "Issue data update successfully!" });
      dispatch(fetchIssueData());
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Modal
      title="Edit Issue"
      open={isOpen}
      width={600}
      okText="Edit Issue"
      centered
      onCancel={onClose}
      onOk={form.submit}
      loading={buttonLoading}
    >
      <ModalForm form={form} onFinish={handleEditIssue} />
    </Modal>
  );
};

export default EditIssueModal;
