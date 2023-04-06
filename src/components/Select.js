import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectField = ({ name, selectItems, value, onChange }) => {
  return (
    <FormControl
      variant="standard"
      sx={{ mr: 1, minWidth: "30%" }}
      size="small"
    >
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        labelId={name}
        id={name}
        value={value}
        label={name}
        onChange={onChange}
      >
        <MenuItem value={""}>
          <em>None</em>
        </MenuItem>
        {selectItems &&
          selectItems.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
