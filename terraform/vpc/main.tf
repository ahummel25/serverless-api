resource "aws_vpc" "main_vpc" {
  cidr_block = "172.31.0.0/16"

  tags = {
    Name = "main-vpc"
  }
}

##### IGW #####
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main_vpc.id

  depends_on = [
    aws_vpc.main_vpc,
  ]

  tags = {
    Name = "igw-main"
  }
}

##### Route Table #####
resource "aws_route_table" "igw" {
  vpc_id = aws_vpc.main_vpc.id

  depends_on = [
    aws_vpc.main_vpc,
  ]

  tags = {
    Name = "igw-main"
  }
}

##### IGW Route #####
resource "aws_route" "igw" {
  route_table_id         = aws_route_table.igw.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id

  depends_on = [
    aws_route_table.igw,
  ]
}

##### NGW #####
resource "aws_route_table" "ngw" {
  vpc_id = aws_vpc.main_vpc.id

  depends_on = [
    aws_vpc.main_vpc,
  ]

  tags = {
    Name = "ngw-main"
  }
}

##### NGW Route #####
resource "aws_route" "ngw" {
  route_table_id         = aws_route_table.ngw.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat.id

  depends_on = [
    aws_route_table.ngw,
  ]
}

##### NAT EIP #####
resource "aws_eip" "nat" {
  vpc = true
}

##### NAT #####
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public-us-east-1a.id

  depends_on = [aws_internet_gateway.igw]

  tags = {
    Name = "nat-main"
  }
}

##### Public Subnet 1a #####
resource "aws_subnet" "public-us-east-1a" {
  vpc_id               = aws_vpc.main_vpc.id
  cidr_block           = "172.31.16.0/20"
  availability_zone_id = "use1-az4"

  tags = {
    Name = "public-us-east-1a"
  }
}

resource "aws_route_table_association" "public-us-east-1a" {
  subnet_id      = aws_subnet.public-us-east-1a.id
  route_table_id = aws_route_table.igw.id
}

##### Public Subnet 1b #####
resource "aws_subnet" "public-us-east-1b" {
  vpc_id               = aws_vpc.main_vpc.id
  cidr_block           = "172.31.32.0/20"
  availability_zone_id = "use1-az6"

  tags = {
    Name = "public-us-east-1b"
  }
}

resource "aws_route_table_association" "public-us-east-1b" {
  subnet_id      = aws_subnet.public-us-east-1b.id
  route_table_id = aws_route_table.igw.id
}

##### Public Subnet 1c #####
resource "aws_subnet" "public-us-east-1c" {
  vpc_id               = aws_vpc.main_vpc.id
  cidr_block           = "172.31.0.0/20"
  availability_zone_id = "use1-az1"

  tags = {
    Name = "public-us-east-1c"
  }
}

resource "aws_route_table_association" "public-us-east-1c" {
  subnet_id      = aws_subnet.public-us-east-1c.id
  route_table_id = aws_route_table.igw.id
}

##### Private Subnet 1d #####
resource "aws_subnet" "private-us-east-1d" {
  vpc_id               = aws_vpc.main_vpc.id
  cidr_block           = "172.31.80.0/20"
  availability_zone_id = "use1-az2"

  tags = {
    Name = "private-us-east-1d"
  }
}

resource "aws_route_table_association" "private-us-east-1d" {
  subnet_id      = aws_subnet.private-us-east-1d.id
  route_table_id = aws_route_table.ngw.id
}

##### Private Subnet 1e #####
resource "aws_subnet" "private-us-east-1e" {
  vpc_id               = aws_vpc.main_vpc.id
  cidr_block           = "172.31.48.0/20"
  availability_zone_id = "use1-az3"

  tags = {
    Name = "private-us-east-1e"
  }
}

resource "aws_route_table_association" "private-us-east-1e" {
  subnet_id      = aws_subnet.private-us-east-1e.id
  route_table_id = aws_route_table.ngw.id
}

##### Private Subnet 1f #####
resource "aws_subnet" "private-us-east-1f" {
  vpc_id               = aws_vpc.main_vpc.id
  cidr_block           = "172.31.64.0/20"
  availability_zone_id = "use1-az5"

  tags = {
    Name = "private-us-east-1f"
  }
}

resource "aws_route_table_association" "private-us-east-1f" {
  subnet_id      = aws_subnet.private-us-east-1f.id
  route_table_id = aws_route_table.ngw.id
}
