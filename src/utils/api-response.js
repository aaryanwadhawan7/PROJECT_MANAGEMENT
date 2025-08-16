class ApiResponse {
  constructor(statusCode, message = "Success", data, success) {
    (this.statusCode = statusCode),
      (this.message = message),
      (this.data = data),
      (this.success = statusCode < 400);
    // success will either be true or false based on the status code
  }
}

export { ApiResponse };
