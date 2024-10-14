import React, {useRef, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

import "./header.css";

const headerNav = [
    {
        display: "Movies",
        path: "/",
    },
    {
        display: <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />,
        path: "/movie",
    },
]

const Header = () => {
    // save the current location
    const { pathname } = useLocation();
    const headerRef = useRef(null); // save in ref HTML element

    const active = headerNav.findIndex( e => e.path === pathname);

    useEffect(()=> {
        // shrink: thu nhỏ header khi cuộn chuột
        // scroll: cuộn trang
        const shinkHeader = () => {
            // document.documentElement: chỉ đến thẻ html
            if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        }
        window.addEventListener("scroll", shinkHeader);
        return () => {
            window.removeEventListener("scroll", shinkHeader);
        }
    }, []) // run when component did mount


    return (
        <div ref={headerRef} className="header">
            <div className="header_wrap container">
                {/* LOGO */}
                <div className="logo">
                    {/* Link: CSR: không cần làm mới lại trang khi render */}
                    <Link to="/">tMovies</Link> 
                </div>

                {/* NAVIGATION */}
                <ul className="header_nav">
                    {
                        headerNav.map((item, index) => (
                            <li key={index} className={`${index === active ? 'active' : ''}`}>
                                <Link to={item.path}>{item.display}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header;