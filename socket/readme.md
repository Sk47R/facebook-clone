# socket io

1. npm install socket.io
2. in react client npm install socket.io-client
3. in socket, npm init, add nodemon
4. and in socket, connection is done

```
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
  <!-- here cors to is prevent cross origin -->
  <!-- 8900 is the port for socket -->
});
io.on("connection", (socket) => {
  console.log("a user connected");
});

```

5. now in client

```
<!-- socket connection -->
import { io } from "socket.io-client";
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);
```
