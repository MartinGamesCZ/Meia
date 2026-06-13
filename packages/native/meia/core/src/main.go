package main

import (
	"os"
	"runtime"

	"meia/core/src/api"
	"meia/core/src/gtk"
	meia_application "meia/core/src/meia/application"
	"meia/core/src/rpc"
)

func init() {
	runtime.LockOSThread()
}

func main() {
	meiaCoreAPI := api.InitMeiaCoreAPI()

	// Wrap RPC server into a goroutine to run on separate thread,
	// kill the process if the RPC server exits
	go func() {
		rpc.StartRpcServer(meiaCoreAPI)
		os.Exit(0)
	}()

	// Wait for initialization signal from RPC
	<-meia_application.InitChan
	gtk.GtkInit()

	// Wait for loop start signal from RPC
	<-meia_application.StartChan
	gtk.GtkMain()
}
