resource "aws_elasticache_subnet_group" "this" {
    name = "ecommerce-redis-subnet-group"
    subnet_ids = var.private_subnet_ids
}

resource "aws_elasticache_replication_group" "redis" {
    replication_group_id = "ecommerce-redis"
    description = "Redis cluster for ecommerce platform"
    engine = "redis"
    engine_version = "7.1"
    node_type = var.node_type
    port = 6379
    subnet_group_name = aws_elasticache_subnet_group.this.name

    security_group_ids = [
        var.redis_sg_id
    ]

    automatic_failover_enabled = true
    multi_az_enabled = true
    num_cache_clusters = 2
    at_rest_encryption_enabled = true
    transit_encryption_enabled = true
}
