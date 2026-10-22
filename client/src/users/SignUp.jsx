import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const SignUp = () => {
    //폼 데이터 상태 관리
    const [formData, setFormData] = useState({

        username:"",
        password:"",
        confirmPassword:"", //비밀번호 확인
        email:"",
});

//모든 필드 입력값 변경 함수
const handleInputChange = (e) => {
    const {name, value} = e.target;   //e.target.value, e.target.name

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    })); // 기존 배열에 [name]:value 추가
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const {username, password, confirmPassword, email} = formData;

        // 필수 입력 확인
        if (
            !username.trim() ||
            !password.trim() ||
            !confirmPassword.trim() ||
            !email.trim()
        ) {
            alert("모든 항목을 입력하세요.");
            return;
        }

        // 비밀번호 일치 확인
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await api.post("/users", {
                username: username.trim(),
                password,
                email: email.trim(),
            });

            // 현재 서버는 실패해도 HTTP 200을 반환하므로
            // 성공 메시지까지 확인
            if (response.data !== "회원 가입이 성공적으로 이루어졌습니다.") {
                alert("회원 가입에 실패했습니다.");
                return;
            }

            alert("회원 가입이 완료되었습니다.");
            navigate("/signin");
        } catch (error) {
            console.error("회원 가입 요청 오류:", error);
            alert("회원 가입 요청 중 오류가 발생했습니다.");
        }
}

const handleCancel = () => {
    setFormData({
        username:"",
        password:"",
        confirmPassword:"",
        email:""
    })
}

const navigate = useNavigate();

    return(
        <div className="sign-up">
            <h2>회원 가입</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    <div>
                        <label htmlFor="signup-username">아이디</label>
                        <input 
                        id="signup-username"
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="signup-password">비밀번호</label>
                        <input 
                        id="signup-password" type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        >
                        </input>
                    </div>
                    <div>
                    <label htmlFor="signup-confirmPassword">비밀번호 확인</label>
                    <input
                        id="signup-confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    </div>
                    <div>
                        <label htmlFor="signup-email">이메일</label>
                        <input 
                        id="signup-email"
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}>
                        </input>
                    </div>
                    <div>
                        <button type="submit">가입</button>
                        <button type="button" onClick={handleCancel}>취소</button>
                    </div>
                </ul>

            </form>
        </div>
    )
}

export default SignUp
