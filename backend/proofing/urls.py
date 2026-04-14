from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.ProofJobListCreateView.as_view(), name='proof_job_list_create'),
    path('jobs/<int:pk>/', views.ProofJobDetailView.as_view(), name='proof_job_detail'),
    path('jobs/<int:job_id>/versions/', views.ProofVersionListCreateView.as_view(), name='proof_version_list_create'),
    path('versions/<int:version_id>/comments/', views.ProofCommentListCreateView.as_view(), name='proof_comment_list_create'),
]