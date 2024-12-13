import { Button, Typography } from "antd";
import AddIssueModal from "../../components/shared/IssueModal/Add";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueData } from "../../state-managment/slices/issues";
import EditIssueModal from "../../components/shared/IssueModal/Edit";
import LoadingWrapper from "../../components/shared/LoadinWrapper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";

const { Title } = Typography;

const Cabinet = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const { data, isLoading } = useSelector((state) => state.issue);

  useEffect(() => {
    dispatch(fetchIssueData());
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  console.log(data);
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

      <div className="drag-context-container">
        <LoadingWrapper isLoading={isLoading}>
          <DragDropContext>
            {Object.entries(data).map(([columnId, column]) => {
              return (
                <div className="column-container" key={columnId}>
                  <div className="column-header">
                    <Title level={5} type="secondary">
                      {columnId} - {column.length} items
                    </Title>
                  </div>

                  <div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        console.log(provided);
                        return (
                          <div
                            className="droppable-container"
                            ref={provided.innerRef}
                          >
                            {column.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.taskId}
                                  draggableId={item.taskId}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className="issue-card-container"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        Task
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </LoadingWrapper>
      </div>
    </div>
  );
};

export default Cabinet;
