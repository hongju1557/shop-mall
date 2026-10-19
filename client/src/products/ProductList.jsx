import {Link} from 'react-router-dom'
import api from '../api/api'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

const ProductLists = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    //검색 키워드 상태관리
    const[searchKeyword, setSearchKeyword] = useState("");

    //db에서 데이터 가져오기
    useEffect(()=> {
        const fetchProducts = async() => {
            try {
                //http://localhost:8000/api/products
                const response = await api.get('/products');
                if (!Array.isArray(response.data)) {
                    throw new Error('상품 목록 응답이 배열이 아닙니다.');
                }
                setProducts(response.data) //data 속성 불러오기
            } catch (error) {
                console.log("상품 목록 조회 에러:" , error);
                setErrorMessage('상품 목록을 불러오지 못했습니다. 서버와 DB 연결을 확인해주세요.');
                
            }
        }
        fetchProducts();
    },[]);

    //검색된 상품 목록 필터링 구현
    const filterProducts = products.filter(product => 
        product.product_name.toLowerCase().includes(searchKeyword.toLowerCase())
    )

    return(
        <div className="product-list">
            {/* 검색 기능 */}
            <div className='search-bar'>
                <input type="text"
                name=""
                id=""
                placeholder="상품명으로 검색"
                onChange={(e) => setSearchKeyword(e.target.value)} />
            </div>

            {/* <h2>상품 리스트</h2> */}
            {errorMessage && <p role="alert">{errorMessage}</p>}
            <table>
                <thead>
                    <tr>
                        <th>
                            번호
                        </th>
                        <th>
                            상품명
                        </th>
                        <th>
                            가격
                        </th>
                        <th>
                            등록일
                        </th>
                    </tr>
                </thead>
                <tbody>
            {filterProducts.map((product, index) =>(
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>
                            <Link to={`/products/${product.id}`}>{product.product_name}</Link>
                        </td>
                        <td>{product.price}</td>
                        <td>
                            {dayjs(product.created_at).format('YYYY-MM-DD')}
                        </td>
                
                    </tr>
            ))} 


                </tbody>



            </table>

            <div className="btn-add">
                <Link to="/Addproduct">
                <button>상품 등록</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductLists
