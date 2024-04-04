import { clean0bject, useMount, useDebounce } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 300)
  const [list, setlist] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', {data: clean0bject(debouncedParam)}).then(setlist)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;