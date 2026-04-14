from django.urls import path
from . import views

urlpatterns = [
    path('', views.LeadListCreateView.as_view(), name='lead_list_create'),
    path('<int:pk>/', views.LeadDetailView.as_view(), name='lead_detail'),
    path('<int:lead_id>/activities/', views.LeadActivityView.as_view(), name='lead_activities'),
    path('<int:pk>/sync-trello/', views.LeadSyncTrelloView.as_view(), name='lead_sync_trello'),
]