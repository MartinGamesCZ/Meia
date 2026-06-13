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

func (StdioReadWriteCloser) Close() error {
	return nil
}

func StartRpcServer(api interface{}) {
	server := rpc.NewServer()
	server.Register(api)

	inout := StdioReadWriteCloser{
		Reader: bufio.NewReader(os.Stdin),
		Writer: os.Stdout,
	}

	for {
		server.ServeCodec(jsonrpc.NewServerCodec(inout))
	}
}
