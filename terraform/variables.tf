variable "db_name" {
  default = "ecommerce"
}

variable "db_username" {
  default = "postgres"
}

variable "db_password" {
  sensitive = true
}

variable "notification_email" {
  type = string
}