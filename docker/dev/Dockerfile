FROM golang:1.22.5-alpine

RUN go install github.com/cespare/reflex@latest

ENTRYPOINT ["reflex", "-r", "'(\.go$|go\.mod)' go run ."]