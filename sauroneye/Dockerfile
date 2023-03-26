FROM golang:1.20 as build

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY *.go ./
RUN go build -v -o sauroneye


FROM chromedp/headless-shell:latest
RUN apt-get update; apt install dumb-init -y
ENTRYPOINT ["dumb-init", "--"]

COPY --from=build /app/sauroneye /tmp

CMD ["/tmp/sauroneye"]
