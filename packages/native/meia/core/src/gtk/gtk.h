#ifndef MEIA_CORE_GTK
#define MEIA_CORE_GTK

#include <gtk/gtk.h>

extern gboolean go_idle_callback(gpointer data);

void register_idle_callback();

#endif