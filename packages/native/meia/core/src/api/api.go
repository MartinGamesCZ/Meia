package api

import (
	"meia/core/src/gtk"
	gtk_widgets "meia/core/src/gtk/widgets"
	meia_application "meia/core/src/meia/application"
	meia_window "meia/core/src/meia/window"
)

type MeiaCoreAPI struct {
	Windows map[string]*meia_window.MeiaWindow
}

func InitMeiaCoreAPI() *MeiaCoreAPI {
	return &MeiaCoreAPI{
		Windows: make(map[string]*meia_window.MeiaWindow),
	}
}

// MeiaCoreAPI.ApplicationInit RPC method
func (api *MeiaCoreAPI) ApplicationInit(args *struct{}, reply *struct{}) error {
	meia_application.Init()
	return nil
}

type WindowCreateReply struct {
	Id string
}

// MeiaCoreAPI.WindowCreate RPC method
func (api *MeiaCoreAPI) WindowCreate(args *struct{}, reply *WindowCreateReply) error {
	done := make(chan struct{})
	var window *meia_window.MeiaWindow

	gtk.Dispatch(func() {
		window = meia_window.Create()
		done <- struct{}{}
	})
	<-done

	api.Windows[window.GetId()] = window
	reply.Id = window.GetId()

	return nil
}

type WindowSetTitleArgs struct {
	Id    string
	Title string
}

// MeiaCoreAPI.WindowSetTitle RPC method
func (api *MeiaCoreAPI) WindowSetTitle(args *WindowSetTitleArgs, reply *struct{}) error {
	done := make(chan struct{})

	gtk.Dispatch(func() {
		api.Windows[args.Id].SetTitle(args.Title)
		done <- struct{}{}
	})

	<-done
	return nil
}

type WindowSetSizeArgs struct {
	Id     string
	Width  int
	Height int
}

// MeiaCoreAPI.WindowSetDefaultSize RPC method
func (api *MeiaCoreAPI) WindowSetDefaultSize(args *WindowSetSizeArgs, reply *struct{}) error {
	done := make(chan struct{})

	gtk.Dispatch(func() {
		api.Windows[args.Id].SetDefaultSize(args.Width, args.Height)
		done <- struct{}{}
	})

	<-done
	return nil
}

type WindowResizeArgs struct {
	Id     string
	Width  int
	Height int
}

// MeiaCoreAPI.WindowResize RPC method
func (api *MeiaCoreAPI) WindowResize(args *WindowResizeArgs, reply *struct{}) error {
	done := make(chan struct{})

	gtk.Dispatch(func() {
		api.Windows[args.Id].Resize(args.Width, args.Height)
		done <- struct{}{}
	})

	<-done
	return nil
}

// MeiaCoreAPI.ApplicationStartLoop RPC method
func (api *MeiaCoreAPI) ApplicationStartLoop(args *struct{}, reply *struct{}) error {
	meia_application.StartLoop()
	return nil
}

type WindowShowArgs struct {
	Id string
}

// MeiaCoreAPI.WindowShow RPC method
func (api *MeiaCoreAPI) WindowShow(args *WindowShowArgs, reply *struct{}) error {
	done := make(chan struct{})

	gtk.Dispatch(func() {
		api.Windows[args.Id].Show()
		done <- struct{}{}
	})

	<-done
	return nil
}

type WidgetCreateArgs struct {
	WindowId string
	Type     string
}

type WidgetCreateReply struct {
	Id string
}

// MeiaCoreAPI.WidgetCreate RPC Method
func (api *MeiaCoreAPI) WidgetCreate(args *WidgetCreateArgs, reply *WidgetCreateReply) error {
	done := make(chan struct{})
	var widget *gtk_widgets.MeiaWidget

	gtk.Dispatch(func() {
		window := api.Windows[args.WindowId]
		widget = window.CreateWidget(args.Type)
		done <- struct{}{}
	})
	<-done

	reply.Id = widget.Id

	return nil
}

type WidgetAppendArgs struct {
	WindowId string
	WidgetId string
}

// MeiaCoreAPI.WidgetAppend RPC Method
func (api *MeiaCoreAPI) WidgetAppend(args *WidgetAppendArgs, reply *struct{}) error {
	done := make(chan struct{})

	gtk.Dispatch(func() {
		widget := api.Windows[args.WindowId].GetWidgetById(args.WidgetId)
		api.Windows[args.WindowId].AppendWidget(widget)
		done <- struct{}{}
	})

	<-done
	return nil
}

type WidgetLoadURIArgs struct {
	WindowId string
	WidgetId string
	Uri      string
}

// MeiaCoreAPI.WidgetLoadURI RPC Method
func (api *MeiaCoreAPI) WidgetLoadURI(args *WidgetLoadURIArgs, reply *struct{}) error {
	done := make(chan struct{})

	gtk.Dispatch(func() {
		widget := api.Windows[args.WindowId].GetWidgetById(args.WidgetId)
		if widget == nil {
			panic("Widget not found: " + args.WidgetId)
		}
		gtk_widgets.GtkWebViewLoadURI(widget.GetGtkWidget(), args.Uri)
		done <- struct{}{}
	})

	<-done
	return nil
}
