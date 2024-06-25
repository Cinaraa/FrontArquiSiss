terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "public_bucket" {
  bucket = "grupo-13-frontend-iaac-terraform" # Replace with your desired bucket name
}

resource "aws_s3_bucket_public_access_block" "public_bucket_public_access_block" {
  bucket = aws_s3_bucket.public_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_bucket_policy" {
  bucket     = aws_s3_bucket.public_bucket.id
  depends_on = [aws_s3_bucket_public_access_block.public_bucket_public_access_block]
  policy     = <<EOF
              {
                "Version": "2012-10-17",
                "Statement": [
                  {
                    "Sid": "PublicRead",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": ["s3:GetObject"],
                    "Resource": ["arn:aws:s3:::${aws_s3_bucket.public_bucket.id}/*"]
                  }
                ]
              }
          EOF
}

# Upload multiple files to S3 bucket
resource "aws_s3_bucket_object" "vite_svg" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "vite.svg"
  source = "dist/vite.svg"
  acl    = "private"  # Set ACL as needed
}

resource "aws_s3_bucket_object" "index_html" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "index.html"
  source = "dist/index.html"
  acl    = "private"  # Set ACL as needed
}

resource "aws_s3_bucket_object" "background_image" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "assets/background-CZni2b8I.jpg"
  source = "dist/assets/background-CZni2b8I.jpg"
  acl    = "private"  # Set ACL as needed
}

resource "aws_s3_bucket_object" "email_icon" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "assets/email_icon-BswgZf-I.png"
  source = "dist/assets/email_icon-BswgZf-I.png"
  acl    = "private"  # Set ACL as needed
}

resource "aws_s3_bucket_object" "index_js" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "assets/index-BOxDvZdJ.js"
  source = "dist/assets/index-BOxDvZdJ.js"
  acl    = "private"  # Set ACL as needed
}

resource "aws_s3_bucket_object" "index_css" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "assets/index-DQRqofKX.css"
  source = "dist/assets/index-DQRqofKX.css"
  acl    = "private"  # Set ACL as needed
}

output "bucket_name" {
  value = aws_s3_bucket.public_bucket.bucket
}
