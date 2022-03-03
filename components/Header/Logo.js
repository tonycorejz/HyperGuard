import Icon from "../Assets/Icon"
import Link from "../Assets/Link"

const Logo = (props) => {
    return (
        <div className="for-logo">
            <Link href="/">
                <Icon id="logo" className={"cursor-pointer"}/>
            </Link>
        </div>
    )
}

export default Logo;