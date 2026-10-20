import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express();
const PORT = 8000;

//cors(Cross-Origin Resource Sharing 교차출처 리소스 공유)
//브라우저가 보안상의 이유로 요청을 차단
app.use(cors({
    origin: "http://localhost:5173",
}))

app.use(express.json()); // JSON 요청 처리
app.use(express.urlencoded({ extended: true })); // 폼 요청 처리



app.get('/',(req,res) =>{
    res.send("<h1>API 서버와 DB 연동</h1>")
})

app.post("/api/products", (req, res) => {
    const { productName, price, description } = req.body;

    const sql = `
        INSERT INTO product(product_name, price, description)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [productName, price, description], (err, results) => {
        if (err) {
            console.error("상품 등록 오류:", err);
            return res.status(500).json({
                message: "상품 등록 중 오류 발생",
            });
        }

        res.status(201).json({
            message: "상품 등록에 성공했습니다",
            id: results.insertId,
        });
    });
});

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
            res.status(500).json({ message: "상품 조회 중 오류 발생" });
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
            res.status(500).json({ message: "상품 조회 중 오류가 발생했습니다." });
            return;
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
        }
        res.json(results[0]);  //1건(맨 앞)
    });
})

//상품 수정
//app.put(경로,콜백함수)

app.put("/api/products/:id",(req,res)=>{
    //수정하려면 이미 존재하는 상품(id)를 가져오기
        const productId = req.params.id;
        const {productName, price, description} = req.body;
        const sql = "UPDATE product SET product_name=?, price=?, description=? WHERE id=?"
        db.query(sql, [productName, price, description, productId], (err,results) =>{

            if(err){
            console.log("상품 수정 에러: ", err);
                return res.status(500).json({
                    message: "상품 수정 중 오류가 발생했습니다."
                });
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


//회원 api 개발(rest api)
//이전 통신방식(get,post)
//rest api - get,post,put,delete
//회원 목록
app.get("/api/users", (req,res) => {
    const sql = "SELECT * FROM users";
    db.query(sql,(err, results) => {
        if(err){
            console.log("회원 조회 에러 : ", err);
            res.send("회원 조회 중 오류가 발생했습니다.");
            return
        }

        res.json(results); // 프런트(요청)
    })
})

//회원 가입
app.post("/api/users", (req,res) => {

    const {username,password,email} = req.body;
    const sql = "insert into users(username,password,email) values (?,?,?)"
    db.query(sql,[username,password,email],(err) => {
                if(err){
            console.log("회원 가입 에러 : ", err);
            res.send("회원 가입 중 오류가 발생했습니다.");
            return
        }
        res.send("회원 가입이 성공적으로 이루어졌습니다.")

    })
})

//회원 조회(로그인)

app.get("/api/users/:username", (req,res)=> {
    const username = req.params.username; //요청한 아이디
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username] , (err,results)=> {
            if(err){
            console.log("회원 조회 에러 : ", err);
            res.send("회원 조회 중 오류가 발생했습니다.");
            return
        }
        res.json(results[0]); // 요청 데이터 반환
    });
})