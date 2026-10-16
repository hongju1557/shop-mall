import {useParams, useNavigate} from 'react-router-dom'
import api from '../api/api';
import { useEffect, useState } from 'react';

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

    return(
        <div className="product-info">
            <h2>상품 정보</h2>
            {errorMessage ? <p role="alert">{errorMessage}</p> : !product ? <p>상품 정보를 불러오는 중...</p> : <div className="detail">
                <p>상품 이름 : {product.product_name}</p>
                <p>가격 : {product.price}</p>
                <p>
                등록일 : {new Date(product.created_at).toLocaleDateString('ko-KR')}
                </p>
            </div>}
            <div>
                <button onClick={()=> {navigate('/products')}}>목록 보기</button>
            </div>
        </div>
    )
}

export default ProductInfo
