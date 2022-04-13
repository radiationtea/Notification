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
    "timestamp": number // in ms
  }
}
```

---

**GET** `/messages`\
list all messages

request:
```
GET /messages?type=<submitted/accepted/rejected/all>&per_pages=<1~100, default: 10>&page=<0~>
Cookies: SESSION_TOKEN=<admin_token>

ex)
GET /messages?type=all&per_page=100
GET /messages?type=submitted&per_pages=10&page=2
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


