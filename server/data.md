### mysql  - jsdb
create TABLE product(
	-- 칼럼명 자료형:
    id int AUTO_INCREMENT PRIMARY key,
    product_name VARCHAR(30) not null, -- 필수
    price int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 날짜와 시간
);
