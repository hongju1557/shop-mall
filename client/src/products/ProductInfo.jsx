import {useParams, useNavigate} from 'react-router-dom'
import api from '../api/api';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const ProductInfo = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    //페이지 이동
    const navigate = useNavigate();

    useEffect(()=> {
        let active = true;
        const fetchProduct = async () => {
            setProduct(null);
            setErrorMessage('');
            try {
                const response = await api.get(`/products/${id}`);
                if (!response.data || typeof response.data !== 'object') {
                    throw new Error('상품 정보가 없습니다.');
                }
                if (active) setProduct(response.data);
            } catch (error) {
                console.log("상품 상세 조회 에러 : ", error);
                if (active) setErrorMessage('상품 정보를 불러오지 못했습니다. 상품 번호와 서버 연결을 확인해주세요.');
            }
        }
        fetchProduct();
        return () => { active = false; };
    },[id])

    //상품 삭제
    const handleDelete = async () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
        try {
            await api.delete(`/products/${id}`);
            alert("상품이 삭제되었습니다.")
            navigate("/products")
        } catch (error) {
            console.error("상품 삭제 오류:", error)
            alert("상품 삭제중 오류가 발생했습니다.",error);
        }
    }
    }
    return(
        <div className="product-info">
            <h2>상품 정보</h2>
            {errorMessage ? <p role="alert">{errorMessage}</p> : !product ? <p>상품 정보를 불러오는 중...</p> : <div className="detail">
                <p>상품 이름 : {product.product_name}</p>
                <p>가격 : {product.price}</p>
                <p>설명 : {product.description}</p>
                <p>
                등록일 : {dayjs(product.created_at).format('YYYY-MM-DD')}
                </p>
            </div>}
            {/* 상품 수정 삭제 버튼 만들기 */}
            <div>
                <button onClick={()=> {navigate('/products')}}>목록 보기</button>
                <button onClick={()=> {navigate(`/products/update/${id}`)}}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    )
}

export default ProductInfo
