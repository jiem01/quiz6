from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, UserProfileView, AdminUserListView

urlpatterns = [
path('login/', MyTokenObtainPairView.as_view()),
path('register/', RegisterView.as_view()),
path('profile/', UserProfileView.as_view()),
path('admin/users/', AdminUserListView.as_view()),
]