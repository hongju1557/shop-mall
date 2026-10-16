import express from 'express'
import mysql from 'mysql2'

const app = express();
const PORT = 8000;

app.use(express.json()); // JSON 요청 처리
app.use(express.urlencoded({ extended: true })); // 폼 요청 처리



app.get('/',(req,res) =>{
    res.send("<h1>API 서버와 DB 연동</h1>")
})

app.post("/api/products",(req,res) =>{
    const {productName, price} = req.body; //요청한 속성
    const sql = "INSERT INTO product(product_name, price) VALUES(?, ?)"
    db.query(sql, [productName,price], (err,results)=> {
            if(err){
            console.log("상품 등록 오류", err);
            res.send("상품 등록 중 오류 발생");
            return;
        } res.send("상품 등록에 성공했습니다")
    });
})

const db = mysql.createConnection({
    host:"localhost",
    user:"jsuser",
    password:"Bd1475869!",
    database:"jsdb"
});

// mysql 연결
db.connect((err)=>{
    if(err){
        console.error("DB 연결 오류", err)
        return;
    }
    console.log("데이터 베이스에 연결 했습니다.")
});

//상품 목록 조회
//db.query(sql, 데이터, 콜백함수)
app.get("/api/products",(req,res) =>{
    const sql = "SELECT * FROM product";
    db.query(sql, (err, results) => {
        if(err){
            console.log("상품 조회 오류", err);
            res.send("상품 조회 중 오류 발생");
            return;
        }
        res.json(results);
    })
})

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM product WHERE id = ?"
    db.query(sql, [productId], (err, results) => {
        if(err){
            console.log("상품 조회 에러: ", err);
            res.send("상품 조회 중 오류가 발생했습니다.");
            return;
        }
        res.json(results[0]);  //1건(맨 앞)
    });
})

//상품 수정
//app.put(경로,콜백함수)

app.put("/api/products/:id",(req,res)=>{
    //수정하려면 이미 존재하는 상품(id)를 가져오기
        const productId = req.params.id;
        const {productName, price} = req.body;
        const sql = "UPDATE product SET product_name=?, price=? WHERE id=?"
        db.query(sql, [productName, price, productId], (err,results) =>{

            if(err){
            console.log("상품 조회 에러: ", err);
            res.send("상품 조회 중 오류가 발생했습니다.");
            return;
        }
            res.send("상품이 성공적으로 수정되었습니다.");
        })
})


app.delete("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "DELETE FROM product WHERE id = ?";
    db.query(sql, [productId], (err, results) => {
        if(err){
            console.log("상품 조회 에러: ", err);
            res.send("상품 조회 중 오류가 발생했습니다.");
            return;
        }
        res.send("상품이 성공적으로 삭제되었습니다.");
    });
})

app.listen(PORT,()=> {
    console.log(`http://localhost:${PORT}에서 서버 실행중...`);
    
})