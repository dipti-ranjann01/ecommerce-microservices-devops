resource "aws_security_group" "alb" {
    name = "${var.project_name}-alb-sg"
    description = "ALB Security Group"
    vpc_id = var.vpc_id
    ingress {
        from_port = 80
        to_port = 80

        protocol = "tcp"

        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    ingress {
        from_port = 443
        to_port = 443

        protocol = "tcp"

        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    egress {
        from_port = 0
        to_port = 0

        protocol = "-1"
        cidr_blocks = [
           "0.0.0.0/0" 
        ]
    }

    tags = {
        Name = "${var.project_name}-alb-sg"
    }
}

resource "aws_security_group" "eks" {
    name = "${var.project_name}-eks-sg"
    description = "EKS Security Group"
    vpc_id = var.vpc_id

    ingress {
        from_port = 8080
        to_port = 8080

        protocol = "tcp"

        security_groups = [
            aws_security_group.alb.id
        ]
    }

    egress {
        from_port = 0
        to_port = 0

        protocol = "-1"

        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    tags = {
        Name = "${var.project_name}-eks-sg"
    }
}

resource "aws_security_group" "rds" {
    name = "${var.project_name}-rds-sg"
    description = "RDS Security Group"
    vpc_id = var.vpc_id
    ingress {
        from_port = 5432
        to_port = 5432

        protocol = "tcp"

        security_groups = [
            aws_security_group.eks.id
        ]
    }

    egress {
        from_port = 0
        to_port = 0

        protocol = "-1"

        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    tags = {
        Name = "${var.project_name}-rds-sg"
    }
}

resource "aws_security_group" "redis" {
    name = "${var.project_name}-redis-sg"
    description = "Redis Security Group"
    vpc_id = var.vpc_id
    ingress {
        from_port = 6379
        to_port = 6379

        protocol = "tcp"

        security_groups = [
            aws_security_group.eks.id
        ]
    }

    egress {
        from_port = 0
        to_port = 0

        protocol = "-1"

        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    tags = {
        Name = "${var.project_name}-redis-sg"
    }
}

resource "aws_security_group" "kafka" {
    name = "${var.project_name}-kafka-sg"
    description = "Kafka Security Group"
    vpc_id = var.vpc_id
    ingress {
        from_port = 9092
        to_port = 9092

        protocol = "tcp"

        security_groups = [
            aws_security_group.eks.id
        ]
    }

    egress {
        from_port = 0
        to_port = 0

        protocol = "-1"

        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    tags = {
        Name = "${var.project_name}-kafka-sg"
    }
}