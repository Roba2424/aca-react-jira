import { Button, Flex, Typography } from "antd";
import AddIssueModal from "../../components/shared/IssueModal/Add";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIssueColumns,
  fetchIssueData,
} from "../../state-managment/slices/issues";
import EditIssueModal from "../../components/shared/IssueModal/Edit";
import LoadingWrapper from "../../components/shared/LoadinWrapper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ISSUE_OPTIONS, taskStatuses } from "../../core/utils/issues";
import { FIRESTORE_PATH_NAMES } from "../../core/utils/constants";
import "./style.css";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../services/firebase";

const { Title, Text } = Typography;

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

  const hanldeChangeTaskStatus = async (result) => {
    if (result.destination) {
      const { destination, source } = result;

      try {
        dispatch(changeIssueColumns({ source, destination }));
        const docRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, result.draggableId);
        await updateDoc(docRef, { status: destination.droppableId });
      } catch (error) {
        console.log("Error Drag");
      }
    }
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

      <div className="drag-context-container">
        <LoadingWrapper isLoading={isLoading}>
          <DragDropContext onDragEnd={hanldeChangeTaskStatus}>
            {Object.entries(data).map(([columnId, column]) => {
              console.log(data)
              return (
                <div className="column-container" key={columnId}>
                  <div className="column-header">
                    <Title level={5} type="secondary">
                      {taskStatuses[columnId].title}{' '}{data[columnId].length}
                    </Title>
                  </div>

                  <div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="droppable-container"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {provided.placeholder}

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
                                        onClick={() => setEditModalData(item)}
                                      >
                                        <Flex justify="space-between">
                                          <Text>{item.issueName}</Text>

                                          <div>
                                            {ISSUE_OPTIONS[item.type]?.icon}
                                          </div>
                                        </Flex>
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
