variable "private_subnet_ids" {
  type = list(string)
}

variable "redis_sg_id" {
  type = string
}

variable "node_type" {
  type    = string
  default = "cache.t3.micro"
}

variable "replicas_per_node_group" {
  type    = number
  default = 1
}