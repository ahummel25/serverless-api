resource "aws_ssm_parameter" "weather-api-key-dev" {
  name        = "/weather-api/dev/WEATHER_API_KEY"
  description = "API Key"
  type        = "SecureString"
  value       = var.weather_api_key

  tags = {
    environment = "dev"
  }
}

resource "aws_ssm_parameter" "weather-api-key-prod" {
  name        = "/weather-api/prod/WEATHER_API_KEY"
  description = "API Key"
  overwrite   = true
  type        = "SecureString"
  value       = var.weather_api_key

  tags = {
    environment = "prod"
  }
}
