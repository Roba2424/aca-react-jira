import { Form, Modal, notification } from "antd";
import { useState } from "react";
import ModalForm from "../Form";
import { generateUid } from "../../../../core/helpers/generateUid";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../../../services/firebase/index";
import { FIRESTORE_PATH_NAMES } from "../../../../core/utils/constants";
import { fetchIssueData } from "../../../../state-managment/slices/issues";
import { useDispatch } from "react-redux";
import { taskStatuses } from "../../../../core/utils/issues";

const AddIssueModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const handleCreateIssue = async (values) => {
    const taskId = generateUid();

    const taskModel = {
      taskId,
      ...values,
      status: taskStatuses.TODO.key,
      date: new Date().toLocaleDateString(),
    };

    try {
      setButtonLoading(true);
      const createdDoc = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId);
      await setDoc(createdDoc, taskModel);
      onClose();
      form.resetFields();
      notification.success({
        message: "Your task been created",
      });
      dispatch(fetchIssueData());
    } catch (error) {
      notification.error({
        message: "Erro task",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Create Issue"
      open={isOpen}
      width={600}
      onCancel={handleClose}
      okText="Create Issue"
      centered
      confirmLoading={buttonLoading}
      onOk={form.submit}
    >
      <ModalForm form={form} onFinish={handleCreateIssue} />
    </Modal>
  );
};

export default AddIssueModal;
