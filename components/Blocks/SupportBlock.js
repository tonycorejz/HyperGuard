import Button from "../Assets/Button";
import Icon from "../Assets/Icon";
import Link from "../Assets/Link";
import NotificationsCount from "../Assets/NotificationsCount";

const SupportBlock = () => {
    return (
        <div className="for-user display-flex direction-column">
            <div className="info-user-support direction-column">
                <h2 className="items-center display-flex">
                    <Icon id="queston"/>Служба поддержки</h2>
                <a className="main-menu" href="./support.html">
                    <h5>Все запросы</h5>
                </a>
                <nav className="main-menu">
                    <ul>
                        <li>
                            <a className="a-main-menu items-center display-flex">
                                <h5 className="items-center display-flex">Последние обращения <NotificationsCount amount={2}/></h5>
                            </a>
                            <ul className="submenu submenu-support">
                                <a className="items-center display-flex" href="./support-request.html">Не работают сервера
                                    <NotificationsCount amount={2}/>
                                </a>
                                <a className="no-allert items-center display-flex">Не можем пополнить средства</a>
                                <a className="no-allert items-center display-flex">Сервер лежит уже более суток</a>
                            </ul>
                        </li> 
                    </ul>
                </nav>
            </div>
            <Button className="ask-quastion" href="/test">Создать обращение</Button>
        </div>
    );
};

export default SupportBlock;