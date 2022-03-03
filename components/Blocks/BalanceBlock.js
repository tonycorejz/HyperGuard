import Button from "../Assets/Button";
import Icon from "../Assets/Icon";
import Link from "../Assets/Link";
import { useUserData } from "../Context/GlobalUserContext";
import RiseBalancePopup from "../Popups/RiseBalancePopup";

import Cookies from 'js-cookie'
import React from "react";

const BalanceBlock = () => {
    const [data] = useUserData();

    return (
        <div className="for-user display-flex direction-column">
            <div className="info-user-wallet direction-column">
                <h2 className="items-center display-flex">
                    <Icon id="wallet"/>Баланс</h2>
                <h1>{data.user.balance} ₽</h1>
            </div>
            <div className="info-user direction-column">
                <RiseBalancePopup className="insert-balance"/>
            </div>
            <Link noClass={true} href="/history">
                <h5>История зачислений <Icon id="arrow-r-b"/></h5>
            </Link>
        </div>
    );
};

export default BalanceBlock;