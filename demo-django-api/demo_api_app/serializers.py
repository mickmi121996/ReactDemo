from rest_framework.serializers import ModelSerializer

from demo_api_app.models import Category, Product, FavoriteProduct


class ProductSerializer(ModelSerializer):
  class Meta:
    model = Product
    fields = ('id', 'code', 'name', 'category',)


class CategorySerializer(ModelSerializer):
  products = ProductSerializer(many=True, read_only=True)

  class Meta:
    model = Category
    fields = ('id', 'code', 'name', 'products')
