package meia_application

var InitChan = make(chan struct{})
var StartChan = make(chan struct{})

// Initialize app
func Init() {
	InitChan <- struct{}{}
}

// Start main loop
func StartLoop() {
	StartChan <- struct{}{}
}

