from rest_framework import generics,permissions,status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .models import SellerApplication
from .serializers import SellerApplicationSerializer

User = get_user_model()

class SubmitApplicationView(generics.CreateAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

class ListApplicationView(generics.ListAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAdminUser]

class ApproveApplicationView(generics.UpdateAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self,request,*args,**kwargs):
        instance = self.get_object()
        merchant_id = request.data.get('merchant_id')
        user = instance.user
        user.role = 'Seller'
        user.merchant_id = merchant_id
        user.save()
        instance.status = 'Approved'
        instance.save()
        return Response({'status':'approved'},status=status.HTTP_200_OK)

class DeclineApplicationView(generics.UpdateAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self,request,*args,**kwargs):
        instance = self.get_object()
        reason = request.data.get('decline_reason')
        instance.status = 'Declined'
        instance.decline_reason = reason
        instance.save()
        return Response({'status':'declined'},status=status.HTTP_200_OK)