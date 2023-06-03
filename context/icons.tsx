import  { ReactElement } from "react";
import {BsGithub,BsLinkedin} from "react-icons/bs";
import {TfiWorld} from "react-icons/tfi";

interface icon {
    id : number,
    logo : ReactElement,
    name : string,
    url : string,
}

export const icons : icon[]= [
    {
        id : 1,
        logo : <BsGithub/>,
        name : "GitHub",
        url : "https://github.com/KevinOmega/"
    },
    {
        id : 2,
        logo : <BsLinkedin/>,
        name : "LinkedIn",
        url : "https://www.linkedin.com/in/kevin-huayllas-94a3a4226/"
    },
    {
        id : 3,
        logo : <TfiWorld/>,
        name : "WebSite",
        url : "https://kevinomega.netlify.app/"
    },
]