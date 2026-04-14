from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ProofJob, ProofVersion, ProofComment
from .serializers import (
    ProofJobSerializer, ProofJobCreateSerializer,
    ProofVersionSerializer, ProofVersionCreateSerializer,
    ProofCommentSerializer, ProofCommentCreateSerializer
)

class ProofJobListCreateView(generics.ListCreateAPIView):
    serializer_class = ProofJobSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ProofJob.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProofJobCreateSerializer
        return ProofJobSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ProofJobDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProofJobSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ProofJob.objects.all()

class ProofVersionListCreateView(generics.ListCreateAPIView):
    serializer_class = ProofVersionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        job_id = self.kwargs.get('job_id')
        return ProofVersion.objects.filter(job_id=job_id)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProofVersionCreateSerializer
        return ProofVersionSerializer
    
    def perform_create(self, serializer):
        job_id = self.kwargs.get('job_id')
        serializer.save(job_id=job_id, uploaded_by=self.request.user)

class ProofCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = ProofCommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        version_id = self.kwargs.get('version_id')
        return ProofComment.objects.filter(version_id=version_id)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProofCommentCreateSerializer
        return ProofCommentSerializer
    
    def perform_create(self, serializer):
        version_id = self.kwargs.get('version_id')
        serializer.save(version_id=version_id, author=self.request.user)