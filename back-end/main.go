package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":4000", nil)
}

func checkError(err error) {
	if err != nil {
		fmt.Println(err)
		return
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	socket, err := upgrader.Upgrade(w, r, nil)
	checkError(err)

	for {
		msgType, msg, err := socket.ReadMessage()
		checkError(err)
		fmt.Println(string(msg))
		e := socket.WriteMessage(msgType, msg)
		checkError(e)
	}
}
