#include "gtk.h"

void register_idle_callback() { g_idle_add(go_idle_callback, NULL); }
