import { useEffect, useState } from "react";
import api from "../api/api";
import dayjs from "dayjs";

const AdminPage = ({ userRole }) => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // 관리자일 때 상품 목록과 회원 목록 조회
    useEffect(() => {
        if (userRole !== "admin") return;

        let active = true;

        const fetchData = async () => {
            setLoading(true);
            setErrorMessage("");

            try {
                const [productRes, userRes] = await Promise.all([
                    api.get("/products"),
                    api.get("/users")
                ]);

                if (
                    !Array.isArray(productRes.data) ||
                    !Array.isArray(userRes.data)
                ) {
                    throw new Error("목록 응답 형식이 올바르지 않습니다.");
                }

                if (active) {
                    setProducts(productRes.data);
                    setUsers(userRes.data);
                }
            } catch (error) {
                console.error("관리자 대시보드 조회 오류:", error);
                if (active) {
                    setErrorMessage("데이터를 불러오지 못했습니다.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchData();

        return () => {
            active = false;
        };
    }, [userRole]);

    // 관리자 수
    const adminCount = users.filter(
        user => user.role === "admin"
    ).length;

    // 전체 상품 가격의 합계
    const totalPrice = products.reduce(
        (sum, product) => sum + Number(product.price),
        0
    );

    // 상품이 없으면 평균 가격은 0
    const avgPrice = products.length > 0
        ? Math.round(totalPrice / products.length)
        : 0;

    // 최신 등록 순으로 정렬한 후 5개 선택
    const recentProducts = [...products]
        .sort(
            (a, b) =>
                dayjs(b.created_at).valueOf() -
                dayjs(a.created_at).valueOf()
        )
        .slice(0, 5);

    if (userRole !== "admin") {
        return <p>관리자만 이용할 수 있습니다.</p>;
    }

    if (loading) {
        return <p>데이터를 불러오는 중입니다.</p>;
    }

    if (errorMessage) {
        return <p role="alert">{errorMessage}</p>;
    }

    return (
        <div className="admin-page">
            <h2>관리자 대시보드</h2>

            <div className="admin-cards">
                <div className="admin-card">
                    <p>전체 상품</p>
                    <strong>{products.length}개</strong>
                </div>

                <div className="admin-card">
                    <p>전체 회원</p>
                    <strong>{users.length}명</strong>
                </div>

                <div className="admin-card">
                    <p>관리자</p>
                    <strong>{adminCount}명</strong>
                </div>

                <div className="admin-card">
                    <p>평균 상품 가격</p>
                    <strong>{avgPrice.toLocaleString()}원</strong>
                </div>
            </div>

            <h3>최근 등록 상품</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {recentProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>
                                {Number(product.price).toLocaleString()}원
                            </td>
                            <td>
                                {dayjs(product.created_at).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )}
                            </td>
                        </tr>
                    ))}
                    {recentProducts.length === 0 && (
                        <tr>
                            <td colSpan={4}>등록된 상품이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h3>회원 목록</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>권한</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.role === "admin"
                                    ? "관리자"
                                    : "일반회원"}
                            </td>
                            <td>
                                {dayjs(user.created_at).format("YYYY-MM-DD")}
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5}>등록된 회원이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;