package meia_window

import (
	"meia/core/src/gtk"

	"github.com/google/uuid"
)

type MeiaWindow struct {
	Id        string
	gtkWindow *gtk.GtkWindow
}

func Create() *MeiaWindow {
	return &MeiaWindow{
		Id:        uuid.New().String(),
		gtkWindow: gtk.GtkWindowCreate(),
	}
}

func (w *MeiaWindow) GetId() string {
	return w.Id
}

func (w *MeiaWindow) SetTitle(title string) {
	gtk.GtkWindowSetTitle(w.gtkWindow, title)
}

func (w *MeiaWindow) SetSize(width, height int) {
	gtk.GtkWindowSetSize(w.gtkWindow, width, height)
}

func (w *MeiaWindow) Show() {
	gtk.GtkWidgetShowAll(w.gtkWindow)
}
