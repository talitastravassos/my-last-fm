import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  cssLabel: {
    '&:not(hover):not($disabled):not($cssFocused):not($error)': {
      color: '#d92323',
    },
    '&$cssFocused': {
      color: '#d92323',
    },
  },
  cssOutlinedInput: {
    color: '#d92323',
    '&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: '#d92323', //default
    },
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: '#d92323', //hovered
    },
    '&$cssFocused $notchedOutline': {
      borderColor: '#f71414', //focused
    },
  },
  notchedOutline: {},
  cssFocused: {
    color: '#d92323',
  },
  error: {},
  disabled: {
    color: '#f71414',
    borderColor: '#d9232394'
  },
}));

export default function Input({
  value,
  placeholder,
  name,
  label,
  onChange,
  multiline,
  disabled,
}) {
  const classes = useStyles();

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      name={name}
      value={value}
      variant='outlined'
      multiline={multiline}
      disabled={disabled}
      fullWidth={multiline}
      onChange={onChange}
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused
        },
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
          disabled: classes.disabled,
        },
      }}
    />
  );
}
