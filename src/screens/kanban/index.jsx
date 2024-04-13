import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "screens/kanban/util";
import { KanbanColumn } from "screens/kanban/kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import {Spin} from 'antd'
import { useTasks } from "../../utils/task";
import {CreateKanban} from "./create-kanban"
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  const {isLoading: taskIsLoading} = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading
  return (
    <DragDropContext onDragEnd={() => {

    }}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? <Spin size="large"/> : (
          <ColumnsContainer>
            <Drop type={'COLUMN'} direction={"horizontal"} droppableId={"kanban"}>
              <DropChild style={{display:'flex'}}>
                {kanbans?.map(
                  (kanban, index) => (
                    <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index} >
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  ))
                }
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal/>
      </ScreenContainer>
    </DragDropContext>
  );
};

const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    height: 1rem;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
  /*定义滚动条轨道
     内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    background-color: #f5f5f5;
  }
  /*定义滑块
     内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.2);
  }
`;