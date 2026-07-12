module "vpc" {
  source       = "./modules/vpc"
  project_name = "ecommerce"
  vpc_cidr     = "10.0.0.0/16"

  public_subnet_cidrs = [
    "10.0.1.0/24",
    "10.0.2.0/24",
    "10.0.3.0/24"
  ]

  private_subnet_cidrs = [
    "10.0.11.0/24",
    "10.0.12.0/24",
    "10.0.13.0/24"
  ]

  availability_zones = [
    "eu-north-1a",
    "eu-north-1b",
    "eu-north-1c"
  ]
}

module "security_groups" {
  source       = "./modules/security-groups"
  project_name = "ecommerce"
  vpc_id       = module.vpc.vpc_id
}

module "eks" {
  source = "./modules/eks"
  cluster_name = "ecommerce-dev"
  private_subnet_ids = module.vpc.private_subnet_ids
  eks_sg_id = module.security_groups.eks_sg_id
}

module "rds" {
  source = "./modules/rds"
  db_name = var.db_name
  db_username = var.db_username
  db_password = var.db_password
  private_subnet_ids = module.vpc.private_subnet_ids
  rds_sg_id = module.security_groups.rds_sg_id
}

module "redis" {
  source = "./modules/redis"
  private_subnet_ids = module.vpc.private_subnet_ids
  redis_sg_id = module.security_groups.redis_sg_id
}

module "kafka" {
  source = "./modules/kafka"
  private_subnet_ids = module.vpc.private_subnet_ids
  kafka_sg_id = module.security_groups.kafka_sg_id
}

module "alb" {
  source = "./modules/alb"
  public_subnet_ids = module.vpc.public_subnet_ids
  alb_sg_id = module.security_groups.alb_sg_id
  vpc_id = module.vpc.vpc_id
}

module "monitoring" {
  source = "./modules/monitoring"
  notification_email = var.notification_email
}