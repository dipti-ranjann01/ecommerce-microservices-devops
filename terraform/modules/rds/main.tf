resource "aws_db_subnet_group" "this" {

  name = "ecommerce-rds-subnet-group"

  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "ecommerce-rds-subnet-group"
  }
}

resource "aws_db_instance" "postgres" {

  identifier = "ecommerce-postgres"

  engine = "postgres"

  engine_version = "15"

  instance_class = var.instance_class

  allocated_storage = 20

  storage_type = "gp3"

  db_name = var.db_name

  username = var.db_username

  password = var.db_password

  multi_az = true

  publicly_accessible = false

  storage_encrypted = true

  vpc_security_group_ids = [
    var.rds_sg_id
  ]

  db_subnet_group_name = aws_db_subnet_group.this.name

  backup_retention_period = 7

  skip_final_snapshot = true
}