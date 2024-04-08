import { useMount, useDebounce, useDocumentTitle } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { Button, Typography } from "antd";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";

export const ProjectListScreen = (props: {setProjectModalOpen: (isOpen: boolean) => void}) => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams()
  const {isLoading, error, data: list, retry} = useProjects(useDebounce(param, 300))
  const {data: users} = useUsers()

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    
    {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      
    <List 
      setProjectModalOpen={props.setProjectModalOpen}
      refresh={retry} 
      loading={isLoading} 
      users={users || []} 
      dataSource={list || []} 
      rowKey='id'
    />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;