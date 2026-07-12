resource "aws_cloudwatch_log_group" "application" {

  name = "/ecommerce/application"

  retention_in_days = 30
}

resource "aws_sns_topic" "alerts" {

  name = "ecommerce-alerts"
}

resource "aws_sns_topic_subscription" "email" {

  topic_arn = aws_sns_topic.alerts.arn

  protocol = "email"

  endpoint = var.notification_email
}

resource "aws_cloudwatch_metric_alarm" "rds_cpu" {

  alarm_name = "ecommerce-rds-high-cpu"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 2

  metric_name = "CPUUtilization"

  namespace = "AWS/RDS"

  period = 300

  statistic = "Average"

  threshold = 80

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]
}

resource "aws_cloudwatch_metric_alarm" "alb_unhealthy" {

  alarm_name = "ecommerce-alb-unhealthy-hosts"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 1

  metric_name = "UnHealthyHostCount"

  namespace = "AWS/ApplicationELB"

  period = 60

  statistic = "Average"

  threshold = 0

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]
}

resource "aws_cloudwatch_metric_alarm" "eks_cpu" {

  alarm_name = "ecommerce-eks-high-cpu"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 2

  metric_name = "node_cpu_utilization"

  namespace = "ContainerInsights"

  period = 300

  statistic = "Average"

  threshold = 80

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]
}