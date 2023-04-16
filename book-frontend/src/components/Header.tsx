import React from "react";
import {Link, NavLink} from "react-router-dom";

export default function Header() {

    return (
        <header className="header">
            <h1 className="header_title">Book Library</h1>

            <Link className="headerLink" to='/books'>Books</Link>
            <NavLink className="headerNav" to='/books/add'>Add</NavLink>
            <NavLink className="headerNav" to='/login'>Login</NavLink>

        </header>
    )
}