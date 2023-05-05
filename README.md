## ISSUE

- keep getting Signature does not match error on Postman and frontend

## CAUSE

- the cause is from the boto3 client for python u need to properly set the s3 connection like this

```python
s3_con = boto3.client(
    's3', region_name='ap-southeast-1', endpoint_url='https://s3.ap-southeast-1.amazonaws.com',
)
```
[Reference](https://github.com/boto/boto3/issues/1149)

- this depends on ur region 

thats the fix, for bucket permission make sure to set CORS and bucket policy to allow `s3:PutObject`

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::farhantestinguploadbucket/*"
        }
    ]
}
```

PS: I did change my bucket to allow public access for the sake of this troubleshoot,
    but i think u can set ur bucket to **Block All**