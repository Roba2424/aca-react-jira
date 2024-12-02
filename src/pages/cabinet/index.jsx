import { Button } from "antd";
import AddIssueModal from "../../components/shared/IssueModal/Add";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueData } from "../../state-managment/slices/issues";

const Cabinet = () => {
  const [showModal, setShowModal] = useState(false);

  const { issueColumns } = useSelector((state) => state.issue);
  const dispatch = useDispatch();
  dispatch(() => fetchIssueData());

  useEffect(() => {
    dispatch(fetchIssueData());
  }, []);

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
