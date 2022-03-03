import { useContext, useState } from "react";
import Container from "../Assets/Container";
import Icon from "../Assets/Icon";
import LanguageSelector from "../Assets/LanguageSelector";
import Link from "../Assets/Link";
import NotificationsCount from "../Assets/NotificationsCount";
import ProfilePicture from "../Assets/ProfilePicture";
import { GlobalUserProvider, GlobalUserContext, useUserData } from "../Context/GlobalUserContext";
import { usePageLoadState } from "../Context/PageLoadedContext";
import Notifications from "./Notifications";
import Routing from "./Routing";
import UpperNotification from "./UpperNotification";
import { Dropdown, DropdownBody, DropdownHead } from "../Assets/Dropdown";
import { useRouter } from "next/router";
import UserRouting from "./UserRouting";
import Logo from "./Logo";

const Header = (props) => {
    const [responsiveProfileState, setResponsiveProfileState] = useState(false);
    const [userData] = useUserData();
    const [pageLoading, setPageLoading] = usePageLoadState();
    const router = useRouter();
    const IsAdminPage = () => router.asPath.startsWith('/admin/');

    return (
        <>
        <header className="display-flex" style={{padding: 10}}>
            <Container className="header-background contet-space-b">
                <Logo/>
                {
                    !IsAdminPage() ? 
                        <>
                            <Container className="for-menu-header">
                                <Routing/>
                            </Container>
                            <Container className="for-ellements-user">
                                <LanguageSelector/>
                                <Notifications/>
                                <ProfilePicture size="2em"/>
                                <nav className="main-menu">
                                    <ul>
                                        <li>
                                            <Dropdown>
                                                <DropdownHead>
                                                    <Link className="a-main-menu items-center display-flex">
                                                        {userData.user.name}
                                                        <div className="arrow">
                                                            <span className="arrow-left"></span>
                                                            <span className="arrow-right"></span>
                                                        </div>
                                                    </Link>
                                                </DropdownHead>
                                                <DropdownBody>
                                                    <ul className="submenu" test={(<div></div>)}>
                                                        <div className="for-ellements-menu direction-column">
                                                            <div className="info-user-email info-user-email-menu display-flex">
                                                                <ProfilePicture size="2em"/>
                                                                <h2>{userData.user.name} <span>{userData.user.email}</span></h2>
                                                            </div>
                                                            <div className="for-balance-menu display-flex contet-space-b">
                                                                <Container>
                                                                    <Icon id="wallet"/>
                                                                    <p>Баланс</p>
                                                                </Container>
                                                                <h2>
                                                                    <span>{userData.user.balance} ₽</span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                        <UserRouting/>
                                                    </ul>   
                                                </DropdownBody>
                                            </Dropdown>
                                        </li> 
                                    </ul>
                                </nav>
                            </Container>
                        </> 
                        : 
                        <Container className="for-menu-header">
                            <Container className="for-a" margin={false}>
                                <a href="/">На главную</a>
                            </Container>
                        </Container>
                }
                <div className="flag-allerts-menu-mini items-center" style={{display: (IsAdminPage() ? "flex" : "")}}>
                    <LanguageSelector/>
                    <Notifications/>
                    <Dropdown>
                        <DropdownHead forceOpenClass="rot-90">
                            <div className="button-menu-mini display-flex direction-column">
                                <div className="e-menu-mini"></div>
                                <div className="e-menu-mini"></div>
                                <div className="e-menu-mini"></div>
                            </div>
                        </DropdownHead>
                        <DropdownBody>
                        <Container className="menu-mini direction-column">
                            <div className="submenu-menu-mini">
                                <div className="for-ellements-menu direction-column">
                                    <div className="info-user-email info-user-email-menu display-flex">
                                        <ProfilePicture size="2em"/>
                                        <h2 className="nick-user-menu-mini items-center display-flex contet-space-b">Эдвард Штейн <span>wtane@schweitzer.agency</span></h2>
                                    </div>
                                    <div className="for-balance-menu display-flex contet-space-b">
                                        <h2 className="items-center display-flex">
                                            <Link id="wallet"/>Баланс</h2>
                                        <h2>
                                            <span>10 000 ₽</span>
                                        </h2>
                                    </div>
                                </div>
                                <div className="profile-menu-mini display-flex contet-space-b">
                                    <UserRouting/>
                                </div>
                            </div>
                            <div className="for-menu-mini direction-column">
                                <Routing/>
                            </div>
                        </Container>
                        </DropdownBody>
                    </Dropdown>
                </div>
            </Container>
        </header>
        </>
    );
};


export default Header;