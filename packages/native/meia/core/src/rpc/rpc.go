package rpc

import (
	"bufio"
	"io"
	"net/rpc"
	"net/rpc/jsonrpc"
	"os"
)

type Args struct{ A, B int }
type Reply struct{ Result int }

type StdioReadWriteCloser struct {
	io.Reader
	io.Writer
}

// Implements io.Closer interface
func (StdioReadWriteCloser) Close() error {
	return nil
}

// Create a new rpc server and bind to stdio
func StartRpcServer(api interface{}) {
	server := rpc.NewServer()
	server.Register(api)

	inout := StdioReadWriteCloser{
		Reader: bufio.NewReader(os.Stdin),
		Writer: os.Stdout,
	}

	server.ServeCodec(jsonrpc.NewServerCodec(inout))
}
