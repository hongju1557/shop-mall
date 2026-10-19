import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/api";

const UpdateProduct = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        productName:"",
        price:"",
        description:""
    })

    const {productName, price, description} = formData;


    //수정할 상품 가져오기
    useEffect(()=> {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`products/${id}`);
                setFormData({
                    productName: response.data.product_name,
                    price: response.data.price,
                    description: response.data.description
                })

            } catch (error) {
                alert("상품 조회중 에러가 발생했습니다.", error)
            }
        }
        fetchProduct();
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/products/${id}`, formData)
            alert("상품이 성공적으로 수정되었습니다.")
            navigate(`/products/${id}`); //상세 페이지로 이동
        } catch (error) {
            alert("상품 수정중 오류가 발생했습니다", error)
        }
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    }

    const handleCancel = (e) => {
        setFormData({
            productName:"",
            price:"",
            description:""
        })
    }



    return(
        <div className="updateProduct">
            <h2>상품 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">상품명</label>
                    <input 
                    type="text"
                    id="name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="상품명을 입력하세요."
                     />
                </div>
                <div>
                    <label htmlFor="price">가격</label>
                    <input 
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="가격을 입력하세요."
                     />
                </div>
                    <div>
                    <label htmlFor="description">설명</label>
                    <textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="상품설명을 입력하세요."
                     />
                </div>
                <div>
                    <button type="submit">수정</button>
                    <button type="button" onClick={handleCancel}>지우기</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct