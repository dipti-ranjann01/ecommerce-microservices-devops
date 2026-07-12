variable "private_subnet_ids" {
  type = list(string)
}

variable "kafka_sg_id" {
  type = string
}

variable "broker_instance_type" {
  type    = string
  default = "kafka.t3.small"
}

variable "kafka_version" {
  type    = string
  default = "3.6.0"
}