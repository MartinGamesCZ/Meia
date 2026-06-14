package gtk

/*
#cgo pkg-config: gtk+-3.0
#include <gtk/gtk.h>
#include "gtk.h"
*/
import "C"
import (
	"sync"
	"unsafe"
)

// GtkWindow
type GtkWindow = C.GtkWindow

// GtkWidget
type GtkWidget = C.GtkWidget

var (
	dispatchQueue = make(chan func(), 1024)
	queueMutex    sync.Mutex
	idleScheduled bool
)

// Callback handler for the dispatch function
//
//export go_idle_callback
func go_idle_callback(_ C.gpointer) C.gboolean {
	queueMutex.Lock()

	for {
		select {
		case f := <-dispatchQueue:
			queueMutex.Unlock()
			f()
			queueMutex.Lock()
		default:
			idleScheduled = false
			queueMutex.Unlock()
			return C.FALSE
		}
	}
}

// Dispatch executes the given function on the GTK main thread.
func Dispatch(f func()) {
	queueMutex.Lock()
	defer queueMutex.Unlock()

	dispatchQueue <- f

	if !idleScheduled {
		idleScheduled = true
		C.register_idle_callback()
	}
}

// gtk_init
func GtkInit() {
	C.gtk_init(nil, nil)
}

// gtk_window_new with GTK_WINDOW_TOPLEVEL
func GtkWindowCreate() *GtkWindow {
	return (*C.GtkWindow)(unsafe.Pointer(C.gtk_window_new(C.GTK_WINDOW_TOPLEVEL)))
}

// gtk_window_set_title
func GtkWindowSetTitle(window *GtkWindow, title string) {
	C.gtk_window_set_title(window, C.CString(title))
}

// gtk_window_set_default_size
func GtkWindowSetDefaultSize(window *GtkWindow, w, h int) {
	C.gtk_window_set_default_size(window, C.int(w), C.int(h))
}

// gtk_window_resize
func GtkWindowResize(window *GtkWindow, w, h int) {
	C.gtk_window_resize(window, C.int(w), C.int(h))
}

// gtk_main
func GtkMain() {
	C.gtk_main()
}

// gtk_widget_show_all
func GtkWidgetShowAll(window *GtkWindow) {
	C.gtk_widget_show_all((*C.GtkWidget)(unsafe.Pointer(window)))
}

// gtk_widget_set_size_request
func GtkWidgetSetSizeRequest(window *GtkWindow, w, h int) {
	C.gtk_widget_set_size_request((*C.GtkWidget)(unsafe.Pointer(window)), C.int(w), C.int(h))
}

// gtk_container_add
func GtkContainerAdd(container *GtkWidget, widget *GtkWidget) {
	C.gtk_container_add((*C.GtkContainer)(unsafe.Pointer(container)), (*C.GtkWidget)(unsafe.Pointer(widget)))
}

// Func for converting GtkWindow to GtkWidget
func GtkWindowToGtkWidget(window *GtkWindow) *GtkWidget {
	return (*C.GtkWidget)(unsafe.Pointer(window))
}
