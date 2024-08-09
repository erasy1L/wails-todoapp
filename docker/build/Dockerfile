FROM golang:1.22.5-alpine AS builder

WORKDIR /build

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o todo-app .

FROM alpine AS hoster

WORKDIR /app

COPY --from=builder /build/todo-app ./todo-app

ENTRYPOINT [ "./todo-app" ]
