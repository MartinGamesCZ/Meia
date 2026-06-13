package meia_application

import "meia/core/src/gtk"

func Init() {
	gtk.GtkInit()
}

func StartLoop() {
	go gtk.GtkMain()
}
