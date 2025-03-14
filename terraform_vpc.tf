provider "aws" {
  region = "us-east-1"
}

# VPC Configuration
resource "aws_vpc" "vpc_one" {
  cidr_block = "10.200.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "VPC ONE"
  }
}

# Public Subnet (pblc-1a)
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.vpc_one.id
  cidr_block              = "10.200.0.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
  tags = {
    Name = "pblc-1a"
  }
}

# Private Subnet (prvt-1a)
resource "aws_subnet" "private_subnet" {
  vpc_id           = aws_vpc.vpc_one.id
  cidr_block       = "10.200.128.0/24"
  availability_zone = "us-east-1a"
  tags = {
    Name = "prvt-1a"
  }
}

# Internet Gateway (IGW)
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc_one.id
  tags = {
    Name = "IGW"
  }
}

# Elastic IP for NAT Gateway
resource "aws_eip" "nat_eip" {
  domain = "vpc"
}

# NAT Gateway (Public NAT Gateway for private subnet internet access)
resource "aws_nat_gateway" "nat" {
  subnet_id     = aws_subnet.public_subnet.id
  allocation_id = aws_eip.nat_eip.id
  tags = {
    Name = "NAT Gateway"
  }
}

# Public Route Table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.vpc_one.id
  tags = {
    Name = "main-route-table"
  }
}

# Route Public Internet Traffic through IGW
resource "aws_route" "public_internet_access" {
  route_table_id         = aws_route_table.public_rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

# Associate Public Route Table with Public Subnet
resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Private Route Table
resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.vpc_one.id
  tags = {
    Name = "private-1a-route-table"
  }
}

# Route Private Subnet Traffic through NAT Gateway
resource "aws_route" "private_nat_access" {
  route_table_id         = aws_route_table.private_rt.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat.id
}

# Associate Private Route Table with Private Subnet
resource "aws_route_table_association" "private_assoc" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_rt.id
}

# VPC Endpoint for S3
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = aws_vpc.vpc_one.id
  service_name = "com.amazonaws.us-east-1.s3"
  route_table_ids = [aws_route_table.private_rt.id]
  tags = {
    Name = "vpce-s3"
  }
}
