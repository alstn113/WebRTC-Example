# 사용법

## 1. Docker 컨테이너 실행

```bash
docker-compose up -d
```

## 2. Mysql 서버 접속

```bash
docker exec -it webrtc bash
# web-rtc는 컨테이너 이름
```

## 3. Mysql 로그인

```bash
mysql -u root -p
```

## 4. 스키마 생성

```sql
CREATE DATABASE webrtc DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```
