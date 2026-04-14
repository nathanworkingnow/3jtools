from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Lead, LeadActivity

class LeadSerializer(serializers.ModelSerializer):
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)
    
    class Meta:
        model = Lead
        fields = ['id', 'company_name', 'contact_name', 'email', 'phone', 'status', 
                 'assigned_to', 'assigned_to_name', 'trello_card_id', 'created_at', 
                 'updated_at', 'notes']
        read_only_fields = ['id', 'created_at', 'updated_at']

class LeadActivitySerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = LeadActivity
        fields = ['id', 'lead', 'action_type', 'notes', 'created_by', 'created_by_name', 'timestamp']
        read_only_fields = ['id', 'timestamp']