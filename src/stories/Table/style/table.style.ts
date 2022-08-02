import styled from '@emotion/styled';
import { styled as MUIStyled, TableSortLabel as MUITableSortLabel } from '@mui/material';

/*
.noWrapBox {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  .use-pagination.use-toolbar {
    height: calc(100% - 78px);
  }
  .table-wrap {
    &.use-pagination {
      height: unset;
    }
  }
}

.wrap {
  // full size of parent
  width: 100%;
  height: 100%;
  min-height: 250px;
  position: relative;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 8px;
  box-shadow: 0 1px 3px 1px #0000001a;
  .use-toolbar {
    height: calc(100% - 38px);
  }
  .use-pagination.use-toolbar {
    height: calc(100% - 88px);
  }
  .use-pagination {
    height: calc(100% - 40px);
  }
}
*/

export const WrapBox = styled.div<{ useWrap: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  min-height: ${(props) => props.useWrap && '250px'};
  border-radius: ${(props) => props.useWrap && '4px'};
  padding: ${(props) => props.useWrap && '8px'};
  box-shadow: ${(props) => props.useWrap && '0 1px 3px 1px #0000001a'};
  .use-toolbar {
    height: calc(100% - 38px);
  }
  .use-pagination.use-toolbar {
    height: ${(props) => (props.useWrap ? 'calc(100% - 88px)' : 'calc(100% - 78px)')};
  }
  .use-pagination {
    height: calc(100% - 40px);
  }
  .table-wrap {
    &.use-pagination {
      height: unset;
    }
  }
`;

export const TableSortLabelWrap = styled.div<{ useColumnBorder: boolean }>`
  border-right: ${(props) => (props.useColumnBorder ? '1px solid #dbdbdb' : 'none')};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TableLabel = styled.div<{ align: string }>`
  text-align: ${(props) => (props.align ? props.align : 'left')};
  width: 100%;
`;

export const TableBody = styled.div`
  padding-bottom: 10px;
  padding-top: 8px;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  flex-direction: column;
  min-height: 50px;
  max-height: calc(100% - 40px);
  overflow-y: auto;
  min-width: fit-content;
`;

export const TableSortLabel = MUIStyled(MUITableSortLabel)({
  whiteSpace: 'nowrap',
  display: 'block',
  width: '100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  '& .MuiTableSortLabel-icon': {
    width: 18,
    height: 18,
    position: 'absolute',
    bottom: 0,
    marginLeft: 2,
  },
});
