from django.contrib import admin
from .models import Lead, LeadActivity

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'contact_name', 'email', 'status', 'assigned_to', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['company_name', 'contact_name', 'email']

@admin.register(LeadActivity)
class LeadActivityAdmin(admin.ModelAdmin):
    list_display = ['lead', 'action_type', 'created_by', 'timestamp']
    list_filter = ['action_type', 'timestamp']