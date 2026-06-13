package api

type MeiaCoreAPI struct{}

func InitMeiaCoreAPI() *MeiaCoreAPI {
	return new(MeiaCoreAPI)
}

type HelloArgs struct {
	Name string
}
type HelloReply struct {
	Message string
}

func (api *MeiaCoreAPI) Hello(args *HelloArgs, reply *HelloReply) error {
	reply.Message = "Hello " + args.Name
	return nil
}
