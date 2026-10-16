-- 사용자 계정 생성
create user jsuser@localhost identified by 'Bd1475869!';

-- jsdb 생성
create database jsdb;

-- 권한 부여 
grant all PRIVILEGES on jsdb.* to jsuser@localhost;  