import Icon from "../Assets/Icon";
import ProfilePicture from "../Assets/ProfilePicture";
import { useUserData } from "../Context/GlobalUserContext";


const ProfileBlock = (props) => {
    const [data] = useUserData();

    return (
        <div className="for-user display-flex direction-column">
            <div className="info-user-email">
                <ProfilePicture size="3em"/>
                <div className="user-name-container">
                    <h2 className="user-name">{data.user.name}</h2>
                    <span>{data.user.email}</span>
                </div>
            </div>
            <div className="info-user direction-column">
                <div className="contet-space-b">
                    <h4>
                        <Icon id="profile"/>Номер профиля</h4>
                        <h4><span>{data.user.id}</span>
                    </h4>
                </div>
                <div className="contet-space-b">
                    <h4>
                        <Icon id="calendary"/>Дата регистрации</h4>
                    <h4>
                        <span>15.09.2021</span>
                    </h4>
                </div>
            </div>
            <a href="/profile">
                <h5>Просмотр данных <Icon id="arrow-r-b"/></h5>
            </a>
        </div>
    );
};

export default ProfileBlock;