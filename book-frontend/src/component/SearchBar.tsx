import {TextField} from "@mui/material";
import {ChangeEvent} from "react";

type SearchBarProps = {
    text: string;
    onTextChange: (text: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onTextChange(event.target.value)
    }

    return (
        <div>
            <TextField id="outlined-required" label="Search" onChange={onChange}/>
        </div>)
}