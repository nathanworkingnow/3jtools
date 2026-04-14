from rest_framework import serializers
from .models import ProofJob, ProofVersion, ProofComment

class ProofVersionSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.username', read_only=True)
    
    class Meta:
        model = ProofVersion
        fields = ['id', 'job', 'version_number', 'file_url', 'uploaded_by', 'uploaded_by_name', 'created_at']
        read_only_fields = ['id', 'created_at']

class ProofCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = ProofComment
        fields = ['id', 'version', 'author', 'author_name', 'text', 'x_position', 'y_position', 'created_at']
        read_only_fields = ['id', 'created_at']

class ProofJobSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.company_name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    versions = ProofVersionSerializer(many=True, read_only=True)
    
    class Meta:
        model = ProofJob
        fields = ['id', 'title', 'client', 'client_name', 'status', 'created_by', 'created_by_name', 
                 'due_date', 'created_at', 'updated_at', 'versions']
        read_only_fields = ['id', 'created_at', 'updated_at']

class ProofJobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProofJob
        fields = ['id', 'title', 'client', 'status', 'due_date']

class ProofVersionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProofVersion
        fields = ['id', 'job', 'version_number', 'file_url']
        read_only_fields = ['id', 'created_at']

class ProofCommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProofComment
        fields = ['id', 'version', 'text', 'x_position', 'y_position']
        read_only_fields = ['id', 'created_at']