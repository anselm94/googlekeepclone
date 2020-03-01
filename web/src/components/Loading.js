import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

export default function () {
    return (
        <Backdrop open={true} >
            <CircularProgress color="inherit" />
        </ Backdrop>
    )
}