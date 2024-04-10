import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // key用["projects", param]实现当param变化时触发
  return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
};

export const useEditProject = () => {
  const client = useHttp();
  const QueryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`,{
      method: 'PATCH',
      data: params
    }), {
      onSuccess: () => QueryClient.invalidateQueries('projects')
    }
  )
};

export const useAddProject = () => {
  const client = useHttp();
  const QueryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) => client(`projects`, {
      data: params,
      method: "POST",
    }), {
      onSuccess: () => QueryClient.invalidateQueries('projects')
    }
  )
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    },
  );
};