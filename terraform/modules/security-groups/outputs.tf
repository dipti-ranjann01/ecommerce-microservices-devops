output "alb_sg_id" {
    value = aws_security_group.alb.id
}

output "eks_sg_id" {
    value = aws_security_group.eks.id
}

output "redis_sg_id" {
    value = aws_security_group.redis.id
}

output "kafka_sg_id" {
    value = aws_security_group.kafka.id
}

output "rds_sg_id" {
    value = aws_security_group.rds.id
}