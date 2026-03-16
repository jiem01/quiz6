from rest_framework import serializers
from .models import SellerApplication

class SellerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerApplication
        fields = '__all__'