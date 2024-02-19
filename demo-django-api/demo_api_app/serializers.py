from rest_framework.serializers import ModelSerializer
from .models import ProductReview
from demo_api_app.models import Category, Product, FavoriteProduct
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.db.models import Avg
from .models import Product, Category, ProductReview
from django.contrib.auth.models import User


class ProductSerializer(ModelSerializer):
    average_rating = SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'code', 'name', 'description', 'category', 'average_rating')

    def get_average_rating(self, obj):
        reviews = ProductReview.objects.filter(product=obj)
        average = reviews.aggregate(Avg('rating'))['rating__avg']
        return average if average is not None else 0


class CategorySerializer(ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'code', 'name', 'products')
    
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username') 

class ProductReviewSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ProductReview
        fields = ('id', 'product', 'user', 'rating', 'comment', 'created_at')