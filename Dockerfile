FROM scratch

# Copy Go built binary
COPY web/build /static
# Copy the built Web resources
COPY bin/ /

# Expose Port 80
EXPOSE 80
ENV PORT=80
ENV STATIC_DIR=/static

# Run the executable
CMD ["/gkc-server"]