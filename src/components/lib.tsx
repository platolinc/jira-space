import styled from "@emotion/styled";

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