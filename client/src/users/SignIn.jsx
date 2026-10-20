import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/api"



const SignIn = ({setUserName}) => {
    const [formData,setFormData] = useState({
        username:"", //id
        password:"", //password
        // email:""
    })

    //페이지 이동 훅 = useNavigate()
    const navigate = useNavigate();

    //로그인 결과 상태관리
    const [loginResult, setLoginResult] = useState("")

    const handleInputChange = (e) => {
        const {name,value} = e.target;

        setFormData({...formData, [name]: value
        })
    }

    const {username, password} = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        //입력값 유효성 검사
        if (!username.trim() || !password.trim()) {
            alert("모든 항목을 입력하세요.");
            return;
        }
        try {
            const response = await api.get(`/users/${username}`)
            console.log(response);
            
            const user = response.data; // 서버에서 받아온 데이터

            //비밀번호 확인 (DB에 있는 비밀번호와 외부에서 입력한 비밀번호 비교)
            if (user && user.password === password) {
                setLoginResult("success");
                setUserName(user.username);
                alert("로그인 되었습니다.")
                navigate('/'); // 메인 페이지로 이동
            }else{
                setLoginResult("fail");
            }




        } catch (error) {
            alert("로그인 중 오류가 발생했습니다.", error)
        }
        
    }



    return (
        <div className="sign-in">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                    type="text"
                    name="username"
                    placeholder="아이디 입력"
                    value={username}
                    onChange={handleInputChange}
                     />
                </div>
                <div>
                    <input 
                    type="password"
                    name="password"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={handleInputChange}
                     />
                </div>
                <div>
                    <button type="submit">로그인</button>
                </div>
            </form>
            <p>
                계정이 없으신가요? <Link to={"/SignUp"}>회원 가입</Link>
            </p>
            {/* 결과 메시지 출력 */}
            {/* {result === "success" && (<p>환영합니다.</p>)} */}
            {loginResult === "fail" && (<p>아이디 혹은 비밀번호를 확인해주세요.</p>)}
        </div>
    )
}

export default SignIn