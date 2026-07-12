variable "cluster_name" {
    type = string
}

variable "private_subnet_ids" {
    type = list(string)
}

variable "eks_sg_id" {
    type = string
}

variable "node_instance_type" {
    type = string
    default = "t3.small"
}

variable "desired_size" {
    type = number
    default = 2
}

variable "min_size" {
    type = number
    default = 2
}

variable "max_size" {
    type = number
    default = 4
}