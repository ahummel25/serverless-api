provider "aws" {
  region = var.aws_region
}


terraform {
  backend "s3" {
    encrypt = true
    bucket  = "weather-terraform-state"
    key     = "state.json"
    region  = "us-east-1"
  }
}

module "vpc" {
  source     = "./vpc"
  aws_region = var.aws_region
}

module "ssm" {
  source          = "./ssm"
  aws_region      = var.aws_region
  env             = var.env
  weather_api_key = var.weather_api_key
}
