import { Button } from "antd";
import AddIssueModal from "../../components/shared/IssueModal/Add";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueData } from "../../state-managment/slices/issues";
import EditIssueModal from "../../components/shared/IssueModal/Edit";
import "./style.css";

const Cabinet = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const { data } = useSelector((state) => state.issue);

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

      {Boolean(editModalData) && (
        <EditIssueModal
          data={editModalData}
          isOpen={Boolean(editModalData)}
          onClose={() => setEditModalData(null)}
        />
      )}

      <AddIssueModal onClose={handleClose} isOpen={showModal} />

      {/* TODO */}
      <div className="board-container">
        <ul>
          {data.map((item) => {
            return (
              <li key={item.taskId} onClick={() => setEditModalData(item)}>
                {item.issueName}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cabinet;
