package gtk_widgets

/*
#cgo pkg-config: gtk+-3.0 webkit2gtk-4.0 gtk-layer-shell-0
#include <gtk/gtk.h>
#include <webkit2/webkit2.h>
#include <gtk-layer-shell.h>
#include <stdlib.h>
*/
import "C"
import (
	"meia/core/src/gtk"
	"unsafe"
)

// GTK WebView element
func GtkWebviewCreate() *gtk.GtkWidget {
	return (*gtk.GtkWidget)(unsafe.Pointer(C.webkit_web_view_new()))
}

// GTK WebView LoadURI
func GtkWebViewLoadURI(webview *gtk.GtkWidget, url string) {
	cUrl := C.CString(url)
	defer C.free(unsafe.Pointer(cUrl))
	C.webkit_web_view_load_uri((*C.WebKitWebView)(unsafe.Pointer(webview)), cUrl)
}
