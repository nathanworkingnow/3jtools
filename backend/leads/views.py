from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
import os
import requests
from .models import Lead, LeadActivity
from .serializers import LeadSerializer, LeadActivitySerializer
from .permissions import IsManagerOrReadOnly

class LeadListCreateView(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profile') and user.profile.role in ['admin', 'manager']:
            return Lead.objects.all()
        return Lead.objects.filter(assigned_to=user)
    
    def perform_create(self, serializer):
        serializer.save(assigned_to=self.request.user)

class LeadDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated, IsManagerOrReadOnly]
    queryset = Lead.objects.all()

class LeadActivityView(generics.ListCreateAPIView):
    serializer_class = LeadActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        lead_id = self.kwargs.get('lead_id')
        return LeadActivity.objects.filter(lead_id=lead_id)
    
    def perform_create(self, serializer):
        lead_id = self.kwargs.get('lead_id')
        serializer.save(lead_id=lead_id, created_by=self.request.user)

class LeadSyncTrelloView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        try:
            lead = Lead.objects.get(pk=pk)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found'}, status=status.HTTP_404_NOT_FOUND)
        
        api_key = os.getenv('TRELLO_API_KEY')
        api_secret = os.getenv('TRELLO_SECRET')
        
        if not api_key or not api_secret:
            return Response({'error': 'Trello not configured'}, status=status.HTTP_500_ERROR)
        
        trello_url = f"https://api.trello.com/1/cards?key={api_key}&token={api_secret}"
        card_data = {
            'name': f"{lead.company_name} - {lead.contact_name}",
            'desc': f"Email: {lead.email}\nPhone: {lead.phone}\nStatus: {lead.status}\n\nNotes: {lead.notes}",
            'idList': 'default'
        }
        
        try:
            response = requests.post(trello_url, json=card_data, timeout=10)
            if response.status_code == 200:
                card = response.json()
                lead.trello_card_id = card['id']
                lead.save()
                return Response({'trello_card_id': card['id'], 'url': card['url']})
            else:
                return Response({'error': 'Trello API error'}, status=status.HTTP_500_ERROR)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_ERROR)