import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  cssLabel: {
    '&:not(hover):not($disabled):not($cssFocused):not($error)': {
      color: '#d92323',
    },
    '&$cssFocused': {
      color: '#d92323',
    },
  },
  cssOutlinedInput: {
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
  disabled: {},
}));

export default function Input({ value, placeholder, name, label, onChange }) {
  const classes = useStyles();

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      classes={classes.textField}
      name={name}
      value={value}
      variant='outlined'
      onChange={onChange}
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
      }}
    />
  );
}
