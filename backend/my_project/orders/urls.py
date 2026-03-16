from django.urls import path
from .views import CreateOrderView,UserOrderHistoryView

urlpatterns = [
path('create/',CreateOrderView.as_view()),
path('history/',UserOrderHistoryView.as_view()),
]