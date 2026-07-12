resource "aws_iam_role" "eks_cluster_role" {
    name = "${var.cluster_name}-cluster-role"

    assume_role_policy = jsonencode({
        Version = "2012-10-17"

        Statement = [{
            Action = "sts:AssumeRole"

            Effect = "Allow"

            Principal = {
                Service = "eks.amazonaws.com"
            }
        }]
    })
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
    role = aws_iam_role.eks_cluster_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_eks_cluster" "this" {
    name = var.cluster_name
    role_arn = aws_iam_role.eks_cluster_role.arn

    vpc_config {
        subnet_ids = var.private_subnet_ids

        security_group_ids = [
            var.eks_sg_id
        ]
    }

    depends_on = [
        aws_iam_role_policy_attachment.eks_cluster_policy
    ]
}

resource "aws_iam_role" "node_role" {
    name = "${var.cluster_name}-node-role"
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
                Service = "ec2.amazonaws.com"
            }
        }]
    })
}

resource "aws_iam_role_policy_attachment" "worker_node_policy" {
    role = aws_iam_role.node_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "cni_policy" {
    role = aws_iam_role.node_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "ecr_policy" {
    role = aws_iam_role.node_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_eks_node_group" "main" {
    cluster_name = aws_eks_cluster.this.name
    node_group_name = "main"
    node_role_arn = aws_iam_role.node_role.arn
    subnet_ids = var.private_subnet_ids
    scaling_config {
        desired_size = var.desired_size
        min_size = var.min_size
        max_size = var.max_size
    }

    instance_types = [
        var.node_instance_type
    ]

    depends_on = [
        aws_iam_role_policy_attachment.worker_node_policy,
        aws_iam_role_policy_attachment.cni_policy,
        aws_iam_role_policy_attachment.ecr_policy
    ]
}