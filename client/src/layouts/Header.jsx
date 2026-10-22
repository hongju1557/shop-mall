import {NavLink, useNavigate} from 'react-router-dom'

const Header = ({isLoggedIn, username, onLogout}) => {

        const navigate = useNavigate();

        const handleLogout = () => {
            onLogout();
            navigate('/');
    }

    return(
        <header className='header'>
            <nav>
                <NavLink to='/'>home</NavLink>
                <NavLink to='/products'>상품 목록</NavLink>
                <NavLink to='/products/new'>상품 등록</NavLink>
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