import { TextField } from "@mui/material";

function LabeledInput(props) {
    return (
        <TextField
            className="fill-width mt25"
            label={props.label.toLocaleLowerCase()}
            variant="outlined"
            value={props.value}
            type={props.type ?? 'text'}
            onChange={(ev) => { props.onChange(ev.target.value); }}
        />
    );
}

export default LabeledInput;
