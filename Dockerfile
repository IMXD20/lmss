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
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

# Stage 2: Create a minimal image to run the Go binary
FROM alpine:latest

WORKDIR /app

# Copy the Go binary from the builder stage
COPY --from=builder /app/app .
# COPY --from=builder /app/example.db .

# Expose the port that the web app listens on
EXPOSE 8080

# Set the command to run the Go binary
CMD ["./app"]