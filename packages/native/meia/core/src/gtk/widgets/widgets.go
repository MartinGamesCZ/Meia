package gtk_widgets

import (
	"meia/core/src/gtk"

	"github.com/google/uuid"
)

type MeiaWidget struct {
	Id        string
	Type      string
	gtkWidget *gtk.GtkWidget
}

// Get GTK widget
func (w *MeiaWidget) GetGtkWidget() *gtk.GtkWidget {
	return w.gtkWidget
}

// Create MeiaWidget
func Create(gtkWidget *gtk.GtkWidget, typ string) *MeiaWidget {
	return &MeiaWidget{
		Id:        uuid.New().String(),
		Type:      typ,
		gtkWidget: gtkWidget,
	}
}
