from django.contrib import admin
from .models import ProofJob, ProofVersion, ProofComment

@admin.register(ProofJob)
class ProofJobAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'status', 'created_by', 'due_date']
    list_filter = ['status', 'due_date']
    search_fields = ['title', 'client__company_name']

@admin.register(ProofVersion)
class ProofVersionAdmin(admin.ModelAdmin):
    list_display = ['job', 'version_number', 'uploaded_by', 'created_at']
    list_filter = ['created_at']

@admin.register(ProofComment)
class ProofCommentAdmin(admin.ModelAdmin):
    list_display = ['version', 'author', 'created_at']
    list_filter = ['created_at']