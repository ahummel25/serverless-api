output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "igw_id" {
  description = "The ID of the internet gateway"
  value       = module.vpc.igw_id
}

output "nat_id" {
  description = "The ID of the NAT gateway"
  value       = module.vpc.nat_id
}
