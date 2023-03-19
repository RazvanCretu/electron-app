import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectField = ({ name, selectItems, value, onChange }) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </InputLabel>
      <Select
        labelId={name}
        id={name}
        value={value}
        label={name.charAt(0).toUpperCase() + name.slice(1)}
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
