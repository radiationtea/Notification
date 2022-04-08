# 3C Notification Server
Notification Management Server for 3C cert system.

## RESTful API docs

### Client-side call

**GET** `/health`\
request health check

request:
```
GET /health
```

response:
```json
200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "subject": "3C-Notification",
    "uptime": number, // in ms
    "messages": {
      "pending": number, // 전송 대기 중인 메시지 수
      "processing": number, // 전송 중인 메시지 수 
      "resolved": number, // 전송 된 메시지 수
      "failed": number, // 전송 실패한 메시지 수
      "last_at": number // in ms / 마지막으로 처리된 메시지의 타임스템프
    },
    "timestamp": number // in ms
  }
}
```

---

**GET** `/messages`\
list all messages

request:
```
GET /messages?status=<pending/processing/resolved/failed/all>&type=<submitted/accepted/rejected>&per_pages=<1~100, default: 10>&page=<0~>
Cookies: SESSION_TOKEN=<admin_token>

ex)
GET /messages?type=all&per_page=100
GET /messages?type=pending&per_pages=10&page=2
```

response:
```json
200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "messages": [
      {
        "id": string, // in UUID
        "status": "pending/processing/resolved/failed",
        "type": "submitted/accepted/rejected",
        "requested_at": number, // in ms
        "resolved_at": number | null,
        "errors": string | null,
        "content": string,
        "phone_number": string
      },
      ...
    ]
  }
}
```

---

---

**DELETE** `/messages/<messageid>`\
Undo message send request

request:
```
DELETE /messages/f4dbe82a-7b26-41ac-864a-fb42e2aea082
Cookies: SESSION_TOKEN=<admin_token>
```

response:
```json
200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "id": string
  }
}
```

### Server-side call

**POST** `/messages`\
Request send message

request:
```
POST /messages
Content-Type: application/json
Authorization: token <server-token>

{
  "type": "submitted/accepted/rejected",
  "subcategory": number,
  "user": string
}
```

response:
```json
201 Created
Content-Type: application/json

{
  "success": true,
  "data": {
    "id": string
  }
}
```


