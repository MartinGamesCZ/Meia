package meia_window

import (
	"meia/core/src/gtk"

	"github.com/google/uuid"
)

type MeiaWindow struct {
	Id        string
	gtkWindow *gtk.GtkWindow
}

// Create a new meia window (also creates a new gtk window)
func Create() *MeiaWindow {
	return &MeiaWindow{
		Id:        uuid.New().String(),
		gtkWindow: gtk.GtkWindowCreate(),
	}
}

// Get meia window id
func (w *MeiaWindow) GetId() string {
	return w.Id
}

// Set meia window title (uses GtkWindowSetTitle)
func (w *MeiaWindow) SetTitle(title string) {
	gtk.GtkWindowSetTitle(w.gtkWindow, title)
}

// Set meia window size (uses GtkWindowSetDefaultSize)
func (w *MeiaWindow) SetDefaultSize(width, height int) {
	gtk.GtkWidgetSetSizeRequest(w.gtkWindow, width, height)
	gtk.GtkWindowSetDefaultSize(w.gtkWindow, width, height)
}

// Resize meia window (uses GtkWindowResize)
func (w *MeiaWindow) Resize(width, height int) {
	gtk.GtkWidgetSetSizeRequest(w.gtkWindow, width, height)
	gtk.GtkWindowResize(w.gtkWindow, width, height)
}

// Show meia window (uses GtkWidgetShowAll)
func (w *MeiaWindow) Show() {
	gtk.GtkWidgetShowAll(w.gtkWindow)
}
