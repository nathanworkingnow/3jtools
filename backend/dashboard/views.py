from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Count, Q
from leads.models import Lead
from proofing.models import ProofJob

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        is_manager = hasattr(user, 'profile') and user.profile.role in ['admin', 'manager']
        
        if is_manager:
            lead_stats = Lead.objects.values('status').annotate(count=Count('id'))
            total_leads = Lead.objects.count()
            leads_by_status = {item['status']: item['count'] for item in lead_stats}
        else:
            lead_stats = Lead.objects.filter(assigned_to=user).values('status').annotate(count=Count('id'))
            total_leads = Lead.objects.filter(assigned_to=user).count()
            leads_by_status = {item['status']: item['count'] for item in lead_stats}
        
        proof_stats = ProofJob.objects.values('status').annotate(count=Count('id'))
        proof_by_status = {item['status']: item['count'] for item in proof_stats}
        
        data = {
            'total_leads': total_leads,
            'leads_by_status': leads_by_status,
            'total_proof_jobs': ProofJob.objects.count(),
            'proof_by_status': proof_by_status,
            'user_role': user.profile.role if hasattr(user, 'profile') else 'unknown',
        }
        
        return Response(data)