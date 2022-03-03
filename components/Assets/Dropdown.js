// Dropdown should only come with 2 elements of DropdownHead and DropdownBody

import Error from "next/error";
import React, { useEffect, useState } from "react";
import UpperNotification from "../Header/UpperNotification";
import Icon from "./Icon";
import Link from "./Link";
import NotificationsCount from "./NotificationsCount";

function recursiveMap(children, fn, proxyClick) {
    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child;
        }
    
        const parObj = {
            ...child.props
        };

        if (child.props.children){
            parObj.children = recursiveMap(child.props.children, fn, proxyClick);
        }

        const {closeHandler, onClick} = child.props;

        if (closeHandler && onClick){
            throw new Error("Components inside DropdownBody should have either closeHandler or onClick property!");
        }

        const origHandler = closeHandler || onClick;

        if (origHandler && proxyClick){

            parObj.origHandler = origHandler;
            parObj.onClick = (target) => {
                return (proxyClick)(target, child.props);
            }
        }

        child = React.cloneElement(child, parObj);

        return child;
    });
   
}

const DropdownBody = ({state, openClass, forceOpenClass, closeClass, className, children, proxyClick}) => {
    const newChilds = React.cloneElement(children, {
        ...children.props,
        className: (
            `${(children.props 
                ? children.props.className || "" : "")} ${state ? 
                    (forceOpenClass || openClass || "open"): (closeClass || "")}`
            )
        }
    );
    
    const proxyChilds = recursiveMap((<>{newChilds}</>), (child) => child, proxyClick);
    return (
        <>
            {proxyChilds}
        </>
    );
};

const DropdownHead = ({state, openClass, forceOpenClass, closeClass, onClick, children}) => {
    if (!(children) && children.length > 1){
        throw new Error("There should be something inside of the DropdownHead!")
    }
    return (
        <>
            {React.cloneElement(children, {
                ...children.props,
                className: (
                    `${(children.props.className || "")} ${state ? (forceOpenClass || openClass || "open"): (closeClass || "")}`
                ),
                onClick
                }
            )}
        </>
    );
}


const exampleTest = ()=> {
    return (
        <Dropdown>
            <DropdownHead>
                <div key={"test33"} className="for-alerts display-flex">
                    <Icon id="alerts" className="img-alerts"/>
                    <UpperNotification amount={2}/>
                </div>
            </DropdownHead>
            <DropdownBody>
                <ul className={"submenu submenu-support submenu-alerts"}>
                    <Link href="/support-request">
                        Новые сообщения <NotificationsCount amount={2}/>
                    </Link>
                    {
                    /**
                     * You must wrap the returning object literal into parentheses. 
                     * Otherwise curly braces will be considered to denote the function’s body. 
                     * The following works:
                        p => ({ foo: 'bar' });
                     */
                    // closeHandler fully acts as a onClick handler and serves with 2 other variables
                    // call stack is : currentDropDownState, originalTarget, componentProps
                    // also closeHandler can be replaced with onClick, 
                    // but it should return an object as well
                     }
                    <button closeHandler={(currentState) => ({state: !currentState})}>test closer</button>
                </ul> 
            </DropdownBody>
        </Dropdown>
    );
}



const Dropdown = ({children, openClass}) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!(children)){
        return (<></>);
    }
    
    if (children.length < 1){
        children = [children];
    }

    if (!(children.length) || children.length < 1){
        return (<></>);
    }

    const proxyClick = (target, props) => {
        const dproxyClick = props.origHandler;

        let proxyState = isOpen;

        if (dproxyClick && typeof(dproxyClick) == 'function'){
            const ret = dproxyClick(target, isOpen, props);
            if (ret && ret.state !== undefined && ret.state !== null){
                proxyState = ret.state;
            }
        } else proxyState = !proxyState;
        
        setIsOpen(proxyState);
    }

    return (
        <>
            {React.cloneElement(children[0], {
                ...children[0].props, 
                className: (
                    `${(children[0].props.className || "")} ${isOpen ? (openClass || "open") : ""}`
                ),
                state: isOpen,
                onClick: () => setIsOpen(!isOpen)
                })
            }
            {children.length < 2 ? <></> :
                (
                    React.cloneElement(children[1], {
                        ...children[1].props, 
                        className: (
                            `${(children[1].props.className || "")}`
                        ),
                        state: isOpen,
                        proxyClick: proxyClick
                    })
                )
            }
        </>
    );
};


export { Dropdown, DropdownHead, DropdownBody };