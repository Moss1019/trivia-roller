import {
    Box,
    MenuItem,
    Select,
    Typography
} from "@mui/material";

function LabeledSelect(props) {
    return (
        <Box className="mt25">
            <Typography variant="caption">{props.label}</Typography>
            <Select
                className="fill-width"
                value={props.value}
                label=""
                variant="standard"
                onChange={(ev) => props.onChange(ev.target.value)}>
                {props.defaultValue !== undefined && <MenuItem value={props.defaultValue}>
                    {props.defaultLabel}
                </MenuItem>}
                {props.values.map((v) => (
                    <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
                ))}
            </Select>
        </Box>
    );
}

export default LabeledSelect;