import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

// emotion js 使用变量自定义样式
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marringBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marringBottom + "rem"};
  //  直接子元素
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
          ? "2rem"
          : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => <FullPage>
  <Spin size={"large"}/>
</FullPage> 

export const FullPageErrorFallback = ({error}: {error: Error | null}) => <FullPage>
  <DevTools></DevTools>
  <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
</FullPage> 

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;