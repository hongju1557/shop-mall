import {NavLink, useNavigate} from 'react-router-dom'

const Header = ({isLoggedIn, username, userRole, onLogout}) => {

        const navigate = useNavigate();

        const handleLogout = () => {
            onLogout();
            navigate('/');
    }

    const handleClick = (e) => {
        if (!isLoggedIn || userRole !== "admin") {
            e.preventDefault();
            alert("상품 등록은 관리자만 가능합니다.");
        }
    }

    return(
        <header className='header'>
            <nav>
                <NavLink to='/'>home</NavLink>
                <NavLink to='/products'>상품 목록</NavLink>
                <NavLink to='/products/new' onClick={handleClick}>상품 등록</NavLink>
            {userRole=="admin" &&(
                <NavLink to='/AdminPage'>관리자</NavLink>
                )

}
                {isLoggedIn ? (
                    <>
                    <span>{username}님 환영합니다.</span>
                    <button type="button" onClick={handleLogout}>
                        로그아웃
                    </button>
                    </>
                    
                ) : (
                    <NavLink to="/signin">로그인</NavLink>
                )}
                <NavLink to='/SignUp'>회원 가입</NavLink>
            </nav>
        </header>
    )
}

export default Header