package main

import (
	"meia/core/src/api"
	"meia/core/src/rpc"
	"runtime"
)

func init() {
	runtime.LockOSThread()
}

func main() {
	meiaCoreAPI := api.InitMeiaCoreAPI()

	exitChan := make(chan struct{})
	go func() {
		rpc.StartRpcServer(meiaCoreAPI)
		close(exitChan)
	}()

	<-exitChan
}
