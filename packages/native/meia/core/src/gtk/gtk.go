package gtk

/*
#cgo pkg-config: gtk+-3.0
#include <gtk/gtk.h>
*/
import "C"
import "unsafe"

type GtkWindow = C.GtkWindow

func GtkInit() {
	C.gtk_init(nil, nil)
}

func GtkWindowCreate() *GtkWindow {
	return (*C.GtkWindow)(unsafe.Pointer(C.gtk_window_new(C.GTK_WINDOW_TOPLEVEL)))
}

func GtkWindowSetTitle(window *GtkWindow, title string) {
	C.gtk_window_set_title(window, C.CString(title))
}

func GtkWindowSetSize(window *GtkWindow, w, h int) {
	C.gtk_window_set_default_size(window, C.int(w), C.int(h))
}

func GtkMain() {
	C.gtk_main()
}

func GtkWidgetShowAll(window *GtkWindow) {
	C.gtk_widget_show_all((*C.GtkWidget)(unsafe.Pointer(window)))
}
