import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    color: '#f71414',
    '&:before': {
      borderColor: '#f71414',
    },
    '&:after': {
      borderColor: '#d92323',
    },
    '&:hover': {
      borderColor: '#f71414',
    },
  },
  icon: {
    fill: '#d92323',
  },
  label: {
    color: '#d92323',
    '&.Mui-focused': {
      color: '#f71414',
    },
  },
}));

export default function SelectInput({ label, value, items, onChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
      >
        {items
          ? items.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          ))
          : ''}
      </Select>
    </FormControl>
  );
}
