package main

import (
	"meia/core/src/api"
	"meia/core/src/rpc"
)

func main() {
	meiaCoreAPI := api.InitMeiaCoreAPI()
	rpc.StartRpcServer(meiaCoreAPI)
}
