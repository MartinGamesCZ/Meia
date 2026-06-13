package api

import (
	meia_application "meia/core/src/meia/application"
	meia_window "meia/core/src/meia/window"
)

type MeiaCoreAPI struct {
	//InitChan chan struct{}
	Windows map[string]*meia_window.MeiaWindow
}

func InitMeiaCoreAPI() *MeiaCoreAPI {
	return &MeiaCoreAPI{
		//InitChan: make(chan struct{}),
		Windows: make(map[string]*meia_window.MeiaWindow),
	}
}

func (api *MeiaCoreAPI) ApplicationInit(args *struct{}, reply *struct{}) error {
	meia_application.Init()
	//close(api.InitChan)
	return nil
}

type WindowCreateReply struct {
	Id string
}

func (api *MeiaCoreAPI) WindowCreate(args *struct{}, reply *WindowCreateReply) error {
	window := meia_window.Create()
	api.Windows[window.GetId()] = window

	reply.Id = window.GetId()

	return nil
}

type WindowSetTitleArgs struct {
	Id    string
	Title string
}

func (api *MeiaCoreAPI) WindowSetTitle(args *WindowSetTitleArgs, reply *struct{}) error {
	api.Windows[args.Id].SetTitle(args.Title)
	return nil
}

type WindowSetSizeArgs struct {
	Id     string
	Width  int
	Height int
}

func (api *MeiaCoreAPI) WindowSetSize(args *WindowSetSizeArgs, reply *struct{}) error {
	api.Windows[args.Id].SetSize(args.Width, args.Height)
	return nil
}

func (api *MeiaCoreAPI) ApplicationStartLoop(args *struct{}, reply *struct{}) error {
	meia_application.StartLoop()
	return nil
}

type WindowShowArgs struct {
	Id string
}

func (api *MeiaCoreAPI) WindowShow(args *WindowShowArgs, reply *struct{}) error {
	api.Windows[args.Id].Show()
	return nil
}
