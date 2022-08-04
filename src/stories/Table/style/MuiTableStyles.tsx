import { Checkbox, createStyles, makeStyles, Radio, styled, Theme } from '@mui/material';
import React from 'react';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    radioIcon: {
      borderRadius: '50%',
      width: 12,
      height: 12,
      boxShadow: 'inset 0 0 0 1px #8995ae, inset 0 -1px 0 #8995ae',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
    },
    radioCheckedIcon: {
      backgroundColor: '#4285f4',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      boxShadow: 'inset 0 0 0 1px #4285f4, inset 0 -1px 0 #4285f4',
      '&:before': {
        display: 'block',
        width: 12,
        height: 12,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
    },
    tableTable: {
      borderSpacing: 0,
      height: '100%',
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
      overflowX: 'auto',
    },
    tableHeadRow: {
      outline: 0,
      verticalAlign: 'middle',
      fontSize: '13px',
      color: '#0e131a',
      backgroundColor: '#edf2f6',
      borderRadius: '3px',
      fontWeight: 500,
      position: 'relative',
      '&:hover $resizeHandle': {
        opacity: 1,
      },
    },
    tableHeadCell: {
      paddingLeft: '10px',
      fontSize: '13px',
      textAlign: 'left',
      height: '40px',
      verticalAlign: 'inherit',
      // color: theme.palette.text.primary,
      color: '#191f28',
      '&:first-child': {
        paddingLeft: '16px',
      },
      backgroundColor: '#edf2f6',
    },
    resizeHandle: {
      position: 'absolute',
      cursor: 'col-resize',
      zIndex: 99,
      opacity: 0,
      borderLeft: `1px solid ${theme.palette.primary.light}`,
      borderRight: `1px solid ${theme.palette.primary.light}`,
      height: '50%',
      top: '25%',
      transition: 'all linear 100ms',
      right: -2,
      width: 3,
      '&.handleActive': {
        opacity: '1',
        border: 'none',
        backgroundColor: theme.palette.primary.light,
        height: 'calc(100% - 4px)',
        top: '2px',
        right: -1,
        width: 1,
      },
    },
    tableRow: {
      color: '#191f28',
      outline: 0,
      verticalAlign: 'middle',
      '&:hover > div': {
        backgroundColor: 'rgba(34, 139, 230, 0.06)',
      },
      '&.rowSelected > div': {
        backgroundColor: 'rgba(34, 139, 230, 0.12)',
        // '&:hover > div': {
        //   backgroundColor: 'rgba(34, 139, 230, 0.12)',
        // },
      },
    },
    tableSortLabelWrap: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tableCell: {
      paddingLeft: '10px',
      paddingRight: '10px',
      minHeight: '40px',
      textAlign: 'left',
      verticalAlign: 'inherit',
      '&:first-child': {
        paddingLeft: '16px',
      },
      '&>a': {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '&>div>span': {
        wordBreak: 'break-all',
      },
    },
    tableSortLabel: {
      whiteSpace: 'nowrap',
      display: 'block',
      width: '100%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '& svg': {
        width: 18,
        height: 18,
        position: 'absolute',
        bottom: 0,
        marginLeft: 2,
      },
    },
    headerIcon: {
      '& svg': {
        width: 16,
        height: 16,
        marginTop: 4,
        marginRight: 0,
      },
    },
    iconDirectionAsc: {
      transform: 'rotate(90deg)',
    },
    iconDirectionDesc: {
      transform: 'rotate(180deg)',
    },
    tableHead: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      maxHeight: '',
      width: 'calc(100% - 2px)',
      minWidth: 'fit-content',
    },

    tableBody: {
      paddingBottom: '10px',
      paddingTop: '8px',
      display: 'flex',
      flex: '1 1 auto',
      width: '100%',
      flexDirection: 'column',
      // maxHeight: '36px',
      minHeight: '50px',
      maxHeight: 'calc(100% - 40px)',
      overflowY: 'auto',
      // overflowX: 'hidden',
      minWidth: 'fit-content',
    },
    tableLabel: {
      width: '100%',
    },
    cellIcon: {
      '& svg': {
        width: 16,
        height: 16,
        marginTop: 3,
      },
    },
  }),
);

export const useSubTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    radioIcon: {
      borderRadius: '50%',
      width: 12,
      height: 12,
      boxShadow: 'inset 0 0 0 1px #8995ae, inset 0 -1px 0 #8995ae',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
    },
    radioCheckedIcon: {
      backgroundColor: '#4285f4',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      boxShadow: 'inset 0 0 0 1px #4285f4, inset 0 -1px 0 #4285f4',
      '&:before': {
        display: 'block',
        width: 12,
        height: 12,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
    },
    tableTable: {
      borderSpacing: 0,
      // NOTE: 100% <<= (100% - 48px)
      // In Table.module.scss: height is changed by use-toolbar and use-pagination.
      height: '100%',
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
      overflow: 'hidden',
      // overflowX: 'auto',
      // border: '1px solid rgba(224, 224, 224, 1)',
    },
    tableHeadRow: {
      outline: 0,
      verticalAlign: 'middle',
      fontSize: '13px',
      color: '#0e131a',
      backgroundColor: '#edf2f6',
      fontWeight: 500,
      position: 'relative',
      boxShadow: 'inset 0 -1px 0 0 #dbdbdb, inset 0 1px 0 0 #dbdbdb',
      '&:hover $resizeHandle': {
        opacity: 1,
      },
    },
    tableHeadCell: {
      paddingLeft: '10px',
      fontSize: '13px',
      textAlign: 'left',
      height: '36px',
      verticalAlign: 'inherit',
      // color: theme.palette.text.primary,
      color: '#191f28',
      '&:first-child': {
        paddingLeft: '16px',
      },
    },
    resizeHandle: {
      position: 'absolute',
      cursor: 'col-resize',
      zIndex: 100,
      opacity: 0,
      borderLeft: `1px solid ${theme.palette.primary.light}`,
      borderRight: `1px solid ${theme.palette.primary.light}`,
      height: '50%',
      top: '25%',
      transition: 'all linear 100ms',
      right: -2,
      width: 3,
      '&.handleActive': {
        opacity: '1',
        border: 'none',
        backgroundColor: theme.palette.primary.light,
        height: 'calc(100% - 4px)',
        top: '2px',
        right: -1,
        width: 1,
      },
    },
    tableRow: {
      color: '#191f28',
      outline: 0,
      verticalAlign: 'middle',
      '&:not(:last-of-type)': {
        borderBottom: '1px solid #dbdbdb',
        backgroundColor: '#ffffff',
      },
      '&:hover > div': {
        // backgroundColor: 'rgba(34, 139, 230, 0.06)',
      },
      '&.rowSelected > div': {
        backgroundColor: 'rgba(34, 139, 230, 0.12)',
        // '&:hover > div': {
        //   backgroundColor: 'rgba(34, 139, 230, 0.12)',
        // },
      },
    },
    tableCell: {
      paddingLeft: '10px',
      paddingRight: '10px',
      minHeight: '36px',
      textAlign: 'left',
      verticalAlign: 'inherit',
      '&:first-child': {
        paddingLeft: '16px',
      },
      '&>a': {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    tableSortLabelWrap: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tableSortLabel: {
      whiteSpace: 'nowrap',
      display: 'block',
      width: '100%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '& svg': {
        width: 18,
        height: 18,
        position: 'absolute',
        bottom: 0,
        marginLeft: 2,
      },
    },
    headerIcon: {
      '& svg': {
        width: 16,
        height: 16,
        marginTop: 4,
        marginRight: 0,
      },
    },
    iconDirectionAsc: {
      transform: 'rotate(90deg)',
    },
    iconDirectionDesc: {
      transform: 'rotate(180deg)',
    },
    tableHead: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      maxHeight: '',
      width: 'calc(100% - 2px)',
      minWidth: 'fit-content',
    },

    tableBody: {
      display: 'flex',
      flex: '1 1 auto',
      width: '100%',
      borderBottom: '1px solid #dbdbdb',
      flexDirection: 'column',
      // maxHeight: '36px',
      maxHeight: 'calc(100% - 40px)',
      minHeight: '36px',
      overflowY: 'auto',
      overflowX: 'hidden',
      minWidth: 'fit-content',
      backgroundColor: '#fff',
    },
    tableLabel: {},
    cellIcon: {
      '& svg': {
        width: 16,
        height: 16,
        marginTop: 3,
      },
    },
  }),
);
