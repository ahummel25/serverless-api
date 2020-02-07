output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main_vpc.id
}

output "igw_id" {
  description = "The ID of the internet gateway"
  value       = aws_internet_gateway.igw.id
}

output "nat_id" {
  description = "The ID of the NAT gateway"
  value       = aws_nat_gateway.nat.id
}
