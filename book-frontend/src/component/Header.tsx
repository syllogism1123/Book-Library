import {Typography} from "@mui/material";
import {Link, NavLink} from "react-router-dom";

export default function Header() {
    return (
        <div>
            <Typography variant="h2" style={{color: "brown"}}>
                Book Library
            </Typography>
            <Typography>
                <Link to='/books'>Book Library</Link>
                <Link to='/login'>login</Link>
                <Link to='/logout'>logout</Link>
                <NavLink to='/books/add'>Add</NavLink>
            </Typography>
        </div>
    )
}