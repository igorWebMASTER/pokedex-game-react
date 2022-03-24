import styled from "styled-components";

export const TooltipContainer = styled.div<{ status?: string }>`
    position: absolute;
    top: 36%;
    z-index:1;
    width:60px;

    img{
        max-width: 140px;
    }
`;