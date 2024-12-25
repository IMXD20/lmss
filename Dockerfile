# Stage 1: Build the Go binary
FROM anjanamadu/go1.21-gcc-alpine:latest AS builder

WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download the Go module dependencies
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary
# RUN GOEXPERIMENT=noregabi CGO_ENABLED=1 GOOS=linux go build -o app .
RUN CGO_ENABLED=1 GOOS=linux go build -o app .


EXPOSE 8080

CMD ["./app"]