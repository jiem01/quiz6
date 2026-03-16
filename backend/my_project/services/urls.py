from django.urls import path
from .views import ServiceListView,ServiceDetailView,SellerServiceManageView,SellerServiceDetailView

urlpatterns = [
path('list/',ServiceListView.as_view()),
path('<int:pk>/',ServiceDetailView.as_view()),
path('manage/',SellerServiceManageView.as_view()),
path('manage/<int:pk>/',SellerServiceDetailView.as_view()),
]