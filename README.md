### 쇼핑몰 프로젝트
### 프로젝트 구조
#### client 폴더 : 리액트 설치
#### server 폴더 : 웹서버(express)
#### 프런트와 서버 통신 : 리액트 - npm install axios
#### 서버 - cors() 설치 npm i cors
#### 리액트 라우터 npm i react-router-dom

mysql jsuser, jsdb
user 테이블
칼럼
id
username
password
email
role
create_at

MVC 패턴 - model view controller

### 강사님 파일 기준 변경 사항
- 서버 DB를 PostgreSQL(`pg.Pool`)로 변경했습니다. 기존 MySQL 데이터는 자동으로 옮겨지지 않습니다.
- 로컬 PostgreSQL에 사용자 `jsuser`(기본 비밀번호 `pwjs`)와 데이터베이스 `jsdb`를 준비하고, `server/postgresql.sql`을 실행하세요.
- 접속 정보가 다르면 실행 환경의 `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`로 지정할 수 있습니다.
- 서버: `cd server` 후 `npm start` (개발 중에는 `npm run dev`). 프런트: `cd client` 후 `npm run dev`.
- 상품 등록 경로를 `/products/new`로 통일했습니다.

### Render 배포 설정
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- 서버 환경변수: `DATABASE_URL`(PostgreSQL 연결 문자열), `CLIENT_URL`(프런트 주소). `PORT`는 배포 환경에서 제공합니다.
- 프런트 빌드 환경변수: `VITE_API_URL`(서버 주소 뒤에 `/api` 포함). 미설정 시 로컬 서버를 사용합니다.
