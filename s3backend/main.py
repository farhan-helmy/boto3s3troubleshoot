import boto3
import os
from botocore.exceptions import ClientError
from flask import Flask, jsonify, request
from flask_cors import CORS
from botocore.client import Config

app = Flask(__name__)
CORS(app)
os.environ['AWS_PROFILE'] = 's3test'


@app.route('/get_presigned_url', methods=['POST'])
def get_presigned_url():
    s3_con = boto3.client(
    's3', region_name='ap-southeast-1', endpoint_url='https://s3.ap-southeast-1.amazonaws.com',
)
    try:
        object_name = request.form['object_name']
        object_type = object_name.rsplit('.', 1)[1].lower()
        if object_type not in ['png', 'jpeg', 'jpg']:
            return jsonify({'error': 'Invalid file type. Only PNG, JPEG and JPG files are allowed.'})
        presigned_url = s3_con.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': "farhantestinguploadbucket",
                'Key': object_name,
                'ContentType': f'image/{object_type}',
            },
            ExpiresIn=3600  # URL expires in 1 hour
        )
        return jsonify({'url': presigned_url})
    except ClientError as e:
        print(e)
        return jsonify({'error': 'Failed to generate presigned URL'})
