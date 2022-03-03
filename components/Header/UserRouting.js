import Container from "../Assets/Container"
import Icon from "../Assets/Icon"
import Link from "../Assets/Link"

const UserRouting = (props) => {
    return (
        <>
            <Container>
                <Icon id="profile"/>
                <Link href="/profile">Профиль</Link>
            </Container>
            <Container>
                <Icon id="edit"/>
                <Link href="/admin/users">Админ-панель</Link>
            </Container>
            <Container>
                <Icon id="exit"/>
                <Link href="/api/auth/signOut">Выход</Link>
            </Container>
        </>
    )
}

export default UserRouting;