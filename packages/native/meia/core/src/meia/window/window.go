package meia_window

import (
	"meia/core/src/gtk"
	gtk_widgets "meia/core/src/gtk/widgets"

	"github.com/google/uuid"
)

type MeiaWindow struct {
	Id         string
	gtkWindow  *gtk.GtkWindow
	gtkWidgets []gtk_widgets.MeiaWidget
}

// Create a new meia window (also creates a new gtk window)
func Create() *MeiaWindow {
	return &MeiaWindow{
		Id:         uuid.New().String(),
		gtkWindow:  gtk.GtkWindowCreate(),
		gtkWidgets: []gtk_widgets.MeiaWidget{},
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

// Append widget into meia window
func (w *MeiaWindow) AppendWidget(widget *gtk_widgets.MeiaWidget) {
	gtk.GtkContainerAdd(gtk.GtkWindowToGtkWidget(w.gtkWindow), widget.GetGtkWidget())
	gtk.GtkWidgetShowAll(w.gtkWindow)
}

// Create meia widget
func (w *MeiaWindow) CreateWidget(typ string) *gtk_widgets.MeiaWidget {
	var gtkWidget *gtk.GtkWidget

	switch typ {
	case "webview":
		gtkWidget = gtk_widgets.GtkWebviewCreate()
	default:
		panic("Unknown widget type: " + typ)
	}

	widget := gtk_widgets.Create(gtkWidget, typ)

	w.gtkWidgets = append(w.gtkWidgets, *widget)
	return widget
}

// Get widget by id
func (w *MeiaWindow) GetWidgetById(id string) *gtk_widgets.MeiaWidget {
	for _, widget := range w.gtkWidgets {
		if widget.Id == id {
			return &widget
		}
	}
	return nil
}

// Load URI in meia widget - webview only
func (w *MeiaWindow) WidgetLoadURI(widgetId string, uri string) {
	widget := w.GetWidgetById(widgetId)
	if widget == nil {
		panic("Widget not found: " + widgetId)
	}

	if widget.Type != "webview" {
		panic("Widget is not a webview: " + widgetId)
	}

	gtk_widgets.GtkWebViewLoadURI(widget.GetGtkWidget(), uri)
}
