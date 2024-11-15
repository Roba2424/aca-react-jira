import { Button } from "antd";
import AddIssueModal from "../../components/shared/IssueModal/Add";
import { useState } from "react";

const Cabinet = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Create Issue
      </Button>

      <AddIssueModal onClose={handleClose} isOpen={showModal} />
    </div>
  );
};

export default Cabinet;
