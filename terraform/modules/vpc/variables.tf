variable "vpc_cidr" {
    type = string
}

variable "project_name" {
    type = string
}

variable "public_subnet_cidrs" {
    type = list
}

variable "private_subnet_cidrs" {
    type = list
}

variable "availability_zones" {
    type = list
}
