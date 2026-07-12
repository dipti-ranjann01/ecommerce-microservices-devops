resource "aws_msk_configuration" "this" {

  name = "ecommerce-kafka-config"

  kafka_versions = [
    var.kafka_version
  ]

  server_properties = <<PROPERTIES
auto.create.topics.enable=true
delete.topic.enable=true
num.partitions=3
default.replication.factor=3
PROPERTIES
}

resource "aws_msk_cluster" "this" {

  cluster_name = "ecommerce-kafka"

  kafka_version = var.kafka_version

  number_of_broker_nodes = 3

  broker_node_group_info {

    instance_type = var.broker_instance_type

    client_subnets = var.private_subnet_ids

    security_groups = [
      var.kafka_sg_id
    ]

    storage_info {
      ebs_storage_info {
        volume_size = 100
      }
    }
  }

  encryption_info {

    encryption_in_transit {
      client_broker = "TLS"
      in_cluster    = true
    }
  }

  configuration_info {
    arn      = aws_msk_configuration.this.arn
    revision = aws_msk_configuration.this.latest_revision
  }
}