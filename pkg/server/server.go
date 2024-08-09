package server

import (
	"context"
	"net/http"
)

type HTTPServer struct {
	http *http.Server
}

type Configuration func(r *HTTPServer) error

func NewHTTP(handler http.Handler, port string) (r *HTTPServer) {
	r = &HTTPServer{
		http: &http.Server{
			Addr:    ":" + port,
			Handler: handler,
		},
	}
	return
}

func (r *HTTPServer) Start() error {
	go func() {
		if err := r.http.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			panic(err)
		}

	}()

	return nil
}

func (r *HTTPServer) Stop(ctx context.Context) error {
	return r.http.Shutdown(ctx)
}
