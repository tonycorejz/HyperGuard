import { useState } from "react";
import { Dropdown, DropdownBody, DropdownHead } from "../Assets/Dropdown";
import Icon from "../Assets/Icon";
import Link from "../Assets/Link";
import NotificationsCount from "../Assets/NotificationsCount";
import UpperNotification from "./UpperNotification";

const Notifications = (props) => {
    const [alertsState, setAlertsState] = useState(false);

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
                </ul> 
            </DropdownBody>
        </Dropdown>
    );
};

export default Notifications;