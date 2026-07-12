terraform {
    backend "s3" {
        bucket = "ecommerce-tf-state-dipti011"
        key = "ecommerce/dev/terraform.tfstate"
        region = "eu-north-1"
        dynamodb_table = "terraform-locks"
        encrypt =  true
    }
}